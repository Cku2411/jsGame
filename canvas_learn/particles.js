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
  ripple() {
    if (this.radius < 50) {
      this.radius += 0.5;
      this.x -= 0.03;
      this.y -= 0.03;
    }

    if (this.opacity > 0) {
      this.opacity -= 0.009;
    }
  }
  drawRipple() {
    ctx3.strokeStyle = "rgba(255,255,255," + this.opacity + ")";
    ctx3.beginPath();
    // draw circle
    ctx3.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx3.stroke();
    ctx3.closePath();
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
}

function handleRipples() {
  //   create ripples

  for (let i = 0; i < ripplesArray.length; i++) {
    ripplesArray[i].drawRipple();
    ripplesArray[i].ripple();
  }

  if (ripplesArray.length > 20) {
    for (let index = 0; index < 5; index++) {
      ripplesArray.pop();
    }
  }

  if (frogger.moving && frogger.y < 250 && frogger.y > 100) {
    for (let i = 0; i < 20; i++) {
      ripplesArray.unshift(new Particle(frogger.x, frogger.y));
    }
  }
}
