/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,

    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets1.ignimgs.com",
      },
      { protocol: "https", hostname: "img.clerk.com" },
      { protocol: "https", hostname: "*" },
      { protocol: "http", hostname: "*" },
    ],
  },
  experimental: {
    serverActions: true,
    mdxRs: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
};

export default nextConfig;
