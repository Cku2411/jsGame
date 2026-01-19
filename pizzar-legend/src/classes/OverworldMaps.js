import { utils } from "../util.js";
import { OverWorldEvent } from "./OverWorldEvent.js";

export class OverworldMap {
  constructor({ gameObjects, backgroundSrc, foregroundSrc, walls }) {
    this.gameObjects = gameObjects;
    this.walls = walls;

    this.background = new Image();
    this.background.src = backgroundSrc;

    this.foreground = new Image();
    this.foreground.src = foregroundSrc;

    this.isCuttingScenePlaying = false;
  }

  async startCutscene(events) {
    this.isCuttingScenePlaying = true;

    // Start a loop of async events
    for (let i = 0; i < events.length; i++) {
      const eventHandler = new OverWorldEvent({
        map: this,
        eventConfig: events[i],
      });

      await eventHandler.init();
    }

    this.isCuttingScenePlaying = false;
    console.log(this.isCuttingScenePlaying);

    // Await each one
  }

  isSpaceTaken(currentX, currentY, direction) {
    const { x, y } = utils.nextPosition(currentX, currentY, direction);

    // rcheck if coordinate in wallmap
    return this.walls[`${x},${y}`] || false;
  }

  getObjectReady() {
    Object.keys(this.gameObjects).forEach((key) => {
      let obj = this.gameObjects[key];
      obj.id = key;
      obj.ready(this);
    });

    console.log("OBJECTS READY!!!");
  }

  addWall(x, y) {
    this.walls[`${x},${y}`] = true;
  }

  removeWall(x, y) {
    delete this.walls[`${x},${y}`];
  }

  moveWall(wasX, wasY, direction) {
    this.removeWall(wasX, wasY);
    // find new x,y
    const { x, y } = utils.nextPosition(wasX, wasY, direction);
    this.addWall(x, y);
  }

  drawBackground(ctx, cameraPerson) {
    ctx.drawImage(
      this.background,
      utils.grid(10.5) - cameraPerson.position.x,
      utils.grid(6) - cameraPerson.position.y,
    );
  }

  drawForeground(ctx, cameraPerson) {
    ctx.drawImage(
      this.foreground,
      utils.grid(10.5) - cameraPerson.position.x,
      utils.grid(6) - cameraPerson.position.y,
    );
  }
}
