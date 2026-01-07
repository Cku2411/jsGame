import { Input } from "../Input.js";
import { Hero } from "./classes/Hero.js";
import { Word } from "./classes/World.js";
import { Vector2 } from "./utils/vector2.js";

export const TILE_SIZE = 12;
export const COLS = 70;
export const ROWS = 40;
export const GAME_WIDTH = TILE_SIZE * COLS;
export const GAME_HEIGHT = TILE_SIZE * ROWS;
export const HALF_TILE = TILE_SIZE / 2;

// ==Setup canvas===
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

// START GAME
class Game {
  constructor() {
    this.world = new Word();
    this.hero = new Hero({
      position: new Vector2(25 * TILE_SIZE, 20 * TILE_SIZE),
      game: this,
    });
    this.input = new Input(this);
  }

  render() {
    this.hero.update();
    this.world.drawBackground(ctx);
    this.world.drawGrid(ctx);
    this.hero.draw(ctx);
  }
}

// ====RUN====

const game = new Game();

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  game.render();
}

requestAnimationFrame(animate);
