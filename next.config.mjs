/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Add this for static site generation
  trailingSlash: true, // Recommended for static exports
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // Required for static exports
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Mock browser globals for server-side rendering
      global.navigator = {
        userAgent: 'Mozilla/5.0 (compatible; Next.js SSR)',
        platform: 'linux',
        languages: ['en-US'],
        language: 'en-US',
        onLine: true,
        cookieEnabled: true,
        doNotTrack: null,
        maxTouchPoints: 0,
        hardwareConcurrency: 4,
        deviceMemory: 8,
        connection: {
          effectiveType: '4g',
          downlink: 10,
          rtt: 50,
          saveData: false
        }
      };
      
      // Mock window object if needed
      global.window = {
        navigator: global.navigator,
        location: {
          hostname: 'localhost',
          protocol: 'https:',
          origin: 'https://localhost'
        },
        screen: {
          width: 1920,
          height: 1080,
          availWidth: 1920,
          availHeight: 1080
        },
        innerWidth: 1920,
        innerHeight: 1080,
        devicePixelRatio: 1,
        matchMedia: () => ({
          matches: false,
          media: '',
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => {}
        })
      };
      
      // Mock document if needed
      global.document = {
        createElement: () => ({
          setAttribute: () => {},
          getAttribute: () => null,
          removeAttribute: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          style: {},
          classList: {
            add: () => {},
            remove: () => {},
            contains: () => false,
            toggle: () => {}
          }
        }),
        getElementById: () => null,
        querySelector: () => null,
        querySelectorAll: () => [],
        addEventListener: () => {},
        removeEventListener: () => {},
        body: {
          style: {},
          classList: {
            add: () => {},
            remove: () => {},
            contains: () => false
          },
          appendChild: () => {},
          removeChild: () => {}
        },
        head: {
          appendChild: () => {},
          removeChild: () => {}
        }
      };
    }
    return config;
  },
  // Add this to handle static export issues
  experimental: {
    esmExternals: 'loose',
  },
}

export default nextConfig