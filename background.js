const path = new Array(9);
for (var i = 0; i < path.length; i++) {
  path[i] = new Array(16).fill(0);
}
let backgroundTileSize;
let container;

/* Public functions */

/**
 * Draw level background onto canvas
 */
const drawBackground = win => {
  backgroundTileSize = getTileSizeFitToWindow();
  const canvas = win.document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.canvas.width = Math.min(1440, BACKGROUND_TILE_COL * backgroundTileSize);
  ctx.canvas.height = Math.min(864, BACKGROUND_TILE_ROW * backgroundTileSize);
  ctx.imageSmoothingEnabled = false;

  const data = getLevelContent(params["level"]);
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
              j * backgroundTileSize,
              i * backgroundTileSize,
              backgroundTileSize,
              backgroundTileSize
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

  return canvas;
};

const getTileSizeFitToWindow = () => {
  if (window.innerWidth < 1440 || window.innerHeight < 864) {
    return Math.min(
      window.innerWidth / BACKGROUND_TILE_COL,
      window.innerHeight / BACKGROUND_TILE_ROW
    );
  }
  return BACKGROUND_TILE_SIZE;
};

const loadParallaxBackground = () => {
  if (window.innerHeight < 864 || window.innerWidth < 1440) {
    const hRatio = window.innerHeight / 864;
    const wRatio = window.innerWidth / 1440;
    if (hRatio < wRatio) {
      background.style.height = window.innerHeight + "px";
      background.style.width = 1440 * hRatio + "px";
    } else {
      background.style.height = 864 * wRatio + "px";
      background.style.width = window.innerWidth + "px";
    }
  }
  container = background.getBoundingClientRect();
  setParallax(document.getElementsByClassName("tile2")[0], -0.3);
  setParallax(document.getElementsByClassName("tile3")[0], 0.5);
  setParallax(document.getElementsByClassName("tile4")[0], 1);
};

const setParallax = (img, speed) => {
  const loop = () => {
    let pos = Number(
      img.style.backgroundPositionX.substring(
        0,
        img.style.backgroundPositionX.length - 2
      )
    );
    pos = (pos + speed) % window.innerWidth;
    img.style.backgroundPositionX = pos + "px";
  };
  setInterval(loop, 50);
};
