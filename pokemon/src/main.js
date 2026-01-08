import { Input } from "../Input.js";
import { Hero } from "./classes/Hero.js";
import { Word } from "./classes/World.js";
import { Vector2 } from "./utils/vector2.js";
import { Camera } from "./classes/Camera.js";

export const zoom = 4;
export const TILE_SIZE = 12;
export const COLS = 70;
export const ROWS = 40;
export const GAME_WIDTH = TILE_SIZE * COLS;
export const GAME_HEIGHT = TILE_SIZE * ROWS;
export const HALF_TILE = TILE_SIZE / 2;

// ==Setup canvas===
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

// START GAME
class Game {
  constructor() {
    this.world = new Word();
    this.hero = new Hero({
      position: new Vector2(30 * TILE_SIZE, 20 * TILE_SIZE),
      game: this,
    });
    this.input = new Input(this);
    this.debug = false;
    // this.camera = new Camera({ mapLevel: this.world, GAME_WIDTH, GAME_HEIGHT });
  }

  render() {
    this.hero.update();
    this.world.drawBackground(ctx);
    if (this.debug) this.world.drawGrid(ctx);
    this.hero.draw(ctx);
  }
  toggleDebug() {
    this.debug = !this.debug;
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
