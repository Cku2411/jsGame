import { Vector2 } from "../utils/vector2.js";
import { GameObject } from "./GameObjects.js";
import { Sprite } from "./Sprite.js";
import { resources } from "./resources.js";
import { RIGHT, UP, DOWN, LEFT } from "../../Input.js";

export class Hero extends GameObject {
  constructor({ position, game }) {
    // 1. Gọi constructor của cha để set vị trí
    super({ position: position, game: game });

    // 2. TẠO HÌNH ẢNH (Composition)
    // Hero "sở hữu" cái bóng
    const shadow = new Sprite({
      resource: resources.images.shadow,
      position: this.position,
      scale: 2,
    });
    this.addChild(shadow);

    const body = new Sprite({
      resource: resources.images.body,
      position: this.position,
      scale: 1,
    });

    this.addChild(body);
    this.speed = 2;
  }

  draw(ctx) {
    super.draw(ctx);
    this.children.forEach((child) => child.draw(ctx));
  }

  update() {
    if (this.game.input.lastKey === UP) {
      this.position.y -= this.speed;
    } else if (this.game.input.lastKey === DOWN) {
      this.position.y += this.speed;
    } else if (this.game.input.lastKey === LEFT) {
      this.position.x -= this.speed;
    } else if (this.game.input.lastKey === RIGHT) {
      this.position.x += this.speed;
    }
  }
}
