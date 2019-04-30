 // The Nature of Code
 // Daniel Shiffman
 // http://natureofcode.com

 // Separation
 // Via Reynolds: http://www.red3d.com/cwr/steer/

 // A list of predators
 let predators = [];
 let preys = [];

 let slider1 = 4;
 let slider2 = 4;
 let slider3 = 40;

 function setup() {

 	createCanvas(720, 480);
 	// We are now making random predators and storing them in an array
 	for (let i = 0; i < 10; i++) {
 		predators.push(new Predator(random(width), random(height)));
 		preys.push(new Prey(random(width), random(height)));
 	}
 	//createP("sliders");
 	// slider1 = createSlider(0, 8, 4);
 	// slider1.position(20, 30);
 	// slider2 = createSlider(0, 8, 4);
 	// slider2.position(20, 70);
 	// slider3 = createSlider(10, 160, 24);
 	// slider3.position(20, 110);
 }

 function draw() {
 	background(51);
 	fill(255);
 	textSize(16);
 	noStroke();
 	//text('separate force: ' + slider1.value(), 30, 20);
 	// text('seek force: ' + slider2.value(), 30, 60);
 	// text('desired separation: ' + slider3.value(), 30, 100);

 	for (let v of predators) {
 		v.applyBehaviors(predators);
 		v.update();
 		v.borders();
 		v.display();
 		// add a predator if a predator catches you
 		}
 	
 	for (let v of preys) {
 		v.applyBehaviors(preys);
 		v.update();
 		v.borders();
 		v.display();
 	}
 }