import { events, addGameBoardEvents } from "./main.js";

export const mapState = {
  currentState:  "",
  currentMap: ""
}  


export function addSaveEvent () {
  const save = document.querySelector(".save");
  save.addEventListener("click", (e) => {
    mapState.currentState = document.body.innerHTML;
  })
}

export function addLoadEvent () {
  const load = document.querySelector(".load");
  load.addEventListener("click", (e) => {
    document.body.innerHTML = mapState.currentState;
    events();
    addGameBoardEvents();
  })
}

export function addResetMap () {
  const reset = document.querySelector(".reset");
  const landing = document.querySelector(".landing");
  reset.addEventListener("click", (e) => {
    document.body.innerHTML = mapState.currentMap;
    // remove landing page on reset
    document.body.removeChild(document.body.children[0]);
    events();
    addGameBoardEvents();
    
  })
}

export function saveMap () {
  mapState.currentMap = document.body.innerHTML;
}