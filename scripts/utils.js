export const isSurrounded = function (tile) {
  const tileRowStart = +tile.style.gridRowStart;
  const tileColStart = +tile.style.gridColumnStart;
  const tileArray = [...document.querySelectorAll(".game-board div")];
  const tileTop = tileArray.find(div => +div.style.gridRowStart === tileRowStart-1 && +div.style.gridColumnStart === tileColStart);
  const tileBottom = tileArray.find(div => +div.style.gridRowStart === tileRowStart+1 && +div.style.gridColumnStart === tileColStart);
  const tileLeft = tileArray.find(div => +div.style.gridRowStart === tileRowStart && +div.style.gridColumnStart === tileColStart-1);
  const tileRight = tileArray.find(div => +div.style.gridRowStart === tileRowStart && +div.style.gridColumnStart === tileColStart+1);
  const surroundingTiles = [tileTop, tileBottom, tileLeft, tileRight];
  for(let i = 0; i < surroundingTiles.length; i++) {
    if(surroundingTiles[i] && surroundingTiles[i].getAttribute("data-resource") === "sky") {
      return false;
    }
  }
  return true;
}