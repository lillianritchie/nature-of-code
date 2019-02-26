const fireworks = [];
var gravity;

function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB, 360, 100, 100, [255]);
	gravity = createVector(0, 0.2);
	stroke(255);
	strokeWeight(4);
	background(0);
}

function draw() {
	//colorMode(RGB);
	background(100,0,0,25);

	if (random(1) < 0.03) {
		fireworks.push(new Firework());
	}

	for (let i = fireworks.length -1; i >= 0; i--) {
		fireworks[i].update();
		fireworks[i].show();

		if (fireworks[i].done()) {
			fireworks.splice(i,1);
		}
	}
}