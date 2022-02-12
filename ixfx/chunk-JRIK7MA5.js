import {
  opacity
} from "./chunk-KUISNGY5.js";
import {
  getCorners,
  guard,
  isCubicBezier,
  isLine,
  isQuadraticBezier
} from "./chunk-CXHP57SM.js";
import {
  stack
} from "./chunk-AGSKCOEP.js";
import {
  resolveEl
} from "./chunk-EGNKYH6P.js";
import {
  array
} from "./chunk-RKVT4IML.js";
import {
  __export
} from "./chunk-YDTVC7MM.js";

// src/visual/Drawing.ts
var Drawing_exports = {};
__export(Drawing_exports, {
  arc: () => arc,
  bezier: () => bezier,
  circle: () => circle,
  connectedPoints: () => connectedPoints,
  drawingStack: () => drawingStack,
  getCtx: () => getCtx,
  line: () => line,
  lineThroughPoints: () => lineThroughPoints,
  makeHelper: () => makeHelper,
  paths: () => paths,
  pointLabels: () => pointLabels,
  rect: () => rect,
  textBlock: () => textBlock
});
var PIPI = Math.PI * 2;
var getCtx = (canvasElCtxOrQuery) => {
  if (canvasElCtxOrQuery === null)
    throw Error(`canvasElCtxOrQuery null. Must be a 2d drawing context or Canvas element`);
  if (canvasElCtxOrQuery === void 0)
    throw Error(`canvasElCtxOrQuery undefined. Must be a 2d drawing context or Canvas element`);
  const ctx = canvasElCtxOrQuery instanceof CanvasRenderingContext2D ? canvasElCtxOrQuery : canvasElCtxOrQuery instanceof HTMLCanvasElement ? canvasElCtxOrQuery.getContext(`2d`) : typeof canvasElCtxOrQuery === `string` ? resolveEl(canvasElCtxOrQuery).getContext(`2d`) : canvasElCtxOrQuery;
  if (ctx === null)
    throw new Error(`Could not create 2d context for canvas`);
  return ctx;
};
var makeHelper = (ctxOrCanvasEl, canvasBounds) => {
  const ctx = getCtx(ctxOrCanvasEl);
  return {
    paths(pathsToDraw, opts) {
      paths(ctx, pathsToDraw, opts);
    },
    line(lineToDraw, opts) {
      line(ctx, lineToDraw, opts);
    },
    rect(rectsToDraw, opts) {
      rect(ctx, rectsToDraw, opts);
    },
    bezier(bezierToDraw, opts) {
      bezier(ctx, bezierToDraw, opts);
    },
    connectedPoints(pointsToDraw, opts) {
      connectedPoints(ctx, pointsToDraw, opts);
    },
    pointLabels(pointsToDraw, opts) {
      pointLabels(ctx, pointsToDraw, opts);
    },
    dot(dotPosition, opts) {
      dot(ctx, dotPosition, opts);
    },
    circle(circlesToDraw, opts) {
      circle(ctx, circlesToDraw, opts);
    },
    arc(arcsToDraw, opts) {
      arc(ctx, arcsToDraw, opts);
    },
    textBlock(lines, opts) {
      if (opts.bounds === void 0 && canvasBounds !== void 0)
        opts = { ...opts, bounds: { ...canvasBounds, x: 0, y: 0 } };
      textBlock(ctx, lines, opts);
    }
  };
};
var optsOp = (opts) => coloringOp(opts.strokeStyle, opts.fillStyle);
var applyOpts = (ctx, opts = {}) => {
  if (ctx === void 0)
    throw Error(`ctx undefined`);
  const stack2 = drawingStack(ctx).push(optsOp(opts));
  stack2.apply();
  return stack2;
};
var arc = (ctx, arcs, opts = {}) => {
  applyOpts(ctx, opts);
  const draw = (arc2) => {
    ctx.beginPath();
    ctx.arc(arc2.x, arc2.y, arc2.radius, arc2.startRadian, arc2.endRadian);
    ctx.stroke();
  };
  if (Array.isArray(arcs)) {
    arcs.forEach(draw);
  } else
    draw(arcs);
};
var coloringOp = (strokeStyle, fillStyle) => {
  const apply = (ctx) => {
    if (fillStyle)
      ctx.fillStyle = fillStyle;
    if (strokeStyle)
      ctx.strokeStyle = strokeStyle;
  };
  return apply;
};
var drawingStack = (ctx, stk) => {
  if (stk === void 0)
    stk = stack();
  const push = (op) => {
    if (stk === void 0)
      stk = stack();
    const s = stk.push(op);
    op(ctx);
    return drawingStack(ctx, s);
  };
  const pop = () => {
    const s = stk?.pop();
    return drawingStack(ctx, s);
  };
  const apply = () => {
    if (stk === void 0)
      return drawingStack(ctx);
    stk.forEach((op) => op(ctx));
    return drawingStack(ctx, stk);
  };
  return { push, pop, apply };
};
var lineThroughPoints = (ctx, points, opts) => {
  applyOpts(ctx, opts);
  ctx.moveTo(points[0].x, points[0].y);
  points.forEach((p, index) => {
    if (index + 2 >= points.length)
      return;
    const pNext = points[index + 1];
    const mid = {
      x: (p.x + pNext.x) / 2,
      y: (p.y + pNext.y) / 2
    };
    const cpX1 = (mid.x + p.x) / 2;
    const cpX2 = (mid.x + pNext.x) / 2;
    ctx.quadraticCurveTo(cpX1, pNext.y, mid.x, mid.y);
    ctx.quadraticCurveTo(cpX2, pNext.y, pNext.x, pNext.y);
  });
};
var circle = (ctx, circlesToDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const draw = (c) => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.radius, 0, PIPI);
    ctx.stroke();
  };
  if (Array.isArray(circlesToDraw))
    circlesToDraw.forEach(draw);
  else
    draw(circlesToDraw);
};
var paths = (ctx, pathsToDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const draw = (path) => {
    if (isQuadraticBezier(path))
      quadraticBezier(ctx, path, opts);
    else if (isLine(path))
      line(ctx, path, opts);
    else
      throw new Error(`Unknown path type ${JSON.stringify(path)}`);
  };
  if (Array.isArray(pathsToDraw))
    pathsToDraw.forEach(draw);
  else
    draw(pathsToDraw);
};
var connectedPoints = (ctx, pts, opts = {}) => {
  const shouldLoop = opts.loop ?? false;
  array(pts);
  if (pts.length === 0)
    return;
  pts.forEach((pt, i) => guard(pt, `Index ${i}`));
  applyOpts(ctx, opts);
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  pts.forEach((pt) => ctx.lineTo(pt.x, pt.y));
  if (shouldLoop)
    ctx.lineTo(pts[0].x, pts[0].y);
  ctx.stroke();
};
var pointLabels = (ctx, pts, opts = {}, labels) => {
  if (pts.length === 0)
    return;
  pts.forEach((pt, i) => guard(pt, `Index ${i}`));
  applyOpts(ctx, opts);
  pts.forEach((pt, i) => {
    const label = labels !== void 0 && i < labels.length ? labels[i] : i.toString();
    ctx.fillText(label.toString(), pt.x, pt.y);
  });
};
var dot = (ctx, pos, opts) => {
  if (opts === void 0)
    opts = {};
  const radius = opts.radius ?? 10;
  applyOpts(ctx, opts);
  ctx.beginPath();
  if (Array.isArray(pos)) {
    pos.forEach((p) => {
      ctx.arc(p.x, p.y, radius, 0, 2 * Math.PI);
    });
  } else {
    const p = pos;
    ctx.arc(p.x, p.y, radius, 0, 2 * Math.PI);
  }
  if (opts.filled || !opts.outlined)
    ctx.fill();
  if (opts.outlined)
    ctx.stroke();
};
var bezier = (ctx, bezierToDraw, opts) => {
  if (isQuadraticBezier(bezierToDraw)) {
    quadraticBezier(ctx, bezierToDraw, opts);
  } else if (isCubicBezier(bezierToDraw)) {
    cubicBezier(ctx, bezierToDraw, opts);
  }
};
var cubicBezier = (ctx, bezierToDraw, opts = {}) => {
  let stack2 = applyOpts(ctx, opts);
  const { a, b, cubic1, cubic2 } = bezierToDraw;
  const isDebug = opts.debug ?? false;
  if (isDebug) {
  }
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.bezierCurveTo(cubic1.x, cubic1.y, cubic2.x, cubic2.y, b.x, b.y);
  ctx.stroke();
  if (isDebug) {
    stack2 = stack2.push(optsOp({
      ...opts,
      strokeStyle: opacity(opts.strokeStyle ?? `silver`, 0.6),
      fillStyle: opacity(opts.fillStyle ?? `yellow`, 0.4)
    }));
    stack2.apply();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(cubic1.x, cubic1.y);
    ctx.stroke();
    ctx.moveTo(b.x, b.y);
    ctx.lineTo(cubic2.x, cubic2.y);
    ctx.stroke();
    ctx.fillText(`a`, a.x + 5, a.y);
    ctx.fillText(`b`, b.x + 5, b.y);
    ctx.fillText(`c1`, cubic1.x + 5, cubic1.y);
    ctx.fillText(`c2`, cubic2.x + 5, cubic2.y);
    dot(ctx, cubic1, { radius: 3 });
    dot(ctx, cubic2, { radius: 3 });
    dot(ctx, a, { radius: 3 });
    dot(ctx, b, { radius: 3 });
    stack2 = stack2.pop();
    stack2.apply();
  }
};
var quadraticBezier = (ctx, bezierToDraw, opts = {}) => {
  const { a, b, quadratic } = bezierToDraw;
  const isDebug = opts.debug ?? false;
  let stack2 = applyOpts(ctx, opts);
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.quadraticCurveTo(quadratic.x, quadratic.y, b.x, b.y);
  ctx.stroke();
  if (isDebug) {
    stack2 = stack2.push(optsOp({
      ...opts,
      strokeStyle: opacity(opts.strokeStyle ?? `silver`, 0.6),
      fillStyle: opacity(opts.fillStyle ?? `yellow`, 0.4)
    }));
    connectedPoints(ctx, [a, quadratic, b]);
    ctx.fillText(`a`, a.x + 5, a.y);
    ctx.fillText(`b`, b.x + 5, b.y);
    ctx.fillText(`h`, quadratic.x + 5, quadratic.y);
    dot(ctx, quadratic, { radius: 3 });
    dot(ctx, a, { radius: 3 });
    dot(ctx, b, { radius: 3 });
    stack2 = stack2.pop();
    stack2.apply();
  }
};
var line = (ctx, toDraw, opts = {}) => {
  const isDebug = opts.debug ?? false;
  applyOpts(ctx, opts);
  const draw = (d) => {
    const { a, b } = d;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    if (isDebug) {
      ctx.fillText(`a`, a.x, a.y);
      ctx.fillText(`b`, b.x, b.y);
      dot(ctx, a, { radius: 5, strokeStyle: `black` });
      dot(ctx, b, { radius: 5, strokeStyle: `black` });
    }
    ctx.stroke();
  };
  if (Array.isArray(toDraw))
    toDraw.forEach(draw);
  else
    draw(toDraw);
};
var rect = (ctx, toDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const draw = (d) => {
    if (opts.filled)
      ctx.fillRect(d.x, d.y, d.width, d.height);
    ctx.strokeRect(d.x, d.y, d.width, d.height);
    if (opts.debug) {
      pointLabels(ctx, getCorners(d), void 0, [`NW`, `NE`, `SE`, `SW`]);
    }
  };
  if (Array.isArray(toDraw))
    toDraw.forEach(draw);
  else
    draw(toDraw);
};
var textBlock = (ctx, lines, opts) => {
  applyOpts(ctx, opts);
  const anchorPadding = opts.anchorPadding ?? 0;
  const anchor = opts.anchor;
  const bounds = opts.bounds ?? { x: 0, y: 0, width: 1e6, height: 1e6 };
  const blocks = lines.map((l) => ctx.measureText(l));
  const widths = blocks.map((tm) => tm.width);
  const heights = blocks.map((tm) => tm.actualBoundingBoxAscent + tm.actualBoundingBoxDescent);
  const maxWidth = Math.max(...widths);
  const totalHeight = heights.reduce((acc, val) => acc + val, 0);
  let { x, y } = anchor;
  if (anchor.x + maxWidth > bounds.width)
    x = bounds.width - (maxWidth + anchorPadding);
  else
    x -= anchorPadding;
  if (x < bounds.x)
    x = bounds.x + anchorPadding;
  if (anchor.y + totalHeight > bounds.height)
    y = bounds.height - (totalHeight + anchorPadding);
  else
    y -= anchorPadding;
  if (y < bounds.y)
    y = bounds.y + anchorPadding;
  lines.forEach((line2, i) => {
    ctx.fillText(line2, x, y);
    y += heights[i];
  });
};

export {
  getCtx,
  makeHelper,
  arc,
  drawingStack,
  lineThroughPoints,
  circle,
  paths,
  connectedPoints,
  pointLabels,
  bezier,
  line,
  rect,
  textBlock,
  Drawing_exports
};
