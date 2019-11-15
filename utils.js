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

// levels
function getCustomLevelCount() {
  const count = window.localStorage.getItem("level_count");
  return count ? parseInt(count) : 0;
}

function getCustomLevel(idx) {
  return window.localStorage.getItem(`level_C${idx}`);
}

function addCustomLevel(content) {
  const levelIdx = getCustomLevelCount() + 1;
  window.localStorage.setItem(`level_C${levelIdx}`, content);
  window.localStorage.setItem("level_count", levelIdx);
}

function getLevelContent(level) {
  const levelType = level.charAt(0);
  const levelIndex = parseInt(level.substring(1));

  console.log(levelType, levelIndex);

  if (levelType == "D") {
    // Default levels
    return LEVELS[levelIndex - 1];
  } else {
    return getCustomLevel(levelIndex);
  }
}
