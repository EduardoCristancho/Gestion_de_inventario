import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  allowedDevOrigins :[`${process.env.NEXT_PUBLIC_HOST_URL}:3000`, `${process.env.IP_ADDRESS}`],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_HOST_URL}:3001/:path*`,
      },
    ]
  },
};

export default nextConfig ;
