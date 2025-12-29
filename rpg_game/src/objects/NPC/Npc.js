import { GameObject } from "../../GameObject";
import { Vector2 } from "../../vector2";
import { Sprite } from "../../sprite";
import { resources } from "../../resoures";

export class Npc extends GameObject {
  constructor(x, y) {
    super({
      position: new Vector2(x, y),
    });

    this.isSolid = true;

    // Shadown under feet
    const shadow = new Sprite({
      resource: resources.images.shadow,
      frameSize: new Vector2(32, 32),
      position: new Vector2(-8, -20),
    });

    this.addChild(shadow);

    // body sprite
    const body = new Sprite({
      resource: resources.images.knight,
      frameSize: new Vector2(32, 32),
      hFrames: 2,
      VFrames: 1,
      position: new Vector2(-8, -20),
    });

    this.addChild(body);
  }
}
