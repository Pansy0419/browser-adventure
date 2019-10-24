const startButton = document.getElementsByTagName('button')[0];
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
    }
}