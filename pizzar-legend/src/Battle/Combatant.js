export class Combatant {
  constructor(config, battle) {
    // gan key cua config cho class
    Object.keys(config).forEach((key) => (this[key] = config[key]));

    this.hudElement = null;
    this.battle = battle;
  }

  createElement() {
    this.hudElement = document.createElement("div");
    this.hudElement.classList.add("Combatant");
    this.hudElement.setAttribute("data-combatant", this.id);
    this.hudElement.setAttribute("data-team", this.team);
  }
  init(container) {
    this.createElement();
    container.appendChild(this.element);
  }
}
