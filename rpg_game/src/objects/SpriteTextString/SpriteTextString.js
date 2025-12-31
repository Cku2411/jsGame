import { events } from "../../Event";
import { GameObject } from "../../GameObject";
import { Input } from "../../input";
import { resources } from "../../resoures";
import { Sprite } from "../../sprite";
import { Vector2 } from "../../vector2";
import { getCharacterFrame, getCharacterWidth } from "./SpriteFontMap";

export class SpriteTextString extends GameObject {
  constructor(config = {}) {
    super({ position: new Vector2(32, 108) });

    this.drawLayer = "HUD";

    // Create an array of words
    const content = config.string ?? "Default text";
    this.words = content.split(" ").map((word) => {
      // We need to know how wide this word is
      let wordWidth = 0;
      // Break each word into single character
      const chars = word.split("").map((char) => {
        const charWidth = getCharacterWidth(char);
        wordWidth += charWidth;

        // Also create a Sprite for each character in the  word
        return {
          width: charWidth,
          sprite: new Sprite({
            resource: resources.images.fontWhite,
            hFrames: 13,
            VFrames: 6,
            // find the index (frame in frameSheet)
            frame: getCharacterFrame(char),
          }),
        };
      });

      // Return a length and a list of characters per words
      return { wordWidth, chars };
    });

    // Create background for text
    this.backdrop = new Sprite({
      resource: resources.images.textBox,
      frameSize: new Vector2(256, 64),
    });

    // Create a portrait
    this.portrait = new Sprite({
      resource: resources.images.portraits,
      hFrames: 4,
      frame: config.portraitFrame ?? 0,
    });

    // TypeWritter
    this.showingIndex = 0; // index character we are showing in effect
    this.finalIndex = this.words.reduce(
      (acc, word) => acc + word.chars.length,
      0
    );
    this.textSpeed = 30; // How manytime should pass before showing next character
    this.timeUntilNextShow = this.textSpeed;
  }

  step(delta, root) {
    // Listen for user input
    /**
     * @type {Input}
     */
    const input = root.input;

    if (input?.getActionJustPressed("Space")) {
      if (this.showingIndex < this.finalIndex) {
        // Skip
        this.showingIndex = this.finalIndex;
        return;
      }
      // Done with textBox

      events.emit("END_TEXT_BOX");
    }
    // count..
    this.timeUntilNextShow -= delta;
    if (this.timeUntilNextShow <= 0) {
      // increase amount of characters that are drawm
      this.showingIndex += 1;

      // reset time count for next character
      this.timeUntilNextShow = this.textSpeed;
    }
  }

  drawImage(ctx, drawPosX, drawPosY) {
    // Draw the backdrop
    this.backdrop.drawImage(ctx, drawPosX, drawPosY);

    // Draw the portrait
    this.portrait.drawImage(ctx, drawPosX + 6, drawPosY + 6);

    // COnfiguration options
    const PADDING_LEFT = 27;
    const PADDING_TOP = 9;
    const LINE_WIDTH_MAX = 240;
    const LINE_VERTICAL_HEIGHT = 14;

    // initial position of cursor
    let cursorX = drawPosX + PADDING_LEFT;
    let cursorY = drawPosY + PADDING_TOP;
    let currentShowingIndex = 0;

    this.words.forEach((word) => {
      // Decide if we can fit thsi newx word on this next line
      const spaceRemaining = drawPosX + LINE_WIDTH_MAX - cursorX;
      if (spaceRemaining < word.wordWidth) {
        cursorX = drawPosX + PADDING_LEFT;
        cursorY += LINE_VERTICAL_HEIGHT;
      }

      word.chars.forEach((char) => {
        if (currentShowingIndex > this.showingIndex) {
          return;
        }
        const { sprite, width } = char;
        const withCharOffset = cursorX - 5; //ecah word cut 5 px
        sprite.draw(ctx, withCharOffset, cursorY);

        // Add width of the character we just printed to cursor pos
        cursorX += width;
        // plus 1px between character
        cursorX += 1;

        // Uptick the index we are counting
        currentShowingIndex += 1;
      });
      // Move cursor space
      cursorX += 3;
    });
  }
}
