class Heart extends Particle {
  constructor(x,y,hu){
    super();
    this.pos = createVector(x,y);
    this.lifespan = 255;
    this.hu = hu;
    this.acc = createVector(0,0);
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(7,8));
  }

  update(){
    this.vel.mult(0.9);
    this.lifespan -= 4;
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  show() {
    strokeWeight(2);
    stroke(this.hu, 100,100, this.lifespan);

    point(this.pos.x, this.pos.y);
  }
}