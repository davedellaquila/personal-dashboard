#!/usr/bin/env node
/**
 * Airtable CRUD Helper for Hal
 * Usage: node airtable-helper.js <action> [options]
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Load config
const configPath = path.join(__dirname, '.airtable-config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const API_BASE = 'https://api.airtable.com/v0';

function request(method, endpoint, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(`${API_BASE}${endpoint}`);
    const options = {
      method,
      headers: {
        'Authorization': `Bearer ${config.token}`,
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode >= 400) {
            reject(new Error(`Airtable API error ${res.statusCode}: ${parsed.error?.message || data}`));
          } else {
            resolve(parsed);
          }
        } catch (e) {
          reject(new Error(`Failed to parse response: ${data}`));
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

// CRUD Operations
async function listRecords(tableName = 'main', maxRecords = 10) {
  const tableId = config.tables[tableName];
  const endpoint = `/${config.baseId}/${tableId}?maxRecords=${maxRecords}`;
  return request('GET', endpoint);
}

async function getRecord(tableName = 'main', recordId) {
  const tableId = config.tables[tableName];
  const endpoint = `/${config.baseId}/${tableId}/${recordId}`;
  return request('GET', endpoint);
}

async function createRecord(tableName = 'main', fields) {
  const tableId = config.tables[tableName];
  const endpoint = `/${config.baseId}/${tableId}`;
  return request('POST', endpoint, { fields });
}

async function updateRecord(tableName = 'main', recordId, fields) {
  const tableId = config.tables[tableName];
  const endpoint = `/${config.baseId}/${tableId}/${recordId}`;
  return request('PATCH', endpoint, { fields });
}

async function deleteRecord(tableName = 'main', recordId) {
  const tableId = config.tables[tableName];
  const endpoint = `/${config.baseId}/${tableId}/${recordId}`;
  return request('DELETE', endpoint);
}

// CLI Interface
async function main() {
  const [,, action, ...args] = process.argv;

  try {
    let result;
    switch (action) {
      case 'list':
        result = await listRecords(args[0] || 'main', parseInt(args[1]) || 10);
        break;
      case 'get':
        if (!args[1]) throw new Error('Usage: get <table> <recordId>');
        result = await getRecord(args[0] || 'main', args[1]);
        break;
      case 'create':
        if (!args[1]) throw new Error('Usage: create <table> <fieldsJson>');
        result = await createRecord(args[0] || 'main', JSON.parse(args[1]));
        break;
      case 'update':
        if (!args[2]) throw new Error('Usage: update <table> <recordId> <fieldsJson>');
        result = await updateRecord(args[0] || 'main', args[1], JSON.parse(args[2]));
        break;
      case 'delete':
        if (!args[1]) throw new Error('Usage: delete <table> <recordId>');
        result = await deleteRecord(args[0] || 'main', args[1]);
        break;
      default:
        console.error('Unknown action. Use: list, get, create, update, delete');
        process.exit(1);
    }
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { listRecords, getRecord, createRecord, updateRecord, deleteRecord };
