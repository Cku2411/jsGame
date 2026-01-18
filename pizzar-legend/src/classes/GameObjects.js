import { Sprite } from "./Sprite.js";

export class GameObject {
  constructor({
    position,
    Imgsrc,
    animations,
    currentAnimation,
    direction,
    behaviorLoop,
  }) {
    this.id = null;
    this.position = position || { x: 0, y: 0 };
    this.direction = direction || "down";
    this.sprite = new Sprite({
      gameObject: this,
      animations,
      currentAnimation,
      Imgsrc: Imgsrc || "./img/characters/people/hero.png",
    });

    this.behaviorLoop = behaviorLoop || [];
    this.behaviorIndex = 0;
    this.isReady = false;
  }

  ready(map) {
    this.isReady = true;
    // add collison for all objects
    map.addWall(this.position.x, this.position.y);

    // if we have behavior?, kick off
    setTimeout(() => {
      this.doBehaviorEvent(map);
    });
  }

  doBehaviorEvent(map) {
    // get the event from behavior
    let event = this.behaviorLoop[this.behaviorIndex];
    // event.who = this.id;
  }

  update() {}
}
