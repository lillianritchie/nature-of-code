class Particle {
  constructor (x,y,hu) {
    this.pos = createVector(x,y);
    this.lifespan = 255;
    this.hu = hu;
    this.acc = createVector(0,0);
    this.vel = createVector(0, random(-12,-8));
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  done() {
    if(this.lifespan <0) {
      return true;
    } else {
      return false;
    }
  }

  show() {
    colorMode(HSB);
    strokeWeight(4);
    stroke(this.hu, 255, 255);

    point(this.pos.x, this.pos.y);
  }
}