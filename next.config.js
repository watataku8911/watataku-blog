const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
    buildExcludes: [/middleware-manifest.json$/], // 追加
    register: true,
    skipWaiting: true,
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    domains: ["images.microcms-assets.io"],
    disableStaticImages: true,
  },
});
