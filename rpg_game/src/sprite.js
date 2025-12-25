import { Vector2 } from "./vector2";

export class Sprite {
  constructor({
    resource, // image we want to draw
    frameSize, // size of the crop of the image [width, height]
    hFrames, // how the sprite arranged horizontally
    VFrames, // how the sprite arranged vertically
    frame, // which frame we want to show
    scale, // how large to draw this image
    position, // where to draw it [x, y]
    animations,
  }) {
    this.resource = resource;
    this.frameSize = frameSize ?? new Vector2(16, 16);
    this.hFrames = hFrames ?? 1;
    this.VFrames = VFrames ?? 1;
    this.frame = frame ?? 0;
    this.frameMap = new Map(); //store the frmae
    this.scale = scale ?? 1;
    this.position = position ?? new Vector2(0, 0);
    this.animations = animations ?? null;
    this.buildFrameMap();
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

  step(delta) {
    if (!this.animations) {
      return;
    }
    this.animations.step(delta);
    this.frame = this.animations.frame;
  }

  drawImage(ctx, x, y) {
    if (!this.resource.isLoaded) {
      return;
    }
    // find the correct sprite
    let frameCoordX = 0;
    let frameCoordY = 0;
    const frame = this.frameMap.get(this.frame);

    if (frame) {
      frameCoordX = frame.x;
      frameCoordY = frame.y;
    }

    const frameSizex = this.frameSize.x;
    const frameSizeY = this.frameSize.y;

    ctx.drawImage(
      this.resource.image, //image
      frameCoordX, //Top x corner of starting frame
      frameCoordY, // top y corne of frame
      frameSizex, //how much to crop from the sprite sheet
      frameSizeY,
      x, //where we want to draw in map (x)
      y,
      frameSizex * this.scale,
      frameSizeY * this.scale
    );
  }
}
