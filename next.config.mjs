/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.soccer-social.com",
      },
    ],
  },
};
 
export default nextConfig;
 