let dx = 0;
let dy = 0;
	
	function setup() {
	createCanvas(windowWidth, windowHeight);
	x = width / 2;
	y = height / 2;
	background(51);
}

function draw() {
	let randomNumber = floor(random(4));
	
	stroke(255);
	strokeWeight(8);

	line(x, y, x-dx, y-dy);

	//random walk
	switch (randomNumber) {
		case 0:
		  dx = 10
			x = x + dx;
			dy = 0
			break;
		case 1:
		  dx = -10;
			x = x + dx;
			dy = 0;
			break;
		case 2:
		  dy = 10;
			y = y + dy;
			dx = 0;
			break;
		case 3:
		  dy = -10;
			y = y + dy;
			dx= 0
			break;
	}

}
