import {
  getCorners,
  guard,
  isCubicBezier,
  isLine,
  isQuadraticBezier
} from "./chunk-77MRLFOF.js";
import {
  stack
} from "./chunk-BN26ULXV.js";
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

// src/visual/Colour.ts
var Colour_exports = {};
__export(Colour_exports, {
  interpolate: () => interpolate,
  opacity: () => opacity,
  rgbToHsl: () => rgbToHsl,
  scale: () => scale,
  toHex: () => toHex,
  toHsl: () => toHsl,
  toRgb: () => toRgb
});
import * as d3Colour from "d3-color";

// node_modules/d3-interpolate/src/rgb.js
import { rgb as colorRgb } from "d3-color";

// node_modules/d3-interpolate/src/basis.js
function basis(t1, v0, v1, v2, v3) {
  var t2 = t1 * t1, t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
}
function basis_default(values) {
  var n = values.length - 1;
  return function(t) {
    var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

// node_modules/d3-interpolate/src/basisClosed.js
function basisClosed_default(values) {
  var n = values.length;
  return function(t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n), v0 = values[(i + n - 1) % n], v1 = values[i % n], v2 = values[(i + 1) % n], v3 = values[(i + 2) % n];
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

// node_modules/d3-interpolate/src/constant.js
var constant_default = (x) => () => x;

// node_modules/d3-interpolate/src/color.js
function linear(a, d) {
  return function(t) {
    return a + t * d;
  };
}
function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}
function hue(a, b) {
  var d = b - a;
  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant_default(isNaN(a) ? b : a);
}
function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : constant_default(isNaN(a) ? b : a);
  };
}
function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : constant_default(isNaN(a) ? b : a);
}

// node_modules/d3-interpolate/src/rgb.js
var rgb_default = function rgbGamma(y) {
  var color2 = gamma(y);
  function rgb2(start, end) {
    var r = color2((start = colorRgb(start)).r, (end = colorRgb(end)).r), g = color2(start.g, end.g), b = color2(start.b, end.b), opacity2 = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity2(t);
      return start + "";
    };
  }
  rgb2.gamma = rgbGamma;
  return rgb2;
}(1);
function rgbSpline(spline) {
  return function(colors) {
    var n = colors.length, r = new Array(n), g = new Array(n), b = new Array(n), i, color2;
    for (i = 0; i < n; ++i) {
      color2 = colorRgb(colors[i]);
      r[i] = color2.r || 0;
      g[i] = color2.g || 0;
      b[i] = color2.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color2.opacity = 1;
    return function(t) {
      color2.r = r(t);
      color2.g = g(t);
      color2.b = b(t);
      return color2 + "";
    };
  };
}
var rgbBasis = rgbSpline(basis_default);
var rgbBasisClosed = rgbSpline(basisClosed_default);

// node_modules/d3-interpolate/src/hsl.js
import { hsl as colorHsl } from "d3-color";
function hsl(hue2) {
  return function(start, end) {
    var h = hue2((start = colorHsl(start)).h, (end = colorHsl(end)).h), s = nogamma(start.s, end.s), l = nogamma(start.l, end.l), opacity2 = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.h = h(t);
      start.s = s(t);
      start.l = l(t);
      start.opacity = opacity2(t);
      return start + "";
    };
  };
}
var hsl_default = hsl(hue);
var hslLong = hsl(nogamma);

// node_modules/d3-interpolate/src/lab.js
import { lab as colorLab } from "d3-color";
function lab(start, end) {
  var l = nogamma((start = colorLab(start)).l, (end = colorLab(end)).l), a = nogamma(start.a, end.a), b = nogamma(start.b, end.b), opacity2 = nogamma(start.opacity, end.opacity);
  return function(t) {
    start.l = l(t);
    start.a = a(t);
    start.b = b(t);
    start.opacity = opacity2(t);
    return start + "";
  };
}

// node_modules/d3-interpolate/src/hcl.js
import { hcl as colorHcl } from "d3-color";
function hcl(hue2) {
  return function(start, end) {
    var h = hue2((start = colorHcl(start)).h, (end = colorHcl(end)).h), c = nogamma(start.c, end.c), l = nogamma(start.l, end.l), opacity2 = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.h = h(t);
      start.c = c(t);
      start.l = l(t);
      start.opacity = opacity2(t);
      return start + "";
    };
  };
}
var hcl_default = hcl(hue);
var hclLong = hcl(nogamma);

// node_modules/d3-interpolate/src/cubehelix.js
import { cubehelix as colorCubehelix } from "d3-color";
function cubehelix(hue2) {
  return function cubehelixGamma(y) {
    y = +y;
    function cubehelix2(start, end) {
      var h = hue2((start = colorCubehelix(start)).h, (end = colorCubehelix(end)).h), s = nogamma(start.s, end.s), l = nogamma(start.l, end.l), opacity2 = nogamma(start.opacity, end.opacity);
      return function(t) {
        start.h = h(t);
        start.s = s(t);
        start.l = l(Math.pow(t, y));
        start.opacity = opacity2(t);
        return start + "";
      };
    }
    cubehelix2.gamma = cubehelixGamma;
    return cubehelix2;
  }(1);
}
var cubehelix_default = cubehelix(hue);
var cubehelixLong = cubehelix(nogamma);

// src/visual/Colour.ts
var toHsl = (colour) => {
  const rgb2 = toRgb(colour);
  const hsl3 = rgbToHsl(rgb2.r, rgb2.b, rgb2.g);
  if (rgb2.opacity)
    return { ...hsl3, opacity: rgb2.opacity };
  else
    return hsl3;
};
var toRgb = (colour) => {
  const c = resolveColour(colour);
  const rgb2 = c.rgb();
  if (c.opacity < 1)
    return { r: rgb2.r, g: rgb2.g, b: rgb2.b, opacity: c.opacity };
  else
    return { r: rgb2.r, g: rgb2.g, b: rgb2.b };
};
var resolveColour = (c) => {
  if (typeof c === `string`) {
    const css = d3Colour.color(c);
    if (css !== null)
      return css;
  } else {
    if (isHsl(c))
      return d3Colour.hsl(c.h, c.s, c.l);
    if (isRgb(c))
      return d3Colour.rgb(c.r, c.g, c.b);
  }
  throw new Error(`Could not resolve colour ${JSON.stringify(c)}`);
};
var toHex = (colour) => {
  const c = resolveColour(colour);
  return c.formatHex();
};
var opacity = (colour, amt) => {
  const c = resolveColour(colour);
  c.opacity *= amt;
  return c.toString();
};
var interpolate = (amount, from, to, opts = { space: `rgb` }) => {
  const inter = getInterpolator([from, to], opts);
  if (inter === void 0)
    throw new Error(`Could not handle colour/space`);
  return inter(amount);
};
var getInterpolator = (colours, opts = { space: `rgb` }) => {
  if (colours.length !== 2)
    throw new Error(`Interpolation expects two colours`);
  const { space, long = false } = opts;
  let inter;
  switch (space) {
    case `lab`:
      inter = lab;
      break;
    case `hsl`:
      inter = long ? hslLong : hsl_default;
      break;
    case `hcl`:
      inter = long ? hclLong : hcl_default;
      break;
    case `cubehelix`:
      inter = long ? cubehelixLong : cubehelix_default;
      break;
    case `rgb`:
      inter = rgb_default;
    default:
      inter = rgb_default;
  }
  if (opts.gamma) {
    if (space === `rgb` || space === `cubehelix`) {
      inter = inter.gamma(opts.gamma);
    }
  }
  return inter(colours[0], colours[1]);
};
var scale = (steps, from, to, opts = { space: `rgb` }) => {
  const inter = getInterpolator([from, to], opts);
  if (inter === void 0)
    throw new Error(`Could not handle colour/space`);
  const perStep = 1 / (steps - 1);
  const r = [];
  let amt = 0;
  for (let i = 0; i < steps; i++) {
    r.push(inter(amt));
    amt += perStep;
    if (amt > 1)
      amt = 1;
  }
  return r;
};
var isHsl = (p) => {
  if (p.h === void 0)
    return false;
  if (p.s === void 0)
    return false;
  if (p.l === void 0)
    return false;
  return true;
};
var isRgb = (p) => {
  if (p.r === void 0)
    return false;
  if (p.g === void 0)
    return false;
  if (p.b === void 0)
    return false;
  return true;
};
var rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  var min = Math.min(r, g, b), max = Math.max(r, g, b), delta = max - min, h, s, l;
  h = 0;
  if (max === min) {
    h = 0;
  } else if (r === max) {
    h = (g - b) / delta;
  } else if (g === max) {
    h = 2 + (b - r) / delta;
  } else if (b === max) {
    h = 4 + (r - g) / delta;
  }
  h = Math.min(h * 60, 360);
  if (h < 0) {
    h += 360;
  }
  l = (min + max) / 2;
  if (max === min) {
    s = 0;
  } else if (l <= 0.5) {
    s = delta / (max + min);
  } else {
    s = delta / (2 - max - min);
  }
  return { h, s, l };
};

// src/visual/Drawing.ts
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
  Colour_exports,
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
