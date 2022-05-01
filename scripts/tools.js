export const addToolEvent = function () {
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
}

export const whichToolWasPicked = function () {
  const tools = document.querySelectorAll(".tool");
  for(let i = 0; i < tools.length; i++) {
    if(tools[i].parentElement.getAttribute("data-clicked") === "true") {
      return tools[i].getAttribute("data-name");
    }
  }
}

export const isRightTool = function (tool, resource) {
  tool = tool.toLowerCase();
  if( ( (resource === "dirt" || resource === "grass") && tool === "shovel") ||
    ( (resource === "wood" || resource === "leaves") && tool === "axe") ||
    ( resource === "stone" && tool === "pickaxe" ) || 
    ( resource === "cloud" && tool === "hand of god" ) || 
    ( resource === "lava" && tool === "super spoon" )) {
      return true;
    }
    return false;
}

