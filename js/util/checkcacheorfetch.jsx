import makeRequest from 'makeRequest'
import db from '../db.jsx'

const checkCacheOrFetch = function(url, key){
    if(!url)
        throw new Error('missing url')

    // check DB for cached response
    db.open()

    let stations = db.stations.where('name').equals(key)

    if(stations.length !== 0) {
        stations.each((station) => {
            
        })
    } else {

        // If not in DB, fetch then cache in DB
        makeRequest(url)
        then((response) => {

        })
        catch(() => {

        })

    }

}

export default checkCacheOrFetch
