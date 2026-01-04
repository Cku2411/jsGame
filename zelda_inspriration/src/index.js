import { World } from "./Classes/World.js";
// ===
export const TILE_SIZE = 32;
export const COLS = 15;
export const ROWS = 20;
export const GAME_WIDTH = TILE_SIZE * COLS;
export const GAME_HEIGHT = TILE_SIZE * ROWS;

// ==Setup canvas===
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

const world = new World();

world.drawGrid(ctx);

// ===helper fucntion ===
