import { isCollision, isPlatFormCollision } from "../util";
import { Sprite } from "./Sprite";

export class Player extends Sprite {
  constructor({
    position,
    collisionBlocks,
    platFormCollisionBlocks,
    imageSrc,
    animations,
    frameRate,
    scale = 0.5,
  }) {
    super({ imageSrc, frameRate, scale });
    this.position = position;
    this.velocity = { x: 0, y: 1 };

    this.hitbox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 14,
      height: 27,
    };

    this.prevY = this.hitbox.position.y;

    this.collisionBlocks = collisionBlocks;
    this.platFormCollisionBlocks = platFormCollisionBlocks;
    this.animations = animations;
    // store the last direction
    this.lastDirection = "right";

    // tao Image object va gan cho this.animations[]
    for (let key in this.animations) {
      const image = new Image();
      image.src = this.animations[key].imageSrc;
      this.animations[key].image = image;
    }

    this.cameraBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 200,
      height: 80,
    };
  }

  switchSprite(key) {
    if (this.image === this.animations[key].image || !this.loaded) return;
    // reset currentFrame
    this.currentFrame = 0;
    this.image = this.animations[key].image;
    this.frameBuffer = this.animations[key].frameBuffer;
    this.frameRate = this.animations[key].frameRate;
  }

  updateCameraBox() {
    this.cameraBox = {
      position: {
        x: this.position.x + this.width / 2 - this.cameraBox.width / 2,
        y: this.position.y + this.height / 2 - this.cameraBox.height / 2,
      },
      width: 200,
      height: 80,
    };
  }

  shouldPanCameraToTheLeft({ camera, canvas }) {
    const cameraBoxRightSide = this.cameraBox.position.x + this.cameraBox.width;

    if (cameraBoxRightSide >= 576) return;

    if (cameraBoxRightSide >= canvas.width / 4 + Math.abs(camera.position.x)) {
      camera.position.x -= this.velocity.x;
    }
  }

  shouldPanCameraToTheRight({ camera, canvas }) {
    if (this.cameraBox.position.x <= 0) return;
    if (this.cameraBox.position.x <= Math.abs(camera.position.x)) {
      camera.position.x -= this.velocity.x;
    }
  }

  shouldPanCameraUp({ camera, canvas }) {
    if (this.cameraBox.position.y + this.velocity.y <= 0) return;
    if (this.cameraBox.position.y <= Math.abs(camera.position.y)) {
      camera.position.y -= this.velocity.y;
    }
  }

  shouldPanCameraDown({ camera, canvas }) {
    if (
      this.cameraBox.position.y + this.cameraBox.height + this.velocity.y >=
      432
    )
      return;
    if (
      this.cameraBox.position.y + this.cameraBox.height >
      Math.abs(camera.position.y) + canvas.height / 4
    ) {
      camera.position.y -= this.velocity.y;
    }
  }

  update(ctx, gravity, canvas) {
    this.updateFrame();
    this.updateHitbox();
    // update camera follow player
    this.updateCameraBox();
    this.prevY = this.hitbox.position.y;

    // // Draw camera
    // ctx.fillStyle = "rgba(0,0,255,0.2";
    // ctx.fillRect(
    //   this.cameraBox.position.x,
    //   this.cameraBox.position.y,
    //   this.cameraBox.width,
    //   this.cameraBox.height
    // );

    // // ===
    // // draw out the rectangel
    // ctx.fillStyle = "rgba(0,255,0,0.2";
    // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    // // draw out the hitBox
    // ctx.fillStyle = "rgba(255,0,0,0.2";
    // ctx.fillRect(
    //   this.hitbox.position.x,
    //   this.hitbox.position.y,
    //   this.hitbox.width,
    //   this.hitbox.height
    // );
    // // ===

    this.draw(ctx);
    this.position.x += this.velocity.x;
    this.updateHitbox();
    this.checkforHorizontalCollisions(canvas);
    this.applyGravity(gravity);
    this.updateHitbox();
    this.checkforVerticalCollisions();
  }

  updateHitbox() {
    this.hitbox = {
      position: {
        x: this.position.x + 35,
        y: this.position.y + 26,
      },
      width: 14,
      height: 27,
    };
  }

  applyGravity(gravity) {
    this.position.y += this.velocity.y;
    this.velocity.y += gravity;
  }

  checkforHorizontalCollisions(canvas) {
    // check collision with canvasa
    if (this.hitbox.position.x + this.velocity.x <= 0) {
      this.velocity.x = 0;

      const offset = this.hitbox.position.x - this.position.x;
      this.position.x = -(this.hitbox.position.x - this.position.x) - 0.01;
    } else if (
      this.hitbox.position.x + this.hitbox.width + this.velocity.x >=
      576
    ) {
      this.velocity.x = 0;

      const offset =
        this.hitbox.position.x + this.hitbox.width - this.position.x;
      this.position.x = 576 - offset - 0.01;
    }

    // loop through collision block to detect collisions
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (isCollision({ object1: this.hitbox, object2: collisionBlock })) {
        // if detect collision, stop velocity
        if (this.velocity.x > 0) {
          this.velocity.x = 0;

          const offset =
            this.hitbox.position.x + this.hitbox.width - this.position.x;
          this.position.x = collisionBlock.position.x - offset - 0.01;
          break;
        }
        if (this.velocity.x < 0) {
          this.velocity.x = 0;
          const offset = this.hitbox.position.x - this.position.x;
          this.position.x =
            collisionBlock.position.x + collisionBlock.width - offset + 0.01;
          break;
        }
      }
    }
  }

  checkforVerticalCollisions() {
    // loop through collision block to detect collisions
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (isCollision({ object1: this.hitbox, object2: collisionBlock })) {
        // if detect collision, stop velocity
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          const offset =
            this.hitbox.position.y - this.position.y + this.hitbox.height;
          this.position.y = collisionBlock.position.y - offset - 0.01;
          break;
        }
        if (this.velocity.y < 0) {
          this.velocity.y = 0;

          const offset = this.hitbox.position.y - this.position.y;

          this.position.y =
            collisionBlock.position.y + collisionBlock.height - offset + 0.01;
          break;
        }
      }
    }

    // PlatFormCollisionBlock
    for (let i = 0; i < this.platFormCollisionBlocks.length; i++) {
      const platFormCollisionBlock = this.platFormCollisionBlocks[i];

      if (
        isPlatFormCollision({
          object1: this.hitbox,
          object2: platFormCollisionBlock,
          prevY: this.prevY,
        })
      ) {
        // if detect collision, stop velocity
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          const offset =
            this.hitbox.position.y - this.position.y + this.hitbox.height;
          this.position.y = platFormCollisionBlock.position.y - offset - 0.01;
          break;
        }
      }
    }
  }
}
