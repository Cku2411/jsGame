import { Hero } from "./Classes/Hero.js";
import { Input } from "./Classes/Input.js";
import { Vector2 } from "./Classes/Vector2.js";
import { World } from "./Classes/World.js";
// ===
export const TILE_SIZE = 32;
export const COLS = 15;
export const ROWS = 20;
export const GAME_WIDTH = TILE_SIZE * COLS;
export const GAME_HEIGHT = TILE_SIZE * ROWS;
export const HALF_TILE = TILE_SIZE / 2;

// ==Setup canvas===
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

class Game {
  constructor() {
    this.world = new World();
    this.hero = new Hero({
      game: this,
      sprite: {
        image: document.getElementById("hero1"),
        x: 0,
        y: 2,
        width: 64,
        height: 64,
      },
      position: new Vector2(1 * TILE_SIZE, 1 * TILE_SIZE),
      scale: 1,
    });
    this.input = new Input();

    this.eventUpdate = false;
    this.eventTimer = 0;
    this.eventInterval = 100;
  }

  render(deltaTime) {
    this.hero.update(deltaTime);
    this.world.drawBackground(ctx);
    this.world.drawGrid(ctx);
    this.hero.draw(ctx);

    // foreground helps hero move behind them
    this.world.drawForeground(ctx);

    // check Frames update in 200ms
    if (this.eventTimer < this.eventInterval) {
      this.eventTimer += deltaTime;
      this.eventUpdate = false;
    } else {
      // reset whent update
      this.eventTimer = this.eventInterval % this.eventTimer;
      this.eventUpdate = true;
    }
  }
}

// ===helper fucntion ===
const game = new Game();

let lastFrameTimeStart = 0;

function animate(lastFrameTimeEnd) {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // find delta time (time between frames)
  const deltaTime = lastFrameTimeEnd - lastFrameTimeStart;
  lastFrameTimeStart = lastFrameTimeEnd;

  console.log({ deltaTime });

  game.render(deltaTime);
}

requestAnimationFrame(animate);

// ===helper fucntion ===
