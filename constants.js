const RUN_SPEED = 1;
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
  "0": [0, 6],
  "1": [1, 6],
  "2": [2, 6],
  "3": [0, 7],
  "4": [1, 7],
  "5": [2, 7],
  "6": [0, 8],
  "7": [1, 8],
  "8": [2, 8],
  "9": [0, 9],
  "10": [1, 9],
  "11": [2, 9],
  "12": [0, 10],
  "13": [1, 10],
  "14": [2, 10],
  "15": [0, 11],
  "16": [1, 11],
  "17": [2, 11],
  S: [0, 12],
  T: [1, 12],
  U: [2, 12],
  "18": [0, 13],
  "19": [1, 13],
  "20": [2, 13],
  "21": [0, 14],
  "22": [1, 14],
  "23": [2, 14],
  "24": [3, 0],
  "25": [4, 0],
  "26": [5, 0],
  "27": [3, 1],
  "28": [4, 1],
  "29": [5, 1],
  "30": [3, 2],
  "31": [4, 2],
  "32": [5, 2],
  "33": [3, 3],
  "34": [4, 3],
  "35": [5, 3],
  "36": [3, 4],
  V: [4, 4],
  "37": [5, 4],
  W: [3, 5],
  X: [4, 5],
  Y: [5, 5],
  Z: [3, 6],
  a: [4, 6],
  b: [5, 6],
  c: [3, 7],
  d: [4, 7],
  e: [5, 7],
  f: [3, 8],
  g: [4, 8],
  h: [5, 8],
  i: [3, 9],
  j: [4, 9],
  k: [5, 9],
  l: [3, 10],
  m: [4, 10],
  n: [5, 10],
  o: [5, 11],
  p: [5, 12],
  q: [5, 13],
  "38": [5, 14]
};

const LEVELS = [
  "0,m 2,m 1,m 0,m 2,n 0 2 1 0 1 2 0,Z a a a\n" +
    "2 0 1 2 0,38 1 2 0 1 2 0 1,Z a a a a a\n" +
    "0,g 1,g 2,g 0,g 1,g 2,g 0,h 1 2 0 1 2,Z a a a\n" +
    "M,24 N,25 O,26 M o P 2,k 1 0 2 1 0,c 1,d 2,d,Z a\n" +
    "27 28 29 O p Q 0,k,g 1,g 2,g 0,g 1,h 2 0 1,Z a\n" +
    "30 31 32 N D K K C,20 Q o 1,k 1,15 0,16 2,Z,17 a\n" +
    "33 34 35 M p P R p R D L 0,S 2,T 1,Z,U a\n" +
    "36 V 37 O p Q P p P p 1,k 0 2 1,c 0,d 2,e\n" +
    "J K K K H K K H K I 2,k 1 0 2 1 0 2"
];
