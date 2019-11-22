let adventurer;
let adventurerWindow;
let princessWindow;
let adventurerCanvas;

/* Public functions */

/**
 * Load all character windows
 */
const loadCharacters = () => {
  loadAdventurer();
  loadPrincess();
};

const unloadCharacters = () => {
  adventurerWindow && unloadAdventurer();
  princessWindow && unloadPrincess();
};

/* Helper functions */

const loadAdventurer = () => {
  const adventurerOrigin = [
    window.screenX + container.left,
    window.screenY + container.bottom - 170
  ];

  adventurerWindow = window.open(
    "./adventurer/index.html",
    "adventurerWindow",
    `
      menubar=no,
      location=no,
      status=1,
      scrollbars=no,
      width=226,
      height=200,
      screenX=${adventurerOrigin[0]},
      screenY=${adventurerOrigin[1]}
    `
  );

  adventurerWindow.focus();

  setupSprite(adventurerWindow);

  adventurerWindow.addEventListener("load", event => {
    adventurer = adventurerWindow.document.getElementsByClassName(
      "adventurer"
    )[0];
    setUpAdventurerMovements();
  });
};

const loadPrincess = () => {
  const princessOrigin = [
    window.screenX + container.right - SPRITE_WINDOW_WIDTH,
    window.screenY + container.top + 82
  ];

  princessWindow = window.open(
    "./princess/index.html",
    "princessWindow",
    `
      menubar=no,
      location=no,
      status=1,
      scrollbars=no,
      width=226,
      height=200,
      screenX=${princessOrigin[0]},
      screenY=${princessOrigin[1]}
    `
  );

  setupSprite(princessWindow);
};

const unloadAdventurer = () => {
  unloadMovement(adventurer);
  adventurerWindow.close();
};

const unloadPrincess = () => {
  princessWindow.close();
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

  win.addEventListener("load", event => {
    drawBackground(win);
  });

  win.onbeforeunload = () => {
    quitGame();
  };
};
