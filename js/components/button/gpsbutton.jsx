import React from 'react'

import GeoLocate from '../../util/geolocate.jsx'
import makeRequest from '../../util/makeRequest.jsx'


function getMyLocation(){
    const self = this

    function success(position){

        // Convert latitude, longitude to address
        GeoLocate.coordsToAddress(position.coords.latitude, position.coords.longitude)
        .then(function(response){

            // If successfull update address in parent component
            self.props.setAddress(response.results[0].formatted_address)
        })
        .catch(function(err){
            throw new Error('Failed to get Address from coordinates', err)
        })

        self.setState({message: ''})
    }

    function error(err){
        throw new Error('Error getting location',err)
    }

    self.setState({message: 'LOADING...'})
    GeoLocate.getCurrentPosition(success, error)
}

const GpsButton = React.createClass({
    getInitialState(){
        return {
            message: ''
        }
    },
    getMyLocation,
    render(){

        let icons = (this.state.message === '') ? 'fa fa-location-arrow' : 'fa fa-spinner fa-spin'

        return (
            <a className="btn btn-primary btn-no-left-corners" onClick={this.getMyLocation}>
                <i className={icons}></i></a>
        )
    }
})

export default GpsButton
