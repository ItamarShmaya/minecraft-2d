import { addSaveEvent, addLoadEvent, addResetMap, saveMap } from "./options.js";
import { addToolEvent, isRightTool, whichToolWasPicked } from "./tools.js";
import { isSurrounded } from "./utils.js";
import { drawLava } from "./draw.js";
import { addSlotEvent, windowSlotFalseEvent, addToInventory, placeResourceOnSkyFromInventory } from "./slots.js";

export function addMouseEnterEvent  (e) {
  e.target.style.border = "1px solid white";
}
export function addMouseLeaveEvent  (e) {
  e.target.style.borderStyle = "none"
}

export function addClickEvent (e) {
    const tile = e.target;
    const resource = tile.getAttribute("data-resource");
    const tileInitialAttr = tile.getAttribute("data-resource");
    let wasAddedToInventory = false;
    if(isRightTool(whichToolWasPicked(), tileInitialAttr)) {
      if(!isSurrounded(tile)) {
        tile.setAttribute("data-resource", "sky");
        addToInventory(resource);
        wasAddedToInventory = true;
      }
    }
      if(tile.getAttribute("data-resource") === "sky") {
        placeResourceOnSkyFromInventory(tile);
      }

      if(tile.getAttribute("data-resource-lava-hidden") && wasAddedToInventory) {
        drawLava(tile);
      }
}

export function generateDivs () {
  const gameBoard = document.querySelector(".game-board");
  //getting numbers of columns
  const cols = getComputedStyle(gameBoard).gridTemplateColumns.split(" ").length;
  // getting numbers of rows
  const rows = getComputedStyle(gameBoard).gridTemplateRows.split(" ").length;
  const divAmount = cols * rows;
  // getting a random number depending on grid rows number, min 50% 
  let skyRowEnd = Math.floor(Math.random() * Math.floor(rows * 0.3)) + Math.floor(rows * 0.5);
  const cloudRowStart = Math.floor(Math.random() * 3) + 2;
  const cloudColStart = Math.floor(Math.random() * (cols - 6)) + 2
  const cloudRowEnd = cloudRowStart + Math.floor(Math.random() * 3) + 2;
  const cloudColEnd = cloudColStart + Math.floor(Math.random() * 4) + 4;
  // random shapes for cloud base on it's borders
  const randomCloudHolesCol = Math.floor(Math.random() * ((cloudColEnd+1) - cloudColStart)) + cloudColStart;
  const randomCloudHolesRow = Math.floor(Math.random() * ((cloudRowEnd+1) - cloudRowStart)) + cloudRowStart;
  let randomCloudHolesCol2 = Math.floor(Math.random() * ((cloudColEnd+1) - cloudColStart)) + cloudColStart;
  let randomCloudHolesRow2 = Math.floor(Math.random() * ((cloudRowEnd+1) - cloudRowStart)) + cloudRowStart;
  while(randomCloudHolesCol2 === randomCloudHolesCol) {
    randomCloudHolesCol2 = Math.floor(Math.random() * ((cloudColEnd+1) - cloudColStart)) + cloudColStart;
  }
  while(randomCloudHolesRow2 === randomCloudHolesRow) {
    randomCloudHolesRow2 = Math.floor(Math.random() * ((cloudRowEnd+1) - cloudRowStart)) + cloudRowStart;
  }

  // random number 1-4 sets random size of trunk
  const trunkColWidth = Math.floor(Math.random() * 4) + 1;
  // random number minmum 3 to make sure the leaves will have room, maximum 30(col) - (trunk width(random 1-4) + 5(3for min 2 for room for leaves at the end)) 
  const trunkColStart = Math.floor(Math.random() * (cols - (trunkColWidth + 5))) + 3;
  const trunkRowStart = skyRowEnd - 4;
  const leavesRowStart = trunkRowStart;
  const leavesColStart = trunkColStart - 1;
  const leavesColEnd = trunkColStart + trunkColWidth + 2;
  const stoneWidth = Math.floor(Math.random() * 4) + 1; 
  const stoneRowStart = skyRowEnd - 1;
  const stoneColStart = Math.floor(Math.random() * (cols - stoneWidth) + 1);
  const lavaRowStart = Math.floor(Math.random() * 2) + 29;
  const lavaColStart = Math.floor(Math.random() * cols) + 1;
  let divRowStart = 1;
  let divColStart = 0;

  for(let i = 0; i < divAmount; i++) {
    const div = document.createElement("div");
    gameBoard.append(div);
    div.style.transition = "background 0.3s linear";
    // assigning every div row and column
    if(divColStart === cols) {
      divColStart = 0; 
      divRowStart++;
    }
    div.style.gridRowStart = divRowStart;
    div.style.gridColumnStart = ++divColStart;

    // above ground
    if(divRowStart <= skyRowEnd) {
      if( (divRowStart >= cloudRowStart && divRowStart <= cloudRowEnd) && (divColStart >= cloudColStart && divColStart <= cloudColEnd))
      {
        if(divRowStart === cloudRowStart && divColStart === randomCloudHolesCol ||
          divColStart === cloudColStart && divRowStart === randomCloudHolesRow ||
          divRowStart === cloudRowEnd && divColStart === randomCloudHolesCol2 ||
          divColStart === cloudColEnd && divRowStart === randomCloudHolesRow2) {
          div.setAttribute("data-resource", "sky");
        } else {
          div.setAttribute("data-resource", "cloud"); 
        }
      // drawing leaves triangle shape
      } else if(divRowStart === leavesRowStart && (divColStart >= leavesColStart && divColStart <= leavesColEnd) ||
      (divRowStart === leavesRowStart - 1 && (divColStart >= leavesColStart + 1 && divColStart <= leavesColEnd - 1)) ||
      (divRowStart === leavesRowStart - 2 && (divColStart >= leavesColStart + 2 && divColStart <= leavesColEnd - 2)) || 
      (divRowStart === leavesRowStart - 3 && (divColStart >= leavesColStart + 3 && divColStart <= leavesColEnd - 3)) || 
      (divRowStart === leavesRowStart - 4 && (divColStart >= leavesColStart + 4 && divColStart <= leavesColEnd - 4))) {
        div.setAttribute("data-resource", "leaves");
      }
      // drawing tree trunk
      else if (divRowStart > trunkRowStart && (divColStart > trunkColStart && divColStart <= trunkColStart + trunkColWidth)) {
        div.setAttribute("data-resource", "wood");
      }
      
      else if ( divRowStart >= stoneRowStart && (divColStart >= stoneColStart && divColStart <= stoneColStart + stoneWidth)) {
        div.setAttribute("data-resource", "stone");
      //if it's not leaves or tree trunk or stone it draw sky 
      } else {
        div.setAttribute("data-resource", "sky");
      }

    // under ground
    } else {
      if(divRowStart === lavaRowStart && divColStart === lavaColStart) {
        div.setAttribute("data-resource-lava-hidden", "true");
        console.log(divRowStart, divColStart);
      }
      if(divRowStart === skyRowEnd + 1) {
        div.setAttribute("data-resource", "grass");
      } else {
        div.setAttribute("data-resource", "dirt")
      }

    }
  }
}

export function addGameBoardEvents () {
  const gameBoard = document.querySelector(".game-board");
  gameBoard.addEventListener("click", addClickEvent);
  gameBoard.addEventListener("mouseover", addMouseEnterEvent);
  gameBoard.addEventListener("mouseout", addMouseLeaveEvent);
}

export function events () {
  addToolEvent();
  addSlotEvent();
  windowSlotFalseEvent();
  addSaveEvent();
  addLoadEvent();
  addResetMap();
}


generateDivs();
saveMap();
events();
addGameBoardEvents();

