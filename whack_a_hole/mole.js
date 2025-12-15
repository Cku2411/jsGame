let currMoleTile;
let currplantTitle;
let score = 0;
let gameOver = false;

window.onload = function () {
  setGame();
};

// ===
const setGame = () => {
  // set up the grid for the game board
  for (let i = 0; i < 9; i++) {
    let title = document.createElement("div");
    title.id = i.toString();
    title.addEventListener("click", selectTile);
    document.getElementById("board").appendChild(title);
  }

  setInterval(setMole, 1000);
  setInterval(setPlant, 2000);
};

function selectTile() {
  if (gameOver) {
    return;
  }
  if (this == currMoleTile) {
    score += 10;
    document.getElementById("score").innerText = score.toString();
  } else if (this === currplantTitle) {
    document.getElementById("score").innerText =
      "GAME OVER: " + score.toString();
    gameOver = true;
  }
}

const getRandomTitle = () => {
  let num = Math.floor(Math.random() * 9);
  return num.toString();
};

const setMole = () => {
  if (gameOver) {
    return;
  }
  // clear the previous mile
  if (currMoleTile) {
    currMoleTile.innerHTML = "";
  }
  let mole = document.createElement("img");
  mole.src = "/img/mole.png";

  //   div have the id from 1-9
  let num = getRandomTitle();
  currMoleTile = document.getElementById(num);
  currMoleTile.appendChild(mole);
};

const setPlant = () => {
  if (currplantTitle) {
    currplantTitle.innerHTML = "";
  }
  let plant = document.createElement("img");
  plant.src = "/img/plant2.png";

  let num = getRandomTitle();
  //   check if plant and tile have the same ID
  if (currMoleTile && currMoleTile.id == num) {
    return;
  }
  currplantTitle = document.getElementById(num);
  currplantTitle.appendChild(plant);
};
