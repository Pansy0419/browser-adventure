const adventurer = document.getElementsByClassName("adventurer")[0];
const princess = document.getElementsByClassName("princess")[0];
const adventurerContainer = document.getElementsByClassName(
  "adventurer-container"
)[0];
const dialogBox = document.getElementsByClassName("dialog-box")[0];

window.onload = () => {
  animateInDir(adventurer, "LEFT");

  let delta = -110;
  const animId = setInterval(() => {
    if (delta == 40) {
      clearInterval(animId);
      clearAnimation(adventurer);
    } else {
      delta++;
      adventurerContainer.style.marginLeft = delta + "px";
    }
  }, 20);
};

const drawBackground = windows => {
  const canvas = adventurerWindow.document.createElement("canvas");
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

    for (i in windows) {
      if (i > 0) {
        windows[i].document
          .getElementsByTagName("body")[0]
          .appendChild(cloneCanvas(canvas));
      } else {
        windows[i].document.getElementsByTagName("body")[0].appendChild(canvas);
      }
    }
  };
  asset.src = "assets/background.png";
};
