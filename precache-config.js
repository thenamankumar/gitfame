module.exports = {
    staticFileGlobs: [
        'index.html',
        'manifest.json',
        'bower_components/webcomponentsjs/webcomponents-loader.js'
    ],
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
            handler: 'cacheFirst',
            options: {
                cache: {
                    maxAgeSeconds: 14400,
                    name: 'bower'
                }
            }
        },
        {
            urlPattern: /^https:\/\/api\.github\.com\/users/,
            handler: 'networkFirst',
            options: {
                cache: {
                    name: 'github-users'
                }
            }
        },
        {
            urlPattern: /^https:\/\/api\.github\.com\/repos/,
            handler: 'networkFirst',
            options: {
                cache: {
                    name: 'github-repos'
                }
            }
        },
        {
            urlPattern: /^https:\/\/.*\.githubusercontent\.com\//,
            handler: 'cacheFirst',
            options: {
                cache: {
                    maxAgeSeconds: 86400,
                    name: 'github-img'
                }
            }
        }
    ]
};