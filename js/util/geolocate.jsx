// Some work based on https://developer.mozilla.org/en-US/docs/Web/API/Geolocation
// http://maps.googleapis.com/maps/api/geocode/json?latlng=45.8277891,-122.215983&sensor=true
//

import makeRequest from './makeRequest.jsx'

function canGeoLocate(){
    if(navigator)
        return Boolean(navigator.geolocation)
    else
        return false
}

function getCurrentPosition(success, error, options){

    const defaultOptions = {
        //enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    }

    const opts = options || defaultOptions

    if(canGeoLocate())
        navigator.geolocation.getCurrentPosition(success, error, options)
    else
        console.log('Geolocation is unavailable for this browser.')
}

function coordsToAddress(lat, lng){

    if(!lat || !lng) {
        throw new Error('Please provide lat and longitude coordinates')
    }

    const url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+ lat + ','+ lng +'&sensor=true'

    return makeRequest(url)

    //  success should be results[0].formatted_address
}


const GeoLocate = {
    canGeoLocate: canGeoLocate,
    getCurrentPosition: getCurrentPosition,
    coordsToAddress: coordsToAddress
}

export default GeoLocate
