import { Vector2 } from "../utils/vector2.js";
import { GameObject } from "./GameObjects.js";
import { Sprite } from "./Sprite.js";
import { resources } from "./resources.js";
import { RIGHT, UP, DOWN, LEFT } from "../../Input.js";

export class Ninja extends GameObject {
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

    this.body = new Sprite({
      resource: resources.images.ninja,
      position: this.position,
      scale: 3,
      VFrames: 4,
      hFrames: 7,
      currentFrame: 0,
      currentSprite: { x: 0, y: 0, width: 16, height: 16, frameCount: 4 },
      animations: {
        walkDown: { x: 0, y: 0, width: 16, height: 16, frameCount: 4 },
        walkUp: { x: 16, y: 0, width: 16, height: 16, frameCount: 4 },
        walkRight: { x: 48, y: 0, width: 16, height: 16, frameCount: 4 },
        walkLeft: { x: 32, y: 0, width: 16, height: 16, frameCount: 4 },
      },
    });

    this.addChild(this.body);
    this.speed = 4;
  }

  draw(ctx) {
    // draw debug
    super.draw(ctx);
    // draw children
    this.children.forEach((child) => child.draw(ctx));
  }

  update(deltaTime) {
    this.children.forEach((child) => child.update(deltaTime));

    // if (this.game.input.lastKey === UP) {
    //   this.position.y -= this.speed;
    //   this.body.currentSprite = this.body.animations.walkUp;
    //   this.body.currentSprite.frameCount = 4;
    // } else if (this.game.input.lastKey === DOWN) {
    //   this.position.y += this.speed;
    //   this.body.currentSprite = this.body.animations.walkDown;
    //   this.body.currentSprite.frameCount = 4;
    // } else if (this.game.input.lastKey === LEFT) {
    //   this.position.x -= this.speed;
    //   this.body.currentSprite = this.body.animations.walkLeft;
    //   this.body.currentSprite.frameCount = 4;
    // } else if (this.game.input.lastKey === RIGHT) {
    //   this.body.currentSprite = this.body.animations.walkRight;
    //   this.position.x += this.speed;
    //   this.body.currentSprite.frameCount = 4;
    // } else {
    //   this.body.currentSprite.frameCount = 1;
    // }

    // // update this.center

    // this.center = {
    //   x: this.position.x + this.body.width / 2,
    //   y: this.position.y + this.body.height / 2,
    // };
  }
}
