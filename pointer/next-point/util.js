export function setText(id, message) {
  const element =  /** @type HTMLElement */(document.querySelector(`#${id}`));
  if (element && element.textContent !== message) {
    element.textContent = message;
  }
}

/**
 * Draws a circle with optional text
 * @param {CanvasRenderingContext2D} context 
 * @param {Circle} circle 
 * @param {string} fillStyle?
 * @param {string} message?
 * @param {string} textFillStyle?
 */
export function drawLabelledCircle(context, circle, fillStyle = `black`, message = ``, textFillStyle = `white`)  {
  // Translate so 0,0 is the center of circle
  context.save();
  context.translate(circle.x, circle.y);
  
  // Fill a circle
  context.beginPath();
  context.arc(0, 0, circle.radius ?? 5, 0, Math.PI * 2);
  context.fillStyle = fillStyle;
  context.fill();

  if (message.length > 0) {
    context.fillStyle = textFillStyle;
    context.textAlign = `center`;
    context.fillText(message, 0, 0);
  }
  context.restore();
}

/**
 * @typedef {{
 * x: number
 * y: number
 * radius?: number
 * }} Circle
 */

/** 
 * @typedef {{
* width: number
* height: number
* center: {x:number, y:number}
* }} Bounds */