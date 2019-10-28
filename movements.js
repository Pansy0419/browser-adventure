const animIds = new Map();

const move = (sprite, win, dir) => {
    if (sprite.classList.length >= 2) {
        if (dir === "LEFT" 
            && sprite.classList.item(1) !== "runLeft") {
            sprite.classList.remove(1);
            sprite.classList.add('runLeft');
        } else if (dir === "RIGHT"
            && sprite.classList.item(1) !== "runRight") {
            sprite.classList.remove(1);
            sprite.classList.add('runRight');
        }
    } else {
        if (dir === "LEFT") {
            sprite.classList.add('runLeft'); 
        } else if (dir === "DOWN") {
            sprite.classList.add('runForward');
        } else {
            sprite.classList.add('runRight');
        }
    }

    if (!animIds.has(dir)) {
        animIds.set(dir, setInterval(frameFunc(win, dir), 10));
    }
}

const finishMove = (sprite, dir) => {
    if (animIds.has(dir)) {
        clearInterval(animIds.get(dir));
        animIds.delete(dir);
    }

    if (animIds.size === 0) {
        sprite.classList.remove(sprite.classList.item(1));
    }
}

const frameFunc = (win, dir) => {
    return () => {
        const centerX  = win.screenX + win.outerWidth / 2;
        const centerY = win.screenY + win.outerHeight / 2;

        switch(dir) {
            case "UP":
                if (canMove(centerX, centerY-RUN_SPEED)) {
                    win.moveBy(0, -RUN_SPEED);
                    const top = parseInt(getComputedStyle(canvas).top);
                    canvas.style.top = (top + RUN_SPEED) + "px";
                } else {
                    clearInterval(animIds.get(dir));
                    animIds.delete(dir);
                }
                break;
            case "LEFT":
                if (canMove(centerX - RUN_SPEED, centerY)) {
                    win.moveBy(-RUN_SPEED, 0);
                    const left = parseInt(getComputedStyle(canvas).left);
                    canvas.style.left = (left + RUN_SPEED) + "px";
                } else {
                    clearInterval(animIds.get(dir));
                    animIds.delete(dir);
                }
                break;
            case "DOWN":
                if (canMove(centerX, centerY + RUN_SPEED)) {
                    win.moveBy(0, RUN_SPEED);
                    const top = parseInt(getComputedStyle(canvas).top);
                    canvas.style.top = (top - RUN_SPEED) + "px";
                } else {
                    clearInterval(animIds.get(dir));
                    animIds.delete(dir);
                }
                break;
            case "RIGHT":
                if (canMove(centerX + RUN_SPEED, centerY)) {
                    win.moveBy(RUN_SPEED, 0);
                    const left = parseInt(getComputedStyle(canvas).left);
                    canvas.style.left = (left - RUN_SPEED) + "px";
                } else {
                    clearInterval(animIds.get(dir));
                    animIds.delete(dir);
                }
                break;
            default:
                break;
        }
    }
    const centerX  = win.screenX + win.outerWidth / 2;
    const centerY = win.screenY + win.outerHeight / 2;
    console.log('position', centerX, centerY);
}

// (x,y) is the center position of the character window/ character
// sprite after the intended move
const canMove = (x, y) => {
    if (x - SPRITE_WINDOW_WIDTH / 2 < 0 
        || x + SPRITE_WINDOW_WIDTH / 2 > window.outerWidth)
        return false;

    // magic, don't touch
    if (y < 148 || y + 102 > window.outerHeight)
        return false;
    
    const getXIndex = (x) => Math.floor(x / BACKGROUND_TILE_SIZE);
    const getYIndex = (y) => Math.floor(y / BACKGROUND_TILE_SIZE);
    
    return path[getYIndex(y + SPRITE_HEIGHT / 2)][getXIndex(x - SPRITE_WIDTH / 2)]
    && path[getYIndex(y + SPRITE_HEIGHT / 2)][getXIndex(x + SPRITE_WIDTH / 2)]
    && path[getYIndex(y + SPRITE_HEIGHT / 4)][getXIndex(x - SPRITE_WIDTH / 2)]
    && path[getYIndex(y + SPRITE_HEIGHT / 4)][getXIndex(x + SPRITE_WIDTH / 2)];
}