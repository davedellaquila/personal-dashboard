# SOLO → Knowledge Graph Design Workshop
**Status:** Scheduled - Waiting for Dave's focused time  
**Goal:** Translate Rae Assist principles into 2026 knowledge base architecture

---

## Workshop Structure

### Session 1: SOLO Linking Mechanics (30-45 min)

**Q1: How did SOLO decide what to link?**

When a user created a contact/event/note, how did the system determine connections?

Possibilities:
- **Field matching** (same company name → auto-link contact to company)
- **Keyword detection** (mentioned "quarterly review" → link to Q1 event)
- **User behavior** (viewed together → they're related)
- **Manual rules** (user-defined "if X then link to Y")
- **Something else?**

**Example scenario:**
```
User creates contact: "John Smith, CEO at Acme Corp"
User creates calendar event: "Meeting with Acme team"
User creates note: "Ideas for Acme pitch"

What happened automatically?
```

**Q2: What did "linking" look like to the user?**

- How did you *see* the connection? (visual indicator? clickable? graph view?)
- How did you *navigate* it? (click through? sidebar? popup?)
- Could you see *all* links for one item? ("Show everything related to this contact")
- Was there a strength/relevance score visible?

**Goal:** Understand the UX of SOLO linking to translate into modern graph navigation

---

### Session 2: Data Architecture (30 min)

**Q3: How were relationships stored?**

Technical architecture questions:
- Database schema for links/relationships?
- One-way or bidirectional references?
- Typed relationships (e.g., "contact works-at company" vs generic "related-to")?
- How did you handle circular references?
- What was the performance bottleneck in v1.0?

**Q4: What made v2.0 faster?**

You rewrote it and got 3-second launch (vs slow v1.0):
- Different database approach?
- Caching strategy?
- Lazy loading?
- Data structure changes?
- Just better code/PowerPC native?

**Goal:** Learn from performance lessons to avoid same mistakes

---

### Session 3: User Workflows (30 min)

**Q5: How did people actually use it?**

Power user patterns:
- **Capture-heavy?** (Quick input throughout day, review later)
- **Search-heavy?** (Find specific thing fast)
- **Browse-heavy?** (Explore connections, discover)
- **Review-based?** (Daily/weekly review of linked items)

**Q6: Which features were loved vs. ignored?**

- Most used features?
- Features you built that nobody used?
- Feature requests you couldn't do (but wanted to)?
- Surprising usage patterns?

**Goal:** Prioritize what matters, skip what doesn't

---

### Session 4: Modern Translation (45 min)

**Q7: AI-powered linking vs. SOLO's approach**

Modern capability:
```python
# Semantic similarity via embeddings
similarity = cosine_similarity(
  embedding("Meeting with Acme team"),
  embedding("Ideas for Acme pitch")
) # → 0.87 (highly related!)
```

vs. SOLO's 1992 approach (keyword/field matching)

**Questions:**
- Would you trust AI to auto-link? Or require user confirmation?
- How much control should users have over links?
- Should links be editable/deletable?
- How do you surface "confidence" in a link?

**Q8: What would you do differently today?**

If redesigning with modern tools:
- **Top 3 must-preserve** from SOLO/Rae Assist
- **Top 3 things to discard/change**
- **Top 3 new capabilities** (AI/cloud/mobile)

**Goal:** Define the architecture principles for Personal Command Center knowledge base

---

### Session 5: Visual Design & UX (30 min)

**Q9: Graph view vs. other navigation**

Options for displaying knowledge graph:
1. **Obsidian-style graph** (nodes + edges, interactive)
2. **Timeline view** (chronological with connections)
3. **Sidebar links** (current item + "related items" list)
4. **All of the above** (multiple views)

Which feels right for the workflow?

**Q10: Quick capture UX**

How should adding new knowledge feel?
- Global keyboard shortcut (Cmd+K)?
- Voice input → auto-transcribe?
- Browser extension "clip this"?
- Email forwarding?
- SMS/iMessage integration?

**Goal:** Design the capture → link → discover flow

---

## Pre-Work (Done)

✅ Rae Assist research complete (`RAE-ASSIST-RESEARCH.md`)  
✅ Technical comparison (SOLO → modern stack)  
✅ Podcast transcription workflow built  
✅ Example knowledge items (AppStories 470 transcript + insights)

---

## Session Deliverables

By end of workshop, we'll have:

1. **Architecture document** - How knowledge graph works (SOLO-inspired)
2. **Data model** - Schema for nodes, links, embeddings
3. **UX wireframes** - Key screens (search, graph view, quick capture)
4. **Implementation roadmap** - Phase 1, 2, 3 with concrete milestones
5. **Success metrics** - How we'll know it works

---

## Scheduling

**Ideal format:**
- 2-3 hour focused block (can split into multiple sessions)
- Whiteboard/screen share helpful (if remote)
- Record session for reference

**Best times for Dave:**
- [ ] Weekday morning (after morning briefing)?
- [ ] Weekday afternoon (before evening wind-down)?
- [ ] Weekend (no interruptions)?

**Preferred medium:**
- [ ] In-person (if possible)
- [ ] Video call (Zoom/FaceTime)
- [ ] Voice call
- [ ] Async (Telegram back-and-forth, but slower)

---

## Why This Matters

You solved this problem in 1992. The core insight was **right** - free-form, linked objects, automatic connections.

The execution was limited by:
- Slow databases
- Single machine
- No AI/ML
- Small platform

Now we can build what you envisioned, but with:
- Vector embeddings (semantic similarity)
- Cloud sync (access anywhere)
- AI transcription (podcast → searchable text)
- Graph databases (fast relationship queries)
- Modern web (responsive, cross-platform)

**This is Rae Assist 3.0** - same soul, modern superpowers.

---

**Status:** Ready when you are. Just say when! 🚀
