# Design Brief: Personal Command Center

**Project:** Personal Command Center Dashboard  
**Designer:** Dave Dell'Aquila  
**Tool:** Pencil.dev  
**Date:** February 8, 2026  
**Reference:** PRD v2.0

---

## Overview

This document guides the design process for the Personal Command Center dashboard in Pencil.dev. It outlines all panels, components, states, and design system requirements needed for a complete mockup.

## Design Goals

1. **Beautiful & Professional** - Polished UI worthy of daily use
2. **Information Dense** - Show a lot without feeling cluttered
3. **Scannable** - Quick visual parsing of what's important
4. **Consistent** - Unified design language across all panels
5. **Intuitive** - Clear actions, obvious interactions
6. **Inspired by TWIST Mission Control** - Modern, clean, functional

---

## Canvas Setup

### Artboard Size
- **Desktop primary:** 1920x1080 (Full HD)
- **Also design:** 1440x900 (MacBook Air/Pro common size)
- Consider: Responsive breakpoints for smaller screens

### Grid System
- 12-column grid with ~24px gutters
- 8px baseline grid for vertical rhythm
- Panel padding: 16-24px
- Inter-panel spacing: 16-24px

---

## Design System

### Color Palette

**To be defined by you, but consider:**

**Background Tiers:**
- Level 1: Page background (darkest/lightest)
- Level 2: Panel background
- Level 3: Nested content areas

**Accent Colors:**
- Primary: Main actions, links, brand
- Success: Completed tasks, positive states
- Warning: Important items, pending actions
- Error: Problems, alerts
- Info: Neutral information

**Priority Indicators:**
- High: Warm color (red, orange)
- Medium: Neutral (blue, purple)
- Low: Cool (gray, muted)

**Dark Mode:**
- Primary theme or toggle?
- Ensure sufficient contrast (WCAG AA minimum)

### Typography

**Hierarchy:**
- **H1:** Dashboard title (~24-32px, bold)
- **H2:** Panel titles (~18-24px, semi-bold)
- **H3:** Section headers (~16-18px, medium)
- **Body:** Content text (~14-16px, regular)
- **Small:** Metadata, timestamps (~12-14px, regular)
- **Label:** Form labels, buttons (~14px, medium)

**Font Suggestions:**
- System fonts: -apple-system, SF Pro, Segoe UI
- Or web fonts: Inter, Roboto, Work Sans
- Monospace for code/data: SF Mono, Fira Code

### Spacing Scale
- XS: 4px
- S: 8px
- M: 16px
- L: 24px
- XL: 32px
- XXL: 48px

### Component Styling
- **Border radius:** 4-8px (subtle rounded corners)
- **Shadows:** Subtle elevation for panels
- **Borders:** 1px, subtle color
- **Hover states:** Slight background change, scale, or shadow
- **Active states:** Darker/lighter, pressed effect
- **Focus states:** Outline or ring for accessibility

---

## Panel Specifications

### 1. Dashboard Header

**Content:**
- Title: "Personal Command Center" or custom
- User info: Avatar, name (optional)
- Actions: Settings icon, refresh, notifications
- Time/date display (optional)

**Size:** Full width, ~60-80px height

**States:**
- Default
- With notification badge

---

### 2. Interests Panel

**Content:**
- Panel title: "Interests" with icon 🎯
- Add button [+ New Interest]
- Category filter pills (All, AI, Auto, Cycling, etc.)
- Interest cards/list:
  - Topic name
  - Category badge
  - Priority indicator (high/medium/low)
  - Action menu (edit, delete)
  - Search terms (expandable?)

**Size:** ~300-400px wide, flexible height

**States:**
- Empty state (no interests yet)
- Populated (1-20+ interests)
- Hover on card
- Expanded card showing search terms
- Edit modal/inline form
- Loading state

**Interactions:**
- Click card to expand
- Hover shows actions
- Drag to reorder (optional for MVP)
- Filter by category

---

### 3. Memory Browser Panel

**Content:**
- Panel title: "Memory" with icon 🧠
- Search bar
- Date picker or calendar view
- Recent entries list:
  - Date
  - Preview snippet (first line)
  - Click to read full
- Navigation: Previous/Next day

**Size:** ~400-500px wide, flexible height

**States:**
- Loading
- Entry list view
- Full entry view (modal or expanded)
- Empty state (no memory for date)
- Search results

**Interactions:**
- Click date to view
- Search across all memories
- Scroll through recent entries
- Modal or side panel for full entry

---

### 4. Recommended Videos Panel

**Content:**
- Panel title: "Recommended for You" with icon 📺
- Refresh button
- Video cards:
  - Thumbnail image
  - Title
  - Channel name
  - "Why recommended" (Hal's reason)
  - Category badge
  - Watch button / direct link
  - "Mark as viewed" action

**Size:** ~500-600px wide, scrollable height

**States:**
- Loading (skeleton cards)
- Populated (3-10 videos)
- Empty state (no recommendations)
- Hover on card
- Viewed state (grayed out or hidden)

**Interactions:**
- Click to open YouTube
- Mark as viewed (checkmark or X)
- Hover shows more details
- Filter by category

---

### 5. Activity Panel

**Content:**
- Panel title: "Activity Log" with icon 📊
- Quick stats: Today's gratitude, mood, energy
- Recent entries (last 3-7 days):
  - Date
  - Gratitude bullet
  - Mood/energy indicators
  - Activities badges
- Quick-add button
- View full log link

**Size:** ~350-450px wide, flexible height

**States:**
- Today's entry exists
- Today's entry missing (prompt to add)
- Loading
- Historical view

**Interactions:**
- Click to view full entry
- Quick-add modal
- Simple trend visualization (optional)

---

### 6. To-Do's Panel

**Content:**
- Panel title: "To-Do's" with icon ✅
- Add task button [+ Add]
- Task list:
  - Checkbox (complete/incomplete)
  - Task text
  - Priority indicator
  - Due date (if set)
  - Delete/edit actions
- Filter: All, Active, Completed

**Size:** ~300-400px wide, flexible height

**States:**
- Empty (no tasks)
- Active tasks
- Completed tasks (strikethrough, grayed)
- Overdue (red indicator)
- Loading

**Interactions:**
- Check to complete
- Click to edit inline
- Add via modal or inline
- Delete with confirmation
- Filter toggle

---

### 7. Twitter Panel

**Content:**
- Panel title: "Twitter Feed" with icon 🐦
- Filter tabs: Mentions, AI News, All
- Tweet cards:
  - Author avatar & name
  - Tweet text (truncated if long)
  - Timestamp
  - "Why important" (if filtered by Hal)
  - Link to tweet
  - Mark as read action

**Size:** ~400-500px wide, scrollable height

**States:**
- Loading
- Populated (5-20 tweets)
- Empty (no new mentions)
- Unread indicator
- Read (grayed slightly)

**Interactions:**
- Click to open Twitter
- Mark as read
- Filter by type
- Auto-refresh interval

---

## Layouts

### Option A: Grid Layout (All Visible)

```
┌────────────────────────────────────────────┐
│  Header                                    │
├──────────┬──────────┬──────────┬──────────┤
│ Recomm.  │ Memory   │ Interest │ Activity │
│ Videos   │ Browser  │ Panel    │ Log      │
│          │          │          │          │
├──────────┼──────────┴──────────┤          │
│ Twitter  │ To-Do's              │          │
│ Feed     │                      │          │
│          │                      │          │
└──────────┴──────────────────────┴──────────┘
```

**Pros:** Everything visible at once  
**Cons:** Can feel cramped on smaller screens

---

### Option B: Tabbed Interface

```
┌────────────────────────────────────────────┐
│  Header                                    │
├────────────────────────────────────────────┤
│  [Videos] [Memory] [Interests] [Activity]  │
├────────────────────────────────────────────┤
│                                            │
│    Active Panel Content (full width)      │
│                                            │
└────────────────────────────────────────────┘
```

**Pros:** More space per panel, cleaner  
**Cons:** Can't see everything at once

---

### Option C: Sidebar + Main Area

```
┌──────┬──────────────────────────────────┐
│      │  Header                          │
│ Nav  ├──────────────────────────────────┤
│      │                                  │
│ •Rec │  Main Content Area               │
│ •Mem │  (Selected Panel)                │
│ •Int │                                  │
│ •Act │                                  │
│ •TD  │                                  │
│ •Tw  │                                  │
│      │                                  │
└──────┴──────────────────────────────────┘
```

**Pros:** Clear navigation, focused view  
**Cons:** Extra click to switch panels

---

### Option D: Dashboard + Quick Links

```
┌────────────────────────────────────────────┐
│  Header                  [All Panels ▼]    │
├──────────┬──────────┬────────────────────┤
│ Primary  │ Secondary│ Tertiary           │
│ Panel    │ Panel    │ Panel              │
│ (Recomm.)│ (Memory) │ (Quick Stats)      │
│          │          │                    │
└──────────┴──────────┴────────────────────┘
```

**Pros:** Prioritizes most-used panels  
**Cons:** Need to define hierarchy

---

**Your choice!** Design the layout that feels right.

---

## Component Library

Design reusable components:

### Buttons
- Primary (main actions)
- Secondary (less important)
- Tertiary (subtle actions)
- Danger (delete, destructive)
- Sizes: Small, Medium, Large
- States: Default, Hover, Active, Disabled

### Cards
- Standard panel card
- Video card
- Tweet card
- Memory entry card
- Task card
- Interest card

### Forms
- Text input
- Text area
- Select dropdown
- Checkbox
- Radio buttons
- Date picker

### Navigation
- Tabs
- Pills/filters
- Breadcrumbs (if needed)

### Indicators
- Priority badges (high/medium/low)
- Category tags
- Status dots (read/unread)
- Loading spinners
- Empty states

### Modals
- Add interest
- Edit interest
- Add task
- Add activity entry
- Full memory view
- Settings

---

## Interaction States

Design for ALL states:

### Loading States
- Skeleton screens (better than spinners)
- Progress indicators
- "Loading..." messages

### Empty States
- Friendly illustration or icon
- Clear message: "No interests yet"
- Call-to-action: "Add your first interest"

### Error States
- Clear error message
- Suggested action (retry, contact support)
- Don't break the whole dashboard

### Success States
- Toast notifications (subtle, bottom-right)
- Inline success messages
- Checkmark animations

---

## Responsive Considerations

**Desktop (1440px+):**
- Multi-column grid layout
- All panels visible (if grid layout)
- Comfortable spacing

**Laptop (1024-1440px):**
- Adjust panel sizes
- May stack some panels
- Maintain usability

**Tablet (768-1024px):**
- Single column or 2-column
- Collapsible panels
- Touch-friendly targets

**Mobile (< 768px):**
- Phase 2 concern
- But consider: Will Dave ever use on phone?

---

## Accessibility Checklist

- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Focus indicators on all interactive elements
- [ ] Keyboard navigation works
- [ ] Alt text for icons/images
- [ ] Labels for form inputs
- [ ] Logical heading hierarchy
- [ ] Don't rely on color alone for meaning

---

## Design Deliverables

**What to export from Pencil.dev:**

1. **Full Dashboard Mockup**
   - Desktop view (1920x1080 and 1440x900)
   - All panels in default state

2. **Individual Panel Designs**
   - Each panel in isolation
   - All states (loading, empty, populated, error)

3. **Component Library**
   - All buttons, cards, forms
   - All states documented

4. **Interaction Specs**
   - What happens on hover
   - What happens on click
   - Modal/overlay behaviors

5. **Color Palette**
   - All colors with hex codes
   - Usage guide (primary, secondary, etc.)

6. **Typography System**
   - Font choices
   - Size scale
   - Line heights, letter spacing

7. **Spacing System**
   - Margin/padding values
   - Grid specifications

8. **Screenshots for Codex**
   - High-res PNG exports
   - Annotated if needed ("This should link to...")

---

## Design Process Recommendations

1. **Start with wireframes** - Block out layout, don't worry about colors yet
2. **Define design system first** - Colors, typography, spacing
3. **Design one panel completely** - All states, perfect it
4. **Apply system to other panels** - Maintain consistency
5. **Review for usability** - Can you find everything quickly?
6. **Add polish** - Shadows, hover effects, animations (noted, not built)
7. **Export everything** - Document for Codex

---

## Questions to Answer While Designing

- [ ] Which layout feels best? (Grid, tabs, sidebar, hybrid)
- [ ] Dark mode or light mode primary? (or both?)
- [ ] What colors represent high/medium/low priority?
- [ ] How much information per card? (compact vs spacious)
- [ ] What panels are most important? (affects size/position)
- [ ] Should panels be collapsible?
- [ ] Fixed panel sizes or flexible/resizable?
- [ ] How should modals look? (centered, side panel, inline)

---

## Inspiration & References

**Similar Dashboards:**
- TWIST Mission Control (your inspiration)
- Notion dashboards
- Linear project management
- Superhuman email interface
- Raycast command palette

**Design Systems to Study:**
- Tailwind UI components
- Shadcn/ui (React components)
- Radix UI primitives
- Material Design 3
- Apple Human Interface Guidelines

---

## Tips for Pencil.dev

- **Use components/symbols** - Create reusable elements
- **Organize layers clearly** - Name everything
- **Use grids/guides** - Maintain alignment
- **Group related elements** - Easier to manage
- **Add annotations** - Note interactions, states
- **Export at 2x** - Retina-ready assets

---

## Next Steps After Design

1. **Review with Hal** - Get feedback on completeness
2. **Refine based on feedback** - Iterate if needed
3. **Export all assets** - Screenshots, specs, documentation
4. **Hand off to Codex** - PRD + design = working code
5. **Iterate after build** - Refine once you see it working

---

**Ready to design!** Open Pencil.dev and start creating. Focus on making it beautiful and functional - this is your daily command center. 🎨

Questions while designing? Just ask!
