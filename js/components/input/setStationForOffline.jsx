function setStationForOffline(event){

    var updatedState = this.state
    var name = event.target.name

    updatedState[name].value = event.target.value
    updatedState[name].dirty = true

    const option = event.target.value

    this.state.options.find((opt) => {
        if(opt.label == option)
        updatedState[name].station = opt.value
    })

    this.setState(updatedState)

    if(this.getStationsSchedule)
        this.getStationsSchedule()

}

export default setStationForOffline
