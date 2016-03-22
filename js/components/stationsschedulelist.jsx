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
                    <span className="small routes">{item.line} - #{item.trainIdx} <span className="pull-right mr">{stationSchedule.name} to {item.trainHeadStation}</span></span>
                    {item.origTime} to {item.destTime}  <span className="pull-right mr">Duration: {getDuration(date + " " + item.origTime, date + " " + item.destTime)}</span>
                </li>
            )
        })

        return (
            <section>
                <p className="text-center">Scroll down to see more station times.</p>
                <div className="overflow">
                    <ul className="geosuggest__suggests">
                        {itemList}
                    </ul>
                </div>
            </section>
            )
    }

})

export default StationsScheduleList
