let dx = 0;
let dy = 0;
let x;
let y;
let colorChoice;

function setup() {
	createCanvas(windowWidth, windowHeight);
	x = width / 2;
	y = height / 2;
 colorChoice = 0;
	background(51);
}

function draw() {
	//set randomized variables

	strokeWeight(random(5,12));
	walkDirection();
	walkColor();
	walkDisplay();

}
function walkDirection(){
	let randomNumber = floor(random(4));

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
	} else if (randomNumber == 3) {
		if (y >= 0) {
			dy = -10;
			y = y + dy;
			dx = 0
		} else {
			dy = 10;
			y = y + dy;
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
}

function walkColor(){
	//set the color of the line
	let randomColor = floor(random(0, 3));

  if (randomColor == 0) {
		if(colorChoice > 0 ){
			colorChoice = colorChoice - 1;
		} else {colorChoice = 20;}
	} 
	else if (randomColor > 0) {
		if (colorChoice < 20){
			colorChoice = colorChoice + 1;
		} else {
			colorChoice = 0;
		}
	}

//	console.log("random is" + randomColor + "color index is" + colorChoice);
	let red = reds[colorChoice];
	let green = greens[colorChoice];
	let blue = blues[colorChoice];
	stroke(red,green,blue);

}

function walkDisplay(){
	//draw a line in the direction of the walk
	line(x, y, x - dx, y - dy);
	//console.log("x is" + x, "y is" + y)
}
