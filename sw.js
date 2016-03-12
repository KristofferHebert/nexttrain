// inspired by examples on
// developer.mozilla.org/en-US/docs/Web/API/ServiceWorker.html
// https://github.com/mxstbr/react-boilerplate/blob/master/serviceworker.js

'use strict'

const APPNAME = 'nexttrain-v1'

const resourceCache = [
    '/',
    '/css/bootstrap.min.css',
    '/css/main.css',
    '/js/bundle.js'
]


// Cache Resources
self.addEventListener('install', (event) => {
    caches.open(APPNAME)
        .then((cache) => {
            console.log('Caching resources')
            return cache.addAll(resourceCache)
        })
        .catch((err) => {
            console.log('Caching files failed:', err)
        })
})
