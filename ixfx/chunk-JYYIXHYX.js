import {
  stack
} from "./chunk-6H3SBEJ7.js";
import {
  resolveEl
} from "./chunk-HKAC3GTE.js";
import {
  getCorners,
  guard,
  isCubicBezier,
  isLine,
  isQuadraticBezier
} from "./chunk-L5GM5DOA.js";
import {
  array
} from "./chunk-OQJMMN6S.js";
import {
  __export
} from "./chunk-FQLUQVDZ.js";

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
  makeHelper: () => makeHelper,
  paths: () => paths,
  pointLabels: () => pointLabels,
  rect: () => rect,
  textBlock: () => textBlock
});

// node_modules/color2k/dist/index.module.js
function t(t2, n2, r2) {
  return Math.min(Math.max(t2, r2), n2);
}
var n = class extends Error {
  constructor(t2) {
    super(`Failed to parse color: "${t2}"`);
  }
};
function r(r2) {
  if (typeof r2 != "string")
    throw new n(r2);
  if (r2.trim().toLowerCase() === "transparent")
    return [0, 0, 0, 0];
  let e2 = r2.trim();
  e2 = u.test(r2) ? function(t2) {
    const r3 = t2.toLowerCase().trim(), e3 = o[function(t3) {
      let n2 = 5381, r4 = t3.length;
      for (; r4; )
        n2 = 33 * n2 ^ t3.charCodeAt(--r4);
      return (n2 >>> 0) % 2341;
    }(r3)];
    if (!e3)
      throw new n(t2);
    return `#${e3}`;
  }(r2) : r2;
  const f2 = s.exec(e2);
  if (f2) {
    const t2 = Array.from(f2).slice(1);
    return [...t2.slice(0, 3).map((t3) => parseInt(_(t3, 2), 16)), parseInt(_(t2[3] || "f", 2), 16) / 255];
  }
  const p = i.exec(e2);
  if (p) {
    const t2 = Array.from(p).slice(1);
    return [...t2.slice(0, 3).map((t3) => parseInt(t3, 16)), parseInt(t2[3] || "ff", 16) / 255];
  }
  const z = a.exec(e2);
  if (z) {
    const t2 = Array.from(z).slice(1);
    return [...t2.slice(0, 3).map((t3) => parseInt(t3, 10)), parseFloat(t2[3] || "1")];
  }
  const h = c.exec(e2);
  if (h) {
    const [e3, o2, _2, s2] = Array.from(h).slice(1).map(parseFloat);
    if (t(0, 100, o2) !== o2)
      throw new n(r2);
    if (t(0, 100, _2) !== _2)
      throw new n(r2);
    return [...l(e3, o2, _2), s2 || 1];
  }
  throw new n(r2);
}
var e = (t2) => parseInt(t2.replace(/_/g, ""), 36);
var o = "1q29ehhb 1n09sgk7 1kl1ekf_ _yl4zsno 16z9eiv3 1p29lhp8 _bd9zg04 17u0____ _iw9zhe5 _to73___ _r45e31e _7l6g016 _jh8ouiv _zn3qba8 1jy4zshs 11u87k0u 1ro9yvyo 1aj3xael 1gz9zjz0 _3w8l4xo 1bf1ekf_ _ke3v___ _4rrkb__ 13j776yz _646mbhl _nrjr4__ _le6mbhl 1n37ehkb _m75f91n _qj3bzfz 1939yygw 11i5z6x8 _1k5f8xs 1509441m 15t5lwgf _ae2th1n _tg1ugcv 1lp1ugcv 16e14up_ _h55rw7n _ny9yavn _7a11xb_ 1ih442g9 _pv442g9 1mv16xof 14e6y7tu 1oo9zkds 17d1cisi _4v9y70f _y98m8kc 1019pq0v 12o9zda8 _348j4f4 1et50i2o _8epa8__ _ts6senj 1o350i2o 1mi9eiuo 1259yrp0 1ln80gnw _632xcoy 1cn9zldc _f29edu4 1n490c8q _9f9ziet 1b94vk74 _m49zkct 1kz6s73a 1eu9dtog _q58s1rz 1dy9sjiq __u89jo3 _aj5nkwg _ld89jo3 13h9z6wx _qa9z2ii _l119xgq _bs5arju 1hj4nwk9 1qt4nwk9 1ge6wau6 14j9zlcw 11p1edc_ _ms1zcxe _439shk6 _jt9y70f _754zsow 1la40eju _oq5p___ _x279qkz 1fa5r3rv _yd2d9ip _424tcku _8y1di2_ _zi2uabw _yy7rn9h 12yz980_ __39ljp6 1b59zg0x _n39zfzp 1fy9zest _b33k___ _hp9wq92 1il50hz4 _io472ub _lj9z3eo 19z9ykg0 _8t8iu3a 12b9bl4a 1ak5yw0o _896v4ku _tb8k8lv _s59zi6t _c09ze0p 1lg80oqn 1id9z8wb _238nba5 1kq6wgdi _154zssg _tn3zk49 _da9y6tc 1sg7cv4f _r12jvtt 1gq5fmkz 1cs9rvci _lp9jn1c _xw1tdnb 13f9zje6 16f6973h _vo7ir40 _bt5arjf _rc45e4t _hr4e100 10v4e100 _hc9zke2 _w91egv_ _sj2r1kk 13c87yx8 _vqpds__ _ni8ggk8 _tj9yqfb 1ia2j4r4 _7x9b10u 1fc9ld4j 1eq9zldr _5j9lhpx _ez9zl6o _md61fzm".split(" ").reduce((t2, n2) => {
  const r2 = e(n2.substring(0, 3)), o2 = e(n2.substring(3)).toString(16);
  let _2 = "";
  for (let t3 = 0; t3 < 6 - o2.length; t3++)
    _2 += "0";
  return t2[r2] = `${_2}${o2}`, t2;
}, {});
var _ = (t2, n2) => Array.from(Array(n2)).map(() => t2).join("");
var s = new RegExp(`^#${_("([a-f0-9])", 3)}([a-f0-9])?$`, "i");
var i = new RegExp(`^#${_("([a-f0-9]{2})", 3)}([a-f0-9]{2})?$`, "i");
var a = new RegExp(`^rgba?\\(\\s*(\\d+)\\s*${_(",\\s*(\\d+)\\s*", 2)}(?:,\\s*([\\d.]+))?\\s*\\)$`, "i");
var c = /^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%(?:\s*,\s*([\d.]+))?\s*\)$/i;
var u = /^[a-z]+$/i;
var f = (t2) => Math.round(255 * t2);
var l = (t2, n2, r2) => {
  let e2 = r2 / 100;
  if (n2 === 0)
    return [e2, e2, e2].map(f);
  const o2 = (t2 % 360 + 360) % 360 / 60, _2 = (1 - Math.abs(2 * e2 - 1)) * (n2 / 100), s2 = _2 * (1 - Math.abs(o2 % 2 - 1));
  let i2 = 0, a2 = 0, c2 = 0;
  o2 >= 0 && o2 < 1 ? (i2 = _2, a2 = s2) : o2 >= 1 && o2 < 2 ? (i2 = s2, a2 = _2) : o2 >= 2 && o2 < 3 ? (a2 = _2, c2 = s2) : o2 >= 3 && o2 < 4 ? (a2 = s2, c2 = _2) : o2 >= 4 && o2 < 5 ? (i2 = s2, c2 = _2) : o2 >= 5 && o2 < 6 && (i2 = _2, c2 = s2);
  const u2 = e2 - _2 / 2;
  return [i2 + u2, a2 + u2, c2 + u2].map(f);
};
function m(n2, r2, e2, o2) {
  return `rgba(${t(0, 255, n2).toFixed()}, ${t(0, 255, r2).toFixed()}, ${t(0, 255, e2).toFixed()}, ${parseFloat(t(0, 1, o2).toFixed(3))})`;
}
function v(t2, n2) {
  const [e2, o2, _2, s2] = r(t2);
  return m(e2, o2, _2, s2 - n2);
}

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
    const s2 = stk.push(op);
    op(ctx);
    return drawingStack(ctx, s2);
  };
  const pop = () => {
    const s2 = stk?.pop();
    return drawingStack(ctx, s2);
  };
  const apply = () => {
    if (stk === void 0)
      return drawingStack(ctx);
    stk.forEach((op) => op(ctx));
    return drawingStack(ctx, stk);
  };
  return { push, pop, apply };
};
var circle = (ctx, circlesToDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const draw = (c2) => {
    ctx.beginPath();
    ctx.arc(c2.x, c2.y, c2.radius, 0, PIPI);
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
  pts.forEach((pt, i2) => guard(pt, `Index ${i2}`));
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
  pts.forEach((pt, i2) => guard(pt, `Index ${i2}`));
  applyOpts(ctx, opts);
  pts.forEach((pt, i2) => {
    const label = labels !== void 0 && i2 < labels.length ? labels[i2] : i2.toString();
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
  const { a: a2, b, cubic1, cubic2 } = bezierToDraw;
  const isDebug = opts.debug ?? false;
  if (isDebug) {
  }
  ctx.beginPath();
  ctx.moveTo(a2.x, a2.y);
  ctx.bezierCurveTo(cubic1.x, cubic1.y, cubic2.x, cubic2.y, b.x, b.y);
  ctx.stroke();
  if (isDebug) {
    stack2 = stack2.push(optsOp({
      ...opts,
      strokeStyle: v(opts.strokeStyle ?? `silver`, 0.6),
      fillStyle: v(opts.fillStyle ?? `yellow`, 0.4)
    }));
    stack2.apply();
    ctx.moveTo(a2.x, a2.y);
    ctx.lineTo(cubic1.x, cubic1.y);
    ctx.stroke();
    ctx.moveTo(b.x, b.y);
    ctx.lineTo(cubic2.x, cubic2.y);
    ctx.stroke();
    ctx.fillText(`a`, a2.x + 5, a2.y);
    ctx.fillText(`b`, b.x + 5, b.y);
    ctx.fillText(`c1`, cubic1.x + 5, cubic1.y);
    ctx.fillText(`c2`, cubic2.x + 5, cubic2.y);
    dot(ctx, cubic1, { radius: 3 });
    dot(ctx, cubic2, { radius: 3 });
    dot(ctx, a2, { radius: 3 });
    dot(ctx, b, { radius: 3 });
    stack2 = stack2.pop();
    stack2.apply();
  }
};
var quadraticBezier = (ctx, bezierToDraw, opts = {}) => {
  const { a: a2, b, quadratic } = bezierToDraw;
  const isDebug = opts.debug ?? false;
  let stack2 = applyOpts(ctx, opts);
  ctx.beginPath();
  ctx.moveTo(a2.x, a2.y);
  ctx.quadraticCurveTo(quadratic.x, quadratic.y, b.x, b.y);
  ctx.stroke();
  if (isDebug) {
    stack2 = stack2.push(optsOp({
      ...opts,
      strokeStyle: v(opts.strokeStyle ?? `silver`, 0.6),
      fillStyle: v(opts.fillStyle ?? `yellow`, 0.4)
    }));
    connectedPoints(ctx, [a2, quadratic, b]);
    ctx.fillText(`a`, a2.x + 5, a2.y);
    ctx.fillText(`b`, b.x + 5, b.y);
    ctx.fillText(`h`, quadratic.x + 5, quadratic.y);
    dot(ctx, quadratic, { radius: 3 });
    dot(ctx, a2, { radius: 3 });
    dot(ctx, b, { radius: 3 });
    stack2 = stack2.pop();
    stack2.apply();
  }
};
var line = (ctx, toDraw, opts = {}) => {
  const isDebug = opts.debug ?? false;
  applyOpts(ctx, opts);
  const draw = (d) => {
    const { a: a2, b } = d;
    ctx.beginPath();
    ctx.moveTo(a2.x, a2.y);
    ctx.lineTo(b.x, b.y);
    if (isDebug) {
      ctx.fillText(`a`, a2.x, a2.y);
      ctx.fillText(`b`, b.x, b.y);
      dot(ctx, a2, { radius: 5, strokeStyle: `black` });
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
  const blocks = lines.map((l2) => ctx.measureText(l2));
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
  lines.forEach((line2, i2) => {
    ctx.fillText(line2, x, y);
    y += heights[i2];
  });
};

export {
  getCtx,
  makeHelper,
  arc,
  drawingStack,
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
//# sourceMappingURL=chunk-JYYIXHYX.js.map