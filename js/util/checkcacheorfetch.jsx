import makeRequest from 'makeRequest'

const checkCacheOrFetch = function(url){
    if(!url)
        throw new Error('missing url')

    // check DB for cached response

    // If not in DB, fetch then cache in DB
    makeRequest()
    then((response) => {

    })
    catch(() => {

    })
}

export default checkCacheOrFetch
