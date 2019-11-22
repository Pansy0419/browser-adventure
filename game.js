const titleScreen = document.getElementsByTagName("section")[0];
const background = document.getElementsByClassName("parallax-container")[0];
const backgroundAudio = document.getElementById("background");
const winAudio = document.getElementById("win");
const loseAudio = document.getElementById("lose");
const endingControls = document.getElementsByClassName("ending")[0];
const endingTitle = document.getElementById("ending-title");

const startGame = () => {
  // start game
  titleScreen.style.visibility = "hidden";
  background.style.visibility = "visible";
  loadPrincess();
  loadAdventurer();
  loadParallaxBackground();
  backgroundAudio.play();
};

const quitGame = () => {
  backgroundAudio.pause();
  loseAudio.play();
  adventurerWindow.close();
  princessWindow.close();

  endingTitle.innerText = "Game Ended";
  endingControls.style.visibility = "visible";
};

const endGame = () => {
  adventurerWindow.close();
  princessWindow.close();
  backgroundAudio.pause();

  const endingOrigin = [
    window.screenX + container.right - 340,
    window.screenY + container.top + 82
  ];
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
      screenX=${endingOrigin[0]},
      screenY=${endingOrigin[1]}
    `
  );

  endingWindow.addEventListener("load", event => {
    drawBackground(endingWindow);
    win.play();
  });

  win.onended = () => {
    setTimeout(() => {
      endingWindow.close();
      endingControls.style.visibility = "visible";
    }, 1000);
  };
};
