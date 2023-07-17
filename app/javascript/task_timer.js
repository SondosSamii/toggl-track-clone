console.log("Timer Linked Successfully!");
let totalSeconds = 0;
let timerInterval = null;

function startTimer(thisElem) {
  pauseTimer();
  timerInterval = setInterval(()=>{
    setTime(thisElem.getElementsByClassName("minutes")[0],
      thisElem.getElementsByClassName("seconds")[0]);
  }, 1000)
}

function pauseTimer() {
  if(timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    totalSeconds = 0;
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
