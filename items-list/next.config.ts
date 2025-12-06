import type { NextConfig } from "next";

const nextConfig:NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "ALLOWALL" // pozwala na iframe
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors *" // pozwala każdemu osadzać aplikację
          }
        ]
      }
    ]
  }
}

export default nextConfig;
