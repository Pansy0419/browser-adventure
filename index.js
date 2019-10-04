const startButton = document.getElementsByClassName('play')[0];
let adventurerWindow;
let princessWindow;
let canvas;
let adventurer;
var animIds = new Map();
const RUN_SPEED = 1;
const ASSET_TILE_SIZE = 32;
const BACKGROUND_TILE_SIZE = 96;

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
            drawBackground();
        });

        adventurerWindow.addEventListener("keydown", event => {
            if (adventurer != undefined 
                && [
                    "w", 
                    "a", 
                    "s", 
                    "d", 
                    "ArrowRight", 
                    "ArrowLeft", 
                    "ArrowUp", 
                    "ArrowDown"
                ].includes(event.key)) {
                move(event.key);
                if (checkCollision()) {
                    // TODO: display ending
                }
            }
        });

        adventurerWindow.addEventListener("keyup", event => {
            if (adventurer != undefined 
                && [
                    "w", 
                    "a", 
                    "s", 
                    "d", 
                    "ArrowRight", 
                    "ArrowLeft", 
                    "ArrowUp", 
                    "ArrowDown"
                ].includes(event.key)) {
                finishAnim(event.key);
            }
        });
    }
}

const checkCollision = () => {
    return adventurerWindow.screenX + adventurerWindow.outerWidth >= princessWindow.screenX
        && adventurerWindow.screenY - adventurerWindow.outerHeight <= princessWindow.screenY;
}

const drawBackground = () => {
    const data = getFileData('levels/level1.txt');
    const lines = data.split(/\r?\n/);

    const asset = new Image();
    canvas = adventurerWindow.document.getElementsByTagName('canvas')[0];
    const ctx = canvas.getContext('2d');
    ctx.canvas.width  = 1440;
    ctx.canvas.height = 864;
    ctx.imageSmoothingEnabled = false;

    asset.onload = function() {
        for (const i in lines) {
            const tiles = lines[i].split(' ');
            for (const j in tiles) {
                const layers = tiles[j].split(',');
                for (const k in layers) {
                    const cord = BACKGROUND_TILES[layers[k]];
                    ctx.drawImage(
                        asset, 
                        cord[0] * ASSET_TILE_SIZE,
                        cord[1] * ASSET_TILE_SIZE, 
                        ASSET_TILE_SIZE,
                        ASSET_TILE_SIZE,
                        j * BACKGROUND_TILE_SIZE,
                        i * BACKGROUND_TILE_SIZE,
                        BACKGROUND_TILE_SIZE,
                        BACKGROUND_TILE_SIZE);
                }
            }
        }
    };
    asset.src = 'assets/background.png';
}

const getFileData = (file) => {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.send(null);
    return rawFile.responseText;
}

const move = (key) => {
    if (adventurer.classList.length >= 2) {
        if (key === 'a' || key === 'ArrowLeft') {
            adventurer.classList.replace('runRight', 'runLeft'); 
        } else if (key === 'd' || key === 'ArrowRight') {
            adventurer.classList.replace('runLeft', 'runRight'); 
        }
    } else if (adventurer.classList.length < 2) {
        if (key === 'a' || key === 'ArrowLeft') {
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
    switch(key) {
        case 'w':
        case 'ArrowUp':
            return () => {
                adventurerWindow.moveBy(0, -RUN_SPEED);
                const top = parseInt(getComputedStyle(canvas).top);
                canvas.style.top = (top + RUN_SPEED) + "px";
            };
        case 'a':
        case 'ArrowLeft':
            return () => { 
                adventurerWindow.moveBy(-RUN_SPEED, 0);
                const left = parseInt(getComputedStyle(canvas).left);
                canvas.style.left = (left + RUN_SPEED) + "px";
            };
        case 's':
        case 'ArrowDown':
            return () => {
                adventurerWindow.moveBy(0, RUN_SPEED);
                const top = parseInt(getComputedStyle(canvas).top);
                canvas.style.top = (top - RUN_SPEED) + "px";
            };
        case 'd':
        case 'ArrowRight':
            return () => {
                adventurerWindow.moveBy(RUN_SPEED, 0);
                const left = parseInt(getComputedStyle(canvas).left);
                canvas.style.left = (left - RUN_SPEED) + "px";
            };
        default:
            break;
    }
}

const finishAnim = (key) => {
    clearInterval(animIds.get(key));
    animIds.delete(key);

    if (animIds.size === 0) {
        adventurer.classList.remove(adventurer.classList.item(1));
    }
}