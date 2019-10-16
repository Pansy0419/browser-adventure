const picker = document.getElementsByClassName('picker')[0];
const canvas = document.getElementsByClassName('canvas')[0];
const doneButton = document.getElementsByClassName('done')[0];
const clearButton = document.getElementsByClassName('clear')[0];
const grid = document.getElementsByTagName('canvas')[0];
const gridButton = document.getElementsByClassName('grid-toggle')[0];

window.onload = () => {
    // populate picker
    for (const key in BACKGROUND_TILES) {
        const newDiv = document.createElement("div");
        newDiv.classList.add('tile-preview');
        newDiv.draggable = true;
        newDiv.ondragstart = (ev) => {
            ev.dataTransfer.setData("text", key);
        }
        newDiv.style.backgroundPosition = 
            `-${BACKGROUND_TILES[key][0] * 64}px -${BACKGROUND_TILES[key][1] * 64}px`;
        picker.appendChild(newDiv);
    }

    // populate grid
    const ctx = grid.getContext('2d');
    ctx.canvas.width  = 64 * 15 + 2;
    ctx.canvas.height = 64 * 9 + 2;
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    for (var i = 0; i < 10; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * 64 + 1);
        ctx.lineTo(64 * 15 + 2, i * 64 + 1);
        ctx.stroke();
    }
    for (var i = 0; i < 16; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 64 + 1, 0);
        ctx.lineTo(i * 64 + 1, 64 * 9 + 2);
        ctx.stroke();
    }

    // populate canvas
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 15; j++) {
            console.log('hi');
            const newDiv = document.createElement("div");
            newDiv.classList.add('tile-canvas');
            newDiv.ondragover = (ev) => {
                ev.preventDefault();
                console.log('ondrop');
            }
            newDiv.ondrop = (ev) => {
                console.log('ondrop');
                ev.preventDefault();
                var key = ev.dataTransfer.getData("text");
                const newnew = document.createElement("div");
                newnew.classList.add("tile-layer");
                newnew.style.backgroundPosition = 
                    `-${BACKGROUND_TILES[key][0] * 64}px -${BACKGROUND_TILES[key][1] * 64}px`;
                newDiv.appendChild(newnew);
            }
            canvas.appendChild(newDiv);
        }
    }

    gridButton.onclick = (() => {
        if (grid.style.visibility === 'hidden') {
            grid.style.visibility = 'visible';
        } else {
            grid.style.visibility = 'hidden';
        }
    })
};