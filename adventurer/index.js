window.onload = () => {
    window.addEventListener('keydown', e => {
        switch(e.keyCode){
            case 87: // w
                window.moveBy(0,-50);
                break;
            case 83: // s
                window.moveBy(0, 50);
                break;
            case 65: // a
                window.moveBy(-50, 0);
                break;
            case 68: // d
                window.moveBy(50, 0);
                break;
            default:
                break;
        }
    })
}