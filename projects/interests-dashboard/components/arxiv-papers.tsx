"use client"

import { GraduationCap, MoreHorizontal, ExternalLink } from "lucide-react"

const papers = [
  {
    id: 1,
    title: "Developing New Methodolane in other ML Paper: Merantions from business ML Starring",
    source: "Recent ML",
    date: "July 19, 2025",
  },
  {
    id: 2,
    title: "ML Paper: Intercocion louard Espanse Anaethu: Rapert Relationshi uerate: Sartseelle Slaostios...",
    source: "Recent ML",
    date: "July 16, 2025",
  },
  {
    id: 3,
    title: "Imerosen: Ropnoing: auite-oounterrollttiig air amoroes of exitsilly atoneinliseoo athen-nttan pry...",
    source: "Recent ML",
    date: "July 19, 2025",
  },
  {
    id: 4,
    title: "ML Paper: Gutatixlangraptie Aav Prints to noives Non-littener-oscing Model-Inland Wnoro wk.",
    source: "Recent Lit. Papers",
    date: "July 13, 2025",
  },
]

export function ArxivPapers() {
  return (
    <section className="flex flex-col bg-card rounded-xl border border-border overflow-hidden">
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-primary" />
          <h2 className="text-base font-semibold text-foreground">arXiv Papers</h2>
        </div>
        <button className="p-1 rounded-md hover:bg-secondary/50 text-muted-foreground transition-colors" aria-label="More options">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto max-h-80">
        {papers.map((paper, idx) => (
          <article
            key={paper.id}
            className={`px-5 py-3 hover:bg-secondary/30 transition-colors ${
              idx < papers.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <p className="text-sm text-foreground leading-snug line-clamp-2">
              {paper.title}
            </p>
            <div className="flex items-center justify-between mt-1.5">
              <span className="text-[11px] text-muted-foreground">
                {paper.source} &middot; {paper.date}
              </span>
              <button className="text-muted-foreground hover:text-primary transition-colors" aria-label="Open paper">
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="px-5 py-3 border-t border-border">
        <button className="w-full text-center text-xs text-primary hover:text-primary/80 font-medium transition-colors">
          Browse All Papers
        </button>
      </div>
    </section>
  )
}
