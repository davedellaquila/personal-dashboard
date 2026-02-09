"use client"

import { useMemo } from "react"

import { useState } from "react"
import { MoreHorizontal } from "lucide-react"

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const hours = Array.from({ length: 24 }, (_, i) => i)

// Seeded PRNG for deterministic data generation
function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

function generateHeatmapData() {
  const rng = seededRandom(42)
  const data: number[][] = []
  for (let day = 0; day < 7; day++) {
    const row: number[] = []
    for (let hour = 0; hour < 24; hour++) {
      const isWorkHour = hour >= 9 && hour <= 18
      const isWeekday = day < 5
      const base = isWorkHour && isWeekday ? 0.6 : isWorkHour ? 0.3 : 0.1
      const value = rng() < base ? Math.floor(rng() * 60) + 1 : 0
      row.push(value)
    }
    data.push(row)
  }
  return data
}

const HEATMAP_DATA = generateHeatmapData()

function getColor(value: number): string {
  if (value === 0) return "bg-secondary/60"
  if (value < 10) return "bg-emerald-900/60"
  if (value < 20) return "bg-emerald-800/70"
  if (value < 30) return "bg-emerald-700/80"
  if (value < 40) return "bg-emerald-600/80"
  if (value < 50) return "bg-emerald-500"
  return "bg-emerald-400"
}

function getColorHex(value: number): string {
  if (value === 0) return "hsl(220, 14%, 14%)"
  if (value < 10) return "hsl(152, 60%, 12%)"
  if (value < 20) return "hsl(152, 55%, 18%)"
  if (value < 30) return "hsl(152, 50%, 25%)"
  if (value < 40) return "hsl(152, 55%, 35%)"
  if (value < 50) return "hsl(152, 60%, 45%)"
  return "hsl(152, 70%, 55%)"
}

interface TooltipState {
  x: number
  y: number
  day: string
  hour: number
  value: number
}

export function ActivityHeatmap() {
  const data = HEATMAP_DATA
  const [tooltip, setTooltip] = useState<TooltipState | null>(null)

  const totalContributions = data.flat().reduce((a, b) => a + b, 0)
  const focusScore = Math.min(100, Math.round(totalContributions / 30))

  return (
    <section className="flex flex-col bg-card rounded-xl border border-border overflow-hidden">
      <div className="flex items-center justify-between px-5 pt-5 pb-2">
        <div>
          <h2 className="text-base font-semibold text-foreground">Daily Activity</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Focus Score: <span className="text-foreground font-medium">{focusScore}/100</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground px-2 py-1 rounded-md bg-secondary border border-border">
            This Week
          </span>
          <button className="p-1 rounded-md hover:bg-secondary/50 text-muted-foreground transition-colors" aria-label="More options">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="px-5 pb-4 overflow-x-auto">
        <div className="relative min-w-[500px]">
          {/* Hour labels */}
          <div className="flex ml-10 mb-1">
            {hours.map((h) => (
              <div
                key={h}
                className="flex-1 text-center text-[10px] text-muted-foreground"
              >
                {h % 4 === 0 ? `${String(h).padStart(2, "0")}` : ""}
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="flex flex-col gap-[3px]">
            {days.map((day, dayIdx) => (
              <div key={day} className="flex items-center gap-[3px]">
                <span className="w-8 text-[11px] text-muted-foreground text-right pr-2 shrink-0">
                  {day}
                </span>
                {hours.map((hour) => {
                  const value = data[dayIdx][hour]
                  return (
                    <div
                      key={`${day}-${hour}`}
                      className="flex-1 aspect-square rounded-[3px] cursor-pointer transition-all duration-150 hover:ring-1 hover:ring-foreground/30 hover:scale-110 min-w-[12px]"
                      style={{ backgroundColor: getColorHex(value) }}
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect()
                        setTooltip({
                          x: rect.left + rect.width / 2,
                          y: rect.top,
                          day,
                          hour,
                          value,
                        })
                      }}
                      onMouseLeave={() => setTooltip(null)}
                      aria-label={`${day} ${String(hour).padStart(2, "0")}:00 - ${value} contributions`}
                      role="gridcell"
                    />
                  )
                })}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-1.5 mt-3">
            <span className="text-[10px] text-muted-foreground mr-1">Low</span>
            {[0, 10, 20, 30, 40, 50].map((val) => (
              <div
                key={val}
                className={`w-3 h-3 rounded-[2px] ${getColor(val)}`}
              />
            ))}
            <span className="text-[10px] text-muted-foreground ml-1">High</span>
          </div>
        </div>
      </div>

      {/* Habit tracking bars */}
      <div className="px-5 pb-4 border-t border-border pt-3">
        <h3 className="text-xs font-medium text-muted-foreground mb-2">Habit Tracking</h3>
        <div className="space-y-2">
          {[
            { label: "Focus", pct: 78, color: "bg-primary" },
            { label: "Activity", pct: 65, color: "bg-emerald-500" },
            { label: "Reasoning", pct: 52, color: "bg-amber-500" },
          ].map((habit) => (
            <div key={habit.label} className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground w-16 shrink-0">{habit.label}</span>
              <div className="flex-1 h-2 rounded-full bg-secondary">
                <div
                  className={`h-full rounded-full ${habit.color} transition-all duration-700`}
                  style={{ width: `${habit.pct}%` }}
                />
              </div>
              <span className="text-xs text-foreground font-medium w-8 text-right">{habit.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 px-3 py-1.5 rounded-lg bg-popover border border-border text-xs text-foreground shadow-xl pointer-events-none"
          style={{
            left: tooltip.x,
            top: tooltip.y - 36,
            transform: "translateX(-50%)",
          }}
        >
          {tooltip.day}, {String(tooltip.hour).padStart(2, "0")}:00 - {tooltip.value} contributions
        </div>
      )}
    </section>
  )
}
