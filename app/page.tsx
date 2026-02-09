import { TopNav } from "@/components/top-nav"
import { MemoryPanel } from "@/components/memory-panel"
import { ActivityHeatmap } from "@/components/activity-heatmap"
import { TwitterFeed } from "@/components/twitter-feed"
import { RedditPosts } from "@/components/reddit-posts"
import { RecentNotes } from "@/components/recent-notes"
import { ArxivPapers } from "@/components/arxiv-papers"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main className="p-4 md:p-6 max-w-[1920px] mx-auto">
        {/* Top row: Memory + Activity + Twitter */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
          <MemoryPanel />
          <ActivityHeatmap />
          <TwitterFeed />
        </div>

        {/* Bottom row: Recent Notes + Reddit + arXiv */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 mt-4 md:mt-5">
          <RecentNotes />
          <RedditPosts />
          <ArxivPapers />
        </div>
      </main>
    </div>
  )
}
