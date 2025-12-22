class Obstacle {
  constructor(x, y, width, height, speed, type) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.type = type;
  }

  draw() {
    ctx1.fillStyle = "blue";
    ctx1.fillRect(this.x, this.y, this.width, this.height);
  }
  update() {
    // update speed for obstacle
    this.x += this.speed * gameSpeed;
    if (this.speed > 0) {
      if (this.x > canvas.width + this.width) {
        // reset car
        this.x = 0 - this.width;
      }
    } else if (this.x < 0 - this.width) {
      this.x = canvas.width;
    }
  }
}

function initObstacle() {
  // lane 1
  for (let i = 0; i < 2; i++) {
    // put new car padding 350
    let x = i * 350;
    carsArray.push(
      new Obstacle(x, canvas.height - grid * 2 - 20, grid * 2, grid, 1, "car")
    );
  }

  // lane 2
  for (let i = 0; i < 2; i++) {
    // put new car padding 350
    let x = i * 300;
    carsArray.push(
      new Obstacle(x, canvas.height - grid * 3 - 20, grid * 2, grid, -2, "car")
    );
  }
}

initObstacle();

function handleObstacles() {
  for (let index = 0; index < carsArray.length; index++) {
    carsArray[index].draw();
    carsArray[index].update();
  }
}
