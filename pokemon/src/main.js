import { Input } from "../Input.js";
import { Hero } from "./classes/Hero.js";
import { Word } from "./classes/World.js";
import { Vector2 } from "./utils/vector2.js";
import { Camera } from "./classes/Camera.js";
import { Ninja } from "./classes/Ninja.js";

export const zoom = 4;
export const TILE_SIZE = 48;
export const COLS = 70;
export const ROWS = 40;

export const WORLD_WIDTH = TILE_SIZE * COLS;
export const WORLD_HEIGHT = TILE_SIZE * ROWS;

const CANVAS_WIDTH = 840;
const CANVAS_HEIGHT = 480;

const VIEWPORT_WIDTH = CANVAS_WIDTH;
const VIEWPORT_HEIGHT = CANVAS_HEIGHT;
const VIEW_PORT_CENTER_X = VIEWPORT_WIDTH / 2;
const VIEW_PORT_CENTER_Y = VIEWPORT_HEIGHT / 2;
const MAX_SCROLL_X = WORLD_WIDTH - VIEWPORT_WIDTH;
const MAX_SCROLL_Y = WORLD_HEIGHT - VIEWPORT_HEIGHT;

export const HALF_TILE = TILE_SIZE / 2;

let horizontalScrollDistance, verticalSrollDistance;

// ==Setup canvas===
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

// START GAME
class Game {
  constructor() {
    this.world = new Word();
    this.hero = new Hero({
      position: new Vector2(25 * TILE_SIZE, 20 * TILE_SIZE),
      game: this,
    });

    this.input = new Input(this);
    this.debug = false;
    // this.camera = new Camera({ mapLevel: this.world, GAME_WIDTH, GAME_HEIGHT });
    this.enemies = [];
    const ninja = new Ninja({
      position: new Vector2(29 * TILE_SIZE, 20 * TILE_SIZE),
      game: this,
    });

    this.enemies.push(ninja);
  }

  render(deltaTime) {
    this.world.drawBackground(ctx);
    this.hero.update(deltaTime);
    if (this.debug) this.world.drawGrid(ctx);
    this.hero.draw(ctx);
    this.enemies.forEach((enemy) => enemy.draw(ctx));

    horizontalScrollDistance = Math.min(
      Math.max(0, this.hero.center.x - VIEW_PORT_CENTER_X),
      MAX_SCROLL_X
    );

    verticalSrollDistance = Math.min(
      Math.max(this.hero.center.y - VIEW_PORT_CENTER_Y, 0),
      MAX_SCROLL_Y
    );
  }
  toggleDebug() {
    this.debug = !this.debug;
  }
}

// ====RUN====

const game = new Game();

let lastFrameTimeStart = 0;

//lastFrameTimeEnd là tham số truyền vòa từ hàm requestAnimation
function animate(lastFrameTimeEnd) {
  requestAnimationFrame(animate);

  // find delta time (time between frames)
  const deltaTime = lastFrameTimeEnd - lastFrameTimeStart;
  lastFrameTimeStart = lastFrameTimeEnd;

  ctx.save();
  ctx.translate(-horizontalScrollDistance, -verticalSrollDistance);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  game.render(deltaTime);
  ctx.restore();
}

requestAnimationFrame(animate);
