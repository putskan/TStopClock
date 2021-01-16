let mode: "Stopwatch"|"Clock" = "Stopwatch";
// 10^-2 seconds
let swCentisecondsSum: number = 0;
// returned by setInterval
let stopwatchInterval: number|null = null
let clockInterval: number|null = null

function startStopwatch(): void {
	if (!stopwatchInterval) {
		stopwatchInterval = setInterval(function swInter() {
			swCentisecondsSum += 1;
			displayStopwatchTime(swCentisecondsSum);
			return swInter;
		}(), 10);
	}
}


function stopStopwatch(): void {
	if (stopwatchInterval) {
		clearInterval(stopwatchInterval);
		stopwatchInterval = null;
	}
}


function clearStopwatch(): void {
	stopStopwatch();
	swCentisecondsSum = 0;
	displayStopwatchTime(0);
}


function displayStopwatchTime(totalCentiseconds: number) {
	/* Add visualization */
	let hours = Math.floor(totalCentiseconds / 100 / 3600) % 24;
	let minutes = Math.floor(totalCentiseconds / 100 / 60) % 60;
	let seconds = Math.floor(totalCentiseconds / 100) % 60;
	let centis = totalCentiseconds % 100;
	displayTime(hours, minutes, seconds, centis);
}


function displayTime(hours: number, minutes: number, seconds: number, centiseconds: number = -1): void {
	let secondsAsStr = addZeroPadding((seconds).toString());
	let minutesAsStr = addZeroPadding((minutes).toString());
	let hoursAsStr = addZeroPadding((hours).toString());
	document.getElementById("seconds")!.innerHTML = secondsAsStr;
	document.getElementById("minutes")!.innerHTML = minutesAsStr;
	document.getElementById("hours")!.innerHTML = hoursAsStr;

	if (centiseconds !== -1) {
		let centisAsStr = addZeroPadding((centiseconds).toString());
		document.getElementById("centiseconds")!.innerHTML = centisAsStr;
	}
}


function addZeroPadding(numAsStr: string) {
	/* pad with a zero as the first number if needed */
	if (numAsStr.length === 1) {
		return "0".concat(numAsStr);
	}
	return numAsStr
}

function startClock(): void {
	clockInterval = setInterval(function clockInter() {	
		let currentDate = new Date()
		displayTime(currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds());
		return clockInter
	}(), 1000)
}


function clearClock(): void {
	clearInterval(clockInterval!);
	clockInterval = null;
	displayTime(0, 0, 0);
}


function changeMode(): void {
	let centiColonElem = document.getElementById("centi-colon")!
	let centisecondsElem = document.getElementById("centiseconds")!
	if (mode === "Stopwatch") {
		mode = "Clock";
		startButton.disabled = true;
		stopButton.disabled = true;
		clearButton.disabled = true;
		centiColonElem.classList.add("hide");
		centisecondsElem.classList.add("hide");
		clearStopwatch();
		startClock();
	}
	else {
		mode = "Stopwatch";
		startButton.disabled = false;
		stopButton.disabled = false;
		clearButton.disabled = false;
		centiColonElem.classList.remove("hide");
		centisecondsElem.classList.remove("hide");
		clearClock();
	}
	document.getElementById("title")!.innerHTML = mode;
}


let startButton = document.querySelector("#start") as HTMLButtonElement;
let stopButton = document.querySelector("#stop") as HTMLButtonElement;
let clearButton = document.querySelector("#restart") as HTMLButtonElement;
startButton.onclick = startStopwatch;
stopButton.onclick = stopStopwatch;
clearButton.onclick = clearStopwatch;


let changeModeBanner = document.querySelector("#change-mode-banner") as HTMLDivElement;
changeModeBanner.onmousedown = changeMode;
