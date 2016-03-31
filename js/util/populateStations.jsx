import makeRequest from './makeRequest.jsx'
import db from '../db.jsx'

const populateStations = function(url, collection){
    if(!url)
        throw new Error('missing url')


    // check DB for cached response
    db.open()

    let dbCollection = db[collection].where('name').equals(value).first('12th')
    
    if(dbCollection.count() === 0){

        // If not in DB, fetch then cache in DB
        makeRequest(url)
        .then((response) => {
            console.log(response)
        })
        .catch((err) => {
            throw new Error('failed to fetch stations', err)
        })

    } else {
        console.log('Stations already cached')
    }
}

export default populateStations
