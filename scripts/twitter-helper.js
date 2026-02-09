#!/usr/bin/env node
/**
 * Twitter/X API Helper
 * Usage: node twitter-helper.js <command> [options]
 * 
 * Commands:
 *   search <query-name> [--max=10]         Search using predefined query
 *   custom <search-text> [--max=10]        Search with custom text
 *   daily                                   Get daily curated tweets (all queries)
 *   test                                    Test API connection
 */

const fs = require('fs');
const https = require('https');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, '..', '.twitter-config.json');

function loadConfig() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  return config;
}

// Make API request to Twitter v2
async function apiRequest(endpoint, config) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.twitter.com',
      path: endpoint,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${config.bearerToken}`,
        'User-Agent': 'OpenClaw-Twitter-Helper/1.0'
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

// Search tweets
async function searchTweets(query, maxResults = 10) {
  const config = loadConfig();
  
  // Twitter v2 API requires max_results between 10-100
  maxResults = Math.max(10, Math.min(100, maxResults));
  
  // Twitter v2 API endpoint for recent search
  const params = new URLSearchParams({
    query: query,
    max_results: maxResults,
    'tweet.fields': 'created_at,public_metrics,author_id,conversation_id',
    'user.fields': 'username,name,verified',
    'expansions': 'author_id'
  });
  
  const endpoint = `/2/tweets/search/recent?${params.toString()}`;
  
  try {
    const response = await apiRequest(endpoint, config);
    
    if (!response.data || response.data.length === 0) {
      return [];
    }

    // Build user lookup map
    const users = {};
    if (response.includes && response.includes.users) {
      response.includes.users.forEach(user => {
        users[user.id] = user;
      });
    }

    return response.data.map(tweet => {
      const author = users[tweet.author_id] || {};
      return {
        id: tweet.id,
        text: tweet.text,
        author: author.username || 'unknown',
        authorName: author.name || 'Unknown',
        verified: author.verified || false,
        created: tweet.created_at,
        likes: tweet.public_metrics?.like_count || 0,
        retweets: tweet.public_metrics?.retweet_count || 0,
        replies: tweet.public_metrics?.reply_count || 0,
        url: `https://twitter.com/${author.username}/status/${tweet.id}`
      };
    });
  } catch (error) {
    console.error(`Error searching Twitter:`, error.message);
    return [];
  }
}

// Get daily curated tweets from all configured queries
async function getDailyCurated() {
  const config = loadConfig();
  let allTweets = [];

  console.log('Fetching tweets from configured queries...\n');

  for (const [queryName, queryText] of Object.entries(config.queries)) {
    console.log(`Searching: ${queryName}...`);
    const tweets = await searchTweets(queryText, 20); // Get more to filter
    
    // Add query context
    tweets.forEach(tweet => {
      tweet.query = queryName;
      // Calculate engagement score
      tweet.engagement = tweet.likes + (tweet.retweets * 2) + (tweet.replies * 1.5);
    });

    allTweets.push(...tweets);
  }

  // Remove duplicates (same tweet can match multiple queries)
  const seen = new Set();
  allTweets = allTweets.filter(tweet => {
    if (seen.has(tweet.id)) return false;
    seen.add(tweet.id);
    return true;
  });

  // Sort by engagement score
  allTweets.sort((a, b) => b.engagement - a.engagement);

  // Return top 10
  return allTweets.slice(0, 10);
}

// Test connection
async function testConnection() {
  console.log('Testing Twitter API connection...\n');
  const config = loadConfig();
  
  try {
    console.log('Fetching recent tweets about "OpenAI"...');
    const tweets = await searchTweets('OpenAI', 10);
    
    if (tweets.length > 0) {
      console.log('✅ API request successful');
      console.log(`Sample tweet: "${tweets[0].text.substring(0, 100)}..."`);
      console.log(`Author: @${tweets[0].author}`);
      console.log(`Likes: ${tweets[0].likes}, Retweets: ${tweets[0].retweets}`);
      console.log('\n🎉 Twitter API is working!');
    } else {
      console.log('⚠️  API working but no tweets returned');
    }
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    process.exit(1);
  }
}

// Format tweets for display
function formatTweets(tweets, verbose = false) {
  if (!Array.isArray(tweets) || tweets.length === 0) {
    return 'No tweets found.';
  }

  return tweets.map((tweet, i) => {
    const verifiedBadge = tweet.verified ? '✓' : '';
    const engagement = `❤️ ${tweet.likes} 🔁 ${tweet.retweets} 💬 ${tweet.replies}`;
    
    let output = `${i + 1}. @${tweet.author}${verifiedBadge}: ${tweet.text.substring(0, 140)}${tweet.text.length > 140 ? '...' : ''}`;
    
    if (verbose) {
      output += `\n   ${engagement}`;
      output += `\n   ${tweet.url}`;
    }
    
    return output;
  }).join('\n\n');
}

// Main CLI
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === '--help' || command === '-h') {
    console.log(`
Twitter/X API Helper

Commands:
  search <query-name> [--max=10]         Search using predefined query from config
                                          Query names: ${Object.keys(loadConfig().queries).join(', ')}
  custom <search-text> [--max=10]        Search with custom text
  daily                                   Get daily curated tweets (top 10 by engagement)
  test                                    Test API connection

Examples:
  node twitter-helper.js test
  node twitter-helper.js search ai --max=5
  node twitter-helper.js custom "Claude AI" --max=10
  node twitter-helper.js daily
`);
    process.exit(0);
  }

  try {
    switch (command) {
      case 'test':
        await testConnection();
        break;

      case 'search': {
        const config = loadConfig();
        const queryName = args[1];
        if (!queryName || !config.queries[queryName]) {
          console.error(`Error: Unknown query name. Available: ${Object.keys(config.queries).join(', ')}`);
          process.exit(1);
        }
        const max = parseInt(args.find(a => a.startsWith('--max='))?.split('=')[1] || '10');
        const tweets = await searchTweets(config.queries[queryName], max);
        console.log(formatTweets(tweets, true));
        break;
      }

      case 'custom': {
        const searchText = args[1];
        if (!searchText) {
          console.error('Error: Search text required');
          process.exit(1);
        }
        const max = parseInt(args.find(a => a.startsWith('--max='))?.split('=')[1] || '10');
        const tweets = await searchTweets(searchText, max);
        console.log(formatTweets(tweets, true));
        break;
      }

      case 'daily': {
        const tweets = await getDailyCurated();
        console.log(formatTweets(tweets, true));
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
