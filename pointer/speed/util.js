/**
 * Set 'textContent' of an element
 * @param {string} id 
 * @param {string} message 
 */
export function textContent(id, message) {
  const element =  /** @type HTMLElement */(document.querySelector(`#${id}`));
  if (element && element.textContent !== message) {
    element.textContent = message;
  }
}

/**
 * Set the CSS font variation for an element by id
 * @param {string} id 
 * @param {number} width 
 * @param {number} weight 
 * @returns 
 */
export const setFontVariation = (id, width, weight) => {
  const element = /** @type HTMLElement */(document.querySelector(`#speed`));
  if (!element) return;

  // Generate CSS text for each variable font axis
  const wdth = `'wdth' ` + width;
  const wght = `'wght' ` + weight;

  // Apply to element
  // Note that axies must be in alphabetical order (!)
  element.style.fontVariationSettings = `${wdth}, ${wght}`;
};