import env from "./src/lib/env";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${env.API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
