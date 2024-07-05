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

function reset(){
    clearInterval(timer);
    isRunning = false;
    second = minutes = hours = 0;
    display.textContent = '00:00:00';
    startStopBtn.textContent = '시작';
}

function addRecord(){
    const li = document.createElement('li');
    li.innerHTML = `
    <input type = "checkbox">
    <span>${display.textContent}</span>
    `;
    recordList.appendChild(li);
}

function selectAll(){
    const checkboxes = recordList.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.checked = true);
}

function deleteSelected(){
    const selectedItems = recordList.querySelectorAll('input[type="checkbox"]:checked');
    selectedItems.forEach(item =>item.parentElement.remove());
}

function deleteAll(){
    recordList.innerHTML = '';
}



startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
recordBtn.addEventListener('click', addRecord);
selectAllBtn.addEventListener('click',selectAll);
deleteSelectedBtn.addEventListener('click',deleteSelected);
deleteAllBtn.addEventListener('click',deleteAll);