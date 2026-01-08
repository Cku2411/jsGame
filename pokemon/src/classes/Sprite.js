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
  }) {
    super({});
    this.position = position;
    this.resource = resource;
    this.scale = scale ?? 1;

    this.frameSize = frameSize ?? {
      x: this.resource.image.width / this.VFrames,
      y: this.resource.image.height / this.hFrames,
    };
    this.frameMap = new Map(); //store the frmae

    this.hFrames = hFrames ?? 1;
    this.VFrames = VFrames ?? 1;
    this.currentFrame = currentFrame ?? 0;

    this.width = (this.resource.image.width / this.VFrames) * this.scale;
    this.height = (this.resource.image.height / this.hFrames) * this.scale;
    this.halfWidth = this.width / 2;
    this.buildFrameMap();

    console.log(this.frameMap);
  }

  draw(ctx) {
    if (!this.resource.isLoaded) {
      return;
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

    // draw sprite
    ctx.drawImage(
      this.resource.image,
      cropBox.height * this.currentFrame,
      cropBox.height * this.currentFrame,
      cropBox.width,
      cropBox.height,
      this.position.x + HALF_TILE - this.halfWidth,
      this.position.y + TILE_SIZE - this.height,
      this.width,
      this.height
    );
  }

  buildFrameMap() {
    // get frame from image
    let frameCount = 0;
    // start with vertical frame  (y)
    for (let v = 0; v < this.VFrames; v++) {
      //   loop horizontal frame
      for (let h = 0; h < this.hFrames; h++) {
        // store in frame map
        this.frameMap.set(
          frameCount,
          new Vector2(this.frameSize.x * h, this.frameSize.y * v)
        );
        frameCount++;
      }
    }
  }

  update(ctx) {
    this.draw(ctx);
    // this.updateFrame();
  }

  // updateFrame() {
  //   // count frame troi qua (ham requestAnimation 60frames/s)
  //   this.elapsedFrames++;

  //   if (this.elapsedFrames % this.frameBuffer == 0) {
  //     if (this.currentFrame < this.frameRate - 1) this.currentFrame++;
  //     else this.currentFrame = 0;
  //   }
  // }

  swichFrame() {}
}
