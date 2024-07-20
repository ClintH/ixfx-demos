import {
  Video_exports
} from "./chunk-AZ2EKYQP.js";
import {
  clamp as clamp2,
  flip
} from "./chunk-2J7LUMRE.js";
import {
  minMaxAvg
} from "./chunk-BXWBMVS6.js";
import {
  parentSizeCanvas
} from "./chunk-63MQIVHE.js";
import {
  Svg_exports
} from "./chunk-RMARXYVJ.js";
import {
  getField,
  getPaths
} from "./chunk-RBLOJS6A.js";
import {
  Empty,
  ImageDataGrid_exports,
  corners,
  corners2,
  distanceToExterior,
  empty,
  emptyPositioned,
  intersectsPoint,
  isCubicBezier,
  isEqual,
  isEqualSize,
  isLine,
  isPlaceholder,
  isQuadraticBezier,
  placeholder,
  placeholderPositioned,
  subtract,
  subtract2
} from "./chunk-EX6BFSZ7.js";
import {
  guard
} from "./chunk-COIMNZ4Q.js";
import {
  Colour_exports,
  getCssVariable,
  opacity,
  randomHue,
  resolveToString,
  scale
} from "./chunk-4NG2GB4D.js";
import {
  resolveEl
} from "./chunk-ZNCB3DZ2.js";
import {
  minIndex
} from "./chunk-IALMVFKW.js";
import {
  clamp
} from "./chunk-REDAXMKO.js";
import {
  StackImmutable
} from "./chunk-JR5DG2GR.js";
import {
  ofArrayMutable,
  ofCircularMutable
} from "./chunk-KSOSZLHF.js";
import {
  immutable
} from "./chunk-RLUQAN6Q.js";
import {
  withoutUndefined
} from "./chunk-2XNNMGQC.js";
import {
  throwResult
} from "./chunk-N37UR7MZ.js";
import {
  throwArrayTest
} from "./chunk-QZ7DQTW7.js";
import {
  roundUpToMultiple
} from "./chunk-2EX73MGI.js";
import {
  ifNaN,
  throwNumberTest
} from "./chunk-JIDOUNL5.js";
import {
  __export
} from "./chunk-AFNFQUHK.js";

// src/visual/index.ts
var visual_exports = {};
__export(visual_exports, {
  BipolarView: () => BipolarView_exports,
  Colour: () => Colour_exports,
  Drawing: () => Drawing_exports,
  ImageDataGrid: () => ImageDataGrid_exports,
  Palette: () => Palette_exports,
  Plot2: () => Plot2_exports,
  PlotOld: () => PlotOld_exports,
  SceneGraph: () => SceneGraph_exports,
  Svg: () => Svg_exports,
  Video: () => Video_exports,
  scaleCanvas: () => scaleCanvas
});

// src/visual/Drawing.ts
var Drawing_exports = {};
__export(Drawing_exports, {
  arc: () => arc,
  bezier: () => bezier,
  circle: () => circle,
  connectedPoints: () => connectedPoints,
  copyToImg: () => copyToImg,
  dot: () => dot,
  drawingStack: () => drawingStack,
  ellipse: () => ellipse,
  getContext: () => getContext,
  line: () => line,
  lineThroughPoints: () => lineThroughPoints,
  makeHelper: () => makeHelper,
  paths: () => paths,
  pointLabels: () => pointLabels,
  rect: () => rect,
  textBlock: () => textBlock,
  textBlockAligned: () => textBlockAligned,
  textHeight: () => textHeight,
  textRect: () => textRect,
  textWidth: () => textWidth,
  translatePoint: () => translatePoint,
  triangle: () => triangle
});
var PIPI = Math.PI * 2;
var getContext = (canvasElementContextOrQuery) => {
  if (canvasElementContextOrQuery === null) {
    throw new Error(
      `canvasElCtxOrQuery null. Must be a 2d drawing context or Canvas element`
    );
  }
  if (canvasElementContextOrQuery === void 0) {
    throw new Error(
      `canvasElCtxOrQuery undefined. Must be a 2d drawing context or Canvas element`
    );
  }
  const ctx = canvasElementContextOrQuery instanceof CanvasRenderingContext2D ? canvasElementContextOrQuery : canvasElementContextOrQuery instanceof HTMLCanvasElement ? canvasElementContextOrQuery.getContext(`2d`) : typeof canvasElementContextOrQuery === `string` ? resolveEl(canvasElementContextOrQuery).getContext(`2d`) : canvasElementContextOrQuery;
  if (ctx === null) throw new Error(`Could not create 2d context for canvas`);
  return ctx;
};
var makeHelper = (ctxOrCanvasEl, canvasBounds) => {
  const ctx = getContext(ctxOrCanvasEl);
  return {
    ctx,
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
      if (opts.bounds === void 0 && canvasBounds !== void 0) {
        opts = { ...opts, bounds: { ...canvasBounds, x: 0, y: 0 } };
      }
      textBlock(ctx, lines, opts);
    }
  };
};
var optsOp = (opts) => coloringOp(opts.strokeStyle, opts.fillStyle);
var applyOpts = (ctx, opts = {}, ...additionalOps) => {
  if (ctx === void 0) throw new Error(`ctx undefined`);
  const stack = drawingStack(ctx).push(optsOp(opts), ...additionalOps);
  stack.apply();
  return stack;
};
var arc = (ctx, arcs, opts = {}) => {
  applyOpts(ctx, opts);
  const draw2 = (arc2) => {
    ctx.beginPath();
    ctx.arc(arc2.x, arc2.y, arc2.radius, arc2.startRadian, arc2.endRadian);
    ctx.stroke();
  };
  const arcsArray = Array.isArray(arcs) ? arcs : [arcs];
  for (const arc2 of arcsArray) {
    draw2(arc2);
  }
};
var coloringOp = (strokeStyle, fillStyle) => {
  const apply = (ctx) => {
    if (fillStyle) ctx.fillStyle = fillStyle;
    if (strokeStyle) ctx.strokeStyle = strokeStyle;
  };
  return apply;
};
var lineOp = (lineWidth, lineJoin, lineCap) => {
  const apply = (ctx) => {
    if (lineWidth) ctx.lineWidth = lineWidth;
    if (lineJoin) ctx.lineJoin = lineJoin;
    if (lineCap) ctx.lineCap = lineCap;
  };
  return apply;
};
var drawingStack = (ctx, stk) => {
  if (stk === void 0) stk = new StackImmutable();
  const push = (...ops) => {
    if (stk === void 0) stk = new StackImmutable();
    const s = stk.push(...ops);
    for (const o of ops) o(ctx);
    return drawingStack(ctx, s);
  };
  const pop = () => {
    const s = stk?.pop();
    return drawingStack(ctx, s);
  };
  const apply = () => {
    if (stk === void 0) return drawingStack(ctx);
    for (const op of stk.data) op(ctx);
    return drawingStack(ctx, stk);
  };
  return { push, pop, apply };
};
var lineThroughPoints = (ctx, points, opts) => {
  applyOpts(ctx, opts);
  ctx.moveTo(points[0].x, points[0].y);
  for (const [index, p] of points.entries()) {
    if (index + 2 >= points.length) continue;
    const pNext = points[index + 1];
    const mid = {
      x: (p.x + pNext.x) / 2,
      y: (p.y + pNext.y) / 2
    };
    const cpX1 = (mid.x + p.x) / 2;
    const cpX2 = (mid.x + pNext.x) / 2;
    ctx.quadraticCurveTo(cpX1, pNext.y, mid.x, mid.y);
    ctx.quadraticCurveTo(cpX2, pNext.y, pNext.x, pNext.y);
  }
};
var circle = (ctx, circlesToDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const draw2 = (c) => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.radius, 0, PIPI);
    if (opts.strokeStyle) ctx.stroke();
    if (opts.fillStyle) ctx.fill();
  };
  if (Array.isArray(circlesToDraw)) {
    for (const c of circlesToDraw) draw2(c);
  } else {
    draw2(circlesToDraw);
  }
};
var ellipse = (ctx, ellipsesToDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const draw2 = (ellipse2) => {
    ctx.beginPath();
    const rotation = ellipse2.rotation ?? 0;
    const startAngle = ellipse2.startAngle ?? 0;
    const endAngle = ellipse2.endAngle ?? PIPI;
    ctx.ellipse(ellipse2.x, ellipse2.y, ellipse2.radiusX, ellipse2.radiusY, rotation, startAngle, endAngle);
    if (opts.strokeStyle) ctx.stroke();
    if (opts.fillStyle) ctx.fill();
  };
  const ellipsesArray = Array.isArray(ellipsesToDraw) ? ellipsesToDraw : [ellipsesToDraw];
  for (const ellipse2 of ellipsesArray) {
    draw2(ellipse2);
  }
};
var paths = (ctx, pathsToDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const draw2 = (path) => {
    if (isQuadraticBezier(path)) quadraticBezier(ctx, path, opts);
    else if (isLine(path)) line(ctx, path, opts);
    else throw new Error(`Unknown path type ${JSON.stringify(path)}`);
  };
  if (Array.isArray(pathsToDraw)) {
    for (const p of pathsToDraw) draw2(p);
  } else {
    draw2(pathsToDraw);
  }
};
var connectedPoints = (ctx, pts, opts = {}) => {
  const shouldLoop = opts.loop ?? false;
  throwArrayTest(pts);
  if (pts.length === 0) return;
  for (const [index, pt] of pts.entries()) guard(pt, `Index ${index}`);
  applyOpts(ctx, opts);
  if (opts.lineWidth) ctx.lineWidth = opts.lineWidth;
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (const pt of pts) ctx.lineTo(pt.x, pt.y);
  if (shouldLoop) ctx.lineTo(pts[0].x, pts[0].y);
  if (opts.strokeStyle || opts.strokeStyle === void 0 && opts.fillStyle === void 0) {
    ctx.stroke();
  }
  if (opts.fillStyle) {
    ctx.fill();
  }
};
var pointLabels = (ctx, pts, opts = {}, labels) => {
  if (pts.length === 0) return;
  for (const [index, pt] of pts.entries()) guard(pt, `Index ${index}`);
  applyOpts(ctx, opts);
  for (const [index, pt] of pts.entries()) {
    const label = labels !== void 0 && index < labels.length ? labels[index] : index.toString();
    ctx.fillText(label.toString(), pt.x, pt.y);
  }
};
var translatePoint = (ctx, point) => {
  const m = ctx.getTransform();
  return {
    x: point.x * m.a + point.y * m.c + m.e,
    y: point.x * m.b + point.y * m.d + m.f
  };
};
var copyToImg = (canvasEl) => {
  const img = document.createElement(`img`);
  img.src = canvasEl.toDataURL(`image/jpeg`);
  return img;
};
var dot = (ctx, pos, opts) => {
  if (opts === void 0) opts = {};
  const radius = opts.radius ?? 10;
  applyOpts(ctx, opts);
  const makePath = () => {
    ctx.beginPath();
    if (Array.isArray(pos)) {
      for (const p of pos) {
        ctx.arc(p.x, p.y, radius, 0, 2 * Math.PI);
      }
    } else {
      const p = pos;
      ctx.arc(p.x, p.y, radius, 0, 2 * Math.PI);
    }
  };
  makePath();
  if (opts.filled || !opts.stroke) {
    ctx.fill();
  }
  if (opts.stroke) {
    if (opts.strokeWidth) ctx.lineWidth = opts.strokeWidth;
    ctx.stroke();
  }
};
var bezier = (ctx, bezierToDraw, opts) => {
  if (isQuadraticBezier(bezierToDraw)) {
    quadraticBezier(ctx, bezierToDraw, opts);
  } else if (isCubicBezier(bezierToDraw)) {
    cubicBezier(ctx, bezierToDraw, opts);
  }
};
var cubicBezier = (ctx, bezierToDraw, opts = {}) => {
  let stack = applyOpts(ctx, opts);
  const { a, b, cubic1, cubic2 } = bezierToDraw;
  const isDebug = opts.debug ?? false;
  if (isDebug) {
  }
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.bezierCurveTo(cubic1.x, cubic1.y, cubic2.x, cubic2.y, b.x, b.y);
  ctx.stroke();
  if (isDebug) {
    stack = stack.push(
      optsOp({
        ...opts,
        strokeStyle: opacity(opts.strokeStyle ?? `silver`, 0.6),
        fillStyle: opacity(opts.fillStyle ?? `yellow`, 0.4)
      })
    );
    stack.apply();
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
    stack = stack.pop();
    stack.apply();
  }
};
var quadraticBezier = (ctx, bezierToDraw, opts = {}) => {
  const { a, b, quadratic } = bezierToDraw;
  const isDebug = opts.debug ?? false;
  let stack = applyOpts(ctx, opts);
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.quadraticCurveTo(quadratic.x, quadratic.y, b.x, b.y);
  ctx.stroke();
  if (isDebug) {
    stack = stack.push(
      optsOp({
        ...opts,
        strokeStyle: opacity(opts.strokeStyle ?? `silver`, 0.6),
        fillStyle: opacity(opts.fillStyle ?? `yellow`, 0.4)
      })
    );
    connectedPoints(ctx, [a, quadratic, b]);
    ctx.fillText(`a`, a.x + 5, a.y);
    ctx.fillText(`b`, b.x + 5, b.y);
    ctx.fillText(`h`, quadratic.x + 5, quadratic.y);
    dot(ctx, quadratic, { radius: 3 });
    dot(ctx, a, { radius: 3 });
    dot(ctx, b, { radius: 3 });
    stack = stack.pop();
    stack.apply();
  }
};
var line = (ctx, toDraw, opts = {}) => {
  const isDebug = opts.debug ?? false;
  const o = lineOp(opts.lineWidth, opts.lineJoin, opts.lineCap);
  applyOpts(ctx, opts, o);
  const draw2 = (d) => {
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
  if (Array.isArray(toDraw)) {
    for (const t of toDraw) draw2(t);
  } else {
    draw2(toDraw);
  }
};
var triangle = (ctx, toDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const draw2 = (t) => {
    connectedPoints(ctx, corners2(t), { ...opts, loop: true });
    if (opts.debug) {
      pointLabels(ctx, corners2(t), void 0, [`a`, `b`, `c`]);
    }
  };
  if (Array.isArray(toDraw)) {
    for (const t of toDraw) {
      draw2(t);
    }
  } else {
    draw2(toDraw);
  }
};
var rect = (ctx, toDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const filled = opts.filled ?? (opts.fillStyle === void 0 ? false : true);
  const stroke = opts.stroke ?? (opts.strokeStyle === void 0 ? false : true);
  const draw2 = (d) => {
    const x = `x` in d ? d.x : 0;
    const y = `y` in d ? d.y : 0;
    if (filled) ctx.fillRect(x, y, d.width, d.height);
    if (stroke) {
      if (opts.strokeWidth) ctx.lineWidth = opts.strokeWidth;
      ctx.strokeRect(x, y, d.width, d.height);
    }
    if (opts.debug) {
      pointLabels(ctx, corners(d), void 0, [`NW`, `NE`, `SE`, `SW`]);
    }
  };
  if (Array.isArray(toDraw)) {
    for (const t of toDraw) {
      draw2(t);
    }
  } else {
    draw2(toDraw);
  }
};
var textWidth = (ctx, text, padding = 0, widthMultiple) => {
  const rect2 = textRect(ctx, text, padding, widthMultiple);
  return rect2.width;
};
var textRect = (ctx, text, padding = 0, widthMultiple) => {
  if (text === void 0 || text === null || text.length === 0) return empty;
  const m = ctx.measureText(text);
  const width = widthMultiple ? roundUpToMultiple(m.width, widthMultiple) + padding : m.width + padding;
  return {
    width,
    height: m.actualBoundingBoxAscent + m.actualBoundingBoxDescent + padding + padding
  };
};
var textHeight = (ctx, text, padding = 0) => {
  const rect2 = textRect(ctx, text, padding);
  return rect2.height;
};
var textBlock = (ctx, lines, opts) => {
  applyOpts(ctx, opts);
  const anchorPadding = opts.anchorPadding ?? 0;
  const anchor = opts.anchor;
  const bounds = opts.bounds ?? { x: 0, y: 0, width: 1e6, height: 1e6 };
  const blocks = lines.map((l) => ctx.measureText(l));
  const widths = blocks.map((tm) => tm.width);
  const heights = blocks.map(
    (tm) => tm.actualBoundingBoxAscent + tm.actualBoundingBoxDescent
  );
  const maxWidth = Math.max(...widths);
  const totalHeight = heights.reduce((accumulator, value) => accumulator + value, 0);
  let { x, y } = anchor;
  if (anchor.x + maxWidth > bounds.width) {
    x = bounds.width - (maxWidth + anchorPadding);
  } else x -= anchorPadding;
  if (x < bounds.x) x = bounds.x + anchorPadding;
  if (anchor.y + totalHeight > bounds.height) {
    y = bounds.height - (totalHeight + anchorPadding);
  } else y -= anchorPadding;
  if (y < bounds.y) y = bounds.y + anchorPadding;
  for (const [index, line2] of lines.entries()) {
    ctx.fillText(line2, x, y);
    y += heights[index];
  }
};
var textBlockAligned = (ctx, text, opts) => {
  const { bounds } = opts;
  const { horiz = `left`, vert = `top` } = opts;
  const lines = typeof text === `string` ? [text] : text;
  applyOpts(ctx, opts);
  ctx.save();
  ctx.translate(bounds.x, bounds.y);
  ctx.textAlign = `left`;
  ctx.textBaseline = `top`;
  const middleX = bounds.width / 2;
  const middleY = bounds.height / 2;
  const blocks = lines.map((l) => ctx.measureText(l));
  const heights = blocks.map(
    (tm) => tm.actualBoundingBoxAscent + tm.actualBoundingBoxDescent
  );
  const totalHeight = heights.reduce((accumulator, value) => accumulator + value, 0);
  let y = 0;
  if (vert === `center`) y = middleY - totalHeight / 2;
  else if (vert === `bottom`) {
    y = bounds.height - totalHeight;
  }
  for (const [index, line2] of lines.entries()) {
    let x = 0;
    if (horiz === `center`) x = middleX - blocks[index].width / 2;
    else if (horiz === `right`) x = bounds.width - blocks[index].width;
    ctx.fillText(line2, x, y);
    y += heights[index];
  }
  ctx.restore();
};

// src/visual/Plot2.ts
var Plot2_exports = {};
__export(Plot2_exports, {
  AxisX: () => AxisX,
  AxisY: () => AxisY,
  Legend: () => Legend,
  Plot: () => Plot,
  PlotArea: () => PlotArea,
  Series: () => Series
});

// src/visual/SceneGraph.ts
var SceneGraph_exports = {};
__export(SceneGraph_exports, {
  Box: () => Box,
  CanvasBox: () => CanvasBox,
  CanvasLayoutState: () => CanvasLayoutState,
  CanvasMeasureState: () => CanvasMeasureState,
  LayoutState: () => LayoutState,
  MeasureState: () => MeasureState,
  boxRectFromPx: () => boxRectFromPx,
  boxRectFromRectPx: () => boxRectFromRectPx,
  boxUnitFromPx: () => boxUnitFromPx
});

// src/geometry/rect/Clamp.ts
var clamp3 = (value, maximum) => {
  return Object.freeze({
    ...value,
    width: Math.min(value.width, maximum.width),
    height: Math.min(value.height, maximum.height)
  });
};

// src/visual/SceneGraph.ts
var boxUnitFromPx = (v) => {
  return { type: `px`, value: v };
};
var boxRectFromPx = (x, y, width, height) => {
  return {
    x: boxUnitFromPx(x),
    y: boxUnitFromPx(y),
    width: boxUnitFromPx(width),
    height: boxUnitFromPx(height)
  };
};
var boxRectFromRectPx = (r) => {
  return {
    x: boxUnitFromPx(r.x),
    y: boxUnitFromPx(r.y),
    width: boxUnitFromPx(r.width),
    height: boxUnitFromPx(r.height)
  };
};
var unitIsEqual = (a, b) => {
  if (a.type === `px` && b.type === `px`) {
    return a.value === b.value;
  }
  return false;
};
var boxRectIsEqual = (a, b) => {
  if (a === void 0 && b === void 0) return true;
  if (a === void 0) return false;
  if (b === void 0) return false;
  if (a.x && b.x && !unitIsEqual(a.x, b.x)) return false;
  if (a.y && b.y && !unitIsEqual(a.y, b.y)) return false;
  if (a.width && b.width && !unitIsEqual(a.width, b.width)) return false;
  if (a.height && b.height && !unitIsEqual(a.height, b.height)) return false;
  return true;
};
var BaseState = class {
  bounds;
  pass;
  constructor(bounds) {
    this.bounds = bounds;
    this.pass = 0;
  }
  resolveToPx(u, maxValue, defaultValue) {
    if (u === void 0 && defaultValue !== void 0) return defaultValue;
    if (u === void 0) return;
    if (u.type === void 0) throw new TypeError(`Expected 'type' and 'value' fields. Type is missing`);
    if (u.value === void 0) throw new TypeError(`Expected 'type' and 'value' fields. Value is missing`);
    if (u.type === `px`) return u.value;
    if (u.type === `pc`) return u.value * maxValue;
    throw new Error(`Unknown unit type: ${u.type}`);
  }
  resolveBox(box) {
    if (box === void 0) return void 0;
    const x = this.resolveToPx(box.x, this.bounds.width);
    const y = this.resolveToPx(box.y, this.bounds.height);
    const width = this.resolveToPx(box.width, this.bounds.width);
    const height = this.resolveToPx(box.height, this.bounds.height);
    if (!width || !height) throw new TypeError(`Expected width and height`);
    if (x === void 0 && y === void 0) {
      return Object.freeze({ width, height });
    } else {
      if (!x || !y) throw new TypeError(`Expected x and y`);
      return Object.freeze({
        x,
        y,
        width,
        height
      });
    }
  }
};
var MeasureState = class extends BaseState {
  measurements;
  constructor(bounds) {
    super(bounds);
    this.measurements = /* @__PURE__ */ new Map();
  }
  getActualSize(id) {
    const s = this.measurements.get(id);
    if (s === void 0) return;
    if (isPlaceholder(s.actual)) return;
    return s.actual;
  }
  whatIsMeasured() {
    return [...this.measurements.keys()];
  }
};
var LayoutState = class extends BaseState {
  layouts;
  constructor(bounds) {
    super(bounds);
    this.layouts = /* @__PURE__ */ new Map();
  }
};
var Box = class {
  /** Rectangle Box occupies in canvas/etc */
  canvasRegion = placeholderPositioned;
  _desiredRect;
  _measuredSize;
  _layoutPosition;
  children = [];
  _parent;
  _idMap = /* @__PURE__ */ new Map();
  debugLayout = false;
  _visible = true;
  _ready = true;
  takesSpaceWhenInvisible = false;
  _needsMeasuring = true;
  _needsLayoutX = true;
  _needsDrawing = true;
  debugHue = randomHue();
  id;
  /**
   * Constructor.
   * 
   * If `parent` is provided, `parent.onChildAdded(this)` is called.
   * @param parent parent box 
   * @param id id of this box
   */
  constructor(parent, id) {
    this.id = id;
    this._parent = parent;
    parent?.onChildAdded(this);
  }
  /**
   * Returns _true_ if `box` is a child
   * @param box 
   * @returns 
   */
  hasChild(box) {
    const byReference = this.children.find((c) => c === box);
    const byId = this.children.find((c) => c.id === box.id);
    return byReference !== void 0 || byId !== void 0;
  }
  /**
   * Sends a message to all child boxes.
   * 
   * This first calls `onNotify` on this instance,
   * before calling `notify()` on each child.
   * @param message 
   * @param source 
   */
  notify(message, source) {
    this.onNotify(message, source);
    for (const c of this.children) c.notify(message, source);
  }
  *getChildren() {
    return this.children.entries();
  }
  /**
   * Handles a received message
   * @param _message 
   * @param _source 
   */
  onNotify(_message, _source) {
  }
  /**
   * Notification a child box has been added
   * 
   * Throws if
   * - child has parent as its own child
   * - child is same as this
   * - child is already child of this
   * @param child 
   */
  onChildAdded(child) {
    if (child.hasChild(this)) throw new Error(`Recursive`);
    if (child === this) throw new Error(`Cannot add self as child`);
    if (this.hasChild(child)) throw new Error(`Child already present`);
    this.children.push(child);
    this._idMap.set(child.id, child);
    this.layoutInvalidated(`Box.onChildAdded`);
  }
  /**
   * Sets `_ready` to `ready`. If `includeChildren` is _true_,
   * `setReady` is called on each child
   * @param ready 
   * @param includeChildren 
   */
  setReady(ready, includeChildren = false) {
    this._ready = ready;
    if (includeChildren) {
      for (const c of this.children) c.setReady(ready, includeChildren);
    }
  }
  /**
   * Gets visible state
   */
  get visible() {
    return this._visible;
  }
  /**
   * Sets visible state
   */
  set visible(v) {
    if (this._visible === v) return;
    this._visible = v;
    this.layoutInvalidated(`Box.set visible`);
  }
  /**
   * Gets the box's desired region, or _undefined_
   */
  get desiredRegion() {
    return this._desiredRect;
  }
  /**
   * Sets the box's desired region.
   * Calls `onLayoutNeeded()`
   */
  set desiredRegion(v) {
    if (boxRectIsEqual(v, this._desiredRect)) return;
    this._desiredRect = v;
    this.layoutInvalidated(`set desiredRegion`);
  }
  /**
   * Calls `notifyChildLayoutNeeded`
   */
  layoutInvalidated(reason) {
    if (reason === void 0) debugger;
    this.debugLog(`layoutInvalidated ${reason}`);
    this._needsMeasuring = true;
    this._needsLayoutX = true;
    this._needsDrawing = true;
    this.notifyChildLayoutNeeded();
  }
  drawingInvalidated(_reason) {
    this._needsDrawing = true;
  }
  /**
   * Called from a child, notifying us that
   * its layout has changed
   * @returns 
   */
  notifyChildLayoutNeeded() {
    this._needsDrawing = true;
    this._needsLayoutX = true;
    this._needsMeasuring = true;
    if (this._parent === void 0) return;
    this._parent.notifyChildLayoutNeeded();
  }
  /**
   * Returns the root box
   */
  get root() {
    if (this._parent === void 0) return this;
    return this._parent.root;
  }
  /**
   * Prepare for measuring
   */
  measurePreflight() {
  }
  /**
   * Applies actual size, returning _true_ if size is different than before
   * 
   * 1. Sets `_needsLayout` to _false_.
   * 2. Sets `visual` to `m`
   * 3. Calls `measureApply` on each child
   * 4. If there's a change or `force`, sets `needsDrawing` to _true_, and notifies root of `measureApplied`
   * @param m Measurement for box
   * @returns 
   */
  measureApply(m) {
    this._needsMeasuring = false;
    const different = this._measuredSize === void 0 ? true : !isEqualSize(m.actual, this._measuredSize);
    if (different) {
      this._needsLayoutX = true;
    }
    this._measuredSize = { width: m.actual.width, height: m.actual.height };
    for (const c of m.children) {
      if (c !== void 0) c.ref.measureApply(c);
    }
    if (different) {
      this.root.notify(`measureApplied`, this);
    }
    return different;
  }
  layoutApply(l) {
    this._needsLayoutX = false;
    const different = this._layoutPosition === void 0 ? true : !isEqual(l.actual, this._layoutPosition);
    this._layoutPosition = { x: l.actual.x, y: l.actual.y };
    for (const c of l.children) {
      if (c !== void 0) c.ref.layoutApply(c);
    }
    if (different) {
      this.root.notify(`layoutApplied`, this);
    }
    return different;
  }
  /**
   * Debug log from this box context
   * @param m 
   */
  debugLog(m) {
    if (!this.debugLayout) return;
    console.log(`SceneGraph[${this.id}]`, m);
  }
  layoutStart(measureState, layoutState, force, parent) {
    const m = {
      ref: this,
      actual: Empty,
      children: []
    };
    layoutState.layouts.set(this.id, m);
    const currentPosition = this.layoutSelf(measureState, layoutState, parent);
    this.root.notify(`laidout`, this);
    if (currentPosition === void 0) return;
    m.actual = currentPosition;
    m.children = this.children.map((c) => c.layoutStart(measureState, layoutState, force, m));
    if (withoutUndefined(m.children).length < this.children.length) {
      return void 0;
    }
    return m;
  }
  layoutSelf(measureState, layoutState, _parent) {
    const box = layoutState.resolveBox(this._desiredRect);
    const x = box === void 0 ? 0 : `x` in box ? box.x : 0;
    const y = box === void 0 ? 0 : `y` in box ? box.y : 0;
    if (x === void 0) debugger;
    if (y === void 0) debugger;
    return { x, y };
  }
  /**
   * Start of measuring
   * 1. Keeps track of measurements in `opts.measurements`
   * 2. If this box takes space
   * 2.1. Measure itself if needed
   * 2.2. Use size
   * 2. Calls `measureStart` on each child
   * @param opts Options
   * @param force Force measurement
   * @param parent Parent's measurement 
   * @returns Measurement
   */
  measureStart(opts, force, parent) {
    this.measurePreflight();
    const m = {
      ref: this,
      // So far no known measurement
      actual: placeholder,
      children: []
    };
    opts.measurements.set(this.id, m);
    if (!this._visible && !this.takesSpaceWhenInvisible) {
      m.actual = emptyPositioned;
    } else {
      let currentMeasurement = this._measuredSize;
      if (this._needsMeasuring || this._measuredSize === void 0) {
        currentMeasurement = this.measureSelf(opts, parent);
        this.root.notify(`measured`, this);
      }
      if (typeof currentMeasurement === `string`) {
        return;
      } else if (currentMeasurement === void 0) {
        return;
      }
      m.actual = currentMeasurement;
    }
    m.children = this.children.map((c) => c.measureStart(opts, force, m));
    if (withoutUndefined(m.children).length < this.children.length) {
      return void 0;
    }
    return m;
  }
  /**
   * Measure the box
   * 1. Uses desired rectangle, if possible
   * 2. Otherwise uses parent's size
   * @param opts Measure state
   * @param parent Parent size
   * @returns 
   */
  measureSelf(opts, parent) {
    let size = placeholder;
    const context = parent ? parent.actual : opts.bounds;
    const desired = opts.resolveBox(this._desiredRect);
    size = desired ? clamp3(desired, context) : context;
    if (isPlaceholder(size)) {
      return `Box.measureSelf - No size for box?`;
    }
    return size;
  }
  // protected updateDone(state: MeasureState, force: boolean): void {
  //   this.onUpdateDone(state, force);
  //   for (const c of this.children) c.updateDone(state, force);
  // }
  /**
   * Update has completed
   * @param state 
   * @param force 
   */
  //abstract onUpdateDone(state: MeasureState, force: boolean): void;
  /**
   * Update
   * 1. Calls `this.updateBegin()` to initialise measurement state
   * 2. In a loop, run `measureStart()` and then `measureApply` if possible
   * 3. Call `updateDone` when finished
   * @param force Force update
   * @returns 
   */
  update(context, force = false) {
    if (context === void 0) throw new Error(`context is undefined`);
    if (!this._needsMeasuring && !this._needsLayoutX && !force) return;
    const [measureState, layoutState] = this.updateBegin(context);
    let attempts = 5;
    let measureApplied = false;
    let layoutApplied = false;
    if (this._needsMeasuring || force) {
      while (attempts--) {
        const m = this.measureStart(measureState, force);
        if (m !== void 0) {
          this.measureApply(m);
          if (!this._ready) return;
          measureApplied = true;
        }
      }
      if (!measureApplied) this.debugLog(`Ran out of measurement attempts`);
    }
    if (this._needsLayoutX || force) {
      const p = this.layoutStart(measureState, layoutState, force);
      if (p === void 0) {
        this.debugLog(`Warning: could not layout`);
      } else {
        this.layoutApply(p);
        layoutApplied = true;
      }
    }
    this.updateComplete(measureApplied, layoutApplied);
  }
};
var CanvasMeasureState = class extends MeasureState {
  ctx;
  constructor(bounds, ctx) {
    super(bounds);
    this.ctx = ctx;
    if (ctx === void 0) throw new Error(`ctx is undefined`);
  }
};
var CanvasLayoutState = class extends LayoutState {
  ctx;
  constructor(bounds, ctx) {
    super(bounds);
    this.ctx = ctx;
    if (ctx === void 0) throw new Error(`ctx is undefined`);
  }
};
var CanvasBox = class _CanvasBox extends Box {
  bounds;
  constructor(parent, id, bounds) {
    super(parent, id);
    this.bounds = bounds;
    this.debugLog(`CanvasBox ctor bounds: ${JSON.stringify(bounds)}`);
  }
  static fromCanvas(canvasElement) {
    const box = new _CanvasBox(void 0, `canvas-box`, canvasElement.getBoundingClientRect());
    return box;
  }
  /**
   * Called if this is the parent Box
   */
  addEventHandlers(element) {
    element.addEventListener(`pointermove`, (event) => {
      const p = { x: event.offsetX, y: event.offsetY };
      this.notifyPointerMove(p);
    });
    element.addEventListener(`pointerleave`, (_event) => {
      this.notifyPointerLeave();
    });
    element.addEventListener(`click`, (event) => {
      const p = { x: event.offsetX, y: event.offsetY };
      this.notifyClick(p);
    });
  }
  onClick(_p) {
  }
  /**
   * Click event has happened on canvas
   * 1. If it's within our range, call `onClick` and pass to all children via `notifyClick`
   * @param p 
   * @returns 
   */
  notifyClick(p) {
    if (isPlaceholder(this.canvasRegion)) return;
    if (intersectsPoint(this.canvasRegion, p)) {
      const pp = subtract(p, this.canvasRegion.x, this.canvasRegion.y);
      this.onClick(pp);
      for (const c of this.children) c.notifyClick(pp);
    }
  }
  /**
   * Pointer has left
   * 1. Pass notification to all children via `notifyPointerLeave`
   */
  notifyPointerLeave() {
    this.onPointerLeave();
    for (const c of this.children) c.notifyPointerLeave();
  }
  /**
   * Pointer has moved
   * 1. If it's within range `onPointerMove` is called, and pass on to all children via `notifyPointerMove`
   * @param p 
   * @returns 
   */
  notifyPointerMove(p) {
    if (isPlaceholder(this.canvasRegion)) return;
    if (intersectsPoint(this.canvasRegion, p)) {
      const pp = subtract(p, this.canvasRegion.x, this.canvasRegion.y);
      this.onPointerMove(pp);
      for (const c of this.children) c.notifyPointerMove(pp);
    }
  }
  /**
   * Handler when pointer has left
   */
  onPointerLeave() {
  }
  /**
   * Handler when pointer moves within our region
   * @param _p 
   */
  onPointerMove(_p) {
  }
  /**
   * Performs recalculations and drawing as necessary
   * If nothing needs to happen, function returns.
   * @param context 
   * @param force Force update
   */
  update(context, force = false) {
    super.update(context, force);
    this.draw(context, force);
  }
  getBounds() {
    return this.bounds === void 0 && this._parent ? this._parent.bounds : this.bounds;
  }
  /**
   * Update begins.
   * @returns MeasureState
   */
  updateBegin(context) {
    if (context === void 0) throw new Error(`Context is undefined`);
    let bounds = this.getBounds();
    if (bounds === void 0) {
      this.debugLog(`No bounds for element or parent, using canvas bounds`);
      bounds = { x: 0, y: 0, width: context.canvas.width, height: context.canvas.height };
    }
    return [
      new CanvasMeasureState(bounds, context),
      new CanvasLayoutState(bounds, context)
    ];
  }
  updateComplete(_measureChanged, _layoutChanged) {
    this.canvasRegion = placeholderPositioned;
  }
  measureApply(m) {
    const different = super.measureApply(m);
    if (different) this.canvasRegion = placeholderPositioned;
    return different;
  }
  layoutApply(l) {
    const different = super.layoutApply(l);
    if (different) this.canvasRegion = placeholderPositioned;
    return different;
  }
  draw(ctx, force = false) {
    if (this._needsDrawing || force) {
      if (isPlaceholder(this.canvasRegion)) {
        if (this._layoutPosition === void 0) return;
        if (this._measuredSize === void 0) return;
        this.canvasRegion = {
          x: this._layoutPosition.x,
          y: this._layoutPosition.y,
          width: this._measuredSize.width,
          height: this._measuredSize.height
        };
      }
      if (this._needsLayoutX || this._needsMeasuring) {
      }
      ctx.save();
      const v = this.canvasRegion;
      ctx.translate(v.x, v.y);
      if (this.debugLayout) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = `hsl(${this.debugHue}, 100%, 50%)`;
        ctx.strokeRect(0, 0, v.width, v.height);
        ctx.fillStyle = ctx.strokeStyle;
        ctx.fillText(this.id, 10, 10, v.width);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(v.width, v.height);
        ctx.stroke();
      }
      this.drawSelf(ctx);
      this._needsDrawing = false;
      ctx.restore();
    }
    for (const c of this.children) {
      c.draw(ctx, force);
    }
  }
  /**
   * Draw this object
   * @param _ctx 
   */
  drawSelf(_ctx) {
  }
};

// src/visual/ScaleCanvas.ts
var scaleCanvas = (domQueryOrElement) => {
  const canvasElement = resolveEl(domQueryOrElement);
  const ratio = window.devicePixelRatio;
  canvasElement.style.width = canvasElement.width + `px`;
  canvasElement.style.height = canvasElement.height + `px`;
  canvasElement.width *= devicePixelRatio;
  canvasElement.height *= devicePixelRatio;
  const getContext2 = () => {
    const ctx = canvasElement.getContext(`2d`);
    if (ctx === null) throw new Error(`Could not get drawing context`);
    ctx.save();
    ctx.scale(ratio, ratio);
    return ctx;
  };
  return { ctx: getContext2(), element: canvasElement, bounds: canvasElement.getBoundingClientRect() };
};

// src/visual/Plot2.ts
var ArrayDataSource = class {
  data;
  series;
  dirty = false;
  type = `array`;
  _range;
  constructor(series) {
    this.series = series;
    this.data = [];
    this.dirty = true;
  }
  clear() {
    this.set([]);
    this._range = void 0;
  }
  set(data) {
    this.data = data;
    this.dirty = true;
  }
  get length() {
    return this.data.length;
  }
  get range() {
    if (!this.dirty && this._range !== void 0) return this._range;
    this.dirty = false;
    const updatedRange = minMaxAvg(this.data);
    if (this._range === void 0 || updatedRange.max !== this._range.max || updatedRange.min !== this._range.min) {
      this._range = updatedRange;
      return { ...this._range, changed: true };
    } else {
      return { ...this._range, changed: false };
    }
  }
  add(value) {
    this.data = [...this.data, value];
    this.dirty = true;
  }
};
var StreamingDataSource = class extends ArrayDataSource {
  desiredDataPointMinWidth = 5;
  add(value) {
    const lastWidth = this.series.lastPxPerPt;
    if (lastWidth > -1 && lastWidth < this.desiredDataPointMinWidth) {
      const pts = Math.floor(this.desiredDataPointMinWidth / lastWidth);
      const d = [...this.data.slice(pts), value];
      super.set(d);
    } else super.add(value);
  }
};
var Series = class {
  constructor(name, sourceType, plot2, opts) {
    this.plot = plot2;
    this.name = name;
    this.drawingStyle = opts.drawingStyle ?? `line`;
    this.colour = opts.colour;
    this.width = opts.width ?? 3;
    this.axisRange = opts.axisRange ?? { min: Number.NaN, max: Number.NaN };
    this._visualRange = { ...this.axisRange };
    this._visualRangeStretch = opts.visualRangeStretch ?? true;
    if (sourceType === `array`) {
      this.source = new ArrayDataSource(this);
    } else if (sourceType === `stream`) {
      this.source = new StreamingDataSource(this);
    } else throw new Error(`Unknown sourceType. Expected array|stream`);
  }
  name;
  colour;
  source;
  drawingStyle;
  width = 3;
  dataHitPoint;
  tooltip;
  precision = 2;
  axisRange;
  // How many pixels wide per data point on last draw
  lastPxPerPt = -1;
  _visualRange;
  _visualRangeStretch;
  formatValue(v) {
    return v.toFixed(this.precision);
  }
  get visualRange() {
    let vr = this._visualRange;
    const sourceRange = this.source.range;
    let changed = false;
    if (sourceRange.changed) {
      if (this._visualRangeStretch) {
        const rmin = Math.min(ifNaN(vr.min, sourceRange.min), sourceRange.min);
        const rmax = Math.max(ifNaN(vr.max, sourceRange.max), sourceRange.max);
        if (rmin !== vr.min || rmax !== vr.max) {
          vr = { min: rmin, max: rmax };
          changed = true;
        }
      } else {
        if (!isRangeEqual(sourceRange, vr)) {
          vr = sourceRange;
          changed = true;
        }
      }
    }
    this._visualRange = vr;
    return { ...vr, changed };
  }
  scaleValue(value) {
    if (this.source === void 0) return value;
    const r = this.visualRange;
    if (r.changed) {
      this.plot.notify(`range-change`, this.plot.plotArea);
    }
    if (r.min == r.max) {
      return 0.5;
    }
    return scale(value, r.min, r.max);
  }
  add(value) {
    throwNumberTest(value, ``, `value`);
    this.source.add(value);
    this.plot.plotArea.drawingInvalidated(`Series.add`);
  }
  /**
   * Clears the underlying source
   * and sets a flag that the plot area needs redrawing
   */
  clear() {
    this.source.clear();
    this._visualRange = { ...this.axisRange };
    this.plot.plotArea.layoutInvalidated(`Series.clear`);
  }
};
var PlotArea = class extends CanvasBox {
  constructor(plot2, region) {
    super(plot2, `PlotArea`, region);
    this.plot = plot2;
  }
  paddingPx = 0;
  piPi = Math.PI * 2;
  // If pointer is more than this distance away from a data point, it's ignored
  pointerDistanceThreshold = 20;
  lastRangeChange = 0;
  pointer;
  clear() {
    this.lastRangeChange = 0;
    this.pointer = void 0;
  }
  measureSelf(opts, _parent) {
    const axisY = opts.getActualSize(`AxisY`);
    const padding = this.paddingPx;
    const legend = opts.getActualSize(`Legend`);
    const legendHeight = legend?.height ?? 0;
    const axisX = opts.getActualSize(`AxisX`);
    const axisXHeight = axisX?.height ?? 0;
    if (!axisY) return `No AxisY. Measured: ${opts.whatIsMeasured().join(`, `)}`;
    if (!legend) return `No Legend`;
    if (!axisX) return `No AxisX`;
    return {
      width: opts.bounds.width - axisY.width - this.paddingPx,
      height: opts.bounds.height - legendHeight - axisXHeight - padding
    };
  }
  layoutSelf(measureState, _layoutState, _parent) {
    const axisY = measureState.getActualSize(`AxisY`);
    const padding = this.paddingPx;
    const axisYWidth = axisY?.width ?? 0;
    return {
      x: axisYWidth,
      y: padding
      // layoutState.bounds.height - height - axisXHeight - legendHeight
    };
  }
  onNotify(message, source) {
    if (message === `measureApplied` && source === this.plot.axisY)
      this.layoutInvalidated(`PlotArea.onNotify measureApplied to axisY`);
    if (message === `laidout` && source === this.plot.legend)
      this.layoutInvalidated(`PlotArea.onNotify laidout to legend`);
  }
  // protected onClick(p: Point): void {
  //   this.plot.frozen = !this.plot.frozen;
  // }
  onPointerLeave() {
    for (const series of this.plot.series.values()) {
      series.tooltip = void 0;
    }
    this.pointer = void 0;
    this.plot.legend.drawingInvalidated(`PlotArea.onPointerLeave`);
  }
  onPointerMove(p) {
    this.pointer = p;
    this.plot.legend.drawingInvalidated(`PlotArea.onPointerMove`);
  }
  measurePreflight() {
    this.updateTooltip();
  }
  updateTooltip() {
    const p = this.pointer;
    if (p === void 0) return;
    for (const series of this.plot.series.values()) {
      if (p === void 0) {
        series.tooltip = void 0;
        return;
      }
      if (series.dataHitPoint === void 0) return;
      const v = series.dataHitPoint(p);
      if (v[0] === void 0) return;
      if (v[1] > this.pointerDistanceThreshold) return;
      series.tooltip = series.formatValue(v[0].value);
    }
    this.plot.legend.drawingInvalidated(`PlotArea.updateTooltip`);
  }
  drawSelf(ctx) {
    if (this.plot.frozen) return;
    const seriesCopy = this.plot.seriesArray();
    ctx.clearRect(0, -1, this.canvasRegion.width, this.canvasRegion.height);
    for (const series of seriesCopy) {
      if (series.source.type === `array` || series.source.type === `stream`) {
        const arraySeries = series.source;
        if (arraySeries.data === void 0) return;
        const d = [...arraySeries.data];
        this.drawDataSet(series, d, ctx);
      } else console.warn(`Unknown data source type ${series.source.type}`);
    }
  }
  computeY(series, rawValue) {
    const s = series.scaleValue(rawValue);
    return flip(s) * this.canvasRegion.height + this.paddingPx;
  }
  drawDataSet(series, d, ctx) {
    const padding = this.paddingPx + series.width;
    const v = subtract2(this.canvasRegion, padding * 2, padding * 3.5);
    const pxPerPt = v.width / d.length;
    series.lastPxPerPt = pxPerPt;
    let x = padding;
    ctx.strokeStyle = series.colour;
    ctx.lineWidth = series.width;
    const shapes = [];
    series.dataHitPoint = (pt) => {
      const distances = shapes.map((v2) => distanceToExterior(pt, v2));
      const index = minIndex(...distances);
      const closest = shapes[index];
      if (closest === void 0) [void 0, 0];
      return [closest, distances[index]];
    };
    if (series.drawingStyle === `line`) {
      let y = 0;
      ctx.beginPath();
      for (let index = 0; index < d.length; index++) {
        const scaled = clamp(series.scaleValue(d[index]));
        y = padding + this.paddingPx + v.height * flip(scaled);
        shapes.push({ x, y, index, value: d[index] });
        if (index == 0) ctx.moveTo(x + pxPerPt / 2, y);
        else ctx.lineTo(x + pxPerPt / 2, y);
        if (y > this.canvasRegion.height)
          console.warn(`${y} h: ${this.canvasRegion.height}`);
        x += pxPerPt;
      }
      ctx.strokeStyle = series.colour;
      ctx.stroke();
    } else if (series.drawingStyle === `dotted`) {
      let y = 0;
      ctx.fillStyle = series.colour;
      for (let index = 0; index < d.length; index++) {
        const scaled = series.scaleValue(d[index]);
        y = padding + v.height * flip(scaled);
        ctx.beginPath();
        ctx.arc(x + pxPerPt / 2, y, series.width, 0, this.piPi);
        ctx.fill();
        shapes.push({ radius: series.width, x, y, index, value: d[index] });
        x += pxPerPt;
      }
    } else if (series.drawingStyle === `bar`) {
      ctx.fillStyle = series.colour;
      const interBarPadding = Math.ceil(pxPerPt * 0.1);
      for (let index = 0; index < d.length; index++) {
        const scaled = series.scaleValue(d[index]);
        const h = v.height * scaled;
        const r = {
          x: x + interBarPadding,
          y: v.height - h + padding,
          width: pxPerPt - interBarPadding,
          height: h,
          index,
          value: d[index]
        };
        ctx.fillRect(r.x, r.y, r.width, r.height);
        shapes.push(r);
        x += pxPerPt;
      }
    }
  }
};
var Legend = class extends CanvasBox {
  constructor(plot2, region) {
    super(plot2, `Legend`, region);
    this.plot = plot2;
  }
  sampleSize = { width: 10, height: 10 };
  padding = 3;
  widthSnapping = 20;
  labelMeasurements = /* @__PURE__ */ new Map();
  clear() {
  }
  layoutSelf(measureState, layoutState, _parent) {
    const axisY = measureState.getActualSize(`AxisY`);
    const axisYWidth = axisY?.width ?? 0;
    const height = this._measuredSize?.height ?? 0;
    return {
      x: axisYWidth,
      y: layoutState.bounds.height - height
    };
  }
  measureSelf(opts, _parent) {
    const series = this.plot.seriesArray();
    const sample = this.sampleSize;
    const padding = this.padding;
    const widthSnapping = this.widthSnapping;
    const ctx = opts.ctx;
    const yAxis = opts.measurements.get(`AxisY`);
    const yAxisWidth = yAxis?.actual.width ?? 0;
    let x = padding;
    let y = padding;
    const availableWidth = opts.bounds.width - yAxisWidth - padding;
    let rowHeight = 0;
    for (const s of series) {
      const startX = x;
      x += sample.width + padding;
      ctx.textBaseline = `middle`;
      const text = textRect(ctx, s.name, padding, widthSnapping);
      x += textWidth(ctx, s.name, padding, widthSnapping);
      if (s.tooltip) {
        x += textWidth(ctx, s.tooltip, padding, widthSnapping);
      }
      const r = { width: 10, height: 10, x: startX, y };
      this.labelMeasurements.set(s.name, r);
      rowHeight = Math.min(sample.height + padding + padding, text.height + padding + padding);
      x += padding;
      if (x > availableWidth) {
        x = padding;
        y += rowHeight;
      }
    }
    return {
      width: availableWidth,
      height: y + rowHeight
    };
  }
  drawSelf(ctx) {
    const series = this.plot.seriesArray();
    const sample = this.sampleSize;
    const padding = this.padding;
    this.debugLog(`drawSelf`);
    ctx.clearRect(0, 0, this.canvasRegion.width, this.canvasRegion.height);
    for (const s of series) {
      const r = this.labelMeasurements.get(s.name);
      if (r === void 0) continue;
      let x = r.x;
      ctx.fillStyle = s.colour;
      ctx.fillRect(x, r.y, sample.width, sample.height);
      x += sample.width + padding;
      ctx.textBaseline = `middle`;
      ctx.fillStyle = this.plot.legendTextColour;
      ctx.fillText(s.name, x, r.y + sample.height / 2);
      if (s.tooltip) {
        ctx.fillStyle = this.plot.legendTextColour;
        ctx.fillText(s.tooltip, r.x, r.y + sample.height / 2);
      }
    }
  }
  onNotify(message, source) {
    this.debugLog(`onNotify ${message} source: ${source.id}`);
    if (message === `measureApplied` && source === this._parent.axisY) {
      this.layoutInvalidated(`Legend.onNotify measureApplied to axisY`);
    } else if (message == `range-change`) {
    }
  }
};
var AxisX = class extends CanvasBox {
  constructor(plot2, region) {
    super(plot2, `AxisX`, region);
    this.plot = plot2;
  }
  paddingPx = 2;
  colour;
  clear() {
  }
  onNotify(message, source) {
    if (message === `measureApplied` && source === this.plot.axisY) {
      this.layoutInvalidated(`AxisX.onNotify measureApplied to axisY`);
    }
  }
  drawSelf(ctx) {
    const plot2 = this.plot;
    const v = this.canvasRegion;
    const strokeWidth = plot2.axisStrokeWidth;
    const colour = this.colour ?? plot2.axisStrokeColour;
    ctx.strokeStyle = colour;
    ctx.clearRect(0, 0, v.width, v.height);
    ctx.beginPath();
    ctx.lineWidth = strokeWidth;
    ctx.moveTo(0, strokeWidth / 2);
    ctx.lineTo(v.width, strokeWidth / 2);
    ctx.stroke();
  }
  measureSelf(opts, _parent) {
    const plot2 = this.plot;
    const padding = this.paddingPx;
    const yAxis = opts.measurements.get(`AxisY`);
    const yAxisWidth = yAxis?.actual.width ?? 0;
    const heightOfText = 0;
    const h = plot2.axisStrokeWidth + heightOfText + padding + padding;
    return {
      width: opts.bounds.width - yAxisWidth - padding,
      height: h
    };
  }
  layoutSelf(measureState, _layoutState, _parent) {
    const yAxis = measureState.measurements.get(`AxisY`);
    const legend = measureState.getActualSize(`Legend`);
    const legendHeight = legend?.height ?? 0;
    const yAxisWidth = yAxis?.actual.width ?? 0;
    const height = this._measuredSize?.height ?? 0;
    return {
      x: yAxisWidth,
      y: measureState.bounds.height - height - legendHeight
    };
  }
};
var isRangeEqual = (a, b) => a.max === b.max && a.min === b.min;
var isRangeSinglePoint = (a) => a.max === a.min;
var AxisY = class extends CanvasBox {
  constructor(plot2, region) {
    super(plot2, `AxisY`, region);
    this.plot = plot2;
    this.lastRange = { min: 0, max: 0 };
  }
  // Number of digits axis will be expected to show as a data legend
  _maxDigits = 1;
  seriesToShow;
  paddingPx = 3;
  colour;
  lastRange;
  lastPlotAreaHeight = 0;
  clear() {
    this.lastRange = { min: 0, max: 0 };
    this.lastPlotAreaHeight = 0;
  }
  measurePreflight() {
  }
  onNotify(message, source) {
    const pa = this.plot.plotArea;
    if (message === `range-change`) {
      this.drawingInvalidated(`range-change`);
      return;
    }
    if (message === `measureApplied` && source === pa && pa.canvasRegion.height !== this.lastPlotAreaHeight) {
      this.lastPlotAreaHeight = pa.canvasRegion.height;
      this.drawingInvalidated(`AxisY.onNotify height change`);
    }
  }
  measureSelf(copts) {
    if (copts.ctx === void 0) throw new Error(`opts.ctx is undefined`);
    const paddingPx = this.paddingPx;
    let width = this.plot.axisStrokeWidth + paddingPx;
    const series = this.getSeries();
    if (series !== void 0) {
      const r = series.visualRange;
      this._maxDigits = Math.ceil(r.max).toString().length + series.precision + 1;
      const textToMeasure = `9`.repeat(this._maxDigits);
      width += textWidth(copts.ctx, textToMeasure, paddingPx * 2);
    }
    const w = copts.resolveToPx(this.desiredRegion?.width, width, width);
    return {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      width: w,
      height: copts.bounds.height
    };
  }
  layoutSelf(_measureState, _layoutState, _parent) {
    return { x: 0, y: 0 };
  }
  drawSelf(ctx) {
    const s = this.getSeries();
    if (s === void 0) {
      if (this.seriesToShow === void 0) return;
      console.warn(`Plot AxisY series '${this.seriesToShow}' is missing.`);
    } else {
      this.seriesAxis(s, ctx);
    }
  }
  getSeries() {
    return this.seriesToShow === void 0 ? (
      // Pick first series
      this.plot.seriesArray()[0]
    ) : (
      // Try designated series name
      this.plot.series.get(this.seriesToShow)
    );
  }
  seriesAxis(series, ctx) {
    const plot2 = this.plot;
    const plotArea = plot2.plotArea;
    const v = this.canvasRegion;
    const paddingPx = this.paddingPx;
    const r = series.visualRange;
    const strokeWidth = plot2.axisStrokeWidth;
    const colour = this.colour ?? plot2.axisStrokeColour;
    ctx.strokeStyle = colour;
    ctx.fillStyle = colour;
    if (Number.isNaN(r.min) && Number.isNaN(r.max)) return;
    this.lastRange = r;
    ctx.clearRect(0, 0, v.width, v.height);
    ctx.beginPath();
    ctx.lineWidth = strokeWidth;
    const lineX = v.width - strokeWidth / 2;
    ctx.moveTo(lineX, plotArea.paddingPx + strokeWidth);
    ctx.lineTo(lineX, plotArea.canvasRegion.height + paddingPx);
    ctx.stroke();
    ctx.textBaseline = `top`;
    const fromRight = v.width - paddingPx * 4;
    ctx.fillStyle = plot2.axisTextColour;
    if (isRangeSinglePoint(r)) {
      this.debugLog(`rangeSinglePoint`);
      drawText(ctx, series.formatValue(r.max), (size) => [
        fromRight - size.width,
        plotArea.computeY(series, r.max) - paddingPx * 4
      ]);
    } else {
      drawText(ctx, series.formatValue(r.max), (size) => [
        fromRight - size.width,
        plotArea.computeY(series, r.max) + strokeWidth / 2
      ]);
      drawText(ctx, series.formatValue(r.min), (size) => [
        fromRight - size.width,
        plotArea.computeY(series, r.min) - 5
      ]);
    }
  }
};
var drawText = (ctx, text, position) => {
  if (ctx === void 0) throw new Error(`ctx is undefined`);
  const size = ctx.measureText(text);
  const xy = position(size);
  ctx.fillText(text, xy[0], xy[1]);
};
var Plot = class extends CanvasBox {
  plotArea;
  legend;
  axisX;
  axisY;
  axisStrokeColour;
  axisTextColour;
  legendTextColour;
  axisStrokeWidth;
  series;
  _frozen = false;
  _canvasEl;
  _ctx;
  defaultSeriesOpts;
  constructor(canvasElementOrQuery, opts = {}) {
    const { ctx, element, bounds } = scaleCanvas(canvasElementOrQuery);
    super(void 0, `Plot`);
    this._canvasEl = element;
    this.bounds = bounds;
    this._ctx = ctx;
    if (opts.autoSize) {
      parentSizeCanvas(element, (event) => {
        this.drawingInvalidated(`resize`);
        this.layoutInvalidated(`resize`);
        this.update(event.ctx, true);
      });
    }
    this.axisStrokeColour = opts.axisStrokeColour ?? `black`;
    this.axisTextColour = opts.axisTextColour ?? `black`;
    this.legendTextColour = opts.legendTextColour ?? `black`;
    this.axisStrokeWidth = opts.axisStrokeWidth ?? 3;
    this.series = /* @__PURE__ */ new Map();
    this.plotArea = new PlotArea(this, bounds);
    this.legend = new Legend(this, bounds);
    this.axisX = new AxisX(this, bounds);
    this.axisY = new AxisY(this, bounds);
  }
  update(ctx, force = false) {
    if (ctx === void 0) ctx = this._ctx;
    super.update(ctx, force);
  }
  /**
   * Calls 'clear()' on each of the series
   */
  clearSeries() {
    for (const series of this.series.values()) {
      series.clear();
    }
    this.update();
  }
  /**
   * Removes all series, plot, legend
   * and axis data.
   */
  clear() {
    this.series = /* @__PURE__ */ new Map();
    this.plotArea.clear();
    this.legend.clear();
    this.axisX.clear();
    this.axisY.clear();
    this.layoutInvalidated(`Plot.clear`);
    this.drawingInvalidated(`Plot.clear`);
    this.update();
  }
  get frozen() {
    return this._frozen;
  }
  set frozen(v) {
    this._frozen = v;
    if (v) {
      this._canvasEl.classList.add(`frozen`);
      this._canvasEl.title = `Plot frozen. Tap to unfreeze`;
    } else {
      this._canvasEl.title = ``;
      this._canvasEl.classList.remove(`frozen`);
    }
  }
  seriesArray() {
    return [...this.series.values()];
  }
  get seriesLength() {
    return this.series.size;
  }
  /**
   * Plots a simple object, eg `{ x: 10, y: 20, z: 300 }`
   * Series are automatically created for each property of `o`
   *
   * Be sure to call `update()` to visually refresh.
   * @param o
   */
  plot(o) {
    const paths2 = getPaths(o, true);
    let seriesCreated = false;
    for (const p of paths2) {
      let s = this.series.get(p);
      if (s === void 0) {
        s = this.createSeries(p, `stream`);
        s.drawingStyle = `line`;
        seriesCreated = true;
      }
      const f = getField(o, p);
      throwResult(f);
      s.add(f.value);
    }
    if (seriesCreated) this.legend.layoutInvalidated(`new series`);
    this.update();
  }
  createSeriesFromObject(o, prefix = ``) {
    const keys = Object.keys(o);
    const create2 = (key) => {
      const v = o[key];
      if (typeof v === `object`) {
        return this.createSeriesFromObject(v, `${prefix}${key}.`);
      } else if (typeof v === `number`) {
        return [this.createSeries(key, `stream`)];
      } else {
        return [];
      }
    };
    return keys.flatMap((k) => create2(k));
  }
  createSeries(name, type = `array`, seriesOpts) {
    const seriesLength = this.seriesLength;
    if (name === void 0) name = `series-${seriesLength}`;
    if (this.series.has(name))
      throw new Error(`Series name '${name}' already in use`);
    let opts = {
      colour: `hsl(${seriesLength * 25 % 360}, 70%,50%)`,
      ...seriesOpts
    };
    if (this.defaultSeriesOpts) opts = { ...this.defaultSeriesOpts, ...opts };
    const s = new Series(name, type, this, opts);
    this.series.set(name, s);
    this.setReady(true, true);
    this.plotArea.drawingInvalidated(`Plot.createSeries`);
    return s;
  }
};

// src/visual/Palette.ts
var Palette_exports = {};
__export(Palette_exports, {
  create: () => create
});
var create = (fallbacks) => new PaletteImpl(fallbacks);
var PaletteImpl = class {
  /* eslint-disable-next-line functional/prefer-readonly-type */
  #store = /* @__PURE__ */ new Map();
  /* eslint-disable-next-line functional/prefer-readonly-type */
  #aliases = /* @__PURE__ */ new Map();
  fallbacks;
  #lastFallback = 0;
  #elementBase;
  constructor(fallbacks) {
    if (fallbacks !== void 0) this.fallbacks = fallbacks;
    else this.fallbacks = [`red`, `blue`, `green`, `orange`];
    this.#elementBase = document.body;
  }
  setElementBase(el) {
    this.#elementBase = el;
  }
  add(key, colour) {
    this.#store.set(key, colour);
  }
  alias(from, to) {
    this.#aliases.set(from, to);
  }
  get(key, fallback) {
    const alias = this.#aliases.get(key);
    if (alias !== void 0) key = alias;
    const c = this.#store.get(key);
    if (c !== void 0) return c;
    const varName = `--` + key;
    let fromCss = getComputedStyle(this.#elementBase).getPropertyValue(varName).trim();
    if (fromCss === void 0 || fromCss.length === 0) {
      if (fallback !== void 0) return fallback;
      fromCss = this.fallbacks[this.#lastFallback];
      this.#lastFallback++;
      if (this.#lastFallback === this.fallbacks.length) this.#lastFallback = 0;
    }
    return fromCss;
  }
  getOrAdd(key, fallback) {
    if (this.has(key)) return this.get(key);
    const c = this.get(key, fallback);
    this.add(key, c);
    return c;
  }
  has(key) {
    return this.#store.has(key);
  }
};

// src/visual/BipolarView.ts
var BipolarView_exports = {};
__export(BipolarView_exports, {
  init: () => init
});
function getNumericAttribute(el, name, defaultValue) {
  const a = el.getAttribute(name);
  if (a === null) return defaultValue;
  return Number.parseInt(a);
}
var init = (elementQuery, options = {}) => {
  const element = document.querySelector(elementQuery);
  if (!element) throw new Error(`Element query could not be found (${elementQuery})`);
  const labels = options.labels ?? [`x`, `y`];
  const labelPrecision = options.labelPrecision ?? 2;
  const asPercentages = options.asPercentages ?? false;
  const displayLastValues = options.displayLastValues ?? 0;
  const showWhiskers = options.showWhiskers ?? true;
  const showDot = options.showDot ?? true;
  const showLabels = options.showLabels ?? true;
  const yAxisBottomNegative = options.yAxisBottomNegative ?? true;
  const axisColour = resolveToString(options.axisColour, `silver`);
  const bgColour = resolveToString(options.bgColour, `white`);
  const whiskerColour = resolveToString(options.whiskerColour, `black`);
  const dotColour = resolveToString(options.dotColour, options.whiskerColour, `black`);
  const labelColour = resolveToString(options.labelColour, options.axisColour, `silver`);
  const axisWidth = options.axisWidth ?? 1 * window.devicePixelRatio;
  const dotRadius = options.dotRadius ?? 5 * window.devicePixelRatio;
  const pad = options.padding ?? 10 * window.devicePixelRatio;
  const whiskerSize = options.whiskerSize ?? 5 * window.devicePixelRatio;
  const width = options.width ?? getNumericAttribute(element, `width`, 200) * window.devicePixelRatio;
  const height = options.height ?? getNumericAttribute(element, `height`, 200) * window.devicePixelRatio;
  let lastValues;
  if (displayLastValues > 0) {
    lastValues = immutable({
      capacity: displayLastValues,
      discardPolicy: `older`
    });
  }
  element.width = width;
  element.height = height;
  element.style.width = `${width / window.devicePixelRatio}px`;
  element.style.height = `${height / window.devicePixelRatio}px`;
  const midY = height / 2;
  const midX = width / 2;
  const ctx = element.getContext(`2d`);
  if (!ctx) throw new Error(`Could not create drawing context`);
  if (window.devicePixelRatio >= 2) {
    ctx.font = `20px sans-serif`;
  }
  const percentageFormat = (v) => `${Math.round(v * 100)}%`;
  const fixedFormat = (v) => v.toFixed(labelPrecision);
  const valueFormat = asPercentages ? percentageFormat : fixedFormat;
  if (showLabels) {
    labels[0] = labels[0] + `:`;
    labels[1] = labels[1] + `:`;
  } else {
    labels[0] = ``;
    labels[1] = ``;
  }
  const renderBackground = options.renderBackground ?? ((ctx2, width2, height2) => {
    if (options.bgColour === `transparent`) {
      ctx2.clearRect(0, 0, width2, height2);
    } else {
      ctx2.fillStyle = bgColour;
      ctx2.fillRect(0, 0, width2, height2);
    }
  });
  return (x, y) => {
    x = clamp2(x);
    y = clamp2(y);
    renderBackground(ctx, width, height);
    ctx.fillStyle = labelColour;
    ctx.textBaseline = `top`;
    ctx.save();
    ctx.translate(midX, midY);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText((labels[1] + ` ` + valueFormat(y)).trim(), -midX + pad, 1);
    ctx.restore();
    ctx.fillText((labels[0] + ` ` + valueFormat(x)).trim(), pad, midX + 2);
    if (!yAxisBottomNegative) y *= -1;
    ctx.strokeStyle = axisColour;
    ctx.lineWidth = axisWidth;
    ctx.beginPath();
    ctx.moveTo(pad, midY);
    ctx.lineTo(width - pad, midY);
    ctx.moveTo(midX, pad);
    ctx.lineTo(midX, height - pad);
    ctx.stroke();
    ctx.closePath();
    const yy = (height - pad - pad) / 2 * -y;
    const xx = (width - pad - pad) / 2 * x;
    const dotPos = { x: xx, y: yy, radius: dotRadius };
    if (lastValues) {
      lastValues = lastValues.enqueue(dotPos);
    }
    ctx.save();
    ctx.translate(midX, midY);
    if (showDot) {
      if (lastValues) {
        const opacityStep = 1 / lastValues.length;
        let opacity2 = 1;
        lastValues.forEach((d) => {
          const colour = opacity(dotColour, opacity2);
          circle(ctx, d, { fillStyle: colour });
          opacity2 -= opacityStep;
        });
      } else {
        circle(ctx, dotPos, { fillStyle: dotColour });
      }
    }
    if (showWhiskers) {
      ctx.strokeStyle = whiskerColour;
      ctx.beginPath();
      ctx.moveTo(0, yy - whiskerSize);
      ctx.lineTo(0, yy + whiskerSize);
      ctx.moveTo(xx - whiskerSize, 0);
      ctx.lineTo(xx + whiskerSize, 0);
      ctx.stroke();
      ctx.closePath();
    }
    ctx.restore();
  };
};

// src/visual/PlotOld.ts
var PlotOld_exports = {};
__export(PlotOld_exports, {
  add: () => add,
  calcScale: () => calcScale,
  defaultAxis: () => defaultAxis,
  draw: () => draw,
  drawValue: () => drawValue,
  plot: () => plot
});
var piPi = Math.PI * 2;
var defaultAxis = (name) => ({
  endWith: `none`,
  lineWidth: 1,
  namePosition: `none`,
  name,
  showLabels: name === `y`,
  showLine: true,
  // For y axis, it's the width, for x axis it's the text height
  textSize: name === `y` ? 20 : 10
});
var calcScale = (buffer, drawingOpts, seriesColours) => {
  const scales = [];
  for (const s of buffer.keys()) {
    const series = [...buffer.get(s)];
    if (series.length === 0) break;
    let { min, max } = minMaxAvg(series);
    let range = max - min;
    let colour;
    if (seriesColours !== void 0) {
      colour = seriesColours[s];
    }
    if (colour == void 0) {
      colour = drawingOpts.defaultSeriesVariable ? getCssVariable(
        `accent`,
        drawingOpts.defaultSeriesColour
      ) : drawingOpts.defaultSeriesColour;
    }
    if (range === 0) {
      range = min;
      min = min - range / 2;
      max = max + range / 2;
    }
    scales.push({
      min,
      max,
      range,
      name: s,
      colour
    });
  }
  return scales;
};
var add = (buffer, value, series = ``) => {
  buffer.addKeyedValues(series, value);
};
var drawValue = (index, buffer, drawing) => {
  const c = {
    ...drawing,
    translucentPlot: true,
    leadingEdgeDot: false
  };
  draw(buffer, c);
  drawing = {
    ...drawing,
    highlightIndex: index,
    leadingEdgeDot: true,
    translucentPlot: false,
    style: `none`,
    clearCanvas: false
  };
  draw(buffer, drawing);
};
var scaleWithFixedRange = (buffer, range, drawing) => calcScale(buffer, drawing, drawing.seriesColours).map((s) => ({
  ...s,
  range: range[1] - range[0],
  min: range[0],
  max: range[1]
}));
var draw = (buffer, drawing) => {
  const { x: xAxis, y: yAxis, ctx, canvasSize } = drawing;
  const margin = drawing.margin;
  const series = drawing.y.scaleRange ? scaleWithFixedRange(buffer, drawing.y.scaleRange, drawing) : calcScale(buffer, drawing, drawing.seriesColours);
  if (drawing.clearCanvas)
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
  if (drawing.debug) {
    ctx.strokeStyle = `orange`;
    ctx.strokeRect(0, 0, canvasSize.width, canvasSize.height);
  }
  ctx.translate(margin, margin);
  const plotSize = drawing.plotSize ?? plotSizeFromBounds(canvasSize, drawing);
  const axisSize = {
    height: plotSize.height + margin + margin,
    width: plotSize.width
  };
  if (yAxis.showLabels || yAxis.showLine) {
    for (const s of series) {
      if (yAxis.allowedSeries !== void 0 && !yAxis.allowedSeries.includes(s.name)) continue;
      drawYSeriesScale(s, axisSize, drawing);
    }
    if (series.length > 0 && yAxis.showLine)
      drawYLine(axisSize, series[0], drawing);
  }
  if ((xAxis.showLabels || xAxis.showLine) && series.length > 0) {
    const yPos = yAxis.labelRange ? yAxis.labelRange[0] : series[0].min;
    drawXAxis(
      plotSize.width,
      calcYForValue(yPos, series[0], plotSize.height) + margin + xAxis.lineWidth,
      drawing
    );
  }
  const plotDrawing = {
    ...drawing,
    plotSize
  };
  const ptr = translatePoint(ctx, drawing.pointer);
  for (const s of series) {
    const data = buffer.getSource(s.name);
    if (data === void 0) continue;
    let leadingEdgeIndex = buffer.typeName === `circular` ? data.pointer - 1 : data.length - 1;
    if (drawing.highlightIndex !== void 0)
      leadingEdgeIndex = drawing.highlightIndex;
    ctx.save();
    ctx.translate(0, margin + margin);
    drawSeriesData(s, data, plotSize, plotDrawing, leadingEdgeIndex);
    ctx.restore();
  }
  if (drawing.showLegend) {
    ctx.save();
    ctx.translate(0, plotSize.height + margin + margin + margin);
    const legendSize = {
      width: plotSize.width,
      height: drawing.x.textSize + margin + margin
    };
    drawLegend(series, drawing, legendSize);
    ctx.restore();
  }
  ctx.resetTransform();
};
var drawYSeriesScale = (series, plotSize, drawing) => {
  const { ctx, y, digitsPrecision, margin } = drawing;
  const { height } = plotSize;
  if (drawing.debug) {
    ctx.strokeStyle = `purple`;
    ctx.strokeRect(0, 0, y.textSize, height + margin);
  }
  ctx.fillStyle = series.colour.length > 0 ? series.colour : `white`;
  if (y.colour) ctx.fillStyle = y.colour;
  const min = y.labelRange ? y.labelRange[0] : series.min;
  const max = y.labelRange ? y.labelRange[1] : series.max;
  const range = y.labelRange ? max - min : series.range;
  const mid = min + range / 2;
  const halfHeight = drawing.textHeight / 2;
  ctx.textBaseline = `top`;
  ctx.fillText(
    min.toFixed(digitsPrecision),
    0,
    calcYForValue(min, series, height) - halfHeight
  );
  ctx.fillText(
    mid.toFixed(digitsPrecision),
    0,
    calcYForValue(mid, series, height) - halfHeight
  );
  ctx.fillText(
    max.toFixed(digitsPrecision),
    0,
    calcYForValue(max, series, height) - margin
  );
  ctx.translate(y.textSize + margin, 0);
};
var drawYLine = (plotSize, series, drawing) => {
  if (series === void 0) throw new Error(`series undefined`);
  const { ctx, y } = drawing;
  const { height } = plotSize;
  const min = y.labelRange ? y.labelRange[0] : series.min;
  const max = y.labelRange ? y.labelRange[1] : series.max;
  const minPos = calcYForValue(min, series, height);
  const maxPos = calcYForValue(max, series, height);
  ctx.translate(y.lineWidth, 0);
  ctx.lineWidth = y.lineWidth;
  ctx.beginPath();
  ctx.moveTo(0, minPos);
  ctx.lineTo(0, maxPos);
  ctx.strokeStyle = series.colour;
  if (y.colour) ctx.strokeStyle = y.colour;
  ctx.stroke();
  ctx.translate(y.lineWidth, 0);
};
var drawLegend = (series, drawing, size) => {
  const { ctx } = drawing;
  const lineSampleWidth = 10;
  let x = 0;
  const lineY = drawing.margin * 3;
  const textY = drawing.margin;
  ctx.lineWidth = drawing.lineWidth;
  for (const s of series) {
    ctx.moveTo(x, lineY);
    ctx.strokeStyle = s.colour;
    ctx.lineTo(x + lineSampleWidth, lineY);
    ctx.stroke();
    x += lineSampleWidth + drawing.margin;
    let label = s.name;
    if (s.lastValue)
      label += ` ` + s.lastValue.toFixed(drawing.digitsPrecision);
    const labelSize = ctx.measureText(label);
    ctx.fillStyle = s.colour;
    ctx.fillText(label, x, textY);
    x += labelSize.width;
  }
};
var drawXAxis = (width, yPos, drawing) => {
  const { ctx, x, y } = drawing;
  if (!x.showLine) return;
  if (x.colour) ctx.strokeStyle = x.colour;
  ctx.lineWidth = x.lineWidth;
  ctx.beginPath();
  ctx.moveTo(0, yPos);
  ctx.lineTo(width, yPos);
  ctx.stroke();
};
var drawSeriesData = (series, values, plotSize, drawing, leadingEdgeIndex) => {
  const { ctx, lineWidth, translucentPlot = false, margin, x: xAxis } = drawing;
  const style = drawing.style ?? `connected`;
  const height = plotSize.height - margin;
  let dataXScale = 1;
  if (xAxis.scaleRange) {
    const xAxisRange = xAxis.scaleRange[1] - xAxis.scaleRange[0];
    dataXScale = plotSize.width / xAxisRange;
  } else {
    dataXScale = drawing.capacity === 0 ? plotSize.width / values.length : plotSize.width / drawing.capacity;
  }
  const incrementBy = drawing.coalesce ? dataXScale < 0 ? Math.floor(1 / dataXScale) : 1 : 1;
  let x = 0;
  let leadingEdge;
  if (drawing.debug) {
    ctx.strokeStyle = `green`;
    ctx.strokeRect(0, 0, plotSize.width, plotSize.height);
  }
  const colourTransform = (c) => {
    if (translucentPlot) return opacity(c, 0.2);
    return c;
  };
  if (style === `dots`) {
    ctx.fillStyle = colourTransform(series.colour);
  } else if (style === `none`) {
  } else {
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = colourTransform(series.colour);
  }
  for (let index = 0; index < values.length; index += incrementBy) {
    const y = calcYForValue(values[index], series, height) - 1;
    if (style === `dots`) {
      ctx.beginPath();
      ctx.arc(x, y, lineWidth, 0, piPi);
      ctx.fill();
    } else if (style === `none`) {
    } else {
      if (index == 0) ctx.moveTo(x, y);
      ctx.lineTo(x, y);
    }
    if (index === leadingEdgeIndex) {
      leadingEdge = { x, y };
      series.lastValue = values[index];
    }
    x += dataXScale;
  }
  if (style === `connected`) {
    ctx.stroke();
  }
  if (leadingEdge !== void 0 && drawing.leadingEdgeDot) {
    ctx.beginPath();
    ctx.fillStyle = colourTransform(series.colour);
    ctx.arc(leadingEdge.x, leadingEdge.y, 3, 0, 2 * Math.PI);
    ctx.fill();
  }
};
var calcYForValue = (v, series, height) => (1 - (v - series.min) / series.range) * height;
var calcSizing = (margin, x, y, showLegend) => {
  let fromLeft = margin;
  if (y.showLabels) fromLeft += y.textSize;
  if (y.showLine) fromLeft += y.lineWidth;
  if (y.showLabels || y.showLine) fromLeft += margin + margin;
  const fromRight = margin;
  const fromTop = margin + margin;
  let fromBottom = margin + margin;
  fromBottom += x.showLabels ? x.textSize : margin;
  if (x.showLine) fromBottom += x.lineWidth;
  if (x.showLabels || x.showLine) fromBottom += margin;
  if (showLegend) fromBottom += x.textSize;
  return {
    left: fromLeft,
    right: fromRight,
    top: fromTop,
    bottom: fromBottom
  };
};
var plotSizeFromBounds = (bounds, opts) => {
  const { width, height } = bounds;
  const sizing = calcSizing(opts.margin, opts.x, opts.y, opts.showLegend);
  return {
    width: width - sizing.left - sizing.right,
    height: height - sizing.top - sizing.bottom
  };
};
var canvasSizeFromPlot = (plot2, opts) => {
  const { width, height } = plot2;
  const sizing = calcSizing(opts.margin, opts.x, opts.y, opts.showLegend);
  return {
    width: width + sizing.left + sizing.right,
    height: height + sizing.top + sizing.bottom
  };
};
var plot = (parentElementOrQuery, opts) => {
  if (parentElementOrQuery === null)
    throw new Error(`parentElOrQuery is null. Expected string or element`);
  const parentEl = resolveEl(parentElementOrQuery);
  let canvasEl;
  let destroyCanvasEl = true;
  let plotSize = opts.plotSize;
  let canvasSize;
  if (parentEl.nodeName === `CANVAS`) {
    canvasEl = parentEl;
    destroyCanvasEl = false;
    canvasSize = { width: canvasEl.width, height: canvasEl.height };
  } else {
    canvasEl = document.createElement(`CANVAS`);
    parentEl.append(canvasEl);
    plotSize = opts.plotSize;
    canvasSize = { width: canvasEl.width, height: canvasEl.height };
  }
  const pointer = { x: 0, y: 0 };
  const onPointerMove = (event) => {
    pointer.x = event.offsetX;
    pointer.y = event.offsetY;
  };
  canvasEl.addEventListener(`pointermove`, onPointerMove);
  const ctx = canvasEl.getContext(`2d`);
  const capacity = opts.capacity ?? 10;
  const buffer = capacity > 0 ? ofCircularMutable({ capacity }) : ofArrayMutable();
  const metrics = ctx.measureText(`Xy`);
  const coalesce = opts.coalesce ?? true;
  if (ctx === null) throw new Error(`Drawing context not available`);
  let xAxis = defaultAxis(`x`);
  if (opts.x) xAxis = { ...xAxis, ...opts.x };
  let yAxis = defaultAxis(`y`);
  if (opts.y) yAxis = { ...yAxis, ...opts.y };
  let drawingOpts = {
    ...opts,
    y: yAxis,
    x: xAxis,
    pointer,
    capacity,
    coalesce,
    plotSize,
    canvasSize,
    ctx,
    textHeight: opts.textHeight ?? metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent,
    style: opts.style ?? `connected`,
    defaultSeriesColour: opts.defaultSeriesColour ?? `yellow`,
    margin: 3,
    clearCanvas: true,
    leadingEdgeDot: true,
    debug: opts.debug ?? false,
    digitsPrecision: opts.digitsPrecision ?? 2,
    lineWidth: opts.lineWidth ?? 2,
    showLegend: opts.showLegend ?? false
  };
  if (plotSize) {
    const canvasSize2 = canvasSizeFromPlot(plotSize, drawingOpts);
    canvasEl.width = canvasSize2.width;
    canvasEl.height = canvasSize2.height;
    drawingOpts.canvasSize = canvasSize2;
  }
  if (opts.autoSizeCanvas) {
    parentSizeCanvas(canvasEl, (args) => {
      const bounds = args.bounds;
      drawingOpts = {
        ...drawingOpts,
        plotSize: plotSizeFromBounds(bounds, drawingOpts),
        canvasSize: bounds
      };
      draw(buffer, drawingOpts);
    });
  }
  return {
    drawValue: (index) => {
      drawValue(index, buffer, drawingOpts);
    },
    dispose: () => {
      canvasEl.removeEventListener(`pointermove`, onPointerMove);
      if (destroyCanvasEl) canvasEl.remove();
    },
    add: (value, series = ``, skipDrawing = false) => {
      add(buffer, value, series);
      if (skipDrawing) return;
      draw(buffer, drawingOpts);
    },
    draw: () => {
      draw(buffer, drawingOpts);
    },
    clear: () => {
      buffer.clear();
    }
  };
};

// src/visual/index.ts
try {
  if (typeof window !== `undefined`) {
    window.ixfx = {
      ...window.ixfx,
      Visuals: {
        SceneGraph: SceneGraph_exports,
        Plot2: Plot2_exports,
        Drawing: Drawing_exports,
        Svg: Svg_exports,
        Palette: Palette_exports,
        Colour: Colour_exports,
        Video: Video_exports
      }
    };
  }
} catch {
}

export {
  Drawing_exports,
  SceneGraph_exports,
  scaleCanvas,
  Plot2_exports,
  Palette_exports,
  BipolarView_exports,
  PlotOld_exports,
  visual_exports
};
//# sourceMappingURL=chunk-I6TNJD7C.js.map