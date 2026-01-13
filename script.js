let workDuration = 25 * 60; // seconds
let breakDuration = 5 * 60; // seconds
let timer = workDuration;
let timerInterval = null;
let onBreak = false;

const timerDisplay = document.getElementById("timer");
const alarm = document.getElementById("alarmSound");

function updateDisplay() {
    const minutes = Math.floor(timer / 60).toString().padStart(2, '0');
    const seconds = (timer % 60).toString().padStart(2, '0');
    timerDisplay.textContent = `${minutes}:${seconds}`;
}

function startTimer() {
    if (timerInterval) return; // already running
    timerInterval = setInterval(() => {
        timer--;
        updateDisplay();
        if (timer < 0) {
            alarm.play();
            clearInterval(timerInterval);
            timerInterval = null;
            onBreak = !onBreak;
            timer = onBreak ? breakDuration : workDuration;
            alert(onBreak ? "Break time! ⏳" : "Back to work! 💪");
            startTimer(); // automatically start next session
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timer = onBreak ? breakDuration : workDuration;
    updateDisplay();
}

function updateSettings() {
    const workMins = parseInt(document.getElementById("workMinutes").value);
    const breakMins = parseInt(document.getElementById("breakMinutes").value);

    if (isNaN(workMins) || isNaN(breakMins) || workMins <= 0 || breakMins <= 0) {
        return alert("Enter valid numbers!");
    }

    workDuration = workMins * 60;
    breakDuration = breakMins * 60;
    timer = onBreak ? breakDuration : workDuration;
    updateDisplay();
}

updateDisplay();
