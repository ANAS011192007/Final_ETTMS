/** @type {import('next').NextConfig} */
const nextConfig = {
    serverComponentsExternalPackages: ['bcrypt'],
    images: {
        domains: ['trackdev2.ultra-x.jp'],
      },
}

module.exports = nextConfig