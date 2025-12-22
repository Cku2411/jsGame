function animate() {
  // clear the canvasn
  ctx3.clearRect(0, 0, canvas.width, canvas.height);
  ctx1.clearRect(0, 0, canvas.width, canvas.height);
  ctx1.drawImage(backgroud_lvl2, 0, 0, canvas.width, canvas.height);
  ctx4.drawImage(grass, 0, 0, canvas.width, canvas.height);
  frogger.draw();
  frogger.update();
  // handleObstacles();
  handleParticles();
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
