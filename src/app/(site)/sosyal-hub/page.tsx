import type { Metadata } from "next";
import { BlogHubFeed } from "@/components/social/BlogHubFeed";
import { BlogHero } from "@/components/social/PostCard";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { getPosts } from "@/actions/posts";
import { blogHubMetadata } from "@/lib/seo";

export const metadata: Metadata = blogHubMetadata;

export default async function SocialHubPage() {
  const posts = await getPosts();

  return (
    <main id="main-content" className="pt-28">
      <section className="pb-20 pt-12 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Breadcrumbs
            className="mb-8"
            items={[
              { name: "Ana Sayfa", href: "/" },
              { name: "İçerikler", href: "/sosyal-hub" },
            ]}
          />
          <BlogHero />
          <BlogHubFeed posts={posts} />
        </div>
      </section>
    </main>
  );
}
