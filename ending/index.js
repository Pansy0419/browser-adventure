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
