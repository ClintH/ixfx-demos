/**
 * @typedef {Readonly<{
 * remove:()=>void
 * id:string|number
 * }>} ElementShadow
 */

/**
 * Shadow element
 * @param {string|number} id Id for shadow
 * @param {HTMLElement} element Element to shadow
 * @param {string[]} classesToRemove List of classes to remove
 * @returns {ElementShadow}
 */
export const create = (id, element, classesToRemove) => {
  const rect = element.getBoundingClientRect();

  const copy = /** @type HTMLElement */(element.cloneNode(true));
  copy.classList.add(`shadow`);
  copy.style.visibility = `hidden`;
  for (const c of classesToRemove) {
    copy.classList.remove(c);
  }
  if (element.id.length >0) {
    copy.setAttribute(`data-shadowing`, element.id);
  }
  element.parentElement?.insertBefore(copy, element);
  element.style.position = `absolute`;
  element.style.left = rect.left +`px`;
  element.style.top = rect.top +`px`;

  return {
    id,
    remove: () => copy.remove()
  };
};
