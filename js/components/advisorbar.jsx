import React from 'react'
import If from '../util/if.jsx'

//http://api.bart.gov/api/sched.aspx?cmd=special&key=MW9S-E7SL-26DU-VV8V&l=1

const AdvisorBar = React.createClass({
    getInitialState(){
        return {
                message: false
            }
    },
    render(){
        return (
            <If show={this.state.message}>
                <section className={this.props.className}>
                    {this.state.message}
                </section>
            </If>
        )
    }
})

export default AdvisorBar
