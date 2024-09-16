/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**.firebaseapp.com",
        },
        {
          protocol: "https",
          hostname: "**.googleapis.com",
        },
      ],
    },
  };
  
  export default nextConfig;
  