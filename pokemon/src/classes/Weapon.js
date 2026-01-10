import { Vector2 } from "../utils/vector2.js";
import { GameObject } from "./GameObjects.js";
import { Sprite } from "./Sprite.js";
import { resources } from "./resources.js";

export class Weapon extends GameObject {
  constructor({ position, game, resource }) {
    // 1. Gọi constructor của cha để set vị trí
    super({ position: position, game: game });

    // 2. TẠO HÌNH ẢNH (Composition)
    const shadow = new Sprite({
      resource: resources.images.shadow,
      position: this.position,
      scale: 2,
    });

    this.addChild(shadow);
    this.body = new Sprite({
      resource: resource,
      position: this.position,
      scale: 3,
    });

    this.addChild(this.body);
  }

  draw(ctx) {
    // draw debug
    super.draw(ctx);
    this.children.forEach((child) => child.draw(ctx));
  }

  update(deltaTime) {
    this.children.forEach((child) => child.update(deltaTime));
  }
}
