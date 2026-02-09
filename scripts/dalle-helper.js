#!/usr/bin/env node
/**
 * DALL-E Image Generator Helper
 * Usage: node dalle-helper.js "prompt text" [--size=1024x1024] [--output=filename.png]
 */

const fs = require('fs');
const https = require('https');
const path = require('path');

// Load config
const configPath = path.join(__dirname, '.openai-config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const API_KEY = config.apiKey;

async function generateImage(prompt, options = {}) {
  const size = options.size || '1024x1024'; // 1024x1024, 1792x1024, or 1024x1792
  const model = options.model || 'dall-e-3';
  const quality = options.quality || 'standard'; // standard or hd
  
  const requestBody = JSON.stringify({
    model: model,
    prompt: prompt,
    n: 1,
    size: size,
    quality: quality
  });

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.openai.com',
      port: 443,
      path: '/v1/images/generations',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Length': Buffer.byteLength(requestBody)
      }
    }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`API Error ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(requestBody);
    req.end();
  });
}

async function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const fileStream = fs.createWriteStream(outputPath);
      res.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        resolve(outputPath);
      });
      
      fileStream.on('error', (error) => {
        fs.unlink(outputPath, () => {}); // Delete partial file
        reject(error);
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    console.log(`
DALL-E Image Generator

Usage: node dalle-helper.js "prompt text" [options]

Options:
  --size=WxH        Image size (1024x1024, 1792x1024, 1024x1792)
  --quality=Q       Quality (standard or hd)
  --output=FILE     Output filename (default: dalle-TIMESTAMP.png)
  --model=MODEL     Model (dall-e-3 or dall-e-2)

Example:
  node dalle-helper.js "A friendly AI assistant robot" --size=1024x1024 --output=hal.png
`);
    process.exit(0);
  }

  // Parse arguments
  const prompt = args.find(arg => !arg.startsWith('--'));
  const options = {};
  
  args.forEach(arg => {
    if (arg.startsWith('--size=')) options.size = arg.split('=')[1];
    if (arg.startsWith('--quality=')) options.quality = arg.split('=')[1];
    if (arg.startsWith('--output=')) options.output = arg.split('=')[1];
    if (arg.startsWith('--model=')) options.model = arg.split('=')[1];
  });

  if (!prompt) {
    console.error('Error: Prompt text required');
    process.exit(1);
  }

  try {
    console.log('Generating image...');
    console.log(`Prompt: ${prompt}`);
    console.log(`Size: ${options.size || '1024x1024'}`);
    console.log(`Quality: ${options.quality || 'standard'}`);
    
    const result = await generateImage(prompt, options);
    const imageUrl = result.data[0].url;
    const revisedPrompt = result.data[0].revised_prompt;
    
    console.log(`\nRevised prompt: ${revisedPrompt}`);
    
    // Determine output filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const outputPath = options.output || `dalle-${timestamp}.png`;
    
    console.log(`\nDownloading to: ${outputPath}`);
    await downloadImage(imageUrl, outputPath);
    
    console.log('✅ Image saved successfully!');
    console.log(`Path: ${path.resolve(outputPath)}`);
    
    // Output just the path for easy scripting
    process.stdout.write(`\nFILE:${path.resolve(outputPath)}\n`);
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
