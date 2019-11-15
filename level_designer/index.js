const picker = document.getElementsByClassName("picker")[0];
const canvas = document.getElementsByClassName("canvas")[0];
const doneButton = document.getElementsByClassName("done")[0];
const clearButton = document.getElementsByClassName("clear")[0];
const grid = document.getElementsByTagName("canvas")[0];
const gridButton = document.getElementsByClassName("grid")[0];
const gridIcon = document.getElementsByTagName("img")[0];
const params = getParamsFromUrl();

window.onload = () => {
  loadTilePicker();
  loadGrid();
  loadCanvas();
  loadButtons();
};

const loadTilePicker = () => {
  for (const key in BACKGROUND_TILES) {
    const div = document.createElement("div");
    div.classList.add("tile-picker");
    div.style.backgroundPosition =
      `-${BACKGROUND_TILES[key][0] * LEVEL_DESIGNER_TILE_SIZE}px ` +
      `-${BACKGROUND_TILES[key][1] * LEVEL_DESIGNER_TILE_SIZE}px`;

    div.draggable = true;
    div.ondragstart = ev => {
      ev.dataTransfer.setData("text", key);
    };

    picker.appendChild(div);
  }
};

const loadGrid = () => {
  const ctx = grid.getContext("2d");
  ctx.canvas.width = LEVEL_DESIGNER_CANVAS_WIDTH + 2;
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
};

const loadButtons = () => {
  gridButton.onclick = () => {
    if (grid.style.visibility === "hidden") {
      grid.style.visibility = "visible";
      gridIcon.src = "../assets/eye.png";
    } else {
      grid.style.visibility = "hidden";
      gridIcon.src = "../assets/eye-closed.png";
    }
  };

  clearButton.onclick = clearCanvas;

  doneButton.onclick = () => {
    for (let i = 0; i < tiles.length; i++) {
      tiles[i] = tiles[i].join(" ");
    }
    const levelText = tiles.join("\n");

    addCustomLevel(levelText);
    window.history.back();
  };
};
