// modifiable global variables
let myNickname = "wigglyBob";
let nFramesInLoop = 120;
let bEnableExport = true;
//don't touch these globals
let nElapsedFrames;
let bRecording;
let theCanvas;
//==========================================
function setup() {
	createCanvas(400, 400);
	bRecording = false;
	nElapsedFrames = 0;
}

//=========================================
function keyTyped() {
	if (bEnableExport) {
		if ((key === "f") || (key === "F")) {
			bRecording = true;
			nElapsedFrames = 0;

		}
	}
}

//=========================================
function draw() {
	let percentCompleteFraction = 0;
	if (bRecording) {
		percentCompleteFraction = float(nElapsedFrames) / float(nFramesInLoop)
	} else {
		percentCompleteFraction = float(frameCount % nFramesInLoop) / float(nFramesInLoop);
	}
	//DESIGN GOES HERE
	renderMyDesign(percentCompleteFraction);

	//save each frame to a file
	if (bRecording && bEnableExport) {
		let frameOutputFilename = myNickname + "_frame_" + nf(nElapsedFrames, 4) + ".png";
		print("Saving output image: " + frameOutputFilename);
		saveCanvas(theCanvas, frameOutputFilename, 'png');
		nElapsedFrames++;

		if (nElapsedFrames >= nFramesInLoop) {
			bRecording = false;
		}
	}
}

//========================================
function renderMyDesign(percent) {
	//HERE IS WHERE YOUR DRAWING GOES
	background(35);
	stroke(0, 0, 0);
	strokeWeight(2);
	//
	let cx = 100;
	let cy = 100;
	//rotating element - look at this to figure out petals
	let radius = 80;
	let rotatingArmAngle = percent * TWO_PI;
	let px = cx + radius * cos(rotatingArmAngle);
	let py = cy - radius * sin(rotatingArmAngle);
	fill(255);
	line(cx, cy, px, py);
	ellipse(px, py, 20, 20);

	//pulsating ellipse - maybe add some leaves? or facial expression
	let ellipsePulse = sin(3.0 * percent * TWO_PI);
	let ellipseW = map(ellipsePulse, -1, 1, 20, 50);
	let ellipseH = map(ellipsePulse, -1, 1, 50,30);
	let ellipseColor = map(ellipsePulse, -1,1, 128,255);
	fill(255,ellipseColor,ellipseColor);
	ellipse(cx,cy,ellipseW,ellipseH);

	//visual feedback
	fill(255,0,0);
	noStroke();
	let percentDisplayString = "" + nf(percent,1,3);
	text (percentDisplayString, 5, 15);
}