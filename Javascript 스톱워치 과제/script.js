let timer;
let isRunning = false;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStop');
const resetBtn = document.getElementById('reset');
const recordBtn = document.getElementById('record');
const startTimerBtn = document.getElementById('startTimer');
const selectAllBtn = document.getElementById('selectAll');
const deleteSelectedBtn = document.getElementById('deleteSelected');
const deleteAllBtn = document.getElementById('deleteAll');
const recordList = document.getElementById('recordList');
const timerInput = document.getElementById('timerInput');

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        startStopBtn.textContent = '시작';
    } else {
        timer = setInterval(updateDisplay, 10); // 10ms마다 업데이트
        startStopBtn.textContent = '정지';
    }
    isRunning = !isRunning;
}

function updateDisplay() {
    milliseconds += 10;
    if (milliseconds === 1000) {
        milliseconds = 0;
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
        }
    }
    display.textContent = formatTime(hours, minutes, seconds, milliseconds);
}

function formatTime(h, m, s, ms) {
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${(ms / 10).toString().padStart(2, '0')}`;
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    milliseconds = seconds = minutes = hours = 0;
    display.textContent = '00:00:00.00';
    startStopBtn.textContent = '시작';
}

function addRecord() {
    const li = document.createElement('li');
    li.innerHTML = `
    <input type="checkbox">
    <span>${display.textContent}</span>
    `;
    recordList.appendChild(li);
}

function selectAll() {
    const checkboxes = recordList.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.checked = true);
}

function deleteSelected() {
    const selectedItems = recordList.querySelectorAll('input[type="checkbox"]:checked');
    selectedItems.forEach(item => item.parentElement.remove());
}

function deleteAll() {
    recordList.innerHTML = '';
}

function startTimer() {
    const duration = parseInt(timerInput.value);
    if (isNaN(duration) || duration <= 0) {
        alert('올바른 시간을 입력하세요.');
        return;
    }
    reset();
    milliseconds = 0;
    seconds = duration;
    updateDisplay();
    timer = setInterval(() => {
        if (seconds > 0 || milliseconds > 0) {
            if (milliseconds === 0) {
                seconds--;
                milliseconds = 990;
            } else {
                milliseconds -= 10;
            }
            updateDisplay();
        } else {
            clearInterval(timer);
            alert('타이머가 종료되었습니다!');
            isRunning = false;
            startStopBtn.textContent = '시작';
        }
    }, 10);
    isRunning = true;
    startStopBtn.textContent = '정지';
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
recordBtn.addEventListener('click', addRecord);
selectAllBtn.addEventListener('click', selectAll);
deleteSelectedBtn.addEventListener('click', deleteSelected);
deleteAllBtn.addEventListener('click', deleteAll);
startTimerBtn.addEventListener('click', startTimer);