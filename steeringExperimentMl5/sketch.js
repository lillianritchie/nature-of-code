let font;
let vehicles = [];
let video;
let poseNet;
let poses = [];
let player;

function preload() {
	font = loadFont('AvenirNextLTPro-Demi.otf');
}

function setup() {
	createCanvas(600, 400);
	video = createCapture(video);
	video.size(width, height);


	// Create a new poseNet method with a single detection
	poseNet = ml5.poseNet(video, modelReady);
	// This sets up an event that fills the global variable "poses"
	// with an array every time new poses are detected
	poseNet.on('pose', function (results) {
		poses = results;
	});
	// Hide the video element, and just show the canvas
	video.hide();

	var points = font.textToPoints('help!', 100, 200, 192, {
		sampleFactor: 0.25
	});

	for (let i = 0; i < points.length; i++) {
		var pt = points[i];
		var vehicle = new Vehicle(pt.x, pt.y);
		vehicles.push(vehicle);
	}
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
	background(51);
	image(video, 0, 0, width, height);

	drawKeypoints();

	

}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
	// Loop through all the poses detected
	for (let i = 0; i < poses.length; i++) {
		// For each pose detected, look for the two keypoints indicating eyes.
		let pose = poses[i].pose;
		for (let j = 0; j < 2; j++) {
			// A keypoint is an object describing a body part (like rightArm or leftShoulder)
			let keypoint = pose.keypoints[j];
			// Only place a googly eye is the pose probability is bigger than 0.2
			if (j == 0 && keypoint.score > 0.2) {
				fill(200,0,0);
				noStroke();
				ellipse(keypoint.position.x, keypoint.position.y, 20, 20);
			}

			for (var k = 0; k < vehicles.length; k++) {
				var v = vehicles[k];
				v.behaviors(keypoint.position.x, keypoint.position.y);
				v.update();
				v.show();
			}
	}
}
}