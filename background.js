let canvas;

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