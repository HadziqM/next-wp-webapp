const day = ["Minggu","Senin","Selasa","Rabu","Kamis","Jum'at","Sabtu"]
const month = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"]
function twoDigit(num:number){
    if (num<10) return `0${num}`
    return num
}

export function dateConversion(date:Date){
    return `${day[date.getDay()]}, ${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}, ${twoDigit(date.getHours())}:${twoDigit(date.getMinutes())} WIB`
}