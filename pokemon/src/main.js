import { Input } from "../Input.js";
import { Hero } from "./classes/Hero.js";
import { Word } from "./classes/World.js";
import { Vector2 } from "./utils/vector2.js";
import { Monster } from "./classes/Monster.js";
import { resources } from "./classes/resources.js";
import { Weapon } from "./classes/Weapon.js";

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
    this.fps = 0; // thêm biến fps

    this.enemies = [];
    this.items = [];

    const enemy1 = new Monster({
      resource: resources.images.enemy1,
      position: new Vector2(50 * TILE_SIZE, 22 * TILE_SIZE),
      game: this,
    });

    const enemy2 = new Monster({
      resource: resources.images.enemy2,
      position: new Vector2(30 * TILE_SIZE, 25 * TILE_SIZE),
      game: this,
    });

    const weapon1 = new Weapon({
      resource: resources.images.weapon1,
      position: new Vector2(26 * TILE_SIZE, 21 * TILE_SIZE),
      game: this,
    });

    this.enemies.push(enemy1, enemy2);
    this.items.push(weapon1);
  }

  render(deltaTime) {
    this.world.drawBackground(ctx);
    this.hero.update(deltaTime);
    if (this.debug) this.world.drawGrid(ctx);
    this.hero.draw(ctx);
    // render enemies
    // this.enemies.forEach((enemy) => enemy.draw(ctx));
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const enemy = this.enemies[i];
      enemy.update(deltaTime);
      enemy.draw(ctx);
    }

    for (let i = this.items.length - 1; i >= 0; i--) {
      const item = this.items[i];
      item.update(deltaTime);
      item.draw(ctx);
    }

    this.world.drawForeground(ctx);

    if (deltaTime > 0) {
      this.fps = Math.round(1000 / deltaTime);
    }

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

  renderFPS(ctx) {
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(10, 10, 80, 30);
    ctx.font = "16px Arial";
    ctx.fillStyle = "lime";
    ctx.fillText(`FPS: ${this.fps}`, 20, 30);
  }
}

// ====RUN====

let game = null;
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

  if (game) {
    game.render(deltaTime);
  } else {
    // Show loading message
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Loading images...", canvas.width / 2, canvas.height / 2);
  }

  ctx.restore();

  if (game) {
    game.renderFPS(ctx);
  }
}

// Wait for all images to load before starting the game
resources
  .loadAll()
  .then(() => {
    game = new Game();
    console.log("Game started!");
  })
  .catch((error) => {
    console.error("Failed to load resources:", error);
    // Still try to start the game even if some images failed
    game = new Game();
  });

requestAnimationFrame(animate);
