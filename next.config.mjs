/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      allowedDevOrigins: [
        "http://localhost:3001",
        "http://school1.localhost:3001",
        "http://school2.localhost:3001",
      ],
    },
    async headers() {
      return [
        {
          source: "/_next/static/:path*",
          headers: [
            {
              key: "Access-Control-Allow-Origin",
              value: "*",
            },
            {
              key: "Access-Control-Allow-Methods",
              value: "GET, OPTIONS",
            },
            {
              key: "Access-Control-Allow-Headers",
              value: "X-Requested-With, Content-Type",
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
  