'use strict'

import React from 'react'
import ReactDOM from 'react-dom'

import Geosuggest from 'react-geosuggest'

import GeoLocate from './util/geolocate.jsx'
import If from './util/if.jsx'
import GpsButton from './components/button/gpsbutton.jsx'
import makeRequest from './util/makeRequest.jsx'

import Input from './components/input/input.jsx'
import Datalist from './components/input/datalist.jsx'

import config from './config.js'

const Wrapper = React.createClass({
    getInitialState(){
        return {
            year: new Date().getFullYear()
        }
    },
    render(){
        return (
            <section>
                <nav className="navbar navbar-default">
                    <div className="container">
                        <a href="#" className="navbar-brand">NEXT TRAIN: BART</a>
                    </div>
                </nav>
                <main className="container">
                    <section className="row">
                        <div className="col-md-6 col-md-offset-3">
                            {this.props.children}
                        </div>
                    </section>
                </main>
                <footer className="footer">
                    <div className="container">
                        <p className="text-mute text-center">
                            nexttrain - {this.state.year}
                        </p>
                    </div>
                </footer>
                <footer>

                </footer>
            </section>
        )
    }
})

const StationList = React.createClass({
    getDefaultProps(){
        return {
            stations : [{"_id":"56c7dac7dbb58dd8c5888142","stop_id":"1369","stop_name":"Camino Pablo/Miner Rd","stop_lat":37.888623,"stop_lon":-122.194463,"location_type":0,"parent_station":"","agency_key":"county-connection","loc":[-122.194463,37.888623]},{"_id":"56c7dac7dbb58dd8c5888148","stop_id":"1375","stop_name":"Miner Rd/Camino Lenada","stop_lat":37.890542,"stop_lon":-122.19401,"location_type":0,"parent_station":"","agency_key":"county-connection","loc":[-122.19401,37.890542]},{"_id":"56c7dac7dbb58dd8c5888143","stop_id":"1370","stop_name":"Camino Pablo/El Toyonal","stop_lat":37.885734,"stop_lon":-122.193478,"location_type":0,"parent_station":"","agency_key":"county-connection","loc":[-122.193478,37.885734]},{"_id":"56c7dac7dbb58dd8c5888169","stop_id":"1409","stop_name":"Orinda Way/Avenida De Orinda","stop_lat":37.885256,"stop_lon":-122.191606,"location_type":0,"parent_station":"","agency_key":"county-connection","loc":[-122.191606,37.885256]},{"_id":"56c7dac7dbb58dd8c5888168","stop_id":"1408","stop_name":"Orinda Way/Irwin Way","stop_lat":37.884259,"stop_lon":-122.190041,"location_type":0,"parent_station":"","agency_key":"county-connection","loc":[-122.190041,37.884259]},{"_id":"56c7dac7dbb58dd8c5888167","stop_id":"1407","stop_name":"26 Orinda Way","stop_lat":37.882826,"stop_lon":-122.188304,"location_type":0,"parent_station":"","agency_key":"county-connection","loc":[-122.188304,37.882826]},{"_id":"56c7dac7dbb58dd8c5888149","stop_id":"1376","stop_name":"Miner Rd/Camino Don Miguel","stop_lat":37.897238,"stop_lon":-122.192035,"location_type":0,"parent_station":"","agency_key":"county-connection","loc":[-122.192035,37.897238]},{"_id":"56c7dac7dbb58dd8c5888166","stop_id":"1406","stop_name":"24 Orinda Way","stop_lat":37.881589,"stop_lon":-122.186819,"location_type":0,"parent_station":"","agency_key":"county-connection","loc":[-122.186819,37.881589]},{"_id":"56c7dac7dbb58dd8c588816d","stop_id":"1413","stop_name":"Santa Maria Way/Orinda Way","stop_lat":37.881064,"stop_lon":-122.18606,"location_type":0,"parent_station":"","agency_key":"county-connection","loc":[-122.18606,37.881064]},{"_id":"56c7dac7dbb58dd8c5888141","stop_id":"1368","stop_name":"521 Altarinda Rd","stop_lat":37.883129,"stop_lon":-122.183839,"location_type":0,"parent_station":"","agency_key":"county-connection","loc":[-122.183839,37.883129]},{"_id":"56c7dac7dbb58dd8c588816c","stop_id":"1412","stop_name":"Orindawoods Dr/Village Gate Rd","stop_lat":37.885237,"stop_lon":-122.182698,"location_type":0,"parent_station":"","agency_key":"county-connection","loc":[-122.182698,37.885237]},{"_id":"56c7dac7dbb58dd8c588814a","stop_id":"1377","stop_name":"Miner Rd/Camino Sobrante","stop_lat":37.900809,"stop_lon":-122.190875,"location_type":0,"parent_station":"","agency_key":"county-connection","loc":[-122.190875,37.900809]},{"_id":"56c7dac7dbb58dd8c588813f","stop_id":"1366","stop_name":"Bart Orinda","stop_lat":37.878025,"stop_lon":-122.184133,"location_type":0,"parent_station":"","agency_key":"county-connection","loc":[-122.184133,37.878025]},{"_id":"56c7dac7dbb58dd8c588814b","stop_id":"1378","stop_name":"Miner Rd/Lombardy Ln","stop_lat":37.90239,"stop_lon":-122.189939,"location_type":0,"parent_station":"","agency_key":"county-connection","loc":[-122.189939,37.90239]}]
        }
    },
    render(){

        const stations = this.props.stations.map(function(station, i){
            return (
                <li key={i} className='geosuggest-item'>
                    {station.stop_name} <i className="fa fa-train pull-right"></i>
                </li>
            )
        })

        return (
            <section>
                <label htmlFor={this.props.id}>
                    {this.props.label}
                </label>
                <ul className="geosuggest__suggests" id={this.props.id}>
                    {stations}
                </ul>
            </section>
            )
    }

})


const HomePage = React.createClass({
    getDefaultProps(){
        return {
            fixtures: [
              {label: 'Seattle, WA', location: {lat: 47.6062095, lng: -122.3320708}},
              {label: 'San Francisco, CA', location: {lat: 37.7749295, lng: -122.41941550000001}},
              {label: 'New York, NY', location: {lat: 40.712784, lng: -74.005941}},
              {label: 'Miami, FL', location: {lat: 25.7616798, lng: -80.19179020000001}}
            ]
        }
    },
    getInitialState(){
        return {
            initialValue : 'San Francisco',
            startLocation: {
              name: 'startLocation',
              type: 'text',
              value: '12th St. Oakland City Center',
              placeholder : '12th St. Oakland City Center',
              required: true,
              options: [
                  {value: '12TH', label: '12th St. Oakland City Center'}
              ]
            }
        }
    },
    onSuggestSelectStart(suggest) {

        console.log(suggest)

        this.setState({
            location : {
                value: suggest.label
            }
        })

        // get stations
        this.getStations(suggest.location.lat, suggest.location.lng)
    },
    onSuggestSelectEnd(suggest) {
        this.setState({
            location : {
                value: suggest.label
            }
        })
    },
    startLocation(address){
        this.setState({
            initialValue : address
        })
        console.log(this.state)
    },
    getStations(lat, long){
        makeRequest(config.base + '/api/near/' + lat + '/' + long)
        .then(function(stations){
            console.log(stations)
        })
        .catch(function(){

        })
    },
    render(){
        return (
            <section>
                <form action="">
                    <label htmlFor="startLocation" className="control-label">Starting Location</label>
                    <Geosuggest
                    placeholder="Start Location"
                    id="startLocation"
                    className="input-starting-container"
                    inputClassName="form-control"
                    initialValue={this.state.initialValue}
                    fixtures={this.props.fixtures}
                    onSuggestSelect={this.onSuggestSelectStart}
                    location={new google.maps.LatLng(53.558572, 9.9278215)}
                    radius="20" />
                <select id="edit-from-station" name="from_station" class="form-select"><option value="">Departing from?</option><option value="closest">Find closest</option><option value="12TH">12th St. Oakland City Center</option><option value="16TH">16th St. Mission (SF)</option><option value="19TH">19th St. Oakland</option><option value="24TH">24th St. Mission (SF)</option><option value="ASHB">Ashby (Berkeley)</option><option value="BALB">Balboa Park (SF)</option><option value="BAYF">Bay Fair (San Leandro)</option><option value="CAST">Castro Valley</option><option value="CIVC">Civic Center/UN Plaza (SF)</option><option value="COLS">Coliseum</option><option value="COLM" selected="selected">Colma</option><option value="CONC">Concord</option><option value="DALY">Daly City</option><option value="DBRK">Downtown Berkeley</option><option value="DUBL">Dublin/Pleasanton</option><option value="DELN">El Cerrito del Norte</option><option value="PLZA">El Cerrito Plaza</option><option value="EMBR">Embarcadero (SF)</option><option value="FRMT">Fremont</option><option value="FTVL">Fruitvale (Oakland)</option><option value="GLEN">Glen Park (SF)</option><option value="HAYW">Hayward</option><option value="LAFY">Lafayette</option><option value="LAKE">Lake Merritt (Oakland)</option><option value="MCAR">MacArthur (Oakland)</option><option value="MLBR">Millbrae</option><option value="MONT">Montgomery St. (SF)</option><option value="NBRK">North Berkeley</option><option value="NCON">North Concord/Martinez</option><option value="OAKL">Oakland Int'l Airport</option><option value="ORIN">Orinda</option><option value="PITT">Pittsburg/Bay Point</option><option value="PHIL">Pleasant Hill/Contra Costa Centre</option><option value="POWL">Powell St. (SF)</option><option value="RICH">Richmond</option><option value="ROCK">Rockridge (Oakland)</option><option value="SBRN">San Bruno</option><option value="SFIA">San Francisco Int'l Airport</option><option value="SANL">San Leandro</option><option value="SHAY">South Hayward</option><option value="SSAN">South San Francisco</option><option value="UCTY">Union City</option><option value="WCRK">Walnut Creek</option><option value="WDUB">West Dublin/Pleasanton</option><option value="WOAK">West Oakland</option></select>
                    <Input {...this.state.startLocation} id="startLocation" list="startLocation-list" onChange={this.handleChange}/>
                    <Datalist id="startLocation-list"  options={this.state.startLocation.options} onChange={this.handleChange} />
                    <If show={GeoLocate.canGeoLocate()}>
                        <GpsButton setAddress={this.startLocation} />
                    </If>
                    <StationList id="departurestation"
                        label="Departure Station"/>
                    <label htmlFor="endLocation" className="control-label">Arrival Station</label>
                    <Geosuggest
                    placeholder="End Location"
                    id="endLocation"
                    inputClassName="form-control"
                    fixtures={this.props.fixtures}
                    onSuggestSelect={this.onSuggestSelectEnd}
                    location={new google.maps.LatLng(53.558572, 9.9278215)}
                    radius="20" />
                <a src="" className="btn btn-lg center-block btn-primary"><i className="fa fa-search"></i> Find Next Train</a>
                </form>

            </section>
        )
    }
})

const App = React.createClass({
    render(){
        return (
            <div>
                <Wrapper>
                    <HomePage />
                </Wrapper>
            </div>
        )
    }
})


ReactDOM.render(<App />, document.getElementById('app'))
