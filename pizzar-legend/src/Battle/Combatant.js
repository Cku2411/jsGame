export class Combatant {
  constructor(config, battle) {
    // gan key cua config cho class
    Object.keys(config).forEach((key) => (this[key] = config[key]));

    this.element = null;
    this.battle = battle;
  }

  createElement() {}
  init(container) {
    this.createElement();
    container.appendChild(this.element);
  }
}
