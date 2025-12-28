import { GameObject } from "../../GameObject";
import { Vector2 } from "../../vector2";
import { resources } from "../../resoures";
import { Sprite } from "../../sprite";
import { events } from "../../Event";

export class Exit extends GameObject {
  constructor(x, y) {
    super({
      position: new Vector2(x, y),
    });

    this.addChild(
      new Sprite({
        resource: resources.images.exit,
      })
    );
  }

  ready() {
    events.on("HERO_POSITION", this, (pos) => {
      const roundedHeroX = Math.round(pos.x);
      const roundedHeroY = Math.round(pos.y);
      if (
        roundedHeroX === this.position.x &&
        roundedHeroY === this.position.y
      ) {
        console.log("HERO ENTER EXIT");
        events.emit("HERO_EXITS");
      }
    });
  }
}
