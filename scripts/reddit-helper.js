#!/usr/bin/env node
/**
 * Reddit API Helper
 * Usage: node reddit-helper.js <command> [options]
 * 
 * Commands:
 *   top [--sub=LocalLLaMA] [--limit=10]    Get top posts from subreddit
 *   daily                                   Get daily curated posts (all subs)
 *   search <query> [--sub=all]             Search Reddit
 *   test                                    Test API connection
 */

const fs = require('fs');
const https = require('https');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, '..', '.reddit-config.json');

function loadConfig() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  return config;
}

// Make API request (anonymous - no authentication needed for read-only)
async function apiRequest(endpoint, config) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'www.reddit.com',
      path: endpoint,
      method: 'GET',
      headers: {
        'User-Agent': config.userAgent
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`API Error ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

// Get top posts from subreddit
async function getTopPosts(subreddit, limit = 10, timeframe = 'day') {
  const config = loadConfig();
  const endpoint = `/r/${subreddit}/top.json?t=${timeframe}&limit=${limit}`;
  
  try {
    const response = await apiRequest(endpoint, config);
    return response.data.children.map(post => ({
      title: post.data.title,
      author: post.data.author,
      subreddit: post.data.subreddit,
      upvotes: post.data.ups,
      comments: post.data.num_comments,
      url: `https://reddit.com${post.data.permalink}`,
      created: new Date(post.data.created_utc * 1000).toISOString(),
      selftext: post.data.selftext ? post.data.selftext.substring(0, 200) : null,
      flair: post.data.link_flair_text
    }));
  } catch (error) {
    console.error(`Error fetching r/${subreddit}:`, error.message);
    return [];
  }
}

// Get curated daily posts from all configured subreddits
async function getDailyCurated() {
  const config = loadConfig();
  const filters = config.filters;
  let allPosts = [];

  console.log('Fetching posts from configured subreddits...\n');

  for (const sub of config.subreddits) {
    console.log(`Checking r/${sub.name}...`);
    const posts = await getTopPosts(sub.name, sub.postsPerDay * 2, 'day');
    
    // Apply filters
    const filtered = posts.filter(post => {
      // Min upvotes
      if (post.upvotes < filters.minUpvotes) return false;
      
      // Exclude flairs
      if (post.flair && filters.excludeFlairs.includes(post.flair)) return false;
      
      // Keyword boost
      const title = post.title.toLowerCase();
      const hasHighKeyword = filters.keywords.high.some(kw => title.includes(kw.toLowerCase()));
      const hasMediumKeyword = filters.keywords.medium.some(kw => title.includes(kw.toLowerCase()));
      
      post.relevance = hasHighKeyword ? 'high' : hasMediumKeyword ? 'medium' : 'low';
      post.category = sub.category;
      post.configuredSub = sub.name;
      
      return true;
    });

    allPosts.push(...filtered.slice(0, sub.postsPerDay));
  }

  // Sort by relevance and upvotes
  allPosts.sort((a, b) => {
    const relevanceScore = { high: 3, medium: 2, low: 1 };
    if (relevanceScore[a.relevance] !== relevanceScore[b.relevance]) {
      return relevanceScore[b.relevance] - relevanceScore[a.relevance];
    }
    return b.upvotes - a.upvotes;
  });

  return allPosts;
}

// Search Reddit
async function searchReddit(query, subreddit = 'all', limit = 10) {
  const config = loadConfig();
  const endpoint = `/r/${subreddit}/search.json?q=${encodeURIComponent(query)}&limit=${limit}&sort=relevance&t=week`;
  
  const response = await apiRequest(endpoint, config);
  return response.data.children.map(post => ({
    title: post.data.title,
    subreddit: post.data.subreddit,
    upvotes: post.data.ups,
    url: `https://reddit.com${post.data.permalink}`
  }));
}

// Test connection
async function testConnection() {
  console.log('Testing Reddit API connection (anonymous/read-only)...\n');
  const config = loadConfig();
  
  try {
    console.log('Fetching test post from r/test...');
    const posts = await getTopPosts('test', 1);
    
    if (posts.length > 0) {
      console.log('✅ API request successful');
      console.log(`Test post: "${posts[0].title}"`);
      console.log(`Upvotes: ${posts[0].upvotes}`);
      console.log('\n🎉 Reddit API is working!');
      console.log('Note: Using anonymous read-only access (10 requests/min limit)');
    }
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
Reddit API Helper

Commands:
  top [--sub=LocalLLaMA] [--limit=10]    Get top posts from subreddit
  daily                                   Get daily curated posts (all subs)
  search <query> [--sub=all]             Search Reddit
  test                                    Test API connection

Examples:
  node reddit-helper.js top --sub=LocalLLaMA --limit=5
  node reddit-helper.js daily
  node reddit-helper.js search "Claude vs GPT" --sub=LocalLLaMA
  node reddit-helper.js test
`);
    process.exit(0);
  }

  try {
    switch (command) {
      case 'test':
        await testConnection();
        break;

      case 'top': {
        const sub = args.find(a => a.startsWith('--sub='))?.split('=')[1] || 'test';
        const limit = parseInt(args.find(a => a.startsWith('--limit='))?.split('=')[1] || '10');
        const posts = await getTopPosts(sub, limit);
        console.log(JSON.stringify(posts, null, 2));
        break;
      }

      case 'daily': {
        const posts = await getDailyCurated();
        console.log(JSON.stringify(posts, null, 2));
        break;
      }

      case 'search': {
        const query = args.find(a => !a.startsWith('--'));
        if (!query) {
          console.error('Error: Search query required');
          process.exit(1);
        }
        const sub = args.find(a => a.startsWith('--sub='))?.split('=')[1] || 'all';
        const posts = await searchReddit(query, sub);
        console.log(JSON.stringify(posts, null, 2));
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
