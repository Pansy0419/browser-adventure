const titleScreen = document.getElementsByTagName("section")[0];
const background = document.getElementsByClassName("parallax-container")[0];

const startGame = () => {
  // start game
  titleScreen.style.visibility = "hidden";
  background.style.visibility = "visible";
  loadPrincess();
  loadAdventurer();
  loadParallaxBackground();
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
      width=340,
      height=272,
      screenX=${window.outerWidth},
      screenY=0
    `
  );

  endingWindow.addEventListener("load", event => {
    drawBackground(endingWindow);
  });
};
