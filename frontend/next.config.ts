import type { NextConfig } from 'next'
 
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/items',
        destination: 'http://localhost:3001/items',
      }
    ]
  },
}

export default nextConfig