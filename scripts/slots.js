export const addSlotEvent = function () {
  const invSlots = [...document.querySelectorAll(".slot")];
  for(let i = 0; i < invSlots.length; i++) {
    invSlots[i].addEventListener("click", (e) => {
      const resource = e.target.getAttribute("data-resource");
      e.target.setAttribute("data-clicked", "true");
      e.stopPropagation();
    })
  }
}

export const windowSlotFalseEvent = function () {
  const invSlots = [...document.querySelectorAll(".slot")];
  window.addEventListener("click", (e) => {
  for(let i = 0; i < invSlots.length; i++) {
    invSlots[i].setAttribute("data-clicked", "false");
  }
  })
}

export const addToInventory = function (resource) {
  const invSlots = [...document.querySelectorAll(".slot")];
  const slot = invSlots.find(slot => slot.getAttribute("data-resource") === resource);
  if(slot) {
    slot.firstElementChild.textContent = +slot.firstElementChild.textContent + 1;
    if(slot.getAttribute("data-resource") === "cloud") {
      slot.firstElementChild.style.color = "black";
    } else {
      slot.firstElementChild.style.color = "white";
    } 
  } else {
      for(let i = 0; i < invSlots.length; i++) {
        if(!invSlots[i].getAttribute("data-resource")) {
          invSlots[i].setAttribute("data-resource", resource);
          invSlots[i].firstElementChild.style.display = "block";
          invSlots[i].firstElementChild.textContent = 1;
          return;
        }
      }
  }
}

export const placeResourceOnSkyFromInventory = function (tile) {
  const invSlots = [...document.querySelectorAll(".slot")];
  for(let i = 0; i < invSlots.length; i++) {
    const slotResource = invSlots[i].getAttribute("data-resource");
    const slotClicked = invSlots[i].getAttribute("data-clicked");
    if(slotResource && slotClicked === "true") {  
      tile.setAttribute("data-resource", slotResource);
      invSlots[i].firstElementChild.textContent = +invSlots[i].firstElementChild.textContent - 1;
      if(invSlots[i].firstElementChild.textContent == 0) {
        invSlots[i].firstElementChild.style.display = "none";
        invSlots[i].removeAttribute("data-resource");
      }
    }
  }
}