import { GameObject } from "../../GameObject";
import { Vector2 } from "../../vector2";
import { resources } from "../../resoures";
import { Sprite } from "../../sprite";
import { events } from "../../Event";

export class TextBox extends GameObject {
  constructor() {
    super({ position: new Vector2(32, 112) });

    this.content = "Hi. How are ya?";
    this.backdrop = new Sprite({
      resource: resources.images.textBox,
      frameSize: new Vector2(256, 64),
    });
  }

  drawImage(ctx, drawPosX, drawPosY) {
    // draw this backdrop first
    this.backdrop.drawImage(ctx, drawPosX, drawPosY);

    // Now we can draw text...
    ctx.font = "16px fontRetroGamingT";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillStyle = "#fff";

    const MAX_WIDTH = 250;
    const LINE_HEIGHT = 20;
    const PADDING_LEFT = 10;
    const PADDING_TOP = 12;

    ctx.fillText(this.content, drawPosX + PADDING_LEFT, drawPosY + PADDING_TOP);
  }
}
