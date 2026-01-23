import { Combatant } from "./Combatant.js";

export class Battle {
  constructor({ onComplete }) {
    this.element = null;
    this.onComplete = onComplete;

    // init combatant
    this.combatants = {
      player1: new Combatant(
        {
          ...Pizzas.s001,
          team: "player",
          hp: 50,
          maxHp: 50,
          xp: 100,
          level: 1,
          status: null,
        },
        this,
      ),

      enemy1: new Combatant(
        {
          ...Pizzas.v001,
          team: "enemy1",
          hp: 50,
          maxHp: 50,
          xp: 100,
          level: 1,
          status: null,
        },
        this,
      ),

      enemy2: new Combatant(
        {
          ...Pizzas.f001,
          team: "enemy2",
          hp: 50,
          maxHp: 50,
          xp: 100,
          level: 1,
          status: null,
        },
        this,
      ),
    };
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("Battle");
    this.element.innerHTML = `

    <div class="Battle_hero">
      <img src="./img/characters/people/hero.png" alt="hero" />
    </div>

    <div class="Battle_enemy">
      <img src="./img/characters/people/npc4.png" alt="enemy" />
    </div>

    `;

    // setTimeout(() => {
    //   this.onComplete();
    //   this.element.remove();
    // }, 5000);
  }

  done() {}

  init(container) {
    this.createElement();
    container.appendChild(this.element);
  }
}
