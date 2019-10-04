const animIds = new Map();

const move = (sprite, win, dir) => {
    if (sprite.classList.length >= 2) {
        if (dir === "LEFT") {
            sprite.classList.replace('runRight', 'runLeft'); 
        } else if (dir === "RIGHT") {
            sprite.classList.replace('runLeft', 'runRight'); 
        }
    } else if (sprite.classList.length < 2) {
        if (dir === "LEFT") {
            sprite.classList.add('runLeft'); 
        } else {
            sprite.classList.add('runRight');
        }
    }
    if (!animIds.has(dir)) {
        animIds.set(dir, setInterval(frameFunc(win, dir), 10));
    }
}

const finishMove = (sprite, dir) => {
    clearInterval(animIds.get(dir));
    animIds.delete(dir);

    if (animIds.size === 0) {
        sprite.classList.remove(sprite.classList.item(1));
    }
}

const frameFunc = (win, dir) => {
    switch(dir) {
        case "UP":
            return () => {
                win.moveBy(0, -RUN_SPEED);
                const top = parseInt(getComputedStyle(canvas).top);
                canvas.style.top = (top + RUN_SPEED) + "px";
            };
        case "LEFT":
            return () => { 
                win.moveBy(-RUN_SPEED, 0);
                const left = parseInt(getComputedStyle(canvas).left);
                canvas.style.left = (left + RUN_SPEED) + "px";
            };
        case "DOWN":
            return () => {
                win.moveBy(0, RUN_SPEED);
                const top = parseInt(getComputedStyle(canvas).top);
                canvas.style.top = (top - RUN_SPEED) + "px";
            };
        case "RIGHT":
            return () => {
                win.moveBy(RUN_SPEED, 0);
                const left = parseInt(getComputedStyle(canvas).left);
                canvas.style.left = (left - RUN_SPEED) + "px";
            };
        default:
            break;
    }
}