const DEFAULT_WIDTH = 5;
const width = new Map();

// Overrides for narrow or wide characters
width.set("i", 2);
width.set("l", 3);
width.set("j", 3);
width.set("t", 4);
width.set("f", 4);
width.set("r", 4);
width.set("w", 7);
width.set("m", 7);
width.set("M", 7);
width.set("W", 7);
width.set("I", 3);

// Digits
width.set("1", 3);
width.set("0", 5);
width.set("8", 5);

// Punctuation
width.set(".", 2);
width.set(",", 2);
width.set("!", 2);
width.set("-", 3);
width.set("?", 4);
width.set("`", 2);

// Optional: fallback function
export function getCharacterWidth(char) {
  return width.get(char) ?? DEFAULT_WIDTH;
}

// FRAMES
const frameMap = new Map();
const fontRows = [
  "abcdefghijklmnopqrstuvwxyz", // hàng chữ thường
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ", // hàng chữ hoa
  "0123456789", // hàng số
  ".!- ,?`", // hàng dấu câu
]
  .join("")
  .split("")
  .forEach((char, index) => {
    frameMap.set(char, index);
  });

export const getCharacterFrame = (char) => {
  return frameMap.get(char) ?? 0;
};
