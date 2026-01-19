import { Sprite } from "./Sprite.js";
import { OverWorldEvent } from "./OverWorldEvent.js";

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
    }, 10);
  }

  async doBehaviorEvent(map) {
    if (map.isCuttingScenePlaying || this.behaviorLoop.length == 0) {
      return;
    }

    // get the event from behavior

    // type EventConfig : {who: string, type: string, direction: string, time: number}

    let eventConfig = this.behaviorLoop[this.behaviorIndex];
    eventConfig.who = this.id;

    const evenHandler = new OverWorldEvent({ map, eventConfig });
    await evenHandler.init();

    // done, move to next event
    this.behaviorIndex += 1;
    if (this.behaviorIndex === this.behaviorLoop.length) {
      this.behaviorIndex = 0; //reset index
    }

    // do it again
    this.doBehaviorEvent(map);
  }

  update() {}
}
