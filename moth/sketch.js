let moths = [];
//let walker1;

function setup() {
  createCanvas(windowWidth, 500);

  //walker1 = new Moth(0, 1000, 0.01);
  for (i = 0; i < 20; i++) {
    moths.push(new Moth())
  }
  noStroke();


}

function draw() {
  background(0, 0, 0, 100)
  fill(255, 230, 0, 205);
  //ellipse(width / 2, 0, width / 3, height / 8)
  ellipse(width / 2, 0, width / 4, height / 10);
  fill(255, 230, 0, 50)
  triangle(width / 2, -height / 2, width / 8, height, width * 7 / 8, height);

  fill
  for (i = 0; i < moths.length; i++) {
    moths[i].update();
    moths[i].display();
    moths[i].zap();

    if (moths[i].dead()) {
      moths.splice(i, 1);
      console.log(moths.length);
    }

  }
}