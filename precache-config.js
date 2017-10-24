module.exports = {
    staticFileGlobs: [
        'index.html',
        'manifest.json',
        'icons/icon-16x16.png',
        'bower_components/webcomponentsjs/webcomponents-loader.js'
    ],
    navigateFallback: '/index.hml',
    navigateFallbackWhitelist: [/^\/user\//],
    runtimeCaching: [
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