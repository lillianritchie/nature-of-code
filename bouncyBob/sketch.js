// Nature of Code Weeks 2 and 3 
//Lillian Ritchie

let bob;

function setup() {
	createCanvas(windowWidth, 600);
	bob = new Critter();
}

function draw() {
	background(51);
	//declare force vectors
	let gravity = createVector(0.0, 0.1);
	let leftWind = createVector(-0.1, 0.0);
	let rightWind = createVector(0.1, 0.0);
	// exert gravity on bob
	bob.applyForce(gravity);
	//blow bob left or right
	if (keyIsDown(RIGHT_ARROW)) {
		bob.applyForce(rightWind);
	}
	if (keyIsDown(LEFT_ARROW)) {
		bob.applyForce(leftWind);
	}
	if (keyIsDown(32)){
		bob.velocity.x = bob.velocity.x * 0.9;
	}

	bob.update();
	bob.display();
	bob.checkEdges();

}