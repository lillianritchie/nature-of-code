
let moths = [];
//let walker1;

function setup() {
  createCanvas(640, 360);
  //walker1 = new Moth(0, 1000, 0.01);
  for (i = 0; i < 10; i ++) {
    moths.push(new Moth())
  }

  
  background(0);
  noStroke();

}

function draw() {
  background(0);
  for (i= 0; i < moths.length; i++) {
    moths[i].fly();
    moths[i].display();
  }
  
}

