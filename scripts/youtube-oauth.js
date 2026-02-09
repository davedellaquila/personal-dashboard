#!/usr/bin/env node
/**
 * YouTube OAuth Authentication Flow
 * Usage: node youtube-oauth.js
 * 
 * This script will:
 * 1. Generate an authorization URL
 * 2. Start a local server to receive the callback
 * 3. Exchange the auth code for access/refresh tokens
 * 4. Save tokens to .youtube-config.json
 */

const fs = require('fs');
const https = require('https');
const http = require('http');
const url = require('url');
const path = require('path');
const { exec } = require('child_process');

const CONFIG_PATH = path.join(__dirname, '.youtube-config.json');
const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));

const CLIENT_ID = config.installed.client_id;
const CLIENT_SECRET = config.installed.client_secret;
const REDIRECT_URI = 'http://localhost:8080';

// YouTube Data API scopes
const SCOPES = [
  'https://www.googleapis.com/auth/youtube.readonly',
  'https://www.googleapis.com/auth/youtube.force-ssl'
];

function generateAuthUrl() {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope: SCOPES.join(' '),
    access_type: 'offline',
    prompt: 'consent'
  });
  
  return `${config.installed.auth_uri}?${params.toString()}`;
}

function exchangeCodeForTokens(code) {
  return new Promise((resolve, reject) => {
    const postData = new URLSearchParams({
      code: code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code'
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
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`Token exchange failed: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

function saveTokens(tokens) {
  config.tokens = {
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    expires_at: Date.now() + (tokens.expires_in * 1000),
    token_type: tokens.token_type,
    scope: tokens.scope
  };
  
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
  console.log('\n✅ Tokens saved to .youtube-config.json');
}

async function startAuthFlow() {
  const authUrl = generateAuthUrl();
  
  console.log('YouTube OAuth Authentication\n');
  console.log('Opening browser to authorize...\n');
  console.log('If browser doesn\'t open, visit this URL:\n');
  console.log(authUrl);
  console.log('\n');

  // Try to open browser (macOS)
  exec(`open "${authUrl}"`, (error) => {
    if (error) {
      console.log('Could not open browser automatically.');
    }
  });

  // Start local server to receive callback
  const server = http.createServer(async (req, res) => {
    const queryParams = url.parse(req.url, true).query;
    
    if (queryParams.code) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end('<html><body><h1>✅ Authorization successful!</h1><p>You can close this window and return to the terminal.</p></body></html>');
      
      console.log('Authorization code received. Exchanging for tokens...');
      
      try {
        const tokens = await exchangeCodeForTokens(queryParams.code);
        saveTokens(tokens);
        console.log('\n✅ YouTube API authentication complete!');
        console.log('You can now use youtube-helper.js to access your YouTube data.\n');
        server.close();
        process.exit(0);
      } catch (error) {
        console.error('Error exchanging code for tokens:', error.message);
        server.close();
        process.exit(1);
      }
    } else if (queryParams.error) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end('<html><body><h1>❌ Authorization failed</h1><p>Error: ' + queryParams.error + '</p></body></html>');
      console.error('Authorization error:', queryParams.error);
      server.close();
      process.exit(1);
    }
  });

  server.listen(8080, () => {
    console.log('Local server started on http://localhost:8080');
    console.log('Waiting for authorization...\n');
  });
}

startAuthFlow();
