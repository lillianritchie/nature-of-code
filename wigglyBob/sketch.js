// modifiable global variables
let myNickname = "wigglyBob";
let nFramesInLoop = 240;
let bEnableExport = true;
let petalOne;
let petalTwo;
let petalThree;
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
	background(25);
	stroke(0);
	strokeWeight(2);
	fill(255);

	let rotatingAngle = percent * TWO_PI;
	let standardAngle = percent * TWO_PI;
	let petalRadius = map(sin(rotatingAngle), -1, 1, 120, 150);
	let hueValue = map(rotatingAngle, 0, TWO_PI, 0,360);
	// DRAW PETALS
	colorMode(HSB);
	fill(hueValue, 80, 60);
	//petal one
	push();
	translate(width / 2, height / 2);
	rotate(rotatingAngle)
	ellipse(petalRadius - 50, 0, petalRadius, 75);
	pop();
	//petal two
	push();
	rotatingAngle = rotatingAngle + QUARTER_PI;
	translate(width / 2, height / 2);
	rotate(rotatingAngle);
	ellipse(petalRadius - 50, 0, petalRadius, 75);
	pop();
	//petal three
	push();
	rotatingAngle = rotatingAngle + 2 * QUARTER_PI;
	translate(width / 2, height / 2);
	rotate(rotatingAngle)
	ellipse(petalRadius - 50, 0, petalRadius, 75);
	pop();
	//petal four
	push();
	rotatingAngle = rotatingAngle + 3 * QUARTER_PI;
	translate(width / 2, height / 2);
	rotate(rotatingAngle)
	ellipse(petalRadius - 50, 0, petalRadius, 75);
	pop();
	//petal five
	push();
	rotatingAngle = rotatingAngle + PI;
	translate(width / 2, height / 2);
	rotate(rotatingAngle)
	ellipse(petalRadius - 50, 0, petalRadius, 75);
	pop();
	//petal six
	push();
	rotatingAngle = rotatingAngle + 5 * QUARTER_PI;
	translate(width / 2, height / 2);
	rotate(rotatingAngle)
	ellipse(petalRadius - 50, 0, petalRadius, 75);
	pop();
	//petal seven
	push();
	rotatingAngle = rotatingAngle + 6 * QUARTER_PI;
	translate(width / 2, height / 2);
	rotate(rotatingAngle)
	ellipse(petalRadius - 50, 0, petalRadius, 75);
	pop();
	//petal eight
	push();
	rotatingAngle = rotatingAngle + 7 * QUARTER_PI;
	translate(width / 2, height / 2);
	rotate(rotatingAngle)
	ellipse(petalRadius - 50, 0, petalRadius, 75);
	pop();


	//flower
	colorMode(RGB);
	fill(255, 255, 0);
	ellipse(width / 2, height / 2, 100, 100);
	fill(255);
	ellipse(180, 195, 20);
	ellipse(220, 195, 20)
	fill(0);
	ellipse(180, 195, 2);
	ellipse(220, 195, 2);
	strokeWeight(3);
	line(190, 225, 210, 225);
	strokeWeight(1);
	noFill();
	arc(180, 195, 30, 30, QUARTER_PI, PI - QUARTER_PI)
	arc(220, 195, 30, 30, QUARTER_PI, PI - QUARTER_PI);
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