const startTimer = document.getElementById('play');
const stopTimer = document.getElementById('stop');
const resetTimer = document.getElementById('reset');
const laps = document.getElementById('laps');
const hour = document.getElementById('hour');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const milliseconds = document.getElementById('milliseconds');
const lapList = document.getElementById('lapList');

//global variables 
let ms = 0;
let sec = 0;
let min = 0;
let hr = 0;
let time;
let isRunning = false;

//formatting variables
let formattedms, formattedmin, formattedsec, formattedhr;

//format timer
function formatTimer(){
    formattedms = ms<10?`0`+ms : ms;
    formattedsec = sec<10?`0`+sec : sec;
    formattedmin = min<10?`0`+min : sec;
    formattedhr = hr<10?`0`+hr : hr;
}

//output formatter
function renderTimer(){
    formatTimer();
    //render to the page
    hour.innerText = formattedhr;
    minutes.innerText = formattedmin;
    seconds.innerText = formattedsec;
    milliseconds.innerText = formattedms;
}

//timer function
function timer(){
    ms++;
    if(ms >= 100){
        ms = 0;
        sec ++;
    }
    if(sec/60 === 1){
        sec = 0;
        min ++;
    }
    if(min/60 === 1){
        min = 0;
        hr ++;
    }
    //refresh the time after 24 hrs
    if(hr/24 === 1){
        ms = 0;
        sec = 0;
        min = 0;
        hr = 0;
    }
    //output time & formatting handler
    renderTimer();
}

//start timer handler function
function startTimerHandler(){
    //set a interval for the timer
    if(isRunning){
        throw new Error('Timer is already running :|');
    }
    isRunning = true;
    time = setInterval(timer, 10);
}

//stop the watch handler
function stopTimerHandler(){
    //clear the interval to freeze the time
    if(!isRunning){
        throw new Error('Timer has already stopped :|');
    }
    isRunning = false;
    clearInterval(time);
}

//reset timer handler
function resetTimerHandler(){
    ms= 0;
    sec = 0;
    min = 0;
    hr = 0;
    //clear the interval
    clearInterval(time);
    renderTimer();
    //clear the laps as well
    lapList.innerHTML = '';
}

//laps handler function
function lapsHandler(){
    formatTimer();
    let currentLap = `<li class="lapItem">
                        <p>${formattedhr} : ${formattedmin} : ${formattedsec} : ${formattedms}</p>
                    </li>`;
    lapList.innerHTML += currentLap;
}

//adding event listeners
startTimer.addEventListener('click', startTimerHandler);//also change the button icon to pause
stopTimer.addEventListener('click', stopTimerHandler);
resetTimer.addEventListener('click', resetTimerHandler);
laps.addEventListener('click', lapsHandler);
