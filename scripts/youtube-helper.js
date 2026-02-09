#!/usr/bin/env node
/**
 * YouTube Data API Helper
 * Usage: node youtube-helper.js <command> [options]
 * 
 * Commands:
 *   history [--max=50]           Get watch history
 *   subscriptions [--max=50]     Get channel subscriptions
 *   liked [--max=50]             Get liked videos
 *   playlists                    Get your playlists
 *   channel-info <channelId>     Get channel details
 *   video-info <videoId>         Get video details
 *   search <query> [--max=10]    Search YouTube
 */

const fs = require('fs');
const https = require('https');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, '.youtube-config.json');

function loadConfig() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  if (!config.tokens || !config.tokens.access_token) {
    console.error('Error: Not authenticated. Run: node youtube-oauth.js');
    process.exit(1);
  }
  return config;
}

function refreshAccessToken(refreshToken) {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  
  return new Promise((resolve, reject) => {
    const postData = new URLSearchParams({
      client_id: config.installed.client_id,
      client_secret: config.installed.client_secret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token'
    }).toString();

    const options = {
      hostname: 'oauth2.googleapis.com',
      path: '/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          const tokens = JSON.parse(data);
          config.tokens.access_token = tokens.access_token;
          config.tokens.expires_at = Date.now() + (tokens.expires_in * 1000);
          fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
          resolve(tokens.access_token);
        } else {
          reject(new Error(`Token refresh failed: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function getAccessToken() {
  const config = loadConfig();
  
  // Check if token is expired
  if (config.tokens.expires_at && Date.now() >= config.tokens.expires_at) {
    console.log('Access token expired. Refreshing...');
    return await refreshAccessToken(config.tokens.refresh_token);
  }
  
  return config.tokens.access_token;
}

function apiRequest(endpoint, params = {}) {
  return new Promise(async (resolve, reject) => {
    const accessToken = await getAccessToken();
    const queryString = new URLSearchParams(params).toString();
    const path = `/youtube/v3/${endpoint}${queryString ? '?' + queryString : ''}`;

    const options = {
      hostname: 'www.googleapis.com',
      path: path,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json'
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

async function getWatchHistory(maxResults = 50) {
  const result = await apiRequest('activities', {
    part: 'snippet,contentDetails',
    mine: 'true',
    maxResults: maxResults
  });
  
  return result.items.map(item => ({
    videoId: item.contentDetails?.upload?.videoId,
    title: item.snippet.title,
    channelTitle: item.snippet.channelTitle,
    publishedAt: item.snippet.publishedAt,
    description: item.snippet.description
  }));
}

async function getSubscriptions(maxResults = 50) {
  const result = await apiRequest('subscriptions', {
    part: 'snippet',
    mine: 'true',
    maxResults: maxResults
  });
  
  return result.items.map(item => ({
    channelId: item.snippet.resourceId.channelId,
    title: item.snippet.title,
    description: item.snippet.description,
    publishedAt: item.snippet.publishedAt
  }));
}

async function getLikedVideos(maxResults = 50) {
  const result = await apiRequest('videos', {
    part: 'snippet,contentDetails,statistics',
    myRating: 'like',
    maxResults: maxResults
  });
  
  return result.items.map(item => ({
    videoId: item.id,
    title: item.snippet.title,
    channelTitle: item.snippet.channelTitle,
    publishedAt: item.snippet.publishedAt,
    viewCount: item.statistics.viewCount,
    likeCount: item.statistics.likeCount
  }));
}

async function searchYouTube(query, maxResults = 10) {
  const result = await apiRequest('search', {
    part: 'snippet',
    q: query,
    type: 'video',
    maxResults: maxResults
  });
  
  return result.items.map(item => ({
    videoId: item.id.videoId,
    title: item.snippet.title,
    channelTitle: item.snippet.channelTitle,
    publishedAt: item.snippet.publishedAt,
    description: item.snippet.description
  }));
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === '--help' || command === '-h') {
    console.log(`
YouTube Data API Helper

Commands:
  history [--max=50]           Get watch history
  subscriptions [--max=50]     Get channel subscriptions
  liked [--max=50]             Get liked videos
  search <query> [--max=10]    Search YouTube

Examples:
  node youtube-helper.js history --max=20
  node youtube-helper.js subscriptions
  node youtube-helper.js search "AI news" --max=5
`);
    process.exit(0);
  }

  try {
    let maxResults = 50;
    const maxArg = args.find(arg => arg.startsWith('--max='));
    if (maxArg) {
      maxResults = parseInt(maxArg.split('=')[1]);
    }

    let result;
    
    switch (command) {
      case 'history':
        result = await getWatchHistory(maxResults);
        break;
      case 'subscriptions':
        result = await getSubscriptions(maxResults);
        break;
      case 'liked':
        result = await getLikedVideos(maxResults);
        break;
      case 'search':
        const query = args.slice(1).find(arg => !arg.startsWith('--'));
        if (!query) {
          console.error('Error: Search query required');
          process.exit(1);
        }
        result = await searchYouTube(query, maxResults);
        break;
      default:
        console.error(`Unknown command: ${command}`);
        process.exit(1);
    }

    console.log(JSON.stringify(result, null, 2));
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
