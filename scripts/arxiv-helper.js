#!/usr/bin/env node
/**
 * arXiv Paper Monitor
 * Usage: node arxiv-helper.js <command> [options]
 * 
 * Commands:
 *   daily                           Get daily curated AI papers
 *   search <query> [--max=10]       Search arXiv
 *   recent [--category=cs.AI]       Get recent papers from category
 *   test                            Test API connection
 */

const fs = require('fs');
const https = require('https');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, '..', '.arxiv-config.json');

function loadConfig() {
  return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
}

// Parse arXiv Atom feed XML (simplified parser)
function parseArxivFeed(xml) {
  const papers = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match;

  while ((match = entryRegex.exec(xml)) !== null) {
    const entry = match[1];
    
    const getId = (tag) => {
      const regex = new RegExp(`<${tag}[^>]*>([^<]+)<\/${tag}>`);
      const m = entry.match(regex);
      return m ? m[1].trim() : null;
    };

    const getTag = (tag) => {
      const regex = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`);
      const m = entry.match(regex);
      return m ? m[1].trim() : null;
    };

    const getAuthors = () => {
      const authorRegex = /<author>[\s\S]*?<name>([^<]+)<\/name>/g;
      const authors = [];
      let authorMatch;
      while ((authorMatch = authorRegex.exec(entry)) !== null) {
        authors.push(authorMatch[1].trim());
      }
      return authors;
    };

    const getCategories = () => {
      const catRegex = /<category term="([^"]+)"/g;
      const cats = [];
      let catMatch;
      while ((catMatch = catRegex.exec(entry)) !== null) {
        cats.push(catMatch[1]);
      }
      return cats;
    };

    papers.push({
      id: getId('id'),
      title: getTag('title')?.replace(/\s+/g, ' '),
      authors: getAuthors(),
      summary: getTag('summary')?.replace(/\s+/g, ' '),
      published: getTag('published'),
      updated: getTag('updated'),
      categories: getCategories(),
      link: getId('id')
    });
  }

  return papers;
}

// Make arXiv API request
function arxivRequest(query) {
  return new Promise((resolve, reject) => {
    const encodedQuery = encodeURIComponent(query);
    const path = `/api/query?search_query=${encodedQuery}&sortBy=submittedDate&sortOrder=descending&max_results=50`;

    const options = {
      hostname: 'export.arxiv.org',
      path: path,
      method: 'GET'
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          const papers = parseArxivFeed(data);
          resolve(papers);
        } else {
          reject(new Error(`API Error ${res.statusCode}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

// Calculate relevance score
function calculateRelevance(paper, config) {
  const text = `${paper.title} ${paper.summary}`.toLowerCase();
  let score = 0;

  // High priority keywords
  config.keywords.high.forEach(kw => {
    if (text.includes(kw.toLowerCase())) score += 2;
  });

  // Medium priority keywords
  config.keywords.medium.forEach(kw => {
    if (text.includes(kw.toLowerCase())) score += 1;
  });

  // Category match
  const hasRelevantCategory = paper.categories.some(cat => 
    config.categories.includes(cat)
  );
  if (hasRelevantCategory) score += 1;

  return score;
}

// Check if paper is too theoretical (heuristic)
function isTooTheoretical(paper) {
  const text = `${paper.title} ${paper.summary}`.toLowerCase();
  const theoreticalMarkers = [
    'theorem',
    'proof',
    'convergence analysis',
    'asymptotic',
    'lower bound',
    'complexity class'
  ];
  
  const theoreticalCount = theoreticalMarkers.filter(marker => 
    text.includes(marker)
  ).length;

  // If 3+ theoretical markers and no applied markers, likely too theoretical
  const appliedMarkers = ['experiment', 'benchmark', 'dataset', 'application', 'system'];
  const hasApplied = appliedMarkers.some(marker => text.includes(marker));

  return theoreticalCount >= 3 && !hasApplied;
}

// Categorize paper
function categorizePaper(paper) {
  const text = `${paper.title} ${paper.summary}`.toLowerCase();
  
  if (text.includes('large language model') || text.includes('llm')) return 'LLMs';
  if (text.includes('agent')) return 'Agents';
  if (text.includes('multimodal') || text.includes('vision')) return 'Multimodal';
  if (text.includes('evaluation') || text.includes('benchmark')) return 'Evaluation';
  if (text.includes('infrastructure') || text.includes('tooling')) return 'Infra';
  if (text.includes('reasoning')) return 'Reasoning';
  if (text.includes('fine-tun') || text.includes('rlhf')) return 'Training';
  
  return 'Applied';
}

// Generate summary for paper
function generateSummary(paper) {
  // Extract first sentence or create from title
  const summary = paper.summary.split('.')[0];
  const tldr = summary.length > 150 ? summary.substring(0, 147) + '...' : summary;
  
  return {
    title: paper.title,
    authors: paper.authors.slice(0, 3).join(', ') + (paper.authors.length > 3 ? ' et al.' : ''),
    link: paper.link,
    tldr: tldr,
    category: categorizePaper(paper),
    published: new Date(paper.published).toISOString().split('T')[0]
  };
}

// Get daily curated papers
async function getDailyCurated() {
  const config = loadConfig();
  console.log('Scanning arXiv for new AI papers...\n');

  // Build query for all categories
  const categoryQuery = config.categories.map(cat => `cat:${cat}`).join(' OR ');
  
  try {
    const papers = await arxivRequest(categoryQuery);
    
    // Filter papers from last 24 hours (or 7 days for testing/weekends)
    const cutoffDate = new Date();
    const daysBack = process.argv.includes('--days=7') ? 7 : 1;
    cutoffDate.setDate(cutoffDate.getDate() - daysBack);
    
    const recentPapers = papers.filter(p => {
      const published = new Date(p.published);
      return published >= cutoffDate;
    });

    console.log(`Found ${recentPapers.length} papers from last ${daysBack} day(s)`);

    // Calculate relevance and filter
    const scoredPapers = recentPapers.map(paper => ({
      ...paper,
      relevance: calculateRelevance(paper, config),
      tooTheoretical: config.filtering.excludeHighlyTheoretical && isTooTheoretical(paper)
    }));

    // Filter and sort
    const filtered = scoredPapers
      .filter(p => p.relevance >= config.filtering.minRelevanceScore * 10)
      .filter(p => !p.tooTheoretical)
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, config.filtering.maxPapersPerDay);

    console.log(`Filtered to ${filtered.length} relevant papers\n`);

    // Generate summaries
    return filtered.map(generateSummary);

  } catch (error) {
    console.error('Error fetching papers:', error.message);
    return [];
  }
}

// Search arXiv
async function searchArxiv(query, maxResults = 10) {
  try {
    const papers = await arxivRequest(`all:${query}`);
    return papers.slice(0, maxResults).map(generateSummary);
  } catch (error) {
    console.error('Error searching:', error.message);
    return [];
  }
}

// Test connection
async function test() {
  console.log('Testing arXiv API connection...\n');
  
  try {
    const papers = await arxivRequest('cat:cs.AI');
    console.log('✅ API request successful');
    console.log(`Sample paper: "${papers[0].title}"`);
    console.log(`Authors: ${papers[0].authors.slice(0, 2).join(', ')}`);
    console.log('\n🎉 arXiv API is working!');
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    process.exit(1);
  }
}

// Main CLI
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === '--help' || command === '-h') {
    console.log(`
arXiv Paper Monitor

Commands:
  daily                           Get daily curated AI papers
  search <query> [--max=10]       Search arXiv
  recent [--category=cs.AI]       Get recent papers from category
  test                            Test API connection

Examples:
  node arxiv-helper.js daily
  node arxiv-helper.js search "large language models" --max=5
  node arxiv-helper.js test
`);
    process.exit(0);
  }

  try {
    switch (command) {
      case 'test':
        await test();
        break;

      case 'daily': {
        const papers = await getDailyCurated();
        if (papers.length === 0) {
          console.log('No notable new AI papers found in this scan.');
        } else {
          console.log(JSON.stringify(papers, null, 2));
        }
        break;
      }

      case 'search': {
        const query = args.slice(1).find(a => !a.startsWith('--'));
        if (!query) {
          console.error('Error: Search query required');
          process.exit(1);
        }
        const max = parseInt(args.find(a => a.startsWith('--max='))?.split('=')[1] || '10');
        const papers = await searchArxiv(query, max);
        console.log(JSON.stringify(papers, null, 2));
        break;
      }

      default:
        console.error(`Unknown command: ${command}`);
        process.exit(1);
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
