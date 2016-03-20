import React from 'react'
import getDuration from '../util/duration.jsx'
import If from '../util/if.jsx'

const StationsScheduleList = React.createClass({
    getDefaultProps(){
        return {
            stationSchedule: {
                sched_num: false,
                station: {
                    item: [
                        {
                            line: false,
                            trainHeadStation: false,
                            origTime: false,
                            destTime: false,
                            trainIdx: false
                        }
                    ]
                },
                fullname: false,
                name: false
            }
        }
    },
    getDuration,
    render(){
        const date = new Date().toLocaleDateString()
        const stationSchedule = this.props.stationSchedule
        const itemList = stationSchedule.station.item.map(function(item, i){
            return (
                <li key={i} className='geosuggest-item'>
                    <span className="small routes">{item.line} - #{item.trainHeadStation} - {item.trainIdx}</span>
                    {item.origTime} to {item.destTime} {getDuration(date + " " + item.origTime, date + " " + item.destTime)}
                </li>
            )
        })

        return (
            <section>
                <header>
                    Station: {stationSchedule.fullname} <span className="pull-right">Date: {new Date().toDateString()}</span>
                </header>
                <ul className="geosuggest__suggests">
                    {itemList}
                </ul>
            </section>
            )
    }

})

export default StationsScheduleList
