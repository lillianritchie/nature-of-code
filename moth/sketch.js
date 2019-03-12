let moths = [];
let survivors = [];
//let walker1;

function setup() {
  createCanvas(windowWidth, 500);

  for (i = 0; i < 20; i++) {
    moths.push(new Moth());
    survivors.push(new Survivor());
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

  for (j=0; j < survivors.length; j++) {
    survivors[j].update();
    survivors[j].display();
  }

  
  for (i = 0; i < moths.length; i++) {
  
    if (moths[i].dead()) {
      // dead flow
      moths[i].displayDust();
    } else {
      // alive flow
      moths[i].update();
      moths[i].display();
      moths[i].zap();
    }

    if (moths[i].done){
      moths.splice(i,1);
      
      moths.push(new Moth());

    }
  
  }
  
    
  }
