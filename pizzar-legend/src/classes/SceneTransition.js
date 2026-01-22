export class SceneTransition {
  constructor() {
    this.element = null;
  }

  createElement() {
    // taoj div transition
    this.element = document.createElement("div");
    this.element.classList.add("SceneTransition");
  }

  fadeOut() {
    this.element.classList.add("fade-out");
    return new Promise((res) => {
      this.element.addEventListener(
        "onMaptransition",
        () => {
          this.element.remove();
          res();
        },
        { once: true },
      );
    });
  }

  init(container) {
    this.createElement();
    container.appendChild(this.element);
  }
}
