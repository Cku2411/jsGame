import { GameObject } from "../../GameObject";
import { Vector2 } from "../../vector2";
import { Sprite } from "../../sprite";
import { resources } from "../../resoures";
import { events } from "../../Event";

export class Rod extends GameObject {
  constructor(x, y) {
    super({
      position: new Vector2(x, y),
    });

    const rodSprite = new Sprite({
      resource: resources.images.rod,
      position: new Vector2(0, -5),
    });

    this.addChild(rodSprite);
  }

  ready() {
    console.log("ROD is READY");

    //
    events.on("HERO_POSITION", this, (pos) => {
      const roundedHeroX = Math.round(pos.x);
      const roundedHeroY = Math.round(pos.y);
      if (
        roundedHeroX === this.position.x &&
        roundedHeroY === this.position.y
      ) {
        this.onCollideWithHero();
      }
    });
  }

  onCollideWithHero() {
    // Remove this instance from the scene
    this.destroy();

    // Alert other things that we picked up a rod
    events.emit("HERO_PICKS_UP_ITEM", {
      image: resources.images.rod,
      position: this.position,
    });
  }
}

export class Gold extends GameObject {
  constructor(x, y) {
    super({
      position: new Vector2(x, y),
    });

    const sprite = new Sprite({
      resource: resources.images.gold,
      position: new Vector2(1, -5),
    });

    this.addChild(sprite);

    // get heroposition
    events.on("HERO_POSITION", this, (pos) => {
      // detect overlap

      const roundedHeroX = Math.round(pos.x);
      const roundedHeroY = Math.round(pos.y);

      if (
        roundedHeroX === this.position.x &&
        roundedHeroY === this.position.y
      ) {
        // overlap
        console.log("OVERLAP");
        this.onCollideWithHero();
      }
    });
  }

  onCollideWithHero() {
    // Remove this instance from the scene
    this.destroy();

    // Alert other things that we picked up a rod
    events.emit("HERO_PICKS_UP_ITEM", {
      image: resources.images.gold,
      position: this.position,
    });
  }
}
