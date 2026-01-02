export class Sprite {
  constructor({
    position,
    imageSrc,
    frameRate = 1,
    frameBuffer = 5,
    scale = 1,
  }) {
    this.frameRate = frameRate;
    this.scale = scale;
    this.position = position;
    this.image = new Image();
    this.image.onload = () => {
      this.width = (this.image.width / this.frameRate) * this.scale;
      this.height = this.image.height * this.scale;
    };
    this.image.src = imageSrc;
    this.currentFrame = 0;
    this.frameBuffer = frameBuffer;
    this.elapsedFrames = 0;
  }

  draw(ctx) {
    if (!this.image) return;

    const cropBox = {
      position: {
        x: (this.currentFrame * this.image.width) / this.frameRate,
        y: 0,
      },
      width: this.image.width / this.frameRate,
      height: this.image.height,
    };

    ctx.drawImage(
      this.image,
      cropBox.position.x,
      cropBox.position.y,
      cropBox.width,
      cropBox.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update(ctx) {
    this.draw(ctx);
    this.updateFrame();
  }

  updateFrame() {
    // count frame troi qua (ham requestAnimation 60frames/s)
    this.elapsedFrames++;

    if (this.elapsedFrames % this.frameBuffer == 0) {
      if (this.currentFrame < this.frameRate - 1) this.currentFrame++;
      else this.currentFrame = 0;
    }
  }
}
