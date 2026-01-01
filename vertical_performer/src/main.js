import "./style.css";
import { floorCollisions, platFormCollisions } from "./data/collisions";
import { Sprite } from "./classes/Sprite";
import { Player } from "./classes/Player";
import { CollisionBlock } from "./classes/CollisionsBlock";

// ===========

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;
const gravity = 0.5;

const scaledCanvas = {
  width: canvas.width / 4,
  height: canvas.height / 4,
};

// ====COLLISIONS BLOCK=====
// create 2D floor, chia nho bg thanh cac array nho, moi array gom 36 phan tu
const collisionBlocks = [];
const floorCollisions2D = [];
const platFormCollisions2D = [];

for (let i = 0; i < floorCollisions.length; i += 36) {
  floorCollisions2D.push(floorCollisions.slice(i, i + 36));
}

for (let i = 0; i < platFormCollisions.length; i += 36) {
  platFormCollisions2D.push(platFormCollisions.slice(i, i + 36));
}

floorCollisions2D.forEach((row, yIndex) => {
  row.forEach((symbol, xIndex) => {
    if (symbol === 202) {
      collisionBlocks.push(
        new CollisionBlock({ position: { x: xIndex * 16, y: yIndex * 16 } })
      );
    }
  });
});

platFormCollisions2D.forEach((row, yIndex) => {
  row.forEach((symbol, xIndex) => {
    if (symbol === 202) {
      collisionBlocks.push(
        new CollisionBlock({ position: { x: xIndex * 16, y: yIndex * 16 } })
      );
    }
  });
});

console.log({ collisionBlocks });

// =================

const player = new Player({ x: 10, y: 0 });
// const player2 = new Player({ x: 300, y: 10 });

const keys = {
  d: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
};

const background = new Sprite({
  position: { x: 0, y: 0 },
  imageSrc: "/background.png",
});

function animate() {
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  window.requestAnimationFrame(animate);

  ctx.save();
  // - Thay đổi hệ tọa độ của canvas: mọi thứ vẽ sau đó sẽ được phóng to 4 lần theo trục X và 4 lần theo trục Y.
  ctx.scale(4, 4);

  // dịch hệ tọa độ y lên (dùng -)
  ctx.translate(0, -(background.image.height - scaledCanvas.height));
  background.update(ctx);
  // - Sau khi gọi, mọi thao tác vẽ tiếp theo sẽ quay về hệ tọa độ gốc (không còn scale 4×4 nữa).
  // render collisionBlock
  collisionBlocks.forEach((block) => {
    block.update(ctx);
  });
  ctx.restore();

  player.update(ctx, gravity, canvas);

  player.velocity.x = 0;
  if (keys.d.pressed) {
    player.velocity.x = 5;
  } else if (keys.a.pressed) player.velocity.x = -5;
}

animate();

// Adding event listener

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      break;

    case "a":
      keys.a.pressed = true;
      break;

    case "w":
      keys.w.pressed = true;
      player.velocity.y = -20;
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;

    case "a":
      keys.a.pressed = false;
      break;
  }
});
