const startButton = document.getElementsByClassName('play')[0];
let adventurerWindow;
let princessWindow;
var adventurer;
var animIds = new Map();
const RUN_SPEED = 1;

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

        adventurerWindow.addEventListener("load", event => {
            adventurer = adventurerWindow.document.getElementsByClassName('sprite')[0];
        });

        adventurerWindow.addEventListener("keydown", event => {
            if (adventurer != undefined && ["w", "a", "s", "d"].includes(event.key)) {
                move(event.key);
                if (checkCollision()) {
                    // TODO: display ending
                }
            }
        });

        adventurerWindow.addEventListener("keyup", event => {
            if (adventurer != undefined && ["w", "a", "s", "d"].includes(event.key)) {
                finishAnim(event.key);
            }
        });
    }
}

const checkCollision = () => {
    return adventurerWindow.screenX + adventurerWindow.outerWidth >= princessWindow.screenX
        && adventurerWindow.screenY - adventurerWindow.outerHeight <= princessWindow.screenY;
}

const getFileData = (file) => {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.send(null);
    return rawFile.responseText;
}

const move = (key) => {
    if (adventurer.classList.length >= 2) {
        if (key === 'a') {
            adventurer.classList.replace('runRight', 'runLeft'); 
        } else if (key === 'd') {
            adventurer.classList.replace('runLeft', 'runRight'); 
        }
    } else if (adventurer.classList.length < 2) {
        if (key === 'a') {
            adventurer.classList.add('runLeft'); 
        } else {
            adventurer.classList.add('runRight');
        }
    }
    if (!animIds.has(key)) {
        animIds.set(key, setInterval(frameFunc(key), 10));
    }
}

const frameFunc = (key) => {
    if (key === 'w') {
        return () => adventurerWindow.moveBy(0, -RUN_SPEED);
    } else if (key === 'a') {
        return () => adventurerWindow.moveBy(-RUN_SPEED, 0);
    } else if (key === 's') {
        return () => adventurerWindow.moveBy(0, RUN_SPEED);
    } else if (key === 'd') {
        return () => adventurerWindow.moveBy(RUN_SPEED, 0);
    } else {
        return () => {};
    }
}

const finishAnim = (key) => {
    clearInterval(animIds.get(key));
    animIds.delete(key);

    if (animIds.size === 0) {
        adventurer.classList.remove(adventurer.classList.item(1));
    }
}