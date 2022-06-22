import {
  Svg_exports
} from "./chunk-GMLZQVYR.js";
import {
  Point_exports,
  Rect_exports,
  corners,
  corners2,
  emptyPositioned,
  guard,
  intersectsPoint,
  isCubicBezier,
  isEqual,
  isLine,
  isPlaceholder,
  isPositioned,
  isQuadraticBezier,
  placeholder,
  placeholderPositioned
} from "./chunk-FYZXBP3A.js";
import {
  mapArray,
  mapCircular,
  stack
} from "./chunk-XPRO47PR.js";
import {
  Arrays_exports,
  Colour_exports,
  minIndex,
  minMaxAvg,
  opacity,
  randomHue
} from "./chunk-IKSWBEON.js";
import {
  continuously,
  delayLoop
} from "./chunk-VDTZ52FD.js";
import {
  clamp,
  flip,
  getFieldByPath,
  getFieldPaths,
  ifNaN,
  roundUpToMultiple,
  scale
} from "./chunk-LO2A4AGL.js";
import {
  array
} from "./chunk-U4IZE4J2.js";
import {
  parentSizeCanvas,
  resolveEl
} from "./chunk-PRGZWQOJ.js";
import {
  __export,
  __privateAdd,
  __privateGet,
  __privateSet,
  __privateWrapper,
  __publicField
} from "./chunk-6SYKIMQH.js";

// src/visual/index.ts
var visual_exports = {};
__export(visual_exports, {
  Colour: () => Colour_exports,
  Drawing: () => Drawing_exports,
  Palette: () => Palette_exports,
  Plot: () => Plot_exports,
  Plot2: () => Plot2_exports,
  SceneGraph: () => SceneGraph_exports,
  Svg: () => Svg_exports,
  Video: () => Video_exports
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
  getCtx: () => getCtx,
  line: () => line,
  lineThroughPoints: () => lineThroughPoints,
  makeHelper: () => makeHelper,
  paths: () => paths,
  pointLabels: () => pointLabels,
  rect: () => rect,
  textBlock: () => textBlock,
  textBlockAligned: () => textBlockAligned,
  textWidth: () => textWidth,
  translatePoint: () => translatePoint,
  triangle: () => triangle
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
  const draw2 = (arc2) => {
    ctx.beginPath();
    ctx.arc(arc2.x, arc2.y, arc2.radius, arc2.startRadian, arc2.endRadian);
    ctx.stroke();
  };
  if (Array.isArray(arcs)) {
    arcs.forEach(draw2);
  } else
    draw2(arcs);
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
  const draw2 = (c) => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.radius, 0, PIPI);
    if (opts.strokeStyle)
      ctx.stroke();
    if (opts.fillStyle)
      ctx.fill();
  };
  if (Array.isArray(circlesToDraw))
    circlesToDraw.forEach(draw2);
  else
    draw2(circlesToDraw);
};
var ellipse = (ctx, ellipsesToDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const draw2 = (e) => {
    ctx.beginPath();
    const rotation = e.rotation ?? 0;
    const startAngle = e.startAngle ?? 0;
    const endAngle = e.endAngle ?? PIPI;
    ctx.ellipse(e.x, e.y, e.radiusX, e.radiusY, rotation, startAngle, endAngle);
    if (opts.strokeStyle)
      ctx.stroke();
    if (opts.fillStyle)
      ctx.fill();
  };
  if (Array.isArray(ellipsesToDraw))
    ellipsesToDraw.forEach(draw2);
  else
    draw2(ellipsesToDraw);
};
var paths = (ctx, pathsToDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const draw2 = (path) => {
    if (isQuadraticBezier(path))
      quadraticBezier(ctx, path, opts);
    else if (isLine(path))
      line(ctx, path, opts);
    else
      throw new Error(`Unknown path type ${JSON.stringify(path)}`);
  };
  if (Array.isArray(pathsToDraw))
    pathsToDraw.forEach(draw2);
  else
    draw2(pathsToDraw);
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
  if (opts.strokeStyle || opts.strokeStyle === void 0 && opts.fillStyle === void 0) {
    ctx.stroke();
  }
  if (opts.fillStyle) {
    ctx.fill();
  }
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
  if (Array.isArray(toDraw))
    toDraw.forEach(draw2);
  else
    draw2(toDraw);
};
var triangle = (ctx, toDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const draw2 = (t) => {
    connectedPoints(ctx, corners2(t), { ...opts, loop: true });
    if (opts.debug) {
      pointLabels(ctx, corners2(t), void 0, [`a`, `b`, `c`]);
    }
  };
  if (Array.isArray(toDraw))
    toDraw.forEach(draw2);
  else
    draw2(toDraw);
};
var rect = (ctx, toDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const draw2 = (d) => {
    if (opts.filled)
      ctx.fillRect(d.x, d.y, d.width, d.height);
    ctx.strokeRect(d.x, d.y, d.width, d.height);
    if (opts.debug) {
      pointLabels(ctx, corners(d), void 0, [`NW`, `NE`, `SE`, `SW`]);
    }
  };
  if (Array.isArray(toDraw))
    toDraw.forEach(draw2);
  else
    draw2(toDraw);
};
var textWidth = (ctx, text, padding = 0, widthMultiple) => {
  if (text === void 0 || text === null || text.length === 0)
    return 0;
  const m = ctx.measureText(text);
  if (widthMultiple)
    return roundUpToMultiple(m.width, widthMultiple) + padding;
  return m.width + padding;
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
var textBlockAligned = (ctx, text, opts) => {
  const { bounds } = opts;
  const { horiz = `left`, vert = `top` } = opts;
  let lines;
  if (typeof text === `string`)
    lines = [text];
  else
    lines = text;
  applyOpts(ctx, opts);
  ctx.save();
  ctx.translate(bounds.x, bounds.y);
  ctx.textAlign = `left`;
  ctx.textBaseline = `top`;
  const middleX = bounds.width / 2;
  const middleY = bounds.height / 2;
  const blocks = lines.map((l) => ctx.measureText(l));
  const heights = blocks.map((tm) => tm.actualBoundingBoxAscent + tm.actualBoundingBoxDescent);
  const totalHeight = heights.reduce((acc, val) => acc + val, 0);
  let y = 0;
  if (vert === `center`)
    y = middleY - totalHeight / 2;
  else if (vert === `bottom`) {
    y = bounds.height - totalHeight;
  }
  lines.forEach((line2, i) => {
    let x = 0;
    if (horiz === `center`)
      x = middleX - blocks[i].width / 2;
    else if (horiz === `right`)
      x = bounds.width - blocks[i].width;
    ctx.fillText(lines[i], x, y);
    y += heights[i];
  });
  ctx.restore();
};

// src/visual/Plot.ts
var Plot_exports = {};
__export(Plot_exports, {
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
  namePosition: "none",
  name,
  showLabels: name === `y`,
  showLine: true,
  textSize: name === `y` ? 20 : 10
});
var calcScale = (buffer, drawingOpts, seriesColours) => {
  const seriesNames = buffer.keys();
  const scales = [];
  seriesNames.forEach((s) => {
    const series = buffer.get(s);
    if (series === void 0)
      return;
    let { min, max } = minMaxAvg(series);
    let range = max - min;
    let colour;
    if (seriesColours !== void 0) {
      colour = seriesColours[s];
    }
    if (colour == void 0) {
      if (drawingOpts.defaultSeriesVariable)
        colour = Colour_exports.getCssVariable(`accent`, drawingOpts.defaultSeriesColour);
      else
        colour = drawingOpts.defaultSeriesColour;
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
  });
  return scales;
};
var add = (buffer, value, series = "") => {
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
var scaleWithFixedRange = (buffer, range, drawing) => calcScale(buffer, drawing, drawing.seriesColours).map((s) => ({ ...s, range: range[1] - range[0], min: range[0], max: range[1] }));
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
  const axisSize = { height: plotSize.height + margin + margin, width: plotSize.width };
  if (yAxis.showLabels || yAxis.showLine) {
    series.forEach((s) => {
      if (yAxis.allowedSeries !== void 0) {
        if (!yAxis.allowedSeries.includes(s.name))
          return;
      }
      drawYSeriesScale(s, axisSize, drawing);
    });
    if (series.length > 0 && yAxis.showLine)
      drawYLine(axisSize, series[0], drawing);
  }
  if ((xAxis.showLabels || xAxis.showLine) && series.length > 0) {
    const yPos = yAxis.labelRange ? yAxis.labelRange[0] : series[0].min;
    drawXAxis(plotSize.width, calcYForValue(yPos, series[0], plotSize.height) + margin + xAxis.lineWidth, drawing);
  }
  const plotDrawing = {
    ...drawing,
    plotSize
  };
  const ptr = Drawing_exports.translatePoint(ctx, drawing.pointer);
  series.forEach((s) => {
    const data = buffer.getSource(s.name);
    if (data === void 0)
      return;
    let leadingEdgeIndex = buffer.typeName === `circular` ? data.pointer - 1 : data.length - 1;
    if (drawing.highlightIndex !== void 0)
      leadingEdgeIndex = drawing.highlightIndex;
    ctx.save();
    ctx.translate(0, margin + margin);
    drawSeriesData(s, data, plotSize, plotDrawing, leadingEdgeIndex);
    ctx.restore();
  });
  if (drawing.showLegend) {
    ctx.save();
    ctx.translate(0, plotSize.height + margin + margin + margin);
    const legendSize = { width: plotSize.width, height: drawing.x.textSize + margin + margin };
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
  if (y.colour)
    ctx.fillStyle = y.colour;
  const min = y.labelRange ? y.labelRange[0] : series.min;
  const max = y.labelRange ? y.labelRange[1] : series.max;
  const range = y.labelRange ? max - min : series.range;
  const mid = min + range / 2;
  const halfHeight = drawing.textHeight / 2;
  ctx.textBaseline = `top`;
  ctx.fillText(min.toFixed(digitsPrecision), 0, calcYForValue(min, series, height) - halfHeight);
  ctx.fillText(mid.toFixed(digitsPrecision), 0, calcYForValue(mid, series, height) - halfHeight);
  ctx.fillText(max.toFixed(digitsPrecision), 0, calcYForValue(max, series, height) - margin);
  ctx.translate(y.textSize + margin, 0);
};
var drawYLine = (plotSize, series, drawing) => {
  if (series === void 0)
    throw new Error(`series undefined`);
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
  if (y.colour)
    ctx.strokeStyle = y.colour;
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
  series.forEach((s) => {
    ctx.moveTo(x, lineY);
    ctx.strokeStyle = s.colour;
    ctx.lineTo(x + lineSampleWidth, lineY);
    ctx.stroke();
    x += lineSampleWidth + drawing.margin;
    let label = s.name;
    if (s.lastValue)
      label += " " + s.lastValue.toFixed(drawing.digitsPrecision);
    const labelSize = ctx.measureText(label);
    ctx.fillStyle = s.colour;
    ctx.fillText(label, x, textY);
    x += labelSize.width;
  });
};
var drawXAxis = (width, yPos, drawing) => {
  const { ctx, x, y } = drawing;
  if (!x.showLine)
    return;
  if (x.colour)
    ctx.strokeStyle = x.colour;
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
    if (drawing.capacity === 0)
      dataXScale = plotSize.width / values.length;
    else
      dataXScale = plotSize.width / drawing.capacity;
  }
  const incrementBy = drawing.coalesce ? dataXScale < 0 ? Math.floor(1 / dataXScale) : 1 : 1;
  let x = 0;
  let leadingEdge;
  if (drawing.debug) {
    ctx.strokeStyle = `green`;
    ctx.strokeRect(0, 0, plotSize.width, plotSize.height);
  }
  const colourTransform = (c) => {
    if (translucentPlot)
      return Colour_exports.opacity(c, 0.2);
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
  for (let i = 0; i < values.length; i += incrementBy) {
    let y = calcYForValue(values[i], series, height) - 1;
    if (style === `dots`) {
      ctx.beginPath();
      ctx.arc(x, y, lineWidth, 0, piPi);
      ctx.fill();
    } else if (style === `none`) {
    } else {
      if (i == 0)
        ctx.moveTo(x, y);
      ctx.lineTo(x, y);
    }
    if (i === leadingEdgeIndex) {
      leadingEdge = { x, y };
      series.lastValue = values[i];
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
  if (y.showLabels)
    fromLeft += y.textSize;
  if (y.showLine)
    fromLeft += y.lineWidth;
  if (y.showLabels || y.showLine)
    fromLeft += margin + margin;
  let fromRight = margin;
  let fromTop = margin + margin;
  let fromBottom = margin + margin;
  if (x.showLabels)
    fromBottom += x.textSize;
  else
    fromBottom += margin;
  if (x.showLine)
    fromBottom += x.lineWidth;
  if (x.showLabels || x.showLine)
    fromBottom += margin;
  if (showLegend)
    fromBottom += x.textSize;
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
var plot = (parentElOrQuery, opts) => {
  if (parentElOrQuery === null)
    throw new Error(`parentElOrQuery is null. Expected string or element`);
  const parentEl = resolveEl(parentElOrQuery);
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
  const onPointerMove = (evt) => {
    pointer.x = evt.offsetX;
    pointer.y = evt.offsetY;
  };
  canvasEl.addEventListener(`pointermove`, onPointerMove);
  const ctx = canvasEl.getContext(`2d`);
  const capacity = opts.capacity ?? 10;
  const buffer = capacity > 0 ? mapCircular({ capacity }) : mapArray();
  const metrics = ctx.measureText("Xy");
  const coalesce = opts.coalesce ?? true;
  if (ctx === null)
    throw new Error(`Drawing context not available`);
  let xAxis = defaultAxis(`x`);
  if (opts.x)
    xAxis = { ...xAxis, ...opts.x };
  let yAxis = defaultAxis(`y`);
  if (opts.y)
    yAxis = { ...yAxis, ...opts.y };
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
      if (destroyCanvasEl)
        canvasEl.remove();
    },
    add: (value, series = "", skipDrawing = false) => {
      add(buffer, value, series);
      if (skipDrawing)
        return;
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

// src/visual/Plot2.ts
var Plot2_exports = {};
__export(Plot2_exports, {
  Plot: () => Plot
});

// src/visual/SceneGraph.ts
var SceneGraph_exports = {};
__export(SceneGraph_exports, {
  Box: () => Box,
  CanvasBox: () => CanvasBox,
  CanvasMeasureState: () => CanvasMeasureState,
  MeasureState: () => MeasureState
});
var unitIsEqual = (a, b) => {
  if (a.type === `px` && b.type === `px`) {
    return a.value === b.value;
  }
  return false;
};
var boxRectIsEqual = (a, b) => {
  if (a === void 0 && b === void 0)
    return true;
  if (a === void 0)
    return false;
  if (b === void 0)
    return false;
  if (a.x && b.x) {
    if (!unitIsEqual(a.x, b.x))
      return false;
  }
  if (a.y && b.y) {
    if (!unitIsEqual(a.y, b.y))
      return false;
  }
  if (a.width && b.width) {
    if (!unitIsEqual(a.width, b.width))
      return false;
  }
  if (a.height && b.height) {
    if (!unitIsEqual(a.height, b.height))
      return false;
  }
  return true;
};
var MeasureState = class {
  constructor(bounds) {
    __publicField(this, "bounds");
    __publicField(this, "pass");
    __publicField(this, "measurements");
    this.bounds = bounds;
    this.pass = 0;
    this.measurements = /* @__PURE__ */ new Map();
  }
  getSize(id) {
    const s = this.measurements.get(id);
    if (s === void 0)
      return;
    if (isPlaceholder(s.size))
      return;
    return s.size;
  }
  resolveToPx(u, defaultValue) {
    if (u === void 0)
      return defaultValue;
    if (u.type === `px`)
      return u.value;
    throw new Error(`Unknown unit type ${u.type}`);
  }
};
var Box = class {
  constructor(parent, id) {
    __publicField(this, "visual", placeholderPositioned);
    __publicField(this, "_desiredSize");
    __publicField(this, "_lastMeasure");
    __publicField(this, "children", []);
    __publicField(this, "_parent");
    __publicField(this, "_idMap", /* @__PURE__ */ new Map());
    __publicField(this, "debugLayout", false);
    __publicField(this, "_visible", true);
    __publicField(this, "_ready", true);
    __publicField(this, "takesSpaceWhenInvisible", false);
    __publicField(this, "needsDrawing", true);
    __publicField(this, "_needsLayout", true);
    __publicField(this, "debugHue", randomHue());
    __publicField(this, "id");
    this.id = id;
    this._parent = parent;
    parent?.onChildAdded(this);
  }
  hasChild(box) {
    const byRef = this.children.find((c) => c === box);
    const byId = this.children.find((c) => c.id === box.id);
    return byRef !== void 0 || byId !== void 0;
  }
  notify(msg, source) {
    this.onNotify(msg, source);
    this.children.forEach((c) => c.notify(msg, source));
  }
  onNotify(msg, source) {
  }
  onChildAdded(child) {
    if (child.hasChild(this))
      throw new Error(`Recursive`);
    if (child === this)
      throw new Error(`Cannot add self as child`);
    if (this.hasChild(child))
      throw new Error(`Child already present`);
    this.children.push(child);
    this._idMap.set(child.id, child);
  }
  setReady(ready, includeChildren = false) {
    this._ready = ready;
    if (includeChildren) {
      this.children.forEach((c) => c.setReady(ready, includeChildren));
    }
  }
  get visible() {
    return this._visible;
  }
  set visible(v) {
    if (this._visible === v)
      return;
    this._visible = v;
    this.onLayoutNeeded();
  }
  get desiredSize() {
    return this._desiredSize;
  }
  set desiredSize(v) {
    if (boxRectIsEqual(v, this._desiredSize))
      return;
    this._desiredSize = v;
    this.onLayoutNeeded();
  }
  onLayoutNeeded() {
    this.notifyChildLayoutNeeded();
  }
  notifyChildLayoutNeeded() {
    this._needsLayout = true;
    this.needsDrawing = true;
    if (this._parent !== void 0) {
      this._parent.notifyChildLayoutNeeded();
    } else {
      this.update();
    }
  }
  get root() {
    if (this._parent === void 0)
      return this;
    return this._parent.root;
  }
  measurePreflight() {
  }
  measureApply(m, force) {
    let different = true;
    this._needsLayout = false;
    if (isEqual(m.size, this.visual))
      different = false;
    if (isPositioned(m.size)) {
      this.visual = m.size;
    } else {
      this.visual = {
        x: 0,
        y: 0,
        width: m.size.width,
        height: m.size.height
      };
    }
    m.children.forEach((c) => {
      if (c !== void 0)
        c.ref.measureApply(c, force);
    });
    if (different || force) {
      this.needsDrawing = true;
      this.root.notify(`measureApplied`, this);
    }
    return different;
  }
  debugLog(m) {
    console.log(this.id, m);
  }
  measureStart(opts, force, parent) {
    this.measurePreflight();
    let m = {
      ref: this,
      size: placeholder,
      children: []
    };
    opts.measurements.set(this.id, m);
    if (!this._visible && !this.takesSpaceWhenInvisible) {
      m.size = emptyPositioned;
    } else {
      let size = this._lastMeasure;
      if (this._needsLayout || this._lastMeasure === void 0) {
        size = this.measureSelf(opts, parent);
        this.root.notify(`measured`, this);
      }
      if (size === void 0)
        return;
      m.size = size;
      this._lastMeasure = size;
    }
    m.children = this.children.map((c) => c.measureStart(opts, force, m));
    if (Arrays_exports.without(m.children, void 0).length < this.children.length) {
      return void 0;
    }
    return m;
  }
  measureSelf(opts, parent) {
    let size = placeholderPositioned;
    if (parent) {
      if (parent.size) {
        size = {
          x: 0,
          y: 0,
          width: parent.size.width,
          height: parent.size.height
        };
      }
    } else {
      size = {
        x: 0,
        y: 0,
        width: opts.bounds.width,
        height: opts.bounds.height
      };
    }
    if (isPlaceholder(size))
      return;
    return size;
  }
  updateDone(state, force) {
    this.onUpdateDone(state, force);
    this.children.forEach((c) => c.updateDone(state, force));
  }
  update(force = false) {
    const state = this.updateBegin(force);
    let attempts = 5;
    let applied = false;
    while (attempts--) {
      const m = this.measureStart(state, force);
      if (m !== void 0) {
        this.measureApply(m, force);
        if (!this._ready)
          return;
        applied = true;
      }
    }
    this.updateDone(state, force);
    if (!applied)
      console.warn(`Ran out of measurement attempts`);
  }
};
var CanvasMeasureState = class extends MeasureState {
  constructor(bounds, ctx) {
    super(bounds);
    __publicField(this, "ctx");
    this.ctx = ctx;
  }
};
var CanvasBox = class extends Box {
  constructor(parent, canvasEl, id) {
    super(parent, id);
    __publicField(this, "canvasEl");
    if (canvasEl === void 0)
      throw new Error(`canvasEl undefined`);
    if (canvasEl === null)
      throw new Error(`canvasEl null`);
    this.canvasEl = canvasEl;
    if (parent === void 0)
      this.designateRoot();
  }
  designateRoot() {
    this.canvasEl.addEventListener(`pointermove`, (evt) => {
      const p = { x: evt.offsetX, y: evt.offsetY };
      this.notifyPointerMove(p);
    });
    this.canvasEl.addEventListener(`pointerleave`, (evt) => {
      this.notifyPointerLeave();
    });
    this.canvasEl.addEventListener(`click`, (evt) => {
      const p = { x: evt.offsetX, y: evt.offsetY };
      this.notifyClick(p);
    });
  }
  onClick(p) {
  }
  notifyClick(p) {
    if (isPlaceholder(this.visual))
      return;
    if (intersectsPoint(this.visual, p)) {
      const pp = Point_exports.subtract(p, this.visual.x, this.visual.y);
      this.onClick(pp);
      this.children.forEach((c) => c.notifyClick(pp));
    }
  }
  notifyPointerLeave() {
    this.onPointerLeave();
    this.children.forEach((c) => c.notifyPointerLeave());
  }
  notifyPointerMove(p) {
    if (isPlaceholder(this.visual))
      return;
    if (intersectsPoint(this.visual, p)) {
      const pp = Point_exports.subtract(p, this.visual.x, this.visual.y);
      this.onPointerMove(pp);
      this.children.forEach((c) => c.notifyPointerMove(pp));
    }
  }
  onPointerLeave() {
  }
  onPointerMove(p) {
  }
  updateBegin() {
    const ctx = this.canvasEl.getContext(`2d`);
    if (ctx === null)
      throw new Error(`Context unavailable`);
    const s = this.canvasEl.getBoundingClientRect();
    return new CanvasMeasureState({
      width: s.width,
      height: s.height
    }, ctx);
  }
  onUpdateDone(state, force) {
    if (!this.needsDrawing && !force)
      return;
    const ctx = this.canvasEl.getContext(`2d`);
    if (ctx === null)
      throw new Error(`Context unavailable`);
    ctx.save();
    ctx.translate(this.visual.x, this.visual.y);
    const v = this.visual;
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
    this.needsDrawing = false;
    ctx.restore();
  }
  drawSelf(ctx) {
  }
};

// src/visual/Plot2.ts
var ArrayDataSource = class {
  constructor(series) {
    __publicField(this, "data");
    __publicField(this, "series");
    __publicField(this, "dirty", false);
    __publicField(this, "type", `array`);
    __publicField(this, "_range");
    this.series = series;
    this.data = [];
    this.dirty = true;
  }
  clear() {
    this.set([]);
  }
  set(data) {
    this.data = data;
    this.dirty = true;
  }
  get length() {
    return this.data.length;
  }
  get range() {
    if (!this.dirty && this._range !== void 0)
      return this._range;
    this.dirty = false;
    this._range = Arrays_exports.minMaxAvg(this.data);
    return { ...this._range, changed: true };
  }
  add(value) {
    this.data = [...this.data, value];
    this.dirty = true;
  }
};
var StreamingDataSource = class extends ArrayDataSource {
  constructor(series) {
    super(series);
    __publicField(this, "desiredDataPointMinWidth", 5);
  }
  add(value) {
    const lastWidth = this.series.lastPxPerPt;
    if (lastWidth > -1 && lastWidth < this.desiredDataPointMinWidth) {
      const pts = Math.floor(this.desiredDataPointMinWidth / lastWidth);
      const d = [...this.data.slice(pts), value];
      super.set(d);
    } else
      super.add(value);
  }
};
var Series = class {
  constructor(name, sourceType, plot2, opts) {
    this.plot = plot2;
    __publicField(this, "name");
    __publicField(this, "colour");
    __publicField(this, "source");
    __publicField(this, "drawingStyle");
    __publicField(this, "width", 3);
    __publicField(this, "dataHitPoint");
    __publicField(this, "tooltip");
    __publicField(this, "precision", 2);
    __publicField(this, "lastPxPerPt", -1);
    __publicField(this, "_visualRange");
    __publicField(this, "_visualRangeStretch");
    this.name = name;
    this.drawingStyle = opts.drawingStyle ?? `line`;
    this.colour = opts.colour;
    this.width = opts.width ?? 3;
    this._visualRange = opts.axisRange ?? { min: Number.NaN, max: Number.NaN };
    this._visualRangeStretch = opts.visualRangeStretch ?? true;
    if (sourceType === `array`) {
      this.source = new ArrayDataSource(this);
    } else if (sourceType === `stream`) {
      this.source = new StreamingDataSource(this);
    } else
      throw new Error(`Unknown sourceType. Expected array|stream`);
  }
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
    if (this.source === void 0)
      return value;
    const r = this.visualRange;
    if (r.min == r.max) {
      return 0.5;
    }
    return scale(value, r.min, r.max);
  }
  add(value) {
    this.source.add(value);
    this.plot.plotArea.needsDrawing = true;
  }
  clear() {
    this.source.clear();
    this.plot.plotArea.needsDrawing = true;
  }
};
var PlotArea = class extends CanvasBox {
  constructor(plot2) {
    super(plot2, plot2.canvasEl, `PlotArea`);
    this.plot = plot2;
    __publicField(this, "paddingPx", 3);
    __publicField(this, "piPi", Math.PI * 2);
    __publicField(this, "pointerDistanceThreshold", 20);
    __publicField(this, "lastRangeChange", 0);
    __publicField(this, "pointer");
  }
  clear() {
    this.lastRangeChange = 0;
    this.pointer = void 0;
  }
  measureSelf(opts, parent) {
    const axisY = opts.getSize(`AxisY`);
    if (axisY === void 0)
      return;
    const legend = opts.getSize(`Legend`);
    if (legend === void 0)
      return;
    const axisX = opts.getSize(`AxisX`);
    if (axisX === void 0)
      return;
    return {
      x: axisY.width,
      y: 0,
      width: opts.bounds.width - axisY.width,
      height: opts.bounds.height - legend.height - axisX.height
    };
  }
  onNotify(msg, source) {
    if (msg === `measureApplied` && source === this.plot.axisY)
      this._needsLayout = true;
    if (msg === `measureApplied` && source === this.plot.legend)
      this._needsLayout = true;
  }
  onPointerLeave() {
    const series = [...this.plot.series.values()];
    series.forEach((series2) => {
      series2.tooltip = void 0;
    });
    this.pointer = void 0;
    this.plot.legend.onLayoutNeeded();
  }
  onPointerMove(p) {
    this.pointer = p;
    this.plot.legend.onLayoutNeeded();
  }
  measurePreflight() {
    this.updateTooltip();
  }
  updateTooltip() {
    const p = this.pointer;
    if (p === void 0)
      return;
    const series = [...this.plot.series.values()];
    series.forEach((series2) => {
      if (p === void 0) {
        series2.tooltip = void 0;
        return;
      }
      if (series2.dataHitPoint === void 0)
        return;
      const v = series2.dataHitPoint(p);
      if (v[0] === void 0)
        return;
      if (v[1] > this.pointerDistanceThreshold)
        return;
      series2.tooltip = series2.formatValue(v[0].value);
    });
    this.plot.legend.needsDrawing = true;
  }
  drawSelf(ctx) {
    if (this.plot.frozen)
      return;
    const series = this.plot.seriesArray();
    ctx.clearRect(0, 0, this.visual.width, this.visual.height);
    series.forEach((series2) => {
      if (series2.source.type === `array` || series2.source.type === `stream`) {
        const arraySeries = series2.source;
        if (arraySeries.data === void 0)
          return;
        const d = [...arraySeries.data];
        this.drawDataSet(series2, d, ctx);
      } else
        console.warn(`Unknown data source type ${series2.source.type}`);
    });
  }
  computeY(series, rawValue) {
    const s = series.scaleValue(rawValue);
    return flip(s) * this.visual.height + this.paddingPx;
  }
  drawDataSet(series, d, ctx) {
    const padding = this.paddingPx + series.width;
    const v = Rect_exports.subtract(this.visual, padding * 2, padding * 3.5);
    const pxPerPt = v.width / d.length;
    series.lastPxPerPt = pxPerPt;
    let x = padding;
    ctx.strokeStyle = series.colour;
    ctx.lineWidth = series.width;
    const shapes = [];
    series.dataHitPoint = (pt) => {
      const distances = shapes.map((v2) => Point_exports.distanceToExterior(pt, v2));
      const i = minIndex(...distances);
      const closest = shapes[i];
      if (closest === void 0)
        [void 0, 0];
      return [closest, distances[i]];
    };
    if (series.drawingStyle === `line`) {
      let y = 0;
      ctx.beginPath();
      for (let i = 0; i < d.length; i++) {
        const scaled = clamp(series.scaleValue(d[i]));
        y = padding + this.paddingPx + v.height * flip(scaled);
        shapes.push({ x, y, index: i, value: d[i] });
        if (i == 0)
          ctx.moveTo(x + pxPerPt / 2, y);
        else
          ctx.lineTo(x + pxPerPt / 2, y);
        if (y > this.visual.height)
          console.warn(y + " h: " + this.visual.height);
        x += pxPerPt;
      }
      ctx.strokeStyle = series.colour;
      ctx.stroke();
    } else if (series.drawingStyle === `dotted`) {
      let y = 0;
      ctx.fillStyle = series.colour;
      for (let i = 0; i < d.length; i++) {
        const scaled = series.scaleValue(d[i]);
        y = padding + v.height * flip(scaled);
        ctx.beginPath();
        ctx.arc(x + pxPerPt / 2, y, series.width, 0, this.piPi);
        ctx.fill();
        shapes.push({ radius: series.width, x, y, index: i, value: d[i] });
        x += pxPerPt;
      }
    } else if (series.drawingStyle === `bar`) {
      ctx.fillStyle = series.colour;
      const interBarPadding = Math.ceil(pxPerPt * 0.1);
      for (let i = 0; i < d.length; i++) {
        const scaled = series.scaleValue(d[i]);
        const h = v.height * scaled;
        const r = {
          x: x + interBarPadding,
          y: v.height - h + padding,
          width: pxPerPt - interBarPadding,
          height: h,
          index: i,
          value: d[i]
        };
        ctx.fillRect(r.x, r.y, r.width, r.height);
        shapes.push(r);
        x += pxPerPt;
      }
    }
  }
};
var Legend = class extends CanvasBox {
  constructor(plot2) {
    super(plot2, plot2.canvasEl, `Legend`);
    this.plot = plot2;
    __publicField(this, "sampleSize", { width: 10, height: 10 });
    __publicField(this, "padding", 3);
    __publicField(this, "widthSnapping", 20);
  }
  clear() {
  }
  measureSelf(opts, parent) {
    const yAxis = opts.measurements.get(`AxisY`);
    const sample = this.sampleSize;
    const widthSnapping = this.widthSnapping;
    const padding = this.padding;
    const ctx = opts.ctx;
    if (yAxis === void 0)
      return;
    const usableWidth = opts.bounds.width - yAxis.size.width;
    const series = this.plot.seriesArray();
    let width = padding;
    for (let i = 0; i < series.length; i++) {
      width += sample.width + padding;
      width += textWidth(ctx, series[i].name, padding, widthSnapping);
      width += textWidth(ctx, series[i].tooltip, padding, widthSnapping);
    }
    const rows = Math.max(1, Math.ceil(width / usableWidth));
    const h = rows * (this.sampleSize.height + this.padding + this.padding);
    return {
      x: yAxis.size.width,
      y: opts.bounds.height - h,
      width: usableWidth,
      height: h
    };
  }
  drawSelf(ctx) {
    const series = this.plot.seriesArray();
    const sample = this.sampleSize;
    const padding = this.padding;
    const widthSnapping = this.widthSnapping;
    let x = padding;
    let y = padding;
    ctx.clearRect(0, 0, this.visual.width, this.visual.height);
    for (let i = 0; i < series.length; i++) {
      const s = series[i];
      ctx.fillStyle = s.colour;
      ctx.fillRect(x, y, sample.width, sample.height);
      x += sample.width + padding;
      ctx.textBaseline = `middle`;
      ctx.fillText(s.name, x, y + sample.height / 2);
      x += textWidth(ctx, s.name, padding, widthSnapping);
      if (s.tooltip) {
        ctx.fillStyle = this.plot.axisColour;
        ctx.fillText(s.tooltip, x, y + sample.height / 2);
        x += textWidth(ctx, s.tooltip, padding, widthSnapping);
      }
      x += padding;
      if (x > this.visual.width - 100) {
        x = padding;
        y += sample.height + padding + padding;
      }
    }
  }
  onNotify(msg, source) {
    if (msg === `measureApplied` && source === this._parent.axisY)
      this._needsLayout = true;
  }
};
var AxisX = class extends CanvasBox {
  constructor(plot2) {
    super(plot2, plot2.canvasEl, `AxisX`);
    this.plot = plot2;
    __publicField(this, "paddingPx", 2);
    __publicField(this, "colour");
  }
  clear() {
  }
  onNotify(msg, source) {
    if (msg === `measureApplied` && source === this.plot.axisY)
      this._needsLayout = true;
    if (msg === `measureApplied` && source === this.plot.legend) {
      this.onLayoutNeeded();
    }
  }
  drawSelf(ctx) {
    const plot2 = this.plot;
    const v = this.visual;
    const width = plot2.axisWidth;
    const colour = this.colour ?? plot2.axisColour;
    ctx.strokeStyle = colour;
    ctx.clearRect(0, 0, v.width, v.height);
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.moveTo(0, width / 2);
    ctx.lineTo(v.width, width / 2);
    ctx.stroke();
  }
  measureSelf(opts, parent) {
    const plot2 = this.plot;
    const yAxis = opts.measurements.get(`AxisY`);
    if (yAxis === void 0)
      return;
    const legend = opts.measurements.get(`Legend`);
    if (legend === void 0)
      return;
    const h = plot2.axisWidth + this.paddingPx;
    return {
      x: yAxis.size.width,
      y: opts.bounds.height - h - legend.size.height,
      width: opts.bounds.width - yAxis.size.width,
      height: h
    };
  }
};
var isRangeEqual = (a, b) => a.max === b.max && a.min === b.min;
var isRangeSinglePoint = (a) => a.max === a.min;
var AxisY = class extends CanvasBox {
  constructor(plot2) {
    super(plot2, plot2.canvasEl, `AxisY`);
    this.plot = plot2;
    __publicField(this, "_maxDigits", 1);
    __publicField(this, "seriesToShow");
    __publicField(this, "paddingPx", 2);
    __publicField(this, "colour");
    __publicField(this, "lastRange");
    __publicField(this, "lastPlotAreaHeight", 0);
    this.lastRange = { min: 0, max: 0 };
  }
  clear() {
    this.lastRange = { min: 0, max: 0 };
    this.lastPlotAreaHeight = 0;
  }
  measurePreflight() {
    const series = this.getSeries();
    if (series !== void 0 && !isRangeEqual(series.visualRange, this.lastRange)) {
      this._needsLayout = true;
      this.needsDrawing = true;
    }
  }
  onNotify(msg, source) {
    const pa = this.plot.plotArea;
    if (msg === `measureApplied` && source === pa) {
      if (pa.visual.height !== this.lastPlotAreaHeight) {
        this.lastPlotAreaHeight = pa.visual.height;
        this.needsDrawing = true;
      }
    }
  }
  measureSelf(opts) {
    const copts = opts;
    const paddingPx = this.paddingPx;
    let width = this.plot.axisWidth + paddingPx;
    const series = this.getSeries();
    if (series !== void 0) {
      const r = series.visualRange;
      this._maxDigits = Math.ceil(r.max).toString().length + series.precision + 1;
      const textToMeasure = `9`.repeat(this._maxDigits);
      width += textWidth(copts.ctx, textToMeasure, paddingPx * 2);
    }
    const w = opts.resolveToPx(this.desiredSize?.width, width);
    return {
      x: 0,
      y: 0,
      width: w,
      height: opts.bounds.height
    };
  }
  drawSelf(ctx) {
    const s = this.getSeries();
    if (s !== void 0)
      this.seriesAxis(s, ctx);
    else {
      if (this.seriesToShow === void 0)
        return;
      console.warn(`Plot AxisY series '${this.seriesToShow}' is missing.`);
    }
  }
  getSeries() {
    if (this.seriesToShow === void 0) {
      return this.plot.seriesArray()[0];
    } else {
      return this.plot.series.get(this.seriesToShow);
    }
  }
  seriesAxis(series, ctx) {
    const plot2 = this.plot;
    const plotArea = plot2.plotArea;
    const v = this.visual;
    const paddingPx = this.paddingPx;
    const r = series.visualRange;
    const width = plot2.axisWidth;
    const colour = this.colour ?? plot2.axisColour;
    ctx.strokeStyle = colour;
    ctx.fillStyle = colour;
    if (Number.isNaN(r.min) && Number.isNaN(r.max))
      return;
    this.lastRange = r;
    ctx.clearRect(0, 0, v.width, v.height);
    ctx.beginPath();
    ctx.lineWidth = width;
    const lineX = v.width - width / 2;
    ctx.moveTo(lineX, plotArea.paddingPx + width);
    ctx.lineTo(lineX, plotArea.visual.height + width);
    ctx.stroke();
    ctx.textBaseline = `top`;
    const fromRight = v.width - paddingPx * 4;
    if (isRangeSinglePoint(r)) {
      drawText(ctx, series.formatValue(r.max), (size) => [
        fromRight - size.width,
        plotArea.computeY(series, r.max) - paddingPx * 4
      ]);
    } else {
      drawText(ctx, series.formatValue(r.max), (size) => [
        fromRight - size.width,
        plotArea.computeY(series, r.max) + width / 2
      ]);
      drawText(ctx, series.formatValue(r.min), (size) => [
        fromRight - size.width,
        plotArea.computeY(series, r.min) - 5
      ]);
    }
  }
};
var drawText = (ctx, text, position) => {
  const size = ctx.measureText(text);
  const xy = position(size);
  ctx.fillText(text, xy[0], xy[1]);
};
var Plot = class extends CanvasBox {
  constructor(canvasEl, opts = {}) {
    if (canvasEl === void 0)
      throw new Error(`canvasEl undefined`);
    super(void 0, canvasEl, `Plot`);
    __publicField(this, "plotArea");
    __publicField(this, "legend");
    __publicField(this, "axisX");
    __publicField(this, "axisY");
    __publicField(this, "axisColour");
    __publicField(this, "axisWidth");
    __publicField(this, "series");
    __publicField(this, "_frozen", false);
    __publicField(this, "defaultSeriesOpts");
    if (opts.autoSize) {
      parentSizeCanvas(canvasEl, (evt) => {
        this.update(true);
      });
    }
    this.axisColour = opts.axisColour ?? `black`;
    this.axisWidth = opts.axisWidth ?? 3;
    this.series = /* @__PURE__ */ new Map();
    this.plotArea = new PlotArea(this);
    this.legend = new Legend(this);
    this.axisX = new AxisX(this);
    this.axisY = new AxisY(this);
  }
  clear() {
    this.series = /* @__PURE__ */ new Map();
    this.plotArea.clear();
    this.legend.clear();
    this.axisX.clear();
    this.axisY.clear();
    this.update(true);
  }
  get frozen() {
    return this._frozen;
  }
  set frozen(v) {
    this._frozen = v;
    if (v) {
      this.canvasEl.classList.add(`frozen`);
      this.canvasEl.title = `Plot frozen. Tap to unfreeze`;
    } else {
      this.canvasEl.title = ``;
      this.canvasEl.classList.remove(`frozen`);
    }
  }
  seriesArray() {
    return [...this.series.values()];
  }
  get seriesLength() {
    return this.series.size;
  }
  plot(o) {
    const paths2 = getFieldPaths(o);
    paths2.forEach((p) => {
      let s = this.series.get(p);
      if (s === void 0) {
        s = this.createSeries(p, `stream`);
        s.drawingStyle = `line`;
      }
      s.add(getFieldByPath(o, p));
    });
  }
  createSeriesFromObject(o, prefix = ``) {
    const keys = Object.keys(o);
    const create2 = (key) => {
      const v = o[key];
      if (typeof v === `object`) {
        return this.createSeriesFromObject(v, prefix + key + ".");
      } else if (typeof v === `number`) {
        return [this.createSeries(key, `stream`)];
      } else {
        return [];
      }
    };
    return keys.flatMap(create2);
  }
  createSeries(name, type = `array`, seriesOpts) {
    const len = this.seriesLength;
    if (name === void 0)
      name = `series-${len}`;
    if (this.series.has(name))
      throw new Error(`Series name '${name}' already in use`);
    let opts = {
      colour: `hsl(${len * 25 % 360}, 70%,50%)`,
      ...seriesOpts
    };
    if (this.defaultSeriesOpts)
      opts = { ...this.defaultSeriesOpts, ...opts };
    const s = new Series(name, type, this, opts);
    this.series.set(name, s);
    this.setReady(true, true);
    this.plotArea.needsDrawing = true;
    return s;
  }
};

// src/visual/Palette.ts
var Palette_exports = {};
__export(Palette_exports, {
  create: () => create
});
var create = (fallbacks) => new PaletteImpl(fallbacks);
var _store, _aliases, _lastFallback, _elementBase;
var PaletteImpl = class {
  constructor(fallbacks) {
    __privateAdd(this, _store, /* @__PURE__ */ new Map());
    __privateAdd(this, _aliases, /* @__PURE__ */ new Map());
    __publicField(this, "fallbacks");
    __privateAdd(this, _lastFallback, 0);
    __privateAdd(this, _elementBase, void 0);
    if (fallbacks !== void 0)
      this.fallbacks = fallbacks;
    else
      this.fallbacks = [`red`, `blue`, `green`, `orange`];
    __privateSet(this, _elementBase, document.body);
  }
  setElementBase(el) {
    __privateSet(this, _elementBase, el);
  }
  add(key, colour) {
    __privateGet(this, _store).set(key, colour);
  }
  alias(from, to) {
    __privateGet(this, _aliases).set(from, to);
  }
  get(key, fallback) {
    const alias = __privateGet(this, _aliases).get(key);
    if (alias !== void 0)
      key = alias;
    const c = __privateGet(this, _store).get(key);
    if (c !== void 0)
      return c;
    const varName = `--` + key;
    let fromCss = getComputedStyle(__privateGet(this, _elementBase)).getPropertyValue(varName).trim();
    if (fromCss === void 0 || fromCss.length === 0) {
      if (fallback !== void 0)
        return fallback;
      fromCss = this.fallbacks[__privateGet(this, _lastFallback)];
      __privateWrapper(this, _lastFallback)._++;
      if (__privateGet(this, _lastFallback) === this.fallbacks.length)
        __privateSet(this, _lastFallback, 0);
    }
    return fromCss;
  }
  getOrAdd(key, fallback) {
    if (this.has(key))
      return this.get(key);
    const c = this.get(key, fallback);
    this.add(key, c);
    return c;
  }
  has(key) {
    return __privateGet(this, _store).has(key);
  }
};
_store = new WeakMap();
_aliases = new WeakMap();
_lastFallback = new WeakMap();
_elementBase = new WeakMap();

// src/visual/Video.ts
var Video_exports = {};
__export(Video_exports, {
  capture: () => capture,
  frames: () => frames
});
async function* frames(sourceVideoEl, opts = {}) {
  const maxIntervalMs = opts.maxIntervalMs ?? 0;
  const showCanvas = opts.showCanvas ?? false;
  let canvasEl = opts.canvasEl;
  let w, h;
  w = h = 0;
  if (canvasEl === void 0) {
    canvasEl = document.createElement(`CANVAS`);
    if (!showCanvas) {
      canvasEl.style.display = `none`;
    }
    document.body.appendChild(canvasEl);
  }
  const updateSize = () => {
    if (canvasEl === void 0)
      return;
    w = sourceVideoEl.videoWidth;
    h = sourceVideoEl.videoHeight;
    canvasEl.width = w;
    canvasEl.height = h;
  };
  let c = null;
  const looper = delayLoop(maxIntervalMs);
  for await (const _ of looper) {
    if (w === 0 || h === 0)
      updateSize();
    if (w === 0 || h === 0)
      continue;
    if (c === null)
      c = canvasEl.getContext(`2d`);
    if (c === null)
      return;
    c.drawImage(sourceVideoEl, 0, 0, w, h);
    const pixels = c.getImageData(0, 0, w, h);
    yield pixels;
  }
}
var capture = (sourceVideoEl, opts = {}) => {
  const maxIntervalMs = opts.maxIntervalMs ?? 0;
  const showCanvas = opts.showCanvas ?? false;
  const onFrame = opts.onFrame;
  const w = sourceVideoEl.videoWidth;
  const h = sourceVideoEl.videoHeight;
  const canvasEl = document.createElement(`CANVAS`);
  if (!showCanvas) {
    canvasEl.style.display = `none`;
  }
  canvasEl.width = w;
  canvasEl.height = h;
  let c = null;
  let worker;
  if (opts.workerScript) {
    worker = new Worker(opts.workerScript);
  }
  const getPixels = worker || onFrame;
  if (!getPixels && !showCanvas) {
    console.warn(`Video will be captured to hidden element without any processing. Is this what you want?`);
  }
  const loop = continuously(() => {
    if (c === null)
      c = canvasEl.getContext(`2d`);
    if (c === null)
      return;
    c.drawImage(sourceVideoEl, 0, 0, w, h);
    let pixels;
    if (getPixels) {
      pixels = c.getImageData(0, 0, w, h);
    }
    if (worker) {
      worker.postMessage({
        pixels: pixels.data.buffer,
        width: w,
        height: h,
        channels: 4
      }, [pixels.data.buffer]);
    }
    if (onFrame) {
      try {
        onFrame(pixels);
      } catch (e) {
        console.error(e);
      }
    }
  }, maxIntervalMs);
  return {
    start: () => loop.start(),
    cancel: () => loop.cancel(),
    canvasEl
  };
};

// src/visual/index.ts
try {
  if (typeof window !== `undefined`)
    window.ixfx = { Drawing: Drawing_exports, Svg: Svg_exports, Plot: Plot_exports, Palette: Palette_exports, Colour: Colour_exports };
} catch {
}

export {
  Drawing_exports,
  Plot_exports,
  SceneGraph_exports,
  Plot2_exports,
  Palette_exports,
  Video_exports,
  visual_exports
};
//# sourceMappingURL=chunk-7U2TN2VN.js.map