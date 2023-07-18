console.log("Main Script works!");

let totalSeconds = 0;
let timerInterval = null;

const all_timers = document.getElementsByClassName('toggle-timer');

for (const timer of all_timers) {
  timer.addEventListener('click', () => {
    console.log('Inside Event!');
    console.log(timer)
    startTimer(timer);
  })
}

function startTimer(thisElem) {
  if(thisElem && thisElem.dataset) {
    const timerState = thisElem.dataset.timerState;
    if (timerState === "running") {
      pauseTimer(thisElem);
    } else if (timerState === "not_started") {
      totalSeconds = 0;
      startInterval(thisElem);
    } else {
      startInterval(thisElem);
    }
  }
}

function startInterval(thisElem) {
  if (thisElem && thisElem.dataset) {
    pauseTimer();
    thisElem.dataset.timerState = "running";
    timerInterval = setInterval(() => {
      setTime(
        thisElem.getElementsByClassName("minutes")[0],
        thisElem.getElementsByClassName("seconds")[0]
      );
    }, 1000);
  }
}

function pauseTimer(thisElem) {
  if (thisElem && thisElem.dataset) {
    clearInterval(timerInterval);
    thisElem.dataset.timerState = "paused";
    timerInterval = null;
  }
}

function setTime(minutes, seconds) {
  ++totalSeconds;
  seconds.innerHTML = pad(totalSeconds % 60);
  minutes.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}
