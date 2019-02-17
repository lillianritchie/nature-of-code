// Nature of Code Weeks 2 and 3 
//Lillian Ritchie

let bob;

function setup() {
	createCanvas(500, 500);
	bob = new Critter();
}

function draw() {
	background(51);
	let gravity = createVector(0.0, 0.1);
	//let wind = createVector(0.1,0.0);
	bob.applyForce(gravity);
	//bob.applyForce(wind);

	bob.update();
	bob.display();
	bob.checkEdges();

}