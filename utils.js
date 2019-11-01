// check if two windows overlap
const checkCollision = (win1, win2) => {
  return (
    win1.screenX <= win2.screenX + win2.outerWidth &&
    win1.screenX + win1.outerWidth >= win2.screenX &&
    win1.screenY - win1.outerHeight <= win2.screenY &&
    win1.screenY >= win2.screenY - win2.outerHeight
  );
};

function getParamsFromUrl() {
  const query = location.search.substr(1);
  const result = {};
  query.split("&").forEach(function(part) {
    const items = part.split("=");
    result[items[0]] = decodeURIComponent(items[1]);
  });
  return result;
}

function cloneCanvas(oldCanvas) {
  //create a new canvas
  var newCanvas = document.createElement("canvas");
  var context = newCanvas.getContext("2d");

  //set dimensions
  newCanvas.width = oldCanvas.width;
  newCanvas.height = oldCanvas.height;

  //apply the old canvas to the new one
  context.drawImage(oldCanvas, 0, 0);

  //return the new canvas
  return newCanvas;
}
