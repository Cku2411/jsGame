import { World } from "./classes/World.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./const.js";

// const canvas = document.getElementById("board");
// const ctx = canvas.getContext("2d");

// canvas.width = CANVAS_WIDTH;
// canvas.height = CANVAS_HEIGHT;

const game = new World({ element: document });
game.init();
// ==RUNGAME
function animate() {}
