import type { NextConfig } from "next";

function supabaseHostname() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) return null;
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

const remotePatterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [
  {
    protocol: "https",
    hostname: "images.unsplash.com",
    pathname: "/**",
  },
  {
    protocol: "https",
    hostname: "img.youtube.com",
    pathname: "/**",
  },
  {
    protocol: "https",
    hostname: "*.supabase.co",
    pathname: "/storage/v1/object/public/**",
  },
];

const supabaseHost = supabaseHostname();
if (supabaseHost) {
  remotePatterns.push({
    protocol: "https",
    hostname: supabaseHost,
    pathname: "/storage/v1/object/public/**",
  });
}

const nextConfig: NextConfig = {
  transpilePackages: ["pdfjs-dist"],
  async redirects() {
    return [
      {
        source: "/ankara",
        destination: "/samsun",
        permanent: true,
      },
      {
        source: "/ankara/:path*",
        destination: "/samsun/:path*",
        permanent: true,
      },
      {
        source: "/hizmetlerimiz/pediatrik",
        destination: "/hizmetlerimiz/pediatrik-rehabilitasyon",
        permanent: true,
      },
      {
        source: "/hizmetlerimiz/norolojik",
        destination: "/hizmetlerimiz/norolojik-rehabilitasyon",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns,
  },
};

export default nextConfig;
