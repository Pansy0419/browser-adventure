const levelsButtons = document.getElementsByClassName("levels-button");
const designerButton = document.getElementsByClassName("designer-button")[0];
const titleButton = document.getElementsByClassName("title-button")[0];
const params = getParamsFromUrl();
let endingWindow;

window.onload = () => {
  if (params["level"] != undefined) {
    levelsButtons[1].onclick = () => {
      window.location.href = "./levels/?edit=false";
    };
    titleButton.onclick = () => {
      window.location.href = "./";
    };
    startGame();
  } else {
    // title screen
    checkDevice();
    levelsButtons[0].onclick = () => {
      window.location.href = "./levels/?edit=false";
    };
    designerButton.onclick = () => {
      window.location.href = "./levels/?edit=true";
    };
  }
};

window.onbeforeunload = function() {
  unloadCharacters();
  endingWindow && endingWindow.close();
  backgroundAudio.pause();
  winAudio.pause();
  loseAudio.pause();
};

window.addEventListener("beforeunload", function(e) {
  unloadCharacters();
});

const checkDevice = () => {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    const mobileMessage = document.getElementById("mobile-message");
    mobileMessage.style.visibility = "visible";
    titleScreen.style.visibility = "hidden";
  }
};
