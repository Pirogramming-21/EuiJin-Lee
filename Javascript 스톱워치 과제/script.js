let isRunning = false;
let seconds =0;
let minutes =0;
let hours =0;


const display =document.getElementById('display');
const startStopBtn =document.getElementById('startStop');
const resetBtn =document.getElementById('reset');
const recordBtn =document.getElementById('record');
const startTimerBtn =document.getElementById('startTimer');
const selectAllBtn =document.getElementById('selectAll');
const deleteSelectedBtn =document.getElementById('deleteSelected');
const deleteAllBtn =document.getElementById('deleteAll');
const recordList =document.getElementById('recordList');
const timerInput =document.getElementById('timerInput');

function startStop(){
    if(isRunning){
        clearInterval(timer);
        startStopBtn.textContent = '시작';
    }
    else {
        timer = setInterval(updateDisplay, 1000);
        startStopBtn.textContent = '정지';
    }
    isRunning = !isRunning;
}

function updateDisplay(){
    seconds++;
    if(seconds == 60){
        seconds = 0;
        minutes++;
        if(minutes === 60){
            minutes = 0;
            hours++;
        }
    }
    display.textContent = formatTime(hours, minutes, seconds);
}

function formatTime(h, m, s) {
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}



startStopBtn.addEventListener('click', startStop);