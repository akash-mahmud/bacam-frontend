/** @type {import('next').NextConfig} */

const nextConfig ={
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  compiler: {
    styledComponents: true,
 
  },
  images: {
    remotePatterns: [
      {
        hostname: "**",
      },
    
    ],
  },
}

module.exports = nextConfig;
