import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // /* config options here */jpm
   images:{
    remotePatterns:[
        {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
   }
};

export default nextConfig;
