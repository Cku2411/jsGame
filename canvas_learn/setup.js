const canvas = document.getElementById("board1");
const ctx1 = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;

const canvas = document.getElementById("board2");
const ctx2 = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;

const canvas = document.getElementById("board3");
const ctx3 = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;

const canvas = document.getElementById("board4");
const ctx4 = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;

const canvas = document.getElementById("board5");
const ctx5 = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;

// global variables
const grid = 80;
let keys = [];
let score = 0;
let collisionCount = 0;
let frame = 0;
let gameSpeed = 1;

const particlesArray = [];
const maxParticles = 300;
const ripplesArray = [];
const carsArray = [];
const logsArray = [];
