// modifiable global variables
let myNickname = "wigglyBob";
let nFramesInLoop = 200;
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
	let cx = 200;
	let cy = 200;
	//rotating element - look at this to figure out petals
	// rotation variables

	//colorMode(HSB);
	push();
	ellipseMode(CENTER);
	let rotatingAngle = percent * TWO_PI;
	let px = cx + 30 * cos(rotatingAngle);
	let petalRadius = map(sin(rotatingAngle),-1,1,125,150);
	translate(width / 2, height / 2);
	rotate(rotatingAngle)

	fill(255);
	ellipse(petalRadius-50,0, petalRadius, 50);
	
	pop();
	fill(255,255,0);
	ellipse(width/2, height/2, 100,100);
	//pulsating ellipse - maybe add some leaves? or facial expression
	// let ellipsePulse = sin(3.0 * percent * TWO_PI);
	// let ellipseW = map(ellipsePulse, -1, 1, 20, 50);
	// let ellipseH = map(ellipsePulse, -1, 1, 50,30);
	// let ellipseColor = map(ellipsePulse, -1,1, 128,255);
	// fill(255,ellipseColor,ellipseColor);
	// ellipse(cx,cy,ellipseW,ellipseH);

	//visual feedback
	fill(255, 0, 0);
	noStroke();
	let percentDisplayString = "" + nf(percent, 1, 3);
	text(percentDisplayString, 5, 15);
}