export const gridCells = (n) => {
  // our grid is based on 16px
  return n * 16;
};

export const isSpaceFree = (walls, x, y) => {
  const coordinates = `${x},${y}`;
  //   check if walls has entry at this coordinates
  const isWallPresent = walls.has(coordinates);
  return !isWallPresent;
};
