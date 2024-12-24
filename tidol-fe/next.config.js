/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `http://tidol-be.winddarroww-dev.svc.cluster.local:8080/api/:path*/`,
      },
      {
        source: '/covers/:path*',
        destination: `http://tidol-be.winddarroww-dev.svc.cluster.local:8080/covers/:path*/`,
      }
    ]
  }
}

module.exports = nextConfig
