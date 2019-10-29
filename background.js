let canvas;
const path = new Array(9);
for (var i = 0; i < path.length; i++) {
  path[i] = new Array(16).fill(1);
}

const getLevelContent = () => {
  const levelType = params["level"].charAt(0);
  const levelIndex = parseInt(params["level"].substring(1));

  if (levelType == "D") {
    // Default levels
    return LEVELS[levelIndex];
  }
};

const drawBackground = () => {
  const data = getLevelContent();
  const lines = data.split(/\r?\n/);
  console.log(data);
  const asset = new Image();
  canvas = adventurerWindow.document.getElementsByTagName("canvas")[0];
  const ctx = canvas.getContext("2d");
  ctx.canvas.width = 1440;
  ctx.canvas.height = 864;
  ctx.imageSmoothingEnabled = false;

  asset.onload = function() {
    for (const i in lines) {
      const tiles = lines[i].split(" ");
      for (const j in tiles) {
        const layers = tiles[j].split(",");
        for (const k in layers) {
          if (layers[k].length > 0) {
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
  };
  asset.src = "assets/background.png";

  console.log(path);
};

const getFileData = file => {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.send(null);
  return rawFile.responseText;
};
