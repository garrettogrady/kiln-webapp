/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

module.exports = {
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    images: {
        formats: ["image/avif", "image/webp"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*",
            },
        ],
    },
    experimental: {
        serverActions: {
            allowedOrigins: ["https://kiln23123.a.pinggy.link", "localhost:3000", "https://app.trykiln.coom"]
        }
    }
};