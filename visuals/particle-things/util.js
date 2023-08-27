/**
 * Draw a circle
 * @param {CanvasRenderingContext2D} context 
 * @param {{x:number, y:number}} circle
 * @param {string} fillStyle
 */
export const drawCircle = (context, circle, fillStyle) => {
  const circlePosAbs = relativeToAbsolute(circle);
  const radius = 5;

  // Translate so 0,0 is the middle
  context.save();
  context.translate(circlePosAbs.x, circlePosAbs.y);

  // Fill a circle
  context.beginPath();
  context.arc(0, 0, radius, 0, Math.PI * 2);
  context.fillStyle = fillStyle;
  context.fill();

  // Unwind translation
  context.restore();
};


export function absoluteToRelative(pos) {
  return {
    x: pos.x / window.innerWidth,
    y: pos.y / window.innerHeight
  };
}

export function relativeToAbsolute(pos) {
  return {
    x: pos.x * window.innerWidth,
    y: pos.y * window.innerHeight
  };
}