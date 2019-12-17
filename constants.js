const RUN_SPEED = 2;
const ASSET_TILE_SIZE = 32;
const BACKGROUND_TILE_SIZE = 96;
const DIRECTION_KEYS = {
  w: "UP",
  a: "LEFT",
  s: "DOWN",
  d: "RIGHT",
  ArrowRight: "RIGHT",
  ArrowLeft: "LEFT",
  ArrowUp: "UP",
  ArrowDown: "DOWN"
};
const SPRITE_HEIGHT = 160;
const SPRITE_WIDTH = 96;
const SPRITE_WINDOW_INNER_HEIGHT = 200;
const SPRITE_WINDOW_WIDTH = 226;
const SPRITE_WINDOW_OUTER_HEIGHT = 223;
const BACKGROUND_TILE_ROW = 9;
const BACKGROUND_TILE_COL = 15;
const LEVEL_DESIGNER_TILE_SIZE = 64;
const LEVEL_DESIGNER_CANVAS_WIDTH =
  LEVEL_DESIGNER_TILE_SIZE * BACKGROUND_TILE_COL;
const LEVEL_DESIGNER_CANVAS_HEIGHT =
  LEVEL_DESIGNER_TILE_SIZE * BACKGROUND_TILE_ROW;
const BACKGROUND_TILES = {
  0: [0, 6],
  1: [1, 6],
  2: [2, 6],
  3: [0, 7],
  4: [1, 7],
  5: [2, 7],
  6: [0, 8],
  7: [1, 8],
  8: [2, 8],
  9: [0, 9],
  10: [1, 9],
  11: [2, 9],
  12: [0, 10],
  13: [1, 10],
  14: [2, 10],
  15: [0, 11],
  16: [1, 11],
  17: [2, 11],
  18: [0, 13],
  19: [1, 13],
  20: [2, 13],
  21: [0, 14],
  22: [1, 14],
  23: [2, 14],
  24: [3, 0],
  25: [4, 0],
  26: [5, 0],
  27: [3, 1],
  28: [4, 1],
  29: [5, 1],
  30: [3, 2],
  31: [4, 2],
  32: [5, 2],
  33: [3, 3],
  34: [4, 3],
  35: [5, 3],
  36: [3, 4],
  37: [5, 4],
  38: [5, 14],
  39: [1, 12],
  40: [8, 0],
  41: [8, 1],
  42: [8, 2],
  43: [3, 5],
  44: [4, 5],
  45: [5, 5],
  46: [3, 6],
  47: [5, 6],
  48: [3, 7],
  49: [4, 7],
  50: [5, 7],
  51: [3, 8],
  52: [4, 8],
  53: [5, 8],
  54: [3, 9],
  55: [5, 9],
  56: [3, 10],
  57: [4, 10],
  58: [5, 10],
  A: [0, 0],
  B: [1, 0],
  C: [2, 0],
  D: [0, 1],
  E: [1, 1],
  F: [2, 1],
  G: [0, 2],
  H: [1, 2],
  I: [2, 2],
  J: [0, 3],
  K: [1, 3],
  L: [2, 3],
  M: [0, 4],
  N: [1, 4],
  O: [2, 4],
  P: [0, 5],
  Q: [1, 5],
  R: [2, 5],
  S: [0, 12],
  T: [2, 12],
  V: [4, 4],
  W: [4, 6],
  o: [5, 11],
  p: [5, 12],
  q: [5, 13],
  r: [3, 11],
  s: [4, 11],
  t: [6, 0],
  u: [7, 0],
  v: [6, 1],
  w: [7, 1],
  x: [6, 2],
  y: [7, 2],
  z: [6, 3],
  AA: [7, 3]
};

const LEVELS = [
  "0 2 1 0 2 0 2 1 0,46 W W 0,W W W W\n" +
    "2 0 1,40 2 0,38 1 2 0 1,46 W W 1,W W W W\n" +
    "0,52 1,52 2,52 0,52 1,52 2,52 0,53 1 2,48 1,49,T 0,y 2,W W W W\n" +
    "M,24 N,25 O,26 M o P 2,55 1 0 2,T 1,48 0,49 1,49 2,Z,y W\n" +
    "27 28 29 O p Q 0,v 1,52 2,52 0,52,o 1,53 2 0 1,Z,46 W\n" +
    "30 31 32 N D K K C,20 Q p 1,55 1,15 0,16 2,Z,17,46 W\n" +
    "33 34 35 M p P R p R D L 0 2 1,Z,46 a,W\n" +
    "36 V 37 O p Q P p P p 1,55 0 2,40 1,48 0,49 2\n" +
    "J K K K H K K H K I 2,55 1 0 2 1 0 2",
  "0,P 1,P 2,55 0 1 2 0 1 2 0 1 2 0,54 P Q\n" +
    "2,Q 0,R 1,55,S 2,S 0,S 1,S 2,S 0,S 1,S 2,S 0,S 1,39 2,54,S R P\n" +
    "Q P 0,55 1,T 2 0 1 2,T 0 1 2,T 0 1,56 2,57,T 0,57\n" +
    "2,57 1,57,T 0,58,S 2,T 1 0,38 2 1,T 0 2 1,T 0,40 2 0,T 2\n" +
    "0,41 2,T 1 0,S 2,S 1,S 0,39 2,S 1,S 0,S 0,S 1,T 2,39 0,T 1\n" +
    "2,42 1,T 0 2 1,T 0 2 1,T 0 2 1 0,T 2 1,T 0\n" +
    "1,52 0,52,T 2,53 1 0,T 2,S 1,S 0,S 2,S 1,39 2,S 0,S 1 2,T 0\n" +
    "R R,P 2,55,S 0,S 1,S 2 0 1 2 0 1 2,S 0,S 1,S 2\n" +
    "P R 1,55 0 2 1 0 2,40 1 0 2 1 0 2 1"
];
