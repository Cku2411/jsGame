export class OverworldMap {
  constructor({ gameObjects, backgroundSrc, foregroundSrc }) {
    this.gameObjects = gameObjects;

    this.background = new Image();
    this.background.src = backgroundSrc;

    this.foreground = new Image();
    this.foreground.src = foregroundSrc;
  }

  drawBackground(ctx) {
    ctx.drawImage(this.background, 0, 0);
  }

  drawForeground(ctx) {
    ctx.drawImage(this.foreground, 0, 0);
  }
}
