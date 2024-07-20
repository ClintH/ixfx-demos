/**
 * Move an element with relative coordinates
 * @param {HTMLElement|Element} element 
 * @param {{x:number,y:number}} pos 
 * @returns 
 */
export const moveElement = (element, pos) => {
  if (!element) return;
  const e = /** @type HTMLElement */(element);
  const halfSize = e.getBoundingClientRect().width / 2;

  // Move element
  e.style.left = (pos.x * window.innerWidth) - halfSize + `px`;
  e.style.top = (pos.y * window.innerHeight) - halfSize + `px`;
};