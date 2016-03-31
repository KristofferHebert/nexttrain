import makeRequest from './makeRequest.jsx'
import db from '../db.jsx'

const populateStations = function(url, collection){
    if(!url)
        throw new Error('missing url')


    db.open()

    let dbCollection = db[collection]

    // check DB for cached response

    dbCollection.toArray((station) => {
        if(station.length === 0){
            
            // If not in DB, fetch then cache in DB
            console.log('Fetching Stations and saving')
            makeRequest(url)
            .then((response) => {
                response.data.forEach(function(station){
                    dbCollection.put(station)
                })
            })
            .catch((err) => {
                throw new Error('failed to fetch stations', err)
            })

        } else {
            console.log('Stations already cached')
        }

    })
}

export default populateStations
