const dirs = {};
const ids = {};

/**
 * Set up sprite movement
 * @param {*} sprite character sprite
 * @param {*} win character window
 */
const loadMovement = (sprite, win) => {
  dirs[sprite] = new Set();
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
  const winY = adventurerWindow.screenY - window.screenY - container.top;
  const centerY = winY + win.outerHeight / 2;

  switch (dir) {
    case "UP":
      if (canMove(centerX, centerY - RUN_SPEED)) {
        win.moveBy(0, -RUN_SPEED);
        adventurerCanvas.style.top = -(winY + 34) + "px";
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
        adventurerCanvas.style.top = -(winY + 34) + "px";
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
};

/* Helper functions */

// process moves in current time interval
const move = (win, sprite) => {
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
    x + SPRITE_WINDOW_WIDTH / 2 > window.outerWidth
  )
    return false;

  // magic, don't touch
  if (y < 155 || y > 757) return false;

  const getXIndex = x => Math.floor(x / BACKGROUND_TILE_SIZE);
  const getYIndex = y => Math.floor(y / BACKGROUND_TILE_SIZE);

  return (
    path[getYIndex(y + SPRITE_HEIGHT / 2)][getXIndex(x - SPRITE_WIDTH / 2.5)] &&
    path[getYIndex(y + SPRITE_HEIGHT / 2)][getXIndex(x + SPRITE_WIDTH / 2.5)] &&
    path[getYIndex(y + SPRITE_HEIGHT / 4)][getXIndex(x - SPRITE_WIDTH / 2.5)] &&
    path[getYIndex(y + SPRITE_HEIGHT / 4)][getXIndex(x + SPRITE_WIDTH / 2.5)]
  );
};
