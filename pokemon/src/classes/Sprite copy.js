import { TILE_SIZE, HALF_TILE } from "../main.js";
import { Vector2 } from "../utils/vector2.js";
import { GameObject } from "./GameObjects.js";

export class Sprite extends GameObject {
  constructor({
    position,
    resource,
    frameSize,
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

    this.animations = animations ?? null;

    // Initialize dimensions - will be calculated when image loads
    // For now, use default values or calculate if image is already loaded

    this.width = (this.resource.image.width / this.VFrames) * this.scale;
    this.height = (this.resource.image.height / this.hFrames) * this.scale;
    this.frameSize = frameSize ?? {
      x: this.resource.image.width / this.VFrames,
      y: this.resource.image.height / this.hFrames,
    };

    this.frameMap = new Map(); //store the frmae
    this.halfWidth = this.width / 2;
    this.elaspedTime = 0;
    this.currentSprite = currentSprite ?? null;
  }

  draw(ctx) {
    if (!this.resource.isLoaded) {
      return;
    }

    // Update dimensions if they weren't set correctly during construction
    if (this.resource.image.width > 0 && this.resource.image.height > 0) {
      this.width = (this.resource.image.width / this.VFrames) * this.scale;
      this.height = (this.resource.image.height / this.hFrames) * this.scale;
      this.halfWidth = this.width / 2;
    }

    // create CropBox
    const cropBox = {
      position: {
        x: 0,
        y: 0,
      },
      width: this.resource.image.width / this.VFrames,
      height: this.resource.image.height / this.hFrames,
    };

    // // // draw out the rectangel
    // ctx.fillStyle = "rgba(0,255,0,0.2";
    // ctx.fillRect(
    //   this.position.x + HALF_TILE - this.halfWidth,
    //   this.position.y + TILE_SIZE - this.height,
    //   this.width,
    //   this.height
    // );

    if (!this.animations) {
      ctx.drawImage(
        this.resource.image,
        this.position.x + HALF_TILE - this.halfWidth,
        this.position.y + TILE_SIZE - this.height,
        this.width,
        this.height
      );
    } else {
      // draw sprite
      ctx.drawImage(
        this.resource.image,
        this.currentSprite.x,
        this.currentSprite.y +
          (this.currentSprite.height * this.currentFrame + 0.5),
        this.currentSprite.width,
        this.currentSprite.height,
        this.position.x + HALF_TILE - this.halfWidth,
        this.position.y + TILE_SIZE - this.height,
        this.width,
        this.height
      );
    }
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

  // updateFrame(deltaTime) {
  //   // count frame troi qua (ham requestAnimation 60frames/s)
  //   this.elapsedFrames += deltaTime;

  //   if (this.elapsedFrames % this.frameBuffer == 0) {
  //     if (this.currentFrame < this.frameRate - 1) this.currentFrame++;
  //     else this.currentFrame = 0;
  //   }
  // }
}
