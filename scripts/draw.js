export const drawLava = function (div) {
    const lavaRow = +div.style.gridRowStart;
    const lavaCol = +div.style.gridColumnStart;
    const divArray = [...document.querySelectorAll(".game-board div")];
    const lavaDivs = divArray.filter(lavaDiv => {
      return +lavaDiv.style.gridRowStart === lavaRow;
    })
    const lavaRight = [];
    const lavaLeft = [];
    lavaDivs.forEach(lavaDiv => {
      +lavaDiv.style.gridColumnStart > lavaCol ? lavaRight.push(lavaDiv) : lavaLeft.push(lavaDiv);
    })
    const maxLength = Math.max(lavaRight.length, lavaLeft.length)
    div.setAttribute("data-resource", "lava");
    // recrusive function to set delay on spread
    function lavaSpread (i, k) {
      setTimeout(function () {
        // checking for undefined/errors
        if(lavaRight[i]) {lavaRight[i].setAttribute("data-resource", "lava")}
        if(lavaLeft[k]) {lavaLeft[k].setAttribute("data-resource", "lava")}
        i++;
        k--;
        // calls function untill the end of the array
        if(i <= maxLength) lavaSpread(i, k)
      }, 1000)
    }
    // inital values
    lavaSpread(0, lavaLeft.length-2)
    div.removeAttribute("data-resource-lava-hidden");
  }