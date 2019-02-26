class Firework {
  constructor() {
    this.hu = random(360);
    this.firework = new Particle(random(width), height, this.hu);
    this.exploded = false;
    this.particles = [];
  }

  done() {
    if (this.exploded && this.particles.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  update() {
    if (!this.exploded) {
      this.firework.applyForce(gravity);
      this.firework.update();

      if (this.firework.vel.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].applyForce(gravity);
      this.particles[i].update();

      if (this.particles[i].done()) {
        this.particles.splice(i, 1);
      }
    }
  }

  explode() {
    if (this.hu < 300 && this.hu >20) {
      for (let i = 0; i < 100; i++) {
        const b = new Blast(this.firework.pos.x, this.firework.pos.y, this.hu);
        this.particles.push(b);
      }
    } else {
      for (let i = 0; i < 100; i++) {
      const h = new Heart(this.firework.pos.x, this.firework.pos.y, this.hu);
      this.particles.push(h);
      }
    }
  }

  show() {
    if (!this.exploded) {
      this.firework.show();
    }

    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].show();
    }
  }
}