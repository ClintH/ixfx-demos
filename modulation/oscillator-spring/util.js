export const moveElement = (element, pos) => {
  if (!element) return;

  const halfSize = element.getBoundingClientRect().width / 2;
  
  // Move element
  element.style.left = (pos.x * window.innerWidth) - halfSize+ `px`;
  element.style.top = (pos.y * window.innerHeight) - halfSize + `px`;
};