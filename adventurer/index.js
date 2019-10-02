const RUN_SPEED = 1;

var sprite = document.getElementsByClassName('sprite')[0];
var animIds = new Map();

window.onload = () => {
    window.addEventListener('keydown', e => {
            switch(e.keyCode){
                case 87: // w
                    move('W');
                    break;
                case 65: // a
                    move('A');
                    break;
                case 83: // s
                    move('S');
                    break;
                case 68: // d
                    move('D');
                    break;
                default:
                    break;
            }
    });

    window.addEventListener('keyup', e=> {
        switch(e.keyCode) {
            case 87: // w
                finishAnim('W');
                break;
            case 65: // a
                finishAnim('A');
                break;
            case 83: // s
                finishAnim('S');
                break;
            case 68: // d
                finishAnim('D');
                break;
            default:
                break;
        }
    })
}

const move = (key) => {
    if (sprite.classList.length >= 2) {
        if (key === 'A') {
            sprite.classList.replace('runRight', 'runLeft'); 
        } else if (key === 'D') {
            sprite.classList.replace('runLeft', 'runRight'); 
        }
    } else if (sprite.classList.length < 2) {
        if (key === 'A') {
            sprite.classList.add('runLeft'); 
        } else {
            sprite.classList.add('runRight');
        }
    }
    if (!animIds.has(key)) {
        animIds.set(key, setInterval(frameFunc(key), 10));
    }
}

const frameFunc = (key) => {
    if (key === 'W') {
        return () => window.moveBy(0, -RUN_SPEED);
    } else if (key === 'A') {
        return () => window.moveBy(-RUN_SPEED, 0);
    } else if (key === 'S') {
        return () => window.moveBy(0, RUN_SPEED);
    } else if (key === 'D') {
        return () => window.moveBy(RUN_SPEED, 0);
    } else {
        return () => {};
    }
}

const finishAnim = (key) => {
    clearInterval(animIds.get(key));
    animIds.delete(key);

    if (animIds.size === 0) {
        sprite.classList.remove(sprite.classList.item(1));
    }
}