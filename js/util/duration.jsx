function getDuration(start, end) {

    if(!start, !end)
        return -1

    const startDate = new Date(start).getTime()
    const endDate = new Date(end).getTime()
    const ms = endDate - startDate

    console.log(startDate, endDate, ms)

    const hours = Math.floor(ms / 3600000)
    const minutes = Math.floor((ms % 3600000) / 60000)

    let duration = hours > 0 ? "hr " + minutes : ""
    duration+= minutes + ' mins'
    return duration
}

export default getDuration
