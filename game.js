const titleScreen = document.getElementsByTagName("section")[0];
const background = document.getElementsByClassName("parallax-container")[0];
const backgroundAudio = document.getElementById("background");
const winAudio = document.getElementById("win");

const startGame = () => {
  // start game
  titleScreen.style.visibility = "hidden";
  background.style.visibility = "visible";
  loadPrincess();
  loadAdventurer();
  loadParallaxBackground();
  backgroundAudio.play();
};

const endGame = () => {
  adventurerWindow.close();
  princessWindow.close();
  backgroundAudio.pause();
  endingWindow = window.open(
    "./ending/index.html",
    "endingWindow",
    `
      menubar=no,
      location=no,
      status=1,
      scrollbars=no,
      width=340,
      height=220,
      screenX=${window.outerWidth},
      screenY=0
    `
  );

  endingWindow.addEventListener("load", event => {
    drawBackground(endingWindow);
    win.play();
  });
};
