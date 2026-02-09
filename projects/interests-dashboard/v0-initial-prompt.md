# v0.dev Initial Prompt - Personal Command Center Dashboard

## Copy and paste this into v0.dev:

---

Create a Personal Command Center dashboard called "BRAIN OS" with the following specifications:

**Tech Stack:**
- Next.js 14+ with App Router
- React 18+
- Tailwind CSS
- Dark theme (primary)
- Responsive design (13" laptop to 27" desktop)

**Layout:**
- Top navigation bar with logo/name "BRAIN OS", navigation tabs (Dashboard, Memory, Activity, Feeds, Settings), and user profile icon
- Main content area with responsive grid layout
- 2 columns on small screens (13" laptop: 1280px-1920px)
- 3-4 columns on large screens (27" desktop: >1920px)

**Panels/Components to include:**

1. **Memory Panel**
   - Title: "Memory"
   - Recent memory entries with date markers
   - Scrollable list view
   - Search functionality
   - Dark card backgrounds with subtle borders

2. **Daily Activity Panel**
   - Title: "Activity"
   - GitHub-style contribution heatmap (activity by day/time)
   - Color gradient from low (dark) to high (bright green)
   - Tooltips showing activity details on hover
   - Summary stats (total activities, trends)

3. **Twitter Feed Panel**
   - Title: "Twitter Feed"
   - Twitter logo/icon
   - List of tweet cards showing:
     - Avatar, username, timestamp
     - Tweet text (truncated if long)
     - Engagement metrics (likes, retweets, replies)
     - Links to full tweets
   - "View More" button

4. **Reddit Posts Panel**
   - Title: "Reddit Posts"
   - Reddit logo/icon
   - Post cards showing:
     - Subreddit badge (e.g., r/LocalLLaMA)
     - Post title
     - Upvote count with arrow icon
     - Comment count
     - Thumbnail preview (if available)
   - "View More" button

5. **YouTube Videos Panel** (optional for MVP)
   - Title: "Recommended Videos"
   - Video thumbnail previews
   - Video title and channel
   - Duration badge
   - Why recommended (AI context)

6. **arXiv Papers Panel** (optional for MVP)
   - Title: "arXiv Papers"
   - Paper titles
   - Authors, publication date
   - Category tags
   - Relevance score

**Design Style:**
- Modern, clean, professional
- Dark theme with subtle gradients
- Card-based UI with consistent spacing
- Rounded corners (border-radius: 8-12px)
- Smooth shadows for depth
- Accent colors: blue/teal for interactive elements
- High contrast text for readability
- Icons from Lucide or Heroicons

**Responsive Behavior:**
- Fluid grid that adapts from 2-column (laptop) to 4-column (desktop)
- Panels reflow smoothly
- Touch-friendly sizing on all screens
- Consistent padding and margins

**Interactions:**
- Hover states on cards
- Smooth transitions (200-300ms)
- Loading states (skeleton screens)
- Empty states (helpful messages when no data)
- Error states (friendly error messages)

**Initial Focus:**
Start with the top navigation and 3 core panels: Memory, Activity (with heatmap), and Twitter Feed. Make it responsive and visually polished. We'll add more panels after the foundation is solid.

Generate the complete Next.js app structure with these components.

---
