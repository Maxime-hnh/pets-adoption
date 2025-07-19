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
      {
        source: '/nos-animaux-a-adopter',
        destination: '/animals',
      },
      {
        source: '/nos-animaux-a-adopter/:path*',
        destination: '/animals/:path*',
      },
      {
        source: '/nos-evenements',
        destination: '/events',
      },
      {
        source: '/nos-evenements/:path*',
        destination: '/events/:path*',
      },
    ]
  },
};
export default nextConfig;


//'http://localhost:3001/api/:path*'
