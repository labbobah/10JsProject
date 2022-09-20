const events = "02/12/2022";
const getDay = document.getElementById('day');
const getHour = document.getElementById('hour');
const getMinute = document.getElementById('minute');
const getSeconde = document.getElementById('seconde');

function countdown() {
    const newYearDate = new Date(events);
    const currentDate = new Date();

    const totalSeconds = Math.floor(currentDate - newYearDate ) /1000;

    const hours = Math.floor(totalSeconds/3600)%24;
    const days = Math.floor(totalSeconds/3600/24);
    const minutes = Math.floor(totalSeconds/60)%60;
    const seconds = Math.floor(totalSeconds)%60
    //const month = Math.floor(totalSeconds/3600)%12;

    getDay.innerHTML = days;
    getHour.innerHTML = hours;
    getMinute.innerHTML = minutes;
    getSeconde.innerHTML = seconds;
}

countdown();
setInterval(countdown, 1000);
