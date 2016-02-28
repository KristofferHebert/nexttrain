import React from 'react'

const Datalist = React.createClass({
        getDefaultProps(){
            return {
                name: '',
                options: [{
                    value: '',
                    label: ''
                }],
                value: ''
            }
        },
        render(){

            const options = this.props.options.map((option, i)=>{
                return (
                    <option key={i} ref={option.value}>{option.label}</option>
                )
            })
            return (
                <datalist id={this.props.id} value={this.props.value}>
                    {options}
                </datalist>
        )
    }
})

export default Datalist
