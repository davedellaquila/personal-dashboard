"use client"

import { MoreHorizontal, MessageCircle, Repeat2, Heart, ExternalLink } from "lucide-react"

const tweets = [
  {
    id: 1,
    name: "Alex Chen",
    handle: "@alexchendesign",
    verified: true,
    avatar: "AC",
    avatarColor: "from-sky-400 to-blue-600",
    time: "2h",
    text: "Excited to share a sneak peek of the new design system I've been working on! It's all about clarity and modularity.",
    hashtags: ["#UI", "#DesignSystem"],
    link: "https://futlylink...",
    replies: 24,
    retweets: 150,
    likes: 1200,
    hasImage: true,
  },
  {
    id: 2,
    name: "Risk",
    handle: "@liabhiosloyst",
    verified: false,
    avatar: "R",
    avatarColor: "from-emerald-400 to-teal-600",
    time: "3m",
    text: "Twowe millien thearst hunting at different engolantent. The future of distributed systems is looking bright.",
    hashtags: [],
    link: null,
    replies: 8,
    retweets: 14,
    likes: 28,
    hasImage: false,
  },
  {
    id: 3,
    name: "Wanie",
    handle: "@tettnedus",
    verified: false,
    avatar: "W",
    avatarColor: "from-amber-400 to-orange-600",
    time: "1h",
    text: "We are building something incredible for the developer community. Stay tuned for the big reveal coming soon.",
    hashtags: [],
    link: "goss.errophere...",
    replies: 4,
    retweets: 5,
    likes: 12,
    hasImage: false,
  },
  {
    id: 4,
    name: "Retlor",
    handle: "@blllibokes",
    verified: true,
    avatar: "RT",
    avatarColor: "from-rose-400 to-pink-600",
    time: "11s",
    text: "Just published our latest research paper on neural architecture search. The results are fascinating!",
    hashtags: ["#ML", "#Research"],
    link: null,
    replies: 2,
    retweets: 8,
    likes: 45,
    hasImage: false,
  },
]

function formatNumber(num: number): string {
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return String(num)
}

export function TwitterFeed() {
  return (
    <section className="flex flex-col bg-card rounded-xl border border-border overflow-hidden">
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-sky-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <h2 className="text-base font-semibold text-foreground">Twitter Feed</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground px-2 py-1 rounded-md bg-secondary border border-border">
            Nate
          </span>
          <button className="p-1 rounded-md hover:bg-secondary/50 text-muted-foreground transition-colors" aria-label="More options">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto max-h-96">
        {tweets.map((tweet, idx) => (
          <article
            key={tweet.id}
            className={`px-5 py-3.5 hover:bg-secondary/30 transition-colors ${
              idx < tweets.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <div className="flex gap-3">
              <div
                className={`w-10 h-10 rounded-full bg-gradient-to-br ${tweet.avatarColor} flex items-center justify-center text-xs font-semibold text-foreground shrink-0`}
              >
                {tweet.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-sm font-semibold text-foreground">
                    {tweet.name}
                  </span>
                  {tweet.verified && (
                    <svg className="w-4 h-4 text-sky-400" viewBox="0 0 24 24" fill="currentColor" aria-label="Verified">
                      <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81C14.67 2.88 13.43 2 12 2s-2.67.88-3.34 2.19c-1.39-.46-2.9-.2-3.91.81s-1.27 2.52-.81 3.91C2.88 9.33 2 10.57 2 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91s2.52 1.27 3.91.81C9.33 21.12 10.57 22 12 22s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91C21.12 14.67 22 13.43 22 12zm-11.07 4.83l-3.54-3.54 1.41-1.41 2.13 2.12 4.24-4.24 1.41 1.41-5.65 5.66z" />
                    </svg>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {tweet.handle}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {tweet.time}
                  </span>
                </div>
                <p className="text-sm text-foreground/90 mt-1 leading-relaxed">
                  {tweet.text}
                  {tweet.hashtags.length > 0 && (
                    <span className="text-primary">
                      {" "}
                      {tweet.hashtags.join(" ")}
                    </span>
                  )}
                  {tweet.link && (
                    <span className="text-primary"> {tweet.link}</span>
                  )}
                </p>

                {tweet.hasImage && (
                  <div className="mt-2 rounded-lg bg-secondary/60 border border-border h-32 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                      <ExternalLink className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-6 mt-2.5">
                  <button className="flex items-center gap-1.5 text-muted-foreground hover:text-sky-400 transition-colors group">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs">{formatNumber(tweet.replies)}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-muted-foreground hover:text-emerald-400 transition-colors group">
                    <Repeat2 className="w-4 h-4" />
                    <span className="text-xs">{formatNumber(tweet.retweets)}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-muted-foreground hover:text-rose-400 transition-colors group">
                    <Heart className="w-4 h-4" />
                    <span className="text-xs">{formatNumber(tweet.likes)}</span>
                  </button>
                  <button className="flex items-center text-muted-foreground hover:text-primary transition-colors ml-auto" aria-label="Share">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="px-5 py-3 border-t border-border">
        <button className="w-full text-center text-xs text-primary hover:text-primary/80 font-medium transition-colors">
          View More Tweets
        </button>
      </div>
    </section>
  )
}
