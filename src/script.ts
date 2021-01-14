let mode: "stopwatch"|"clock" = "stopwatch"
// 10^-2 seconds
let centisecondsSum: number = 0;
// returned by setInterval
let counter: number|null = null

function startStopwatch(): void {
	if (!counter) {
		counter = setInterval(() => {
			centisecondsSum += 1;
			displayStopwatchTime(centisecondsSum)
		}, 10);
	}
}


function stopStopwatch(): void {
	if (counter) {
		clearInterval(counter);
		counter = null;
	}
}


function clearStopwatch(): void {
	stopStopwatch();
	centisecondsSum = 0;
	displayStopwatchTime(0);
}


function displayStopwatchTime(totalCentiseconds: number) {
	/* Add visualization */
	let centis = addZeroPadding((totalCentiseconds % 100).toString());
	let seconds = addZeroPadding((Math.floor(totalCentiseconds / 100) % 60).toString());
	let minutes = addZeroPadding((Math.floor(totalCentiseconds / 100 / 60) % 60).toString());
	let hours = addZeroPadding((Math.floor(totalCentiseconds / 100 / 3600) % 24).toString());
	document.getElementById("centiseconds")!.innerHTML = centis;
	document.getElementById("seconds")!.innerHTML = seconds;
	document.getElementById("minutes")!.innerHTML = minutes;
	document.getElementById("hours")!.innerHTML = hours;
}


function addZeroPadding(numAsStr: string) {
	/* pad with a zero as the first number if needed */
	if (numAsStr.length === 1) {
		return "0".concat(numAsStr);
	}
	return numAsStr
}


function changeMode(): void {
	clearStopwatch()
}


let startButton = document.querySelector("#start") as HTMLButtonElement;
let stopButton = document.querySelector("#stop") as HTMLButtonElement;
let clearButton = document.querySelector("#restart") as HTMLButtonElement;
startButton.onclick = startStopwatch;
stopButton.onclick = stopStopwatch;
clearButton.onclick = clearStopwatch;


let changeModeBanner = document.querySelector("#change-mode-banner") as HTMLDivElement;
changeModeBanner.onmousedown = changeMode