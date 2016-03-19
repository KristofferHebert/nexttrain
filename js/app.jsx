'use strict'
import React from 'react'
import ReactDOM from 'react-dom'

import db from './db.jsx'
import GeoLocate from './util/geolocate.jsx'
import If from './util/if.jsx'
import GpsButton from './components/button/gpsbutton.jsx'
import makeRequest from './util/makeRequest.jsx'
import toJSON from './util/toJSON.jsx'

import Input from './components/input/input.jsx'
import Datalist from './components/input/datalist.jsx'
import DropDown from './components/input/dropdown.jsx'
import handleChange from './components/input/handleChange.jsx'
import setStation from './components/input/setStation.jsx'
import AdvisorBar from './components/advisorbar.jsx'
import getDuration from './util/duration.jsx'
import StationList from './components/stationlist.jsx'
import config from './config.jsx'
import registerSW from './util/registerSW.jsx'


import Wrapper from './components/wrapper.jsx'

// https://www.bart.gov/schedules/quickplanner?orig=CONC&addr1=&dest=FRMT&addr2=&type=departure&date=2016-02-28&time=now&tab=2
// http://api.bart.gov/api/sched.aspx?cmd=depart&orig=CONC&dest=FRMT&type=departure&date=now&time=now&key=MW9S-E7SL-26DU-VV8V
// https://www.pubnub.com/blog/2015-05-29-how-to-build-a-realtime-public-transit-schedule-app/

registerSW('/sw.js')

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
            options: [
                { value: '12TH', label: '12th St. Oakland City Center', lat: 37.803769, lng: -122.271451},
                { value: '16TH', label: '16th St. Mission (SF)', lat: 37.765195, lng: -122.417527},
                { value: '19TH', label: '19th St. Oakland', lat: 37.808359 , lng: -122.268604 },
                { value: '24TH', label: '24th St. Mission (SF)', lat: 37.751992, lng: -122.268604},
                { value: 'ASHB', label: 'Ashby (Berkeley)', lat: 37.852883, lng: -122.269977},
                { value: 'BALB', label: 'Balboa Park (SF)', lat: 37.724569, lng: -122.443357},
                { value: 'BAYF', label: 'Bay Fair (San Leandro)', lat: 37.699422, lng: -122.123320},
                { value: 'CAST', label: 'Castro Valley', lat: 37.6907739, lng: -122.077774},
                { value: 'CIVC', label: 'Civic Center/UN Plaza (SF)', lat: 37.7797602, lng: -122.4163387},
                { value: 'COLS', label: 'Coliseum', lat: 37.7536727, lng: -122.1990868 },
                { value: 'COLM', label: 'Colma', lat: 37.6846422 , lng: -122.4684217},
                { value: 'CONC', label: 'Concord', lat: 37.9737412, lng: -122.0312837},
                { value: 'DALY', label: 'Daly City', lat: 37.7063674, lng: -122.4714491},
                { value: 'DBRK', label: 'Downtown Berkeley', lat: 37.8701015, lng: -122.2703359},
                { value: 'DUBL', label: 'Dublin/Pleasanton', lat: 37.7016546, lng: -121.9013717},
                { value: 'DELN', label: 'El Cerrito del Norte', lat: 37.9251133, lng: -122.3189901},
                { value: 'PLZA', label: 'El Cerrito Plaza', lat: 37.9026356, lng: -122.3011232},
                { value: 'EMBR', label: 'Embarcadero (SF)', lat: 37.7929095, lng: -122.3992477},
                { value: 'FRMT', label: 'Fremont', lat: 37.5574717, lng: -121.9788225},
                { value: 'FTVL', label: 'Fruitvale (Oakland)', lat: 37.7748395, lng: -122.2263711},
                { value: 'GLEN', label: 'Glen Park (SF)', lat: 37.733067, lng: -122.4360081},
                { value: 'HAYW', label: 'Hayward', lat: 37.6697944, lng: -122.0891976},
                { value: 'LAFY', label: 'Lafayette', lat: 37.8931842, lng: -122.1268296},
                { value: 'LAKE', label: 'Lake Merritt (Oakland)', lat: 37.7970345, lng: -122.2673716},
                { value: 'MCAR', label: 'MacArthur (Oakland)', lat:37.8290685, lng: -122.2692357},
                { value: 'MLBR', label: 'Millbrae', lat: 37.6002806, lng: -122.3888814},
                { value: 'MONT', label: 'Montgomery St. (SF)', lat: 37.7894111, lng: -122.403256},
                { value: 'NBRK', label: 'North Berkeley', lat: 37.9667788, lng: -122.4824808},
                { value: 'NCON', label: 'North Concord/Martinez', lat: 38.0032094, lng: -122.0268445},
                { value: 'OAKL', label: 'Oakland Int\'l Airport', lat: 37.7116032, lng: -122.2143223},
                { value: 'ORIN', label: 'Orinda', lat: 37.8783642, lng: -122.185988},
                { value: 'PITT', label: 'Pittsburg/Bay Point', lat: 38.0189201, lng: -121.9473215},
                { value: 'PHIL', label: 'Pleasant Hill/Contra Costa Centre', lat: 37.9286795, lng: -122.0578968},
                { value: 'POWL', label: 'Powell St. (SF)', lat: 37.784473, lng: -122.4101751},
                { value: 'RICH', label: 'Richmond', lat: 37.9368376, lng: -122.3553625},
                { value: 'ROCK', label: 'Rockridge (Oakland)', lat: 37.8447065, lng: -122.2535807},
                { value: 'SBRN', label: 'San Bruno', lat: 37.6377498, lng: -122.4184895},
                { value: 'SFIA', label: 'San Francisco Int\'l Airport', lat: 37.6159671, lng: -122.3946041},
                { value: 'SANL', label: 'San Leandro', lat: 37.7219544, lng: -122.163044},
                { value: 'SHAY', label: 'South Hayward', lat: 37.6343644, lng: -122.0593897},
                { value: 'SSAN', label: 'South San Francisco', lat: 37.6642503, lng: -122.446151},
                { value: 'UCTY', label: 'Union City', lat: 37.5906302, lng: -122.019582},
                { value: 'WCRK', label: 'Walnut Creek', lat: 37.9055276, lng: -122.0697154},
                { value: 'WDUB', label: 'West Dublin/Pleasanton', lat: 37.6997604, lng: -121.930429},
                { value: 'WOAK', label: 'West Oakland', lat: 37.8048775, lng: -122.2973283}
            ],
            startLocation: {
              name: 'startLocation',
              type: 'text',
              value: '',
              station: '',
              dirty: false,
              required: true
            },
            endLocation: {
              name: 'endLocation',
              type: 'text',
              value: '',
              station: '',
              dirty: false,
              required: true
            },
            stations:{"uri":"","origin":"","destination":"","sched_num":"",
                            "schedule":{"date":"","time":"","before":"","after":"","request":{"trip":[{"origin":"","destination":"","fare":"","origTimeMin":"","origTimeDate":" ","destTimeMin":"","destTimeDate":"","clipper":"","leg":{"order":"","transfercode":"","origin":"","destination":"","origTimeMin":"","origTimeDate":"","destTimeMin":"","destTimeDate":"","line":"","bikeflag":"","trainHeadStation":"","trainIdx":""}}]}},"message":{"co2_emissions":""}
            },
            message: false
        }
    },
    onSuggestSelectStart(suggest) {

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
    },
    getStations(){

        if(this.state.startLocation.dirty === true && this.state.endLocation.dirty === true && this.state.startLocation.station !== '' && this.state.endLocation.station !== ''){
            const self = this
            const startStaton = this.state.startLocation.station
            const endStation = this.state.endLocation.station

            makeRequest(config.base + '/api/sched.aspx?cmd=depart&orig='+ startStaton +'&dest='+ endStation +'&type=departure&date=now&time=now&a=4&key=' + config.key)
            .then(function(stations){
                self.setState({ stations: stations.data, message: stations.data.message.special_schedule })
            })
            .catch(function(err){
                console.log(err.response)
            })
        }




    },
    handleChange,
    setStation,
    render(){

        // TODO: Add fallback for no gpsbutton
        // TODO: Add fallback for no internet
        return (
            <section>
                <form action="">
                    <label htmlFor="startLocation" className="control-label ">Departing:</label>
                    <div className="form-group">
                        <Input {...this.state.startLocation} id="startLocation" className="form-control" list="startLocation-list" placeholder="Select Depature Station" onChange={this.setStation} />
                        <Datalist id="startLocation-list"  options={this.state.options} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="endLocation" className="control-label">Arriving:</label>
                        <Input {...this.state.endLocation} id="endLocation" className="form-control" list="endLocation-list" placeholder="Select Arrival Station" onChange={this.setStation}/>
                        <Datalist id="endLocation-list"  options={this.state.options} onChange={this.handleChange} />
                    </div>
                    <If show={this.state.startLocation.dirty === true && this.state.endLocation.dirty === true}>
                        <StationList stations={this.state.stations} message={this.state.message} />
                    </If>
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
                <AdvisorBar />
            </div>
        )
    }
})


ReactDOM.render(<App />, document.getElementById('app'))
