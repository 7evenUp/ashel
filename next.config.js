/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
    unoptimized: true,
    deviceSizes: [450, 570, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  }
}

module.exports = nextConfig
