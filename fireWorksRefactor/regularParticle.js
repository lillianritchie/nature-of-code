class RegularParticle extends Particle {
  constructor (x,y,hu) {
    super();
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(2,10));
    }

  update() {
    this.vel.mult(0.9);
    this.lifespan -= 4;
   
  }

  show() {
    colorMode(HSB);
    strokeWeight(2);
    stroke(this.hu, 255,255,this.lifespan);
    
    point(this.pos.x, this.pos.y);
  }
}