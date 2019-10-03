const startButton = document.getElementsByClassName('play')[0];
let adventurerWindow;
let princessWindow;

window.onload = () => {
    startButton.onclick = () => {
        princessWindow = window.open("./princess/index.html",
            "princessWindow",
            `
                menubar=no,
                location=no,
                status=1,
                scrollbars=no,
                width=226,
                height=200,
                screenX=${window.outerWidth},
                screenY=0
            `
        );

        adventurerWindow = window.open("./adventurer/index.html", 
            "adventurerWindow", 
            `
                menubar=no,
                location=no,
                status=1,
                scrollbars=no,
                width=226,
                height=200,
                screenX=0,
                screenY=${window.outerHeight}
            `
        );

        adventurerWindow.focus();
        adventurerWindow.addEventListener("keydown", event => {
            if (["w", "a", "s", "d"].includes(event.key)) {
                if (checkCollision()) {
                    // TODO: display ending
                }
            }
        });

    }
}

const checkCollision = () => {
    return adventurerWindow.screenX + adventurerWindow.outerWidth >= princessWindow.screenX
        && adventurerWindow.screenY - adventurerWindow.outerHeight <= princessWindow.screenY;
}