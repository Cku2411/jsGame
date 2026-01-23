import { World } from "./classes/World.js";
import { loadMapContent, loadPizzaContent } from "./Contents/contents.js";

// ==DEFINE WORLD
let mapName = "Kitchen";

// CREATE GAME
loadMapContent();
loadPizzaContent();
const game = new World({ document: document });
game.init(mapName);

// BUTOON
const button = document.getElementById("changeMap");
const changeMap = () => {
  mapName = mapName == "DemoRoom" ? "Kitchen" : "DemoRoom";
  game.startMap(mapName);
};
button.addEventListener("click", changeMap);
