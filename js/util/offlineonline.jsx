import React from 'react'
import 'offline-js'

const  OfflineOnline = React.createClass({
    componentDidMount(){
        this.timer = setInterval(this.checkIfOnline, 3000)
    },
    componentWillUnmount(){
        clearInterval(this.timer)
    },
    checkIfOnline(){

        // find a better solution, not 100% supported
        var isOnline  = navigator.onLine
        this.setState({ isOnline: isOnline })
    },
    getInitialState(){
        return {
            isOnline: true
        }
    },
    getDefaultProps(){
        return {
            online: false,
            offline: false
        }
    },
    render(){

        const view = (this.state.isOnline) ? this.props.online : this.props.offline
        return (
            <div>{view}</div>
        )
    }
})

export default OfflineOnline
