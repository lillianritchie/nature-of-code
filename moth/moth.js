class Moth {
  constructor() {
    this.position = createVector(random(width), random(0, height));
    this.noff = createVector(random(100), 1);
    this.speed = random(0, 0.02);
    this.particles = [];
  }

  update() {
    this.position.x = map(noise(this.noff.x), 0, 1, -200, width + 200);
    this.position.y = this.position.y + random(-6, 5);
    this.noff.add(this.speed, this.speed);

    if (this.position.y < 0 && this.position.x < width * 3 / 8 && this.position.x > width * 5 / 8) {
      this.position.y = this.position.y + height;
    }
  }

  display() {
    fill(150, 150, 150, 100);
    ellipse(this.position.x, this.position.y, 17);
    ellipse(this.position.x, this.position.y, 25);
    ellipse(this.position.x, this.position.y, 30);
  }

  dead() {
    if (this.position.x >= 3 / 8 * width && this.position.x <= 5 / 8 * width && this.position.y <= height / 20) {
      return true;
    } else {
      return false;
    }
  }

  zap() {
    if (this.dead()) {
      for (let i = 0; i < 50; i++) {
        const d = new Dust(this.position.x, this.position.y);
        this.particles.push(d); // particles is an array of Dust.
      }
    }

  }

  displayDust() {
    //for loop of all particles
    //call update
    //display
    this.particles.forEach(p => {
      p.update()
      p.display()
    })
  }

}

class Dust {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D();
    this.velocity.mult(random(2, 10));
    this.acceleration = createVector(0, 0);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  display() {
    strokeWeight(5);
    stroke(100, 100, 100, 100);
    point(this.position.x, this.position.y);
  }
}

class Survivor {
  constructor() {
    this.position = createVector(random(width), random(0, height));
    this.noff = createVector(random(100), random(10));
    this.speed = 0.01;
  }

  update() {
    this.position.x = map(noise(this.noff.x), 0, 1, -200, width + 200);
    this.position.y = map(noise(this.noff.y), 0, 1, height, 0)
    this.noff.add(this.speed, this.speed);
  }

  display() {
    fill(150, 150, 150, 100);
    ellipse(this.position.x, this.position.y, 5);
    ellipse(this.position.x, this.position.y, 7);
    ellipse(this.position.x, this.position.y, 10);
  }
}