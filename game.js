const startGame = () => {
  // start game
  loadPrincess();
  loadAdventurer();
};

const endGame = () => {
  adventurerWindow.close();
  princessWindow.close();
  endingWindow = window.open(
    "./ending/index.html",
    "endingWindow",
    `
      menubar=no,
      location=no,
      status=1,
      scrollbars=no,
      width=380,
      height=272,
      screenX=${window.outerWidth},
      screenY=0
    `
  );

  endingWindow.addEventListener("load", event => {
    drawBackground(endingWindow);
  });
};
