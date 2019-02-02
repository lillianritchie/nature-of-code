let dx = 0;
let dy = 0;

function setup() {
	createCanvas(600, 600);
	x = width / 2;
	y = height / 2;
	background(51);
}

function draw() {
	//set randomized variables
	let randomNumber = floor(random(4));
	let randomRed = floor(0, 1);
	let randomGreen = floor(0, 1)
	let randomBlue = floor(0, 1)
	stroke(100, 100, 100);
	strokeWeight(8);

	//set the direction of the walk
	if (randomNumber == 0) {
		if (x <= width) {
			dx = 10
			x = x + dx;
			dy = 0
		} else {
			dx = -10
			x = x + dx;
			dy = 0;
		}
	} else if (randomNumber == 1) {
		if (x >= 0) {
			dx = -10;
			x = x + dx;
			dy = 0;
		} else {
			dx = 10
			x = x + dx;
			dy = 0;
		}
	} else if (randomNumber == 2) {
		if (y <= height) {
			dy = 10;
			y = y + dy;
			dx = 0;
		} else {
			dy = -10
			y = y + dy;
			dx = 0;
		}
	} else if (randomNumber == 3 ) {
		if (y >= 0){
		dy = -10;
		y = y + dy;
		dx = 0
		}else {
			dy = 10;
			y = y+dy;
			dx = 0
		}
	}


	//keep lines from walking off the canvas
	if (x > width || x < 0) {
		dx = dx * -1;
	}
	if (y > height || y < 0) {
		dy = dy * -1;
	}
	//draw a line in the direction of the walk
	line(x, y, x - dx, y - dy);
	console.log("x is" + x, "y is" + y)

}