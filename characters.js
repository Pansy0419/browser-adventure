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
