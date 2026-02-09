#!/usr/bin/env node
/**
 * Manually exchange authorization code for tokens
 */

const fs = require('fs');
const https = require('https');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, '.youtube-config.json');
const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));

const code = process.argv[2];

if (!code) {
  console.error('Usage: node youtube-exchange-code.js <authorization_code>');
  process.exit(1);
}

const postData = new URLSearchParams({
  code: code,
  client_id: config.installed.client_id,
  client_secret: config.installed.client_secret,
  redirect_uri: 'http://localhost:8080',
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

console.log('Exchanging authorization code for tokens...');

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    if (res.statusCode === 200) {
      const tokens = JSON.parse(data);
      
      config.tokens = {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expires_at: Date.now() + (tokens.expires_in * 1000),
        token_type: tokens.token_type,
        scope: tokens.scope
      };
      
      fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
      console.log('\n✅ Tokens saved to .youtube-config.json');
      console.log('YouTube API authentication complete!');
    } else {
      console.error(`Error ${res.statusCode}: ${data}`);
      process.exit(1);
    }
  });
});

req.on('error', (error) => {
  console.error('Error:', error.message);
  process.exit(1);
});

req.write(postData);
req.end();
