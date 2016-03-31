import makeRequest from './makeRequest.jsx'
import db from '../db.jsx'

const checkCacheOrFetch = function(url, collection, key, value){
    if(!url)
        throw new Error('missing url')

    var promise = new Promise( function (resolve, reject) {

        // check DB for cached response
        db.open()

        let dbCollection = db[collection]

        dbCollection.where(key).equals(value).first(function(result){

            if(result){
                return resolve(result)
            } else {

                // If not in DB, fetch from url
                makeRequest(url)
                .then((response) => {
                    return resolve(response.data)
                })
                .catch((err) => {
                    return reject(response)
                })

            }

        })

    })

    return promise

}

export default checkCacheOrFetch
