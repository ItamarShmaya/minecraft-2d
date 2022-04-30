'use strict'
const game = {
addMouseEnterEvent: function (e) {
  e.target.style.border = "1px solid white";
},
addMouseLeaveEvent: function (e) {
  e.target.style.borderStyle = "none"
},

addClickEvent: function (e) {
  const hog = document.querySelector(".hog");
  const spoon = document.querySelector(".spoon")
  const shovel = document.querySelector(".shovel");
  const pickaxe = document.querySelector(".pickaxe");
  const axe = document.querySelector(".axe");
  const invSlots = [...document.querySelectorAll(".slot")];
  const resource = e.target.getAttribute("data-resource");
  const divInitialAttr = e.target.getAttribute("data-resource");
  const divRowStart = +e.target.style.gridRowStart;
  const divColStart = +e.target.style.gridColumnStart;
  const divArray = [...document.querySelectorAll(".game-board div")];
  const aboveDiv = divArray.find(div => +div.style.gridRowStart === divRowStart-1 && +div.style.gridColumnStart === divColStart);
  const beneathDiv = divArray.find(div => +div.style.gridRowStart === divRowStart+1 && +div.style.gridColumnStart === divColStart);
  const neighbourDivLeft = divArray.find(div => +div.style.gridRowStart === divRowStart && +div.style.gridColumnStart === divColStart-1);
  const neighbourDivRight = divArray.find(div => +div.style.gridRowStart === divRowStart && +div.style.gridColumnStart === divColStart+1);
  const neighbouringDivs = [aboveDiv, beneathDiv, neighbourDivLeft, neighbourDivRight];
  let wasAddedToInventory = false;
    for(let i = 0; i < invSlots.length; i++) {
      wasAddedToInventory = false;
      let isValidClick = false;
      // Tool logic
      if( ((divInitialAttr === "dirt" || divInitialAttr === "grass") && shovel.parentElement.getAttribute("data-clicked") === "true") ||
      ( (divInitialAttr === "wood" || divInitialAttr === "leaves") && axe.parentElement.getAttribute("data-clicked") === "true" ) ||
      ( divInitialAttr === "stone" && pickaxe.parentElement.getAttribute("data-clicked") === "true" ) || 
      ( divInitialAttr === "cloud" && hog.parentElement.getAttribute("data-clicked") === "true" ) || 
      ( divInitialAttr === "lava" && spoon.parentElement.getAttribute("data-clicked") === "true" ))  {

        // if the div above, beneath or beside is sky 
        for(let j = 0; j < neighbouringDivs.length; j++) {
          if(!neighbouringDivs[j]) {
            null
          } else { 
            if(neighbouringDivs[j].getAttribute("data-resource") === "sky") {
              isValidClick = true;
              break;
            }
          }
        }
        if(!isValidClick) {break}

        e.target.setAttribute("data-resource", "sky");

        // if resource exist in inventory add 1
        if(invSlots.some(slot => slot.getAttribute("data-resource") === divInitialAttr)) {
          const slot = invSlots.find(slot => slot.getAttribute("data-resource") === divInitialAttr);
          slot.firstElementChild.textContent = +slot.firstElementChild.textContent + 1;
          if(slot.getAttribute("data-resource") === "cloud") {
            slot.firstElementChild.style.color = "black";
          } else {
            slot.firstElementChild.style.color = "white";
          }
          wasAddedToInventory = true;
          break;
          // if not add to inventory
        } else if(!invSlots[i].getAttribute("data-resource") && divInitialAttr !== "sky") {
          invSlots[i].setAttribute("data-resource", resource);
          invSlots[i].firstElementChild.style.display = "block";
          invSlots[i].firstElementChild.textContent = 1;
          wasAddedToInventory = true;
          break;
        }
      }
      // place item on sky if resource was picked from inventory
      const slotResource = invSlots[i].getAttribute("data-resource");
      const slotClicked = invSlots[i].getAttribute("data-clicked");
      if(divInitialAttr === "sky" && slotResource && slotClicked === "true") {  
        e.target.setAttribute("data-resource", slotResource);
        invSlots[i].firstElementChild.textContent = +invSlots[i].firstElementChild.textContent - 1;
        if(invSlots[i].firstElementChild.textContent == 0) {
          invSlots[i].firstElementChild.style.display = "none";
          invSlots[i].removeAttribute("data-resource");
        }
      } 
  }
  // if div is lava and hidden and was clicked validly
  if(e.target.getAttribute("data-resource-lava-hidden") && wasAddedToInventory) {
    const lavaRow = +e.target.style.gridRowStart;
    // taking all the divs from the same row
    const lavaDivs = divArray.filter(lavaDiv => {
      return +lavaDiv.style.gridRowStart === lavaRow;
    })
    const lavaRight = [];
    const lavaLeft = [];
    // storing in 2 different array for simultaneously spread in both directions
    lavaDivs.forEach(lavaDiv => {
      if(+lavaDiv.style.gridColumnStart > divColStart) lavaRight.push(lavaDiv);
      else lavaLeft.push(lavaDiv);
    })
    const maxLength = Math.max(lavaRight.length, lavaLeft.length)
    e.target.setAttribute("data-resource", "lava");
    // recrusive function to set delay on spread
    function lava (i, k) {
      console.log(i, k);
      setTimeout(function () {
        // checking for undefined/errors
        if(lavaRight[i]) {lavaRight[i].setAttribute("data-resource", "lava")}
        if(lavaLeft[k]) {lavaLeft[k].setAttribute("data-resource", "lava")}
        i++;
        k--;
        // calls function untill the end of the array
        if(i <= maxLength) lava(i, k)
      }, 1000)
    }
    // inital values
    lava(0, lavaLeft.length-1)
    e.target.removeAttribute("data-resource-lava-hidden");
  }
},

generateDivs: function () {
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
  let divColStart = 1;

  for(let i = 0; i < divAmount; i++) {
    const div = document.createElement("div");
    gameBoard.append(div);
    div.style.transition = "background 0.3s linear";
    // assigning every div row and column
    if(divColStart > cols) {
      divColStart = 1; 
      divRowStart++;
    }
    div.style.gridRowStart = divRowStart;
    div.style.gridColumnStart = divColStart++;

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
    game.addDivEvents(div);
  }
},

// Inventory functions
addSlotEvent: function() {
  const invSlots = [...document.querySelectorAll(".slot")];
  for(let i = 0; i < invSlots.length; i++) {
    invSlots[i].addEventListener("click", (e) => {
      const resource = e.target.getAttribute("data-resource");
      e.target.setAttribute("data-clicked", "true");
      e.stopPropagation();
    })
  }
},

windowSlotFalseEvent: function() {
  const invSlots = [...document.querySelectorAll(".slot")];
  window.addEventListener("click", (e) => {
  for(let i = 0; i < invSlots.length; i++) {
    invSlots[i].setAttribute("data-clicked", "false");
  }
  })
},

// Tools functions

addToolEvent: function() {
  const tools = document.querySelectorAll(".tool-container");
  for(let i = 0; i < tools.length; i++) {
    tools[i].addEventListener("click", (e) => {
      const actives = [...document.querySelectorAll(".active")]
      actives.forEach(tool => {
        if(tool !== tools[i]) {
          tool.classList.remove("active");
          tool.setAttribute("data-clicked", "false");
        }
      });
      tools[i].setAttribute("data-clicked", tools[i].getAttribute("data-clicked") === "true" ? "false" : "true");
      tools[i].classList.toggle("active");
    })
  }
},

// save/load functions
currentState: "",
currentMap: "",

addSaveEvent: function() {
  const save = document.querySelector(".save");
  save.addEventListener("click", (e) => {
    game.currentState = document.body.innerHTML;
  })
},

addLoadEvent: function() {
  const load = document.querySelector(".load");
  load.addEventListener("click", (e) => {
    document.body.innerHTML = game.currentState;
    const gameBoard = document.querySelector(".game-board");
    for(let i = 0; i < gameBoard.children.length; i++) {
      game.addDivEvents(gameBoard.children[i]);
    }
    game.events();
  })
},

addResetMap: function() {
  const reset = document.querySelector(".reset");
  const landing = document.querySelector(".landing");
  reset.addEventListener("click", (e) => {
    document.body.innerHTML = game.currentMap;
    // remove landing page on reset
    document.body.removeChild(document.body.children[0]);
    const gameBoard = document.querySelector(".game-board");
    for(let i = 0; i < gameBoard.children.length; i++) {
      game.addDivEvents(gameBoard.children[i]);
    }
    game.events();
    
  })
},

saveMap: function() {
  game.currentMap = document.body.innerHTML;
},

addDivEvents: function(div) {
  div.addEventListener("click", this.addClickEvent);
  div.addEventListener("mouseenter", this.addMouseEnterEvent);
  div.addEventListener("mouseleave", this.addMouseLeaveEvent);
},

events: function() {
  game.addToolEvent();
  game.addSlotEvent();
  game.windowSlotFalseEvent();
  game.addSaveEvent();
  game.addLoadEvent();
  game.addResetMap();
}
}

game.generateDivs();
game.saveMap();
game.events();
