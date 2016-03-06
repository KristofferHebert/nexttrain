import React from 'react'
import makeRequest from '../util/makeRequest.jsx'
import If from '../util/if.jsx'
import config from '../config.jsx'

//http://api.bart.gov/api/sched.aspx?cmd=special&key=MW9S-E7SL-26DU-VV8V&l=1

const AdvisorBar = React.createClass({
    getInitialState(){
        return {
            schedules: [{
                text: 'test',
                start_date: false
            }]
        }
    },
    componentDidMount(){

        let self = this
        const url = config.base + '/api/sched.aspx?cmd=special&key=' + config.key

        makeRequest(url)
            .then((response) => {

                const schedules = response.data.special_schedules.special_schedule
                self.setState({ schedules: schedules })

            })
            .catch((err) => {

                console.log(err)
            })
    },
    render(){

        const schedules = this.state.schedules.map((schedule) => {
            return (
                <p>
                    {schedule.text}
                </p>
            )
        })

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
