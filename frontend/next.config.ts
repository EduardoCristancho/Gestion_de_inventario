import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  allowedDevOrigins :['https://192.168.50.56:3000','192.168.50.56'],
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
        destination: 'http://192.168.50.56:3001/:path*',
      },
    ]
  },
};

export default nextConfig ;
