/**
 * Set textContent of element
 * @param {string} query Query to element
 * @param {string|undefined|number} text Text to set
 * @returns 
 */
export const textContent = (query, text) => {
  const element = document.querySelector(query);
  if (element === null) return;
  if (element ===undefined) return;
  if (text === undefined) text = ``;
  if (typeof text === `number`) text =text.toString();
  element.textContent = text;
};