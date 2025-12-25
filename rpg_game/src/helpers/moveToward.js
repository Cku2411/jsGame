export function moveTowards(person, destinationPosition, speed) {
  // Vector từ vị trí hiện tại tới đích
  let dx = destinationPosition.x - person.position.x;
  let dy = destinationPosition.y - person.position.y;

  // Khoảng cách hiện tại
  let distance = Math.sqrt(dx ** 2 + dy ** 2);

  // Nếu khoảng cách nhỏ hơn hoặc bằng bước đi -> đặt thẳng tới đích
  if (distance <= speed || distance === 0) {
    person.position.x = destinationPosition.x;
    person.position.y = destinationPosition.y;
    return 0; // đã tới nơi
  }

  // Di chuyển theo hướng được chuẩn hóa với tốc độ speed
  const nx = dx / distance; // normalizedX
  const ny = dy / distance; // normalizedY

  person.position.x += nx * speed;
  person.position.y += ny * speed;

  // Tính lại khoảng cách còn lại sau khi di chuyển
  dx = destinationPosition.x - person.position.x;
  dy = destinationPosition.y - person.position.y;
  const remainingDistance = Math.sqrt(dx ** 2 + dy ** 2);

  return remainingDistance;
}
