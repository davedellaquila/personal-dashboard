"use client"

import { FileText, MoreHorizontal, Clock } from "lucide-react"

const notes = [
  {
    id: 1,
    title: "Wordverting communes dashboards and design patterns",
    time: "2 days ago",
  },
  {
    id: 2,
    title: "This a mondwcaring process in knowledge management",
    time: "2 days ago",
  },
  {
    id: 3,
    title: "Direct note texts for the second brain approach",
    time: "2 days ago",
  },
  {
    id: 4,
    title: "How to deploy the mind map visualization tool",
    time: "3 days ago",
  },
]

export function RecentNotes() {
  return (
    <section className="flex flex-col bg-card rounded-xl border border-border overflow-hidden">
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          <h2 className="text-base font-semibold text-foreground">Recent Notes</h2>
        </div>
        <button className="p-1 rounded-md hover:bg-secondary/50 text-muted-foreground transition-colors" aria-label="More options">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 px-5 pb-5">
        {notes.map((note) => (
          <button
            key={note.id}
            className="flex flex-col p-3 rounded-lg bg-secondary/40 border border-border hover:bg-secondary/60 transition-colors text-left"
          >
            <p className="text-xs text-foreground line-clamp-2 leading-relaxed">
              {note.title}
            </p>
            <div className="flex items-center gap-1 mt-2">
              <Clock className="w-3 h-3 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground">{note.time}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
