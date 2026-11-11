"use client";

import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Post, PostPlatform } from "@prisma/client";
import {
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Plus,
  X,
  Save,
  Play,
  FileText,
  Video,
  Newspaper,
  Share2,
  Loader2,
} from "lucide-react";
import { adminBusy, adminDone } from "@/lib/admin-feedback";
import {
  createPost,
  deletePost,
  togglePostPublished,
  updatePost,
} from "@/actions/posts";
import { uploadImage } from "@/actions/upload";
import { getPostImage } from "@/lib/images";
import { compressImageFile } from "@/lib/compress-image";
import {
  contentTabs,
  filterPostsByTab,
  getYouTubeThumbnail,
  isSocialPlatform,
  platformMeta,
  type ContentTab,
} from "@/lib/post-platforms";
import { plainExcerpt } from "@/lib/text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const tabIcons = {
  all: Newspaper,
  ARTICLE: FileText,
  VIDEO: Video,
  SOCIAL: Share2,
  CONTENT: Newspaper,
};

type PostsManagerProps = {
  posts: Post[];
};

function PostForm({
  initial,
  defaultPlatform,
  onCancel,
  onSuccess,
}: {
  initial?: Post;
  defaultPlatform?: PostPlatform;
  onCancel: () => void;
  onSuccess: (msg: string) => void;
}) {
  const [pending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);
  const [platform, setPlatform] = useState<PostPlatform>(
    initial?.platform ?? defaultPlatform ?? "ARTICLE",
  );
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl ?? "");
  const [videoUrl, setVideoUrl] = useState(
    initial?.platform === "VIDEO" ? (initial.externalUrl ?? "") : "",
  );
  const [socialUrl, setSocialUrl] = useState(
    initial && isSocialPlatform(initial.platform)
      ? (initial.externalUrl ?? "")
      : "",
  );
  const [metaTitle, setMetaTitle] = useState(initial?.metaTitle ?? "");
  const [metaDescription, setMetaDescription] = useState(
    initial?.metaDescription ?? "",
  );
  const [metaKeywords, setMetaKeywords] = useState(initial?.metaKeywords ?? "");
  const [showSeo, setShowSeo] = useState(
    Boolean(
      initial?.metaTitle || initial?.metaDescription || initial?.metaKeywords,
    ),
  );

  const isVideo = platform === "VIDEO";
  const isBlog = platform === "ARTICLE";
  const isSocial = isSocialPlatform(platform);

  const handleVideoUrlChange = (url: string) => {
    setVideoUrl(url);
    const thumb = getYouTubeThumbnail(url);
    if (thumb && !imageUrl) setImageUrl(thumb);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const toastId = adminBusy("Görsel yükleniyor…");
    try {
      const prepared = await compressImageFile(file);
      const formData = new FormData();
      formData.append("file", prepared);

      const result = await uploadImage(formData);
      if (result.success && result.url) {
        setImageUrl(result.url);
        adminDone(toastId, "Görsel yüklendi.");
      } else {
        adminDone(toastId, result.error || "Yükleme hatası", false);
      }
    } catch {
      adminDone(toastId, "Yükleme hatası", false);
    } finally {
      setUploading(false);
    }
  };

  const formTitle = initial
    ? "İçeriği Düzenle"
    : isVideo
      ? "Yeni Video Ekle"
      : isSocial
        ? `Yeni ${platformMeta[platform].label} Paylaşımı`
        : isBlog
          ? "Yeni Blog Ekle"
          : "Yeni İçerik Ekle";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      imageUrl: imageUrl || (isVideo ? getYouTubeThumbnail(videoUrl) ?? "" : ""),
      platform,
      externalUrl: isVideo
        ? videoUrl
        : isSocial
          ? socialUrl
          : ((formData.get("externalUrl") as string) || ""),
      metaTitle: metaTitle.trim(),
      metaDescription: metaDescription.trim(),
      metaKeywords: metaKeywords.trim(),
      published: initial?.published ?? true,
    };

    const toastId = adminBusy(initial ? "Güncelleniyor…" : "Yayınlanıyor…");
    startTransition(async () => {
      const result = initial
        ? await updatePost(initial.id, payload)
        : await createPost(payload);

      if (result.success) {
        adminDone(toastId, initial ? "İçerik güncellendi." : "İçerik yayınlandı.");
        onSuccess(initial ? "İçerik güncellendi." : "İçerik yayınlandı.");
      } else {
        adminDone(toastId, result.error || "Kayıt başarısız", false);
      }
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{formTitle}</CardTitle>
        <Button type="button" variant="ghost" size="icon" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!initial && (
            <div>
              <Label>İçerik Türü</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {(["ARTICLE", "VIDEO", "INSTAGRAM", "LINKEDIN", "CONTENT"] as const).map(
                  (p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPlatform(p)}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      platform === p
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200",
                    )}
                  >
                    {platformMeta[p].label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {isSocial && (
            <div>
              <Label htmlFor="socialUrl">
                {platformMeta[platform].label} Paylaşım Linki *
              </Label>
              <Input
                id="socialUrl"
                type="url"
                required
                value={socialUrl}
                onChange={(e) => setSocialUrl(e.target.value)}
                placeholder={
                  platform === "INSTAGRAM"
                    ? "https://www.instagram.com/p/..."
                    : "https://www.linkedin.com/posts/..."
                }
                className="mt-1.5"
              />
              <p className="mt-1 text-xs text-gray-500">
                Sosyal medyada paylaştığınız gönderinin tam linkini yapıştırın.
              </p>
            </div>
          )}

          <div>
            <Label htmlFor="title">Başlık</Label>
            <Input
              id="title"
              name="title"
              required
              defaultValue={initial?.title}
              className="mt-1.5"
              placeholder={
                isVideo
                  ? "Örn: Bel Ağrısı Egzersizleri"
                  : "İçerik başlığı"
              }
            />
          </div>

          {isVideo && (
            <div>
              <Label htmlFor="videoUrl">YouTube Video Linki *</Label>
              <Input
                id="videoUrl"
                type="url"
                required
                value={videoUrl}
                onChange={(e) => handleVideoUrlChange(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="mt-1.5"
              />
              <p className="mt-1 text-xs text-gray-500">
                YouTube linki yapıştırın. Kapak görseli otomatik alınır.
              </p>
            </div>
          )}

          <div>
            <Label htmlFor="content">
              {isVideo
                ? "Video Açıklaması"
                : isSocial
                  ? "Paylaşım Özeti"
                  : isBlog
                    ? "Blog İçeriği"
                    : "İçerik Metni"}
            </Label>
            <Textarea
              id="content"
              name="content"
              required
              rows={isBlog ? 14 : isSocial ? 5 : 6}
              defaultValue={initial?.content}
              className="mt-1.5 font-mono text-sm"
              placeholder={
                isBlog
                  ? "## Bölüm başlığı için ## kullanın.\n\n**kalın** metin için yıldız kullanın."
                  : isSocial
                    ? "Paylaşımın kısa özeti — ziyaretçiler blogda bu metni görür, tam içerik için sosyal medya linkine gider."
                    : "Kısa açıklama veya duyuru metni..."
              }
            />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-4">
              <div>
                <Label htmlFor="imageUrl">
                  {isVideo ? "Kapak Görseli (isteğe bağlı)" : "Görsel URL veya Yükle"}
                </Label>
                <div className="mt-1.5 flex items-center gap-2">
                  <Input
                    id="imageUrl"
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://..."
                    className="flex-1"
                  />
                  <div className="relative flex h-10 shrink-0 cursor-pointer items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={uploading}
                      className="absolute inset-0 cursor-pointer opacity-0 disabled:cursor-not-allowed"
                    />
                    {uploading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Seç"
                    )}
                  </div>
                </div>
              </div>
              {!isVideo && !isSocial && (
                <div>
                  <Label htmlFor="externalUrl">Harici Bağlantı (isteğe bağlı)</Label>
                  <Input
                    id="externalUrl"
                    name="externalUrl"
                    type="url"
                    defaultValue={
                      initial?.platform !== "VIDEO" ? (initial?.externalUrl ?? "") : ""
                    }
                    className="mt-1.5"
                  />
                </div>
              )}
            </div>
            <div>
              <Label>Önizleme</Label>
              <div className="relative mt-1.5 aspect-[16/10] overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                <Image
                  src={getPostImage(
                    imageUrl || (isVideo ? getYouTubeThumbnail(videoUrl) : null),
                  )}
                  alt="Önizleme"
                  fill
                  className="object-cover object-top"
                  unoptimized
                />
                {isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play className="h-12 w-12 text-white" fill="white" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-off-white/70 p-4">
            <button
              type="button"
              onClick={() => setShowSeo((v) => !v)}
              className="flex w-full items-center justify-between text-left"
            >
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  SEO / Metadata
                </p>
                <p className="mt-0.5 text-xs text-gray-500">
                  Boş bırakılırsa başlık ve içerikten otomatik üretilir.
                </p>
              </div>
              <span className="text-xs font-medium text-primary">
                {showSeo ? "Gizle" : "Düzenle"}
              </span>
            </button>

            {showSeo && (
              <div className="mt-4 space-y-4">
                <div>
                  <Label htmlFor="metaTitle">Meta başlık</Label>
                  <Input
                    id="metaTitle"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    className="mt-1.5"
                    placeholder="Arama sonucundaki başlık (isteğe bağlı)"
                  />
                  <p className="mt-1 text-xs text-gray-400">
                    {metaTitle.length || "0"} karakter · genelde 50–60 ideal
                  </p>
                </div>
                <div>
                  <Label htmlFor="metaDescription">Meta açıklama</Label>
                  <Textarea
                    id="metaDescription"
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    rows={3}
                    className="mt-1.5"
                    placeholder="Arama sonucundaki kısa açıklama"
                  />
                  <p className="mt-1 text-xs text-gray-400">
                    {metaDescription.length || "0"} karakter · genelde 140–160 ideal
                  </p>
                </div>
                <div>
                  <Label htmlFor="metaKeywords">Anahtar kelimeler</Label>
                  <Textarea
                    id="metaKeywords"
                    value={metaKeywords}
                    onChange={(e) => setMetaKeywords(e.target.value)}
                    rows={3}
                    className="mt-1.5"
                    placeholder={"ankara bel ağrısı\nmanuel terapi"}
                  />
                  <p className="mt-1 text-xs text-gray-400">
                    Virgül veya satır ile ayırın.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button type="submit" variant="teal" disabled={pending}>
              <Save className="h-4 w-4" />
              {pending ? "Kaydediliyor..." : initial ? "Güncelle" : "Yayınla"}
            </Button>
            <Button type="button" variant="outline" disabled={pending} onClick={onCancel}>
              İptal
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export function PostsManager({ posts }: PostsManagerProps) {
  const router = useRouter();
  const [items, setItems] = useState(posts);
  const [activeTab, setActiveTab] = useState<ContentTab>("all");
  const [mode, setMode] = useState<"list" | "create" | "edit">("list");
  const [createPlatform, setCreatePlatform] = useState<PostPlatform>("ARTICLE");
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [search, setSearch] = useState("");

  useEffect(() => {
    setItems(posts);
  }, [posts]);

  const tabInfo = contentTabs.find((t) => t.id === activeTab)!;
  const tabPosts = filterPostsByTab(items, activeTab);
  const filtered = tabPosts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.content.toLowerCase().includes(search.toLowerCase()),
  );

  const openCreate = (platform: PostPlatform) => {
    setCreatePlatform(platform);
    setMode("create");
    setEditingPost(null);
  };

  const handleSuccess = () => {
    setMode("list");
    setEditingPost(null);
    startTransition(() => {
      router.refresh();
    });
  };

  const defaultPlatformForTab =
    activeTab === "ARTICLE" || activeTab === "VIDEO"
      ? activeTab
      : activeTab === "SOCIAL"
        ? "INSTAGRAM"
        : "CONTENT";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">İçerik Yönetimi</h2>
        <p className="text-sm text-gray-500">
          Blog, video, sosyal medya ve site içeriklerini ekleyin, düzenleyin veya kaldırın.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {contentTabs.map((tab) => {
          const Icon = tabIcons[tab.id];
          const count =
            tab.id === "all" ? items.length : filterPostsByTab(items, tab.id).length;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id);
                setMode("list");
              }}
              className={cn(
                "flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "bg-primary text-white shadow-md"
                  : "bg-white text-gray-600 ring-1 ring-gray-100 hover:bg-gray-50",
              )}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-xs",
                  activeTab === tab.id ? "bg-white/20" : "bg-gray-100",
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {mode === "list" && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-gray-500">{tabInfo.description}</p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="teal"
              size="sm"
              onClick={() => openCreate(defaultPlatformForTab)}
            >
              <Plus className="h-4 w-4" />
              {activeTab === "all" ? "İçerik Ekle" : tabInfo.addLabel}
            </Button>
            {activeTab === "all" && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openCreate("ARTICLE")}
                >
                  <FileText className="h-4 w-4" />
                  Blog
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openCreate("VIDEO")}
                >
                  <Video className="h-4 w-4" />
                  Video
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openCreate("INSTAGRAM")}
                >
                  <Share2 className="h-4 w-4" />
                  Instagram
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openCreate("LINKEDIN")}
                >
                  <Share2 className="h-4 w-4" />
                  LinkedIn
                </Button>
              </>
            )}
            {activeTab === "SOCIAL" && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openCreate("INSTAGRAM")}
                >
                  <Share2 className="h-4 w-4" />
                  Instagram
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openCreate("LINKEDIN")}
                >
                  <Share2 className="h-4 w-4" />
                  LinkedIn
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      {mode === "create" && (
        <PostForm
          defaultPlatform={createPlatform}
          onCancel={() => setMode("list")}
          onSuccess={handleSuccess}
        />
      )}

      {mode === "edit" && editingPost && (
        <PostForm
          initial={editingPost}
          onCancel={() => {
            setMode("list");
            setEditingPost(null);
          }}
          onSuccess={handleSuccess}
        />
      )}

      {mode === "list" && (
        <>
          <Input
            placeholder="Başlık veya içerik ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />

          {filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-200 py-16 text-center">
              <p className="text-gray-500">Bu kategoride içerik yok.</p>
              <Button
                variant="teal"
                size="sm"
                className="mt-4"
                onClick={() => openCreate(defaultPlatformForTab)}
              >
                <Plus className="h-4 w-4" />
                {tabInfo.addLabel}
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((post) => {
                const meta = platformMeta[post.platform];
                const thumb =
                  post.imageUrl ||
                  (post.platform === "VIDEO"
                    ? getYouTubeThumbnail(post.externalUrl)
                    : null);

                return (
                  <div
                    key={post.id}
                    className="flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"
                  >
                    <div className="relative aspect-[16/10] shrink-0">
                      <Image
                        src={getPostImage(thumb)}
                        alt={post.title}
                        fill
                        className="object-cover object-top"
                        unoptimized={thumb?.startsWith("http")}
                      />
                      {post.platform === "VIDEO" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                          <Play className="h-10 w-10 text-white" fill="white" />
                        </div>
                      )}
                      <div className="absolute left-3 top-3">
                        <Badge variant={meta.variant}>{meta.label}</Badge>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <p className="line-clamp-2 font-semibold text-gray-800">
                        {post.title}
                      </p>
                      <p className="mt-2 line-clamp-3 flex-1 text-sm text-gray-500">
                        {plainExcerpt(post.content, 100)}
                      </p>
                      <p className="mt-2 text-xs text-gray-400">
                        {post.createdAt.toLocaleDateString("tr-TR")}
                        {!post.published && " · Taslak"}
                      </p>
                      <div className="mt-4 flex gap-1 border-t border-gray-50 pt-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingPost(post);
                            setMode("edit");
                          }}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          Düzenle
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={pending}
                          onClick={() => {
                            const next = !post.published;
                            setPendingId(post.id);
                            setItems((prev) =>
                              prev.map((p) =>
                                p.id === post.id ? { ...p, published: next } : p,
                              ),
                            );
                            const toastId = adminBusy(
                              next ? "Yayınlanıyor…" : "Taslağa alınıyor…",
                            );
                            startTransition(async () => {
                              const result = await togglePostPublished(
                                post.id,
                                next,
                              );
                              setPendingId(null);
                              if (result.success) {
                                adminDone(
                                  toastId,
                                  next ? "Yayınlandı." : "Taslağa alındı.",
                                );
                                router.refresh();
                              } else {
                                setItems(posts);
                                adminDone(
                                  toastId,
                                  result.error || "İşlem başarısız",
                                  false,
                                );
                              }
                            });
                          }}
                        >
                          {pendingId === post.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : post.published ? (
                            <EyeOff className="h-3.5 w-3.5" />
                          ) : (
                            <Eye className="h-3.5 w-3.5" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          disabled={pending}
                          onClick={() => {
                            if (!confirm("Bu içeriği silmek istiyor musunuz?")) {
                              return;
                            }
                            const previous = items;
                            setPendingId(post.id);
                            setItems((prev) => prev.filter((p) => p.id !== post.id));
                            const toastId = adminBusy("Siliniyor…");
                            startTransition(async () => {
                              const result = await deletePost(post.id);
                              setPendingId(null);
                              if (result.success) {
                                adminDone(toastId, "İçerik silindi.");
                                router.refresh();
                              } else {
                                setItems(previous);
                                adminDone(
                                  toastId,
                                  result.error || "Silinemedi",
                                  false,
                                );
                              }
                            });
                          }}
                        >
                          {pendingId === post.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="h-3.5 w-3.5" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
