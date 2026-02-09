"use client"

import { Brain, MoreHorizontal, Search, ChevronRight } from "lucide-react"

const memories = [
  {
    id: 1,
    title: "Recent Memories: the future of indene alkers...",
    date: "February 30, 2025",
    type: "note",
  },
  {
    id: 2,
    title: "Mentoring: Delhi workshop as Soogh community in bio...",
    date: "February 23, 2025",
    type: "event",
  },
  {
    id: 3,
    title: "Building to the new Content Atlas in the ER...",
    date: "February 22, 2025",
    type: "project",
  },
  {
    id: 4,
    title: "Rengfxi intersearch datahered Technology...",
    date: "February 27, 2025",
    type: "research",
  },
  {
    id: 5,
    title: "Pre-kuad-klew-teklog, and lelrients",
    date: "February 27, 2025",
    type: "note",
  },
  {
    id: 6,
    title: "Suterannir varkontayout fire-enalturnmess...",
    date: "February 22, 2025",
    type: "research",
  },
]

const typeColors: Record<string, string> = {
  note: "bg-primary/20 text-primary",
  event: "bg-emerald-500/20 text-emerald-400",
  project: "bg-amber-500/20 text-amber-400",
  research: "bg-sky-500/20 text-sky-400",
}

export function MemoryPanel() {
  return (
    <section className="flex flex-col bg-card rounded-xl border border-border overflow-hidden">
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          <h2 className="text-base font-semibold text-foreground">Memory</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            Recall & Storage: <span className="text-foreground font-medium">87%</span>
          </span>
          <button className="p-1 rounded-md hover:bg-secondary/50 text-muted-foreground transition-colors" aria-label="More options">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="px-5 pb-3">
        <div className="flex items-center px-3 py-1.5 rounded-lg bg-secondary/60 border border-border">
          <Search className="w-3.5 h-3.5 text-muted-foreground mr-2" />
          <input
            type="text"
            placeholder="Search memories..."
            className="bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none w-full"
            aria-label="Search memories"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-1 max-h-80">
        {memories.map((memory) => (
          <button
            key={memory.id}
            className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/40 transition-colors text-left group"
          >
            <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${
              memory.type === "note" ? "bg-primary" :
              memory.type === "event" ? "bg-emerald-400" :
              memory.type === "project" ? "bg-amber-400" :
              "bg-sky-400"
            }`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground truncate leading-snug">
                {memory.title}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground">{memory.date}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${typeColors[memory.type]}`}>
                  {memory.type}
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1 shrink-0" />
          </button>
        ))}
      </div>

      <div className="px-5 py-3 border-t border-border">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Recall & Storage</span>
          <span className="text-foreground font-medium">87%</span>
        </div>
        <div className="mt-1.5 w-full h-1.5 rounded-full bg-secondary">
          <div className="h-full w-[87%] rounded-full bg-primary transition-all duration-500" />
        </div>
      </div>
    </section>
  )
}
