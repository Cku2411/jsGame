import { utils } from "../util.js";
import { OverWorldEvent } from "./OverWorldEvent.js";

export class OverworldMap {
  constructor({
    gameObjects,
    backgroundSrc,
    foregroundSrc,
    walls,
    cutSceneSpaces,
  }) {
    this.world = null;
    this.gameObjects = gameObjects;
    this.walls = walls;

    this.background = new Image();
    this.background.src = backgroundSrc;

    this.foreground = new Image();
    this.foreground.src = foregroundSrc;

    this.isCuttingScenePlaying = false;
    this.cutSceneSpaces = cutSceneSpaces || {};
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
    // Reset NPC
    Object.values(this.gameObjects).forEach((obj) => obj.doBehaviorEvent(this));
  }

  checkForCutsceneSpaces() {
    // get heroposition
    const hero = this.gameObjects["hero"];
    const cutsceneSpotAtCurrentHeroPostion =
      this.cutSceneSpaces[`${hero.position.x},${hero.position.y}`];

    if (
      !this.isCuttingScenePlaying &&
      cutsceneSpotAtCurrentHeroPostion &&
      cutsceneSpotAtCurrentHeroPostion.length
    ) {
      this.startCutscene(cutsceneSpotAtCurrentHeroPostion[0].events);
    }
  }

  checkForActionCutScene() {
    // get heroposition
    const hero = this.gameObjects["hero"];

    // define any object near hero

    const nextObjects = utils.nextPosition(
      hero.position.x,
      hero.position.y,
      hero.direction,
    );

    // loop through all objects find any object at that position
    const match = Object.values(this.gameObjects).find(
      (obj) =>
        `${obj.position.x},${obj.position.y}` ===
        `${nextObjects.x},${nextObjects.y}`,
    );

    if (!this.isCuttingScenePlaying && match && match.talking.length) {
      this.startCutscene(match.talking[0].events);
    }
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
