let canvas;
const path = new Array(9);
for (var i = 0; i < path.length; i++) {
  path[i] = new Array(16).fill(0);
}

/* Public functions */

/**
 * Draw level background onto canvas
 */
const drawBackground = win => {
  canvas = adventurerWindow.document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.canvas.width = 1440;
  ctx.canvas.height = 864;
  ctx.imageSmoothingEnabled = false;

  const data = getLevelContent();
  const asset = new Image();

  asset.onload = function() {
    const lines = data.split(/\r?\n/);
    for (const i in lines) {
      const tiles = lines[i].split(" ");
      for (const j in tiles) {
        const layers = tiles[j].split(",");
        for (const k in layers) {
          if (layers[k].length > 0 && BACKGROUND_TILES[layers[k]]) {
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
              BACKGROUND_TILE_SIZE
            );

            if (k == layers.length - 1 && /^[a-zA-Z()]$/.test(layers[k])) {
              path[i][j] = 1;
            }
          }
        }
      }
    }

    win.document.getElementsByTagName("body")[0].appendChild(canvas);
  };
  asset.src = "assets/background.png";
};

const getLevelContent = () => {
  const levelType = params["level"].charAt(0);
  const levelIndex = parseInt(params["level"].substring(1));

  if (levelType == "D") {
    // Default levels
    return LEVELS[levelIndex];
  }
};
