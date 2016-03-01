import React from 'react'

const DropDown = React.createClass({
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
                    <option key={i} value={option.value}>{option.label}</option>
                )
            })
            return (
                <select id={this.props.id} value={this.props.value}>
                    {options}
                </select>
        )
    }
})

export default DropDown
