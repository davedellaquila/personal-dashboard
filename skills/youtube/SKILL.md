# YouTube Data API Skill

**Purpose:** Access YouTube viewing history, subscriptions, and search to curate content recommendations.

## Authentication

OAuth 2.0 credentials stored in `.youtube-config.json` (workspace root).

**Initial setup (one-time):**
```bash
node scripts/youtube-oauth.js
```

**Manual code exchange (if needed):**
```bash
node scripts/youtube-exchange-code.js "<authorization_code>"
```

## Available Commands

### Get Subscriptions
```bash
node scripts/youtube-helper.js subscriptions [--max=50]
```
Returns list of channels you're subscribed to.

### Get Watch History  
```bash
node scripts/youtube-helper.js history [--max=50]
```
Returns recent activity (subscriptions, uploads from subscribed channels).

### Get Liked Videos
```bash
node scripts/youtube-helper.js liked [--max=50]
```
Returns videos you've liked.

### Search YouTube
```bash
node scripts/youtube-helper.js search "query" [--max=10]
```
Search YouTube for videos matching query.

## Usage Patterns

### Morning Briefing Content
1. Check subscriptions for recent uploads from key channels
2. Search for trending topics related to Dave's interests (AI, vintage cars, cycling)
3. Identify 2-3 top videos worth highlighting

### Analyzing Viewing Patterns
```bash
# Get recent subscriptions
node scripts/youtube-helper.js subscriptions --max=20 | jq -r '.[].title'

# Search for specific topics
node scripts/youtube-helper.js search "AI news" --max=5
```

## Output Format

All commands return JSON arrays. Use `jq` for filtering:
```bash
# Just channel titles from subscriptions
node scripts/youtube-helper.js subscriptions | jq -r '.[].title'

# Video titles from search
node scripts/youtube-helper.js search "vintage cars" | jq -r '.[].title'
```

## Rate Limits

YouTube Data API quota: 10,000 units/day
- Each search: ~100 units
- Each list operation: ~1-3 units
- Stay within limits by batching requests

## Token Refresh

Tokens auto-refresh when expired. Refresh token stored in `.youtube-config.json`.

If authentication breaks:
1. Delete `.youtube-config.json` tokens
2. Run `node scripts/youtube-oauth.js` again

## Integration Points

### Morning Briefing
Include curated YouTube picks:
- Latest from key AI channels (OpenAI, Anthropic, etc.)
- New automotive content
- Cycling-related videos

### Content Discovery
Help Dave find:
- Deep dives on AI developments
- Rally/driving event content
- Technical cycling videos
- Photography tutorials

## Files

- `.youtube-config.json` - OAuth credentials & tokens (workspace root)
- `scripts/youtube-oauth.js` - Initial authentication flow
- `scripts/youtube-exchange-code.js` - Manual code exchange
- `scripts/youtube-helper.js` - Main API interaction script
- `skills/youtube/SKILL.md` - This file

## Security

- Credentials are in workspace (not committed to git)
- Read-only access to YouTube data
- Tokens refresh automatically
- Bearer token scopes: `youtube.readonly`, `youtube.force-ssl`

## Created

February 8, 2026 - Initial setup with Dave's Google account.
