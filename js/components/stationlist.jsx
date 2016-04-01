import React from 'react'
import getDuration from '../util/duration.jsx'
import If from '../util/if.jsx'
import AdvisorBar from './advisorbar.jsx'



const StationList = React.createClass({
    getDefaultProps(){
        return {
            stations:{"uri":"","origin":"","destination":"","sched_num":"",
                "schedule":{"date":"","time":"","before":"","after":"","request":{"trip":[{"origin":"","destination":"","fare":"","origTimeMin":"","origTimeDate":" ","destTimeMin":"","destTimeDate":"","clipper":"","leg":{"order":"","transfercode":"","origin":"","destination":"","origTimeMin":"","origTimeDate":"","destTimeMin":"","destTimeDate":"","line":"","bikeflag":"","trainHeadStation":"","trainIdx":""}}]}},"message":{"co2_emissions":""}
            },
            message: false
        }
    },
    getDuration,
    render(){

        const stations = this.props.stations
        const schedule = stations.schedule

        const triplist = schedule.request.trip.map(function(trip, i){

            if(!Array.isArray(trip.leg)){
                trip.leg = [trip.leg]
            }

            if(trip.leg.length === 1){
                return trip.leg.map((lg, ii) => {
                    return (
                        <li key={ii} className='geosuggest-item'>
                            <span className="small routes">{lg.line} - #{lg.trainIdx}</span>
                            {lg.origTimeMin} to {lg.destTimeMin} {getDuration(schedule.date + ' ' + lg.origTimeMin, schedule.date + ' ' + lg.destTimeMin)} <span className="pull-right">Fare: ${trip.fare}  <i className="fa fa-train"></i></span>
                        </li>
                    )
                })
            } else {
                return trip.leg.map((lg, ii) => {
                    const last = (ii === trip.leg.length - 1) ? ' last' : ''

                    return (
                        <li key={ii} className={'geosuggest-item geosuggest-item-transfer' + last}>
                            <span className="small routes">{lg.line} - #{lg.trainIdx} |  <strong>TRANSFER REQUIRED: Leg {lg.order} | GET OFF AT {lg.destination}</strong></span>
                            {lg.origTimeMin} to {lg.destTimeMin} {getDuration(schedule.date + ' ' + lg.origTimeMin, schedule.date + ' ' + lg.destTimeMin)}
                            <If show={ii === trip.leg.length - 1}><span className="pull-right">Fare: ${trip.fare}  <i className="fa fa-train"></i></span></If>
                        </li>
                    )
                })
            }


        })

        return (
            <section>
                <header>
                    Schedule: {stations.origin} Station to {stations.destination} Station <span className="pull-right">Date: {schedule.date}</span>
                </header>
                <label htmlFor={this.props.id}>
                    {this.props.label}
                </label>
                <ul className="geosuggest__suggests">
                    {triplist}
                </ul>
                <AdvisorBar message={this.props.message}/>
            </section>
            )
    }

})

export default StationList
