

exports.addDateConstants = (req, res, next) => {

    const months_abbr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days_abbr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday", "Sunday"];

    const date =  new Date(Date.now());
    req.date = {
        day: days[date.getDay()],
        date: date.getDate(),
        year: date.getFullYear(),
        month: date.getMonth(),
        month_abbr: months_abbr[date.getMonth()],
        month_name: months[date.getMonth()],
        hours: date.getHours(),
        hours_12: date.getHours() % 12,
        minutes: date.getMinutes(),
        period: date.getHours() < 12 ? "AM" : "PM"
    }
    next()
}