import { GameObject } from "../../GameObject";
import { Vector2 } from "../../vector2";
import { resources } from "../../resoures";
import { Sprite } from "../../sprite";
import { events } from "../../Event";

export class TextBox extends GameObject {
  constructor() {
    super({ position: new Vector2(32, 112) });

    this.content = "Hi. How are ya? this is your beginning";
    this.backdrop = new Sprite({
      resource: resources.images.textBox,
      frameSize: new Vector2(256, 64),
    });
  }

  drawImage(ctx, drawPosX, drawPosY) {
    // draw this backdrop first
    this.backdrop.drawImage(ctx, drawPosX, drawPosY);

    // Now we can draw text...
    ctx.font = "12px fontRetroGamingT";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillStyle = "#fff";

    const MAX_WIDTH = 250;
    const LINE_HEIGHT = 20;
    const PADDING_LEFT = 10;
    const PADDING_TOP = 12;

    let words = this.content.split(" ");
    let line = "";

    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + " ";
      let metrics = ctx.measureText(testLine);
      let testWidth = metrics.width;

      if (testWidth > MAX_WIDTH && n > 0) {
        ctx.fillText(line, drawPosX + PADDING_LEFT, drawPosY + PADDING_TOP);
        // Reset the line to start with the current word
        line = words[n] + " ";
        // Move our cursor downwards
        drawPosY += LINE_HEIGHT;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, drawPosX + PADDING_LEFT, drawPosY + PADDING_TOP);
  }
}
