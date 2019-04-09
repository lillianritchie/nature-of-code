let mobilenet;
let classifier;
let video;
let label = 'test';
let sadButton;
let happyButton;
let equilibrium = 50;


function modelReady() {
	console.log("Model is ready!!!");
}

function videoReady() {
	console.log("Video is ready!!!");
}

function whileTraining(loss) {
	if (loss == null) {
		console.log("Training Complete");
		classifier.classify(gotResults);
	} else {
		console.log(loss);
	}
}

function gotResults(error, result) {
	if (error) {
		console.error(error);
	} else {
		label = result;
		classifier.classify(gotResults);
	}

	if (label === "happy" && equilibrium < 100) {
		equilibrium ++;
	} else if (label === "sad" && equilibrium > 0) {
		equilibrium --;
	} else if (equilibrium >= 100 || equilibrium <=0) {
		equilibrium = equilibrium;
	}
	console.log("equilibrium =" + equilibrium);
}

function setup() {
	createElement("h1","Emotional Stability Test");
	createP("are you emotionally stable? </br> use the buttons to take photos of yourself looking happy and sad </br> then train the model to take the test!" )
	
	happyButton = createButton("happy");
	happyButton.mousePressed(function () {
		classifier.addImage("happy");
	});

	sadButton = createButton("sad");
	sadButton.mousePressed(function () {
		classifier.addImage("sad");
	});

	trainButton = createButton("train");
	trainButton.mousePressed(function () {
		classifier.train(whileTraining);
	});

	createP(" ");

	createCanvas(480, 500);
	video = createCapture(VIDEO);
	video.hide();
	background(0);
	mobilenet = ml5.featureExtractor('MobileNet', modelReady);
	classifier = mobilenet.classification(video, videoReady);



}

function draw() {
	background(0);
	image(video, 0, 0, 320, 240);
	fill(255);
	textSize(32);
	text(label, 360, 150);

	//emotion meter
  stroke(255);
	line(20, 300, 460,300);
	ellipse(map(equilibrium, 0,100,30,450), 300, 20)

	noStroke();
	textSize(44);
	textAlign(CENTER);

	//results
	if(equilibrium < 40){
		fill(0,0,150);
		text("you're too sad!", width/2, 350);
	} else if (equilibrium > 60) {
		fill(255,0,100);
		text("you're too happy!", width/2, 350);
	} else {
		fill(255,200,0);
		text("congratulations.", width/2, 350);
		text("looks like you're stable.", width/2, 390);
	}
}