const tiles = new Array(9);
for (var i = 0; i < tiles.length; i++) {
    tiles[i] = new Array(15).fill('');
}

const picker = document.getElementsByClassName('picker')[0];
const canvas = document.getElementsByClassName('canvas')[0];
const doneButton = document.getElementsByClassName('done')[0];
const clearButton = document.getElementsByClassName('clear')[0];
const grid = document.getElementsByTagName('canvas')[0];
const gridButton = document.getElementsByClassName('grid')[0];
const gridIcon = document.getElementsByTagName('img')[0];

window.onload = () => {
    loadTilePicker();
    loadGrid();
    loadCanvas();
    loadButtons();
};

const loadTilePicker = () => {
    for (const key in BACKGROUND_TILES) {
        const div = document.createElement("div");
        div.classList.add('tile-picker');
        div.style.backgroundPosition = 
            `-${BACKGROUND_TILES[key][0] * LEVEL_DESIGNER_TILE_SIZE}px `
            + `-${BACKGROUND_TILES[key][1] * LEVEL_DESIGNER_TILE_SIZE}px`;
        
        div.draggable = true;
        div.ondragstart = (ev) => {
            ev.dataTransfer.setData("text", key);
        }

        picker.appendChild(div);
    }
}

const loadGrid = () => {
    const ctx = grid.getContext('2d');
    ctx.canvas.width  = LEVEL_DESIGNER_CANVAS_WIDTH + 2;
    ctx.canvas.height = LEVEL_DESIGNER_CANVAS_HEIGHT + 2;
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);

    // drag horizontal lines
    for (var i = 0; i < BACKGROUND_TILE_ROW + 1; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * LEVEL_DESIGNER_TILE_SIZE + 1);
        ctx.lineTo(
            LEVEL_DESIGNER_CANVAS_WIDTH + 2, 
            i * LEVEL_DESIGNER_TILE_SIZE + 1
        );
        ctx.stroke();
    }

    // draw veritical lines
    for (var i = 0; i < 16; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 64 + 1, 0);
        ctx.lineTo(i * 64 + 1, LEVEL_DESIGNER_CANVAS_HEIGHT + 2);
        ctx.stroke();
    }
}

const loadCanvas = () => {
    for (let i = 0; i < BACKGROUND_TILE_ROW; i++) {
        for (let j = 0; j < BACKGROUND_TILE_COL; j++) {
            const div = document.createElement("div");
            div.classList.add('tile-canvas');
            
            loadCanvasTileOverlay(div, i, j);

            div.ondrop = (ev) => {
                ev.preventDefault();
                var key = ev.dataTransfer.getData("text");

                tiles[i][j] += ',' + key;
                
                const layer = document.createElement("div");
                layer.classList.add("tile-layer");
                layer.style.backgroundPosition = 
                    `-${BACKGROUND_TILES[key][0] * LEVEL_DESIGNER_TILE_SIZE}px `
                    + `-${BACKGROUND_TILES[key][1] * LEVEL_DESIGNER_TILE_SIZE}px`;
                
                div.appendChild(layer);
            }

            canvas.appendChild(div);
        }
    }
}

const loadCanvasTileOverlay = (tile, x, y) => {
    const overlay = document.createElement("div");
    overlay.classList.add("tile-overlay");
    tile.appendChild(overlay);

    const trashIcon = new Image(24, 24);
    trashIcon.onload = () => {
        const button = document.createElement('button');
        button.classList.add('delete');
        button.appendChild(trashIcon);
        button.onclick = () => {
            clearTile(tile, x, y);
        }
        overlay.appendChild(button);

        tile.ondragover = (ev) => {
            ev.preventDefault();
            overlay.style.background = 'rgba(0,0,0,0.2)';
        }

        tile.ondragleave = () => {
            overlay.style.background = 'transparent';
            
        }

        tile.onmouseenter = () => {
            overlay.style.background = 'rgba(0,0,0,0.2)';
            button.style.visibility = 'visible';
        }

        tile.onmouseleave = () => {
            overlay.style.background = 'transparent';
            button.style.visibility = 'hidden';
        }
    }
    trashIcon.src = '../assets/trash-can.png'
}

const loadButtons = () => {
    gridButton.onclick = (() => {
        if (grid.style.visibility === 'hidden') {
            grid.style.visibility = 'visible';
            gridIcon.src = '../assets/eye.png';
        } else {
            grid.style.visibility = 'hidden';
            gridIcon.src = '../assets/eye-closed.png'
        }
    })

    clearButton.onclick = clearCanvas;
 }

const clearCanvas = () => {
    for (const child of canvas.children) {
        let layer = child.lastElementChild;
        while(child.childElementCount > 1) {
            child.removeChild(layer);
            layer = child.lastElementChild;
        }
    }

    for (var i = 0; i < tiles.length; i++) {
        tiles[i] = new Array(15).fill('');
    }
}

const clearTile = (tile, x, y) => {
    let layer = tile.lastElementChild;
    while(tile.childElementCount > 1) {
        tile.removeChild(layer);
        layer = tile.lastElementChild;
    }

    tiles[x][y] = '';
}