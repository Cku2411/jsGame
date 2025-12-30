import { GameObject } from "../../GameObject";
import { resources } from "../../resoures";
import { Sprite } from "../../sprite";
import { Vector2 } from "../../vector2";

export class SpriteTextString extends GameObject {
  constructor(str) {
    super({});
    const content = str ?? "Default text";

    // Creat background for text
    this.backdrop = new Sprite({
      resource: resources.images.textBox,
      frameSize: new Vector2(256, 64),
    });
  }

  drawImage(ctx, drawPosX, drawPosY) {
    this.backdrop.drawImage(ctx, drawPosX, drawPosY);
  }
}
