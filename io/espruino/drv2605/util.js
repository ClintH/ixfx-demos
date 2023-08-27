export const setCssDisplay = (id, value) => {
  const element = /** @type HTMLElement */(document.querySelector(`#${id}`));
  if (!element) return;
  element.style.display = value;
};

export const setHtml = (id, value) => {
  const element = /** @type HTMLElement */(document.querySelector(`#${id}`));

  if (!element) return;
  element.innerHTML = value;
};

export const setClass = (id, value, cssClass) => {
  const element = /** @type HTMLElement */(document.querySelector(`#${id}`));

  if (!element) return;
  if (value) element.classList.add(cssClass);
  else element.classList.remove(cssClass);
};

/**
 * Adds/removes `className` on everything that matches `query`,
 * based on `value`.
 * @param {string} query 
 * @param {boolean} value 
 * @param {string} cssClass 
 * @returns 
 */
export function setClassAll(value, query, cssClass) {
  for (const element of document.querySelectorAll(query)) {
    if (value) element.classList.add(cssClass);
    else element.classList.remove(cssClass);
  }
}