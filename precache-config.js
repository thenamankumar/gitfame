module.exports = {
    staticFileGlobs: [
        'index.html',
        'manifest.json',
        'icons/favicon-32x32.png',
        'icons/apple-touch-icon.png',
        'icons/android-chrome-192x192.png',
        'icons/favicon-16x16.png',
        'icons/safari-pinned-tab.svg',
        'icons/mstile-144x144.png',
        'bower_components/webcomponentsjs/webcomponents-loader.js',
        'browserconfig.xml',
        'icons/android-chrome-36x36.png',
        'icons/android-chrome-48x48.png',
        'icons/android-chrome-72x72.png',
        'icons/android-chrome-96x96.png',
        'icons/android-chrome-144x144.png',
        'icons/android-chrome-192x192.png',
        'icons/android-chrome-256x256.png',
        'icons/android-chrome-384x384.png',
        'icons/android-chrome-512x512.png',
        'icons/apple-touch-icon-57x57.png',
        'icons/apple-touch-icon-60x60.png',
        'icons/apple-touch-icon-72x72.png',
        'icons/apple-touch-icon-76x76.png,',
        'icons/apple-touch-icon-114x114.png',
        'icons/apple-touch-icon-120x120.png',
        'icons/apple-touch-icon-144x144.png',
        'icons/apple-touch-icon-152x152.png',
        'icons/apple-touch-icon-180x180.png',
        'icons/apple-touch-icon-512x512.png'
    ],
    navigateFallback: '/index.html',
    navigateFallbackWhitelist: [/^\/user\//],
    skipWaiting: true,
    runtimeCaching: [
        {
            urlPattern: '/',
            handler: 'networkFirst',
            options: {
                cache: {
                    name: 'src'
                }
            }
        },
        {
            urlPattern: /src/,
            handler: 'networkFirst',
            options: {
                cache: {
                    name: 'src'
                }
            }
        },
        {
            urlPattern: /bower_components/,
            handler: 'networkFirst',
            options: {
                cache: {
                    name: 'bower'
                }
            }
        },
        {
            urlPattern: /^https:\/\/api\.github\.com\/users\/[^\/]*\?/,
            handler: 'cacheFirst',
            options: {
                cache: {
                    maxAgeSeconds: 60 * 60 * 4,
                    name: 'users'
                }
            }
        },
        {
            urlPattern: /^https:\/\/api\.github\.com\/users\/[^\/]*\/repos\?.*$/,
            handler: 'cacheFirst',
            options: {
                cache: {
                    maxAgeSeconds: 60 * 60 * 4,
                    name: 'repos'
                }
            }
        },
        {
            urlPattern: /^https:\/\/api\.github\.com\/repos/,
            handler: 'cacheFirst',
            options: {
                cache: {
                    maxAgeSeconds: 60 * 60 * 4,
                    name: 'contributors'
                }
            }
        },
        {
            urlPattern: /^https:\/\/.*\.githubusercontent\.com\//,
            handler: 'cacheFirst',
            options: {
                cache: {
                    maxAgeSeconds: 60 * 60 * 24,
                    name: 'user-images'
                }
            }
        }
    ]
};
