"use strict";
var mode = "Stopwatch";
// 10^-2 seconds
var swCentisecondsSum = 0;
// returned by setInterval
var stopwatchInterval = null;
var clockInterval = null;
function startStopwatch() {
    if (!stopwatchInterval) {
        stopwatchInterval = setInterval(function swInter() {
            swCentisecondsSum += 1;
            displayStopwatchTime(swCentisecondsSum);
            return swInter;
        }(), 10);
    }
}
function stopStopwatch() {
    if (stopwatchInterval) {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
    }
}
function clearStopwatch() {
    stopStopwatch();
    swCentisecondsSum = 0;
    displayStopwatchTime(0);
}
function displayStopwatchTime(totalCentiseconds) {
    /* Add visualization */
    var hours = Math.floor(totalCentiseconds / 100 / 3600) % 24;
    var minutes = Math.floor(totalCentiseconds / 100 / 60) % 60;
    var seconds = Math.floor(totalCentiseconds / 100) % 60;
    var centis = totalCentiseconds % 100;
    displayTime(hours, minutes, seconds, centis);
}
function displayTime(hours, minutes, seconds, centiseconds) {
    if (centiseconds === void 0) { centiseconds = -1; }
    var secondsAsStr = addZeroPadding((seconds).toString());
    var minutesAsStr = addZeroPadding((minutes).toString());
    var hoursAsStr = addZeroPadding((hours).toString());
    document.getElementById("seconds").innerHTML = secondsAsStr;
    document.getElementById("minutes").innerHTML = minutesAsStr;
    document.getElementById("hours").innerHTML = hoursAsStr;
    if (centiseconds !== -1) {
        var centisAsStr = addZeroPadding((centiseconds).toString());
        document.getElementById("centiseconds").innerHTML = centisAsStr;
    }
}
function addZeroPadding(numAsStr) {
    /* pad with a zero as the first number if needed */
    if (numAsStr.length === 1) {
        return "0".concat(numAsStr);
    }
    return numAsStr;
}
function startClock() {
    clockInterval = setInterval(function clockInter() {
        var currentDate = new Date();
        displayTime(currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds());
        return clockInter;
    }(), 1000);
}
function clearClock() {
    clearInterval(clockInterval);
    clockInterval = null;
    displayTime(0, 0, 0);
}
function changeMode() {
    if (mode === "Stopwatch") {
        mode = "Clock";
        startButton.disabled = true;
        stopButton.disabled = true;
        clearButton.disabled = true;
        document.getElementById("centi-colon").classList.add("hide");
        document.getElementById("centiseconds").classList.add("hide");
        clearStopwatch();
        startClock();
    }
    else {
        mode = "Stopwatch";
        startButton.disabled = false;
        stopButton.disabled = false;
        clearButton.disabled = false;
        document.getElementById("centi-colon").classList.remove("hide");
        document.getElementById("centiseconds").classList.remove("hide");
        clearClock();
    }
    document.getElementById("title").innerHTML = mode;
}
var startButton = document.querySelector("#start");
var stopButton = document.querySelector("#stop");
var clearButton = document.querySelector("#restart");
startButton.onclick = startStopwatch;
stopButton.onclick = stopStopwatch;
clearButton.onclick = clearStopwatch;
var changeModeBanner = document.querySelector("#change-mode-banner");
changeModeBanner.onmousedown = changeMode;
/* REMOVE THE TEXT SELECTION */
/* combine get elelment by id in changeMode */
/* Add fonts locally */ 
