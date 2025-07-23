import type { NextConfig } from 'next'

import '~/lib/env'

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  poweredByHeader: false,

  devIndicators: {
    position: 'bottom-left',
  },
}

export default nextConfig
