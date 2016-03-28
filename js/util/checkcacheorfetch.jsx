import makeRequest from 'makeRequest'
import db from '../db.jsx'

const checkCacheOrFetch = function(url, collection, key, value){
    if(!url)
        throw new Error('missing url')

    var promise = new Promise( function (resolve, reject) {

        // check DB for cached response
        db.open()

        let dbCollection = db[collection]

        let results = dbCollection.where(key).equals(value).first()

        if(results.length !== 0) {
            resolve(results)
        } else {

            // If not in DB, fetch then cache in DB
            makeRequest(url)
            then((response) => {
                resolve(response)
            })
            catch((err) => {
                reject(response)
            })

        }

    })

    return promise

}

export default checkCacheOrFetch
