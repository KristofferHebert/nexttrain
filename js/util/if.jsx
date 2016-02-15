import React from 'react'

const If = React.createClass({
    getDefaultProps(){
        return {
            show: false
        }
    },
    render(){
        return (
            <section>
                {this.props.show ? this.props.children : null}
            </section>
        )
    }
})

export default If
