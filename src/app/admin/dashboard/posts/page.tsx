import type { Metadata } from "next";
import { getAllPosts } from "@/actions/posts";
import { PostsManager } from "@/components/admin/PostsManager";

export const metadata: Metadata = {
  title: "İçerik Yönetimi",
  robots: { index: false, follow: false },
};

export default async function PostsPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <PostsManager posts={posts} />
    </div>
  );
}
