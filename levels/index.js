const originalLevels = document.getElementsByClassName("levels")[0];
const customLevels = document.getElementsByClassName("levels")[1];
const params = getParamsFromUrl();
console.log;
window.onload = () => {
  // populate original levels
  for (let i = 0; i < LEVELS.length; i++) {
    originalLevels.appendChild(createLevelButton(i, false));
  }

  for (let i = 0; i < getCustomLevelCount(); i++) {
    customLevels.appendChild(createLevelButton(i, true));
  }

  customLevels.appendChild(createAddLevelButton());
};

const createLevelButton = (idx, isCustom) => {
  const button = document.createElement("button");
  const levelTag = `${isCustom ? "C" : "D"}${idx + 1}`;
  button.innerHTML = (idx + 1).toString();

  button.onclick = () => {
    if (params["edit"] === "true") {
      window.location.href = `../level_designer/index.html?level=${levelTag}`;
    } else {
      window.location.href = `../index.html?level=${levelTag}`;
    }
  };

  return button;
};

const createAddLevelButton = () => {
  const button = document.createElement("button");
  button.innerHTML = "+";
  button.classList.add("new-level");
  button.onclick = () => {
    window.location.href = `../level_designer/index.html`;
  };
  return button;
};
