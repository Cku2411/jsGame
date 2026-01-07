import { Vector2 } from "../utils/vector2.js";
import { GameObject } from "./GameObjects.js";
import { Sprite } from "./Sprite.js";
import { resources } from "./resources.js";

export class Hero extends GameObject {
  constructor({ position }) {
    // 1. Gọi constructor của cha để set vị trí
    super({ position: new Vector2(position.x, position.y) });

    // 2. TẠO HÌNH ẢNH (Composition)
    // Hero "sở hữu" cái bóng
    this.shadow = new Sprite({
      resource: resources.images.shadow,
      position: this.position,
    });
  }
}
