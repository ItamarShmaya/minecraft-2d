const infoBtn = document.querySelector(".game-info");
const info = document.querySelector(".info");
const start = document.querySelector(".start-game");
const landingPage = document.querySelector(".landing");
const settings = document.querySelector(".settings");
const input = document.querySelector(".inputs");
const inputs = document.querySelectorAll(".inputs input");
const gear = document.querySelector(".gear");
const gameBoard = document.querySelector(".game-board");
const main = document.querySelector("#main");
const gameSettings = {};

infoBtn.addEventListener("click", (e) => {
  infoClasses = [...info.classList];
  if(infoClasses.includes("hidden")) {
    info.style.display = "block";
    setTimeout(function() {
      info.classList.remove("hidden");
    }, 100)
  } else {
    info.classList.add("hidden");
    setTimeout(function() {
      info.style.display = "none";
    }, 500)
  }
  if(window.innerWidth < 1000) {
    info.textContent = "Welcome to the world of Minecraft, pick a tool to collect resources and start building"
  }
  if(window.innerWidth > 1000) {
    info.textContent = "Welcome to the world of Minecraft, an open world game that is randomly generated. Where you can mine for mineral, build shelters, and fight off monsters.Pick a tool to collect resources and let your imagination run wild to create the most marvelous of things! Good Luck!"
  }
})

start.addEventListener("click", () => {
  landingPage.style.opacity = "0";
  landingPage.style.transform = "scale(2)";
  setTimeout(function() {
    landingPage.style.display = "none";
  }, 500)
  
  if(gameSettings.width) {
    main.style.width = `${gameSettings.width}px`;
  }
  if(gameSettings.height) {
    main.style.height = `${gameSettings.height}px`;
  }
})

gear.addEventListener("click", () => {
  input.classList.toggle("hidden");
})
 
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("change", (e) => {
      gameSettings[e.target.name] = +e.target.value;
    })
  }



