import React from 'react'
import If from '../util/if.jsx'
import decodeEntity from '../util/decodeentity.jsx'

const AdvisorBar = React.createClass({
    getDefaultProps(){
        return {
                message: 'Nothing to report'
            }
    },
    render(){

        const message  = "MESSAGE: " + this.props.message
        const messageClass = (this.props.message !== 'Nothing to report') ? 'alert alert-warning' : 'alert alert-info'

        return (
            <section className={messageClass}>
                <p dangerouslySetInnerHTML={{__html: decodeEntity(message)}} />
            </section>
        )
    }
})

export default AdvisorBar
