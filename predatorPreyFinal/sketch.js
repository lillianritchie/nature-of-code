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

//images and font
let aquarium;
let badFish;
let goodFish;
let nose;
let retron;

//game scoring
let health = 10;
let score = 0;

// setup function!
function setup() {
	frameRate(45);
	createCanvas(800, 600);
	aquarium = loadImage('/assets/ocean.jpg');
	badFish = loadImage('/assets/piranha3.png');
	goodFish = loadImage('assets//prey3.png');
	nose = loadImage('/assets/nose.png')
	retron = loadFont('/assets/Retron2000.ttf');

	// filling the array of predators
	for (let i = 0; i < 5; i++) {
		predators.push(new Predator(random(width), random(height)));
	}
	for (let i = 0; i < 10; i++) {
		preys.push(new Prey(random(width), random(height)));
	}

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

	//createP("sliders");
	// slider1 = createSlider(0, 8, 4);
	// slider1.position(20, 30);
	// slider2 = createSlider(0, 8, 4);
	// slider2.position(20, 70);
	// slider3 = createSlider(10, 160, 24);
	// slider3.position(20, 110);

	textFont(retron)
}

function modelReady() {
	select('#status').html('Model Loaded');
}


function draw() {
	if (health > 0 && health < 20) {
		push();
		translate(video.width, 0);
		scale(-1, 1);
		image(aquarium, 0, 0, width, height);
		drawKeypoints();
		pop();
		
		//health bar
		noStroke();
		fill(255);
		textSize(36);
		text("HEALTH", 20, 500);
		stroke(255);
		strokeWeight(4);
		noFill();
		rect(18, 508, 304, 34);
		noStroke();
		fill(244, 66, 176);
		rect(20, 510, map(health, 0, 20, 0, 300), 30);
		score = score +1;

	  push();
		textAlign(RIGHT);
		fill(255);
		text("SCORE", width-20, 500);
		textSize(16);
		text(score, width-20, 520);
		pop();

	} else if (health <= 0) {

		background(0)
		fill(244, 66, 176);
		textAlign(CENTER);
		text("YOU WERE KILLED OFF BY PREDATORS", width / 2, height / 3);
		text("SCORE: " + score, width/2, height/2);
		
	} else if (health >= 20) {

		background(0)
		fill(244, 66, 176);
		textAlign(CENTER);
		text("YOU OVER ATE AND DIED", width / 2, height / 3);
	  text("SCORE: " + score, width/2, height/2);
	}


}

function drawKeypoints() {
	if (poses.length > 0) {
		// For each pose detected, look for the nose
		let pose = poses[0].pose;
		let keypoint = pose.keypoints[0];
		// Only place a nose if probability is bigger than 0.2
		if (keypoint.score > 0.2) {
			fill(255);
			noStroke();
			image(nose, keypoint.position.x, keypoint.position.y, 60, 60);
		}
		for (let v of predators) {
			v.applyBehaviors(predators, keypoint.position.x, keypoint.position.y);
			v.update();
			v.borders();
			v.display();
			if (v.isOver(keypoint.position.x, keypoint.position.y)) {
				console.log("nose over predators")
				predators.splice(v, 1);
				predators.push(new Predator(random(width), 0));
				if (health > 0) health -= 1;
				console.log("health: " + health)
			}
		}

		for (let v of preys) {
			v.applyBehaviors(preys);
			v.update();
			v.borders();
			v.display();
			if (v.isOver(keypoint.position.x, keypoint.position.y)) {
				console.log(" nose over prey")
				preys.splice(v, 1)
				preys.push(new Prey(random(width), 0));
				if (health < 20) health += 1;
				console.log("health: " + health)

			}
		}
	}
}