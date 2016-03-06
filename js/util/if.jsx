import React from 'react'

const If = React.createClass({
    getDefaultProps(){
        return {
            show: false
        }
    },
    render(){
        return (
            <span>
                {this.props.show ? this.props.children : null}
            </span>
        )
    }
})

export default If
