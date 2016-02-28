function handleChange(event) {
    var updatedState = this.state
    var name = event.target.name

    updatedState[name].value = event.target.value
    this.setState(updatedState)

}

export default handleChange
