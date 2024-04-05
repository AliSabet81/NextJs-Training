/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets1.ignimgs.com'
      }
    ]
  },
  experimental: {
    serverActions: true,
    mdxRs: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
};

export default nextConfig;
