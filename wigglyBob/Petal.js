class Petal {
  constructor(petalNumber,percentDone) {
    this.rotatingAngle = percentDone * TWO_PI / petalNumber;
    this.petalRadius = map(sin(rotatingAngle), -1, 1, 125, 150);
    this.x = petalRadius - 50;
    this.y = 0;
  }
  display() {
    push();
    translate(width / 2, height / 2);
    rotate(rotatingAngle)
    ellipse(this.x, this.y, petalRadius, 50);
    pop();
  }
}