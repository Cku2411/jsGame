import { GameObject } from "./GameObjects.js";
import { Sprite } from "./Sprite.js";

export class Weather extends GameObject {
  constructor({ position, game, resouce, scale }) {
    super({ position, game });
    this.weathers = [];
    this.image = new Sprite({
      resource: resouce,
      position: position,
      VFrames: 7,
      hFrames: 1,
      direction: "horizoltal",
      scale,
    });

    this.weathers.push(this.image);
    //
    this.elapsedTimeFly = 0;
    this.elapsedTimeDuration = 4000;
    this.globalAlpha = 1;
  }

  update(deltaTime) {
    this.weathers.forEach((weather) => weather.update(deltaTime));
    this.elapsedTimeFly += deltaTime;
    this.position.x += 0.5;
    this.position.y += 0.5;
    if (this.elapsedTimeFly >= this.elapsedTimeDuration) {
      this.globalAlpha -= 0.02;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.globalAlpha);
    this.weathers.forEach((weather) => weather.draw(ctx));
    ctx.restore();
  }
}
