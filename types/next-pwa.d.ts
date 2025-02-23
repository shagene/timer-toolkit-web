declare module 'next-pwa' {
  import type { NextConfig } from 'next'

  type PWAConfig = {
    dest?: string
    disable?: boolean
    register?: boolean
    scope?: string
    sw?: string
    skipWaiting?: boolean
    runtimeCaching?: Array<{
      urlPattern: RegExp | string
      handler: string
      options?: Record<string, unknown>
    }>
  }

  function withPWA(config: PWAConfig): (nextConfig: NextConfig) => NextConfig
  export default withPWA
}