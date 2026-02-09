# TOOLS.md - Local Notes

Skills define *how* tools work. This file is for *your* specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:
- Camera names and locations
- SSH hosts and aliases  
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Monitoring & Debugging Hal

### Live Log Monitoring
Open a second terminal window and run:
```bash
clawdbot logs --follow
```

### Filtered Monitoring
```bash
# Just errors
clawdbot logs --follow | grep error

# Just Telegram activity
clawdbot logs --follow | grep telegram

# Just tool calls
clawdbot logs --follow | grep "tool start\|tool end"
```

### Persistent Monitor (tmux)
```bash
tmux new -s hal-monitor
clawdbot logs --follow
# Detach: Ctrl-B, D
# Reattach: tmux attach -t hal-monitor
```

### Enable Reasoning Mode
See Hal's internal thinking process:
```
/reasoning on
```

### Session Status
Check token usage, model, costs:
```
/status
```

## API Integrations

### YouTube Data API
**Setup:** 2026-02-08  
**Purpose:** Content curation and recommendations  
**Skill:** `skills/youtube/SKILL.md`

Dave's YouTube viewing heavily focused on AI content:
- Matthew Berman - AI news & tutorials
- Matt Wolfe - AI tools & weekly news
- Wes Roth - AI developments & optimism
- David Shapiro - Post-labor economics
- Lex Fridman - Long-form interviews
- OpenAI, Anthropic - Official channels
- AI For Humans, AI Daily Brief - AI entertainment & news

Also interests: vintage cars, cycling, photography

**Usage:**
```bash
# Get subscriptions
node scripts/youtube-helper.js subscriptions --max=20

# Search for topics
node scripts/youtube-helper.js search "AI news" --max=5

# Check watch history
node scripts/youtube-helper.js history --max=10
```

### OpenAI API (DALL-E)
**Setup:** 2026-02-08  
**Purpose:** Image generation  
**Tool:** `scripts/dalle-helper.js`

**Usage:**
```bash
node scripts/dalle-helper.js "prompt text" --size=1024x1024 --output=filename.png
```

### Twitter/X API
**Setup:** 2026-02-08  
**Purpose:** Monitor AI discussions and trends  
**Config:** `.twitter-config.json`  
**Tool:** `scripts/twitter-helper.js`

Predefined queries:
- "ai" - General AI, ML, LLM discussions (broad)
- "aiNews" - OpenAI, Anthropic, Google AI, DeepMind (company news)
- "aiDigest" - Combined AI/ChatGPT/Claude topics

**Usage:**
```bash
# Test connection
node scripts/twitter-helper.js test

# Search by predefined query
node scripts/twitter-helper.js search ai --max=10
node scripts/twitter-helper.js search aiNews --max=20

# Custom search
node scripts/twitter-helper.js custom "Claude vs GPT" --max=10

# Daily curated digest (top 10 by engagement)
node scripts/twitter-helper.js daily
```

**Features:**
- Engagement scoring: Likes + (Retweets × 2) + (Replies × 1.5)
- Deduplication across queries
- Twitter v2 API (requires max_results 10-100)

### Reddit API
**Setup:** 2026-02-08  
**Purpose:** Daily curated posts from favorite subreddits  
**Config:** `.reddit-config.json`  
**Tool:** `scripts/reddit-helper.js`

**Monitored Subreddits:**
- r/LocalLLaMA - AI discussions, models, agents (daily, 3 posts)
- r/userexperience - UX professional discussions (daily, 2 posts)
- r/cursor - Cursor AI IDE tips (daily, 2 posts)
- r/ClaudeAI - Claude-specific content (daily, 2 posts)
- r/ProductManagement - Product strategy (daily, 2 posts)

**Filters:**
- Minimum 50 upvotes
- Last 24 hours only
- Keyword relevance boost (Claude, GPT-5, Cursor, OpenClaw, AI agent, UX research)
- Exclude meme/shitpost flairs

**Usage:**
```bash
# Test connection
node scripts/reddit-helper.js test

# Get daily curated posts
node scripts/reddit-helper.js daily

# Top posts from specific sub
node scripts/reddit-helper.js top --sub=LocalLLaMA --limit=5

# Search
node scripts/reddit-helper.js search "Claude vs GPT"
```

### Airtable
**Setup:** 2026-02-02  
**Purpose:** Daily activity logging (Event Log)  
**Tool:** `scripts/airtable-helper.js`

**Base:** `appAqkwTSAScrTQZk`  
**Table:** Event Log (`tblOHIZxXAq3gHgm4`)

Single record per day with:
- Date, gratitude, happiness, activities, energy, mood, notes
- Food field combines all meals

---

**Note:** All helper scripts moved to `scripts/` folder for cleaner workspace organization. See `scripts/README.md` for full documentation.

## Examples

```markdown
### Cameras
- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH
- home-server → 192.168.1.100, user: admin

### TTS
- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.
