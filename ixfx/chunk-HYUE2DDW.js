import {
  zipKeyValue
} from "./chunk-LTK4DV2D.js";
import {
  setMutable
} from "./chunk-CGNAXYY4.js";
import {
  Arrays_exports,
  minFast,
  randomElement
} from "./chunk-TCMXUXZU.js";
import {
  clamp,
  clampIndex,
  wrapInteger
} from "./chunk-BTWQWALP.js";
import {
  integer,
  number,
  percent
} from "./chunk-U4IZE4J2.js";
import {
  __export
} from "./chunk-6SYKIMQH.js";

// src/geometry/index.ts
var geometry_exports = {};
__export(geometry_exports, {
  Arcs: () => Arc_exports,
  Beziers: () => Bezier_exports,
  Circles: () => Circle_exports,
  Compound: () => CompoundPath_exports,
  Ellipses: () => Ellipse_exports,
  Grids: () => Grid_exports,
  Lines: () => Line_exports,
  Paths: () => Path_exports,
  Points: () => Point_exports,
  Polar: () => Polar_exports,
  Rects: () => Rect_exports,
  Shapes: () => Shape_exports,
  Triangles: () => Triangle_exports,
  degreeToRadian: () => degreeToRadian,
  radianToDegree: () => radianToDegree,
  radiansFromAxisX: () => radiansFromAxisX
});

// src/geometry/Arc.ts
var Arc_exports = {};
__export(Arc_exports, {
  bbox: () => bbox3,
  distanceCenter: () => distanceCenter,
  fromDegrees: () => fromDegrees,
  guard: () => guard3,
  interpolate: () => interpolate3,
  isArc: () => isArc,
  isEquals: () => isEquals,
  isPositioned: () => isPositioned,
  length: () => length3,
  point: () => point,
  toLine: () => toLine,
  toPath: () => toPath2,
  toSvg: () => toSvg
});

// src/geometry/Point.ts
var Point_exports = {};
__export(Point_exports, {
  Empty: () => Empty,
  Placeholder: () => Placeholder,
  angleBetween: () => angleBetween,
  apply: () => apply2,
  bbox: () => bbox2,
  centroid: () => centroid,
  clamp: () => clamp2,
  compare: () => compare,
  compareByX: () => compareByX,
  convexHull: () => convexHull,
  distance: () => distance2,
  distanceToCenter: () => distanceToCenter,
  distanceToExterior: () => distanceToExterior,
  divide: () => divide2,
  dotProduct: () => dotProduct,
  findMinimum: () => findMinimum,
  from: () => from,
  fromNumbers: () => fromNumbers2,
  getPointParam: () => getPointParam,
  guard: () => guard,
  guardNonZeroPoint: () => guardNonZeroPoint,
  interpolate: () => interpolate2,
  isEmpty: () => isEmpty,
  isEqual: () => isEqual,
  isPlaceholder: () => isPlaceholder,
  isPoint: () => isPoint,
  multiply: () => multiply2,
  normalise: () => normalise,
  normaliseByRect: () => normaliseByRect2,
  reduce: () => reduce,
  relation: () => relation,
  rotate: () => rotate2,
  rotatePointArray: () => rotatePointArray,
  subtract: () => subtract2,
  sum: () => sum2,
  toArray: () => toArray,
  toString: () => toString2,
  withinRange: () => withinRange2,
  wrap: () => wrap
});

// src/geometry/Line.ts
var Line_exports = {};
__export(Line_exports, {
  angleRadian: () => angleRadian,
  apply: () => apply,
  bbox: () => bbox,
  distance: () => distance,
  divide: () => divide,
  equals: () => equals,
  extendFromA: () => extendFromA,
  extendX: () => extendX,
  fromFlatArray: () => fromFlatArray,
  fromNumbers: () => fromNumbers,
  fromPoints: () => fromPoints,
  fromPointsToPath: () => fromPointsToPath,
  getPointsParam: () => getPointsParam,
  guard: () => guard2,
  interpolate: () => interpolate,
  isLine: () => isLine,
  isPolyLine: () => isPolyLine,
  joinPointsToLines: () => joinPointsToLines,
  length: () => length,
  midpoint: () => midpoint,
  multiply: () => multiply,
  nearest: () => nearest,
  normaliseByRect: () => normaliseByRect,
  parallel: () => parallel,
  perpendicularPoint: () => perpendicularPoint,
  rotate: () => rotate,
  scaleFromMidpoint: () => scaleFromMidpoint,
  slope: () => slope,
  subtract: () => subtract,
  sum: () => sum,
  toFlatArray: () => toFlatArray,
  toPath: () => toPath,
  toString: () => toString,
  toSvgString: () => toSvgString,
  withinRange: () => withinRange
});
var isLine = (p) => {
  if (p === void 0)
    return false;
  if (p.a === void 0)
    return false;
  if (p.b === void 0)
    return false;
  if (!Point_exports.isPoint(p.a))
    return false;
  if (!Point_exports.isPoint(p.b))
    return false;
  return true;
};
var isPolyLine = (p) => {
  if (!Array.isArray(p))
    return false;
  const valid = !p.some((v) => !isLine(v));
  return valid;
};
var equals = (a, b) => a.a === b.a && a.b === b.b;
var apply = (line, fn) => Object.freeze({
  ...line,
  a: fn(line.a),
  b: fn(line.b)
});
var guard2 = (line, paramName = `line`) => {
  if (line === void 0)
    throw new Error(`${paramName} undefined`);
  if (line.a === void 0)
    throw new Error(`${paramName}.a undefined. Expected {a:Point, b:Point}`);
  if (line.b === void 0)
    throw new Error(`${paramName}.b undefined. Expected {a:Point, b:Point}`);
};
var angleRadian = (lineOrPoint, b) => {
  let a;
  if (isLine(lineOrPoint)) {
    a = lineOrPoint.a;
    b = lineOrPoint.b;
  } else {
    a = lineOrPoint;
    if (b === void 0)
      throw new Error(`b point must be provided`);
  }
  return Math.atan2(b.y - a.y, b.x - a.x);
};
var multiply = (line, point3) => Object.freeze({
  ...line,
  a: Point_exports.multiply(line.a, point3),
  b: Point_exports.multiply(line.b, point3)
});
var divide = (line, point3) => Object.freeze({
  ...line,
  a: Point_exports.divide(line.a, point3),
  b: Point_exports.divide(line.b, point3)
});
var sum = (line, point3) => Object.freeze({
  ...line,
  a: Point_exports.sum(line.a, point3),
  b: Point_exports.sum(line.b, point3)
});
var subtract = (line, point3) => Object.freeze({
  ...line,
  a: Point_exports.subtract(line.a, point3),
  b: Point_exports.subtract(line.b, point3)
});
var normaliseByRect = (line, width, height) => Object.freeze({
  ...line,
  a: Point_exports.normaliseByRect(line.a, width, height),
  b: Point_exports.normaliseByRect(line.b, width, height)
});
var withinRange = (line, point3, maxRange) => {
  const dist = distance(line, point3);
  return dist <= maxRange;
};
function length(aOrLine, pointB) {
  if (isPolyLine(aOrLine)) {
    const sum3 = aOrLine.reduce((acc, v) => length(v) + acc, 0);
    return sum3;
  }
  const [a, b] = getPointsParam(aOrLine, pointB);
  const x = b.x - a.x;
  const y = b.y - a.y;
  if (a.z !== void 0 && b.z !== void 0) {
    const z = b.z - a.z;
    return Math.hypot(x, y, z);
  } else {
    return Math.hypot(x, y);
  }
}
var midpoint = (aOrLine, pointB) => {
  const [a, b] = getPointsParam(aOrLine, pointB);
  return interpolate(0.5, a, b);
};
var getPointsParam = (aOrLine, b) => {
  let a;
  if (isLine(aOrLine)) {
    b = aOrLine.b;
    a = aOrLine.a;
  } else {
    a = aOrLine;
    if (b === void 0)
      throw new Error(`Since first parameter is not a line, two points are expected. Got a: ${JSON.stringify(a)} b: ${JSON.stringify(b)}`);
  }
  guard(a, `a`);
  guard(a, `b`);
  return [a, b];
};
var nearest = (line, point3) => {
  const n = (line2) => {
    const { a, b } = line2;
    const atob = { x: b.x - a.x, y: b.y - a.y };
    const atop = { x: point3.x - a.x, y: point3.y - a.y };
    const len = atob.x * atob.x + atob.y * atob.y;
    let dot = atop.x * atob.x + atop.y * atob.y;
    const t2 = Math.min(1, Math.max(0, dot / len));
    dot = (b.x - a.x) * (point3.y - a.y) - (b.y - a.y) * (point3.x - a.x);
    return { x: a.x + atob.x * t2, y: a.y + atob.y * t2 };
  };
  if (Array.isArray(line)) {
    const pts = line.map((l) => n(l));
    const dists = pts.map((p) => Point_exports.distance(p, point3));
    return Object.freeze(pts[Arrays_exports.minIndex(...dists)]);
  } else {
    return Object.freeze(n(line));
  }
};
var slope = (lineOrPoint, b) => {
  let a;
  if (isLine(lineOrPoint)) {
    a = lineOrPoint.a;
    b = lineOrPoint.b;
  } else {
    a = lineOrPoint;
    if (b === void 0)
      throw new Error(`b parameter required`);
  }
  if (b !== void 0) {
    return (b.y - a.y) / (b.x - a.x);
  } else
    throw Error(`Second point missing`);
};
var directionVector = (line) => ({
  x: line.b.x - line.a.x,
  y: line.b.y - line.a.y
});
var directionVectorNormalised = (line) => {
  const l = length(line);
  const v = directionVector(line);
  return {
    x: v.x / l,
    y: v.y / l
  };
};
var perpendicularPoint = (line, distance3, amount = 0) => {
  const origin = interpolate(amount, line);
  const dvn = directionVectorNormalised(line);
  return {
    x: origin.x - dvn.y * distance3,
    y: origin.y + dvn.x * distance3
  };
};
var parallel = (line, distance3) => {
  const dv = directionVector(line);
  const dvn = directionVectorNormalised(line);
  const a = {
    x: line.a.x - dvn.y * distance3,
    y: line.a.y + dvn.x * distance3
  };
  return {
    a,
    b: {
      x: a.x + dv.x,
      y: a.y + dv.y
    }
  };
};
var scaleFromMidpoint = (line, factor) => {
  const a = interpolate(factor / 2, line);
  const b = interpolate(0.5 + factor / 2, line);
  return { a, b };
};
var extendX = (line, xIntersection) => {
  const y = line.a.y + (xIntersection - line.a.x) * slope(line);
  return Object.freeze({ x: xIntersection, y });
};
var extendFromA = (line, distance3) => {
  const len = length(line);
  return Object.freeze({
    ...line,
    a: line.a,
    b: Object.freeze({
      x: line.b.x + (line.b.x - line.a.x) / len * distance3,
      y: line.b.y + (line.b.y - line.a.y) / len * distance3
    })
  });
};
var distance = (line, point3) => {
  if (Array.isArray(line)) {
    const distances = line.map((l) => distanceSingleLine(l, point3));
    return minFast(distances);
  } else {
    return distanceSingleLine(line, point3);
  }
};
var distanceSingleLine = (line, point3) => {
  guard2(line, `line`);
  guard(point3, `point`);
  const lineLength = length(line);
  if (lineLength === 0) {
    return length(line.a, point3);
  }
  const near = nearest(line, point3);
  return length(near, point3);
};
function interpolate(amount, aOrLine, pointB) {
  percent(amount, `amount`);
  const [a, b] = getPointsParam(aOrLine, pointB);
  const d = length(a, b);
  const d2 = d * (1 - amount);
  const x = b.x - d2 * (b.x - a.x) / d;
  const y = b.y - d2 * (b.y - a.y) / d;
  return Object.freeze({ x, y });
}
function toString(a, b) {
  if (isLine(a)) {
    guard2(a, `a`);
    b = a.b;
    a = a.a;
  } else if (b === void 0)
    throw new Error(`Expect second point if first is a point`);
  return Point_exports.toString(a) + `-` + Point_exports.toString(b);
}
var fromNumbers = (x1, y1, x2, y2) => {
  if (Number.isNaN(x1))
    throw new Error(`x1 is NaN`);
  if (Number.isNaN(x2))
    throw new Error(`x2 is NaN`);
  if (Number.isNaN(y1))
    throw new Error(`y1 is NaN`);
  if (Number.isNaN(y2))
    throw new Error(`y2 is NaN`);
  const a = { x: x1, y: y1 };
  const b = { x: x2, y: y2 };
  return fromPoints(a, b);
};
var toFlatArray = (a, b) => [a.x, a.y, b.x, b.y];
var toSvgString = (a, b) => [`M${a.x} ${a.y} L ${b.x} ${b.y}`];
var fromFlatArray = (arr) => {
  if (!Array.isArray(arr))
    throw new Error(`arr parameter is not an array`);
  if (arr.length !== 4)
    throw new Error(`array is expected to have length four`);
  return fromNumbers(arr[0], arr[1], arr[2], arr[3]);
};
var fromPoints = (a, b) => {
  guard(a, `a`);
  guard(b, `b`);
  a = Object.freeze({ ...a });
  b = Object.freeze({ ...b });
  return Object.freeze({
    a,
    b
  });
};
var joinPointsToLines = (...points) => {
  const lines = [];
  let start = points[0];
  for (let i = 1; i < points.length; i++) {
    lines.push(fromPoints(start, points[i]));
    start = points[i];
  }
  return lines;
};
var fromPointsToPath = (a, b) => toPath(fromPoints(a, b));
var bbox = (line) => Point_exports.bbox(line.a, line.b);
var toPath = (line) => {
  const { a, b } = line;
  return Object.freeze({
    ...line,
    length: () => length(a, b),
    interpolate: (amount) => interpolate(amount, a, b),
    bbox: () => bbox(line),
    toString: () => toString(a, b),
    toFlatArray: () => toFlatArray(a, b),
    toSvgString: () => toSvgString(a, b),
    toPoints: () => [a, b],
    rotate: (amountRadian, origin) => toPath(rotate(line, amountRadian, origin)),
    sum: (point3) => toPath(sum(line, point3)),
    divide: (point3) => toPath(divide(line, point3)),
    multiply: (point3) => toPath(multiply(line, point3)),
    subtract: (point3) => toPath(subtract(line, point3)),
    apply: (fn) => toPath(apply(line, fn)),
    kind: `line`
  });
};
var rotate = (line, amountRadian, origin) => {
  if (amountRadian === void 0 || amountRadian === 0)
    return line;
  if (origin === void 0)
    origin = 0.5;
  if (typeof origin === `number`) {
    origin = interpolate(origin, line.a, line.b);
  }
  return Object.freeze({
    ...line,
    a: Point_exports.rotate(line.a, amountRadian, origin),
    b: Point_exports.rotate(line.b, amountRadian, origin)
  });
};

// src/geometry/Point.ts
var getPointParam = (a, b) => {
  if (a === void 0)
    return { x: 0, y: 0 };
  if (Point_exports.isPoint(a)) {
    return a;
  } else if (typeof a !== `number` || typeof b !== `number`) {
    throw new Error(`Expected point or x,y as parameters. Got: a: ${JSON.stringify(a)} b: ${JSON.stringify(b)}`);
  } else {
    return { x: a, y: b };
  }
};
var dotProduct = (...pts) => {
  const a = pts.map((p) => Point_exports.toArray(p));
  return Arrays_exports.dotProduct(a);
};
var Empty = Object.freeze({ x: 0, y: 0 });
var Placeholder = Object.freeze({ x: NaN, y: NaN });
var isEmpty = (p) => p.x === 0 && p.y === 0;
var isPlaceholder = (p) => Number.isNaN(p.x) && Number.isNaN(p.y);
var findMinimum = (compareFn, ...points) => {
  if (points.length === 0)
    throw new Error(`No points provided`);
  let min2 = points[0];
  points.forEach((p) => {
    min2 = compareFn(min2, p);
  });
  return min2;
};
function distance2(a, xOrB, y) {
  const pt = getPointParam(xOrB, y);
  guard(a, `a`);
  guard(pt);
  return Math.hypot(pt.x - a.x, pt.y - a.y);
}
var distanceToExterior = (a, shape) => {
  if (Rect_exports.isRectPositioned(shape)) {
    return Rect_exports.distanceFromExterior(shape, a);
  }
  if (Circle_exports.isCirclePositioned(shape)) {
    return Circle_exports.distanceFromExterior(shape, a);
  }
  if (isPoint(shape))
    return distance2(a, shape);
  throw new Error(`Unknown shape`);
};
var distanceToCenter = (a, shape) => {
  if (Rect_exports.isRectPositioned(shape)) {
    return Rect_exports.distanceFromExterior(shape, a);
  }
  if (Circle_exports.isCirclePositioned(shape)) {
    return Circle_exports.distanceFromExterior(shape, a);
  }
  if (isPoint(shape))
    return distance2(a, shape);
  throw new Error(`Unknown shape`);
};
var guard = (p, name = `Point`) => {
  if (p === void 0)
    throw new Error(`'${name}' is undefined. Expected {x,y} got ${JSON.stringify(p)}`);
  if (p === null)
    throw new Error(`'${name}' is null. Expected {x,y} got ${JSON.stringify(p)}`);
  if (p.x === void 0)
    throw new Error(`'${name}.x' is undefined. Expected {x,y} got ${JSON.stringify(p)}`);
  if (p.y === void 0)
    throw new Error(`'${name}.y' is undefined. Expected {x,y} got ${JSON.stringify(p)}`);
  if (typeof p.x !== `number`)
    throw new Error(`'${name}.x' must be a number`);
  if (typeof p.y !== `number`)
    throw new Error(`'${name}.y' must be a number`);
  if (Number.isNaN(p.x))
    throw new Error(`'${name}.x' is NaN`);
  if (Number.isNaN(p.y))
    throw new Error(`'${name}.y' is NaN`);
};
var guardNonZeroPoint = (pt, name = `pt`) => {
  guard(pt, name);
  number(pt.x, `nonZero`, `${name}.x`);
  number(pt.y, `nonZero`, `${name}.y`);
  return true;
};
var angleBetween = (a, b) => Math.atan2(b.y - a.y, b.x - a.x);
var centroid = (...points) => {
  if (!Array.isArray(points))
    throw new Error(`Expected list of points`);
  const sum3 = points.reduce((prev, p) => {
    if (Array.isArray(p))
      throw new Error(`'points' list contains an array. Did you mean: centroid(...myPoints)?`);
    if (!isPoint(p))
      throw new Error(`'points' contains something which is not a point: ${JSON.stringify(p)}`);
    return {
      x: prev.x + p.x,
      y: prev.y + p.y
    };
  }, { x: 0, y: 0 });
  return {
    x: sum3.x / points.length,
    y: sum3.y / points.length
  };
};
var bbox2 = (...points) => {
  const leftMost = findMinimum((a, b) => {
    if (a.x < b.x)
      return a;
    else
      return b;
  }, ...points);
  const rightMost = findMinimum((a, b) => {
    if (a.x > b.x)
      return a;
    else
      return b;
  }, ...points);
  const topMost = findMinimum((a, b) => {
    if (a.y < b.y)
      return a;
    else
      return b;
  }, ...points);
  const bottomMost = findMinimum((a, b) => {
    if (a.y > b.y)
      return a;
    else
      return b;
  }, ...points);
  const topLeft = { x: leftMost.x, y: topMost.y };
  const topRight = { x: rightMost.x, y: topMost.y };
  const bottomRight = { x: rightMost.x, y: bottomMost.y };
  const bottomLeft = { x: leftMost.x, y: bottomMost.y };
  return Rect_exports.maxFromCorners(topLeft, topRight, bottomRight, bottomLeft);
};
var isPoint = (p) => {
  if (p === void 0)
    return false;
  if (p.x === void 0)
    return false;
  if (p.y === void 0)
    return false;
  return true;
};
var toArray = (p) => [p.x, p.y];
var toString2 = (p) => {
  if (p.z !== void 0) {
    return `(${p.x},${p.y},${p.z})`;
  } else {
    return `(${p.x},${p.y})`;
  }
};
var isEqual = (...p) => {
  if (p === void 0)
    throw new Error(`parameter 'p' is undefined`);
  if (p.length < 2)
    return true;
  for (let i = 1; i < p.length; i++) {
    if (p[i].x !== p[0].x)
      return false;
    if (p[i].y !== p[0].y)
      return false;
  }
  return true;
};
var withinRange2 = (a, b, maxRange) => {
  if (typeof maxRange === `number`) {
    maxRange = { x: maxRange, y: maxRange };
  }
  const x = Math.abs(b.x - a.x);
  const y = Math.abs(b.y - a.y);
  return x <= maxRange.x && y <= maxRange.y;
};
var interpolate2 = (amount, a, b) => interpolate(amount, a, b);
var from = (xOrArray, y) => {
  if (Array.isArray(xOrArray)) {
    if (xOrArray.length !== 2)
      throw new Error(`Expected array of length two, got ` + xOrArray.length);
    return Object.freeze({
      x: xOrArray[0],
      y: xOrArray[1]
    });
  } else {
    if (xOrArray === void 0)
      xOrArray = 0;
    else if (Number.isNaN(xOrArray))
      throw new Error(`x is NaN`);
    if (y === void 0)
      y = 0;
    else if (Number.isNaN(y))
      throw new Error(`y is NaN`);
    return Object.freeze({ x: xOrArray, y });
  }
};
var fromNumbers2 = (...coords) => {
  const pts = [];
  if (Array.isArray(coords[0])) {
    coords.forEach((coord) => {
      if (!(coord.length % 2 === 0))
        throw new Error(`coords array should be even-numbered`);
      pts.push(Object.freeze({ x: coord[0], y: coord[1] }));
    });
  } else {
    if (coords.length % 2 !== 0)
      throw new Error(`Expected even number of elements: [x,y,x,y...]`);
    for (let i = 0; i < coords.length; i += 2) {
      pts.push(Object.freeze({ x: coords[i], y: coords[i + 1] }));
    }
  }
  return pts;
};
function subtract2(a, b, c, d) {
  if (isPoint(a)) {
    guard(a, `a`);
    if (isPoint(b)) {
      guard(b, `b`);
      return {
        x: a.x - b.x,
        y: a.y - b.y
      };
    } else {
      if (c === void 0)
        c = 0;
      return {
        x: a.x - b,
        y: a.y - c
      };
    }
  } else {
    number(a, ``, `a`);
    if (typeof b !== `number`)
      throw new Error(`Second parameter is expected to by y value`);
    number(b, ``, `b`);
    if (c === void 0)
      c = 0;
    if (d === void 0)
      d = 0;
    return {
      x: a - c,
      y: b - d
    };
  }
}
var apply2 = (pt, fn) => Object.freeze({
  ...pt,
  x: fn(pt.x, `x`),
  y: fn(pt.y, `y`)
});
var reduce = (pts, fn, initial = { x: 0, y: 0 }) => {
  let acc = initial;
  pts.forEach((p) => {
    acc = fn(p, acc);
  });
  return acc;
};
var sum2 = function(a, b, c, d) {
  let ptA;
  let ptB;
  if (isPoint(a)) {
    ptA = a;
    if (b === void 0)
      b = Empty;
    if (isPoint(b)) {
      ptB = b;
    } else {
      if (b === void 0)
        throw new Error(`Expects x coordinate`);
      ptB = { x: b, y: c === void 0 ? 0 : c };
    }
  } else if (!isPoint(b)) {
    if (b === void 0)
      throw new Error(`Expected number as second param`);
    ptA = { x: a, y: b };
    if (c === void 0)
      throw new Error(`Expects x coordiante`);
    ptB = { x: c, y: d === void 0 ? 0 : d };
  }
  if (ptA === void 0)
    throw new Error(`ptA missing`);
  if (ptB === void 0)
    throw new Error(`ptB missing`);
  guard(ptA, `a`);
  guard(ptB, `b`);
  return {
    x: ptA.x + ptB.x,
    y: ptA.y + ptB.y
  };
};
function multiply2(a, bOrX, y) {
  guard(a, `a`);
  if (typeof bOrX === `number`) {
    if (typeof y === `undefined`)
      y = 1;
    number(y, ``, `y`);
    number(bOrX, ``, `x`);
    return { x: a.x * bOrX, y: a.y * y };
  } else if (isPoint(bOrX)) {
    guard(bOrX, `b`);
    return {
      x: a.x * bOrX.x,
      y: a.y * bOrX.y
    };
  } else
    throw new Error(`Invalid arguments`);
}
function divide2(a, b, c, d) {
  if (isPoint(a)) {
    if (isPoint(b)) {
      guard(a);
      guardNonZeroPoint(b);
      return {
        x: a.x / b.x,
        y: a.y / b.y
      };
    } else {
      if (c === void 0)
        c = 1;
      guard(a);
      number(b, `nonZero`, `x`);
      number(c, `nonZero`, `y`);
      return {
        x: a.x / b,
        y: a.y / c
      };
    }
  } else {
    if (typeof b !== `number`)
      throw new Error(`expected second parameter to be y1 coord`);
    number(a, `positive`, `x1`);
    number(b, `positive`, `y1`);
    if (c === void 0)
      c = 1;
    if (d === void 0)
      d = 1;
    number(c, `nonZero`, `x2`);
    number(d, `nonZero`, `y2`);
    return {
      x: a / c,
      y: b / d
    };
  }
}
var convexHull = (...pts) => {
  const sorted = [...pts].sort(compareByX);
  if (sorted.length === 1)
    return sorted;
  const x = (points) => {
    const v = [];
    points.forEach((p) => {
      while (v.length >= 2) {
        const q = v[v.length - 1];
        const r = v[v.length - 2];
        if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x)) {
          v.pop();
        } else
          break;
      }
      v.push(p);
    });
    v.pop();
    return v;
  };
  const upper = x(sorted);
  const lower = x(sorted.reverse());
  if (upper.length === 1 && lower.length === 1 && isEqual(lower[0], upper[0]))
    return upper;
  return upper.concat(lower);
};
var compare = (a, b) => {
  if (a.x < b.x || a.y < b.y)
    return -1;
  if (a.x > b.x || a.y > b.y)
    return 1;
  return 0;
};
var compareByX = (a, b) => a.x - b.x || a.y - b.y;
function rotate2(pt, amountRadian, origin) {
  if (origin === void 0)
    origin = { x: 0, y: 0 };
  guard(origin, `origin`);
  number(amountRadian, ``, `amountRadian`);
  const arrayInput = Array.isArray(pt);
  if (!arrayInput) {
    pt = [pt];
  }
  const ptAr = pt;
  ptAr.forEach((p, index) => guard(p, `pt[${index}]`));
  const asPolar = ptAr.map((p) => Polar_exports.fromCartesian(p, origin));
  const rotated = asPolar.map((p) => Polar_exports.rotate(p, amountRadian));
  const asCartesisan = rotated.map((p) => Polar_exports.toCartesian(p, origin));
  if (arrayInput)
    return asCartesisan;
  else
    return asCartesisan[0];
}
var rotatePointArray = (v, amountRadian) => {
  const mat = [[Math.cos(amountRadian), -Math.sin(amountRadian)], [Math.sin(amountRadian), Math.cos(amountRadian)]];
  const result = [];
  for (let i = 0; i < v.length; ++i) {
    result[i] = [mat[0][0] * v[i][0] + mat[0][1] * v[i][1], mat[1][0] * v[i][0] + mat[1][1] * v[i][1]];
  }
  return result;
};
var length2 = (ptOrX, y) => {
  if (isPoint(ptOrX)) {
    y = ptOrX.y;
    ptOrX = ptOrX.x;
  }
  if (y === void 0)
    throw new Error(`Expected y`);
  return Math.sqrt(ptOrX * ptOrX + y * y);
};
var normalise = (ptOrX, y) => {
  if (isPoint(ptOrX)) {
    y = ptOrX.y;
    ptOrX = ptOrX.x;
  }
  if (y === void 0)
    throw new Error(`Expected y`);
  const l = length2(ptOrX, y);
  return Object.freeze({
    x: ptOrX / l,
    y: y / l
  });
};
function normaliseByRect2(a, b, c, d) {
  if (isPoint(a)) {
    if (typeof b === `number` && c !== void 0) {
      number(b, `positive`, `width`);
      number(c, `positive`, `height`);
    } else {
      if (!Rect_exports.isRect(b))
        throw new Error(`Expected second parameter to be a rect`);
      c = b.height;
      b = b.width;
    }
    return {
      x: a.x / b,
      y: a.y / c
    };
  } else {
    number(a, `positive`, `x`);
    if (typeof b !== `number`)
      throw new Error(`Expecting second parameter to be a number (width)`);
    if (typeof c !== `number`)
      throw new Error(`Expecting third parameter to be a number (height)`);
    number(b, `positive`, `y`);
    number(c, `positive`, `width`);
    if (d === void 0)
      throw new Error(`Expected height parameter`);
    number(d, `positive`, `height`);
    return {
      x: a / c,
      y: b / d
    };
  }
}
var wrap = (pt, ptMax, ptMin = { x: 0, y: 0 }) => {
  guard(pt, `pt`);
  guard(ptMax, `ptMax`);
  guard(ptMin, `ptMin`);
  return {
    x: wrapInteger(pt.x, ptMin.x, ptMax.x),
    y: wrapInteger(pt.y, ptMin.y, ptMax.y)
  };
};
function clamp2(a, b, c, d) {
  if (isPoint(a)) {
    if (b === void 0)
      b = 0;
    if (c === void 0)
      c = 1;
    number(b, ``, `min`);
    number(c, ``, `max`);
    return {
      x: clamp(a.x, b, c),
      y: clamp(a.y, b, c)
    };
  } else {
    if (b === void 0)
      throw new Error(`Expected y coordinate`);
    if (c === void 0)
      c = 0;
    if (d === void 0)
      d = 1;
    number(a, ``, `x`);
    number(b, ``, `y`);
    number(c, ``, `min`);
    number(d, ``, `max`);
    return {
      x: clamp(a, c, d),
      y: clamp(b, c, d)
    };
  }
}
var relation = (a, b) => {
  const start = getPointParam(a, b);
  const update = (aa, bb) => {
    const p = getPointParam(aa, bb);
    return {
      angle: angleBetween(p, start),
      distance: distance2(p, start),
      centroid: centroid(p, start)
    };
  };
  return update;
};

// src/geometry/Arc.ts
var isArc = (p) => p.startRadian !== void 0 && p.endRadian !== void 0;
var isPositioned = (p) => p.x !== void 0 && p.y !== void 0;
var piPi = Math.PI * 2;
function fromDegrees(radius, startDegrees, endDegrees, origin) {
  const a = {
    radius,
    startRadian: degreeToRadian(startDegrees),
    endRadian: degreeToRadian(endDegrees)
  };
  if (isPoint(origin)) {
    guard(origin);
    const ap = {
      ...a,
      x: origin.x,
      y: origin.y
    };
    return Object.freeze(ap);
  } else {
    return Object.freeze(a);
  }
}
var toLine = (arc) => Line_exports.fromPoints(point(arc, arc.startRadian), point(arc, arc.endRadian));
var point = (arc, angleRadian2, origin) => {
  if (angleRadian2 > arc.endRadian)
    throw new Error(`angleRadian beyond end angle of arc`);
  if (angleRadian2 < arc.startRadian)
    throw new Error(`angleRadian beyond start angle of arc`);
  if (origin === void 0) {
    if (isPositioned(arc)) {
      origin = arc;
    } else {
      origin = { x: 0, y: 0 };
    }
  }
  return {
    x: Math.cos(angleRadian2) * arc.radius + origin.x,
    y: Math.sin(angleRadian2) * arc.radius + origin.y
  };
};
var guard3 = (arc) => {
  if (arc === void 0)
    throw new Error(`Arc is undefined`);
  if (isPositioned(arc)) {
    guard(arc, `arc`);
  }
  if (arc.radius === void 0)
    throw new Error(`Arc radius is undefined (${JSON.stringify(arc)})`);
  if (typeof arc.radius !== `number`)
    throw new Error(`Radius must be a number`);
  if (Number.isNaN(arc.radius))
    throw new Error(`Radius is NaN`);
  if (arc.radius <= 0)
    throw new Error(`Radius must be greater than zero`);
  if (arc.startRadian === void 0)
    throw new Error(`Arc is missing 'startRadian' field`);
  if (arc.endRadian === void 0)
    throw new Error(`Arc is missing 'startRadian' field`);
  if (Number.isNaN(arc.endRadian))
    throw new Error(`Arc endRadian is NaN`);
  if (Number.isNaN(arc.startRadian))
    throw new Error(`Arc endRadian is NaN`);
  if (arc.startRadian >= arc.endRadian)
    throw new Error(`startRadian is expected to be les than endRadian`);
};
var interpolate3 = (amount, arc, origin) => {
  guard3(arc);
  return point(arc, arc.startRadian + (arc.endRadian - arc.startRadian) * amount, origin);
};
var toPath2 = (arc) => {
  guard3(arc);
  return Object.freeze({
    ...arc,
    interpolate: (amount) => interpolate3(amount, arc),
    bbox: () => bbox3(arc),
    length: () => length3(arc),
    toSvgString: () => toSvg(arc),
    kind: `arc`
  });
};
var length3 = (arc) => piPi * arc.radius * ((arc.startRadian - arc.endRadian) / piPi);
var bbox3 = (arc) => {
  if (isPositioned(arc)) {
    const middle = interpolate3(0.5, arc);
    const asLine = toLine(arc);
    return Point_exports.bbox(middle, asLine.a, asLine.b);
  } else {
    return {
      width: arc.radius * 2,
      height: arc.radius * 2
    };
  }
};
var toSvg = (a, b, c, d, e) => {
  if (isArc(a)) {
    if (isPositioned(a)) {
      return toSvgFull(a, a.radius, a.startRadian, a.endRadian, b);
    } else {
      if (isPoint(b)) {
        return toSvgFull(b, a.radius, a.startRadian, a.endRadian, c);
      } else {
        return toSvgFull({ x: 0, y: 0 }, a.radius, a.startRadian, a.endRadian);
      }
    }
  } else {
    if (c === void 0)
      throw new Error(`startAngle undefined`);
    if (d === void 0)
      throw new Error(`endAngle undefined`);
    if (isPoint(a)) {
      if (typeof b === `number` && typeof c === `number` && typeof d === `number`) {
        return toSvgFull(a, b, c, d, e);
      } else {
        throw new Error(`Expected (point, number, number, number). Missing a number param.`);
      }
    } else {
      throw new Error(`Expected (point, number, number, number). Missing first point.`);
    }
  }
};
var toSvgFull = (origin, radius, startRadian, endRadian, opts) => {
  if (opts === void 0 || typeof opts !== `object`)
    opts = {};
  const isFullCircle = endRadian - startRadian === 360;
  const start = Polar_exports.toCartesian(radius, endRadian - 0.01, origin);
  const end = Polar_exports.toCartesian(radius, startRadian, origin);
  const { largeArc = false, sweep = false } = opts;
  const d = [`
    M ${start.x} ${start.y}
    A ${radius} ${radius} 0 ${largeArc ? `1` : `0`} ${sweep ? `1` : `0`} ${end.x} ${end.y},
  `];
  if (isFullCircle)
    d.push(`z`);
  return d;
};
var distanceCenter = (a, b) => Point_exports.distance(a, b);
var isEquals = (a, b) => {
  if (a.radius !== b.radius)
    return false;
  if (isPositioned(a) && isPositioned(b)) {
    if (a.x !== b.x)
      return false;
    if (a.y !== b.y)
      return false;
    if (a.z !== b.z)
      return false;
    return true;
  } else if (!isPositioned(a) && !isPositioned(b)) {
  } else
    return false;
  if (a.endRadian !== b.endRadian)
    return false;
  if (a.startRadian !== b.startRadian)
    return false;
  return true;
};

// src/geometry/Bezier.ts
var Bezier_exports = {};
__export(Bezier_exports, {
  computeQuadraticSimple: () => computeQuadraticSimple,
  cubic: () => cubic,
  isCubicBezier: () => isCubicBezier,
  isQuadraticBezier: () => isQuadraticBezier,
  quadratic: () => quadratic,
  quadraticBend: () => quadraticBend,
  quadraticSimple: () => quadraticSimple,
  quadraticToSvgString: () => quadraticToSvgString,
  toPath: () => toPath3
});

// node_modules/bezier-js/src/utils.js
var { abs, cos, sin, acos, atan2, sqrt, pow } = Math;
function crt(v) {
  return v < 0 ? -pow(-v, 1 / 3) : pow(v, 1 / 3);
}
var pi = Math.PI;
var tau = 2 * pi;
var quart = pi / 2;
var epsilon = 1e-6;
var nMax = Number.MAX_SAFE_INTEGER || 9007199254740991;
var nMin = Number.MIN_SAFE_INTEGER || -9007199254740991;
var ZERO = { x: 0, y: 0, z: 0 };
var utils = {
  Tvalues: [
    -0.06405689286260563,
    0.06405689286260563,
    -0.1911188674736163,
    0.1911188674736163,
    -0.3150426796961634,
    0.3150426796961634,
    -0.4337935076260451,
    0.4337935076260451,
    -0.5454214713888396,
    0.5454214713888396,
    -0.6480936519369755,
    0.6480936519369755,
    -0.7401241915785544,
    0.7401241915785544,
    -0.820001985973903,
    0.820001985973903,
    -0.8864155270044011,
    0.8864155270044011,
    -0.9382745520027328,
    0.9382745520027328,
    -0.9747285559713095,
    0.9747285559713095,
    -0.9951872199970213,
    0.9951872199970213
  ],
  Cvalues: [
    0.12793819534675216,
    0.12793819534675216,
    0.1258374563468283,
    0.1258374563468283,
    0.12167047292780339,
    0.12167047292780339,
    0.1155056680537256,
    0.1155056680537256,
    0.10744427011596563,
    0.10744427011596563,
    0.09761865210411388,
    0.09761865210411388,
    0.08619016153195327,
    0.08619016153195327,
    0.0733464814110803,
    0.0733464814110803,
    0.05929858491543678,
    0.05929858491543678,
    0.04427743881741981,
    0.04427743881741981,
    0.028531388628933663,
    0.028531388628933663,
    0.0123412297999872,
    0.0123412297999872
  ],
  arcfn: function(t2, derivativeFn) {
    const d = derivativeFn(t2);
    let l = d.x * d.x + d.y * d.y;
    if (typeof d.z !== "undefined") {
      l += d.z * d.z;
    }
    return sqrt(l);
  },
  compute: function(t2, points, _3d) {
    if (t2 === 0) {
      points[0].t = 0;
      return points[0];
    }
    const order = points.length - 1;
    if (t2 === 1) {
      points[order].t = 1;
      return points[order];
    }
    const mt = 1 - t2;
    let p = points;
    if (order === 0) {
      points[0].t = t2;
      return points[0];
    }
    if (order === 1) {
      const ret = {
        x: mt * p[0].x + t2 * p[1].x,
        y: mt * p[0].y + t2 * p[1].y,
        t: t2
      };
      if (_3d) {
        ret.z = mt * p[0].z + t2 * p[1].z;
      }
      return ret;
    }
    if (order < 4) {
      let mt2 = mt * mt, t22 = t2 * t2, a, b, c, d = 0;
      if (order === 2) {
        p = [p[0], p[1], p[2], ZERO];
        a = mt2;
        b = mt * t2 * 2;
        c = t22;
      } else if (order === 3) {
        a = mt2 * mt;
        b = mt2 * t2 * 3;
        c = mt * t22 * 3;
        d = t2 * t22;
      }
      const ret = {
        x: a * p[0].x + b * p[1].x + c * p[2].x + d * p[3].x,
        y: a * p[0].y + b * p[1].y + c * p[2].y + d * p[3].y,
        t: t2
      };
      if (_3d) {
        ret.z = a * p[0].z + b * p[1].z + c * p[2].z + d * p[3].z;
      }
      return ret;
    }
    const dCpts = JSON.parse(JSON.stringify(points));
    while (dCpts.length > 1) {
      for (let i = 0; i < dCpts.length - 1; i++) {
        dCpts[i] = {
          x: dCpts[i].x + (dCpts[i + 1].x - dCpts[i].x) * t2,
          y: dCpts[i].y + (dCpts[i + 1].y - dCpts[i].y) * t2
        };
        if (typeof dCpts[i].z !== "undefined") {
          dCpts[i] = dCpts[i].z + (dCpts[i + 1].z - dCpts[i].z) * t2;
        }
      }
      dCpts.splice(dCpts.length - 1, 1);
    }
    dCpts[0].t = t2;
    return dCpts[0];
  },
  computeWithRatios: function(t2, points, ratios, _3d) {
    const mt = 1 - t2, r = ratios, p = points;
    let f1 = r[0], f2 = r[1], f3 = r[2], f4 = r[3], d;
    f1 *= mt;
    f2 *= t2;
    if (p.length === 2) {
      d = f1 + f2;
      return {
        x: (f1 * p[0].x + f2 * p[1].x) / d,
        y: (f1 * p[0].y + f2 * p[1].y) / d,
        z: !_3d ? false : (f1 * p[0].z + f2 * p[1].z) / d,
        t: t2
      };
    }
    f1 *= mt;
    f2 *= 2 * mt;
    f3 *= t2 * t2;
    if (p.length === 3) {
      d = f1 + f2 + f3;
      return {
        x: (f1 * p[0].x + f2 * p[1].x + f3 * p[2].x) / d,
        y: (f1 * p[0].y + f2 * p[1].y + f3 * p[2].y) / d,
        z: !_3d ? false : (f1 * p[0].z + f2 * p[1].z + f3 * p[2].z) / d,
        t: t2
      };
    }
    f1 *= mt;
    f2 *= 1.5 * mt;
    f3 *= 3 * mt;
    f4 *= t2 * t2 * t2;
    if (p.length === 4) {
      d = f1 + f2 + f3 + f4;
      return {
        x: (f1 * p[0].x + f2 * p[1].x + f3 * p[2].x + f4 * p[3].x) / d,
        y: (f1 * p[0].y + f2 * p[1].y + f3 * p[2].y + f4 * p[3].y) / d,
        z: !_3d ? false : (f1 * p[0].z + f2 * p[1].z + f3 * p[2].z + f4 * p[3].z) / d,
        t: t2
      };
    }
  },
  derive: function(points, _3d) {
    const dpoints = [];
    for (let p = points, d = p.length, c = d - 1; d > 1; d--, c--) {
      const list = [];
      for (let j = 0, dpt; j < c; j++) {
        dpt = {
          x: c * (p[j + 1].x - p[j].x),
          y: c * (p[j + 1].y - p[j].y)
        };
        if (_3d) {
          dpt.z = c * (p[j + 1].z - p[j].z);
        }
        list.push(dpt);
      }
      dpoints.push(list);
      p = list;
    }
    return dpoints;
  },
  between: function(v, m, M) {
    return m <= v && v <= M || utils.approximately(v, m) || utils.approximately(v, M);
  },
  approximately: function(a, b, precision) {
    return abs(a - b) <= (precision || epsilon);
  },
  length: function(derivativeFn) {
    const z = 0.5, len = utils.Tvalues.length;
    let sum3 = 0;
    for (let i = 0, t2; i < len; i++) {
      t2 = z * utils.Tvalues[i] + z;
      sum3 += utils.Cvalues[i] * utils.arcfn(t2, derivativeFn);
    }
    return z * sum3;
  },
  map: function(v, ds, de, ts, te) {
    const d1 = de - ds, d2 = te - ts, v2 = v - ds, r = v2 / d1;
    return ts + d2 * r;
  },
  lerp: function(r, v1, v2) {
    const ret = {
      x: v1.x + r * (v2.x - v1.x),
      y: v1.y + r * (v2.y - v1.y)
    };
    if (v1.z !== void 0 && v2.z !== void 0) {
      ret.z = v1.z + r * (v2.z - v1.z);
    }
    return ret;
  },
  pointToString: function(p) {
    let s = p.x + "/" + p.y;
    if (typeof p.z !== "undefined") {
      s += "/" + p.z;
    }
    return s;
  },
  pointsToString: function(points) {
    return "[" + points.map(utils.pointToString).join(", ") + "]";
  },
  copy: function(obj) {
    return JSON.parse(JSON.stringify(obj));
  },
  angle: function(o, v1, v2) {
    const dx1 = v1.x - o.x, dy1 = v1.y - o.y, dx2 = v2.x - o.x, dy2 = v2.y - o.y, cross = dx1 * dy2 - dy1 * dx2, dot = dx1 * dx2 + dy1 * dy2;
    return atan2(cross, dot);
  },
  round: function(v, d) {
    const s = "" + v;
    const pos = s.indexOf(".");
    return parseFloat(s.substring(0, pos + 1 + d));
  },
  dist: function(p1, p2) {
    const dx = p1.x - p2.x, dy = p1.y - p2.y;
    return sqrt(dx * dx + dy * dy);
  },
  closest: function(LUT, point3) {
    let mdist = pow(2, 63), mpos, d;
    LUT.forEach(function(p, idx) {
      d = utils.dist(point3, p);
      if (d < mdist) {
        mdist = d;
        mpos = idx;
      }
    });
    return { mdist, mpos };
  },
  abcratio: function(t2, n) {
    if (n !== 2 && n !== 3) {
      return false;
    }
    if (typeof t2 === "undefined") {
      t2 = 0.5;
    } else if (t2 === 0 || t2 === 1) {
      return t2;
    }
    const bottom = pow(t2, n) + pow(1 - t2, n), top = bottom - 1;
    return abs(top / bottom);
  },
  projectionratio: function(t2, n) {
    if (n !== 2 && n !== 3) {
      return false;
    }
    if (typeof t2 === "undefined") {
      t2 = 0.5;
    } else if (t2 === 0 || t2 === 1) {
      return t2;
    }
    const top = pow(1 - t2, n), bottom = pow(t2, n) + top;
    return top / bottom;
  },
  lli8: function(x1, y1, x2, y2, x3, y3, x4, y4) {
    const nx = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4), ny = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4), d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (d == 0) {
      return false;
    }
    return { x: nx / d, y: ny / d };
  },
  lli4: function(p1, p2, p3, p4) {
    const x1 = p1.x, y1 = p1.y, x2 = p2.x, y2 = p2.y, x3 = p3.x, y3 = p3.y, x4 = p4.x, y4 = p4.y;
    return utils.lli8(x1, y1, x2, y2, x3, y3, x4, y4);
  },
  lli: function(v1, v2) {
    return utils.lli4(v1, v1.c, v2, v2.c);
  },
  makeline: function(p1, p2) {
    return new Bezier(p1.x, p1.y, (p1.x + p2.x) / 2, (p1.y + p2.y) / 2, p2.x, p2.y);
  },
  findbbox: function(sections) {
    let mx = nMax, my = nMax, MX = nMin, MY = nMin;
    sections.forEach(function(s) {
      const bbox7 = s.bbox();
      if (mx > bbox7.x.min)
        mx = bbox7.x.min;
      if (my > bbox7.y.min)
        my = bbox7.y.min;
      if (MX < bbox7.x.max)
        MX = bbox7.x.max;
      if (MY < bbox7.y.max)
        MY = bbox7.y.max;
    });
    return {
      x: { min: mx, mid: (mx + MX) / 2, max: MX, size: MX - mx },
      y: { min: my, mid: (my + MY) / 2, max: MY, size: MY - my }
    };
  },
  shapeintersections: function(s1, bbox1, s2, bbox22, curveIntersectionThreshold) {
    if (!utils.bboxoverlap(bbox1, bbox22))
      return [];
    const intersections2 = [];
    const a1 = [s1.startcap, s1.forward, s1.back, s1.endcap];
    const a2 = [s2.startcap, s2.forward, s2.back, s2.endcap];
    a1.forEach(function(l1) {
      if (l1.virtual)
        return;
      a2.forEach(function(l2) {
        if (l2.virtual)
          return;
        const iss = l1.intersects(l2, curveIntersectionThreshold);
        if (iss.length > 0) {
          iss.c1 = l1;
          iss.c2 = l2;
          iss.s1 = s1;
          iss.s2 = s2;
          intersections2.push(iss);
        }
      });
    });
    return intersections2;
  },
  makeshape: function(forward, back, curveIntersectionThreshold) {
    const bpl = back.points.length;
    const fpl = forward.points.length;
    const start = utils.makeline(back.points[bpl - 1], forward.points[0]);
    const end = utils.makeline(forward.points[fpl - 1], back.points[0]);
    const shape = {
      startcap: start,
      forward,
      back,
      endcap: end,
      bbox: utils.findbbox([start, forward, back, end])
    };
    shape.intersections = function(s2) {
      return utils.shapeintersections(shape, shape.bbox, s2, s2.bbox, curveIntersectionThreshold);
    };
    return shape;
  },
  getminmax: function(curve, d, list) {
    if (!list)
      return { min: 0, max: 0 };
    let min2 = nMax, max2 = nMin, t2, c;
    if (list.indexOf(0) === -1) {
      list = [0].concat(list);
    }
    if (list.indexOf(1) === -1) {
      list.push(1);
    }
    for (let i = 0, len = list.length; i < len; i++) {
      t2 = list[i];
      c = curve.get(t2);
      if (c[d] < min2) {
        min2 = c[d];
      }
      if (c[d] > max2) {
        max2 = c[d];
      }
    }
    return { min: min2, mid: (min2 + max2) / 2, max: max2, size: max2 - min2 };
  },
  align: function(points, line) {
    const tx = line.p1.x, ty = line.p1.y, a = -atan2(line.p2.y - ty, line.p2.x - tx), d = function(v) {
      return {
        x: (v.x - tx) * cos(a) - (v.y - ty) * sin(a),
        y: (v.x - tx) * sin(a) + (v.y - ty) * cos(a)
      };
    };
    return points.map(d);
  },
  roots: function(points, line) {
    line = line || { p1: { x: 0, y: 0 }, p2: { x: 1, y: 0 } };
    const order = points.length - 1;
    const aligned = utils.align(points, line);
    const reduce2 = function(t2) {
      return 0 <= t2 && t2 <= 1;
    };
    if (order === 2) {
      const a2 = aligned[0].y, b2 = aligned[1].y, c2 = aligned[2].y, d2 = a2 - 2 * b2 + c2;
      if (d2 !== 0) {
        const m1 = -sqrt(b2 * b2 - a2 * c2), m2 = -a2 + b2, v12 = -(m1 + m2) / d2, v2 = -(-m1 + m2) / d2;
        return [v12, v2].filter(reduce2);
      } else if (b2 !== c2 && d2 === 0) {
        return [(2 * b2 - c2) / (2 * b2 - 2 * c2)].filter(reduce2);
      }
      return [];
    }
    const pa = aligned[0].y, pb = aligned[1].y, pc = aligned[2].y, pd = aligned[3].y;
    let d = -pa + 3 * pb - 3 * pc + pd, a = 3 * pa - 6 * pb + 3 * pc, b = -3 * pa + 3 * pb, c = pa;
    if (utils.approximately(d, 0)) {
      if (utils.approximately(a, 0)) {
        if (utils.approximately(b, 0)) {
          return [];
        }
        return [-c / b].filter(reduce2);
      }
      const q3 = sqrt(b * b - 4 * a * c), a2 = 2 * a;
      return [(q3 - b) / a2, (-b - q3) / a2].filter(reduce2);
    }
    a /= d;
    b /= d;
    c /= d;
    const p = (3 * b - a * a) / 3, p3 = p / 3, q = (2 * a * a * a - 9 * a * b + 27 * c) / 27, q2 = q / 2, discriminant = q2 * q2 + p3 * p3 * p3;
    let u1, v1, x1, x2, x3;
    if (discriminant < 0) {
      const mp3 = -p / 3, mp33 = mp3 * mp3 * mp3, r = sqrt(mp33), t2 = -q / (2 * r), cosphi = t2 < -1 ? -1 : t2 > 1 ? 1 : t2, phi = acos(cosphi), crtr = crt(r), t1 = 2 * crtr;
      x1 = t1 * cos(phi / 3) - a / 3;
      x2 = t1 * cos((phi + tau) / 3) - a / 3;
      x3 = t1 * cos((phi + 2 * tau) / 3) - a / 3;
      return [x1, x2, x3].filter(reduce2);
    } else if (discriminant === 0) {
      u1 = q2 < 0 ? crt(-q2) : -crt(q2);
      x1 = 2 * u1 - a / 3;
      x2 = -u1 - a / 3;
      return [x1, x2].filter(reduce2);
    } else {
      const sd = sqrt(discriminant);
      u1 = crt(-q2 + sd);
      v1 = crt(q2 + sd);
      return [u1 - v1 - a / 3].filter(reduce2);
    }
  },
  droots: function(p) {
    if (p.length === 3) {
      const a = p[0], b = p[1], c = p[2], d = a - 2 * b + c;
      if (d !== 0) {
        const m1 = -sqrt(b * b - a * c), m2 = -a + b, v1 = -(m1 + m2) / d, v2 = -(-m1 + m2) / d;
        return [v1, v2];
      } else if (b !== c && d === 0) {
        return [(2 * b - c) / (2 * (b - c))];
      }
      return [];
    }
    if (p.length === 2) {
      const a = p[0], b = p[1];
      if (a !== b) {
        return [a / (a - b)];
      }
      return [];
    }
    return [];
  },
  curvature: function(t2, d1, d2, _3d, kOnly) {
    let num, dnm, adk, dk, k = 0, r = 0;
    const d = utils.compute(t2, d1);
    const dd = utils.compute(t2, d2);
    const qdsum = d.x * d.x + d.y * d.y;
    if (_3d) {
      num = sqrt(pow(d.y * dd.z - dd.y * d.z, 2) + pow(d.z * dd.x - dd.z * d.x, 2) + pow(d.x * dd.y - dd.x * d.y, 2));
      dnm = pow(qdsum + d.z * d.z, 3 / 2);
    } else {
      num = d.x * dd.y - d.y * dd.x;
      dnm = pow(qdsum, 3 / 2);
    }
    if (num === 0 || dnm === 0) {
      return { k: 0, r: 0 };
    }
    k = num / dnm;
    r = dnm / num;
    if (!kOnly) {
      const pk = utils.curvature(t2 - 1e-3, d1, d2, _3d, true).k;
      const nk = utils.curvature(t2 + 1e-3, d1, d2, _3d, true).k;
      dk = (nk - k + (k - pk)) / 2;
      adk = (abs(nk - k) + abs(k - pk)) / 2;
    }
    return { k, r, dk, adk };
  },
  inflections: function(points) {
    if (points.length < 4)
      return [];
    const p = utils.align(points, { p1: points[0], p2: points.slice(-1)[0] }), a = p[2].x * p[1].y, b = p[3].x * p[1].y, c = p[1].x * p[2].y, d = p[3].x * p[2].y, v1 = 18 * (-3 * a + 2 * b + 3 * c - d), v2 = 18 * (3 * a - b - 3 * c), v3 = 18 * (c - a);
    if (utils.approximately(v1, 0)) {
      if (!utils.approximately(v2, 0)) {
        let t2 = -v3 / v2;
        if (0 <= t2 && t2 <= 1)
          return [t2];
      }
      return [];
    }
    const trm = v2 * v2 - 4 * v1 * v3, sq = Math.sqrt(trm), d2 = 2 * v1;
    if (utils.approximately(d2, 0))
      return [];
    return [(sq - v2) / d2, -(v2 + sq) / d2].filter(function(r) {
      return 0 <= r && r <= 1;
    });
  },
  bboxoverlap: function(b1, b2) {
    const dims = ["x", "y"], len = dims.length;
    for (let i = 0, dim, l, t2, d; i < len; i++) {
      dim = dims[i];
      l = b1[dim].mid;
      t2 = b2[dim].mid;
      d = (b1[dim].size + b2[dim].size) / 2;
      if (abs(l - t2) >= d)
        return false;
    }
    return true;
  },
  expandbox: function(bbox7, _bbox) {
    if (_bbox.x.min < bbox7.x.min) {
      bbox7.x.min = _bbox.x.min;
    }
    if (_bbox.y.min < bbox7.y.min) {
      bbox7.y.min = _bbox.y.min;
    }
    if (_bbox.z && _bbox.z.min < bbox7.z.min) {
      bbox7.z.min = _bbox.z.min;
    }
    if (_bbox.x.max > bbox7.x.max) {
      bbox7.x.max = _bbox.x.max;
    }
    if (_bbox.y.max > bbox7.y.max) {
      bbox7.y.max = _bbox.y.max;
    }
    if (_bbox.z && _bbox.z.max > bbox7.z.max) {
      bbox7.z.max = _bbox.z.max;
    }
    bbox7.x.mid = (bbox7.x.min + bbox7.x.max) / 2;
    bbox7.y.mid = (bbox7.y.min + bbox7.y.max) / 2;
    if (bbox7.z) {
      bbox7.z.mid = (bbox7.z.min + bbox7.z.max) / 2;
    }
    bbox7.x.size = bbox7.x.max - bbox7.x.min;
    bbox7.y.size = bbox7.y.max - bbox7.y.min;
    if (bbox7.z) {
      bbox7.z.size = bbox7.z.max - bbox7.z.min;
    }
  },
  pairiteration: function(c1, c2, curveIntersectionThreshold) {
    const c1b = c1.bbox(), c2b = c2.bbox(), r = 1e5, threshold = curveIntersectionThreshold || 0.5;
    if (c1b.x.size + c1b.y.size < threshold && c2b.x.size + c2b.y.size < threshold) {
      return [
        (r * (c1._t1 + c1._t2) / 2 | 0) / r + "/" + (r * (c2._t1 + c2._t2) / 2 | 0) / r
      ];
    }
    let cc1 = c1.split(0.5), cc2 = c2.split(0.5), pairs = [
      { left: cc1.left, right: cc2.left },
      { left: cc1.left, right: cc2.right },
      { left: cc1.right, right: cc2.right },
      { left: cc1.right, right: cc2.left }
    ];
    pairs = pairs.filter(function(pair) {
      return utils.bboxoverlap(pair.left.bbox(), pair.right.bbox());
    });
    let results = [];
    if (pairs.length === 0)
      return results;
    pairs.forEach(function(pair) {
      results = results.concat(utils.pairiteration(pair.left, pair.right, threshold));
    });
    results = results.filter(function(v, i) {
      return results.indexOf(v) === i;
    });
    return results;
  },
  getccenter: function(p1, p2, p3) {
    const dx1 = p2.x - p1.x, dy1 = p2.y - p1.y, dx2 = p3.x - p2.x, dy2 = p3.y - p2.y, dx1p = dx1 * cos(quart) - dy1 * sin(quart), dy1p = dx1 * sin(quart) + dy1 * cos(quart), dx2p = dx2 * cos(quart) - dy2 * sin(quart), dy2p = dx2 * sin(quart) + dy2 * cos(quart), mx1 = (p1.x + p2.x) / 2, my1 = (p1.y + p2.y) / 2, mx2 = (p2.x + p3.x) / 2, my2 = (p2.y + p3.y) / 2, mx1n = mx1 + dx1p, my1n = my1 + dy1p, mx2n = mx2 + dx2p, my2n = my2 + dy2p, arc = utils.lli8(mx1, my1, mx1n, my1n, mx2, my2, mx2n, my2n), r = utils.dist(arc, p1);
    let s = atan2(p1.y - arc.y, p1.x - arc.x), m = atan2(p2.y - arc.y, p2.x - arc.x), e = atan2(p3.y - arc.y, p3.x - arc.x), _;
    if (s < e) {
      if (s > m || m > e) {
        s += tau;
      }
      if (s > e) {
        _ = e;
        e = s;
        s = _;
      }
    } else {
      if (e < m && m < s) {
        _ = e;
        e = s;
        s = _;
      } else {
        e += tau;
      }
    }
    arc.s = s;
    arc.e = e;
    arc.r = r;
    return arc;
  },
  numberSort: function(a, b) {
    return a - b;
  }
};

// node_modules/bezier-js/src/poly-bezier.js
var PolyBezier = class {
  constructor(curves) {
    this.curves = [];
    this._3d = false;
    if (!!curves) {
      this.curves = curves;
      this._3d = this.curves[0]._3d;
    }
  }
  valueOf() {
    return this.toString();
  }
  toString() {
    return "[" + this.curves.map(function(curve) {
      return utils.pointsToString(curve.points);
    }).join(", ") + "]";
  }
  addCurve(curve) {
    this.curves.push(curve);
    this._3d = this._3d || curve._3d;
  }
  length() {
    return this.curves.map(function(v) {
      return v.length();
    }).reduce(function(a, b) {
      return a + b;
    });
  }
  curve(idx) {
    return this.curves[idx];
  }
  bbox() {
    const c = this.curves;
    var bbox7 = c[0].bbox();
    for (var i = 1; i < c.length; i++) {
      utils.expandbox(bbox7, c[i].bbox());
    }
    return bbox7;
  }
  offset(d) {
    const offset2 = [];
    this.curves.forEach(function(v) {
      offset2.push(...v.offset(d));
    });
    return new PolyBezier(offset2);
  }
};

// node_modules/bezier-js/src/bezier.js
var { abs: abs2, min, max, cos: cos2, sin: sin2, acos: acos2, sqrt: sqrt2 } = Math;
var pi2 = Math.PI;
var Bezier = class {
  constructor(coords) {
    let args = coords && coords.forEach ? coords : Array.from(arguments).slice();
    let coordlen = false;
    if (typeof args[0] === "object") {
      coordlen = args.length;
      const newargs = [];
      args.forEach(function(point4) {
        ["x", "y", "z"].forEach(function(d) {
          if (typeof point4[d] !== "undefined") {
            newargs.push(point4[d]);
          }
        });
      });
      args = newargs;
    }
    let higher = false;
    const len = args.length;
    if (coordlen) {
      if (coordlen > 4) {
        if (arguments.length !== 1) {
          throw new Error("Only new Bezier(point[]) is accepted for 4th and higher order curves");
        }
        higher = true;
      }
    } else {
      if (len !== 6 && len !== 8 && len !== 9 && len !== 12) {
        if (arguments.length !== 1) {
          throw new Error("Only new Bezier(point[]) is accepted for 4th and higher order curves");
        }
      }
    }
    const _3d = this._3d = !higher && (len === 9 || len === 12) || coords && coords[0] && typeof coords[0].z !== "undefined";
    const points = this.points = [];
    for (let idx = 0, step = _3d ? 3 : 2; idx < len; idx += step) {
      var point3 = {
        x: args[idx],
        y: args[idx + 1]
      };
      if (_3d) {
        point3.z = args[idx + 2];
      }
      points.push(point3);
    }
    const order = this.order = points.length - 1;
    const dims = this.dims = ["x", "y"];
    if (_3d)
      dims.push("z");
    this.dimlen = dims.length;
    const aligned = utils.align(points, { p1: points[0], p2: points[order] });
    const baselength = utils.dist(points[0], points[order]);
    this._linear = aligned.reduce((t2, p) => t2 + abs2(p.y), 0) < baselength / 50;
    this._lut = [];
    this._t1 = 0;
    this._t2 = 1;
    this.update();
  }
  static quadraticFromPoints(p1, p2, p3, t2) {
    if (typeof t2 === "undefined") {
      t2 = 0.5;
    }
    if (t2 === 0) {
      return new Bezier(p2, p2, p3);
    }
    if (t2 === 1) {
      return new Bezier(p1, p2, p2);
    }
    const abc = Bezier.getABC(2, p1, p2, p3, t2);
    return new Bezier(p1, abc.A, p3);
  }
  static cubicFromPoints(S, B, E, t2, d1) {
    if (typeof t2 === "undefined") {
      t2 = 0.5;
    }
    const abc = Bezier.getABC(3, S, B, E, t2);
    if (typeof d1 === "undefined") {
      d1 = utils.dist(B, abc.C);
    }
    const d2 = d1 * (1 - t2) / t2;
    const selen = utils.dist(S, E), lx = (E.x - S.x) / selen, ly = (E.y - S.y) / selen, bx1 = d1 * lx, by1 = d1 * ly, bx2 = d2 * lx, by2 = d2 * ly;
    const e1 = { x: B.x - bx1, y: B.y - by1 }, e2 = { x: B.x + bx2, y: B.y + by2 }, A = abc.A, v1 = { x: A.x + (e1.x - A.x) / (1 - t2), y: A.y + (e1.y - A.y) / (1 - t2) }, v2 = { x: A.x + (e2.x - A.x) / t2, y: A.y + (e2.y - A.y) / t2 }, nc1 = { x: S.x + (v1.x - S.x) / t2, y: S.y + (v1.y - S.y) / t2 }, nc2 = {
      x: E.x + (v2.x - E.x) / (1 - t2),
      y: E.y + (v2.y - E.y) / (1 - t2)
    };
    return new Bezier(S, nc1, nc2, E);
  }
  static getUtils() {
    return utils;
  }
  getUtils() {
    return Bezier.getUtils();
  }
  static get PolyBezier() {
    return PolyBezier;
  }
  valueOf() {
    return this.toString();
  }
  toString() {
    return utils.pointsToString(this.points);
  }
  toSVG() {
    if (this._3d)
      return false;
    const p = this.points, x = p[0].x, y = p[0].y, s = ["M", x, y, this.order === 2 ? "Q" : "C"];
    for (let i = 1, last = p.length; i < last; i++) {
      s.push(p[i].x);
      s.push(p[i].y);
    }
    return s.join(" ");
  }
  setRatios(ratios) {
    if (ratios.length !== this.points.length) {
      throw new Error("incorrect number of ratio values");
    }
    this.ratios = ratios;
    this._lut = [];
  }
  verify() {
    const print = this.coordDigest();
    if (print !== this._print) {
      this._print = print;
      this.update();
    }
  }
  coordDigest() {
    return this.points.map(function(c, pos) {
      return "" + pos + c.x + c.y + (c.z ? c.z : 0);
    }).join("");
  }
  update() {
    this._lut = [];
    this.dpoints = utils.derive(this.points, this._3d);
    this.computedirection();
  }
  computedirection() {
    const points = this.points;
    const angle = utils.angle(points[0], points[this.order], points[1]);
    this.clockwise = angle > 0;
  }
  length() {
    return utils.length(this.derivative.bind(this));
  }
  static getABC(order = 2, S, B, E, t2 = 0.5) {
    const u = utils.projectionratio(t2, order), um = 1 - u, C = {
      x: u * S.x + um * E.x,
      y: u * S.y + um * E.y
    }, s = utils.abcratio(t2, order), A = {
      x: B.x + (B.x - C.x) / s,
      y: B.y + (B.y - C.y) / s
    };
    return { A, B, C, S, E };
  }
  getABC(t2, B) {
    B = B || this.get(t2);
    let S = this.points[0];
    let E = this.points[this.order];
    return Bezier.getABC(this.order, S, B, E, t2);
  }
  getLUT(steps) {
    this.verify();
    steps = steps || 100;
    if (this._lut.length === steps) {
      return this._lut;
    }
    this._lut = [];
    steps++;
    this._lut = [];
    for (let i = 0, p, t2; i < steps; i++) {
      t2 = i / (steps - 1);
      p = this.compute(t2);
      p.t = t2;
      this._lut.push(p);
    }
    return this._lut;
  }
  on(point3, error) {
    error = error || 5;
    const lut = this.getLUT(), hits = [];
    for (let i = 0, c, t2 = 0; i < lut.length; i++) {
      c = lut[i];
      if (utils.dist(c, point3) < error) {
        hits.push(c);
        t2 += i / lut.length;
      }
    }
    if (!hits.length)
      return false;
    return t /= hits.length;
  }
  project(point3) {
    const LUT = this.getLUT(), l = LUT.length - 1, closest = utils.closest(LUT, point3), mpos = closest.mpos, t1 = (mpos - 1) / l, t2 = (mpos + 1) / l, step = 0.1 / l;
    let mdist = closest.mdist, t3 = t1, ft = t3, p;
    mdist += 1;
    for (let d; t3 < t2 + step; t3 += step) {
      p = this.compute(t3);
      d = utils.dist(point3, p);
      if (d < mdist) {
        mdist = d;
        ft = t3;
      }
    }
    ft = ft < 0 ? 0 : ft > 1 ? 1 : ft;
    p = this.compute(ft);
    p.t = ft;
    p.d = mdist;
    return p;
  }
  get(t2) {
    return this.compute(t2);
  }
  point(idx) {
    return this.points[idx];
  }
  compute(t2) {
    if (this.ratios) {
      return utils.computeWithRatios(t2, this.points, this.ratios, this._3d);
    }
    return utils.compute(t2, this.points, this._3d, this.ratios);
  }
  raise() {
    const p = this.points, np = [p[0]], k = p.length;
    for (let i = 1, pi3, pim; i < k; i++) {
      pi3 = p[i];
      pim = p[i - 1];
      np[i] = {
        x: (k - i) / k * pi3.x + i / k * pim.x,
        y: (k - i) / k * pi3.y + i / k * pim.y
      };
    }
    np[k] = p[k - 1];
    return new Bezier(np);
  }
  derivative(t2) {
    return utils.compute(t2, this.dpoints[0], this._3d);
  }
  dderivative(t2) {
    return utils.compute(t2, this.dpoints[1], this._3d);
  }
  align() {
    let p = this.points;
    return new Bezier(utils.align(p, { p1: p[0], p2: p[p.length - 1] }));
  }
  curvature(t2) {
    return utils.curvature(t2, this.dpoints[0], this.dpoints[1], this._3d);
  }
  inflections() {
    return utils.inflections(this.points);
  }
  normal(t2) {
    return this._3d ? this.__normal3(t2) : this.__normal2(t2);
  }
  __normal2(t2) {
    const d = this.derivative(t2);
    const q = sqrt2(d.x * d.x + d.y * d.y);
    return { x: -d.y / q, y: d.x / q };
  }
  __normal3(t2) {
    const r1 = this.derivative(t2), r2 = this.derivative(t2 + 0.01), q1 = sqrt2(r1.x * r1.x + r1.y * r1.y + r1.z * r1.z), q2 = sqrt2(r2.x * r2.x + r2.y * r2.y + r2.z * r2.z);
    r1.x /= q1;
    r1.y /= q1;
    r1.z /= q1;
    r2.x /= q2;
    r2.y /= q2;
    r2.z /= q2;
    const c = {
      x: r2.y * r1.z - r2.z * r1.y,
      y: r2.z * r1.x - r2.x * r1.z,
      z: r2.x * r1.y - r2.y * r1.x
    };
    const m = sqrt2(c.x * c.x + c.y * c.y + c.z * c.z);
    c.x /= m;
    c.y /= m;
    c.z /= m;
    const R = [
      c.x * c.x,
      c.x * c.y - c.z,
      c.x * c.z + c.y,
      c.x * c.y + c.z,
      c.y * c.y,
      c.y * c.z - c.x,
      c.x * c.z - c.y,
      c.y * c.z + c.x,
      c.z * c.z
    ];
    const n = {
      x: R[0] * r1.x + R[1] * r1.y + R[2] * r1.z,
      y: R[3] * r1.x + R[4] * r1.y + R[5] * r1.z,
      z: R[6] * r1.x + R[7] * r1.y + R[8] * r1.z
    };
    return n;
  }
  hull(t2) {
    let p = this.points, _p = [], q = [], idx = 0;
    q[idx++] = p[0];
    q[idx++] = p[1];
    q[idx++] = p[2];
    if (this.order === 3) {
      q[idx++] = p[3];
    }
    while (p.length > 1) {
      _p = [];
      for (let i = 0, pt, l = p.length - 1; i < l; i++) {
        pt = utils.lerp(t2, p[i], p[i + 1]);
        q[idx++] = pt;
        _p.push(pt);
      }
      p = _p;
    }
    return q;
  }
  split(t1, t2) {
    if (t1 === 0 && !!t2) {
      return this.split(t2).left;
    }
    if (t2 === 1) {
      return this.split(t1).right;
    }
    const q = this.hull(t1);
    const result = {
      left: this.order === 2 ? new Bezier([q[0], q[3], q[5]]) : new Bezier([q[0], q[4], q[7], q[9]]),
      right: this.order === 2 ? new Bezier([q[5], q[4], q[2]]) : new Bezier([q[9], q[8], q[6], q[3]]),
      span: q
    };
    result.left._t1 = utils.map(0, 0, 1, this._t1, this._t2);
    result.left._t2 = utils.map(t1, 0, 1, this._t1, this._t2);
    result.right._t1 = utils.map(t1, 0, 1, this._t1, this._t2);
    result.right._t2 = utils.map(1, 0, 1, this._t1, this._t2);
    if (!t2) {
      return result;
    }
    t2 = utils.map(t2, t1, 1, 0, 1);
    return result.right.split(t2).left;
  }
  extrema() {
    const result = {};
    let roots = [];
    this.dims.forEach(function(dim) {
      let mfn = function(v) {
        return v[dim];
      };
      let p = this.dpoints[0].map(mfn);
      result[dim] = utils.droots(p);
      if (this.order === 3) {
        p = this.dpoints[1].map(mfn);
        result[dim] = result[dim].concat(utils.droots(p));
      }
      result[dim] = result[dim].filter(function(t2) {
        return t2 >= 0 && t2 <= 1;
      });
      roots = roots.concat(result[dim].sort(utils.numberSort));
    }.bind(this));
    result.values = roots.sort(utils.numberSort).filter(function(v, idx) {
      return roots.indexOf(v) === idx;
    });
    return result;
  }
  bbox() {
    const extrema = this.extrema(), result = {};
    this.dims.forEach(function(d) {
      result[d] = utils.getminmax(this, d, extrema[d]);
    }.bind(this));
    return result;
  }
  overlaps(curve) {
    const lbbox = this.bbox(), tbbox = curve.bbox();
    return utils.bboxoverlap(lbbox, tbbox);
  }
  offset(t2, d) {
    if (typeof d !== "undefined") {
      const c = this.get(t2), n = this.normal(t2);
      const ret = {
        c,
        n,
        x: c.x + n.x * d,
        y: c.y + n.y * d
      };
      if (this._3d) {
        ret.z = c.z + n.z * d;
      }
      return ret;
    }
    if (this._linear) {
      const nv = this.normal(0), coords = this.points.map(function(p) {
        const ret = {
          x: p.x + t2 * nv.x,
          y: p.y + t2 * nv.y
        };
        if (p.z && nv.z) {
          ret.z = p.z + t2 * nv.z;
        }
        return ret;
      });
      return [new Bezier(coords)];
    }
    return this.reduce().map(function(s) {
      if (s._linear) {
        return s.offset(t2)[0];
      }
      return s.scale(t2);
    });
  }
  simple() {
    if (this.order === 3) {
      const a1 = utils.angle(this.points[0], this.points[3], this.points[1]);
      const a2 = utils.angle(this.points[0], this.points[3], this.points[2]);
      if (a1 > 0 && a2 < 0 || a1 < 0 && a2 > 0)
        return false;
    }
    const n1 = this.normal(0);
    const n2 = this.normal(1);
    let s = n1.x * n2.x + n1.y * n2.y;
    if (this._3d) {
      s += n1.z * n2.z;
    }
    return abs2(acos2(s)) < pi2 / 3;
  }
  reduce() {
    let i, t1 = 0, t2 = 0, step = 0.01, segment, pass1 = [], pass2 = [];
    let extrema = this.extrema().values;
    if (extrema.indexOf(0) === -1) {
      extrema = [0].concat(extrema);
    }
    if (extrema.indexOf(1) === -1) {
      extrema.push(1);
    }
    for (t1 = extrema[0], i = 1; i < extrema.length; i++) {
      t2 = extrema[i];
      segment = this.split(t1, t2);
      segment._t1 = t1;
      segment._t2 = t2;
      pass1.push(segment);
      t1 = t2;
    }
    pass1.forEach(function(p1) {
      t1 = 0;
      t2 = 0;
      while (t2 <= 1) {
        for (t2 = t1 + step; t2 <= 1 + step; t2 += step) {
          segment = p1.split(t1, t2);
          if (!segment.simple()) {
            t2 -= step;
            if (abs2(t1 - t2) < step) {
              return [];
            }
            segment = p1.split(t1, t2);
            segment._t1 = utils.map(t1, 0, 1, p1._t1, p1._t2);
            segment._t2 = utils.map(t2, 0, 1, p1._t1, p1._t2);
            pass2.push(segment);
            t1 = t2;
            break;
          }
        }
      }
      if (t1 < 1) {
        segment = p1.split(t1, 1);
        segment._t1 = utils.map(t1, 0, 1, p1._t1, p1._t2);
        segment._t2 = p1._t2;
        pass2.push(segment);
      }
    });
    return pass2;
  }
  translate(v, d1, d2) {
    d2 = typeof d2 === "number" ? d2 : d1;
    const o = this.order;
    let d = this.points.map((_, i) => (1 - i / o) * d1 + i / o * d2);
    return new Bezier(this.points.map((p, i) => ({
      x: p.x + v.x * d[i],
      y: p.y + v.y * d[i]
    })));
  }
  scale(d) {
    const order = this.order;
    let distanceFn = false;
    if (typeof d === "function") {
      distanceFn = d;
    }
    if (distanceFn && order === 2) {
      return this.raise().scale(distanceFn);
    }
    const clockwise = this.clockwise;
    const points = this.points;
    if (this._linear) {
      return this.translate(this.normal(0), distanceFn ? distanceFn(0) : d, distanceFn ? distanceFn(1) : d);
    }
    const r1 = distanceFn ? distanceFn(0) : d;
    const r2 = distanceFn ? distanceFn(1) : d;
    const v = [this.offset(0, 10), this.offset(1, 10)];
    const np = [];
    const o = utils.lli4(v[0], v[0].c, v[1], v[1].c);
    if (!o) {
      throw new Error("cannot scale this curve. Try reducing it first.");
    }
    [0, 1].forEach(function(t2) {
      const p = np[t2 * order] = utils.copy(points[t2 * order]);
      p.x += (t2 ? r2 : r1) * v[t2].n.x;
      p.y += (t2 ? r2 : r1) * v[t2].n.y;
    });
    if (!distanceFn) {
      [0, 1].forEach((t2) => {
        if (order === 2 && !!t2)
          return;
        const p = np[t2 * order];
        const d2 = this.derivative(t2);
        const p2 = { x: p.x + d2.x, y: p.y + d2.y };
        np[t2 + 1] = utils.lli4(p, p2, o, points[t2 + 1]);
      });
      return new Bezier(np);
    }
    [0, 1].forEach(function(t2) {
      if (order === 2 && !!t2)
        return;
      var p = points[t2 + 1];
      var ov = {
        x: p.x - o.x,
        y: p.y - o.y
      };
      var rc = distanceFn ? distanceFn((t2 + 1) / order) : d;
      if (distanceFn && !clockwise)
        rc = -rc;
      var m = sqrt2(ov.x * ov.x + ov.y * ov.y);
      ov.x /= m;
      ov.y /= m;
      np[t2 + 1] = {
        x: p.x + rc * ov.x,
        y: p.y + rc * ov.y
      };
    });
    return new Bezier(np);
  }
  outline(d1, d2, d3, d4) {
    d2 = d2 === void 0 ? d1 : d2;
    if (this._linear) {
      const n = this.normal(0);
      const start = this.points[0];
      const end = this.points[this.points.length - 1];
      let s, mid, e;
      if (d3 === void 0) {
        d3 = d1;
        d4 = d2;
      }
      s = { x: start.x + n.x * d1, y: start.y + n.y * d1 };
      e = { x: end.x + n.x * d3, y: end.y + n.y * d3 };
      mid = { x: (s.x + e.x) / 2, y: (s.y + e.y) / 2 };
      const fline = [s, mid, e];
      s = { x: start.x - n.x * d2, y: start.y - n.y * d2 };
      e = { x: end.x - n.x * d4, y: end.y - n.y * d4 };
      mid = { x: (s.x + e.x) / 2, y: (s.y + e.y) / 2 };
      const bline = [e, mid, s];
      const ls2 = utils.makeline(bline[2], fline[0]);
      const le2 = utils.makeline(fline[2], bline[0]);
      const segments2 = [ls2, new Bezier(fline), le2, new Bezier(bline)];
      return new PolyBezier(segments2);
    }
    const reduced = this.reduce(), len = reduced.length, fcurves = [];
    let bcurves = [], p, alen = 0, tlen = this.length();
    const graduated = typeof d3 !== "undefined" && typeof d4 !== "undefined";
    function linearDistanceFunction(s, e, tlen2, alen2, slen) {
      return function(v) {
        const f1 = alen2 / tlen2, f2 = (alen2 + slen) / tlen2, d = e - s;
        return utils.map(v, 0, 1, s + f1 * d, s + f2 * d);
      };
    }
    reduced.forEach(function(segment) {
      const slen = segment.length();
      if (graduated) {
        fcurves.push(segment.scale(linearDistanceFunction(d1, d3, tlen, alen, slen)));
        bcurves.push(segment.scale(linearDistanceFunction(-d2, -d4, tlen, alen, slen)));
      } else {
        fcurves.push(segment.scale(d1));
        bcurves.push(segment.scale(-d2));
      }
      alen += slen;
    });
    bcurves = bcurves.map(function(s) {
      p = s.points;
      if (p[3]) {
        s.points = [p[3], p[2], p[1], p[0]];
      } else {
        s.points = [p[2], p[1], p[0]];
      }
      return s;
    }).reverse();
    const fs = fcurves[0].points[0], fe = fcurves[len - 1].points[fcurves[len - 1].points.length - 1], bs = bcurves[len - 1].points[bcurves[len - 1].points.length - 1], be = bcurves[0].points[0], ls = utils.makeline(bs, fs), le = utils.makeline(fe, be), segments = [ls].concat(fcurves).concat([le]).concat(bcurves);
    return new PolyBezier(segments);
  }
  outlineshapes(d1, d2, curveIntersectionThreshold) {
    d2 = d2 || d1;
    const outline = this.outline(d1, d2).curves;
    const shapes = [];
    for (let i = 1, len = outline.length; i < len / 2; i++) {
      const shape = utils.makeshape(outline[i], outline[len - i], curveIntersectionThreshold);
      shape.startcap.virtual = i > 1;
      shape.endcap.virtual = i < len / 2 - 1;
      shapes.push(shape);
    }
    return shapes;
  }
  intersects(curve, curveIntersectionThreshold) {
    if (!curve)
      return this.selfintersects(curveIntersectionThreshold);
    if (curve.p1 && curve.p2) {
      return this.lineIntersects(curve);
    }
    if (curve instanceof Bezier) {
      curve = curve.reduce();
    }
    return this.curveintersects(this.reduce(), curve, curveIntersectionThreshold);
  }
  lineIntersects(line) {
    const mx = min(line.p1.x, line.p2.x), my = min(line.p1.y, line.p2.y), MX = max(line.p1.x, line.p2.x), MY = max(line.p1.y, line.p2.y);
    return utils.roots(this.points, line).filter((t2) => {
      var p = this.get(t2);
      return utils.between(p.x, mx, MX) && utils.between(p.y, my, MY);
    });
  }
  selfintersects(curveIntersectionThreshold) {
    const reduced = this.reduce(), len = reduced.length - 2, results = [];
    for (let i = 0, result, left, right; i < len; i++) {
      left = reduced.slice(i, i + 1);
      right = reduced.slice(i + 2);
      result = this.curveintersects(left, right, curveIntersectionThreshold);
      results.push(...result);
    }
    return results;
  }
  curveintersects(c1, c2, curveIntersectionThreshold) {
    const pairs = [];
    c1.forEach(function(l) {
      c2.forEach(function(r) {
        if (l.overlaps(r)) {
          pairs.push({ left: l, right: r });
        }
      });
    });
    let intersections2 = [];
    pairs.forEach(function(pair) {
      const result = utils.pairiteration(pair.left, pair.right, curveIntersectionThreshold);
      if (result.length > 0) {
        intersections2 = intersections2.concat(result);
      }
    });
    return intersections2;
  }
  arcs(errorThreshold) {
    errorThreshold = errorThreshold || 0.5;
    return this._iterate(errorThreshold, []);
  }
  _error(pc, np1, s, e) {
    const q = (e - s) / 4, c1 = this.get(s + q), c2 = this.get(e - q), ref = utils.dist(pc, np1), d1 = utils.dist(pc, c1), d2 = utils.dist(pc, c2);
    return abs2(d1 - ref) + abs2(d2 - ref);
  }
  _iterate(errorThreshold, circles) {
    let t_s = 0, t_e = 1, safety;
    do {
      safety = 0;
      t_e = 1;
      let np1 = this.get(t_s), np2, np3, arc, prev_arc;
      let curr_good = false, prev_good = false, done;
      let t_m = t_e, prev_e = 1, step = 0;
      do {
        prev_good = curr_good;
        prev_arc = arc;
        t_m = (t_s + t_e) / 2;
        step++;
        np2 = this.get(t_m);
        np3 = this.get(t_e);
        arc = utils.getccenter(np1, np2, np3);
        arc.interval = {
          start: t_s,
          end: t_e
        };
        let error = this._error(arc, np1, t_s, t_e);
        curr_good = error <= errorThreshold;
        done = prev_good && !curr_good;
        if (!done)
          prev_e = t_e;
        if (curr_good) {
          if (t_e >= 1) {
            arc.interval.end = prev_e = 1;
            prev_arc = arc;
            if (t_e > 1) {
              let d = {
                x: arc.x + arc.r * cos2(arc.e),
                y: arc.y + arc.r * sin2(arc.e)
              };
              arc.e += utils.angle({ x: arc.x, y: arc.y }, d, this.get(1));
            }
            break;
          }
          t_e = t_e + (t_e - t_s) / 2;
        } else {
          t_e = t_m;
        }
      } while (!done && safety++ < 100);
      if (safety >= 100) {
        break;
      }
      prev_arc = prev_arc ? prev_arc : arc;
      circles.push(prev_arc);
      t_s = prev_e;
    } while (t_e < 1);
    return circles;
  }
};

// src/geometry/Bezier.ts
var isQuadraticBezier = (path) => path.quadratic !== void 0;
var isCubicBezier = (path) => path.cubic1 !== void 0 && path.cubic2 !== void 0;
var quadraticBend = (a, b, bend = 0) => quadraticSimple(a, b, bend);
var quadraticSimple = (start, end, bend = 0) => {
  if (isNaN(bend))
    throw Error(`bend is NaN`);
  if (bend < -1 || bend > 1)
    throw Error(`Expects bend range of -1 to 1`);
  const middle = Line_exports.interpolate(0.5, start, end);
  let target = middle;
  if (end.y < start.y) {
    target = bend > 0 ? { x: Math.min(start.x, end.x), y: Math.min(start.y, end.y) } : { x: Math.max(start.x, end.x), y: Math.max(start.y, end.y) };
  } else {
    target = bend > 0 ? { x: Math.max(start.x, end.x), y: Math.min(start.y, end.y) } : { x: Math.min(start.x, end.x), y: Math.max(start.y, end.y) };
  }
  const handle = Line_exports.interpolate(Math.abs(bend), middle, target);
  return quadratic(start, end, handle);
};
var computeQuadraticSimple = (start, end, bend, amt) => {
  const q = quadraticSimple(start, end, bend);
  const bzr = new Bezier(q.a, q.quadratic, q.b);
  return bzr.compute(amt);
};
var quadraticToSvgString = (start, end, handle) => [`M ${start.x} ${start.y} Q ${handle.x} ${handle.y} ${end.x} ${end.y}`];
var toPath3 = (cubicOrQuadratic) => {
  if (isCubicBezier(cubicOrQuadratic)) {
    return cubicToPath(cubicOrQuadratic);
  } else if (isQuadraticBezier(cubicOrQuadratic)) {
    return quadratictoPath(cubicOrQuadratic);
  } else {
    throw new Error(`Unknown bezier type`);
  }
};
var cubic = (start, end, cubic1, cubic2) => ({
  a: Object.freeze(start),
  b: Object.freeze(end),
  cubic1: Object.freeze(cubic1),
  cubic2: Object.freeze(cubic2)
});
var cubicToPath = (cubic2) => {
  const { a, cubic1, cubic2: cubic22, b } = cubic2;
  const bzr = new Bezier(a, cubic1, cubic22, b);
  return Object.freeze({
    ...cubic2,
    length: () => bzr.length(),
    interpolate: (t2) => bzr.compute(t2),
    bbox: () => {
      const { x, y } = bzr.bbox();
      const xSize = x.size;
      const ySize = y.size;
      if (xSize === void 0)
        throw new Error(`x.size not present on calculated bbox`);
      if (ySize === void 0)
        throw new Error(`x.size not present on calculated bbox`);
      return Rect_exports.fromTopLeft({ x: x.min, y: y.min }, xSize, ySize);
    },
    toString: () => bzr.toString(),
    toSvgString: () => [`brrup`],
    kind: `bezier/cubic`
  });
};
var quadratic = (start, end, handle) => ({
  a: Object.freeze(start),
  b: Object.freeze(end),
  quadratic: Object.freeze(handle)
});
var quadratictoPath = (quadraticBezier) => {
  const { a, b, quadratic: quadratic2 } = quadraticBezier;
  const bzr = new Bezier(a, quadratic2, b);
  return Object.freeze({
    ...quadraticBezier,
    length: () => bzr.length(),
    interpolate: (t2) => bzr.compute(t2),
    bbox: () => {
      const { x, y } = bzr.bbox();
      const xSize = x.size;
      const ySize = y.size;
      if (xSize === void 0)
        throw new Error(`x.size not present on calculated bbox`);
      if (ySize === void 0)
        throw new Error(`x.size not present on calculated bbox`);
      return Rect_exports.fromTopLeft({ x: x.min, y: y.min }, xSize, ySize);
    },
    toString: () => bzr.toString(),
    toSvgString: () => quadraticToSvgString(a, b, quadratic2),
    kind: `bezier/quadratic`
  });
};

// src/geometry/Circle.ts
var Circle_exports = {};
__export(Circle_exports, {
  area: () => area,
  bbox: () => bbox4,
  circumference: () => circumference,
  distanceCenter: () => distanceCenter2,
  distanceFromExterior: () => distanceFromExterior,
  interpolate: () => interpolate4,
  intersectionLine: () => intersectionLine,
  intersections: () => intersections,
  isCircle: () => isCircle,
  isCirclePositioned: () => isCirclePositioned,
  isContainedBy: () => isContainedBy,
  isEquals: () => isEquals2,
  isIntersecting: () => isIntersecting,
  isPositioned: () => isPositioned2,
  length: () => length4,
  point: () => point2,
  toPath: () => toPath4,
  toSvg: () => toSvg2
});
var piPi2 = Math.PI * 2;
var isPositioned2 = (p) => p.x !== void 0 && p.y !== void 0;
var isCircle = (p) => p.radius !== void 0;
var isCirclePositioned = (p) => isCircle(p) && isPositioned2(p);
var point2 = (circle, angleRadian2, origin) => {
  if (origin === void 0) {
    if (isPositioned2(circle)) {
      origin = circle;
    } else {
      origin = { x: 0, y: 0 };
    }
  }
  return {
    x: Math.cos(-angleRadian2) * circle.radius + origin.x,
    y: Math.sin(-angleRadian2) * circle.radius + origin.y
  };
};
var guard4 = (circle, paramName = `circle`) => {
  if (isPositioned2(circle)) {
    guard(circle, `circle`);
  }
  if (Number.isNaN(circle.radius))
    throw new Error(`${paramName}.radius is NaN`);
  if (circle.radius <= 0)
    throw new Error(`${paramName}.radius must be greater than zero`);
};
var guardPositioned = (circle, paramName = `circle`) => {
  if (!isPositioned2(circle))
    throw new Error(`Expected a positioned circle with x,y`);
  return guard4(circle, paramName);
};
var interpolate4 = (circle, t2) => point2(circle, t2 * piPi2);
var length4 = (circle) => circumference(circle);
var circumference = (circle) => {
  guard4(circle);
  return piPi2 * circle.radius;
};
var area = (circle) => {
  guard4(circle);
  return Math.PI * circle.radius * circle.radius;
};
var bbox4 = (circle) => {
  if (isPositioned2(circle)) {
    return Rect_exports.fromCenter(circle, circle.radius * 2, circle.radius * 2);
  } else {
    return { width: circle.radius * 2, height: circle.radius * 2 };
  }
};
var isContainedBy = (a, b) => {
  const d = distanceCenter2(a, b);
  return d < Math.abs(a.radius - b.radius);
};
var isIntersecting = (a, b) => {
  if (isEquals2(a, b))
    return true;
  if (isContainedBy(a, b))
    return true;
  return intersections(a, b).length === 2;
};
var intersections = (a, b) => {
  const vector = Point_exports.subtract(b, a);
  const centerD = Math.sqrt(vector.y * vector.y + vector.x * vector.x);
  if (centerD > a.radius + b.radius)
    return [];
  if (centerD < Math.abs(a.radius - b.radius))
    return [];
  if (isEquals2(a, b))
    return [];
  const centroidD = (a.radius * a.radius - b.radius * b.radius + centerD * centerD) / (2 * centerD);
  const centroid3 = {
    x: a.x + vector.x * centroidD / centerD,
    y: a.y + vector.y * centroidD / centerD
  };
  const centroidIntersectionD = Math.sqrt(a.radius * a.radius - centroidD * centroidD);
  const intersection = {
    x: -vector.y * (centroidIntersectionD / centerD),
    y: vector.x * (centroidIntersectionD / centerD)
  };
  return [
    Point_exports.sum(centroid3, intersection),
    Point_exports.subtract(centroid3, intersection)
  ];
};
var isEquals2 = (a, b) => {
  if (a.radius !== b.radius)
    return false;
  if (isPositioned2(a) && isPositioned2(b)) {
    if (a.x !== b.x)
      return false;
    if (a.y !== b.y)
      return false;
    if (a.z !== b.z)
      return false;
    return true;
  } else if (!isPositioned2(a) && !isPositioned2(b)) {
  } else
    return false;
  return false;
};
var distanceCenter2 = (a, b) => {
  guardPositioned(a, `a`);
  guardPositioned(a, `b`);
  return Point_exports.distance(a, b);
};
var distanceFromExterior = (a, b) => {
  guardPositioned(a, `a`);
  if (isCirclePositioned(b)) {
    return Math.max(0, distanceCenter2(a, b) - a.radius - b.radius);
  } else if (Point_exports.isPoint(b)) {
    return Math.max(0, Point_exports.distance(a, b));
  } else
    throw new Error(`Second parameter invalid type`);
};
var toSvg2 = (a, sweep, origin) => {
  if (isCircle(a)) {
    if (origin !== void 0) {
      return toSvgFull2(a.radius, origin, sweep);
    }
    if (isPositioned2(a)) {
      return toSvgFull2(a.radius, a, sweep);
    } else
      throw new Error(`origin parameter needed for non-positioned circle`);
  } else {
    if (origin !== void 0) {
      return toSvgFull2(a, origin, sweep);
    } else
      throw new Error(`origin parameter needed`);
  }
};
var toSvgFull2 = (radius, origin, sweep) => {
  const { x, y } = origin;
  const s = sweep ? `1` : `0`;
  return `
    M ${x}, ${y}
    m -${radius}, 0
    a ${radius},${radius} 0 1,${s} ${radius * 2},0
    a ${radius},${radius} 0 1,${s} -${radius * 2},0
  `.split(`
`);
};
var toPath4 = (circle) => {
  guard4(circle);
  return Object.freeze({
    ...circle,
    interpolate: (t2) => interpolate4(circle, t2),
    bbox: () => bbox4(circle),
    length: () => length4(circle),
    toSvgString: (sweep = true) => toSvg2(circle, sweep),
    kind: `circular`
  });
};
var intersectionLine = (circle, line) => {
  const v1 = {
    x: line.b.x - line.a.x,
    y: line.b.y - line.a.y
  };
  const v2 = {
    x: line.a.x - circle.x,
    y: line.a.y - circle.y
  };
  const b = (v1.x * v2.x + v1.y * v2.y) * -2;
  const c = 2 * (v1.x * v1.x + v1.y * v1.y);
  const d = Math.sqrt(b * b - 2 * c * (v2.x * v2.x + v2.y * v2.y - circle.radius * circle.radius));
  if (isNaN(d))
    return [];
  const u1 = (b - d) / c;
  const u2 = (b + d) / c;
  const ret = [];
  if (u1 <= 1 && u1 >= 0) {
    ret.push({
      x: line.a.x + v1.x * u1,
      y: line.a.y + v1.y * u1
    });
  }
  if (u2 <= 1 && u2 >= 0) {
    ret.push({
      x: line.a.x + v1.x * u2,
      y: line.a.y + v1.y * u2
    });
  }
  return ret;
};

// src/geometry/CompoundPath.ts
var CompoundPath_exports = {};
__export(CompoundPath_exports, {
  bbox: () => bbox5,
  computeDimensions: () => computeDimensions,
  fromPaths: () => fromPaths,
  guardContinuous: () => guardContinuous,
  interpolate: () => interpolate5,
  setSegment: () => setSegment,
  toString: () => toString3,
  toSvgString: () => toSvgString2
});
var setSegment = (compoundPath, index, path) => {
  const existing = [...compoundPath.segments];
  existing[index] = path;
  return fromPaths(...existing);
};
var interpolate5 = (paths, t2, useWidth, dimensions) => {
  if (dimensions === void 0) {
    dimensions = computeDimensions(paths);
  }
  const expected = t2 * (useWidth ? dimensions.totalWidth : dimensions.totalLength);
  let soFar = 0;
  const l = useWidth ? dimensions.widths : dimensions.lengths;
  for (let i = 0; i < l.length; i++) {
    if (soFar + l[i] >= expected) {
      const relative = expected - soFar;
      let amt = relative / l[i];
      if (amt > 1)
        amt = 1;
      return paths[i].interpolate(amt);
    } else
      soFar += l[i];
  }
  return { x: 0, y: 0 };
};
var computeDimensions = (paths) => {
  const widths = paths.map((l) => l.bbox().width);
  const lengths3 = paths.map((l) => l.length());
  let totalLength = 0;
  let totalWidth = 0;
  for (let i = 0; i < lengths3.length; i++)
    totalLength += lengths3[i];
  for (let i = 0; i < widths.length; i++)
    totalWidth += widths[i];
  return { totalLength, totalWidth, widths, lengths: lengths3 };
};
var bbox5 = (paths) => {
  const boxes = paths.map((p) => p.bbox());
  const corners3 = boxes.map((b) => Rect_exports.corners(b)).flat();
  return Point_exports.bbox(...corners3);
};
var toString3 = (paths) => paths.map((p) => p.toString()).join(`, `);
var guardContinuous = (paths) => {
  let lastPos = Path_exports.getEnd(paths[0]);
  for (let i = 1; i < paths.length; i++) {
    const start = Path_exports.getStart(paths[i]);
    if (!Point_exports.isEqual(start, lastPos))
      throw new Error(`Path index ` + i + ` does not start at prior path end. Start: ` + start.x + `,` + start.y + ` expected: ` + lastPos.x + `,` + lastPos.y);
    lastPos = Path_exports.getEnd(paths[i]);
  }
};
var toSvgString2 = (paths) => paths.flatMap((p) => p.toSvgString());
var fromPaths = (...paths) => {
  guardContinuous(paths);
  const dims = computeDimensions(paths);
  return Object.freeze({
    segments: paths,
    length: () => dims.totalLength,
    interpolate: (t2, useWidth = false) => interpolate5(paths, t2, useWidth, dims),
    bbox: () => bbox5(paths),
    toString: () => toString3(paths),
    toSvgString: () => toSvgString2(paths),
    kind: `compound`
  });
};

// src/geometry/Grid.ts
var Grid_exports = {};
__export(Grid_exports, {
  allDirections: () => allDirections,
  cellAtPoint: () => cellAtPoint,
  cellEquals: () => cellEquals,
  cellKeyString: () => cellKeyString,
  cellMiddle: () => cellMiddle,
  cells: () => cells,
  crossDirections: () => crossDirections,
  getLine: () => getLine,
  getVectorFromCardinal: () => getVectorFromCardinal,
  guardCell: () => guardCell,
  inside: () => inside,
  isEqual: () => isEqual2,
  neighbours: () => neighbours,
  offset: () => offset,
  offsetCardinals: () => offsetCardinals,
  rectangleForCell: () => rectangleForCell,
  rows: () => rows,
  simpleLine: () => simpleLine,
  visitFor: () => visitFor,
  visitor: () => visitor,
  visitorBreadth: () => visitorBreadth,
  visitorColumn: () => visitorColumn,
  visitorDepth: () => visitorDepth,
  visitorRandom: () => visitorRandom,
  visitorRandomContiguous: () => visitorRandomContiguous,
  visitorRow: () => visitorRow
});
var isCell = (cell) => {
  if (cell === void 0)
    return false;
  return `x` in cell && `y` in cell;
};
var isNeighbour = (n) => {
  if (n === void 0)
    return false;
  if (n[1] === void 0)
    return false;
  return true;
};
var isEqual2 = (a, b) => {
  if (`rows` in a && `cols` in a) {
    if (`rows` in b && `cols` in b) {
      if (a.rows !== b.rows || a.cols !== b.cols)
        return false;
    } else
      return false;
  }
  if (`size` in a) {
    if (`size` in b) {
      if (a.size !== b.size)
        return false;
    } else
      return false;
  }
  return true;
};
var cellKeyString = (v) => `Cell{${v.x},${v.y}}`;
var cellEquals = (a, b) => {
  if (b === void 0)
    return false;
  if (a === void 0)
    return false;
  return a.x === b.x && a.y === b.y;
};
var guardCell = (cell, paramName = `Param`, grid) => {
  if (cell === void 0)
    throw new Error(paramName + ` is undefined. Expecting {x,y}`);
  if (cell.x === void 0)
    throw new Error(paramName + `.x is undefined`);
  if (cell.y === void 0)
    throw new Error(paramName + `.y is undefined`);
  if (!Number.isInteger(cell.x))
    throw new Error(paramName + `.x is non-integer`);
  if (!Number.isInteger(cell.y))
    throw new Error(paramName + `.y is non-integer`);
  if (grid !== void 0) {
    if (!inside(grid, cell))
      throw new Error(`${paramName} is outside of grid. Cell: ${cell.x},${cell.y} Grid: ${grid.cols}, ${grid.rows}`);
  }
};
var guardGrid = (grid, paramName = `Param`) => {
  if (grid === void 0)
    throw new Error(`${paramName} is undefined. Expecting grid.`);
  if (!(`rows` in grid))
    throw new Error(`${paramName}.rows is undefined`);
  if (!(`cols` in grid))
    throw new Error(`${paramName}.cols is undefined`);
  if (!Number.isInteger(grid.rows))
    throw new Error(`${paramName}.rows is not an integer`);
  if (!Number.isInteger(grid.cols))
    throw new Error(`${paramName}.cols is not an integer`);
};
var inside = (grid, cell) => {
  if (cell.x < 0 || cell.y < 0)
    return false;
  if (cell.x >= grid.cols || cell.y >= grid.rows)
    return false;
  return true;
};
var rectangleForCell = (cell, grid) => {
  guardCell(cell);
  const size = grid.size;
  const x = cell.x * size;
  const y = cell.y * size;
  const r = Rect_exports.fromTopLeft({ x, y }, size, size);
  return r;
};
var cellAtPoint = (position, grid) => {
  const size = grid.size;
  if (position.x < 0 || position.y < 0)
    return;
  const x = Math.floor(position.x / size);
  const y = Math.floor(position.y / size);
  if (x >= grid.cols)
    return;
  if (y >= grid.rows)
    return;
  return { x, y };
};
var allDirections = Object.freeze([`n`, `ne`, `nw`, `e`, `s`, `se`, `sw`, `w`]);
var crossDirections = Object.freeze([`n`, `e`, `s`, `w`]);
var neighbours = (grid, cell, bounds = `undefined`, directions) => {
  const dirs = directions ?? allDirections;
  const points = dirs.map((c) => offset(grid, cell, getVectorFromCardinal(c), bounds));
  return zipKeyValue(dirs, points);
};
var cellMiddle = (cell, grid) => {
  guardCell(cell);
  const size = grid.size;
  const x = cell.x * size;
  const y = cell.y * size;
  return Object.freeze({ x: x + size / 2, y: y + size / 2 });
};
var getLine = (start, end) => {
  guardCell(start);
  guardCell(end);
  let startX = start.x;
  let startY = start.y;
  const dx = Math.abs(end.x - startX);
  const dy = Math.abs(end.y - startY);
  const sx = startX < end.x ? 1 : -1;
  const sy = startY < end.y ? 1 : -1;
  let err = dx - dy;
  const cells2 = [];
  while (true) {
    cells2.push(Object.freeze({ x: startX, y: startY }));
    if (startX === end.x && startY === end.y)
      break;
    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      startX += sx;
    }
    if (e2 < dx) {
      err += dx;
      startY += sy;
    }
  }
  return cells2;
};
var offsetCardinals = (grid, start, steps, bounds = `stop`) => {
  guardGrid(grid, `grid`);
  guardCell(start, `start`);
  integer(steps, `aboveZero`, `steps`);
  const directions = allDirections;
  const vectors = directions.map((d) => getVectorFromCardinal(d, steps));
  const cells2 = directions.map((d, i) => offset(grid, start, vectors[i], bounds));
  return zipKeyValue(directions, cells2);
};
var getVectorFromCardinal = (cardinal, multiplier = 1) => {
  let v;
  switch (cardinal) {
    case `n`:
      v = { x: 0, y: -1 * multiplier };
      break;
    case `ne`:
      v = { x: 1 * multiplier, y: -1 * multiplier };
      break;
    case `e`:
      v = { x: 1 * multiplier, y: 0 };
      break;
    case `se`:
      v = { x: 1 * multiplier, y: 1 * multiplier };
      break;
    case `s`:
      v = { x: 0, y: 1 * multiplier };
      break;
    case `sw`:
      v = { x: -1 * multiplier, y: 1 * multiplier };
      break;
    case `w`:
      v = { x: -1 * multiplier, y: 0 };
      break;
    case `nw`:
      v = { x: -1 * multiplier, y: -1 * multiplier };
      break;
    default:
      v = { x: 0, y: 0 };
  }
  return Object.freeze(v);
};
var simpleLine = function(start, end, endInclusive = false) {
  const cells2 = [];
  if (start.x === end.x) {
    const lastY = endInclusive ? end.y + 1 : end.y;
    for (let y = start.y; y < lastY; y++) {
      cells2.push({ x: start.x, y });
    }
  } else if (start.y === end.y) {
    const lastX = endInclusive ? end.x + 1 : end.x;
    for (let x = start.x; x < lastX; x++) {
      cells2.push({ x, y: start.y });
    }
  } else {
    throw new Error(`Only does vertical and horizontal: ${start.x},${start.y} - ${end.x},${end.y}`);
  }
  return cells2;
};
var offset = function(grid, start, vector, bounds = `undefined`) {
  guardCell(start, `start`, grid);
  guardCell(vector);
  guardGrid(grid, `grid`);
  let x = start.x;
  let y = start.y;
  switch (bounds) {
    case `wrap`:
      x += vector.x % grid.cols;
      y += vector.y % grid.rows;
      if (x < 0)
        x = grid.cols + x;
      else if (x >= grid.cols) {
        x -= grid.cols;
      }
      if (y < 0)
        y = grid.rows + y;
      else if (y >= grid.rows) {
        y -= grid.rows;
      }
      break;
    case `stop`:
      x += vector.x;
      y += vector.y;
      x = clampIndex(x, grid.cols);
      y = clampIndex(y, grid.rows);
      break;
    case `undefined`:
      x += vector.x;
      y += vector.y;
      if (x < 0 || y < 0)
        return;
      if (x >= grid.cols || y >= grid.rows)
        return;
      break;
    case `unbounded`:
      x += vector.x;
      y += vector.y;
      break;
    default:
      throw new Error(`Unknown BoundsLogic case ${bounds}`);
  }
  return Object.freeze({ x, y });
};
var neighbourList = (grid, cell, directions, bounds) => {
  const cellNeighbours = neighbours(grid, cell, bounds, directions);
  const entries = Object.entries(cellNeighbours);
  return entries.filter(isNeighbour);
};
var visitor = function* (logic, grid, start, opts = {}) {
  guardGrid(grid, `grid`);
  guardCell(start, `start`, grid);
  const v = opts.visited ?? setMutable((c) => cellKeyString(c));
  const possibleNeighbours = logic.options ? logic.options : (g, c) => neighbourList(g, c, crossDirections, `undefined`);
  if (!isCell(start))
    throw new Error(`'start' parameter is undefined or not a cell`);
  let cellQueue = [start];
  let moveQueue = [];
  let current = null;
  while (cellQueue.length > 0) {
    if (current === null) {
      const nv = cellQueue.pop();
      if (nv === void 0) {
        break;
      }
      current = nv;
    }
    if (!v.has(current)) {
      v.add(current);
      yield current;
      const nextSteps = possibleNeighbours(grid, current).filter((step) => !v.has(step[1]));
      if (nextSteps.length === 0) {
        if (current !== null) {
          cellQueue = cellQueue.filter((cq) => cellEquals(cq, current));
        }
      } else {
        moveQueue.push(...nextSteps);
      }
    }
    moveQueue = moveQueue.filter((step) => !v.has(step[1]));
    if (moveQueue.length === 0) {
      current = null;
    } else {
      const potential = logic.select(moveQueue);
      if (potential !== void 0) {
        cellQueue.push(potential[1]);
        current = potential[1];
      }
    }
  }
};
var visitorDepth = (grid, start, opts = {}) => visitor({
  select: (nbos) => nbos[nbos.length - 1]
}, grid, start, opts);
var visitorBreadth = (grid, start, opts = {}) => visitor({
  select: (nbos) => nbos[0]
}, grid, start, opts);
var randomNeighbour = (nbos) => randomElement(nbos);
var visitorRandomContiguous = (grid, start, opts = {}) => visitor({
  select: randomNeighbour
}, grid, start, opts);
var visitorRandom = (grid, start, opts = {}) => visitor({
  options: (grid2, cell) => {
    const t2 = [];
    for (const c of cells(grid2, cell)) {
      t2.push([`n`, c]);
    }
    return t2;
  },
  select: randomNeighbour
}, grid, start, opts);
var visitorRow = (grid, start, opts = {}) => {
  const { reversed = false } = opts;
  const neighbourSelect = (nbos) => nbos.find((n) => n[0] === (reversed ? `w` : `e`));
  const possibleNeighbours = (grid2, cell) => {
    if (reversed) {
      if (cell.x > 0) {
        cell = { x: cell.x - 1, y: cell.y };
      } else {
        if (cell.y > 0) {
          cell = { x: grid2.cols - 1, y: cell.y - 1 };
        } else {
          cell = { x: grid2.cols - 1, y: grid2.rows - 1 };
        }
      }
    } else {
      if (cell.x < grid2.rows - 1) {
        cell = { x: cell.x + 1, y: cell.y };
      } else {
        if (cell.y < grid2.rows - 1) {
          cell = { x: 0, y: cell.y + 1 };
        } else {
          cell = { x: 0, y: 0 };
        }
      }
    }
    return [[reversed ? `w` : `e`, cell]];
  };
  const logic = {
    select: neighbourSelect,
    options: possibleNeighbours
  };
  return visitor(logic, grid, start, opts);
};
var visitFor = (grid, start, steps, visitor2) => {
  integer(steps, ``, `steps`);
  const opts = {
    reversed: steps < 0
  };
  steps = Math.abs(steps);
  let c = start;
  let v = visitor2(grid, start, opts);
  v.next();
  let stepsMade = 0;
  while (stepsMade < steps) {
    stepsMade++;
    const { value } = v.next();
    if (value) {
      c = value;
      if (opts.debug)
        console.log(`stepsMade: ${stepsMade} cell: ${c.x}, ${c.y} reverse: ${opts.reversed}`);
    } else {
      if (steps >= grid.cols * grid.rows) {
        steps -= grid.cols * grid.rows;
        stepsMade = 0;
        v = visitor2(grid, start, opts);
        v.next();
        c = start;
        if (opts.debug)
          console.log(`resetting visitor to ${steps}`);
      } else
        throw new Error(`Value not received by visitor`);
    }
  }
  return c;
};
var visitorColumn = (grid, start, opts = {}) => {
  const { reversed = false } = opts;
  const logic = {
    select: (nbos) => nbos.find((n) => n[0] === (reversed ? `n` : `s`)),
    options: (grid2, cell) => {
      if (reversed) {
        if (cell.y > 0) {
          cell = { x: cell.x, y: cell.y - 1 };
        } else {
          if (cell.x === 0) {
            cell = { x: grid2.cols - 1, y: grid2.rows - 1 };
          } else {
            cell = { x: cell.x - 1, y: grid2.rows - 1 };
          }
        }
      } else {
        if (cell.y < grid2.rows - 1) {
          cell = { x: cell.x, y: cell.y + 1 };
        } else {
          if (cell.x < grid2.cols - 1) {
            cell = { x: cell.x + 1, y: 0 };
          } else {
            cell = { x: 0, y: 0 };
          }
        }
      }
      return [[reversed ? `n` : `s`, cell]];
    }
  };
  return visitor(logic, grid, start, opts);
};
var rows = function* (grid, start = { x: 0, y: 0 }) {
  let row = start.y;
  let rowCells = [];
  for (const c of cells(grid, start)) {
    if (c.y !== row) {
      yield rowCells;
      rowCells = [c];
      row = c.y;
    } else {
      rowCells.push(c);
    }
  }
  if (rowCells.length > 0)
    yield rowCells;
};
var cells = function* (grid, start = { x: 0, y: 0 }) {
  guardGrid(grid, `grid`);
  guardCell(start, `start`, grid);
  let { x, y } = start;
  let canMove = true;
  do {
    yield { x, y };
    x++;
    if (x === grid.cols) {
      y++;
      x = 0;
    }
    if (y === grid.rows) {
      y = 0;
      x = 0;
    }
    if (x === start.x && y === start.y)
      canMove = false;
  } while (canMove);
};

// src/geometry/Path.ts
var Path_exports = {};
__export(Path_exports, {
  getEnd: () => getEnd,
  getStart: () => getStart
});
var getStart = function(path) {
  if (Bezier_exports.isQuadraticBezier(path))
    return path.a;
  else if (Line_exports.isLine(path))
    return path.a;
  else
    throw new Error(`Unknown path type ${JSON.stringify(path)}`);
};
var getEnd = function(path) {
  if (Bezier_exports.isQuadraticBezier(path))
    return path.b;
  else if (Line_exports.isLine(path))
    return path.b;
  else
    throw new Error(`Unknown path type ${JSON.stringify(path)}`);
};

// src/geometry/Rect.ts
var Rect_exports = {};
__export(Rect_exports, {
  area: () => area2,
  corners: () => corners,
  distanceFromCenter: () => distanceFromCenter,
  distanceFromExterior: () => distanceFromExterior2,
  edges: () => edges,
  empty: () => empty,
  emptyPositioned: () => emptyPositioned,
  fromCenter: () => fromCenter,
  fromElement: () => fromElement,
  fromTopLeft: () => fromTopLeft,
  getCenter: () => getCenter,
  guard: () => guard5,
  intersectsPoint: () => intersectsPoint,
  isEmpty: () => isEmpty2,
  isEqual: () => isEqual3,
  isEqualSize: () => isEqualSize,
  isPlaceholder: () => isPlaceholder2,
  isPositioned: () => isPositioned3,
  isRect: () => isRect,
  isRectPositioned: () => isRectPositioned,
  lengths: () => lengths,
  maxFromCorners: () => maxFromCorners,
  perimeter: () => perimeter,
  placeholder: () => placeholder,
  placeholderPositioned: () => placeholderPositioned,
  subtract: () => subtract3
});
var empty = Object.freeze({ width: 0, height: 0 });
var emptyPositioned = Object.freeze({ x: 0, y: 0, width: 0, height: 0 });
var placeholder = Object.freeze({ width: Number.NaN, height: Number.NaN });
var placeholderPositioned = Object.freeze({ x: Number.NaN, y: Number.NaN, width: Number.NaN, height: Number.NaN });
var isEmpty2 = (rect) => rect.width === 0 && rect.height === 0;
var isPlaceholder2 = (rect) => Number.isNaN(rect.width) && Number.isNaN(rect.height);
var isPositioned3 = (p) => p.x !== void 0 && p.y !== void 0;
var isRect = (p) => {
  if (p === void 0)
    return false;
  if (p.width === void 0)
    return false;
  if (p.height === void 0)
    return false;
  return true;
};
var isRectPositioned = (p) => isRect(p) && isPositioned3(p);
var fromElement = (el) => ({ width: el.clientWidth, height: el.clientHeight });
var isEqualSize = (a, b) => {
  if (a === void 0)
    throw new Error(`a undefined`);
  if (b === void 0)
    throw new Error(`b undefined`);
  return a.width === b.width && a.height === b.height;
};
var isEqual3 = (a, b) => {
  if (isPositioned3(a) && isPositioned3(b)) {
    if (!Point_exports.isEqual(a, b))
      return false;
    return a.width === b.width && a.height === b.height;
  } else if (!isPositioned3(a) && !isPositioned3(b)) {
    return a.width === b.width && a.height === b.height;
  } else {
    return false;
  }
};
function subtract3(a, b, c) {
  if (a === void 0)
    throw new Error(`First parameter undefined`);
  if (typeof b === `number`) {
    const height = c === void 0 ? 0 : c;
    return Object.freeze({
      ...a,
      width: a.width - b,
      height: a.height - height
    });
  } else {
    return Object.freeze({
      ...a,
      width: a.width - b.width,
      height: a.height - b.height
    });
  }
}
function intersectsPoint(rect, a, b) {
  guard5(rect, `rect`);
  let x = 0;
  let y = 0;
  if (typeof a === `number`) {
    if (b === void 0)
      throw new Error(`x and y coordinate needed`);
    x = a;
    y = b;
  } else {
    x = a.x;
    y = a.y;
  }
  if (isPositioned3(rect)) {
    if (x - rect.x > rect.width || x < rect.x)
      return false;
    if (y - rect.y > rect.height || y < rect.y)
      return false;
  } else {
    if (x > rect.width || x < 0)
      return false;
    if (y > rect.height || y < 0)
      return false;
  }
  return true;
}
var fromCenter = (origin, width, height) => {
  Point_exports.guard(origin, `origin`);
  guardDim(width, `width`);
  guardDim(height, `height`);
  const halfW = width / 2;
  const halfH = height / 2;
  return { x: origin.x - halfW, y: origin.y - halfH, width, height };
};
var distanceFromExterior2 = (rect, pt) => {
  guardPositioned2(rect, `rect`);
  Point_exports.guard(pt, `pt`);
  if (intersectsPoint(rect, pt))
    return 0;
  const dx = Math.max(rect.x - pt.x, 0, pt.x - rect.x + rect.width);
  const dy = Math.max(rect.y - pt.y, 0, pt.y - rect.y + rect.height);
  return Math.sqrt(dx * dx + dy * dy);
};
var distanceFromCenter = (rect, pt) => Point_exports.distance(getCenter(rect), pt);
var maxFromCorners = (topLeft, topRight, bottomRight, bottomLeft) => {
  if (topLeft.y > bottomRight.y)
    throw new Error(`topLeft.y greater than bottomRight.y`);
  if (topLeft.y > bottomLeft.y)
    throw new Error(`topLeft.y greater than bottomLeft.y`);
  const w1 = topRight.x - topLeft.x;
  const w2 = bottomRight.x - bottomLeft.x;
  const h1 = Math.abs(bottomLeft.y - topLeft.y);
  const h2 = Math.abs(bottomRight.y - topRight.y);
  return {
    x: Math.min(topLeft.x, bottomLeft.x),
    y: Math.min(topRight.y, topLeft.y),
    width: Math.max(w1, w2),
    height: Math.max(h1, h2)
  };
};
var guardDim = (d, name = `Dimension`) => {
  if (d === void 0)
    throw Error(`${name} is undefined`);
  if (isNaN(d))
    throw Error(`${name} is NaN`);
  if (d < 0)
    throw Error(`${name} cannot be negative`);
};
var guard5 = (rect, name = `rect`) => {
  if (rect === void 0)
    throw Error(`{$name} undefined`);
  if (isPositioned3(rect))
    Point_exports.guard(rect, name);
  guardDim(rect.width, name + `.width`);
  guardDim(rect.height, name + `.height`);
};
var guardPositioned2 = (rect, name = `rect`) => {
  if (!isPositioned3(rect))
    throw new Error(`Expected ${name} to have x,y`);
  guard5(rect, name);
};
var fromTopLeft = (origin, width, height) => {
  guardDim(width, `width`);
  guardDim(height, `height`);
  Point_exports.guard(origin, `origin`);
  return { x: origin.x, y: origin.y, width, height };
};
var corners = (rect, origin) => {
  guard5(rect);
  if (origin === void 0 && Point_exports.isPoint(rect))
    origin = rect;
  else if (origin === void 0)
    throw new Error(`Unpositioned rect needs origin param`);
  return [
    { x: origin.x, y: origin.y },
    { x: origin.x + rect.width, y: origin.y },
    { x: origin.x + rect.width, y: origin.y + rect.height },
    { x: origin.x, y: origin.y + rect.height }
  ];
};
var getCenter = (rect, origin) => {
  guard5(rect);
  if (origin === void 0 && Point_exports.isPoint(rect))
    origin = rect;
  else if (origin === void 0)
    throw new Error(`Unpositioned rect needs origin param`);
  return {
    x: origin.x + rect.width / 2,
    y: origin.y + rect.height / 2
  };
};
var lengths = (rect) => {
  guardPositioned2(rect, `rect`);
  return edges(rect).map((l) => Line_exports.length(l));
};
var edges = (rect, origin) => Line_exports.joinPointsToLines(...corners(rect, origin));
var perimeter = (rect) => {
  guard5(rect);
  return rect.height + rect.height + rect.width + rect.width;
};
var area2 = (rect) => {
  guard5(rect);
  return rect.height * rect.width;
};

// src/geometry/Ellipse.ts
var Ellipse_exports = {};
__export(Ellipse_exports, {
  fromDegrees: () => fromDegrees2
});
var fromDegrees2 = (radiusX, radiusY, rotationDeg = 0, startAngleDeg = 0, endAngleDeg = 360) => ({
  radiusX,
  radiusY,
  rotation: degreeToRadian(rotationDeg),
  startAngle: degreeToRadian(startAngleDeg),
  endAngle: degreeToRadian(endAngleDeg)
});

// src/geometry/Polar.ts
var Polar_exports = {};
__export(Polar_exports, {
  fromCartesian: () => fromCartesian,
  isCoord: () => isCoord,
  rotate: () => rotate3,
  rotateDegrees: () => rotateDegrees,
  spiral: () => spiral,
  spiralRaw: () => spiralRaw,
  toCartesian: () => toCartesian
});
var isCoord = (p) => {
  if (p.distance === void 0)
    return false;
  if (p.angleRadian === void 0)
    return false;
  return true;
};
var fromCartesian = (point3, origin) => {
  point3 = subtract2(point3, origin);
  const angle = Math.atan2(point3.y, point3.x);
  return Object.freeze({
    ...point3,
    angleRadian: angle,
    distance: Math.sqrt(point3.x * point3.x + point3.y * point3.y)
  });
};
var toCartesian = (a, b, c) => {
  if (isCoord(a)) {
    if (b === void 0)
      b = Empty;
    if (!isPoint(b))
      throw new Error(`Expecting (Coord, Point). Point param wrong type.`);
    return polarToCartesian(a.distance, a.angleRadian, b);
  } else {
    if (typeof a === `number` && typeof b === `number`) {
      if (c === void 0)
        c = Empty;
      if (!isPoint(c))
        throw new Error(`Expecting (number, number, Point). Point param wrong type`);
      return polarToCartesian(a, b, c);
    } else {
      throw new Error(`Expecting parameters of (number, number). Got: (${typeof a}, ${typeof b}, ${typeof c}). a: ${JSON.stringify(a)}`);
    }
  }
};
function* spiral(smoothness, zoom) {
  let step = 0;
  while (true) {
    const a = smoothness * step++;
    yield {
      distance: zoom * a,
      angleRadian: a,
      step
    };
  }
}
var rotate3 = (c, amountRadian) => Object.freeze({
  ...c,
  angleRadian: c.angleRadian + amountRadian
});
var rotateDegrees = (c, amountDeg) => Object.freeze({
  ...c,
  angleRadian: c.angleRadian + degreeToRadian(amountDeg)
});
var spiralRaw = (step, smoothness, zoom) => {
  const a = smoothness * step;
  return Object.freeze({
    distance: zoom * a,
    angleRadian: a
  });
};
var polarToCartesian = (distance3, angleRadians, origin) => {
  guard(origin);
  return Object.freeze({
    x: origin.x + distance3 * Math.cos(angleRadians),
    y: origin.y + distance3 * Math.sin(angleRadians)
  });
};

// src/geometry/Shape.ts
var Shape_exports = {};
__export(Shape_exports, {
  starburst: () => starburst
});
var starburst = (outerRadius, points = 5, innerRadius, origin = { x: 0, y: 0 }, opts) => {
  integer(points, `positive`, `points`);
  const angle = Math.PI * 2 / points;
  const angleHalf = angle / 2;
  const initialAngle = opts?.initialAngleRadian ?? -Math.PI / 2;
  if (innerRadius === void 0)
    innerRadius = outerRadius / 2;
  let a = initialAngle;
  const pts = [];
  for (let i = 0; i < points; i++) {
    const peak = toCartesian(outerRadius, a, origin);
    const left = toCartesian(innerRadius, a - angleHalf, origin);
    const right = toCartesian(innerRadius, a + angleHalf, origin);
    pts.push(left, peak);
    if (i + 1 < points)
      pts.push(right);
    a += angle;
  }
  return pts;
};

// src/geometry/Triangle.ts
var Triangle_exports = {};
__export(Triangle_exports, {
  Empty: () => Empty2,
  Placeholder: () => Placeholder2,
  angles: () => angles,
  anglesDegrees: () => anglesDegrees,
  apply: () => apply3,
  area: () => area3,
  barycentricCoord: () => barycentricCoord,
  barycentricToCartestian: () => barycentricToCartestian,
  bbox: () => bbox6,
  centroid: () => centroid2,
  corners: () => corners2,
  edges: () => edges2,
  fromFlatArray: () => fromFlatArray2,
  fromPoints: () => fromPoints2,
  fromRadius: () => fromRadius,
  guard: () => guard6,
  innerCircle: () => innerCircle,
  intersectsPoint: () => intersectsPoint2,
  isAcute: () => isAcute,
  isEmpty: () => isEmpty3,
  isEqual: () => isEqual4,
  isEquilateral: () => isEquilateral,
  isIsoceles: () => isIsoceles,
  isOblique: () => isOblique,
  isObtuse: () => isObtuse,
  isPlaceholder: () => isPlaceholder3,
  isRightAngle: () => isRightAngle,
  isTriangle: () => isTriangle,
  lengths: () => lengths2,
  outerCircle: () => outerCircle,
  perimeter: () => perimeter2,
  rotate: () => rotate4,
  toFlatArray: () => toFlatArray2
});
var piPi3 = Math.PI * 2;
var Empty2 = Object.freeze({ a: Point_exports.Empty, b: Point_exports.Empty, c: Point_exports.Empty });
var Placeholder2 = Object.freeze({ a: Point_exports.Placeholder, b: Point_exports.Placeholder, c: Point_exports.Placeholder });
var isEmpty3 = (t2) => Point_exports.isEmpty(t2.a) && Point_exports.isEmpty(t2.b) && Point_exports.isEmpty(t2.c);
var isPlaceholder3 = (t2) => Point_exports.isPlaceholder(t2.a) && Point_exports.isPlaceholder(t2.b) && Point_exports.isPlaceholder(t2.c);
var apply3 = (t2, fn) => Object.freeze({
  ...t2,
  a: fn(t2.a, `a`),
  b: fn(t2.b, `b`),
  c: fn(t2.c, `c`)
});
var guard6 = (t2, name = `t`) => {
  if (t2 === void 0)
    throw Error(`{$name} undefined`);
  Point_exports.guard(t2.a, name + `.a`);
  Point_exports.guard(t2.b, name + `.b`);
  Point_exports.guard(t2.c, name + `.c`);
};
var isTriangle = (p) => {
  if (p === void 0)
    return false;
  const tri = p;
  if (!Point_exports.isPoint(tri.a))
    return false;
  if (!Point_exports.isPoint(tri.b))
    return false;
  if (!Point_exports.isPoint(tri.c))
    return false;
  return true;
};
var isEqual4 = (a, b) => Point_exports.isEqual(a.a, b.a) && Point_exports.isEqual(a.b, b.b) && Point_exports.isEqual(a.c, b.c);
var corners2 = (t2) => {
  guard6(t2);
  return [t2.a, t2.b, t2.c];
};
var edges2 = (t2) => {
  guard6(t2);
  return Line_exports.joinPointsToLines(t2.a, t2.b, t2.c, t2.a);
};
var lengths2 = (t2) => {
  guard6(t2);
  return [
    Point_exports.distance(t2.a, t2.b),
    Point_exports.distance(t2.b, t2.c),
    Point_exports.distance(t2.c, t2.a)
  ];
};
var angles = (t2) => {
  guard6(t2);
  return [
    Point_exports.angleBetween(t2.a, t2.b),
    Point_exports.angleBetween(t2.b, t2.c),
    Point_exports.angleBetween(t2.c, t2.a)
  ];
};
var anglesDegrees = (t2) => {
  guard6(t2);
  return radianToDegree(angles(t2));
};
var isEquilateral = (t2) => {
  guard6(t2);
  const [a, b, c] = lengths2(t2);
  return a === b && b === c;
};
var isIsoceles = (t2) => {
  const [a, b, c] = lengths2(t2);
  if (a === b)
    return true;
  if (b === c)
    return true;
  if (c === a)
    return true;
  return false;
};
var isRightAngle = (t2) => angles(t2).some((v) => v === Math.PI / 2);
var isOblique = (t2) => !isRightAngle(t2);
var isAcute = (t2) => !angles(t2).some((v) => v >= Math.PI / 2);
var isObtuse = (t2) => angles(t2).some((v) => v > Math.PI / 2);
var centroid2 = (t2) => {
  guard6(t2);
  const total = Point_exports.reduce([t2.a, t2.b, t2.c], (p, acc) => ({
    x: p.x + acc.x,
    y: p.y + acc.y
  }));
  const div = {
    x: total.x / 3,
    y: total.y / 3
  };
  return div;
};
var perimeter2 = (t2) => {
  guard6(t2);
  return edges2(t2).reduce((acc, v) => acc + Line_exports.length(v), 0);
};
var area3 = (t2) => {
  guard6(t2, `t`);
  const e = edges2(t2).map((l) => Line_exports.length(l));
  const p = (e[0] + e[1] + e[2]) / 2;
  return Math.sqrt(p * (p - e[0]) * (p - e[1]) * (p - e[2]));
};
var innerCircle = (t2) => {
  const c = centroid2(t2);
  const p = perimeter2(t2) / 2;
  const a = area3(t2);
  const radius = a / p;
  return { radius, ...c };
};
var outerCircle = (t2) => {
  const [a, b, c] = edges2(t2).map((l) => Line_exports.length(l));
  const cent = centroid2(t2);
  const radius = a * b * c / Math.sqrt((a + b + c) * (-a + b + c) * (a - b + c) * (a + b - c));
  return {
    radius,
    ...cent
  };
};
var fromRadius = (origin, radius, opts = {}) => {
  number(radius, `positive`, `radius`);
  Point_exports.guard(origin, `origin`);
  const initialAngleRadian = opts.initialAngleRadian ?? 0;
  const angles2 = [initialAngleRadian, initialAngleRadian + piPi3 * 1 / 3, initialAngleRadian + piPi3 * 2 / 3];
  const points = angles2.map((a) => Polar_exports.toCartesian(radius, a, origin));
  return fromPoints2(points);
};
var toFlatArray2 = (t2) => {
  guard6(t2);
  return [
    t2.a.x,
    t2.a.y,
    t2.b.x,
    t2.b.y,
    t2.c.x,
    t2.c.y
  ];
};
var fromFlatArray2 = (coords) => {
  if (!Array.isArray(coords))
    throw new Error(`coords expected as array`);
  if (coords.length !== 6)
    throw new Error(`coords array expected with 6 elements. Got ${coords.length}`);
  return fromPoints2(Point_exports.fromNumbers(...coords));
};
var fromPoints2 = (points) => {
  if (!Array.isArray(points))
    throw new Error(`points expected as array`);
  if (points.length !== 3)
    throw new Error(`points array expected with 3 elements. Got ${points.length}`);
  const t2 = {
    a: points[0],
    b: points[1],
    c: points[2]
  };
  return t2;
};
var bbox6 = (t2, inflation = 0) => {
  const { a, b, c } = t2;
  const xMin = Math.min(a.x, b.x, c.x) - inflation;
  const xMax = Math.max(a.x, b.x, c.x) + inflation;
  const yMin = Math.min(a.y, b.y, c.y) - inflation;
  const yMax = Math.max(a.y, b.y, c.y) + inflation;
  const r = {
    x: xMin,
    y: yMin,
    width: xMax - xMin,
    height: yMax - yMin
  };
  return r;
};
var barycentricCoord = (t2, a, b) => {
  const pt = Point_exports.getPointParam(a, b);
  const ab = (x, y, pa, pb) => (pa.y - pb.y) * x + (pb.x - pa.x) * y + pa.x * pb.y - pb.x * pa.y;
  const alpha = ab(pt.x, pt.y, t2.b, t2.c) / ab(t2.a.x, t2.a.y, t2.b, t2.c);
  const theta = ab(pt.x, pt.y, t2.c, t2.a) / ab(t2.b.x, t2.b.y, t2.c, t2.a);
  const gamma = ab(pt.x, pt.y, t2.a, t2.b) / ab(t2.c.x, t2.c.y, t2.a, t2.b);
  return {
    a: alpha,
    b: theta,
    c: gamma
  };
};
var barycentricToCartestian = (t2, bc) => {
  guard6(t2);
  const { a, b, c } = t2;
  const x = a.x * bc.a + b.x * bc.b + c.x * bc.c;
  const y = a.y * bc.a + b.y * bc.b + c.y * bc.c;
  if (a.z && b.z && c.z) {
    const z = a.z * bc.a + b.z * bc.b + c.z * bc.c;
    return Object.freeze({ x, y, z });
  } else {
    return Object.freeze({ x, y });
  }
};
var intersectsPoint2 = (t2, a, b) => {
  const box = bbox6(t2);
  const pt = Point_exports.getPointParam(a, b);
  if (!Rect_exports.intersectsPoint(box, pt))
    return false;
  const bc = barycentricCoord(t2, pt);
  return 0 <= bc.a && bc.a <= 1 && 0 <= bc.b && bc.b <= 1 && 0 <= bc.c && bc.c <= 1;
};
var rotate4 = (t2, amountRadian, origin) => {
  if (amountRadian === void 0 || amountRadian === 0)
    return t2;
  if (origin === void 0)
    origin = centroid2(t2);
  return Object.freeze({
    ...t2,
    a: Point_exports.rotate(t2.a, amountRadian, origin),
    b: Point_exports.rotate(t2.b, amountRadian, origin),
    c: Point_exports.rotate(t2.c, amountRadian, origin)
  });
};

// src/geometry/index.ts
function degreeToRadian(angleInDegrees) {
  if (Array.isArray(angleInDegrees)) {
    return angleInDegrees.map((v) => v * (Math.PI / 180));
  } else {
    return angleInDegrees * (Math.PI / 180);
  }
}
function radianToDegree(angleInRadians) {
  if (Array.isArray(angleInRadians)) {
    return angleInRadians.map((v) => v * 180 / Math.PI);
  } else {
    return angleInRadians * 180 / Math.PI;
  }
}
var radiansFromAxisX = (point3) => Math.atan2(point3.x, point3.y);

export {
  Arc_exports,
  isQuadraticBezier,
  isCubicBezier,
  quadraticSimple,
  toPath3 as toPath,
  Bezier_exports,
  Circle_exports,
  CompoundPath_exports,
  Grid_exports,
  isLine,
  length,
  fromNumbers,
  joinPointsToLines,
  Line_exports,
  Path_exports,
  emptyPositioned,
  placeholder,
  placeholderPositioned,
  isPlaceholder2 as isPlaceholder,
  isPositioned3 as isPositioned,
  isEqual3 as isEqual,
  intersectsPoint,
  corners,
  Rect_exports,
  Ellipse_exports,
  Polar_exports,
  Shape_exports,
  corners2,
  Triangle_exports,
  degreeToRadian,
  radianToDegree,
  radiansFromAxisX,
  geometry_exports,
  guard,
  relation,
  Point_exports
};
//# sourceMappingURL=chunk-HYUE2DDW.js.map