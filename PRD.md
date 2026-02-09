# Product Requirements Document: Personal Command Center

**Version:** 2.0  
**Date:** February 8, 2026  
**Author:** Hal + Dave  
**Status:** Draft - Expanded Scope

**📝 Scope Change Note:**  
Originally started as "Interests Management Dashboard" but expanded to full Personal Command Center after Dave's feedback. This is now a unified dashboard for memory, activity tracking, to-do's, content recommendations, interests, and more.

**Project Naming:**  
Current folder: `interests-dashboard/`  
Suggested rename: `personal-command-center/` or `mission-control/` or `hal-dashboard/`  
(To be decided)

---

## 1. Overview

### Purpose
Create a **Personal Command Center** - a unified dashboard for managing Dave's digital life. This dashboard serves as the central hub for:
- Memory & context (browsing memory files)
- Recent activity tracking (Airtable Event Log)
- Task management (to-do's)
- Content curation (YouTube recommendations, Twitter monitoring)
- Interest management (topics Hal tracks for recommendations)
- Other aggregated information

Replaces scattered files, multiple tools, and manual tracking with a single, beautiful, integrated interface.

### Problem Statement
Dave's information is fragmented across:
- Text files (USER.md, TOOLS.md, memory/*.md)
- Airtable (Event Log)
- YouTube subscriptions
- Twitter feeds
- Mental to-do lists
- Various APIs and services

**This creates:**
- No unified view of "what's happening"
- Hard to access memories/context quickly
- Content scattered across platforms
- Manual effort to check everything
- No single "control center" for daily operations

### Goals
1. **Unified Interface** - One dashboard for everything important
2. **Real-time Updates** - Live data from all sources
3. **Beautiful Design** - Professional, polished UI (Pencil.dev mockup)
4. **Easy Management** - Add/edit/organize everything visually
5. **Hal Integration** - Programmatic access for AI curation & assistance
6. **Fast & Responsive** - Instant loading, smooth interactions

### Inspiration
**TWIST Mission Control Dashboard** (Episode E2246, timestamp 40:29)
- Next.js + React architecture
- Activity feed with real-time updates
- Multi-panel interface (monitoring, control, tasks)
- Clean, modern design
- Kanban drag-and-drop functionality
- Auto-sync to data files

---

## 2. User Stories

**As Dave, I want to:**

**Memory & Context:**
- Browse my memory files (daily logs, MEMORY.md) easily
- Search across all memories
- See recent memories highlighted
- Access specific dates/entries quickly

**Activity & Events:**
- View recent Airtable Event Log entries
- See trends (gratitude, mood, activities)
- Quick-add new daily entries
- Visualize patterns over time

**Tasks & To-Do's:**
- View all active to-do's in one place
- Add/complete/delete tasks easily
- Organize by priority or project
- See what's urgent vs long-term

**Content Curation:**
- See Hal's recommended YouTube videos (with context/reasons)
- Browse important Twitter messages/mentions
- Filter content by interest category
- Mark content as viewed/read
- Discover new content aligned with interests

**Interests Management:**
- View all tracked interests visually
- Add new interests quickly (topic, category, keywords)
- Edit/delete interests
- See interests grouped by category
- Set priority levels

**As Hal, I want to:**
- Programmatically access all dashboard data
- Update recommendations in real-time
- Query Dave's interests for content curation
- Track what content has been shown/viewed
- Learn new interests from conversation
- Surface important information proactively

---

## 3. Core Features

### MVP (Phase 1) - Foundation
**Dashboard Framework:**
- [ ] Next.js + React application
- [ ] Clean, modern UI (based on Pencil.dev mockup)
- [ ] Multi-panel layout (responsive grid)
- [ ] Real-time data updates
- [ ] Local web server (localhost:3000)
- [ ] Dark mode support

**Interests Panel:**
- [ ] View all interests (card or list view)
- [ ] Add/edit/delete interests
- [ ] Category grouping
- [ ] Priority levels (high/medium/low)
- [ ] Search terms management
- [ ] JSON data storage

**Memory Browser:**
- [ ] Read memory/*.md files
- [ ] Browse by date
- [ ] Search across memories
- [ ] Recent entries highlighted
- [ ] Quick navigation

**Content Recommendations:**
- [ ] YouTube video recommendations (from Hal)
- [ ] Display with context/reasons
- [ ] Mark as viewed
- [ ] Filter by category
- [ ] Direct video links

### Phase 2 - Enhanced Features
**Activity Panel:**
- [ ] Airtable Event Log integration
- [ ] View recent entries
- [ ] Quick-add new entry
- [ ] Mood/gratitude visualization
- [ ] Activity trends

**To-Do's Panel:**
- [ ] Task list (system TBD)
- [ ] Add/complete/delete tasks
- [ ] Priority levels
- [ ] Due dates
- [ ] Project grouping

**Twitter Panel:**
- [ ] Important mentions/messages
- [ ] Filtered AI discussion feed
- [ ] Mark as read
- [ ] Direct Twitter links
- [ ] Trending topics

**Enhanced Interests:**
- [ ] Drag-and-drop reordering
- [ ] Bulk operations
- [ ] Import/export
- [ ] Related topic suggestions

### Phase 3 - Advanced Features
**Analytics & Insights:**
- [ ] Content consumption patterns
- [ ] Interest engagement tracking
- [ ] Memory growth visualization
- [ ] Activity trends over time

**Integrations:**
- [ ] Calendar events
- [ ] Email summaries
- [ ] News aggregation
- [ ] Weather/location data

**Advanced UI:**
- [ ] Customizable layouts
- [ ] Widget system
- [ ] Keyboard shortcuts
- [ ] Mobile app (Progressive Web App)

---

## 4. Data Model

### Interest Object
```json
{
  "id": "uuid-string",
  "topic": "Monte Carlo Historique Rally",
  "category": "automotive",
  "priority": "high",
  "searchTerms": [
    "Monte Carlo Historique",
    "classic rally Monaco",
    "historic rally"
  ],
  "dateAdded": "2026-02-08T18:35:00Z",
  "dateModified": "2026-02-08T18:35:00Z",
  "notes": "Annual historic rally, usually January",
  "active": true
}
```

### Categories
- `ai` - Artificial Intelligence & Technology
- `automotive` - Vintage cars, rallies, racing
- `cycling` - Training, tech, events
- `photography` - Techniques, gear, composition
- `politics` - News, policy, analysis
- `business` - Startups, entrepreneurship, economics
- `other` - Misc interests

### Priority Levels
- `high` - Check frequently, always include in briefings
- `medium` - Regular monitoring, include when relevant
- `low` - Casual interest, occasional mentions

---

## 5. Technical Architecture

### Design Phase

**Before coding, design in Pencil.dev:**
1. Create mockups for all major panels
2. Define color scheme, typography, spacing
3. Design interactions (modals, transitions, states)
4. Export design specs/screenshots
5. Share with Codex for implementation

**Design deliverables:**
- Full dashboard mockup (desktop view)
- Individual panel designs
- Component library (buttons, cards, forms)
- Color palette & typography system
- Interaction specs

### Selected Stack

**Next.js + React** (inspired by TWIST Mission Control)

**Why this stack:**
- Same as TWIST Mission Control (proven approach)
- Built-in API routes (no separate backend)
- React components (matches Pencil.dev export)
- Fast, modern, extensible
- Easy to add real-time features later

**Frontend:**
- Next.js 14+ (App Router)
- React 18+
- Tailwind CSS (utility-first styling)
- shadcn/ui or similar component library
- Real-time updates (polling or WebSockets)

**Backend:**
- Next.js API Routes
- File-based storage (JSON files)
- Integration adapters (YouTube API, Airtable, Twitter)

**Storage:**
- `data/interests.json` - Interests database
- `data/recommendations.json` - Cached recommendations
- `data/todos.json` - To-do list (Phase 2)
- Direct file access to `~/clawd/memory/*.md`
- API calls to Airtable, YouTube, Twitter

### File Structure
```
personal-command-center/
├── package.json
├── next.config.js
├── tailwind.config.js
├── README.md
├── PRD.md
├── DESIGN.md                  # Design specs from Pencil
├── design/                    # Mockups, assets
│   ├── mockups/
│   └── assets/
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── page.tsx          # Main dashboard
│   │   ├── layout.tsx
│   │   └── api/              # API routes
│   │       ├── interests/
│   │       ├── memory/
│   │       ├── recommendations/
│   │       └── todos/
│   ├── components/           # React components
│   │   ├── InterestsPanel.tsx
│   │   ├── MemoryBrowser.tsx
│   │   ├── RecommendationsPanel.tsx
│   │   ├── ActivityPanel.tsx
│   │   └── TodosPanel.tsx
│   └── lib/                  # Utilities
│       ├── interests.ts
│       ├── memory.ts
│       ├── airtable.ts
│       ├── youtube.ts
│       └── twitter.ts
└── data/                     # JSON storage
    ├── interests.json
    ├── recommendations.json
    └── todos.json
```

### API Endpoints

**Interests:**
```
GET    /api/interests          # Get all
POST   /api/interests          # Create
PUT    /api/interests/:id      # Update
DELETE /api/interests/:id      # Delete
```

**Memory:**
```
GET    /api/memory             # List all memory files
GET    /api/memory/:date       # Get specific date
GET    /api/memory/search?q=   # Search memories
```

**Recommendations:**
```
GET    /api/recommendations    # Get current recommendations
POST   /api/recommendations/refresh  # Force refresh
PUT    /api/recommendations/:id/viewed  # Mark as viewed
```

**To-Do's (Phase 2):**
```
GET    /api/todos              # Get all tasks
POST   /api/todos              # Create task
PUT    /api/todos/:id          # Update task
DELETE /api/todos/:id          # Delete task
```

**Activity (Phase 2):**
```
GET    /api/activity           # Get recent Airtable entries
POST   /api/activity           # Add new entry
GET    /api/activity/trends    # Get analytics
```

**Twitter (Phase 2):**
```
GET    /api/twitter/mentions   # Important mentions
GET    /api/twitter/feed       # Filtered AI feed
```

---

## 6. UI/UX Design

### Design Process

**Phase 1: Design in Pencil.dev**
- Create full dashboard mockup
- Design individual panels (interests, memory, recommendations, etc.)
- Define color scheme, typography, spacing
- Export specs/assets for development

**Phase 2: Implement in Next.js**
- Build from Pencil mockup
- Match design precisely
- Add interactions and real-time features

### Conceptual Layout

**High-level dashboard structure:**
```
┌─────────────────────────────────────────────────────────────┐
│  Personal Command Center                  [Settings] [User] │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │  📺 Recommended  │  │  🧠 Memory       │  ┌───────────┐ │
│  │     Videos       │  │     Browser      │  │ 🎯 Intere │ │
│  │                  │  │                  │  │    sts    │ │
│  │  • Video 1       │  │  Recent:         │  │           │ │
│  │  • Video 2       │  │  • 2026-02-08    │  │  • AI     │ │
│  │  • Video 3       │  │  • 2026-02-07    │  │  • Auto   │ │
│  │                  │  │  [Search]        │  │  • Cycle  │ │
│  └──────────────────┘  └──────────────────┘  └───────────┘ │
│                                                              │
│  ┌──────────────────┐  ┌──────────────────┐  ┌───────────┐ │
│  │  ✅ To-Do's      │  │  📊 Activity     │  │ 🐦 Twitte │ │
│  │                  │  │     Log          │  │    r      │ │
│  │  • Task 1        │  │                  │  │           │ │
│  │  • Task 2        │  │  Gratitude: ...  │  │  Mention  │ │
│  │  [+ Add]         │  │  Mood: 8/10      │  │  • ...    │ │
│  └──────────────────┘  └──────────────────┘  └───────────┘ │
└─────────────────────────────────────────────────────────────┘
```

**This is just a concept - actual design will come from Pencil.dev!**

### Panel Specifications

**Each panel should have:**
- Clear title/icon
- Relevant actions (add, refresh, settings)
- Content area (scrollable if needed)
- Status indicators (loading, error, empty states)
- Consistent styling

### Design Requirements (for Pencil)

**Color Scheme:**
- TBD by Dave in Pencil.dev
- Dark mode support required
- Priority indicators (high/medium/low)
- Status colors (success/warning/error)

**Typography:**
- Clear hierarchy (headings, body, labels)
- Readable at dashboard scale
- Consistent across panels

**Layout:**
- Responsive grid (adapts to screen size)
- Panel sizing (fixed vs flexible)
- Spacing/padding consistency
- Clean visual separation

**Interactions:**
- Hover states
- Click/tap feedback
- Modal designs (add/edit forms)
- Loading states
- Empty states
- Error states

### Responsive Design Strategy

**Critical Requirement:** Dashboard must work seamlessly on both 13" laptop (MacBook Air) and 27" desktop displays.

**Breakpoints:**
```
- Mobile: < 768px (future consideration)
- Tablet: 768px - 1280px
- Small Desktop (13" laptop): 1280px - 1920px
- Large Desktop (27" monitor): > 1920px
```

**Layout Adaptations:**

**13" Laptop (1280px - 1920px):**
- **2-column grid** - Primary content left, secondary right
- **Stacked panels** - Vertical scrolling for overflow
- **Compact spacing** - Tighter padding, smaller text
- **Hidden secondary info** - Collapse less critical details
- **Example:** Memory + Activity on left, Twitter + Recommendations on right

**27" Desktop (> 1920px):**
- **3-4 column grid** - Maximum information density
- **Side-by-side panels** - Less scrolling required
- **Expanded details** - Show more content per card
- **Additional widgets** - Space for analytics, trends, insights
- **Example:** Memory | Activity | Twitter/Reddit | YouTube/arXiv

**Responsive Components:**
- Cards adjust width fluidly (min-width constraints)
- Text scales proportionally (rem units)
- Images/thumbnails resize appropriately
- Navigation adapts (hamburger on small, full nav on large)
- Modals/dialogs center regardless of screen size

**Implementation:**
```css
/* Tailwind breakpoints */
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {/* Responsive grid */}
</div>
```

### Scalability & Extensibility

**Design for Growth:** The dashboard will inevitably grow beyond the initial feature set.

**Scalability Strategies:**

**1. Tabbed Panel Groups**
- Group related feeds (Social: Twitter/Reddit, Research: arXiv/YouTube)
- Reduces visual clutter
- Easy to add new tabs without redesign
- Example: `Social | Research | Personal | Analytics`

**2. Collapsible/Expandable Panels**
- Each panel can minimize to header-only
- User customizes which panels are visible
- Saves vertical space
- Persistent state (remembers collapsed state)

**3. Dashboard Customization**
- Drag-and-drop panel reordering
- Hide/show panels based on user preference
- Pin favorite panels to top
- Save layout presets (Work Mode, Personal Mode, Research Mode)

**4. Infinite Scroll / Pagination**
- Content feeds load more on scroll
- Prevents performance issues with large datasets
- Virtualized lists for efficiency

**5. Filter & Search**
- Global search across all panels
- Per-panel filtering (e.g., Twitter by topic, Reddit by subreddit)
- Saved search queries
- Smart suggestions based on interests

**6. "More" Overflow Sections**
- Top 5-10 items visible by default
- "Show More" expands full list
- Keeps dashboard clean while maintaining access

**7. Widget System (Future)**
- Pluggable panel architecture
- Add new data sources without code changes
- Community-contributed widgets
- Example: Weather, Calendar, News, Stocks, etc.

**8. Performance Optimization**
- Lazy load panels (only render visible)
- Cache API responses (avoid redundant calls)
- Debounce real-time updates
- Progressive enhancement (core features first, extras load after)

**Adding New Data Sources (Scalability Checklist):**
1. Create new API endpoint (`/api/newsource`)
2. Design component mockup (NanoB or v0.dev)
3. Build React component (`components/NewSourcePanel.tsx`)
4. Add to dashboard grid
5. Update user preferences (allow hiding)
6. Test responsive behavior (13" & 27")

**Example Future Additions:**
- Email summaries (Gmail/Outlook integration)
- Calendar events (Google Calendar)
- Weather & location
- News aggregation (RSS feeds)
- Stocks/crypto tracking
- GitHub activity
- Fitness data (Apple Health, Strava)
- Smart home status
- And more...

### Design Questions for Dave

1. **Panel Priority:** Which panels are most important? (determines size/position)
2. **Information Density:** Compact (more data) vs spacious (easier reading)?
3. **Visual Style:** 
   - Minimalist/clean vs rich/colorful?
   - Flat design vs subtle shadows/depth?
   - Modern/tech vs warm/personal?
4. **Dark Mode:** Primary theme or optional?
5. **Navigation:** Tabs, sidebar, or all-in-one view?

---

## 7. Integration with Hal

### How Hal Uses This Dashboard

**Reading Dashboard Data:**
```javascript
// Access interests for content curation
const interests = await fetch('/api/interests').then(r => r.json());
const highPriority = interests.filter(i => i.priority === 'high');

// Search content based on interests
highPriority.forEach(interest => {
  searchYouTube(interest.searchTerms);
  searchTwitter(interest.searchTerms);
});

// Access memories for context
const recentMemories = await fetch('/api/memory').then(r => r.json());

// Check to-dos for reminders
const todos = await fetch('/api/todos').then(r => r.json());
```

**Writing to Dashboard:**
```javascript
// Add new recommendations
POST /api/recommendations
{
  videoId: "abc123",
  title: "AI News",
  reason: "Matches your interest in Claude Opus",
  category: "ai",
  priority: "high"
}

// Learn new interest from conversation
POST /api/interests
{
  topic: "Monte Carlo Historique Rally",
  category: "automotive",
  priority: "high",
  searchTerms: ["Monte Carlo Historique", "classic rally Monaco"]
}

// Suggest to-do's
POST /api/todos
{
  task: "Review PRD for dashboard project",
  priority: "high",
  dueDate: "2026-02-08"
}
```

### Hal Interaction Flows

**Morning Briefing:**
1. Read high-priority interests
2. Fetch new content (YouTube, Twitter, news)
3. Write recommendations to dashboard
4. Check today's to-do's
5. Review yesterday's memory entry
6. Generate briefing message with dashboard links

**On-Demand Recommendations:**
```
Dave: "What's new on YouTube?"

Hal:
  1. Loads interests from dashboard
  2. Searches YouTube based on interests
  3. Writes recommendations to dashboard
  4. Replies: "I found 10 new videos. Check the dashboard!"
     [Link to dashboard]
```

**Proactive Suggestions:**
```
Hal notices new topic mentioned in conversation:
  → POST /api/interests (with active: false, pending approval)
  → "I noticed you mentioned X. I added it to your interests dashboard for review."
```

### Data Access Patterns

**Read Access:**
- Interests database (for content curation)
- Memory files (for context/continuity)
- To-do's (for reminders/suggestions)
- Activity log (for wellness check-ins)

**Write Access:**
- Recommendations (populate dashboard)
- Suggested interests (pending approval)
- Memory entries (daily logs)
- Activity tracking (Airtable sync)

**Notifications:**
- Important Twitter mentions
- Urgent to-do's
- Memory insights ("You mentioned X 3 times this week...")
- Content alerts ("New video from Matthew Berman")

---

## 8. Success Criteria

### MVP Success
- [ ] Dave can view all interests in browser
- [ ] Dave can add/edit/delete interests without editing JSON manually
- [ ] Hal can programmatically query interests for recommendations
- [ ] Dashboard loads in <1 second
- [ ] Changes persist correctly

### Long-term Success
- Dave uses it regularly (weekly+)
- Improves quality of recommendations
- Reduces "I'm not interested in that" feedback
- Dave adds new interests organically as they arise

---

## 9. Open Questions

### Critical Decisions Needed

1. **To-Do's System:**
   - Use Apple Reminders (we have the skill)?
   - Build custom to-do system in dashboard?
   - Import from another service?
   - Simple list or full task manager (projects, due dates, etc.)?

2. **Twitter "Important Messages":**
   - What makes a message important?
   - Mentions of @davedellaquila?
   - Messages from specific people?
   - Keywords/topics?
   - AI-related discussions only?

3. **Memory Browser Scope:**
   - Read-only or allow editing from dashboard?
   - Full-text search across all files?
   - Tag/categorize memories?
   - Link memories to interests/events?

4. **Activity Panel:**
   - Just view Airtable data or allow editing?
   - Should dashboard replace daily check-in flow?
   - What visualizations/charts are useful?

5. **Phase 1 vs Phase 2:**
   - What MUST be in MVP vs can wait?
   - Launch with fewer panels but polished?
   - Or launch with all panels but rough?

### Design Questions

6. **Panel Priority:**
   - Which panels are most important? (affects size/position)
   - What do you check most often?

7. **Visual Style:**
   - Minimalist/clean or rich/colorful?
   - Flat design or subtle shadows/depth?
   - Modern/tech aesthetic or warm/personal?
   - Inspiration images or sites you like?

8. **Information Density:**
   - Compact layout (more visible at once)?
   - Spacious layout (easier reading)?
   - Let user customize?

9. **Dark Mode:**
   - Primary theme or optional toggle?
   - Time-based auto-switching?

10. **Navigation:**
    - All panels visible at once (scrollable grid)?
    - Tabs to switch between sections?
    - Sidebar navigation?
    - Customizable layout?

### Technical Questions

11. **Access:**
    - Local-only (localhost)?
    - Accessible remotely (through OpenClaw gateway)?
    - Login/security needed?

12. **Real-time Updates:**
    - Polling (check for updates every X seconds)?
    - WebSockets (instant push updates)?
    - Manual refresh buttons?

13. **Data Refresh:**
    - Auto-refresh recommendations daily?
    - Cache Twitter/YouTube data?
    - How often to poll external APIs?

14. **Mobile:**
    - Desktop-first, mobile later?
    - Responsive from day one?
    - Separate mobile app eventually?

---

## 10. Next Steps

### Phase 1: Requirements & Design
1. ✅ **Draft PRD** - Broad vision captured
2. ⏳ **Dave reviews PRD** - Answer open questions, clarify scope
3. ⏳ **Finalize MVP scope** - Decide which panels for Phase 1
4. ⏳ **Design in Pencil.dev** - Create mockups for all panels
5. ⏳ **Export design specs** - Documentation for Codex

### Phase 2: Development
6. **Create seed data** - Populate interests.json, etc.
7. **Launch Codex** - Build dashboard from Pencil mockup + PRD
8. **Iterative development** - Build panel by panel
9. **Integration work** - Connect APIs (YouTube, Twitter, Airtable)
10. **Testing** - Verify all features work

### Phase 3: Launch & Iterate
11. **Deploy locally** - Run on localhost
12. **Daily usage** - Test in real workflow
13. **Gather feedback** - What's working? What's missing?
14. **Iterate** - Refine based on usage
15. **Phase 2 features** - Add advanced panels/features

### Immediate Next Actions
- [ ] Dave answers open questions (especially to-do's system, Twitter filtering)
- [ ] Decide MVP panel list (which panels in Phase 1?)
- [ ] Dave creates Pencil.dev mockup
- [ ] Rename project folder? (personal-command-center vs interests-dashboard)

---

## Appendix A: Current Known Interests

**AI & Technology:**
- Claude, GPT, LLMs
- AI agents & automation
- Post-labor economics
- AI coding tools

**Automotive:**
- Monte Carlo Historique Rally (NEW)
- Dakar Rally (NEW)
- Vintage sports cars
- Group B rally cars
- Sports Car Adventures events
- Classic car restoration

**Cycling:**
- Training methodology
- Bike mechanics
- Performance optimization

**Photography:**
- Composition techniques
- Storytelling
- Equipment/gear

**Other:**
- Pool/billiards
- UX/product design
- Wellness tracking
- Data visualization

*(This should be migrated to interests.json once dashboard is built)*

---

**End of PRD v1.0**

*Next: Dave feedback → Design mockup → Codex build*
