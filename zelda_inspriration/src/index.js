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

// ==Setup canvas===
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

class Game {
  constructor() {
    this.world = new World();
    this.hero = new Hero({
      position: new Vector2(1 * TILE_SIZE, 1 * TILE_SIZE),
      game: this,
    });
    this.input = new Input();
  }

  render() {
    this.hero.update();
    this.world.drawBackground(ctx);
    this.world.drawGrid(ctx);
    this.hero.draw(ctx);

    // foreground helps hero move behind them
    this.world.drawForeground(ctx);
  }
}

// ===helper fucntion ===
const game = new Game();

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  game.render();
}

requestAnimationFrame(animate);

// ===helper fucntion ===
