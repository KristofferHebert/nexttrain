function getDuration(start, end) {

    if(!start, !end)
        return -1

    const startDate = new Date(start).getTime()
    const endDate = new Date(end).getTime()
    const ms = endDate - startDate

    const hours = Math.abs(Math.floor(ms / 3600000))
    const minutes = Math.abs(Math.floor((ms % 3600000) / 60000))

    let duration = hours > 0 ? hours + "hr " + minutes : ""
    duration+= minutes + ' mins'
    return duration
}

export default getDuration
