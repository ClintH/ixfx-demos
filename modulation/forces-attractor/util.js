import { Drawing } from '../../ixfx/visual.js';
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
 * @param {{position:Points.Point, mass:number}} a 
 * @param {CanvasRenderingContext2D} context 
 * @param {Rects.Rect} bounds 
 * @param {number} radius 
 * @param {string} fillStyle 
 */
export const circle = (a, context, bounds, radius = 10, fillStyle = `black`) => {
  if (a === undefined) throw new Error(`a is undefined`);
  const pt = Points.multiply(a.position, bounds);
  radius = 5 + (radius * (a.mass ?? 1));
  context.save();
  context.translate(pt.x, pt.y);
  context.fillStyle = fillStyle;
  context.beginPath();
  context.ellipse(-radius / 2, -radius / 2, radius, radius, 0, 0, Math.PI * 2);
  context.fill();
  context.restore();
};

/**
 * Draws an arrow
 * @param {{position:Points.Point, angle:number}} a 
 * @param {CanvasRenderingContext2D} context 
 * @param {Rects.Rect} bounds 
 */
export const arrow = (a, context, bounds) => {
  const pt = Points.multiply(a.position, bounds);

  // Translate so 0,0 is the point of the attractee
  context.save();
  context.translate(pt.x, pt.y);

  // Drawing options for this arrow
  const options = {
    angleRadian: a.angle,
    ...settings.arrowOpts
  };

  // Shapes.arrow returns a set of points...
  const arrow = Shapes.arrow({ x: 0, y: 0 }, `middle`, options);

  // Helper function that draws a path, connecting points
  Drawing.connectedPoints(context, arrow, { strokeStyle: `firebrick`, loop: true });

  // Restore translation
  context.restore();
};