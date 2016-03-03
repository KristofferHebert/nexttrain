import React from 'react'
import makeRequest from './util/makeRequest.jsx'
import If from './util/if.jsx'
import config from '../config.jsx'

//http://api.bart.gov/api/sched.aspx?cmd=special&key=MW9S-E7SL-26DU-VV8V&l=1

const AdvisorBar = React.createClass({
    getInitialState(){
            messages: false
    },
    componentDidMount(){
        makeRequest('http://api.bart.gov/api/sched.aspx?cmd=special&key=' + config.key)
            .then()
            .catch()
    },
    render(){
        return (
            <If show={this.state.messages}>
                <section>
                    {}
                </section>
            </If>
        )
    }
})

export default AdvisorBar
