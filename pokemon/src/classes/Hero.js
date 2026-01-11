import { Vector2 } from "../utils/vector2.js";
import { GameObject } from "./GameObjects.js";
import { Sprite } from "./Sprite.js";
import { resources } from "./resources.js";
import { RIGHT, UP, DOWN, LEFT, ATTACK } from "../../Input.js";

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

    this.body = new Sprite({
      resource: resources.images.body,
      position: this.position,
      scale: 3,
      VFrames: 4,
      hFrames: 7,
      currentFrame: 0,
      animations: {
        walkDown: { x: 0, y: 0, width: 16, height: 16, frameCount: 4 },
        walkUp: { x: 16, y: 0, width: 16, height: 16, frameCount: 4 },
        walkRight: { x: 48, y: 0, width: 16, height: 16, frameCount: 4 },
        walkLeft: { x: 32, y: 0, width: 16, height: 16, frameCount: 4 },

        attackDown: { x: 0, y: 64, width: 16, height: 16, frameCount: 1 },
        attackUp: { x: 16, y: 64, width: 16, height: 16, frameCount: 1 },
        attackLeft: { x: 32, y: 64, width: 16, height: 16, frameCount: 1 },
        attackRight: { x: 48, y: 64, width: 16, height: 16, frameCount: 1 },
      },
    });
    this.body.currentSprite = this.body.animations.walkDown;

    this.addChild(this.body);

    // WEAAAPON
    this.weapon = new Sprite({
      resource: resources.images.weapon2,
      position: new Vector2(0, 0),
      scale: 3,
    });

    this.weaponOffsets = {
      DOWN: { x: -5, y: -20, angle: 0, zIndex: -1 }, // Vẽ đè lên người
      UP: { x: 10, y: -5, angle: 180, zIndex: 1 }, // Vẽ sau lưng
      LEFT: { x: 15, y: -5, angle: -90, zIndex: 1 },
      RIGHT: { x: -15, y: -5, angle: 90, zIndex: 1 },
    };
    // this.addChild(this.weapon);

    this.facingDirection = DOWN;

    this.isAttacking = false;
    this.attackDuration = 100;
    this.attackElapsed = 0;

    this.speed = 4;
  }

  draw(ctx) {
    // draw debug
    super.draw(ctx);
    // draw children

    if (this.weaponOffsets[this.facingDirection].zIndex == -1) {
      this.drawWeapon(ctx);
    }
    this.children.forEach((child) => child.draw(ctx));

    if (this.weaponOffsets[this.facingDirection].zIndex == 1) {
      this.drawWeapon(ctx);
    }
  }

  drawWeapon(ctx) {
    // find offsetwebpon
    const offset = this.weaponOffsets[this.facingDirection];
    ctx.save();
    ctx.translate(this.position.x + offset.x, this.position.y + offset.y);
    // ctx.rotate((offset.angle * Math.PI) / 100);
    this.weapon.draw(ctx);
    ctx.restore();
  }

  attack() {
    if (!this.isAttacking) {
      this.body.currentFrame = 0;
      this.isAttacking = true;
      console.log("ATTACK!!!!");

      switch (this.facingDirection) {
        case UP:
          this.body.currentSprite = this.body.animations.attackUp;
          break;

        case DOWN:
          this.body.currentSprite = this.body.animations.attackDown;
          break;

        case RIGHT:
          this.body.currentSprite = this.body.animations.attackRight;
          break;

        case LEFT:
          this.body.currentSprite = this.body.animations.attackLeft;
          break;
      }
    }
  }

  resetSprite() {
    switch (this.facingDirection) {
      case UP:
        this.body.currentSprite = this.body.animations.walkUp;
        break;
      case DOWN:
        this.body.currentSprite = this.body.animations.walkDown;
        break;
      case LEFT:
        this.body.currentSprite = this.body.animations.walkLeft;
        break;
      case RIGHT:
        this.body.currentSprite = this.body.animations.walkRight;
        break;
    }
  }

  update(deltaTime) {
    this.children.forEach((child) => child.update(deltaTime));

    // handle attack time
    if (this.isAttacking && this.attackElapsed < this.attackDuration) {
      this.attackElapsed += deltaTime;
      console.log(this.attackElapsed);
      // qua thoi gian thi rest
    } else if (this.isAttacking && this.attackElapsed >= this.attackDuration) {
      this.isAttacking = false;
      this.attackElapsed = 0;
      // reset sprite
      this.resetSprite();
    }
    // handle inpput

    if (this.game.input.lastKey === UP) {
      this.facingDirection = UP;
      this.position.y -= this.speed;
      this.body.currentSprite = this.body.animations.walkUp;
      this.body.currentSprite.frameCount = 4;
    } else if (this.game.input.lastKey === DOWN) {
      this.facingDirection = DOWN;
      this.position.y += this.speed;
      console.log(this.position.y);

      this.body.currentSprite = this.body.animations.walkDown;
      this.body.currentSprite.frameCount = 4;
    } else if (this.game.input.lastKey === LEFT) {
      this.facingDirection = LEFT;
      this.position.x -= this.speed;
      this.body.currentSprite = this.body.animations.walkLeft;
      this.body.currentSprite.frameCount = 4;
    } else if (this.game.input.lastKey === RIGHT) {
      this.facingDirection = RIGHT;
      this.body.currentSprite = this.body.animations.walkRight;
      this.position.x += this.speed;
      this.body.currentSprite.frameCount = 4;
    } else if (this.game.input.lastKey === ATTACK) {
      this.attack();
    } else {
      this.body.currentSprite.frameCount = 1;
    }

    // update this.center

    this.center = {
      x: this.position.x + this.body.width / 2,
      y: this.position.y + this.body.height / 2,
    };
  }
}
