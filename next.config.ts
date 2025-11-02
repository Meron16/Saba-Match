import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  // Ensure server-only modules are not bundled for client
  serverExternalPackages: ["openai", "pdf-parse"],
};

export default nextConfig;
