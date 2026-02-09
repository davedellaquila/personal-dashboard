#!/usr/bin/env node
/**
 * Twitter/X AI Monitoring Tool
 * Usage: node twitter-monitor.js [query] [maxResults]
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Load config
const configPath = path.join(__dirname, '.twitter-config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

function searchTweets(query, maxResults = 10) {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams({
      query: query,
      max_results: Math.max(10, Math.min(maxResults, 100)),
      'tweet.fields': 'created_at,public_metrics,author_id',
      'user.fields': 'name,username,verified',
      expansions: 'author_id',
    });
    
    const options = {
      hostname: 'api.twitter.com',
      path: '/2/tweets/search/recent?' + params.toString(),
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${config.bearerToken}`,
        'User-Agent': 'OpenClaw-Twitter-Monitor/1.0',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode >= 400) {
            reject(new Error(`Twitter API error ${res.statusCode}: ${parsed.detail || parsed.title || data}`));
          } else {
            resolve(parsed);
          }
        } catch (e) {
          reject(new Error(`Failed to parse response: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

function formatTweet(tweet, user) {
  const metrics = tweet.public_metrics;
  const engagement = metrics.like_count + metrics.retweet_count + metrics.reply_count;
  
  return {
    id: tweet.id,
    text: tweet.text,
    author: {
      name: user.name,
      username: user.username,
      verified: user.verified || false,
    },
    url: `https://twitter.com/${user.username}/status/${tweet.id}`,
    created_at: tweet.created_at,
    metrics: {
      likes: metrics.like_count,
      retweets: metrics.retweet_count,
      replies: metrics.reply_count,
      engagement,
    },
  };
}

async function getTopAIPosts(queryInput = 'ai', maxResults = 10) {
  // Use preset query or custom
  const query = config.queries[queryInput] || queryInput;
  
  try {
    const result = await searchTweets(query, maxResults);
    
    if (!result.data || result.data.length === 0) {
      return { tweets: [], meta: result.meta, query };
    }
    
    // Map users by ID
    const users = {};
    if (result.includes?.users) {
      result.includes.users.forEach(user => {
        users[user.id] = user;
      });
    }
    
    // Format and sort by engagement
    const tweets = result.data
      .map(tweet => formatTweet(tweet, users[tweet.author_id] || { name: 'Unknown', username: 'unknown' }))
      .sort((a, b) => b.metrics.engagement - a.metrics.engagement);
    
    return {
      tweets,
      meta: result.meta,
      query,
    };
  } catch (error) {
    return { error: error.message, query };
  }
}

// CLI Interface
async function main() {
  const [,, queryName = 'ai', maxResults = '10'] = process.argv;
  
  console.log(`Searching for: ${queryName}`);
  console.log('');
  
  const result = await getTopAIPosts(queryName, parseInt(maxResults));
  
  if (result.error) {
    console.error('Error:', result.error);
    process.exit(1);
  }
  
  if (result.tweets.length === 0) {
    console.log('No tweets found.');
    process.exit(0);
  }
  
  console.log(`Found ${result.tweets.length} tweets (sorted by engagement):\n`);
  
  result.tweets.forEach((tweet, i) => {
    console.log(`${i + 1}. @${tweet.author.username}${tweet.author.verified ? ' ✓' : ''}`);
    console.log(`   ${tweet.text.substring(0, 150)}${tweet.text.length > 150 ? '...' : ''}`);
    console.log(`   💬 ${tweet.metrics.replies} | 🔁 ${tweet.metrics.retweets} | ❤️ ${tweet.metrics.likes}`);
    console.log(`   ${tweet.url}`);
    console.log('');
  });
}

if (require.main === module) {
  main();
}

module.exports = { getTopAIPosts, searchTweets };
