# Scripts

Utility scripts and helper tools for API integrations.

## API Helper Scripts

These scripts provide command-line access to various services:

### YouTube API
- **youtube-helper.js** - Main utility (subscriptions, history, search)
- **youtube-oauth.js** - Initial OAuth setup
- **youtube-exchange-code.js** - Manual code exchange

**Config:** `~/.youtube-config.json` (workspace root)  
**Skill:** `skills/youtube/SKILL.md`

**Usage:**
```bash
node scripts/youtube-helper.js subscriptions --max=20
node scripts/youtube-helper.js search "AI news" --max=5
node scripts/youtube-helper.js history --max=10
```

### Reddit API
- **reddit-helper.js** - Subreddit browsing, daily curation

**Config:** `~/.reddit-config.json` (workspace root)

**Usage:**
```bash
node scripts/reddit-helper.js test
node scripts/reddit-helper.js top --sub=LocalLLaMA --limit=5
node scripts/reddit-helper.js daily
node scripts/reddit-helper.js search "Claude vs GPT" --sub=LocalLLaMA
```

### Twitter API
- **twitter-helper.js** - Search tweets, daily digest

**Config:** `~/.twitter-config.json` (workspace root)

**Usage:**
```bash
node scripts/twitter-helper.js test
node scripts/twitter-helper.js search ai --max=10
node scripts/twitter-helper.js custom "Claude AI" --max=20
node scripts/twitter-helper.js daily
```

### arXiv API
- **arxiv-helper.js** - AI paper monitoring

**Config:** `~/.arxiv-config.json` (workspace root)

**Usage:**
```bash
node scripts/arxiv-helper.js daily
node scripts/arxiv-helper.js search "reinforcement learning" --max=10
```

### OpenAI API (DALL-E)
- **dalle-helper.js** - Image generation

**Config:** `~/.openai-config.json` (workspace root)

**Usage:**
```bash
node scripts/dalle-helper.js "prompt text" --size=1024x1024 --output=image.png
```

### Airtable API
- **airtable-helper.js** - Event Log CRUD operations

**Config:** `~/.airtable-config.json` (workspace root)

**Usage:**
```bash
node scripts/airtable-helper.js list
node scripts/airtable-helper.js get 2026-02-08
node scripts/airtable-helper.js create --date=2026-02-08 --gratitude="..."
```

## Running Scripts

All scripts run from workspace root:
```bash
cd ~/clawd
node scripts/SCRIPT_NAME.js [options]
```

## Configuration Files

API credentials live in workspace root (`.config.json` files):
- `.youtube-config.json` - YouTube OAuth tokens
- `.reddit-config.json` - Reddit anonymous mode config
- `.twitter-config.json` - Twitter Bearer token
- `.arxiv-config.json` - arXiv categories
- `.openai-config.json` - OpenAI API key
- `.airtable-config.json` - Airtable credentials

**Security:** These files contain secrets. Don't commit to git. Don't share publicly.

## Adding New Scripts

When adding integrations:
1. Create helper script in `scripts/`
2. Create `.config.json` in workspace root
3. Document usage here
4. Create skill in `skills/` if complex
5. Update `TOOLS.md` with usage notes
