const tiles = new Array(9);
for (var i = 0; i < tiles.length; i++) {
    tiles[i] = new Array(15).fill('');
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
            if (tile.childElementCount > 1) {
                button.style.visibility = 'visible';
            }
        }

        tile.onmouseleave = () => {
            overlay.style.background = 'transparent';
            button.style.visibility = 'hidden';
        }
    }
    trashIcon.src = '../assets/trash-can.png'
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