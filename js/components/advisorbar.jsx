import React from 'react'
import makeRequest from './util/makeRequest.jsx'
import If from './util/if.jsx'
import config from '../config.jsx'

//http://api.bart.gov/api/sched.aspx?cmd=special&key=MW9S-E7SL-26DU-VV8V&l=1

const AdvisorBar = React.createClass({
    getInitialState(){
            schedules: false
    },
    componentDidMount(){

        let self = this

        makeRequest('http://api.bart.gov/api/sched.aspx?cmd=special&key=' + config.key)
            .then(function(response){
                if(response.status !== 200){

                }

                const schedules = response.data.special_schedules.special_schedule
                self.setState(schedules)

            })
            .catch(function(err){
                throw new Error('AdvisorBar issue:', err)
            })
    },
    render(){

        if(this.state.schedules){
            const schedules = this.state.schedules.map((schedule) => {
                return (
                    <section>
                        {schedule.text}
                    </section>
                )
            })
        }

        return (
            <If show={this.state.schedules}>
                <section className={this.props.className}>
                    {schedules}
                </section>
            </If>
        )
    }
})

export default AdvisorBar
