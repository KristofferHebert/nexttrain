// inspired by examples on
// developer.mozilla.org/en-US/docs/Web/API/ServiceWorker.html

if(navigator.serviceWorker){

    navigator.serviceWorker
        .register('sw.js', {
            scope: './'
        })
        .then(function(registration){
            
        })
        .catch(function(error){
            console.log('ServiceWorker registration failed'. error)
        })

} else {
    console.log('ServiceWorker not support in this browser')
}
