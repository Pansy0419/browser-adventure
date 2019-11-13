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

/* Helper functions */

const loadAdventurer = () => {
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
      screenX=0,
      screenY=${window.outerHeight}
    `
  );

  adventurerWindow.focus();

  adventurerWindow.addEventListener("load", event => {
    adventurer = adventurerWindow.document.getElementsByClassName(
      "adventurer"
    )[0];
    adventurerCanvas = drawBackground(adventurerWindow);
    setUpAdventurerMovements();
  });

  princessWindow.addEventListener("load", event => {
    drawBackground(princessWindow);
  });
};

const loadPrincess = () => {
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
      screenX=${window.outerWidth},
      screenY=0
    `
  );
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
  });

  adventurerWindow.addEventListener("keyup", event => {
    if (adventurer != undefined && event.key in DIRECTION_KEYS) {
      onFinishMove(adventurer, DIRECTION_KEYS[event.key]);
    }
  });
};
