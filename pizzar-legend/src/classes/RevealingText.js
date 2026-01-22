export class RevealingText {
  constructor({ element, text, textSpeed }) {
    this.element = element;
    this.text = text;
    this.speed = textSpeed || 50;

    // timeout that characer should reveali
    this.timeOut = null;
    this.isDone = false;
  }

  textReveal(characterSpans) {
    const nextChar = characterSpans.splice(0, 1)[0];
    nextChar.span.classList.add("revealed");
    if (characterSpans.length > 0) {
      this.timeOut = setTimeout(() => {
        this.textReveal(characterSpans);
      }, nextChar.delayAfter);
    } else {
      this.isDone = true;
    }
  }

  skipTextWriter() {
    clearTimeout(this.timeOut);
    this.isDone = true;
    // loop through all the span and add reveled
    this.element
      .querySelectorAll("span")
      .forEach((span) => span.classList.add("revealed"));
  }

  init() {
    let characterSpans = [];
    this.text.split("").forEach((char) => {
      let span = document.createElement("span");
      span.textContent = char;

      this.element.appendChild(span);

      //   add this span to an array
      characterSpans.push({
        span,
        delayAfter: char === " " ? 0 : this.speed,
      });
    });

    this.textReveal(characterSpans);
  }
}
