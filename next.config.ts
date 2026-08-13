import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // AVIF first, WebP second, source format is the automatic fallback for
    // browsers that support neither. See BUILD-SPEC section 12.
    formats: ['image/avif', 'image/webp'],
    // Default deviceSizes reach 3840. Nothing here is displayed that wide, and
    // over-large images were the single biggest waste on the Cinnamon site.
    deviceSizes: [360, 480, 640, 828, 1080, 1280, 1600, 1920, 2560],
    imageSizes: [64, 96, 128, 256, 384],
    minimumCacheTTL: 2678400,
  },
  poweredByHeader: false,
  async redirects() {
    return [{ source: '/cv', destination: '/maria-namata-cv.pdf', permanent: true }];
  },
};

export default nextConfig;
