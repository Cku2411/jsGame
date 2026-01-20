import { KeyPressListener } from "./KeyPressListener.js";

export class TextMessage {
  constructor({ text, onComplete }) {
    this.text = text;
    this.onComplete = onComplete;
    this.element = null; //type html.element
  }

  createElement() {
    // create teh element
    this.element = document.createElement("div");
    this.element.classList.add("TextMessage");

    this.element.innerHTML = `
        <p class="TextMessage_p">${this.text}</p>
        <button class="TextMessage_button">Next</button>
        `;

    this.element.querySelector("button").addEventListener("click", () => {
      this.done();
    });

    // remove eventlistener
    this.actionListener = new KeyPressListener({
      keycode: "Space",
      callback: () => {
        this.actionListener.unbindEventListener();
        this.done();
        console.log("ENTER");
      },
    });

    // this.actionListener.unbindEventListener();
  }

  done() {
    this.element.remove();
    this.onComplete(); //resoleve
  }

  init(container) {
    this.createElement();
    container.appendChild(this.element);
  }
}
