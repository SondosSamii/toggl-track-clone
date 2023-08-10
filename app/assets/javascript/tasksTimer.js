document.addEventListener("DOMContentLoaded", function () {
  const timerContainers = document.getElementsByClassName("timer");
  const runningTimers = [];
  addClickEventOnTimers(timerContainers, runningTimers);

  async function addClickEventOnTimers(allTimers, runningTimers) {
    for (let i = 0; i < allTimers.length; i++) {
      const thisTimer = allTimers[i];
      const toggleBtn = thisTimer.querySelector("#toggle_timer");
      const minutesLabel = thisTimer.querySelector(".minutes");
      const secondsLabel = thisTimer.querySelector(".seconds");

      let totalSeconds = parseInt(thisTimer.dataset.timeElapsed);
      let timerInterval = null;

      if (totalSeconds > 0) {
        changeToggleBtn(toggleBtn, "Continue");
      }

      runningTimers.push(timerInterval);

      toggleBtn.addEventListener("click", () => {
        pauseOtherTimers(i);

        if (!timerInterval || thisTimer.dataset.timerState === "paused") {
          thisTimer.dataset.timerState = "running";
          changeToggleBtn(toggleBtn, "Pause");
          timerInterval = setInterval(() => {
            totalSeconds++;
            minutesLabel.textContent = pad(parseInt(totalSeconds / 60));
            secondsLabel.textContent = pad(totalSeconds % 60);
          }, 1000);
          runningTimers[i] = timerInterval;
        } else {
          pauseTimer(thisTimer, timerInterval, totalSeconds);
          changeToggleBtn(toggleBtn, "Continue");
        }
      });
    }
  }

  function pauseOtherTimers(currentIndex) {
    for (let i = 0; i < runningTimers.length; i++) {
      if (i !== currentIndex && runningTimers[i]) {
        pauseTimer(
          timerContainers[i],
          runningTimers[i],
          getCurrentTime(timerContainers[i])
        );
        changeToggleBtn(
          timerContainers[i].querySelector("#toggle_timer"),
          "Continue"
        );
      }
    }
  }

  function pauseTimer(timer, interval, totalSeconds) {
    clearInterval(interval);
    interval = null;
    timer.dataset.timerState = "paused";
    updateTotalTimeElapsed(timer.id, totalSeconds);
  }

  function getCurrentTime(timer) {
    const minutesLabel = timer.querySelector(".minutes");
    const secondsLabel = timer.querySelector(".seconds");
    return (
      parseInt(minutesLabel.textContent) * 60 +
      parseInt(secondsLabel.textContent)
    );
  }

  function changeToggleBtn(btn, btnStatus) {
    btn.textContent = `${btnStatus} Timer`;
  }

  function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }

  async function updateTotalTimeElapsed(taskId, timeElapsed) {
    try {
      const ThisTask = document.getElementById(taskId);
      const projectId = ThisTask.dataset.projectId;
      const fetchPath = `/projects/${projectId}/tasks/${taskId}/update_elapsed_time`;
      const response = await fetch(fetchPath, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": Rails.csrfToken(),
        },
        body: JSON.stringify({ total_time_elapsed: timeElapsed }),
      });

      if (response.ok) {
        const responseData = await response.json();
        const updatedTotalTimeElapsed = responseData.total_time_elapsed;

        if (ThisTask) {
          ThisTask.dataset.timeElapsed = updatedTotalTimeElapsed;
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
});
