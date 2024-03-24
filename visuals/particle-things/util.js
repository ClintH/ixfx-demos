import { CanvasHelper } from "../../ixfx/dom.js";

/**
 * Draw a circle
 * @param {CanvasHelper} canvas 
 * @param {{x:number, y:number}} circle
 * @param {string} fillStyle
 */
export const drawCircle = (canvas, circle, fillStyle) => {
  const { ctx } = canvas;
  const circlePosAbs = canvas.toAbsolute(circle);
  const radius = 5;

  // Translate so 0,0 is the middle
  ctx.save();
  ctx.translate(circlePosAbs.x, circlePosAbs.y);

  // Fill a circle
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fillStyle = fillStyle;
  ctx.fill();

  // Unwind translation
  ctx.restore();
};
