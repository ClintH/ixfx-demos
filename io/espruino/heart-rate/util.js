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