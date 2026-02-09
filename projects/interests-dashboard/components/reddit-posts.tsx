"use client"

import { MoreHorizontal, ArrowBigUp, ArrowBigDown, MessageSquare, ExternalLink } from "lucide-react"

const posts = [
  {
    id: 1,
    subreddit: "r/technology",
    user: "u/PostBestDisclosures",
    time: "1 days ago",
    title: "Developers can now build amazing products using the latest AI tools for creative prototyping",
    upvotes: 3900,
    comments: 3,
  },
  {
    id: 2,
    subreddit: "r/science",
    user: "u/RedditVFreeson",
    time: "1 days ago",
    title: "Top 19 most rs ace & branstentalte uppotrots and spained in incomes",
    upvotes: 9000,
    comments: 0,
  },
  {
    id: 3,
    subreddit: "r/DesignPorn",
    user: "u/PixelMaster",
    time: "2h ago",
    title: "The new branding for the National Park Service is incredible. Clean, modern, and respectful.",
    upvotes: 14500,
    comments: 892,
  },
  {
    id: 4,
    subreddit: "r/webdev",
    user: "u/CodeCrafter",
    time: "5h ago",
    title: "How to make real-time collaboration work at scale with modern web technologies",
    upvotes: 290,
    comments: 47,
  },
]

function formatNumber(num: number): string {
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`
  return String(num)
}

const subredditColors: Record<string, string> = {
  "r/technology": "bg-sky-500/20 text-sky-400",
  "r/science": "bg-emerald-500/20 text-emerald-400",
  "r/DesignPorn": "bg-rose-500/20 text-rose-400",
  "r/webdev": "bg-amber-500/20 text-amber-400",
}

export function RedditPosts() {
  return (
    <section className="flex flex-col bg-card rounded-xl border border-border overflow-hidden">
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.373 0 0 5.373 0 12c0 3.314 1.343 6.314 3.515 8.485l-.014.014.015.015C5.7 22.7 8.67 24 12 24s6.3-1.3 8.485-3.485l.015-.015-.014-.014C22.657 18.314 24 15.314 24 12 24 5.373 18.627 0 12 0zm5.895 13.412c.063.3.096.609.096.926 0 3.213-3.745 5.82-8.362 5.82S1.267 17.55 1.267 14.338c0-.317.033-.626.096-.926a1.533 1.533 0 01-.483-1.118c0-.854.692-1.546 1.546-1.546.396 0 .756.15 1.03.396 1.474-1.032 3.465-1.67 5.743-1.737l1.266-4.024a.375.375 0 01.449-.264l3.175.748a1.285 1.285 0 012.39.521 1.286 1.286 0 01-1.286 1.286 1.285 1.285 0 01-1.271-1.103l-2.815-.663-1.108 3.528c2.2.093 4.11.732 5.546 1.737a1.533 1.533 0 011.03-.396c.853 0 1.546.692 1.546 1.546 0 .451-.194.856-.504 1.139zM8.07 13.482c-.71 0-1.286.576-1.286 1.286s.576 1.286 1.286 1.286 1.286-.576 1.286-1.286-.576-1.286-1.286-1.286zm6.014 4.158c-.733.733-2.134 1.037-2.084 1.037s-1.351-.304-2.084-1.037a.375.375 0 01.53-.53c.518.518 1.372.775 1.554.775s1.036-.257 1.554-.775a.375.375 0 01.53.53zm-.157-2.872a1.286 1.286 0 110-2.572 1.286 1.286 0 010 2.572z" />
          </svg>
          <h2 className="text-base font-semibold text-foreground">Reddit Posts</h2>
        </div>
        <button className="p-1 rounded-md hover:bg-secondary/50 text-muted-foreground transition-colors" aria-label="More options">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto max-h-96">
        {posts.map((post, idx) => (
          <article
            key={post.id}
            className={`flex gap-3 px-5 py-3.5 hover:bg-secondary/30 transition-colors ${
              idx < posts.length - 1 ? "border-b border-border" : ""
            }`}
          >
            {/* Vote column */}
            <div className="flex flex-col items-center gap-0.5 shrink-0">
              <button className="p-0.5 text-muted-foreground hover:text-orange-400 transition-colors" aria-label="Upvote">
                <ArrowBigUp className="w-5 h-5" />
              </button>
              <span className="text-xs font-semibold text-foreground">
                {formatNumber(post.upvotes)}
              </span>
              <button className="p-0.5 text-muted-foreground hover:text-sky-400 transition-colors" aria-label="Downvote">
                <ArrowBigDown className="w-5 h-5" />
              </button>
            </div>

            {/* Post content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    subredditColors[post.subreddit] || "bg-secondary text-muted-foreground"
                  }`}
                >
                  {post.subreddit}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {post.user} &middot; {post.time}
                </span>
              </div>
              <p className="text-sm text-foreground mt-1.5 leading-snug">
                {post.title}
              </p>
              <div className="flex items-center gap-4 mt-2">
                <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <MessageSquare className="w-3.5 h-3.5" />
                  {post.comments} {post.comments === 1 ? "comment" : "comments"}
                </button>
                <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <ExternalLink className="w-3.5 h-3.5" />
                  Share
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="px-5 py-3 border-t border-border">
        <button className="w-full text-center text-xs text-primary hover:text-primary/80 font-medium transition-colors">
          View More Posts
        </button>
      </div>
    </section>
  )
}
