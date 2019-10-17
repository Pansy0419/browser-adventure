const startButton = document.getElementsByTagName('button')[0];

window.onload = () => {
    startButton.onclick = () => {
        loadPrincess();
        loadAdventurer();
    }
}