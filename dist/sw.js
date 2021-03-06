'use strict'

// inspired by examples on
// developer.mozilla.org/en-US/docs/Web/API/ServiceWorker.html
// https://github.com/mxstbr/react-boilerplate/blob/master/serviceworker.js

const APPNAME = 'nexttrain-v1'
const resourceCache = [
    '/',
    '/css/bootstrap.min.css',
    '/css/main.css',
    '/js/bundle.js'
]

// Cache Resources
this.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(APPNAME)
            .then((cache) => {
                console.log('Caching Resources')
                return cache.addAll(resourceCache)
            })
            .catch((err) => {
                console.log('Caching files failed:', err)
            })
    )
})

// Cache Requests
this.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
        .then(function(response){

            // If cached request found - return cache
            if(response){
                console.log('Using cached response')
                return response
            }

            let fetchRequest = event.request.clone()

            // Start request again since there are no files in the cache
            return fetch(fetchRequest)
                .then((response) => {

                    // If response is invalid, throw error
                    if(!response || response.status !== 200 || response.type !== 'basic') {
                      return response
                    }

                    let responseToCache = response.clone()

                    // Otherwise cache the downloaded files
                    caches.open(APPNAME)
                      .then((cache) => {
                        console.log('Saving cache fetch response')
                        cache.put(event.request, responseToCache)
                      })

                    // And return the network response
                    return response
                })
                .catch((err) => {
                    console.log('Caching request failed:', err)
                })


        })
        .catch((err) => {
            console.log("Request cache failed:", error)
        })
    )
})
