import { Sprite } from "./Sprite.js";

export class GameObject {
  constructor({ position, Imgsrc, animations, currentAnimation }) {
    this.position = position || { x: 0, y: 0 };
    this.sprite = new Sprite({
      gameObject: this,
      animations,
      currentAnimation,
      Imgsrc: Imgsrc || "./img/characters/people/hero.png",
    });
  }
}
