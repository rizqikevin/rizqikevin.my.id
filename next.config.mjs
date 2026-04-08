import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack(config) {
    config.ignoreWarnings = [
      ...(config.ignoreWarnings ?? []),
      (warning) =>
        typeof warning?.message === "string" &&
        warning.message.includes(
          "[webpack.cache.PackFileCacheStrategy/webpack.FileSystemInfo]"
        ) &&
        warning.message.includes(
          "next-intl/dist/esm/production/extractor/format/index.js"
        ) &&
        warning.message.includes("import(t)"),
    ];

    return config;
  },
};

export default withNextIntl(nextConfig);
