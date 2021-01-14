"use strict";
// 10^-2 seconds
var centisecondsSum = 0;
// returned by setInterval
var counter = null;
function startStopwatch() {
    if (!counter) {
        counter = setInterval(function () {
            centisecondsSum += 10;
            displayStopwatchTime(centisecondsSum);
        }, 100);
    }
}
function stopStopwatch() {
    if (counter) {
        clearInterval(counter);
        counter = null;
    }
}
function clearStopwatch() {
    stopStopwatch();
    centisecondsSum = 0;
    displayStopwatchTime(0);
}
function displayStopwatchTime(totalCentiseconds) {
    /* Add visualization */
    var centis = addZeroPadding((totalCentiseconds % 100).toString());
    var seconds = addZeroPadding((Math.floor(totalCentiseconds / 100) % 60).toString());
    var minutes = addZeroPadding((Math.floor(totalCentiseconds / 100 / 60) % 60).toString());
    var hours = addZeroPadding((Math.floor(totalCentiseconds / 100 / 3600) % 24).toString());
    document.getElementById("centiseconds").innerHTML = centis;
    document.getElementById("seconds").innerHTML = seconds;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("hours").innerHTML = hours;
}
function addZeroPadding(numAsStr) {
    /* pad with a zero as the first number if needed */
    if (numAsStr.length === 1) {
        return "0".concat(numAsStr);
    }
    return numAsStr;
}
var startButton = document.querySelector("#start");
var stopButton = document.querySelector("#stop");
var clearButton = document.querySelector("#restart");
startButton.onclick = startStopwatch;
stopButton.onclick = stopStopwatch;
clearButton.onclick = clearStopwatch;
