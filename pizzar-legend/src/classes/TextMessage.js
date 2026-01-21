import { KeyPressListener } from "./KeyPressListener.js";
import { RevealingText } from "./RevealingText.js";

export class TextMessage {
  constructor({ text, onComplete }) {
    this.text = text;
    this.onComplete = onComplete;
    this.element = null; //type html.element
    this.revealingText;
  }

  createElement() {
    // create the element
    this.element = document.createElement("div");
    this.element.classList.add("TextMessage");

    this.element.innerHTML = `
        <p class="TextMessage_p"></p>
        <button class="TextMessage_button">Next</button>
        `;

    // Init the typewriter
    this.revealingText = new RevealingText({
      text: this.text,
      element: this.element.querySelector(".TextMessage_p"),
    });

    this.element.querySelector("button").addEventListener("click", () => {
      this.done();
    });

    // remove eventlistener
    this.actionListener = new KeyPressListener({
      keycode: "Space",
      callback: () => {
        this.done();
      },
    });
  }

  done() {
    if (this.revealingText.isDone) {
      this.element.remove();
      this.actionListener.unbindEventListener();
      this.onComplete(); //resoleve
    } else {
      this.revealingText.skipTextWriter();
    }
  }

  init(container) {
    this.createElement();
    container.appendChild(this.element);
    this.revealingText.init();
  }
}
