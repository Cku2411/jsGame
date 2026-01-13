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
      LEFT: { x: 15, y: -5, angle: -90, zIndex: -1 },
      RIGHT: { x: -15, y: -5, angle: 90, zIndex: -1 },
    };

    this.swingData = {
      // Chém từ trên cao bên phải xuống thấp bên trái
      UP: { startAngle: -120, endAngle: 45, pivotOffset: { x: 15, y: 12 } },
      // Chém ngược lại
      DOWN: { startAngle: 200, endAngle: 80, pivotOffset: { x: 28, y: 60 } },
      // Nhìn ngang: chém bổ từ trên xuống
      LEFT: { startAngle: 290, endAngle: 210, pivotOffset: { x: -10, y: 40 } },
      RIGHT: { startAngle: -30, endAngle: 60, pivotOffset: { x: 60, y: 40 } },
    };

    // this.addChild(this.weapon);

    this.attackBox = {
      position: {
        x: this.position.x + 48,
        y: this.position.y,
      },
      width: 48,
      height: 48,
    };

    this.facingDirection = DOWN;

    this.isAttacking = false;
    this.attackDuration = 100;
    this.attackElapsed = 0;

    this.speed = 4;

    // COMBAT
    this.health = 1000;
    this.getHitted = false;
    this.getHittedCoolDow = 500;
    this.getHittedElapsed = 0;
    this.invincible = false;
  }

  draw(ctx) {
    let alphaGlobal = this.getHitted ? 0.2 : 1;
    // draw debug
    super.draw(ctx);
    // draw children

    if (this.getHitted) {
      ctx.save();
      ctx.globalAlpha = alphaGlobal;
    }

    // // draw attackBox
    // ctx.fillStyle = "rgba(0,0,255, 0.4)";
    // ctx.fillRect(
    //   this.attackBox.position.x,
    //   this.attackBox.position.y,
    //   this.attackBox.width,
    //   this.attackBox.height
    // );

    if (this.isAttacking) {
      this.weaponOffsets.UP.zIndex = -1;
    }

    if (this.weaponOffsets[this.facingDirection].zIndex == -1) {
      this.drawWeapon(ctx);
    }
    this.children.forEach((child) => child.draw(ctx));

    if (this.weaponOffsets[this.facingDirection].zIndex == 1) {
      this.drawWeapon(ctx);
    }

    if (this.getHitted) {
      ctx.restore();
    }
  }

  drawWeapon(ctx) {
    // find offsetwebpon
    const offset = this.weaponOffsets[this.facingDirection];
    const swingInfo = this.swingData[this.facingDirection];

    if (!this.weapon.resource.isLoaded) return;

    if (this.isAttacking) {
      ctx.save();
      // 2. TÍNH TOÁN ĐIỂM TRỤC (PIVOT)
      // Điểm trục là vị trí cái tay cầm rìu.
      // Nó dựa trên vị trí Hero + vị trí cầm tĩnh + điều chỉnh nhỏ cho cú chém
      const pivotX = this.position.x + offset.x + swingInfo.pivotOffset.x;
      const pivotY = this.position.y + offset.y + swingInfo.pivotOffset.y;
      ctx.translate(pivotX, pivotY);
      let currentAngleDeg = swingInfo.startAngle;
      if (this.isAttacking) {
        const progress = this.attackElapsed / this.attackDuration;
        currentAngleDeg =
          swingInfo.startAngle +
          (swingInfo.endAngle - swingInfo.startAngle) * progress;
      }
      ctx.rotate((Math.PI / 2) * 0.5);
      // 4. XOAY CANVAS
      // Chuyển đổi độ sang radian
      ctx.rotate((currentAngleDeg * Math.PI) / 180);
      const weaponImg = this.weapon.resource.image;
      const w = this.weapon.width;
      const h = this.weapon.height;
      ctx.drawImage(weaponImg, -w / 2, -h * 0.8, w, h);
      // (Debug) Vẽ một chấm đỏ để biết điểm trục đang ở đâu
      ctx.fillStyle = "red";
      ctx.fillRect(-1, -1, 2, 2);

      ctx.restore();
    } else {
      ctx.save();
      ctx.translate(this.position.x + offset.x, this.position.y + offset.y);
      this.weapon.draw(ctx);
      ctx.restore();
    }
  }

  attack() {
    if (!this.isAttacking) {
      this.body.currentFrame = 0;
      this.isAttacking = true;
      console.log("ATTACK!!!!");

      switch (this.facingDirection) {
        case UP:
          this.body.setAnimation("attackUp");

          break;

        case DOWN:
          this.body.setAnimation("attackDown");

          break;

        case RIGHT:
          this.body.setAnimation("attackRight");

          break;

        case LEFT:
          this.body.setAnimation("attackLeft");

          break;
      }
    }
  }

  getHitedByEnemy(damage) {
    this.getHitted = true;
    if (!this.invincible) {
      this.health -= damage;
    }

    console.log("HERO HEALTH: ", this.health);
  }

  resetSprite() {
    switch (this.facingDirection) {
      case UP:
        this.body.setAnimation("walkUp");
        break;
      case DOWN:
        this.body.setAnimation("walkDown");
        break;
      case LEFT:
        this.body.setAnimation("walkLeft");

        break;
      case RIGHT:
        this.body.setAnimation("walkRight");

        break;
    }
  }

  update(deltaTime) {
    this.children.forEach((child) => child.update(deltaTime));

    if (this.getHitted) {
      this.getHittedElapsed += deltaTime;
      if (this.getHittedElapsed >= this.getHittedCoolDow) {
        this.getHitted = false;
        this.getHittedElapsed = 0;
      }
    }

    // handle attack time
    if (this.isAttacking && this.attackElapsed < this.attackDuration) {
      this.attackElapsed += deltaTime;
      // qua thoi gian thi rest
    } else if (this.isAttacking && this.attackElapsed >= this.attackDuration) {
      this.isAttacking = false;
      this.weaponOffsets.UP.zIndex = 1;
      this.attackElapsed = 0;
      // reset sprite
      this.resetSprite();
    }
    // handle inpput

    if (this.game.input.lastKey === UP) {
      this.facingDirection = UP;
      this.position.y -= this.speed;
      this.body.setAnimation("walkUp");
      this.body.currentSprite.frameCount = 4;
    } else if (this.game.input.lastKey === DOWN) {
      this.facingDirection = DOWN;
      this.position.y += this.speed;
      this.body.setAnimation("walkDown");
      this.body.currentSprite.frameCount = 4;
    } else if (this.game.input.lastKey === LEFT) {
      this.facingDirection = LEFT;
      this.position.x -= this.speed;
      this.body.setAnimation("walkLeft");
      this.body.currentSprite.frameCount = 4;
    } else if (this.game.input.lastKey === RIGHT) {
      this.facingDirection = RIGHT;
      this.body.setAnimation("walkRight");
      this.position.x += this.speed;
      this.body.currentSprite.frameCount = 4;
    } else if (this.game.input.lastKey === ATTACK) {
      this.attack();
    } else {
      this.body.currentSprite.frameCount = 1;
    }

    // Cập nhật attackBox dựa trên hướng hiện tại (luôn cập nhật, không chỉ khi di chuyển)
    switch (this.facingDirection) {
      case UP:
        this.attackBox.position.y = this.position.y - 24;
        this.attackBox.position.x = this.position.x;
        break;
      case DOWN:
        this.attackBox.position.y = this.position.y + 24;
        this.attackBox.position.x = this.position.x;
        break;
      case LEFT:
        this.attackBox.position.x = this.position.x - 24;
        this.attackBox.position.y = this.position.y;
        break;
      case RIGHT:
        this.attackBox.position.x = this.position.x + 24;
        this.attackBox.position.y = this.position.y;
        break;
    }

    // update this.center

    this.center = {
      x: this.position.x + this.body.width / 2,
      y: this.position.y + this.body.height / 2,
    };
  }
}
