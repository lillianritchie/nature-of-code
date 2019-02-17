class Critter {
  constructor() {
    this.mass = 1;
    this.position = createVector(250, 100);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }

  applyForce(force) {
    var f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  display() {
    stroke(0);
    strokeWeight(2);
    //head shape
    fill(200, 255, 20);
    ellipse(this.position.x, this.position.y, 100, 100)
    //mouth
    fill(25);
    ellipse(this.position.x, this.position.y + 15, 50,this.position.y/10);

    //eye background
    fill(255);
    ellipse(this.position.x-20, this.position.y-15, 20,20);
    ellipse(this.position.x+20, this.position.y-15, 20,20);


    fill(0);
    ellipse(this.position.x-20, this.position.y-15, this.position.y / 40,this.position.y / 40);
    ellipse(this.position.x+20, this.position.y-15, this.position.y / 40,this.position.y / 40);
  }

  checkEdges() {
    if (this.position.x > width) {
      this.position.x = width;
      this.velocity.x *= -1;
    } else if (this.position.x < 0) {
      this.position.x = 0;
      this.velocity.x *= -1;
    }
    if (this.position.y > height) {
      this.position.y = height;
      this.velocity.y *= -1;
    } else if (this.position.y < 0) {
      this.position.y = 0;
      this.velocity.y *= -1;
    }
  }
}