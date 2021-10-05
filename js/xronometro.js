"use strict";

let intervalId = null;
let startTimestamp;
let timerOffset = 0;

const timer = document.getElementById("timer");
const hours = document.getElementById("hours");
const minutes = document.getElementById("min");
const seconds = document.getElementById("sec");
const millis = document.getElementById("milisec");

const start = document.getElementById("start");
const pause = document.getElementById("pause");
const reset = document.getElementById("reset");

const onStart = function () {
  if (!isTimerRunning()) {
    hideButton(start);
    showButton(pause);
    startTimestamp = Date.now();
    intervalId = setInterval(function () {
      let msecPassed = Date.now() - startTimestamp;
      updateTimer(msecPassed + timerOffset);
    }, 20);
  }
};

const onPause = function () {
  showButton(start);
  hideButton(pause);
  timerOffset += Date.now() - startTimestamp;
  clearInterval(intervalId);
  intervalId = null;
};

const onReset = function () {
  showButton(start);
  hideButton(pause);
  clearInterval(intervalId);
  updateTimer(0);
  timerOffset = 0;
  intervalId = null;
};

const onKeyDown = function (e) {
  if (e.code === "Space") {
    if (isTimerRunning()) onPause();
    else onStart();
  }
};

const isTimerRunning = function () {
  return intervalId !== null;
};

const updateTimer = function (msecs) {
  const secsInMsec = Math.floor(msecs / 1000);
  const minsInSecs = Math.floor(secsInMsec / 60);
  const hoursInMins = Math.floor(minsInSecs / 60);

  let millisHtml = Math.round((msecs - secsInMsec * 1000) / 10);
  if (millisHtml < 10) {
    millisHtml = "0" + millisHtml;
  }
  millis.innerHTML = millisHtml;

  let secsHtml = secsInMsec - minsInSecs * 60;
  if (secsHtml < 10) {
    secsHtml = "0" + secsHtml;
  }
  seconds.innerHTML = secsHtml;

  let minsHtml = minsInSecs - hoursInMins * 60;
  if (minsHtml < 10) {
    minsHtml = "0" + minsHtml;
  }
  minutes.innerHTML = minsHtml;

  let hoursHtml = hoursInMins;
  if (hoursHtml < 10) {
    hoursHtml = "0" + hoursHtml;
  }
  hours.innerHTML = hoursHtml;
};
const hideButton = function (el) {
  el.style.display = "none";
};

const showButton = function (el) {
  el.style.display = "inline";
};

start.addEventListener("click", onStart);
pause.addEventListener("click", onPause);
reset.addEventListener("click", onReset);
document.addEventListener("keydown", onKeyDown);
