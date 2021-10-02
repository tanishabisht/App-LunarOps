const datetimeFormat = (d) => {
    var yyyy = d.getUTCFullYear()
    var mm = d.getUTCMonth()+1
    var dd = d.getUTCDate()
    var hh = d.getUTCHours()
    var min = d.getUTCMinutes()
    var ss = d.getUTCSeconds()

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    if (hh < 10) hh = '0' + hh;
    if (min < 10) min = '0' + min;
    if (ss < 10) ss = '0' + ss;
    return dd+'-'+mm+'-'+yyyy + '_' + hh+':'+min+':'+ss
}

export default datetimeFormat