/**
 * Function to set `innerHTML` for an element
 * @param {*} query 
 * @returns 
 */
export function htmlContent(query) {
  const element = /** @type HTMLElement */(document.querySelector(query));
  return (txt) => {
    if (element) {
      element.innerHTML = txt;
    } else {
      console.log(txt);
    }
  };
}