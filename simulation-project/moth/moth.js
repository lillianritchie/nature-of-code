class Moth {
  constructor() {
    this.position = createVector(random(width), height);
    this.noff = createVector (random(1000), 1);
    this.speed = random(0,0.06);
   
  }

  fly() {
    this.position.x = map(noise(this.noff.x), 0, 1, -10, width);
    this.position.y = this.position.y - random(-1,2);
    this.noff.add(this.speed, this.speed);
  }

  display() {
    fill(150, 150, 150, 100);
    ellipse(this.position.x, this.position.y, 17);
    ellipse(this.position.x, this.position.y, 25);
    ellipse(this.position.x, this.position.y, 30);
  }
}


