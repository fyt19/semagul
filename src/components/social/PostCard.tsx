"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Post } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Play, ExternalLink } from "lucide-react";
import { getPostImage, images } from "@/lib/images";
import { getPostHref } from "@/lib/slug";
import { FitImage } from "@/components/ui/FitImage";
import {
  getYouTubeThumbnail,
  isSocialPlatform,
  platformMeta,
} from "@/lib/post-platforms";
import { plainExcerpt } from "@/lib/text";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const platformConfig = platformMeta;

type PostCardProps = {
  post: Post;
  featured?: boolean;
};

export function PostCard({ post, featured = false }: PostCardProps) {
  const platform = platformConfig[post.platform];
  const cover = getPostImage(
    post.imageUrl ||
      (post.platform === "VIDEO" ? getYouTubeThumbnail(post.externalUrl) : null),
  );
  const excerpt = plainExcerpt(post.content, featured ? 180 : 120);
  const isVideo = post.platform === "VIDEO";
  const isSocial = isSocialPlatform(post.platform);
  const socialLabel = platform.socialLabel;

  return (
    <motion.article
      variants={fadeInUp}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100 transition-shadow hover:shadow-xl hover:shadow-primary/10",
        featured && "md:col-span-2",
      )}
    >
      <Link href={getPostHref(post)} className="flex h-full flex-col">
        <div className="relative aspect-[16/10] shrink-0 overflow-hidden">
          <FitImage
            src={cover}
            alt={post.title}
            sizes={featured ? "60vw" : "33vw"}
            className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 via-primary-dark/10 to-transparent opacity-80" />
          <div className="absolute left-4 top-4">
            <Badge variant={platform.variant}>{platform.label}</Badge>
          </div>
          {isVideo && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg">
                <Play className="h-6 w-6 text-primary" fill="currentColor" />
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <time
            dateTime={post.createdAt.toISOString()}
            className="text-xs font-medium uppercase tracking-wider text-gray-400"
          >
            {post.createdAt.toLocaleDateString("tr-TR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>

          <h3
            className={cn(
              "mt-2 line-clamp-2 font-serif font-semibold text-gray-800 transition-colors group-hover:text-primary",
              featured ? "text-2xl" : "text-lg",
            )}
          >
            {post.title}
          </h3>

          <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600">
            {excerpt}
          </p>

          <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
            {isSocial && socialLabel ? socialLabel : "Devamını Oku"}
            {isSocial ? (
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            ) : (
              <motion.span
                className="inline-block"
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
              >
                →
              </motion.span>
            )}
          </span>
        </div>
      </Link>

      {isSocial && post.externalUrl && (
        <a
          href={post.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md transition-colors hover:bg-white hover:text-primary"
          aria-label={socialLabel ?? "Sosyal medyada aç"}
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      )}
    </motion.article>
  );
}

type PostFeedProps = {
  posts: Post[];
  limit?: number;
  layout?: "grid" | "masonry";
};

export function PostFeed({ posts, limit, layout = "grid" }: PostFeedProps) {
  const displayPosts = limit ? posts.slice(0, limit) : posts;

  if (displayPosts.length === 0) {
    return (
      <div className="overflow-hidden rounded-3xl border border-dashed border-slate-200">
        <div className="relative aspect-[21/9]">
          <Image
            src={images.blogDefault}
            alt="Blog"
            fill
            className="object-cover opacity-50"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="rounded-full bg-white/90 px-6 py-3 text-slate-500 shadow-sm">
              Henüz blog yazısı bulunmuyor.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      {displayPosts.map((post, i) => (
        <PostCard
          key={post.id}
          post={post}
          featured={i === 0 && !limit && layout === "grid"}
        />
      ))}
    </motion.div>
  );
}

/** Blog section hero banner for pages */
export function BlogHero() {
  return (
    <div className="relative mb-14 overflow-hidden rounded-3xl">
      <div className="relative aspect-[21/7] min-h-[200px]">
        <Image
          src={images.blogDefault}
          alt="Blog ve sağlık yazıları"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/80 to-navy-900/30" />
        <div className="absolute inset-0 flex flex-col justify-center px-8 lg:px-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold uppercase tracking-widest text-teal-300"
          >
            İçerikler & Sosyal Medya
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-2 font-serif text-3xl font-semibold text-white sm:text-4xl lg:text-5xl"
          >
            Sağlık, Video, Sosyal Paylaşımlar & Güncellemeler
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-3 max-w-xl text-slate-200"
          >
            Uzman görüşleri, rehabilitasyon ipuçları ve kliniğimizden haberler.
          </motion.p>
        </div>
      </div>
    </div>
  );
}
