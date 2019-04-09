let mobilenet;
let classifier;
let video;
let label = 'test';
let sadButton;
let happyButton;
let angryButton;
let tastyButton;
let winkButton;

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
}

function setup() {
	createCanvas(320, 270);
	video = createCapture(VIDEO);
	video.hide();
	background(0);
	mobilenet = ml5.featureExtractor('MobileNet', modelReady);
	classifier = mobilenet.classification(video, videoReady);

	createP(' ');

	happyButton = createButton("happy");
	happyButton.mousePressed(function () {
		classifier.addImage("happy");
	});

	sadButton = createButton("sad");
	sadButton.mousePressed(function () {
		classifier.addImage("sad");
	});

	angryButton = createButton("angry");
	angryButton.mousePressed(function () {
		classifier.addImage("angry");
	});

	tastyButton = createButton("tasty");
	tastyButton.mousePressed(function () {
		classifier.addImage("tasty");
	});

	winkButton = createButton("wink");
	winkButton.mousePressed(function () {
		classifier.addImage("wink");
	})

	trainButton = createButton("train");
	trainButton.mousePressed(function () {
		classifier.train(whileTraining);
	});

}

function draw() {
	background(0);
	image(video, 0, 0, 320, 240);
	fill(255);
	textSize(16);
	text(label, 10, height - 10);
}