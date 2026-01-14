import { Vector2 } from "../utils/vector2.js";
import { GameObject } from "./GameObjects.js";
import { Sprite } from "./Sprite.js";
import { resources } from "./resources.js";

export class Monster extends GameObject {
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
      VFrames: 4,
      hFrames: 4,
      currentFrame: 0,
      animations: {
        walkDown: { x: 0, y: 0, width: 16, height: 16, frameCount: 4 },
        walkUp: { x: 16, y: 0, width: 16, height: 16, frameCount: 4 },
        walkRight: { x: 48, y: 0, width: 16, height: 16, frameCount: 4 },
        walkLeft: { x: 32, y: 0, width: 16, height: 16, frameCount: 4 },
      },
    });

    this.addChild(this.body);

    this.originalPosition = new Vector2(position.x, position.y);

    // Damage options
    this.hitbox = {
      position: this.position,
      width: this.body.width,
      height: this.body.height,
    };

    this.maxHealth = 100;
    this.health = this.maxHealth;
    this.isHitted = false;
    this.invincible = false;
    this.hitCooldown = 1000;
    this.hitElapsed = 0;
    this.isDead = false;

    // setup patrolling
    this.patrolRadius = 100;
    this.moveTarget = null;
    this.isWaiting = true;
    this.waitDuration = 2000;
    this.waitTime = 0;

    this.speed = 1.5;
  }

  draw(ctx) {
    // draw debug
    if (this.invincible) {
      // hiệu ứng blink
      const blinkInterval = 50;
      const blinkOn = Math.floor(this.hitElapsed / blinkInterval) % 2 == 0;

      // alpha giamr daan
      const alphaProgress = 1 - this.hitElapsed / this.hitCooldown;

      ctx.save();
      ctx.globalAlpha = blinkOn ? alphaProgress : 0;
    }
    super.draw(ctx);
    this.children.forEach((child) => child.draw(ctx));

    if (this.invincible) {
      ctx.restore();
    }

    // (Debug) Vẽ vùng tuần tra để dễ nhìn
    if (this.game.debug) {
      ctx.strokeStyle = "rgba(0,0,0,0.5)";
      ctx.beginPath();
      ctx.arc(
        this.originalPosition.x,
        this.originalPosition.y,
        this.patrolRadius,
        0,
        Math.PI * 2
      );
      ctx.stroke();
    }
  }

  receiveDamage(damage) {
    // neu chua dinh doan thi return
    // if (!this.isHitted) return;

    // distract and change state

    this.isHitted = true;
    if (!this.invincible) {
      this.health -= damage;
    }
    console.log("MONSTER HEALT: ", this.health);

    if (this.health <= 0) {
      this.die();
    }
  }

  die() {
    console.log("Monster died");
    this.isDead = true;
  }

  update(deltaTime) {
    this.children.forEach((child) => child.update(deltaTime));
    this.randomMove(deltaTime);

    // handle get hitted
    this.hitbox.position = this.position;
    if (this.isHitted) {
      this.hitElapsed += deltaTime;
      this.invincible = true;
      if (this.hitElapsed >= this.hitCooldown) {
        this.isHitted = false;
        this.invincible = false;
        // reset
        this.hitElapsed = 0;
      }
    }
  }

  pickRandomTarget() {
    const randomAngle = Math.random() * Math.PI * 2;
    this.moveTarget = {
      x: this.originalPosition.x + Math.cos(randomAngle) * this.patrolRadius,
      y: this.originalPosition.y + Math.sin(randomAngle) * this.patrolRadius,
    };
  }

  randomMove(deltaTime) {
    if (this.isWaiting) {
      this.waitTime += deltaTime;
      if (this.waitTime > this.waitDuration) {
        this.isWaiting = false;
        this.waitTime = 0;
        this.pickRandomTarget();
      }

      return;
    }

    if (this.moveTarget) {
      const deltaX = this.moveTarget.x - this.position.x;
      const deltaY = this.moveTarget.y - this.position.y;
      const hypotenuse = Math.hypot(deltaX, deltaY);

      const normalizedDeltaX = deltaX / hypotenuse;
      const normalizedDeltaY = deltaY / hypotenuse;

      // // toc do can de di den y
      if (hypotenuse < this.speed) {
        this.position.x = this.moveTarget.x;
        this.position.y = this.moveTarget.y;
        this.moveTarget = null;
        this.isWaiting = true;
      } else {
        const moveDistance = Math.min(this.speed, hypotenuse);
        this.position.x += normalizedDeltaX * moveDistance;
        this.position.y += normalizedDeltaY * moveDistance;
      }

      // Update Animations
      this.updateAnimation(normalizedDeltaX, normalizedDeltaY);
    }
  }

  updateAnimation(deltaX, deltaY) {
    if (!this.body || !this.body.animations) return;

    // so sanh deltaX va deltaY, cai nao lon hon thi di chuyen trc
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // di chuyen ngang trc
      if (deltaX > 0) {
        this.body.currentSprite = this.body.animations.walkRight;
      } else {
        this.body.currentSprite = this.body.animations.walkLeft;
      }
    } else {
      if (deltaY > 0) {
        this.body.currentSprite = this.body.animations.walkDown;
      } else {
        this.body.currentSprite = this.body.animations.walkUp;
      }
    }

    if (this.isWaiting) {
      this.body.currentSprite = this.body.animations.walkDown;
    }
  }
}
