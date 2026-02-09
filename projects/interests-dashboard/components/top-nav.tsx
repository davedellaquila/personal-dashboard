"use client"

import { useState } from "react"
import {
  Brain,
  LayoutDashboard,
  BookOpen,
  Activity,
  Rss,
  Settings,
  Search,
  Bell,
  MessageSquare,
} from "lucide-react"

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Memory", icon: BookOpen },
  { label: "Activity", icon: Activity },
  { label: "Feeds", icon: Rss },
  { label: "Settings", icon: Settings },
]

export function TopNav() {
  const [active, setActive] = useState("Dashboard")

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            BRAIN OS
          </span>
        </div>

        <div className="hidden md:flex items-center ml-4 px-3 py-1.5 rounded-lg bg-secondary/60 border border-border">
          <Search className="w-4 h-4 text-muted-foreground mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-40 lg:w-56"
            aria-label="Search"
          />
        </div>
      </div>

      <nav className="flex items-center gap-1" aria-label="Main navigation">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = active === item.label
          return (
            <button
              key={item.label}
              onClick={() => setActive(item.label)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden lg:inline">{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="flex items-center gap-3">
        <button
          className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
          aria-label="Messages"
        >
          <MessageSquare className="w-5 h-5" />
        </button>
        <button
          className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/60 to-primary/30 flex items-center justify-center text-xs font-semibold text-foreground border border-border">
          N
        </div>
      </div>
    </header>
  )
}
