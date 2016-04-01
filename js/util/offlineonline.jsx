import React from 'react'
import 'offline-js'

const  OfflineOnline = React.createClass({
    componentWillMount(){
        this.checkIfOnline()
    },
    checkIfOnline(){
        this.setState({ isOnline: Offline.check() })
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
