var sprite = document.getElementsByClassName('sprite')[0];
var animId = undefined;

window.onload = () => {
    window.addEventListener('keydown', e => {
        if (animId === undefined) {
            switch(e.keyCode){
                case 87: // w
                    window.moveBy(0, -50);
                    break;
                case 83: // s
                    window.moveBy(0, 50);
                    break;
                case 65: // a
                    moveLeft();
                    break;
                case 68: // d
                    moveRight();
                    break;
                default:
                    break;
            }
        }
    });

    window.addEventListener('keyup', e=> {
        switch(e.keyCode) {
            case 65: // a
            case 68: // d
                finishAnim();
                break;
            default:
                break;
        }
    })
}

const moveRight = () => {
    sprite.classList.add('runRight'); 
    animId = setInterval(frame, 10);
    function frame() {
        window.moveBy(1,0);
    }
}

const moveLeft = () => {
    sprite.classList.add('runLeft'); 
    animId = setInterval(frame, 10);
    function frame() {
        window.moveBy(-1,0);
    }
}

const finishAnim = () => {
    clearInterval(animId);
    animId = undefined;
    sprite.classList.remove(sprite.classList.item(1));
}