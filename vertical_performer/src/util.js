export function isCollision({ object1, object2 }) {
  return (
    object1.position.y + object1.height >= object2.position.y &&
    object1.position.y <= object2.position.y + object2.height &&
    object1.position.x <= object2.position.x + object2.width &&
    object1.position.x + object1.width >= object2.position.x
  );
}

export function isPlatFormCollision({ object1, object2, prevY }) {
  const playerBottom = object1.position.y + object1.height;
  const prevBottom = prevY + object1.height;

  return (
    // trước đó ở TRÊN platform
    prevBottom <= object2.position.y &&
    // frame này đã đi xuống chạm platform
    playerBottom >= object2.position.y &&
    // overlap X
    object1.position.x + object1.width >= object2.position.x &&
    object1.position.x <= object2.position.x + object2.width
  );
}
