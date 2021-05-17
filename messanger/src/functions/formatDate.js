const getDate = () => {
    const today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const yyyy = String(today.getFullYear())
    let hour = String(today.getHours())
    let minute = String(today.getMinutes())

    if (hour.length === 1){
        hour = "0" + hour
    }

    if (minute.length === 1){
        minute = "0" + minute
    }

    return {
        date: yyyy + '-' + mm + "-" + dd,
        time: hour + ":" + minute + ":00"
    }
}

export default getDate