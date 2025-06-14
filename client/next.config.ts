import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.dog.ceo',
        pathname: '/breeds/**',
      },
    ],
    domains: [
      "pets-adoption.s3.eu-north-1.amazonaws.com"
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*'
      },
    ]
  },
};
export default nextConfig;


//'http://localhost:3001/api/:path*'
