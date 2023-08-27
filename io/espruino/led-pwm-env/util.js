/**
 * Sets style.display for element
 * @param {*} id Id of element
 * @param {*} value Value of style.display to set
 * @returns 
 */
export const setCssDisplay = (id, value) => {
  const element = /** @type HTMLElement */(document.querySelector(`#${id}`));
  if (!element) return;
  element.style.display = value;
};