const originalLevels = document.getElementsByClassName("levels")[0];
const customLevels = document.getElementsByClassName("levels")[1];
const params = getParamsFromUrl();
console.log
window.onload = () => {
    // populate original levels
    for (const i in LEVELS) {
        const button = document.createElement('button')
        // setting button content :(
        button.innerHTML = (Number(i) + 1).toString();

        button.onclick = () => {
            if (params["edit"] === true) {
                window.location.href = `../level_designer/index.html?level=D${i}`;
            } else {
                window.location.href = `../index.html?level=D${i}`;
            }
        }

        originalLevels.appendChild(button);
    }
}