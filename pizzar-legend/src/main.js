import { World } from "./classes/World.js";
import { GameObject } from "./classes/GameObjects.js";
import { Person } from "./classes/Person.js";
import { grid } from "./util.js";

// ==DEFINE WORLD
let mapName = "Kitchen";

window.OverworldMaps = {
  DemoRoom: {
    backgroundLayer: "./img/maps/DemoLower.png",
    foregroundLayer: "./img/maps/DemoUpper.png",
    gameObjects: {
      hero: new Person({
        position: { x: grid(5), y: grid(6) },
        isPlayerControlled: true,
      }),
      npc1: new GameObject({
        position: { x: grid(7), y: grid(9) },
        Imgsrc: "./img/characters/people/npc1.png",
      }),
    },
  },

  Kitchen: {
    backgroundLayer: "./img/maps/KitchenLower.png",
    foregroundLayer: "./img/maps/KitchenUpper.png",
    gameObjects: {
      hero: new Person({
        position: { x: grid(5), y: grid(6) },
        isPlayerControlled: true,
      }),
      npcA: new GameObject({
        position: { x: grid(7), y: grid(9) },
        Imgsrc: "./img/characters/people/npc1.png",
      }),
      npcB: new GameObject({
        position: { x: grid(8), y: grid(7) },
        Imgsrc: "./img/characters/people/npc2.png",
      }),
    },
  },
};

// CREATE GAME
const game = new World({ document: document });
game.init(mapName);

const button = document.getElementById("changeMap");
const changeMap = () => {
  mapName = mapName == "DemoRoom" ? "Kitchen" : "DemoRoom";
  game.init(mapName);
};
button.addEventListener("click", changeMap);
