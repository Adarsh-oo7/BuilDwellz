/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Add this for static site generation
  trailingSlash: true, // Recommended for static exports
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // Required for static exports
  },
}

export default nextConfig