function handleChange(event) {
    var index = event.nativeEvent.target.selectedIndex;
    console.log(event.target.data-ref)
    var updatedState = this.state
    var name = event.target.name
    var cb = this.props.callback

    updatedState[name].value = event.target.value

    if (updatedState[name].validate && updatedState[name].value !== '') {
        updatedState = this.validate(updatedState[name], updatedState[name].validate, updatedState[name].type)
    }

    this.setState(updatedState)

    if (cb) {cb(event)}

}

export default handleChange
