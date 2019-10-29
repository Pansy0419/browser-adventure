let adventurer;
let adventurerWindow;
let princessWindow;

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
    adventurer = adventurerWindow.document.getElementsByClassName("sprite")[0];
    drawBackground();
    setUpAdventurerMovements();
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
        // TODO: display ending
        console.log("collision");
      }
    }
  });

  adventurerWindow.addEventListener("keyup", event => {
    if (adventurer != undefined && event.key in DIRECTION_KEYS) {
      onFinishMove(adventurer, DIRECTION_KEYS[event.key]);
    }
  });
};
