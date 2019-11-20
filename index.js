const startButton = document.getElementsByTagName("button")[0];
const designerButton = document.getElementsByTagName("button")[1];
const params = getParamsFromUrl();
const container = document
  .getElementsByClassName("parallax-container")[0]
  .getBoundingClientRect();
let endingWindow;

window.onload = () => {
  if (params["level"] != undefined) {
    startGame();
  } else {
    // title screen
    startButton.onclick = () => {
      window.location.href = "./levels/index.html?edit=false";
    };
    designerButton.onclick = () => {
      window.location.href = "./levels/index.html?edit=true";
    };
  }
};

window.onbeforeunload = function() {
  unloadCharacters();
  backgroundAudio.pause();
};

window.addEventListener("beforeunload", function(e) {
  unloadCharacters();
});
