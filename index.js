const startButton = document.getElementsByTagName("button")[0];
const designerButton = document.getElementsByTagName("button")[1];
const params = getParamsFromUrl();

window.onload = () => {
  const endingWindow = window.open(
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
  if (params["level"] != undefined) {
    // start game
    loadPrincess();
    loadAdventurer();
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
