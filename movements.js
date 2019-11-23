// TODO: THIS FILE IS A MESS :(
const dirs = {};
const ids = {};
const pos = [];

/**
 * Set up sprite movement
 * @param {*} sprite character sprite
 * @param {*} win character window
 */
const loadMovement = (sprite, win) => {
  dirs[sprite] = new Set();
  pos.push(win.screenX);
  pos.push(win.screenY);
  ids[sprite] = setInterval(function() {
    move(win, sprite);
  }, 10);
};

/**
 * Unset sprite movement before exit
 * @param {*} sprite character sprite
 */
const unloadMovement = sprite => {
  clearInterval(ids[sprite]);
  delete ids[sprite];
  delete dirs[sprite];
};

/**
 * Move the sprite in dir direction
 * @param {*} sprite character sprite
 * @param {*} dir direction
 */
const onMove = (sprite, dir) => {
  dirs[sprite].add(dir);
};

/**
 * Cancel sprite move in dir direction
 * @param {*} sprite character sprite
 * @param {*} dir direction
 */
const onFinishMove = (sprite, dir) => {
  dirs[sprite].delete(dir);
};

/**
 * Move sprite window in dir direction
 * @param {*} win sprite window
 * @param {*} dir direction
 */
const moveInDir = (win, dir) => {
  const winX = adventurerWindow.screenX - window.screenX - container.left;
  const centerX = winX + win.outerWidth / 2;
  const winY = adventurerWindow.screenY - window.screenY - container.top - 30;
  const centerY = winY + 130;

  switch (dir) {
    case "UP":
      if (canMove(centerX, centerY - RUN_SPEED)) {
        win.moveBy(0, -RUN_SPEED);
        adventurerCanvas.style.top = -winY + "px";
      }
      break;
    case "LEFT":
      if (canMove(centerX - RUN_SPEED, centerY)) {
        win.moveBy(-RUN_SPEED, 0);
        adventurerCanvas.style.left = -winX + "px";
      }
      break;
    case "DOWN":
      if (canMove(centerX, centerY + RUN_SPEED)) {
        win.moveBy(0, RUN_SPEED);
        adventurerCanvas.style.top = -winY + "px";
      }
      break;
    case "RIGHT":
      if (canMove(centerX + RUN_SPEED, centerY)) {
        win.moveBy(RUN_SPEED, 0);
        adventurerCanvas.style.left = -winX + "px";
      }
      break;
    default:
      break;
  }
  pos[0] = win.screenX;
  pos[1] = win.screenY;
};

/* Helper functions */

// process moves in current time interval
const move = (win, sprite) => {
  // fix position
  if (win.screenX !== pos[0] || win.screenY !== pos[1]) {
    win.moveTo(pos[0], pos[1]);
  }

  const curDirs = dirs[sprite];
  // special cases
  if (
    curDirs.size === 0 ||
    (curDirs.has("RIGHT") && curDirs.has("LEFT")) ||
    (curDirs.has("UP") && curDirs.has("DOWN"))
  ) {
    clearAnimation(sprite);
    return;
  }

  // handle movement
  for (const dir of curDirs) {
    moveInDir(win, dir);
  }

  // handle animation
  if (curDirs.has("RIGHT")) {
    animateInDir(sprite, "RIGHT");
  } else if (curDirs.has("LEFT")) {
    animateInDir(sprite, "LEFT");
  } else if (curDirs.has("UP")) {
    animateInDir(sprite, "UP");
  } else if (curDirs.has("DOWN")) {
    animateInDir(sprite, "DOWN");
  }
};

const animateInDir = (sprite, dir) => {
  for (const d of ["UP", "DOWN", "LEFT", "RIGHT"]) {
    if (d !== dir) {
      sprite.classList.remove(getClassFromDir(d));
    }
  }
  sprite.classList.add(getClassFromDir(dir));
};

// get css class from direction
const getClassFromDir = dir => {
  switch (dir) {
    case "LEFT":
      return "runLeft";
    case "RIGHT":
      return "runRight";
    case "UP":
      return "runBackward";
    case "DOWN":
      return "runForward";
  }
};

const clearAnimation = sprite => {
  sprite.classList.remove(
    getClassFromDir("UP"),
    getClassFromDir("DOWN"),
    getClassFromDir("LEFT"),
    getClassFromDir("RIGHT")
  );
};

// (x,y) is the center position of the character window/ character
// sprite after the intended move
const canMove = (x, y) => {
  if (
    x - SPRITE_WINDOW_WIDTH / 2 < 0 ||
    x + SPRITE_WINDOW_WIDTH / 2 > backgroundTileSize * BACKGROUND_TILE_COL
  )
    return false;

  // magic, don't touch
  if (y < 180 || y > backgroundTileSize * 8 + 26) return false;

  const getXIndex = x => Math.floor(x / backgroundTileSize);
  const getYIndex = y => Math.floor(y / backgroundTileSize);

  return (
    path[getYIndex(y + 40)][getXIndex(x - SPRITE_WIDTH / 2.5)] &&
    path[getYIndex(y + 40)][getXIndex(x + SPRITE_WIDTH / 2.5)] &&
    path[getYIndex(y + 20)][getXIndex(x - SPRITE_WIDTH / 2.5)] &&
    path[getYIndex(y + 20)][getXIndex(x + SPRITE_WIDTH / 2.5)]
  );
};
