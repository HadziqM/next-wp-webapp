/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["id"],
    defaultLocale: "id",
  },
  images: {
    domains: ["masjidmoedhararifin.com"],
  },
  experimental: {
    isrMemoryCacheSize: 0,
  },
};
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: false,
});
module.exports = withBundleAnalyzer(nextConfig);
