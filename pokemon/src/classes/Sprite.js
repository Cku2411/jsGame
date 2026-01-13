import { TILE_SIZE, HALF_TILE } from "../main.js";
import { Vector2 } from "../utils/vector2.js";
import { GameObject } from "./GameObjects.js";

export class Sprite extends GameObject {
  constructor({
    position,
    resource,
    direction,
    scale,
    hFrames, // how the sprite arranged horizontally
    VFrames, // how the sprite arranged vertically
    currentFrame, // which frame we want to fromStart
    animations,
    currentSprite,
  }) {
    super({ position: position });
    this.resource = resource;
    this.scale = scale ?? 1;

    this.hFrames = hFrames ?? 1;
    this.VFrames = VFrames ?? 1;
    this.currentFrame = currentFrame ?? 0;
    this.direction = direction ?? "vertical";

    this.animations = animations ?? {
      default: {
        x: 0,
        y: 0,
        width: this.resource.image.width / this.VFrames,
        height: this.resource.image.height / this.hFrames,
        frameCount: this.VFrames * this.hFrames,
      },
    };

    this.currentSprite = currentSprite
      ? this.animations[currentSprite]
      : this.animations[Object.keys(this.animations)[0]]; // Lấy cái đầu tiên (thường là 'default')

    // Kích thước hiển thị trên màn hình (Destination Size)
    this.width = 0;
    this.height = 0;
    this.elaspedTime = 0;
    this.halfWidth = this.width / 2;
  }

  updateDimensions() {
    if (!this.resource.isLoaded) {
      return;
    }

    if (!this.currentSprite.width) {
      this.currentSprite.width = this.resource.image.width / this.VFrames;
      this.currentSprite.height = this.currentSprite.width / this.hFrames;
    }

    // Kích thước vẽ ra màn hình (Destination Size) = Source * Scale
    this.width = this.currentSprite.width * this.scale;
    this.height = this.currentSprite.height * this.scale;
  }

  draw(ctx) {
    if (!this.resource.isLoaded) {
      return;
    }

    // Update dimensions if they weren't set correctly during construction

    this.updateDimensions();

    // TINH TOAN VIJ TRI CAT
    let frameX, frameY, destX, destY;
    if (this.direction == "vertical") {
      frameX = this.currentSprite.x;
      frameY =
        this.currentSprite.y +
        this.currentFrame * this.currentSprite.height +
        0.5;
    } else {
      frameX =
        this.currentSprite.x + this.currentFrame * this.currentSprite.width;
      frameY = this.currentSprite.y;
    }

    // TINH TOAN VIJ TRI VE

    destX = this.position.x + HALF_TILE - this.width / 2;
    destY = this.position.y + TILE_SIZE - this.height;

    // VE
    ctx.drawImage(
      this.resource.image,
      frameX,
      frameY,
      this.currentSprite.width,
      this.currentSprite.height,
      destX,
      destY,
      this.width,
      this.height
    );
  }

  update(deltaTime) {
    if (this.hFrames == 1 && this.VFrames == 1) return;
    if (!deltaTime) return;

    const interValToGoToNextFrame = 120;

    this.elaspedTime += deltaTime;
    if (this.elaspedTime > interValToGoToNextFrame) {
      this.currentFrame =
        (this.currentFrame + 1) % this.currentSprite.frameCount;
      this.elaspedTime -= interValToGoToNextFrame;
    }
  }

  setAnimation(key) {
    // chuyen frame khi current Frame k phai la frame can chuyen
    if (this.animations[key] && this.currentSprite !== this.animations[key]) {
      this.currentSprite = this.animations[key];
      this.currentFrame = 0; // Reset về frame đầu khi đổi hành động
      this.elaspedTime = 0;
    }
  }
}
