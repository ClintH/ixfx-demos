import { Drawing } from '../../ixfx/visual.js';
import { CanvasHelper } from '../../ixfx/dom.js';
import { Points, Rects, Shapes } from '../../ixfx/geometry.js';

const settings = Object.freeze({
  // Visual options for attractees
  arrowOpts: {
    tailThickness: 15,
    tailLength: 50,
    arrowSize: 40
  }
});

/**
 * Draws a circle
 * @param {{position?:Points.Point|undefined, mass?:number|undefined}} a 
 * @param {CanvasHelper} canvas 
 * @param {number} radius 
 * @param {string} fillStyle 
 */
export const circle = (a, canvas, radius = 10, fillStyle = `black`) => {
  if (!a.position) return;
  const { ctx } = canvas;
  if (a === undefined) throw new Error(`a is undefined`);
  const pt = canvas.toAbsolute(a.position);
  radius = 5 + (radius * (a.mass ?? 1));
  ctx.save();
  ctx.translate(pt.x, pt.y);
  ctx.fillStyle = fillStyle;
  ctx.beginPath();
  ctx.ellipse(-radius / 2, -radius / 2, radius, radius, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
};

/**
 * Draws an arrow
 * @param {{position?:Points.Point, angle:number}} a 
 * @param {CanvasHelper} canvas
 */
export const arrow = (a, canvas) => {
  if (!a.position) return;
  const { ctx } = canvas;
  const pt = canvas.toAbsolute(a.position);

  // Translate so 0,0 is the point of the attractee
  ctx.save();
  ctx.translate(pt.x, pt.y);

  // Drawing options for this arrow
  const options = {
    angleRadian: a.angle,
    ...settings.arrowOpts
  };

  // Shapes.arrow returns a set of points...
  const arrow = Shapes.arrow({ x: 0, y: 0 }, `middle`, options);

  // Helper function that draws a path, connecting points
  Drawing.connectedPoints(ctx, arrow, { strokeStyle: `firebrick`, loop: true });

  // Restore translation
  ctx.restore();
};