import { Sprite } from "./Sprite.js";

export class GameObject {
  constructor({ position, Imgsrc, animations, currentAnimation, direction }) {
    this.position = position || { x: 0, y: 0 };
    this.direction = direction || "down";
    this.sprite = new Sprite({
      gameObject: this,
      animations,
      currentAnimation,
      Imgsrc: Imgsrc || "./img/characters/people/hero.png",
    });

    this.isReady = false;
  }

  ready(map) {
    this.isReady = true;
    // add collison for all objects
    map.addWall(this.position.x, this.position.y);
  }

  update() {}
}
