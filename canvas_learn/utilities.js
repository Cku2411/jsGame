function animate() {
  // clear the canvasn
  ctx1.clearRect(0, 0, canvas.width, canvas.height);
  ctx3.clearRect(0, 0, canvas.width, canvas.height);
  ctx4.clearRect(0, 0, canvas.width, canvas.height);

  ctx1.drawImage(backgroud_lvl2, 0, 0, canvas.width, canvas.height);
  ctx4.drawImage(grass, 0, 0, canvas.width, canvas.height);

  frogger.draw();
  frogger.update();

  handleObstacles();
  handleParticles();
  handleRipples();
  handleScore();
  frame++;
  requestAnimationFrame(animate);
}

animate();

// even lisner
window.addEventListener("keydown", function (e) {
  // add keys array
  keys[e.code] = true;
  if (
    e.code === "ArrowUp" ||
    e.code === "ArrowDown" ||
    e.code === "ArrowLeft" ||
    e.code === "ArrowRight"
  ) {
    frogger.jump();
  }
  console.log({ keys });
});

window.addEventListener("keyup", function (e) {
  delete keys[e.code];
  frogger.moving = false;
});

function scored() {
  score++;
  gameSpeed += 0.05;
  // reset frog
  frogger.x = canvas.width / 2 - frogger.width / 2;
  frogger.y = canvas.height - frogger.height - 40;
}

function handleScore() {
  ctx4.fillStyle = "black";
  ctx4.strokeStyle = "black";
  // chu score
  ctx4.font = "15px Verdana";
  ctx4.strokeText("Score: ", 265, 15);
  // bang diem
  ctx4.font = "60px Verdana";
  ctx4.fillText(score, 270, 65);

  ctx4.font = "15px Verdana";
  ctx4.strokeText("Collisions: " + collisionCount, 10, 175);
  ctx4.strokeText("Game Speed: " + gameSpeed.toFixed(1), 10, 195);
}

// collision dectetion
function collision(first, second) {
  return !(
    first.x > second.x + second.width ||
    first.x + first.width < second.x ||
    first.y > second.y + second.height ||
    first.y + first.height < second.y
  );
}

function resetGame() {
  // reset frog
  frogger.x = canvas.width / 2 - frogger.width / 2;
  frogger.y = canvas.height - frogger.height - 40;
  score = 0;
  collisionCount++;
  gameSpeed = 1;
}
