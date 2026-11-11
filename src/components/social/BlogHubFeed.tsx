"use client";

import { useState } from "react";
import type { Post } from "@prisma/client";
import { PostFeed } from "@/components/social/PostCard";
import { filterPostsByTab, publicFeedTabs, type PublicFeedTab } from "@/lib/post-platforms";
import { cn } from "@/lib/utils";

type BlogHubFeedProps = {
  posts: Post[];
};

export function BlogHubFeed({ posts }: BlogHubFeedProps) {
  const [activeTab, setActiveTab] = useState<PublicFeedTab>("all");
  const filtered = filterPostsByTab(posts, activeTab);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {publicFeedTabs.map((tab) => {
          const count =
            tab.id === "all" ? posts.length : filterPostsByTab(posts, tab.id).length;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "bg-primary text-white shadow-md"
                  : "bg-white text-gray-600 ring-1 ring-gray-100 hover:bg-gray-50",
              )}
            >
              {tab.label}
              <span className="ml-1.5 opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      <PostFeed posts={filtered} />
    </div>
  );
}
