let adventurer;
let princess;

/* Public functions */

/**
 * Load all character windows
 */
const loadCharacters = () => {
  loadPrincess();
  loadAdventurer();
  adventurer.addCollisionTarget(princess, endGame);
};

const unloadCharacters = () => {
  princess && princess.close();
  adventurer && adventurer.close();
};

/* Helper functions */

const loadAdventurer = () => {
  const adventurerOrigin = [
    window.screenX + container.left,
    window.screenY + container.bottom - 170
  ];
  adventurer = new Sprite([226, 200], adventurerOrigin, "adventurer", true);
};

const loadPrincess = () => {
  const princessOrigin = [
    window.screenX + container.right - SPRITE_WINDOW_WIDTH,
    window.screenY + container.top + 82
  ];
  princess = new Sprite([226, 200], princessOrigin, "princess");
};

const setUpAdventurerMovements = () => {
  loadMovement(adventurer, adventurerWindow);

  adventurerWindow.addEventListener("keydown", event => {
    if (adventurer != undefined && event.key in DIRECTION_KEYS) {
      onMove(adventurer, DIRECTION_KEYS[event.key]);
      if (checkCollision(princessWindow, adventurerWindow)) {
        endGame();
      }
    }
    if (event.key === "q") {
      quitGame();
    }
  });

  adventurerWindow.addEventListener("keyup", event => {
    if (adventurer != undefined && event.key in DIRECTION_KEYS) {
      onFinishMove(adventurer, DIRECTION_KEYS[event.key]);
    }
  });

  adventurerWindow.onclose = () => {
    quitGame();
  };
};

const setupSprite = win => {
  win.addEventListener("resize", e => {
    win.resizeTo(SPRITE_WINDOW_WIDTH, SPRITE_WINDOW_INNER_HEIGHT + 50);
  });

  win.onbeforeunload = () => {
    quitGame();
  };
};
