// A list of predators
let predators = [];
//a list of prey
let preys = [];

//hard coded slider values
let slider1 = 4;
let slider2 = 4;
let slider3 = 40;

//posenet variables
let video;
let poseNet;
let poses = [];


//images
let aquarium;
let badFish;
let goodFish;
let nose;
const flipHorizontal = true;




function setup() {

	createCanvas(800, 600);
	aquarium = loadImage('/assets/ocean.jpg');
	badFish = loadImage('/assets/piranha3.png');
	goodFish = loadImage('assets//prey3.png');
	nose = loadImage('/assets/nose.png')
	
	// filling the array of predators
	for (let i = 0; i < 10; i++) {
		predators.push(new Predator(random(width), random(height)));
	}
	for (let i = 0; i < 100; i++) {
		preys.push(new Prey(random(width), random(height)));
	}

	video = createCapture(video);
	video.size(width, height);
	// Create a new poseNet method with a single detection
	poseNet = ml5.poseNet(video, flipHorizontal, modelReady);
	// This sets up an event that fills the global variable "poses"
	// with an array every time new poses are detected
	poseNet.on('pose', function (results) {
		poses = results;
	});
	// Hide the video element, and just show the canvas
	video.hide();

	//createP("sliders");
	// slider1 = createSlider(0, 8, 4);
	// slider1.position(20, 30);
	// slider2 = createSlider(0, 8, 4);
	// slider2.position(20, 70);
	// slider3 = createSlider(10, 160, 24);
	// slider3.position(20, 110);
}

function modelReady() {
	select('#status').html('Model Loaded');
}


function draw() {
	//image(aquarium,0,0,width,height);
	push();
	translate(video.width, 0);
	scale(-1,1);
	image(aquarium,0,0,width,height);
	fill(255);
	textSize(16);
	noStroke();
	drawKeypoints();
	pop();


	
	//text('separate force: ' + slider1.value(), 30, 20);
	// text('seek force: ' + slider2.value(), 30, 60);
	// text('desired separation: ' + slider3.value(), 30, 100);

}

function drawKeypoints() {
	// Loop through all the poses detected
	for (let i = 0; i < poses.length; i++) {
		// For each pose detected, look for the nose
		let pose = poses[i].pose;
		let keypoint = pose.keypoints[0];
		// Only place a googly eye is the pose probability is bigger than 0.2
		if (keypoint.score > 0.2) {
			fill(255);
			noStroke();
			image(nose,keypoint.position.x, keypoint.position.y, 60, 60);
		}
		for (let v of predators) {
			v.applyBehaviors(predators, keypoint.position.x, keypoint.position.y);
			v.update();
			v.borders();
			v.display();
			if (v.isOver(keypoint.position.x, keypoint.position.y)) {
				predators.splice(i, 1);
				predators.push(new Predator(random(width), 0));
			}
		}

		for (let v of preys) {
			v.applyBehaviors(preys);
			v.update();
			v.borders();
			v.display();
			if (v.isOver(keypoint.position.x, keypoint.position.y)) {
				preys.splice(v, 1)
				console.log("prey left: " + preys.length)
			}
		}
	}
}
