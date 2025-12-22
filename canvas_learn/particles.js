class Particle {
  constructor(x, y) {
    this.x = x + 25;
    this.y = y + 25;
    this.radius = Math.random() * 20 + 1;
    this.opacity = 1;
    this.directionX = Math.random() * 1 - 0.5;
    this.directionY = Math.random() * 1 - 0.5;
  }

  draw() {
    ctx3.fillStyle = "rgba(150,150,150," + this.opacity + "1)";
    ctx3.beginPath();
    // draw circle
    ctx3.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx3.fill();
    ctx3.closePath();
  }
  update() {
    this.x += this.directionX;
    this.y += this.directionY;
    if (this.opacity > 0.1) {
      this.opacity -= 0.9;
    }
    if (this.radius > 0.15) {
      this.radius -= 0.14;
    }
  }
}

function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }

  if (particlesArray.length > maxParticles) {
    for (let index = 0; index < 30; index++) {
      particlesArray.pop();
    }
  }
  //   if frog is moving creat particles

  if (
    frogger.moving &&
    frogger.y > 250 &&
    particlesArray.length < maxParticles + 10
  ) {
    for (let i = 0; i < 10; i++) {
      console.log("vao day hong?");

      particlesArray.unshift(new Particle(frogger.x, frogger.y));
    }
  }

  //   create ripples

  for (let i = 0; i < ripplesArray.length; i++) {
    ripplesArray[i].update();
    ripplesArray[i].draw();
  }

  if (ripplesArray.length > 20) {
    for (let index = 0; index < 30; index++) {
      ripplesArray.pop();
    }
  }

  if (frogger.moving && frogger.y < 250) {
    for (let i = 0; i < 10; i++) {
      ripplesArray.unshift(new Ripple(frogger.x, frogger.y));
    }
  }
}
