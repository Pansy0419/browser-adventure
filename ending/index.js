const adventurer = document.getElementsByClassName("adventurer")[0];
const princess = document.getElementsByClassName("princess")[0];
const adventurerContainer = document.getElementsByClassName(
  "adventurer-container"
)[0];
const dialogBox = document.getElementsByClassName("dialog-box")[0];
const bubble = document.getElementsByClassName("bubble")[0];

window.onload = () => {
  animateInDir(adventurer, "LEFT");

  let delta = -75;
  const animId = setInterval(() => {
    if (delta == 40) {
      clearInterval(animId);
      clearAnimation(adventurer);
      bubble.style.visibility = "visible";
    } else {
      delta++;
      adventurerContainer.style.marginLeft = delta + "px";
    }
  }, 20);
};
