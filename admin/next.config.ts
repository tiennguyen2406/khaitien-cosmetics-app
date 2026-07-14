import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.mixkit.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "",
        pathname: "/**",
      },
    ],
    domains: ["localhost"],
  },

  /* config options here */
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },

  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiUrl) {
  throw new Error("NEXT_PUBLIC_API_URL is required");
}
let serverOrigin = "";
if (!apiUrl.startsWith("http")) {
  throw new Error("NEXT_PUBLIC_API_URL must be an absolute URL");
}
serverOrigin = new URL(apiUrl).origin;

nextConfig.rewrites = async () => {
  return [
    {
      source: "/uploads/:path*",
      destination: `${serverOrigin}/uploads/:path*`,
    },
  ];
};

export default nextConfig;
