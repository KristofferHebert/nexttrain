import React from 'react'
import 'offline-js'



const isOnline = React.createClass({
    componentDidMount(){

    },
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
        return {(this.state.isOnline) ? this.props.online : this.props.offline}
    }
})

export default isOnline
