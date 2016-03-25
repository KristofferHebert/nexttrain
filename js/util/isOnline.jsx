import React from 'react'

const isOnline = React.createClass({
    getInitialState(){
        return {
            isOnline: true
        }
    },
    getDefaultProps(){
        online: false,
        offline: false
    },
    render(){

        const section = (this.state.isOnline) ? this.props.online : this.props.offline

        return {section}
    }
})

export default isOnline
