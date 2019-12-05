class Sprite {
  constructor(size, origin, name, canControl = false) {
    this.size = size;
    this.pos = origin;
    this.win = window.open(
      `./${name}/index.html`,
      `${name}Window`,
      `
        menubar=no,
        location=no,
        status=1,
        scrollbars=no,
        width=${size[0]},
        height=${size[1]},
        screenX=${origin[0]},
        screenY=${origin[1]}
      `
    );

    this.win.addEventListener("load", () => {
      this.sprite = this.win.document.getElementsByClassName(name)[0];
      this.canvas = drawBackground(this.win);

      this._setUpMovement();

      if (canControl) {
        this._setUpMovementControls();
      }

      this.win.addEventListener("resize", e => {
        console.log(this.size);
        this.win.resizeTo(this.size[0], this.size[1] + 50);
      });

      this.win.onbeforeunload = () => {
        quitGame();
      };
    });
  }

  /**
   * Close the sprite window and clean up
   */
  close() {
    clearInterval(this.animId);
    this._clearAnimation();
    this.dirs && this.dirs.clear();
    this.win.close();
  }

  /**
   * Move the sprite in dir direction
   * @param {*} dir direction
   */
  move(dir) {
    this.dirs.add(dir);
  }

  /**
   * Cancel sprite move in dir direction
   * @param {*} sprite character sprite
   * @param {*} dir direction
   */
  finishMove(dir) {
    this.dirs.delete(dir);
  }

  /**
   * Invoke the given call back when this sprite collide with sprite s
   * @param {*} s the target sprite
   * @param {*} callback the function to invoke when collision happens
   */
  addCollisionTarget(s, callback) {
    this.win.addEventListener("keydown", event => {
      if (event.key in DIRECTION_KEYS) {
        if (checkCollision(this.win, s.win)) {
          callback();
        }
      }
    });
  }

  _setUpMovement() {
    this.dirs = new Set();
    this.animId = setInterval(() => {
      this._processMoves();
    }, 10);
  }

  _setUpMovementControls() {
    this.win.addEventListener("keydown", event => {
      if (event.key in DIRECTION_KEYS) {
        this.move(DIRECTION_KEYS[event.key]);
        // if (checkCollision(princessWindow, adventurerWindow)) {
        //   endGame();
        // }
      }
      if (event.key === "q") {
        quitGame();
      }
    });

    this.win.addEventListener("keyup", event => {
      if (event.key in DIRECTION_KEYS) {
        this.finishMove(DIRECTION_KEYS[event.key]);
      }
    });
  }

  // process moves in current time interval
  _processMoves() {
    // reset position
    if (this.win.screenX !== this.pos[0] || this.win.screenY !== this.pos[1]) {
      this.win.moveTo(this.pos[0], this.pos[1]);
    }

    // special cases, no movement
    if (
      this.dirs.size === 0 ||
      (this.dirs.has("RIGHT") && this.dirs.has("LEFT")) ||
      (this.dirs.has("UP") && this.dirs.has("DOWN"))
    ) {
      this._clearAnimation();
      return;
    }

    // handle movement
    for (const dir of this.dirs) {
      this._moveInDir(dir);
    }
    if (this.dirs.size > 0) {
      this.onMove && this.onMove();
    }

    // handle animation
    if (this.dirs.has("RIGHT")) {
      this._animateInDir("RIGHT");
    } else if (this.dirs.has("LEFT")) {
      this._animateInDir("LEFT");
    } else if (this.dirs.has("UP")) {
      this._animateInDir("UP");
    } else if (this.dirs.has("DOWN")) {
      this._animateInDir("DOWN");
    }
  }

  _moveInDir(dir) {
    const winX = this.win.screenX - window.screenX - container.left;
    const centerX = winX + this.win.outerWidth / 2;
    const winY = this.win.screenY - window.screenY - container.top - 30;
    const centerY = winY + 130;

    switch (dir) {
      case "UP":
        if (this._canMove(centerX, centerY - RUN_SPEED)) {
          this.win.moveBy(0, -RUN_SPEED);
          this.canvas.style.top = -winY + "px";
        }
        break;
      case "LEFT":
        if (this._canMove(centerX - RUN_SPEED, centerY)) {
          this.win.moveBy(-RUN_SPEED, 0);
          this.canvas.style.left = -winX + "px";
        }
        break;
      case "DOWN":
        if (this._canMove(centerX, centerY + RUN_SPEED)) {
          this.win.moveBy(0, RUN_SPEED);
          this.canvas.style.top = -winY + "px";
        }
        break;
      case "RIGHT":
        if (this._canMove(centerX + RUN_SPEED, centerY)) {
          this.win.moveBy(RUN_SPEED, 0);
          this.canvas.style.left = -winX + "px";
        }
        break;
      default:
        break;
    }
    this.pos[0] = this.win.screenX;
    this.pos[1] = this.win.screenY;
  }

  _animateInDir(dir) {
    for (const d of ["UP", "DOWN", "LEFT", "RIGHT"]) {
      if (d !== dir) {
        this.sprite.classList.remove(this._getClassFromDir(d));
      }
    }
    this.sprite.classList.add(this._getClassFromDir(dir));
  }

  // get css class from direction
  _getClassFromDir(dir) {
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
  }

  _clearAnimation() {
    this.sprite.classList.remove(
      this._getClassFromDir("UP"),
      this._getClassFromDir("DOWN"),
      this._getClassFromDir("LEFT"),
      this._getClassFromDir("RIGHT")
    );
  }

  _canMove = (x, y) => {
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
}

class Slime extends Sprite {}
