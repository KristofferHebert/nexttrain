'use strict'

import React from 'react'
import ReactDOM from 'react-dom'

import Geosuggest from 'react-geosuggest'

import GeoLocate from './util/geolocate.jsx'
import If from './util/if.jsx'
import GpsButton from './components/button/gpsbutton.jsx'

const Wrapper = React.createClass({
    getInitialState(){
        return {
            year: new Date().getFullYear()
        }
    },
    render(){
        return (
            <section>
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container">

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
            initialValue : 'Seattle'
        }
    },
    onSuggestSelectStart(suggest) {
        this.setState({
            location : {
                value: suggest.label
            }
        })
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
    render(){
        return (
            <section>
                <form action="">
                    <label htmlFor="startLocation" className="control-label">Start Location</label>
                    <Geosuggest
                    placeholder="Start Location"
                    id="startLocation"
                    inputClassName="form-control"
                    initialValue={this.state.initialValue}
                    fixtures={this.props.fixtures}
                    onSuggestSelect={this.onSuggestSelectStart}
                    location={new google.maps.LatLng(53.558572, 9.9278215)}
                    radius="20" />
                    <If show={GeoLocate.canGeoLocate()}>
                        <GpsButton setAddress={this.startLocation} />
                    </If>
                    <label htmlFor="endLocation" className="control-label">End Location</label>
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
