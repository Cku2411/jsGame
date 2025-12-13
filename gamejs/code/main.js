import kaplay from "kaplay";

const k = kaplay({ width: 1280, height: 720 });

k.loadBean();
k.setGravity(1000);

const player = k.add([k.sprite("bean"), k.pos(k.center()), k.area(), k.body()]);
// const player2 = k.add([k.sprite("bean"), k.pos()]);
k.add([k.rect(k.width(), 300, k.pos(0, 300))]);
