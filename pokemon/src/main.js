import { Input } from "../Input.js";
import { Word } from "./classes/World.js";

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
    this.hero = "";
    this.input = new Input(this);
  }

  render() {
    this.world.drawBackground(ctx);
    this.world.drawGrid(ctx);
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
