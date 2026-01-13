import { Vector2 } from "../utils/vector2.js";
import { GameObject } from "./GameObjects.js";
import { Sprite } from "./Sprite.js";

export class Heart extends GameObject {
  constructor({ position, game, resourse, currentFrame }) {
    super({ position: position, game: game });

    this.image = new Sprite({
      resource: resourse,
      position: position,
      currentFrame: currentFrame,
      VFrames: 5,
      hFrames: 1,
      scale: 2,
      direction: "horizoltal",
    });
  }

  draw(ctx) {
    this.image.draw(ctx);
  }
}
