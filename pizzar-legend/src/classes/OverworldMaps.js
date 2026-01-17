import { utils } from "../util.js";

export class OverworldMap {
  constructor({ gameObjects, backgroundSrc, foregroundSrc, walls }) {
    this.gameObjects = gameObjects;
    this.walls = walls;

    this.background = new Image();
    this.background.src = backgroundSrc;

    this.foreground = new Image();
    this.foreground.src = foregroundSrc;

    console.log(this.walls);
  }

  isSpaceTaken(currentX, currentY, direction) {
    const { x, y } = utils.nextPosition(currentX, currentY, direction);

    console.log({ x, y });

    // rcheck if coordinate in wallmap
    console.log(this.walls[`${x},${y}`] || false);

    return this.walls[`${x},${y}`] || false;
  }

  drawBackground(ctx, cameraPerson) {
    ctx.drawImage(
      this.background,
      utils.grid(10.5) - cameraPerson.position.x,
      utils.grid(6) - cameraPerson.position.y
    );
  }

  drawForeground(ctx, cameraPerson) {
    ctx.drawImage(
      this.foreground,
      utils.grid(10.5) - cameraPerson.position.x,
      utils.grid(6) - cameraPerson.position.y
    );
  }
}
