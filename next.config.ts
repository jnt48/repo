import type { NextConfig } from "next";

const nextConfig = {
  experimental: {
    transpilePackages: [
      "@codemirror/lang-clike", 
      "@codemirror/lang-cpp", 
      "@codemirror/lang-python", 
      "@codemirror/lang-javascript", 
      "@codemirror/lang-java"
    ],
  },
};

export default nextConfig;
