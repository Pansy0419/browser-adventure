const levelsButtons = document.getElementsByClassName("levels-button");
const designerButton = document.getElementsByClassName("designer-button")[0];
const titleButton = document.getElementsByClassName("title-button")[0];
const params = getParamsFromUrl();
const container = document
  .getElementsByClassName("parallax-container")[0]
  .getBoundingClientRect();
let endingWindow;

window.onload = () => {
  if (params["level"] != undefined) {
    levelsButtons[1].onclick = () => {
      window.location.href = "./levels/index.html?edit=false";
    };
    titleButton.onclick = () => {
      window.location.href = "index.html";
    };
    startGame();
  } else {
    // title screen
    levelsButtons[0].onclick = () => {
      window.location.href = "./levels/index.html?edit=false";
    };
    designerButton.onclick = () => {
      window.location.href = "./levels/index.html?edit=true";
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
