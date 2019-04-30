// Vehicle object

class Predator {
  constructor(x, y) {
    // All the usual stuff
    this.position = createVector(x, y);
    this.r = 12;
    this.maxspeed = random(1, 2.5); // Maximum speed
    this.maxforce = random(0, 0.3); // Maximum steering force
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
  }

  applyBehaviors(predators) {

    let separateForce = this.separate(predators);
    let seekForce = this.seek(createVector(mouseX, mouseY));

    separateForce.mult(slider1);
    seekForce.mult(slider2);

    this.applyForce(separateForce);
    this.applyForce(seekForce);
  }

  applyForce(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  // Separation
  // Method checks for nearby predators and steers away
  separate(predators) {
    let desiredseparation = slider3;
    let sum = createVector();
    let count = 0;
    // For every boid in the system, check if it's too close
    for (let i = 0; i < predators.length; i++) {
      let d = p5.Vector.dist(this.position, predators[i].position);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if ((d > 0) && (d < desiredseparation)) {
        // Calculate vector pointing away from neighbor
        let diff = p5.Vector.sub(this.position, predators[i].position);
        diff.normalize();
        diff.div(d); // Weight by distance
        sum.add(diff);
        count++; // Keep track of how many
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      sum.div(count);
      // Our desired vector is the average scaled to maximum speed
      sum.normalize();
      sum.mult(this.maxspeed);
      // Implement Reynolds: Steering = Desired - Velocity
      sum.sub(this.velocity);
      sum.limit(this.maxforce);
    }
    return sum;
  }

  // A method that calculates a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  seek(target) {
    let desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target

    let eyesight = desired.mag();

    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(this.maxspeed);
    // Steering = Desired minus velocity
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force
    if (eyesight < 200) {
      return steer;
    } else {
      return this.velocity
    }
  }

  // Method to update location
  update() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelertion to 0 each cycle
    this.acceleration.mult(0);
  }

  display() {
    fill(127, 0, 0);
    stroke(200);
    strokeWeight(2);
    push();
    translate(this.position.x, this.position.y);
    ellipse(0, 0, this.r, this.r);
    pop();
  }

  // Wraparound
  borders() {
    if (this.position.x < -this.r) this.position.x = width + this.r;
    if (this.position.y < -this.r) this.position.y = height + this.r;
    if (this.position.x > width + this.r) this.position.x = -this.r;
    if (this.position.y > height + this.r) this.position.y = -this.r;
  }

  isOver (mX, mY) {
    if (dist(mX, mY, this.position.x, this.position.y) < this.r ){
      return true;
    }
    else {
      return false;
    }
  }
}