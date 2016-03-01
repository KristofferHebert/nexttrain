import React from 'react'
import getDuration from '../util/duration.jsx'

const StationList = React.createClass({
    getDefaultProps(){
        return {
            stations:{"uri":"","origin":"","destination":"","sched_num":"",
                "schedule":{"date":"","time":"","before":"","after":"","request":{"trip":[{"origin":"","destination":"","fare":"","origTimeMin":"","origTimeDate":" ","destTimeMin":"","destTimeDate":"","clipper":"","leg":{"order":"","transfercode":"","origin":"","destination":"","origTimeMin":"","origTimeDate":"","destTimeMin":"","destTimeDate":"","line":"","bikeflag":"","trainHeadStation":"","trainIdx":""}}]}},"message":{"co2_emissions":""}
            }
        }
    },
    getDuration,
    render(){

        const stations = this.props.stations
        const schedule = stations.schedule

        const triplist = schedule.request.trip.map(function(trip, i){
            return (
                <li key={i} className='geosuggest-item'>
                    {trip.leg.origTimeMin} to {trip.leg.destTimeMin} {getDuration(schedule.date + ' ' + trip.leg.origTimeMin, schedule.date + ' ' + trip.leg.destTimeMin)} <span className="pull-right">Fare: ${trip.fare}  <i className="fa fa-train"></i></span>
                </li>
            )
        })

        return (
            <section>
                <header>
                    Depart: {stations.origin}<br />
                    Arrive: {stations.destination}<br />
                    Date: {schedule.date}
                </header>
                <label htmlFor={this.props.id}>
                    {this.props.label}
                </label>
                <ul className="geosuggest__suggests">
                    {triplist}
                </ul>
            </section>
            )
    }

})

export default StationList
