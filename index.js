const startButton = document.getElementsByClassName('play')[0];

window.onload = () => {
    startButton.onclick = () => {
        loadPrincess();
        loadAdventurer();
    }
}