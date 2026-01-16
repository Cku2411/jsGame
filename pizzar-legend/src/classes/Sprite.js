export class Sprite {
  constructor({
    gameObject,
    animations,
    currentAnimation,
    Imgsrc,
    animationFrameLimit,
  }) {
    // Setup the image
    this.image = new Image();
    this.image.src = Imgsrc;
    this.image.onload = () => {
      this.isLoaded = true;
    };

    // shadow
    this.shadow = new Image();
    this.shadow.src = "./img/characters/shadow.png";
    this.shadow.onload = () => {
      this.isShadowLoaded = true;
    };

    this.useShadow = true;

    // Config Animation and Initial State
    this.animations = animations || {
      "idle-down": [[0, 0]],
      "walk-down": [
        [1, 0],
        [0, 0],
        [3, 0],
        [0, 0],
      ],
      "walk-up": [
        [1, 2],
        [0, 2],
        [3, 2],
        [0, 2],
      ],
      "walk-right": [
        [1, 1],
        [0, 1],
        [3, 1],
        [0, 1],
      ],
      "walk-left": [
        [1, 3],
        [0, 3],
        [3, 3],
        [0, 3],
      ],
    };

    this.currentAnimation = currentAnimation || "idle-down";
    this.currentAnimationFrame = 0;

    this.animationFrameLimit = animationFrameLimit || 16;
    this.animationFrameProgress = this.animationFrameLimit;

    // Reference the game Object
    this.gameObject = gameObject;
  }

  get frame() {
    return this.animations[this.currentAnimation][this.currentAnimationFrame];
  }

  setAnimation(key) {
    if (this.currentAnimation !== key) {
      this.currentAnimation = key;
      // reset the frame
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
    }
  }

  draw(ctx) {
    const x = this.gameObject.position.x - 8;
    const y = this.gameObject.position.y - 18;
    this.isShadowLoaded && this.useShadow && ctx.drawImage(this.shadow, x, y);

    const [frameX, frameY] = this.frame;

    this.isLoaded &&
      ctx.drawImage(this.image, frameX * 32, frameY * 32, 32, 32, x, y, 32, 32);

    this.updateAnimationProgress();
  }

  updateAnimationProgress() {
    // Downtick frame progress (countdonw 16frame)
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1;
      return;
    }

    // reset the counter this.animationFrameProgress =16
    this.animationFrameProgress = this.animationFrameLimit;
    this.currentAnimationFrame += 1;

    if (this.frame === undefined) {
      this.currentAnimationFrame = 0;
    }
  }
}
