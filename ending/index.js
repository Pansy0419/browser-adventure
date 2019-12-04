const adventurer = document.getElementsByClassName("adventurer")[0];
const princess = document.getElementsByClassName("princess")[0];
const adventurerContainer = document.getElementsByClassName(
  "adventurer-container"
)[0];
const dialogBox = document.getElementsByClassName("dialog-box")[0];
const bubble = document.getElementsByClassName("bubble")[0];

window.onload = () => {
  adventurer.classList.add("runLeft");

  let delta = -75;
  const animId = setInterval(() => {
    if (delta == 40) {
      adventurer.classList.remove("runLeft");
    } else {
      delta++;
      adventurerContainer.style.marginLeft = delta + "px";
    }
  }, 20);
};
