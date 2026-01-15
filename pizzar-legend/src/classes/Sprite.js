export class Sprite {
  constructor({ gameObject, animations, currentAnimation, Imgsrc }) {
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
      idleDown: [0, 0],
    };

    this.currentAnimation = currentAnimation || "idleDown";
    this.currentAnimationFrame = 0;

    // Reference the game Object
    this.gameObject = gameObject;
  }

  draw(ctx) {
    const x = this.gameObject.position.x * 16 - 8;
    const y = this.gameObject.position.y * 16 - 18;

    this.isShadowLoaded && this.useShadow && ctx.drawImage(this.shadow, x, y);

    this.isLoaded && ctx.drawImage(this.image, 0, 0, 32, 32, x, y, 32, 32);
  }
}
