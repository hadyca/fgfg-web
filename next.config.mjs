import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "images.pexels.com",
      },
      {
        hostname: "imagedelivery.net",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
