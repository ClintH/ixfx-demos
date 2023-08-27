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