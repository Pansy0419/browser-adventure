const startButton = document.getElementsByTagName('button')[0];
const designerButton = document.getElementsByTagName('button')[1];
const params = getParamsFromUrl();

window.onload = () => {
    if (params["level"] != undefined) {
        // start game
        loadPrincess();
        loadAdventurer();
    } else {
        // title screen
        startButton.onclick = () => {
            window.location.href = "./levels/index.html?edit=false";
        }
        designerButton.onclick = () => {
            window.location.href = "./levels/index.html?edit=true";
        }
    }
}