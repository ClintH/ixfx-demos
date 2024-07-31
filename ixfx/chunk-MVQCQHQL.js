import {
  fromNumbers,
  fromPoints,
  guard,
  guardNonZeroPoint,
  isEmpty,
  isNaN,
  isNull,
  isPlaceholder,
  isPoint,
  isPoint3d
} from "./chunk-VUEFATQ3.js";
import {
  linearSpace,
  quantiseEvery
} from "./chunk-647FAJGC.js";
import {
  dotProduct,
  minFast,
  minIndex
} from "./chunk-NGZXMICH.js";
import {
  mutable
} from "./chunk-FKXNN6PM.js";
import {
  sortByNumericProperty
} from "./chunk-AGCCB7IA.js";
import {
  wrap
} from "./chunk-W3MH7W5D.js";
import {
  scale
} from "./chunk-56LYTHQU.js";
import {
  clamp,
  clampIndex
} from "./chunk-ZJSCF2A4.js";
import {
  zipKeyValue
} from "./chunk-UK6L3VJJ.js";
import {
  randomElement
} from "./chunk-HKC65PTS.js";
import {
  defaultRandom
} from "./chunk-5VWJ6TUI.js";
import {
  round
} from "./chunk-S5D7YRXR.js";
import {
  throwIntegerTest,
  throwNumberTest,
  throwPercentTest
} from "./chunk-CSXWZ3IC.js";
import {
  __export
} from "./chunk-L5EJU35C.js";

// src/geometry/index.ts
var geometry_exports = {};
__export(geometry_exports, {
  Arcs: () => arc_exports,
  Beziers: () => bezier_exports,
  Circles: () => circle_exports,
  Compound: () => CompoundPath_exports,
  Convolve2d: () => Convolve2d_exports,
  CurveSimplification: () => CurveSimplification_exports,
  Ellipses: () => Ellipse_exports,
  Grids: () => Grid_exports,
  Layouts: () => Layout_exports,
  Lines: () => line_exports,
  Paths: () => path_exports,
  Points: () => point_exports,
  Polar: () => Polar_exports,
  QuadTree: () => QuadTree_exports,
  Rects: () => rect_exports,
  Scaler: () => Scaler_exports,
  Shapes: () => shape_exports,
  SurfacePoints: () => SurfacePoints_exports,
  Triangles: () => triangle_exports,
  Vectors: () => Vector_exports,
  Waypoints: () => Waypoint_exports,
  degreeToRadian: () => degreeToRadian,
  radianInvert: () => radianInvert,
  radianToDegree: () => radianToDegree,
  radiansFromAxisX: () => radiansFromAxisX
});

// src/geometry/Waypoint.ts
var Waypoint_exports = {};
__export(Waypoint_exports, {
  fromPoints: () => fromPoints2,
  init: () => init
});

// src/geometry/line/JoinPointsToLines.ts
var joinPointsToLines = (...points) => {
  const lines = [];
  let start = points[0];
  for (let index = 1; index < points.length; index++) {
    lines.push(fromPoints(start, points[index]));
    start = points[index];
  }
  return lines;
};

// src/geometry/line/Guard.ts
var isLine = (p) => {
  if (p === void 0) return false;
  if (p.a === void 0) return false;
  if (p.b === void 0) return false;
  if (!isPoint(p.a)) return false;
  if (!isPoint(p.b)) return false;
  return true;
};
var isPolyLine = (p) => {
  if (!Array.isArray(p)) return false;
  const valid = !p.some((v) => !isLine(v));
  return valid;
};
var guard2 = (line, name = `line`) => {
  if (line === void 0) throw new Error(`${name} undefined`);
  if (line.a === void 0) throw new Error(`${name}.a undefined. Expected {a:Point, b:Point}. Got: ${JSON.stringify(line)}`);
  if (line.b === void 0) throw new Error(`${name}.b undefined. Expected {a:Point, b:Point} Got: ${JSON.stringify(line)}`);
};

// src/geometry/line/GetPointsParameter.ts
var getPointParameter = (aOrLine, b) => {
  let a;
  if (isLine(aOrLine)) {
    b = aOrLine.b;
    a = aOrLine.a;
  } else {
    a = aOrLine;
    if (b === void 0) throw new Error(`Since first parameter is not a line, two points are expected. Got a: ${JSON.stringify(a)} b: ${JSON.stringify(b)}`);
  }
  guard(a, `a`);
  guard(a, `b`);
  return [a, b];
};

// src/geometry/line/Length.ts
function length(aOrLine, pointB) {
  if (isPolyLine(aOrLine)) {
    const sum5 = aOrLine.reduce((accumulator, v) => length(v) + accumulator, 0);
    return sum5;
  }
  if (aOrLine === void 0) throw new TypeError(`Parameter 'aOrLine' is undefined`);
  const [a, b] = getPointParameter(aOrLine, pointB);
  const x = b.x - a.x;
  const y = b.y - a.y;
  if (a.z !== void 0 && b.z !== void 0) {
    const z = b.z - a.z;
    return Math.hypot(x, y, z);
  } else {
    return Math.hypot(x, y);
  }
}

// src/geometry/line/Interpolate.ts
function interpolate(amount, aOrLine, pointBOrAllowOverflow, allowOverflow) {
  if (typeof pointBOrAllowOverflow === `boolean`) {
    allowOverflow = pointBOrAllowOverflow;
    pointBOrAllowOverflow = void 0;
  }
  if (!allowOverflow) throwPercentTest(amount, `amount`);
  else throwNumberTest(amount, ``, `amount`);
  const [a, b] = getPointParameter(aOrLine, pointBOrAllowOverflow);
  const d = length(a, b);
  const d2 = d * (1 - amount);
  if (d === 0 && d2 === 0) return Object.freeze({ ...b });
  const x = b.x - d2 * (b.x - a.x) / d;
  const y = b.y - d2 * (b.y - a.y) / d;
  return Object.freeze({
    ...b,
    x,
    y
  });
}

// src/geometry/line/Angles.ts
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
var perpendicularPoint = (line, distance3, amount = 0) => {
  const origin = interpolate(amount, line);
  const dvn = directionVectorNormalised(line);
  return {
    x: origin.x - dvn.y * distance3,
    y: origin.y + dvn.x * distance3
  };
};

// src/geometry/line/Midpoint.ts
var midpoint = (aOrLine, pointB) => {
  const [a, b] = getPointParameter(aOrLine, pointB);
  return interpolate(0.5, a, b);
};

// src/geometry/line/index.ts
var line_exports = {};
__export(line_exports, {
  Empty: () => Empty2,
  Placeholder: () => Placeholder2,
  angleRadian: () => angleRadian2,
  apply: () => apply2,
  asPoints: () => asPoints,
  bbox: () => bbox2,
  distance: () => distance2,
  distanceSingleLine: () => distanceSingleLine,
  divide: () => divide2,
  extendFromA: () => extendFromA,
  fromFlatArray: () => fromFlatArray,
  fromNumbers: () => fromNumbers,
  fromPivot: () => fromPivot,
  fromPoints: () => fromPoints,
  fromPointsToPath: () => fromPointsToPath,
  getPointParameter: () => getPointParameter,
  guard: () => guard2,
  interpolate: () => interpolate,
  isEmpty: () => isEmpty3,
  isEqual: () => isEqual2,
  isLine: () => isLine,
  isPlaceholder: () => isPlaceholder3,
  isPolyLine: () => isPolyLine,
  joinPointsToLines: () => joinPointsToLines,
  length: () => length,
  midpoint: () => midpoint,
  multiply: () => multiply3,
  nearest: () => nearest,
  normaliseByRect: () => normaliseByRect2,
  parallel: () => parallel,
  perpendicularPoint: () => perpendicularPoint,
  pointAtX: () => pointAtX,
  pointsOf: () => pointsOf,
  relativePosition: () => relativePosition,
  rotate: () => rotate3,
  scaleFromMidpoint: () => scaleFromMidpoint,
  slope: () => slope,
  subtract: () => subtract2,
  sum: () => sum2,
  toFlatArray: () => toFlatArray,
  toPath: () => toPath,
  toString: () => toString3,
  toSvgString: () => toSvgString,
  withinRange: () => withinRange2
});

// src/geometry/rect/Guard.ts
var guardDim = (d, name = `Dimension`) => {
  if (d === void 0) throw new Error(`${name} is undefined`);
  if (Number.isNaN(d)) throw new Error(`${name} is NaN`);
  if (d < 0) throw new Error(`${name} cannot be negative`);
};
var guard3 = (rect, name = `rect`) => {
  if (rect === void 0) throw new Error(`{$name} undefined`);
  if (isPositioned(rect)) guard(rect, name);
  guardDim(rect.width, name + `.width`);
  guardDim(rect.height, name + `.height`);
};
var getRectPositioned = (rect, origin) => {
  guard3(rect);
  if (isPositioned(rect) && origin === void 0) {
    return rect;
  }
  if (origin === void 0) throw new Error(`Unpositioned rect needs origin parameter`);
  return Object.freeze({ ...rect, ...origin });
};
var guardPositioned = (rect, name = `rect`) => {
  if (!isPositioned(rect)) throw new Error(`Expected ${name} to have x,y`);
  guard3(rect, name);
};
var isEmpty2 = (rect) => rect.width === 0 && rect.height === 0;
var isPlaceholder2 = (rect) => Number.isNaN(rect.width) && Number.isNaN(rect.height);
var isPositioned = (p) => p.x !== void 0 && p.y !== void 0;
var isRect = (p) => {
  if (p === void 0) return false;
  if (p.width === void 0) return false;
  if (p.height === void 0) return false;
  return true;
};
var isRectPositioned = (p) => isRect(p) && isPositioned(p);

// src/geometry/point/NormaliseByRect.ts
function normaliseByRect(a, b, c, d) {
  if (isPoint(a)) {
    if (typeof b === `number` && c !== void 0) {
      throwNumberTest(b, `positive`, `width`);
      throwNumberTest(c, `positive`, `height`);
    } else {
      if (!isRect(b)) {
        throw new Error(`Expected second parameter to be a rect`);
      }
      c = b.height;
      b = b.width;
    }
    return Object.freeze({
      x: a.x / b,
      y: a.y / c
    });
  } else {
    throwNumberTest(a, `positive`, `x`);
    if (typeof b !== `number`) {
      throw new TypeError(`Expecting second parameter to be a number (width)`);
    }
    if (typeof c !== `number`) {
      throw new TypeError(`Expecting third parameter to be a number (height)`);
    }
    throwNumberTest(b, `positive`, `y`);
    throwNumberTest(c, `positive`, `width`);
    if (d === void 0) throw new Error(`Expected height parameter`);
    throwNumberTest(d, `positive`, `height`);
    return Object.freeze({
      x: a / c,
      y: b / d
    });
  }
}

// src/geometry/point/GetPointParameter.ts
function getPointParameter2(a, b, c) {
  if (a === void 0) return { x: 0, y: 0 };
  if (Array.isArray(a)) {
    if (a.length === 0) return Object.freeze({ x: 0, y: 0 });
    if (a.length === 1) return Object.freeze({ x: a[0], y: 0 });
    if (a.length === 2) return Object.freeze({ x: a[0], y: a[1] });
    if (a.length === 3) return Object.freeze({ x: a[0], y: a[1], z: a[2] });
    throw new Error(
      `Expected array to be 1-3 elements in length. Got ${a.length}.`
    );
  }
  if (isPoint(a)) {
    return a;
  } else if (typeof a !== `number` || typeof b !== `number`) {
    throw new TypeError(
      `Expected point or x,y as parameters. Got: a: ${JSON.stringify(
        a
      )} b: ${JSON.stringify(b)}`
    );
  }
  if (typeof c === `number`) {
    return Object.freeze({ x: a, y: b, z: c });
  }
  return Object.freeze({ x: a, y: b });
}

// src/geometry/point/Distance.ts
function distance(a, xOrB, y, z) {
  const pt = getPointParameter2(xOrB, y, z);
  guard(pt, `b`);
  guard(a, `a`);
  return isPoint3d(pt) && isPoint3d(a) ? Math.hypot(pt.x - a.x, pt.y - a.y, pt.z - a.z) : Math.hypot(pt.x - a.x, pt.y - a.y);
}

// src/geometry/line/Nearest.ts
var nearest = (line, point2) => {
  const n = (line2) => {
    const { a, b } = line2;
    const atob = { x: b.x - a.x, y: b.y - a.y };
    const atop = { x: point2.x - a.x, y: point2.y - a.y };
    const length5 = atob.x * atob.x + atob.y * atob.y;
    let dot = atop.x * atob.x + atop.y * atob.y;
    const t2 = Math.min(1, Math.max(0, dot / length5));
    dot = (b.x - a.x) * (point2.y - a.y) - (b.y - a.y) * (point2.x - a.x);
    return { x: a.x + atob.x * t2, y: a.y + atob.y * t2 };
  };
  if (Array.isArray(line)) {
    const pts = line.map((l) => n(l));
    const dists = pts.map((p) => distance(p, point2));
    return Object.freeze(pts[minIndex(...dists)]);
  } else {
    return Object.freeze(n(line));
  }
};

// src/geometry/line/DistanceSingleLine.ts
var distanceSingleLine = (line, point2) => {
  guard2(line, `line`);
  guard(point2, `point`);
  if (length(line) === 0) {
    return length(line.a, point2);
  }
  const near = nearest(line, point2);
  return length(near, point2);
};

// src/geometry/point/FindMinimum.ts
var findMinimum = (comparer, ...points) => {
  if (points.length === 0) throw new Error(`No points provided`);
  let min2 = points[0];
  for (const p of points) {
    min2 = comparer(min2, p);
  }
  return min2;
};

// src/geometry/rect/Max.ts
var maxFromCorners = (topLeft, topRight, bottomRight, bottomLeft) => {
  if (topLeft.y > bottomRight.y) {
    throw new Error(`topLeft.y greater than bottomRight.y`);
  }
  if (topLeft.y > bottomLeft.y) {
    throw new Error(`topLeft.y greater than bottomLeft.y`);
  }
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

// src/geometry/point/Bbox.ts
var bbox = (...points) => {
  const leftMost = findMinimum((a, b) => {
    return a.x < b.x ? a : b;
  }, ...points);
  const rightMost = findMinimum((a, b) => {
    return a.x > b.x ? a : b;
  }, ...points);
  const topMost = findMinimum((a, b) => {
    return a.y < b.y ? a : b;
  }, ...points);
  const bottomMost = findMinimum((a, b) => {
    return a.y > b.y ? a : b;
  }, ...points);
  const topLeft = { x: leftMost.x, y: topMost.y };
  const topRight = { x: rightMost.x, y: topMost.y };
  const bottomRight = { x: rightMost.x, y: bottomMost.y };
  const bottomLeft = { x: leftMost.x, y: bottomMost.y };
  return maxFromCorners(topLeft, topRight, bottomRight, bottomLeft);
};

// src/geometry/line/Bbox.ts
var bbox2 = (line) => bbox(line.a, line.b);

// src/geometry/point/Divider.ts
function divide(a, b, c, d) {
  if (isPoint(a)) {
    guard(a, `a`);
    if (isPoint(b)) {
      return Object.freeze({
        x: a.x / b.x,
        y: a.y / b.y
      });
    } else if (isRect(b)) {
      guard3(b, `rect`);
      return Object.freeze({
        x: a.x / b.width,
        y: a.y / b.height
      });
    } else {
      if (c === void 0) c = b;
      guard(a);
      throwNumberTest(b, `nonZero`, `x`);
      throwNumberTest(c, `nonZero`, `y`);
      return Object.freeze({
        x: a.x / b,
        y: a.y / c
      });
    }
  } else {
    if (typeof b !== `number`) {
      throw new TypeError(`expected second parameter to be y1 coord`);
    }
    throwNumberTest(a, `positive`, `x1`);
    throwNumberTest(b, `positive`, `y1`);
    if (c === void 0) c = 1;
    if (d === void 0) d = c;
    throwNumberTest(c, `nonZero`, `x2`);
    throwNumberTest(d, `nonZero`, `y2`);
    return Object.freeze({
      x: a / c,
      y: b / d
    });
  }
}
function divider(a, b, c) {
  const divisor = getPointParameter2(a, b, c);
  guardNonZeroPoint(divisor, `divisor`);
  return (aa, bb, cc) => {
    const dividend = getPointParameter2(aa, bb, cc);
    return typeof dividend.z === `undefined` ? Object.freeze({
      x: dividend.x / divisor.x,
      y: dividend.y / divisor.y
    }) : Object.freeze({
      x: dividend.x / divisor.x,
      y: dividend.y / divisor.y,
      z: dividend.z / (divisor.z ?? 1)
    });
  };
}

// src/geometry/line/Divide.ts
var divide2 = (line, point2) => Object.freeze({
  ...line,
  a: divide(line.a, point2),
  b: divide(line.b, point2)
});

// src/geometry/line/FromFlatArray.ts
var fromFlatArray = (array) => {
  if (!Array.isArray(array)) throw new Error(`arr parameter is not an array`);
  if (array.length !== 4) throw new Error(`array is expected to have length four`);
  return fromNumbers(array[0], array[1], array[2], array[3]);
};

// src/geometry/Polar.ts
var Polar_exports = {};
__export(Polar_exports, {
  clampMagnitude: () => clampMagnitude,
  divide: () => divide3,
  dotProduct: () => dotProduct2,
  fromCartesian: () => fromCartesian,
  guard: () => guard4,
  invert: () => invert,
  isAntiParallel: () => isAntiParallel,
  isOpposite: () => isOpposite,
  isParallel: () => isParallel,
  isPolarCoord: () => isPolarCoord,
  multiply: () => multiply,
  normalise: () => normalise,
  rotate: () => rotate,
  rotateDegrees: () => rotateDegrees,
  spiral: () => spiral,
  spiralRaw: () => spiralRaw,
  toCartesian: () => toCartesian,
  toPoint: () => toPoint,
  toString: () => toString
});

// src/geometry/Angles.ts
function degreeToRadian(angleInDegrees) {
  return Array.isArray(angleInDegrees) ? angleInDegrees.map((v) => v * (Math.PI / 180)) : angleInDegrees * (Math.PI / 180);
}
function radianInvert(angleInRadians) {
  return (angleInRadians + Math.PI) % (2 * Math.PI);
}
function radianToDegree(angleInRadians) {
  return Array.isArray(angleInRadians) ? angleInRadians.map((v) => v * 180 / Math.PI) : angleInRadians * 180 / Math.PI;
}
var radiansFromAxisX = (point2) => Math.atan2(point2.x, point2.y);

// src/geometry/point/Subtract.ts
function subtract(a, b, c, d) {
  if (isPoint(a)) {
    guard(a, `a`);
    if (isPoint(b)) {
      guard(b, `b`);
      return Object.freeze({
        ...a,
        x: a.x - b.x,
        y: a.y - b.y
      });
    } else {
      if (c === void 0) c = b;
      return Object.freeze({
        ...a,
        x: a.x - b,
        y: a.y - c
      });
    }
  } else {
    throwNumberTest(a, ``, `a`);
    if (typeof b !== `number`) {
      throw new TypeError(`Second parameter is expected to by y value`);
    }
    throwNumberTest(b, ``, `b`);
    if (Number.isNaN(c)) throw new Error(`Third parameter is NaN`);
    if (Number.isNaN(d)) throw new Error(`Fourth parameter is NaN`);
    if (c === void 0) c = 0;
    if (d === void 0) d = 0;
    return Object.freeze({
      x: a - c,
      y: b - d
    });
  }
}

// src/geometry/point/Empty.ts
var Empty = { x: 0, y: 0 };

// src/geometry/Polar.ts
var EmptyCartesian = Object.freeze({ x: 0, y: 0 });
var isPolarCoord = (p) => {
  if (p.distance === void 0) return false;
  if (p.angleRadian === void 0) return false;
  return true;
};
var fromCartesian = (point2, origin) => {
  point2 = subtract(point2, origin);
  const angle = Math.atan2(point2.y, point2.x);
  return Object.freeze({
    ...point2,
    angleRadian: angle,
    distance: Math.hypot(point2.x, point2.y)
  });
};
var toCartesian = (a, b, c) => {
  if (isPolarCoord(a)) {
    if (b === void 0) b = Empty;
    if (isPoint(b)) {
      return polarToCartesian(a.distance, a.angleRadian, b);
    }
    throw new Error(
      `Expecting (Coord, Point). Second parameter is not a point`
    );
  } else if (typeof a === `object`) {
    throw new TypeError(
      `First param is an object, but not a Coord: ${JSON.stringify(a)}`
    );
  } else {
    if (typeof a === `number` && typeof b === `number`) {
      if (c === void 0) c = Empty;
      if (!isPoint(c)) {
        throw new Error(
          `Expecting (number, number, Point). Point param wrong type`
        );
      }
      return polarToCartesian(a, b, c);
    } else {
      throw new TypeError(
        `Expecting parameters of (number, number). Got: (${typeof a}, ${typeof b}, ${typeof c}). a: ${JSON.stringify(
          a
        )}`
      );
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
var rotate = (c, amountRadian) => Object.freeze({
  ...c,
  angleRadian: c.angleRadian + amountRadian
});
var normalise = (c) => {
  if (c.distance === 0) throw new Error(`Cannot normalise vector of length 0`);
  return Object.freeze({
    ...c,
    distance: 1
  });
};
var guard4 = (p, name = `Point`) => {
  if (p === void 0) {
    throw new Error(
      `'${name}' is undefined. Expected {distance, angleRadian} got ${JSON.stringify(
        p
      )}`
    );
  }
  if (p === null) {
    throw new Error(
      `'${name}' is null. Expected {distance, angleRadian} got ${JSON.stringify(
        p
      )}`
    );
  }
  if (p.angleRadian === void 0) {
    throw new Error(
      `'${name}.angleRadian' is undefined. Expected {distance, angleRadian} got ${JSON.stringify(
        p
      )}`
    );
  }
  if (p.distance === void 0) {
    throw new Error(
      `'${name}.distance' is undefined. Expected {distance, angleRadian} got ${JSON.stringify(
        p
      )}`
    );
  }
  if (typeof p.angleRadian !== `number`) {
    throw new TypeError(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `'${name}.angleRadian' must be a number. Got ${p.angleRadian}`
    );
  }
  if (typeof p.distance !== `number`) {
    throw new TypeError(`'${name}.distance' must be a number. Got ${p.distance}`);
  }
  if (p.angleRadian === null) throw new Error(`'${name}.angleRadian' is null`);
  if (p.distance === null) throw new Error(`'${name}.distance' is null`);
  if (Number.isNaN(p.angleRadian)) {
    throw new TypeError(`'${name}.angleRadian' is NaN`);
  }
  if (Number.isNaN(p.distance)) throw new Error(`'${name}.distance' is NaN`);
};
var dotProduct2 = (a, b) => {
  guard4(a, `a`);
  guard4(b, `b`);
  return a.distance * b.distance * Math.cos(b.angleRadian - a.angleRadian);
};
var invert = (p) => {
  guard4(p, `c`);
  return Object.freeze({
    ...p,
    angleRadian: p.angleRadian - Math.PI
  });
};
var isOpposite = (a, b) => {
  guard4(a, `a`);
  guard4(b, `b`);
  if (a.distance !== b.distance) return false;
  return a.angleRadian === -b.angleRadian;
};
var isParallel = (a, b) => {
  guard4(a, `a`);
  guard4(b, `b`);
  return a.angleRadian === b.angleRadian;
};
var isAntiParallel = (a, b) => {
  guard4(a, `a`);
  guard4(b, `b`);
  return a.angleRadian === -b.angleRadian;
};
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
var multiply = (v, amt) => {
  guard4(v);
  throwNumberTest(amt, ``, `amt`);
  return Object.freeze({
    ...v,
    distance: v.distance * amt
  });
};
var divide3 = (v, amt) => {
  guard4(v);
  throwNumberTest(amt, ``, `amt`);
  return Object.freeze({
    ...v,
    distance: v.distance / amt
  });
};
var clampMagnitude = (v, max2 = 1, min2 = 0) => {
  let mag = v.distance;
  if (mag > max2) mag = max2;
  if (mag < min2) mag = min2;
  return Object.freeze({
    ...v,
    distance: mag
  });
};
var polarToCartesian = (distance3, angleRadians, origin = Empty) => {
  guard(origin);
  return Object.freeze({
    x: origin.x + distance3 * Math.cos(angleRadians),
    y: origin.y + distance3 * Math.sin(angleRadians)
  });
};
var toString = (p, digits) => {
  if (p === void 0) return `(undefined)`;
  if (p === null) return `(null)`;
  const angleDeg = radianToDegree(p.angleRadian);
  const d = digits ? p.distance.toFixed(digits) : p.distance;
  const a = digits ? angleDeg.toFixed(digits) : angleDeg;
  return `(${d},${a})`;
};
var toPoint = (v, origin = EmptyCartesian) => {
  guard4(v, `v`);
  return Object.freeze({
    x: origin.x + v.distance * Math.cos(v.angleRadian),
    y: origin.y + v.distance * Math.sin(v.angleRadian)
  });
};

// src/geometry/line/FromPivot.ts
var fromPivot = (origin = { x: 0.5, y: 0.5 }, length5 = 1, angleRadian3 = 0, balance = 0.5) => {
  const left = length5 * balance;
  const right = length5 * (1 - balance);
  const a = toCartesian(left, radianInvert(angleRadian3), origin);
  const b = toCartesian(right, angleRadian3, origin);
  return Object.freeze({
    a,
    b
  });
};

// src/geometry/line/FromPointsToPath.ts
var fromPointsToPath = (a, b) => toPath(fromPoints(a, b));

// src/geometry/point/IsEqual.ts
var isEqual = (...p) => {
  if (p === void 0) throw new Error(`parameter 'p' is undefined`);
  if (p.length < 2) return true;
  for (let index = 1; index < p.length; index++) {
    if (p[index].x !== p[0].x) return false;
    if (p[index].y !== p[0].y) return false;
  }
  return true;
};

// src/geometry/line/IsEqual.ts
var isEqual2 = (a, b) => isEqual(a.a, b.a) && isEqual(a.b, b.b);

// src/geometry/point/index.ts
var point_exports = {};
__export(point_exports, {
  Empty: () => Empty,
  Placeholder: () => Placeholder,
  abs: () => abs,
  angleRadian: () => angleRadian,
  apply: () => apply,
  bbox: () => bbox,
  centroid: () => centroid,
  clamp: () => clamp2,
  clampMagnitude: () => clampMagnitude2,
  compare: () => compare,
  compareByX: () => compareByX,
  convexHull: () => convexHull,
  distance: () => distance,
  distanceToCenter: () => distanceToCenter,
  distanceToExterior: () => distanceToExterior,
  divide: () => divide,
  divider: () => divider,
  dotProduct: () => dotProduct3,
  findMinimum: () => findMinimum,
  from: () => from,
  fromNumbers: () => fromNumbers2,
  getPointParameter: () => getPointParameter2,
  guard: () => guard,
  guardNonZeroPoint: () => guardNonZeroPoint,
  interpolate: () => interpolate2,
  invert: () => invert2,
  isEmpty: () => isEmpty,
  isEqual: () => isEqual,
  isNaN: () => isNaN,
  isNull: () => isNull,
  isPlaceholder: () => isPlaceholder,
  isPoint: () => isPoint,
  isPoint3d: () => isPoint3d,
  leftmost: () => leftmost,
  multiply: () => multiply2,
  multiplyScalar: () => multiplyScalar,
  normalise: () => normalise2,
  normaliseByRect: () => normaliseByRect,
  pipeline: () => pipeline,
  pipelineApply: () => pipelineApply,
  progressBetween: () => progressBetween,
  project: () => project,
  quantiseEvery: () => quantiseEvery2,
  random: () => random,
  reduce: () => reduce,
  relation: () => relation,
  rightmost: () => rightmost,
  rotate: () => rotate2,
  rotatePointArray: () => rotatePointArray,
  round: () => round2,
  subtract: () => subtract,
  sum: () => sum,
  toArray: () => toArray,
  toIntegerValues: () => toIntegerValues,
  toString: () => toString2,
  withinRange: () => withinRange,
  wrap: () => wrap2
});

// src/geometry/point/Abs.ts
var abs = (pt) => ({
  ...pt,
  x: Math.abs(pt.x),
  y: Math.abs(pt.y)
});

// src/geometry/point/Angle.ts
var angleRadian = (a, b, c) => {
  guard(a, `a`);
  if (b === void 0) {
    return Math.atan2(a.y, a.x);
  }
  guard(b, `b`);
  if (c === void 0) {
    return Math.atan2(b.y - a.y, b.x - a.x);
  }
  guard(c, `c`);
  return Math.atan2(b.y - a.y, b.x - a.x) - Math.atan2(c.y - a.y, c.x - a.x);
};

// src/geometry/point/Apply.ts
var apply = (pt, fn) => {
  guard(pt, `pt`);
  return Object.freeze({
    ...pt,
    x: fn(pt.x, `x`),
    y: fn(pt.y, `y`)
  });
};

// src/geometry/point/Centroid.ts
var centroid = (...points) => {
  if (!Array.isArray(points)) throw new Error(`Expected list of points`);
  const sum5 = points.reduce(
    (previous, p) => {
      if (p === void 0) return previous;
      if (Array.isArray(p)) {
        throw new TypeError(
          `'points' list contains an array. Did you mean: centroid(...myPoints)?`
        );
      }
      if (!isPoint(p)) {
        throw new Error(
          `'points' contains something which is not a point: ${JSON.stringify(
            p
          )}`
        );
      }
      return {
        x: previous.x + p.x,
        y: previous.y + p.y
      };
    },
    { x: 0, y: 0 }
  );
  return Object.freeze({
    x: sum5.x / points.length,
    y: sum5.y / points.length
  });
};

// src/geometry/point/Clamp.ts
function clamp2(a, b, c, d) {
  if (isPoint(a)) {
    if (b === void 0) b = 0;
    if (c === void 0) c = 1;
    throwNumberTest(b, ``, `min`);
    throwNumberTest(c, ``, `max`);
    return Object.freeze({
      x: clamp(a.x, b, c),
      y: clamp(a.y, b, c)
    });
  } else {
    if (b === void 0) throw new Error(`Expected y coordinate`);
    if (c === void 0) c = 0;
    if (d === void 0) d = 1;
    throwNumberTest(a, ``, `x`);
    throwNumberTest(b, ``, `y`);
    throwNumberTest(c, ``, `min`);
    throwNumberTest(d, ``, `max`);
    return Object.freeze({
      x: clamp(a, c, d),
      y: clamp(b, c, d)
    });
  }
}

// src/geometry/point/Compare.ts
var compare = (a, b) => {
  if (a.x < b.x && a.y < b.y) return -2;
  if (a.x > b.x && a.y > b.y) return 2;
  if (a.x < b.x || a.y < b.y) return -1;
  if (a.x > b.x || a.y > b.y) return 1;
  if (a.x === b.x && a.x === b.y) return 0;
  return Number.NaN;
};
var compareByX = (a, b) => a.x - b.x || a.y - b.y;

// src/geometry/point/ConvexHull.ts
var convexHull = (...pts) => {
  const sorted = [...pts].sort(compareByX);
  if (sorted.length === 1) return sorted;
  const x = (points) => {
    const v = [];
    for (const p of points) {
      while (v.length >= 2) {
        const q = v.at(-1);
        const r = v.at(-2);
        if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x)) {
          v.pop();
        } else break;
      }
      v.push(p);
    }
    v.pop();
    return v;
  };
  const upper = x(sorted);
  const lower = x(sorted.reverse());
  if (upper.length === 1 && lower.length === 1 && isEqual(lower[0], upper[0])) {
    return upper;
  }
  return [...upper, ...lower];
};

// src/geometry/circle/Guard.ts
var guard5 = (circle, parameterName = `circle`) => {
  if (isCirclePositioned(circle)) {
    guard(circle, `circle`);
  }
  if (Number.isNaN(circle.radius)) throw new Error(`${parameterName}.radius is NaN`);
  if (circle.radius <= 0) throw new Error(`${parameterName}.radius must be greater than zero`);
};
var guardPositioned2 = (circle, parameterName = `circle`) => {
  if (!isCirclePositioned(circle)) throw new Error(`Expected a positioned circle with x,y`);
  guard5(circle, parameterName);
};
var isNaN2 = (a) => {
  if (Number.isNaN(a.radius)) return true;
  if (isCirclePositioned(a)) {
    if (Number.isNaN(a.x)) return true;
    if (Number.isNaN(a.y)) return true;
  }
  return false;
};
var isPositioned2 = (p) => p.x !== void 0 && p.y !== void 0;
var isCircle = (p) => p.radius !== void 0;
var isCirclePositioned = (p) => isCircle(p) && isPositioned2(p);

// src/geometry/circle/DistanceCenter.ts
var distanceCenter = (a, b) => {
  guardPositioned2(a, `a`);
  if (isCirclePositioned(b)) {
    guardPositioned2(b, `b`);
  }
  return distance(a, b);
};

// src/geometry/circle/DistanceFromExterior.ts
var distanceFromExterior = (a, b) => {
  guardPositioned2(a, `a`);
  if (isCirclePositioned(b)) {
    return Math.max(0, distanceCenter(a, b) - a.radius - b.radius);
  } else if (isPoint(b)) {
    const distribution = distance(a, b);
    if (distribution < a.radius) return 0;
    return distribution;
  } else throw new Error(`Second parameter invalid type`);
};

// src/geometry/circle/IsEqual.ts
var isEqual3 = (a, b) => {
  if (a.radius !== b.radius) return false;
  if (isCirclePositioned(a) && isCirclePositioned(b)) {
    if (a.x !== b.x) return false;
    if (a.y !== b.y) return false;
    if (a.z !== b.z) return false;
    return true;
  } else if (!isCirclePositioned(a) && !isCirclePositioned(b)) {
  } else return false;
  return false;
};

// src/geometry/point/Sum.ts
var sum = function(a, b, c, d) {
  if (a === void 0) throw new TypeError(`a missing`);
  let ptA;
  let ptB;
  if (isPoint(a)) {
    ptA = a;
    if (b === void 0) b = Empty;
    if (isPoint(b)) {
      ptB = b;
    } else {
      if (b === void 0) throw new Error(`Expects x coordinate`);
      ptB = { x: b, y: c ?? b };
    }
  } else if (!isPoint(b)) {
    if (b === void 0) throw new Error(`Expected number as second param`);
    ptA = { x: a, y: b };
    if (c === void 0) throw new Error(`Expects x coordiante`);
    ptB = { x: c, y: d ?? 0 };
  }
  if (ptA === void 0) throw new Error(`ptA missing. a: ${JSON.stringify(a)}`);
  if (ptB === void 0) throw new Error(`ptB missing. b: ${JSON.stringify(b)}`);
  guard(ptA, `a`);
  guard(ptB, `b`);
  return Object.freeze({
    x: ptA.x + ptB.x,
    y: ptA.y + ptB.y
  });
};

// src/geometry/circle/Intersections.ts
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
  if (Number.isNaN(d)) return [];
  const u1 = (b - d) / c;
  const u2 = (b + d) / c;
  const returnValue = [];
  if (u1 <= 1 && u1 >= 0) {
    returnValue.push({
      x: line.a.x + v1.x * u1,
      y: line.a.y + v1.y * u1
    });
  }
  if (u2 <= 1 && u2 >= 0) {
    returnValue.push({
      x: line.a.x + v1.x * u2,
      y: line.a.y + v1.y * u2
    });
  }
  return returnValue;
};
var intersections = (a, b) => {
  const vector = subtract(b, a);
  const centerD = Math.hypot(vector.y, vector.x);
  if (centerD > a.radius + b.radius) return [];
  if (centerD < Math.abs(a.radius - b.radius)) return [];
  if (isEqual3(a, b)) return [];
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
    sum(centroid3, intersection),
    subtract(centroid3, intersection)
  ];
};

// src/geometry/Intersects.ts
var circleRect = (a, b) => {
  const deltaX = a.x - Math.max(b.x, Math.min(a.x, b.x + b.width));
  const deltaY = a.y - Math.max(b.y, Math.min(a.y, b.y + b.height));
  return deltaX * deltaX + deltaY * deltaY < a.radius * a.radius;
};
var circleCircle = (a, b) => intersections(a, b).length === 2;

// src/geometry/rect/Intersects.ts
function intersectsPoint(rect, a, b) {
  guard3(rect, `rect`);
  let x = 0;
  let y = 0;
  if (typeof a === `number`) {
    if (b === void 0) throw new Error(`x and y coordinate needed`);
    x = a;
    y = b;
  } else {
    x = a.x;
    y = a.y;
  }
  if (isPositioned(rect)) {
    if (x - rect.x > rect.width || x < rect.x) return false;
    if (y - rect.y > rect.height || y < rect.y) return false;
  } else {
    if (x > rect.width || x < 0) return false;
    if (y > rect.height || y < 0) return false;
  }
  return true;
}
var isIntersecting = (a, b) => {
  if (!isRectPositioned(a)) {
    throw new Error(`a parameter should be RectPositioned`);
  }
  if (isCirclePositioned(b)) {
    return circleRect(b, a);
  } else if (isPoint(b)) {
    return intersectsPoint(a, b);
  }
  throw new Error(`Unknown shape for b: ${JSON.stringify(b)}`);
};

// src/geometry/rect/Center.ts
var center = (rect, origin) => {
  guard3(rect);
  if (origin === void 0 && isPoint(rect)) origin = rect;
  else if (origin === void 0) origin = { x: 0, y: 0 };
  const r = getRectPositioned(rect, origin);
  return Object.freeze({
    x: origin.x + rect.width / 2,
    y: origin.y + rect.height / 2
  });
};

// src/geometry/point/PointType.ts
var Placeholder = Object.freeze({ x: Number.NaN, y: Number.NaN });

// src/geometry/rect/Distance.ts
var distanceFromExterior2 = (rect, pt) => {
  guardPositioned(rect, `rect`);
  guard(pt, `pt`);
  if (intersectsPoint(rect, pt)) return 0;
  const dx = Math.max(rect.x - pt.x, 0, pt.x - rect.x + rect.width);
  const dy = Math.max(rect.y - pt.y, 0, pt.y - rect.y + rect.height);
  return Math.hypot(dx, dy);
};
var distanceFromCenter = (rect, pt) => distance(center(rect), pt);

// src/geometry/point/DistanceToCenter.ts
var distanceToCenter = (a, shape) => {
  if (isRectPositioned(shape)) {
    return distanceFromExterior2(shape, a);
  }
  if (isCirclePositioned(shape)) {
    return distanceFromExterior(shape, a);
  }
  if (isPoint(shape)) return distance(a, shape);
  throw new Error(`Unknown shape`);
};

// src/geometry/point/DistanceToExterior.ts
var distanceToExterior = (a, shape) => {
  if (isRectPositioned(shape)) {
    return distanceFromExterior2(shape, a);
  }
  if (isCirclePositioned(shape)) {
    return distanceFromExterior(shape, a);
  }
  if (isPoint(shape)) return distance(a, shape);
  throw new Error(`Unknown shape`);
};

// src/geometry/point/ToArray.ts
var toArray = (p) => [p.x, p.y];

// src/geometry/point/DotProduct.ts
var dotProduct3 = (...pts) => {
  const a = pts.map((p) => toArray(p));
  return dotProduct(a);
};

// src/geometry/point/From.ts
var from = (xOrArray, y) => {
  if (Array.isArray(xOrArray)) {
    if (xOrArray.length !== 2) {
      throw new Error(`Expected array of length two, got ${xOrArray.length}`);
    }
    return Object.freeze({
      x: xOrArray[0],
      y: xOrArray[1]
    });
  } else {
    if (xOrArray === void 0) xOrArray = 0;
    else if (Number.isNaN(xOrArray)) throw new Error(`x is NaN`);
    if (y === void 0) y = 0;
    else if (Number.isNaN(y)) throw new Error(`y is NaN`);
    return Object.freeze({ x: xOrArray, y });
  }
};
var fromNumbers2 = (...coords) => {
  const pts = [];
  if (Array.isArray(coords[0])) {
    for (const coord of coords) {
      if (!(coord.length % 2 === 0)) {
        throw new Error(`coords array should be even-numbered`);
      }
      pts.push(Object.freeze({ x: coord[0], y: coord[1] }));
    }
  } else {
    if (coords.length % 2 !== 0) {
      throw new Error(`Expected even number of elements: [x,y,x,y...]`);
    }
    for (let index = 0; index < coords.length; index += 2) {
      pts.push(
        Object.freeze({ x: coords[index], y: coords[index + 1] })
      );
    }
  }
  return pts;
};

// src/geometry/point/Interpolate.ts
var interpolate2 = (amount, a, b, allowOverflow = false) => interpolate(amount, a, b, allowOverflow);

// src/geometry/point/Invert.ts
var invert2 = (pt, what = `both`) => {
  switch (what) {
    case `both`: {
      return isPoint3d(pt) ? Object.freeze({
        ...pt,
        x: pt.x * -1,
        y: pt.y * -1,
        z: pt.z * -1
      }) : Object.freeze({
        ...pt,
        x: pt.x * -1,
        y: pt.y * -1
      });
    }
    case `x`: {
      return Object.freeze({
        ...pt,
        x: pt.x * -1
      });
    }
    case `y`: {
      return Object.freeze({
        ...pt,
        y: pt.y * -1
      });
    }
    case `z`: {
      if (isPoint3d(pt)) {
        return Object.freeze({
          ...pt,
          z: pt.z * -1
        });
      } else throw new Error(`pt parameter is missing z`);
    }
    default: {
      throw new Error(`Unknown what parameter. Expecting 'both', 'x' or 'y'`);
    }
  }
};

// src/geometry/point/Multiply.ts
function multiply2(a, bOrX, y) {
  guard(a, `a`);
  if (typeof bOrX === `number`) {
    if (typeof y === `undefined`) y = bOrX;
    throwNumberTest(y, ``, `y`);
    throwNumberTest(bOrX, ``, `x`);
    return Object.freeze({ x: a.x * bOrX, y: a.y * y });
  } else if (isPoint(bOrX)) {
    guard(bOrX, `b`);
    return Object.freeze({
      x: a.x * bOrX.x,
      y: a.y * bOrX.y
    });
  } else if (isRect(bOrX)) {
    guard3(bOrX, `rect`);
    return Object.freeze({
      x: a.x * bOrX.width,
      y: a.y * bOrX.height
    });
  } else {
    throw new Error(
      `Invalid arguments. a: ${JSON.stringify(a)} b: ${JSON.stringify(bOrX)}`
    );
  }
}
var multiplyScalar = (pt, v) => {
  return isPoint3d(pt) ? Object.freeze({
    ...pt,
    x: pt.x * v,
    y: pt.y * v,
    z: pt.z * v
  }) : Object.freeze({
    ...pt,
    x: pt.x * v,
    y: pt.y * v
  });
};

// src/geometry/point/Magnitude.ts
var clampMagnitude2 = (pt, max2 = 1, min2 = 0) => {
  const length5 = distance(pt);
  let ratio = 1;
  if (length5 > max2) {
    ratio = max2 / length5;
  } else if (length5 < min2) {
    ratio = min2 / length5;
  }
  return ratio === 1 ? pt : multiply2(pt, ratio, ratio);
};

// src/geometry/point/Most.ts
var leftmost = (...points) => findMinimum((a, b) => a.x <= b.x ? a : b, ...points);
var rightmost = (...points) => findMinimum((a, b) => a.x >= b.x ? a : b, ...points);

// src/geometry/point/Normalise.ts
var length2 = (ptOrX, y) => {
  if (isPoint(ptOrX)) {
    y = ptOrX.y;
    ptOrX = ptOrX.x;
  }
  if (y === void 0) throw new Error(`Expected y`);
  return Math.hypot(ptOrX, y);
};
var normalise2 = (ptOrX, y) => {
  const pt = getPointParameter2(ptOrX, y);
  const l = length2(pt);
  if (l === 0) return Empty;
  return Object.freeze({
    ...pt,
    x: pt.x / l,
    y: pt.y / l
  });
};

// src/geometry/point/Pipeline.ts
var pipelineApply = (point2, ...pipelineFns) => pipeline(...pipelineFns)(point2);
var pipeline = (...pipeline2) => (pt) => (
  // eslint-disable-next-line unicorn/no-array-reduce
  pipeline2.reduce((previous, current) => current(previous), pt)
);

// src/geometry/point/ProgressBetween.ts
var progressBetween = (position, waypointA, waypointB) => {
  const a = subtract(position, waypointA);
  const b = subtract(waypointB, waypointA);
  return isPoint3d(a) && isPoint3d(b) ? (a.x * b.x + a.y * b.y + a.z * b.z) / (b.x * b.x + b.y * b.y + b.z * b.z) : (a.x * b.x + a.y * b.y) / (b.x * b.x + b.y * b.y);
};

// src/geometry/point/Project.ts
var project = (origin, distance3, angle) => {
  const x = Math.cos(angle) * distance3 + origin.x;
  const y = Math.sin(angle) * distance3 + origin.y;
  return { x, y };
};

// src/geometry/point/Quantise.ts
var quantiseEvery2 = (pt, snap, middleRoundsUp = true) => {
  guard(pt, `pt`);
  guard(snap, `snap`);
  return Object.freeze({
    x: quantiseEvery(pt.x, snap.x, middleRoundsUp),
    y: quantiseEvery(pt.y, snap.y, middleRoundsUp)
  });
};

// src/geometry/point/Random.ts
var random = (rando) => {
  if (rando === void 0) rando = defaultRandom;
  return Object.freeze({
    x: rando(),
    y: rando()
  });
};

// src/geometry/point/Reduce.ts
var reduce = (pts, fn, initial) => {
  if (initial === void 0) initial = { x: 0, y: 0 };
  let accumulator = initial;
  for (const p of pts) {
    accumulator = fn(p, accumulator);
  }
  ;
  return accumulator;
};

// src/geometry/point/Relation.ts
var relation = (a, b) => {
  const start = getPointParameter2(a, b);
  let totalX = 0;
  let totalY = 0;
  let count = 0;
  let lastUpdate = performance.now();
  let lastPoint = start;
  const update = (aa, bb) => {
    const p = getPointParameter2(aa, bb);
    totalX += p.x;
    totalY += p.y;
    count++;
    const distanceFromStart = distance(p, start);
    const distanceFromLast = distance(p, lastPoint);
    const now = performance.now();
    const speed = distanceFromLast / (now - lastUpdate);
    lastUpdate = now;
    lastPoint = p;
    return Object.freeze({
      angle: angleRadian(p, start),
      distanceFromStart,
      distanceFromLast,
      speed,
      centroid: centroid(p, start),
      average: {
        x: totalX / count,
        y: totalY / count
      }
    });
  };
  return update;
};

// src/geometry/point/Rotate.ts
function rotate2(pt, amountRadian, origin) {
  if (origin === void 0) origin = { x: 0, y: 0 };
  guard(origin, `origin`);
  throwNumberTest(amountRadian, ``, `amountRadian`);
  const arrayInput = Array.isArray(pt);
  if (amountRadian === 0) return pt;
  if (!arrayInput) {
    pt = [pt];
  }
  const ptAr = pt;
  for (const [index, p] of ptAr.entries()) guard(p, `pt[${index}]`);
  const asPolar = ptAr.map((p) => fromCartesian(p, origin));
  const rotated = asPolar.map((p) => rotate(p, amountRadian));
  const asCartesisan = rotated.map((p) => toCartesian(p, origin));
  return arrayInput ? asCartesisan : asCartesisan[0];
}

// src/geometry/point/RotatePointArray.ts
var rotatePointArray = (v, amountRadian) => {
  const mat = [
    [Math.cos(amountRadian), -Math.sin(amountRadian)],
    [Math.sin(amountRadian), Math.cos(amountRadian)]
  ];
  const result = [];
  for (const [index, element] of v.entries()) {
    result[index] = [
      mat[0][0] * element[0] + mat[0][1] * element[1],
      mat[1][0] * element[0] + mat[1][1] * element[1]
    ];
  }
  return result;
};

// src/geometry/point/Round.ts
var round2 = (ptOrX, yOrDigits, digits) => {
  const pt = getPointParameter2(ptOrX, yOrDigits);
  digits = digits ?? yOrDigits;
  digits = digits ?? 2;
  return Object.freeze({
    ...pt,
    x: round(digits, pt.x),
    y: round(digits, pt.y)
  });
};

// src/geometry/point/To.ts
var toIntegerValues = (pt, rounder = Math.round) => {
  guard(pt, `pt`);
  return Object.freeze({
    x: rounder(pt.x),
    y: rounder(pt.y)
  });
};
function toString2(p, digits) {
  if (p === void 0) return `(undefined)`;
  if (p === null) return `(null)`;
  guard(p, `pt`);
  const x = digits ? p.x.toFixed(digits) : p.x;
  const y = digits ? p.y.toFixed(digits) : p.y;
  if (p.z === void 0) {
    return `(${x},${y})`;
  } else {
    const z = digits ? p.z.toFixed(digits) : p.z;
    return `(${x},${y},${z})`;
  }
}

// src/geometry/point/WithinRange.ts
var withinRange = (a, b, maxRange) => {
  guard(a, `a`);
  guard(b, `b`);
  if (typeof maxRange === `number`) {
    throwNumberTest(maxRange, `positive`, `maxRange`);
    maxRange = { x: maxRange, y: maxRange };
  } else {
    guard(maxRange, `maxRange`);
  }
  const x = Math.abs(b.x - a.x);
  const y = Math.abs(b.y - a.y);
  return x <= maxRange.x && y <= maxRange.y;
};

// src/geometry/point/Wrap.ts
var wrap2 = (pt, ptMax, ptMin) => {
  if (ptMax === void 0) ptMax = { x: 1, y: 1 };
  if (ptMin === void 0) ptMin = { x: 0, y: 0 };
  guard(pt, `pt`);
  guard(ptMax, `ptMax`);
  guard(ptMin, `ptMin`);
  return Object.freeze({
    x: wrap(pt.x, ptMin.x, ptMax.x),
    y: wrap(pt.y, ptMin.y, ptMax.y)
  });
};

// src/geometry/line/Multiply.ts
var multiply3 = (line, point2) => Object.freeze({
  ...line,
  a: multiply2(line.a, point2),
  b: multiply2(line.b, point2)
});

// src/geometry/line/RelativePosition.ts
var relativePosition = (line, pt) => {
  const fromStart = distance(line.a, pt);
  const total = length(line);
  return fromStart / total;
};

// src/geometry/line/Rotate.ts
var rotate3 = (line, amountRadian, origin) => {
  if (amountRadian === void 0 || amountRadian === 0) return line;
  if (origin === void 0) origin = 0.5;
  if (typeof origin === `number`) {
    origin = interpolate(origin, line.a, line.b);
  }
  return Object.freeze({
    ...line,
    a: rotate2(line.a, amountRadian, origin),
    b: rotate2(line.b, amountRadian, origin)
  });
};

// src/geometry/line/Subtract.ts
var subtract2 = (line, point2) => Object.freeze({
  ...line,
  a: subtract(line.a, point2),
  b: subtract(line.b, point2)
});

// src/geometry/line/Sum.ts
var sum2 = (line, point2) => Object.freeze({
  ...line,
  a: sum(line.a, point2),
  b: sum(line.b, point2)
});

// src/geometry/line/ToString.ts
function toString3(a, b) {
  if (isLine(a)) {
    guard2(a, `a`);
    b = a.b;
    a = a.a;
  } else if (b === void 0) throw new Error(`Expect second point if first is a point`);
  return toString2(a) + `-` + toString2(b);
}

// src/geometry/line/index.ts
var Empty2 = Object.freeze({
  a: Object.freeze({ x: 0, y: 0 }),
  b: Object.freeze({ x: 0, y: 0 })
});
var Placeholder2 = Object.freeze({
  a: Object.freeze({ x: Number.NaN, y: Number.NaN }),
  b: Object.freeze({ x: Number.NaN, y: Number.NaN })
});
var isEmpty3 = (l) => isEmpty(l.a) && isEmpty(l.b);
var isPlaceholder3 = (l) => isPlaceholder(l.a) && isPlaceholder(l.b);
var apply2 = (line, fn) => Object.freeze(
  {
    ...line,
    a: fn(line.a),
    b: fn(line.b)
  }
);
var angleRadian2 = (lineOrPoint, b) => {
  let a;
  if (isLine(lineOrPoint)) {
    a = lineOrPoint.a;
    b = lineOrPoint.b;
  } else {
    a = lineOrPoint;
    if (b === void 0) throw new Error(`b point must be provided`);
  }
  return Math.atan2(b.y - a.y, b.x - a.x);
};
var normaliseByRect2 = (line, width, height4) => Object.freeze({
  ...line,
  a: normaliseByRect(line.a, width, height4),
  b: normaliseByRect(line.b, width, height4)
});
var withinRange2 = (line, point2, maxRange) => {
  const calculatedDistance = distance2(line, point2);
  return calculatedDistance <= maxRange;
};
var slope = (lineOrPoint, b) => {
  let a;
  if (isLine(lineOrPoint)) {
    a = lineOrPoint.a;
    b = lineOrPoint.b;
  } else {
    a = lineOrPoint;
    if (b === void 0) throw new Error(`b parameter required`);
  }
  if (b === void 0) {
    throw new TypeError(`Second point missing`);
  } else {
    return (b.y - a.y) / (b.x - a.x);
  }
};
var scaleFromMidpoint = (line, factor) => {
  const a = interpolate(factor / 2, line);
  const b = interpolate(0.5 + factor / 2, line);
  return { a, b };
};
var pointAtX = (line, x) => {
  const y = line.a.y + (x - line.a.x) * slope(line);
  return Object.freeze({ x, y });
};
var extendFromA = (line, distance3) => {
  const calculatedLength = length(line);
  return Object.freeze({
    ...line,
    a: line.a,
    b: Object.freeze({
      x: line.b.x + (line.b.x - line.a.x) / calculatedLength * distance3,
      y: line.b.y + (line.b.y - line.a.y) / calculatedLength * distance3
    })
  });
};
function* pointsOf(line) {
  const { a, b } = line;
  let x0 = Math.floor(a.x);
  let y0 = Math.floor(a.y);
  const x1 = Math.floor(b.x);
  const y1 = Math.floor(b.y);
  const dx = Math.abs(x1 - x0);
  const dy = -Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx + dy;
  while (true) {
    yield { x: x0, y: y0 };
    if (x0 === x1 && y0 === y1) break;
    const e2 = 2 * err;
    if (e2 >= dy) {
      err += dy;
      x0 += sx;
    }
    if (e2 <= dx) {
      err += dx;
      y0 += sy;
    }
  }
}
var distance2 = (line, point2) => {
  if (Array.isArray(line)) {
    const distances = line.map((l) => distanceSingleLine(l, point2));
    return minFast(distances);
  } else {
    return distanceSingleLine(line, point2);
  }
};
var toFlatArray = (a, b) => {
  if (isLine(a)) {
    return [a.a.x, a.a.y, a.b.x, a.b.y];
  } else if (isPoint(a) && isPoint(b)) {
    return [a.x, a.y, b.x, b.y];
  } else {
    throw new Error(`Expected single line parameter, or a and b points`);
  }
};
function* asPoints(lines) {
  for (const l of lines) {
    yield l.a;
    yield l.b;
  }
}
var toSvgString = (a, b) => [`M${a.x} ${a.y} L ${b.x} ${b.y}`];

// src/geometry/line/ToPath.ts
var toPath = (line) => {
  const { a, b } = line;
  return Object.freeze({
    ...line,
    length: () => length(a, b),
    interpolate: (amount) => interpolate(amount, a, b),
    relativePosition: (point2) => relativePosition(line, point2),
    bbox: () => bbox2(line),
    toString: () => toString3(a, b),
    toFlatArray: () => toFlatArray(a, b),
    toSvgString: () => toSvgString(a, b),
    toPoints: () => [a, b],
    rotate: (amountRadian, origin) => toPath(rotate3(line, amountRadian, origin)),
    nearest: (point2) => nearest(line, point2),
    sum: (point2) => toPath(sum2(line, point2)),
    divide: (point2) => toPath(divide2(line, point2)),
    multiply: (point2) => toPath(multiply3(line, point2)),
    subtract: (point2) => toPath(subtract2(line, point2)),
    midpoint: () => midpoint(a, b),
    distanceToPoint: (point2) => distanceSingleLine(line, point2),
    parallel: (distance3) => parallel(line, distance3),
    perpendicularPoint: (distance3, amount) => perpendicularPoint(line, distance3, amount),
    slope: () => slope(line),
    withinRange: (point2, maxRange) => withinRange2(line, point2, maxRange),
    isEqual: (otherLine) => isEqual2(line, otherLine),
    apply: (fn) => toPath(apply2(line, fn)),
    kind: `line`
  });
};

// src/geometry/Waypoint.ts
var fromPoints2 = (waypoints, opts = {}) => {
  const lines = joinPointsToLines(...waypoints);
  return init(
    lines.map((l) => toPath(l)),
    opts
  );
};
var init = (paths, opts = {}) => {
  const maxDistanceFromLine = opts.maxDistanceFromLine ?? 0.1;
  const checkUnordered = (pt) => {
    const results = paths.map((p, index) => {
      const nearest3 = p.nearest(pt);
      const distance3 = distance(pt, nearest3);
      const positionRelative = p.relativePosition(nearest3, maxDistanceFromLine);
      ;
      return { positionRelative, path: p, index, nearest: nearest3, distance: distance3, rank: Number.MAX_SAFE_INTEGER };
    });
    const filtered = results.filter((v) => v.distance <= maxDistanceFromLine);
    const sorted = sortByNumericProperty(filtered, `distance`);
    for (let rank = 0; rank < sorted.length; rank++) {
      sorted[rank].rank = rank;
    }
    return sorted;
  };
  return checkUnordered;
};

// src/geometry/Layout.ts
var Layout_exports = {};
__export(Layout_exports, {
  CirclePacking: () => CirclePacking_exports
});

// src/geometry/CirclePacking.ts
var CirclePacking_exports = {};
__export(CirclePacking_exports, {
  random: () => random3
});

// src/geometry/shape/index.ts
var shape_exports = {};
__export(shape_exports, {
  arrow: () => arrow,
  center: () => center3,
  isIntersecting: () => isIntersecting3,
  randomPoint: () => randomPoint3,
  starburst: () => starburst
});

// src/geometry/rect/Corners.ts
var corners = (rect, origin) => {
  const r = getRectPositioned(rect, origin);
  return [
    { x: r.x, y: r.y },
    { x: r.x + r.width, y: r.y },
    { x: r.x + r.width, y: r.y + r.height },
    { x: r.x, y: r.y + r.height }
  ];
};

// src/geometry/rect/FromTopLeft.ts
var fromTopLeft = (origin, width, height4) => {
  guardDim(width, `width`);
  guardDim(height4, `height`);
  guard(origin, `origin`);
  return { x: origin.x, y: origin.y, width, height: height4 };
};

// src/geometry/circle/IsContainedBy.ts
var isContainedBy = (a, b, c) => {
  const d = distanceCenter(a, b);
  if (isCircle(b)) {
    return d < Math.abs(a.radius - b.radius);
  } else if (isPoint(b)) {
    if (c === void 0) {
      return d <= a.radius;
    } else {
      return d < Math.abs(a.radius - c);
    }
  } else throw new Error(`b parameter is expected to be CirclePositioned or Point`);
};

// src/geometry/circle/Intersecting.ts
var isIntersecting2 = (a, b, c) => {
  if (isEqual(a, b)) return true;
  if (isContainedBy(a, b, c)) return true;
  if (isCircle(b)) {
    return circleCircle(a, b);
  } else if (isRectPositioned(b)) {
    return circleRect(a, b);
  } else if (isPoint(b) && c !== void 0) {
    return circleCircle(a, { ...b, radius: c });
  }
  return false;
};

// src/geometry/circle/Random.ts
var piPi = Math.PI * 2;
var randomPoint = (within, opts = {}) => {
  const offset2 = isCirclePositioned(within) ? within : { x: 0, y: 0 };
  const strategy = opts.strategy ?? `uniform`;
  const margin = opts.margin ?? 0;
  const radius = within.radius - margin;
  const rand = opts.randomSource ?? Math.random;
  switch (strategy) {
    case `naive`: {
      return sum(offset2, toCartesian(rand() * radius, rand() * piPi));
    }
    case `uniform`: {
      return sum(offset2, toCartesian(Math.sqrt(rand()) * radius, rand() * piPi));
    }
    default: {
      throw new Error(`Unknown strategy '${strategy}'. Expects 'uniform' or 'naive'`);
    }
  }
};

// src/geometry/circle/Center.ts
var center2 = (circle) => {
  return isCirclePositioned(circle) ? Object.freeze({ x: circle.x, y: circle.y }) : Object.freeze({ x: circle.radius, y: circle.radius });
};

// src/geometry/rect/Random.ts
var random2 = (rando) => {
  if (rando === void 0) rando = defaultRandom;
  return Object.freeze({
    x: rando(),
    y: rando(),
    width: rando(),
    height: rando()
  });
};
var randomPoint2 = (within, options = {}) => {
  const rand = options.randomSource ?? defaultRandom;
  const margin = options.margin ?? { x: 0, y: 0 };
  const x = rand() * (within.width - margin.x - margin.x);
  const y = rand() * (within.height - margin.y - margin.y);
  const pos = { x: x + margin.x, y: y + margin.y };
  return isPositioned(within) ? sum(pos, within) : Object.freeze(pos);
};

// src/geometry/shape/index.ts
var isIntersecting3 = (a, b) => {
  if (isCirclePositioned(a)) {
    return isIntersecting2(a, b);
  } else if (isRectPositioned(a)) {
    return isIntersecting(a, b);
  }
  throw new Error(
    `a or b are unknown shapes. a: ${JSON.stringify(a)} b: ${JSON.stringify(b)}`
  );
};
var randomPoint3 = (shape, opts = {}) => {
  if (isCirclePositioned(shape)) {
    return randomPoint(shape, opts);
  } else if (isRectPositioned(shape)) {
    return randomPoint2(shape, opts);
  }
  throw new Error(`Unknown shape. Only CirclePositioned and RectPositioned are supported.`);
};
var center3 = (shape) => {
  if (shape === void 0) {
    return Object.freeze({ x: 0.5, y: 0.5 });
  } else if (isRect(shape)) {
    return center(shape);
  } else if (triangle_exports.isTriangle(shape)) {
    return triangle_exports.centroid(shape);
  } else if (isCircle(shape)) {
    return center2(shape);
  } else {
    throw new Error(`Unknown shape: ${JSON.stringify(shape)}`);
  }
};
var starburst = (outerRadius, points = 5, innerRadius, origin = point_exports.Empty, opts) => {
  throwIntegerTest(points, `positive`, `points`);
  const angle = Math.PI * 2 / points;
  const angleHalf = angle / 2;
  const initialAngle = opts?.initialAngleRadian ?? -Math.PI / 2;
  if (innerRadius === void 0) innerRadius = outerRadius / 2;
  let a = initialAngle;
  const pts = [];
  for (let index = 0; index < points; index++) {
    const peak = toCartesian(outerRadius, a, origin);
    const left = toCartesian(innerRadius, a - angleHalf, origin);
    const right = toCartesian(innerRadius, a + angleHalf, origin);
    pts.push(left, peak);
    if (index + 1 < points) pts.push(right);
    a += angle;
  }
  return pts;
};
var arrow = (origin, from2, opts = {}) => {
  const tailLength = opts.tailLength ?? 10;
  const tailThickness = opts.tailThickness ?? Math.max(tailLength / 5, 5);
  const angleRadian3 = opts.angleRadian ?? 0;
  const arrowSize = opts.arrowSize ?? Math.max(tailLength / 5, 15);
  const triAngle = Math.PI / 2;
  let tri;
  let tailPoints;
  if (from2 === `tip`) {
    tri = triangle_exports.equilateralFromVertex(origin, arrowSize, triAngle);
    tailPoints = corners(
      fromTopLeft(
        { x: tri.a.x - tailLength, y: origin.y - tailThickness / 2 },
        tailLength,
        tailThickness
      )
    );
  } else if (from2 === `middle`) {
    const midX = tailLength + arrowSize / 2;
    const midY = tailThickness / 2;
    tri = triangle_exports.equilateralFromVertex(
      {
        x: origin.x + arrowSize * 1.2,
        y: origin.y
      },
      arrowSize,
      triAngle
    );
    tailPoints = corners(
      fromTopLeft(
        { x: origin.x - midX, y: origin.y - midY },
        tailLength + arrowSize,
        tailThickness
      )
    );
  } else {
    tailPoints = corners(
      fromTopLeft(
        { x: origin.x, y: origin.y - tailThickness / 2 },
        tailLength,
        tailThickness
      )
    );
    tri = triangle_exports.equilateralFromVertex(
      { x: origin.x + tailLength + arrowSize * 0.7, y: origin.y },
      arrowSize,
      triAngle
    );
  }
  const arrow2 = point_exports.rotate(
    [
      tailPoints[0],
      tailPoints[1],
      tri.a,
      tri.b,
      tri.c,
      tailPoints[2],
      tailPoints[3]
    ],
    angleRadian3,
    origin
  );
  return arrow2;
};

// src/geometry/CirclePacking.ts
var random3 = (circles, container, opts = {}) => {
  if (!Array.isArray(circles)) throw new Error(`Parameter 'circles' is not an array`);
  const attempts = opts.attempts ?? 2e3;
  const sorted = sortByNumericProperty(circles, `radius`);
  const positionedCircles = [];
  const willHit = (b, radius) => positionedCircles.some((v) => isIntersecting2(v, b, radius));
  while (sorted.length > 0) {
    const circle = sorted.pop();
    if (!circle) break;
    const randomPointOpts = { ...opts, margin: { x: circle.radius, y: circle.radius } };
    for (let index = 0; index < attempts; index++) {
      const position = randomPoint3(container, randomPointOpts);
      if (!willHit(position, circle.radius)) {
        positionedCircles.push(Object.freeze({ ...circle, ...position }));
        break;
      }
    }
  }
  return positionedCircles;
};

// src/geometry/circle/index.ts
var circle_exports = {};
__export(circle_exports, {
  area: () => area,
  bbox: () => bbox3,
  center: () => center2,
  circumference: () => circumference,
  distanceCenter: () => distanceCenter,
  distanceFromExterior: () => distanceFromExterior,
  exteriorIntegerPoints: () => exteriorIntegerPoints,
  guard: () => guard5,
  guardPositioned: () => guardPositioned2,
  interiorIntegerPoints: () => interiorIntegerPoints,
  interpolate: () => interpolate3,
  intersectionLine: () => intersectionLine,
  intersections: () => intersections,
  isCircle: () => isCircle,
  isCirclePositioned: () => isCirclePositioned,
  isContainedBy: () => isContainedBy,
  isEqual: () => isEqual3,
  isIntersecting: () => isIntersecting2,
  isNaN: () => isNaN2,
  isPositioned: () => isPositioned2,
  length: () => length3,
  multiplyScalar: () => multiplyScalar2,
  nearest: () => nearest2,
  pointOnPerimeter: () => pointOnPerimeter,
  randomPoint: () => randomPoint,
  toPath: () => toPath2,
  toPositioned: () => toPositioned,
  toSvg: () => toSvg
});

// src/geometry/circle/Area.ts
var area = (circle) => {
  guard5(circle);
  return Math.PI * circle.radius * circle.radius;
};

// src/geometry/rect/FromCenter.ts
var fromCenter = (origin, width, height4) => {
  guard(origin, `origin`);
  guardDim(width, `width`);
  guardDim(height4, `height`);
  const halfW = width / 2;
  const halfH = height4 / 2;
  return {
    x: origin.x - halfW,
    y: origin.y - halfH,
    width,
    height: height4
  };
};

// src/geometry/circle/Bbox.ts
var bbox3 = (circle) => {
  return isCirclePositioned(circle) ? fromCenter(circle, circle.radius * 2, circle.radius * 2) : { width: circle.radius * 2, height: circle.radius * 2, x: 0, y: 0 };
};

// src/geometry/circle/ExteriorPoints.ts
function* exteriorIntegerPoints(circle) {
  const { x, y, radius } = circle;
  let xx = radius;
  let yy = 0;
  let radiusError = 1 - x;
  while (xx >= yy) {
    yield { x: xx + x, y: yy + y };
    yield { x: yy + x, y: xx + y };
    yield { x: -xx + x, y: yy + y };
    yield { x: -yy + x, y: xx + y };
    yield { x: -xx + x, y: -yy + y };
    yield { x: -yy + x, y: -xx + y };
    yield { x: xx + x, y: -yy + y };
    yield { x: yy + x, y: -xx + y };
    yy++;
    if (radiusError < 0) {
      radiusError += 2 * yy + 1;
    } else {
      xx--;
      radiusError += 2 * (yy - xx + 1);
    }
  }
}

// src/geometry/circle/InteriorPoints.ts
function* interiorIntegerPoints(circle) {
  const xMin = circle.x - circle.radius;
  const xMax = circle.x + circle.radius;
  const yMin = circle.y - circle.radius;
  const yMax = circle.y + circle.radius;
  for (let x = xMin; x < xMax; x++) {
    for (let y = yMin; y < yMax; y++) {
      const r = Math.abs(distance(circle, x, y));
      if (r <= circle.radius) yield { x, y };
    }
  }
}

// src/geometry/circle/Perimeter.ts
var piPi2 = Math.PI * 2;
var nearest2 = (circle, point2) => {
  const n = (a) => {
    const l = Math.sqrt(Math.pow(point2.x - a.x, 2) + Math.pow(point2.y - a.y, 2));
    const x = a.x + a.radius * ((point2.x - a.x) / l);
    const y = a.y + a.radius * ((point2.y - a.y) / l);
    return { x, y };
  };
  if (Array.isArray(circle)) {
    const pts = circle.map((l) => n(l));
    const dists = pts.map((p) => distance(p, point2));
    return Object.freeze(pts[minIndex(...dists)]);
  } else {
    return Object.freeze(n(circle));
  }
};
var pointOnPerimeter = (circle, angleRadian3, origin) => {
  if (origin === void 0) {
    origin = isCirclePositioned(circle) ? circle : { x: 0, y: 0 };
  }
  return {
    x: Math.cos(-angleRadian3) * circle.radius + origin.x,
    y: Math.sin(-angleRadian3) * circle.radius + origin.y
  };
};
var circumference = (circle) => {
  guard5(circle);
  return piPi2 * circle.radius;
};
var length3 = (circle) => circumference(circle);

// src/geometry/circle/Interpolate.ts
var piPi3 = Math.PI * 2;
var interpolate3 = (circle, t2) => pointOnPerimeter(circle, t2 * piPi3);

// src/geometry/circle/Multiply.ts
function multiplyScalar2(a, value) {
  if (isCirclePositioned(a)) {
    const pt = multiplyScalar(a, value);
    return Object.freeze({
      ...a,
      ...pt,
      radius: a.radius * value
    });
  } else {
    return Object.freeze({
      ...a,
      radius: a.radius * value
    });
  }
}

// src/geometry/circle/Svg.ts
var toSvg = (a, sweep, origin) => {
  if (isCircle(a)) {
    if (origin !== void 0) {
      return toSvgFull(a.radius, origin, sweep);
    }
    if (isCirclePositioned(a)) {
      return toSvgFull(a.radius, a, sweep);
    } else throw new Error(`origin parameter needed for non-positioned circle`);
  } else {
    if (origin === void 0) {
      throw new Error(`origin parameter needed`);
    } else {
      return toSvgFull(a, origin, sweep);
    }
  }
};
var toSvgFull = (radius, origin, sweep) => {
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

// src/geometry/circle/ToPath.ts
var toPath2 = (circle) => {
  guard5(circle);
  return {
    ...circle,
    nearest: (point2) => nearest2(circle, point2),
    /**
     * Returns a relative (0.0-1.0) point on a circle. 0=3 o'clock, 0.25=6 o'clock, 0.5=9 o'clock, 0.75=12 o'clock etc.
     * @param {t} Relative (0.0-1.0) point
     * @returns {Point} X,y
     */
    interpolate: (t2) => interpolate3(circle, t2),
    bbox: () => bbox3(circle),
    length: () => circumference(circle),
    toSvgString: (sweep = true) => toSvg(circle, sweep),
    relativePosition: (_point, _intersectionThreshold) => {
      throw new Error(`Not implemented`);
    },
    distanceToPoint: (_point) => {
      throw new Error(`Not implemented`);
    },
    kind: `circular`
  };
};

// src/geometry/circle/ToPositioned.ts
var toPositioned = (circle, defaultPositionOrX, y) => {
  if (isCirclePositioned(circle)) return circle;
  const pt = getPointParameter2(defaultPositionOrX, y);
  return Object.freeze({
    ...circle,
    ...pt
  });
};

// src/geometry/rect/index.ts
var rect_exports = {};
__export(rect_exports, {
  area: () => area2,
  cardinal: () => cardinal,
  center: () => center,
  corners: () => corners,
  distanceFromCenter: () => distanceFromCenter,
  distanceFromExterior: () => distanceFromExterior2,
  edges: () => edges,
  empty: () => empty,
  emptyPositioned: () => emptyPositioned,
  fromCenter: () => fromCenter,
  fromElement: () => fromElement,
  fromNumbers: () => fromNumbers3,
  fromTopLeft: () => fromTopLeft,
  getEdgeX: () => getEdgeX,
  getEdgeY: () => getEdgeY,
  getRectPositioned: () => getRectPositioned,
  getRectPositionedParameter: () => getRectPositionedParameter,
  guard: () => guard3,
  guardDim: () => guardDim,
  guardPositioned: () => guardPositioned,
  intersectsPoint: () => intersectsPoint,
  isEmpty: () => isEmpty2,
  isEqual: () => isEqual4,
  isEqualSize: () => isEqualSize,
  isIntersecting: () => isIntersecting,
  isPlaceholder: () => isPlaceholder2,
  isPositioned: () => isPositioned,
  isRect: () => isRect,
  isRectPositioned: () => isRectPositioned,
  lengths: () => lengths,
  maxFromCorners: () => maxFromCorners,
  multiply: () => multiply4,
  multiplyScalar: () => multiplyScalar3,
  normaliseByRect: () => normaliseByRect3,
  random: () => random2,
  randomPoint: () => randomPoint2,
  subtract: () => subtract3,
  sum: () => sum3,
  toArray: () => toArray2
});

// src/geometry/rect/Area.ts
var area2 = (rect) => {
  guard3(rect);
  return rect.height * rect.width;
};

// src/geometry/rect/Cardinal.ts
var cardinal = (rect, card) => {
  const { x, y, width, height: height4 } = rect;
  switch (card) {
    case `nw`: {
      return Object.freeze({ x, y });
    }
    case `n`: {
      return Object.freeze({
        x: x + width / 2,
        y
      });
    }
    case `ne`: {
      return Object.freeze({
        x: x + width,
        y
      });
    }
    case `sw`: {
      return Object.freeze({ x, y: y + height4 });
    }
    case `s`: {
      return Object.freeze({
        x: x + width / 2,
        y: y + height4
      });
    }
    case `se`: {
      return Object.freeze({
        x: x + width,
        y: y + height4
      });
    }
    case `w`: {
      return Object.freeze({ x, y: y + height4 / 2 });
    }
    case `e`: {
      return Object.freeze({ x: x + width, y: y + height4 / 2 });
    }
    case `center`: {
      return Object.freeze({
        x: x + width / 2,
        y: y + height4 / 2
      });
    }
    default: {
      throw new Error(`Unknown direction: ${card}`);
    }
  }
};

// src/geometry/rect/Edges.ts
var edges = (rect, origin) => {
  const c = corners(rect, origin);
  return joinPointsToLines(...c, c[0]);
};
var getEdgeX = (rect, edge) => {
  guard3(rect);
  switch (edge) {
    case `top`: {
      return isPoint(rect) ? rect.x : 0;
    }
    case `bottom`: {
      return isPoint(rect) ? rect.x : 0;
    }
    case `left`: {
      return isPoint(rect) ? rect.y : 0;
    }
    case `right`: {
      return isPoint(rect) ? rect.x + rect.width : rect.width;
    }
  }
};
var getEdgeY = (rect, edge) => {
  guard3(rect);
  switch (edge) {
    case `top`: {
      return isPoint(rect) ? rect.y : 0;
    }
    case `bottom`: {
      return isPoint(rect) ? rect.y + rect.height : rect.height;
    }
    case `left`: {
      return isPoint(rect) ? rect.y : 0;
    }
    case `right`: {
      return isPoint(rect) ? rect.y : 0;
    }
  }
};

// src/geometry/rect/Empty.ts
var empty = Object.freeze({ width: 0, height: 0 });
var emptyPositioned = Object.freeze({
  x: 0,
  y: 0,
  width: 0,
  height: 0
});

// src/geometry/rect/FromElement.ts
var fromElement = (el) => ({
  width: el.clientWidth,
  height: el.clientHeight
});

// src/geometry/rect/FromNumbers.ts
function fromNumbers3(xOrWidth, yOrHeight, width, height4) {
  if (width === void 0 || height4 === void 0) {
    if (typeof xOrWidth !== `number`) throw new Error(`width is not an number`);
    if (typeof yOrHeight !== `number`) {
      throw new TypeError(`height is not an number`);
    }
    return Object.freeze({ width: xOrWidth, height: yOrHeight });
  }
  if (typeof xOrWidth !== `number`) throw new Error(`x is not an number`);
  if (typeof yOrHeight !== `number`) throw new Error(`y is not an number`);
  if (typeof width !== `number`) throw new Error(`width is not an number`);
  if (typeof height4 !== `number`) throw new Error(`height is not an number`);
  return Object.freeze({ x: xOrWidth, y: yOrHeight, width, height: height4 });
}

// src/geometry/rect/GetRectPositionedParameter.ts
function getRectPositionedParameter(a, b, c, d) {
  if (typeof a === `number`) {
    if (typeof b === `number`) {
      if (typeof c === `number` && typeof d === `number`) {
        return { x: a, y: b, width: c, height: d };
      } else if (isRect(c)) {
        return { x: a, y: b, width: c.width, height: c.height };
      } else {
        throw new TypeError(`If params 'a' & 'b' are numbers, expect following parameters to be x,y or Rect`);
      }
    } else {
      throw new TypeError(`If parameter 'a' is a number, expect following parameters to be: y,w,h`);
    }
  } else if (isRectPositioned(a)) {
    return a;
  } else if (isRect(a)) {
    if (typeof b === `number` && typeof c === `number`) {
      return { width: a.width, height: a.height, x: b, y: c };
    } else if (isPoint(b)) {
      return { width: a.width, height: a.height, x: b.x, y: b.y };
    } else {
      throw new TypeError(`If param 'a' is a Rect, expects following parameters to be x,y`);
    }
  } else if (isPoint(a)) {
    if (typeof b === `number` && typeof c === `number`) {
      return { x: a.x, y: a.y, width: b, height: c };
    } else if (isRect(b)) {
      return { x: a.x, y: a.y, width: b.width, height: b.height };
    } else {
      throw new TypeError(`If parameter 'a' is a Point, expect following params to be: Rect or width,height`);
    }
  }
  throw new TypeError(`Expect a first parameter to be x,RectPositioned,Rect or Point`);
}

// src/geometry/rect/IsEqual.ts
var isEqualSize = (a, b) => {
  if (a === void 0) throw new Error(`a undefined`);
  if (b === void 0) throw new Error(`b undefined`);
  return a.width === b.width && a.height === b.height;
};
var isEqual4 = (a, b) => {
  if (isPositioned(a) && isPositioned(b)) {
    if (!isEqual(a, b)) return false;
    return a.width === b.width && a.height === b.height;
  } else if (!isPositioned(a) && !isPositioned(b)) {
    return a.width === b.width && a.height === b.height;
  } else {
    return false;
  }
};

// src/geometry/rect/Lengths.ts
var lengths = (rect) => {
  guardPositioned(rect, `rect`);
  return edges(rect).map((l) => length(l));
};

// src/geometry/rect/Multiply.ts
function multiply4(a, b, c) {
  guard3(a, `a`);
  if (isRect(b)) {
    return isRectPositioned(a) ? Object.freeze({
      ...a,
      x: a.x * b.width,
      y: a.y * b.height,
      width: a.width * b.width,
      height: a.height * b.height
    }) : Object.freeze({
      ...a,
      width: a.width * b.width,
      height: a.height * b.height
    });
  } else {
    if (typeof b !== `number`) {
      throw new TypeError(
        `Expected second parameter of type Rect or number. Got ${JSON.stringify(
          b
        )}`
      );
    }
    if (c === void 0) c = b;
    return isRectPositioned(a) ? Object.freeze({
      ...a,
      x: a.x * b,
      y: a.y * c,
      width: a.width * b,
      height: a.height * c
    }) : Object.freeze({
      ...a,
      width: a.width * b,
      height: a.height * c
    });
  }
}
function multiplyScalar3(rect, amount) {
  return isPositioned(rect) ? Object.freeze({
    ...rect,
    x: rect.x * amount,
    y: rect.y * amount,
    width: rect.width * amount,
    height: rect.height * amount
  }) : Object.freeze({
    ...rect,
    width: rect.width * amount,
    height: rect.height * amount
  });
}

// src/geometry/rect/NormaliseByRect.ts
var normaliseByRect3 = (rect, normaliseByOrWidth, height4) => {
  let width;
  if (height4 === void 0) {
    if (isRect(normaliseByOrWidth)) {
      height4 = normaliseByOrWidth.height;
      width = normaliseByOrWidth.width;
    } else {
      throw new Error(
        `Expects rectangle or width and height parameters for normaliseBy`
      );
    }
  } else {
    if (typeof normaliseByOrWidth === `number`) {
      width = normaliseByOrWidth;
    } else {
      throw new TypeError(
        `Expects rectangle or width and height parameters for normaliseBy`
      );
    }
  }
  return isPositioned(rect) ? Object.freeze({
    x: rect.x / width,
    y: rect.y / height4,
    width: rect.width / width,
    height: rect.height / height4
  }) : Object.freeze({
    width: rect.width / width,
    height: rect.height / height4
  });
};

// src/geometry/rect/Subtract.ts
function subtract3(a, b, c) {
  if (a === void 0) throw new Error(`First parameter undefined`);
  if (typeof b === `number`) {
    const height4 = c ?? 0;
    return Object.freeze({
      ...a,
      width: a.width - b,
      height: a.height - height4
    });
  } else {
    return Object.freeze({
      ...a,
      width: a.width - b.width,
      height: a.height - b.height
    });
  }
}

// src/geometry/rect/Sum.ts
function sum3(a, b, c) {
  if (a === void 0) throw new Error(`First parameter undefined`);
  if (typeof b === `number`) {
    const height4 = c ?? 0;
    return Object.freeze({
      ...a,
      width: a.width + b,
      height: a.height + height4
    });
  } else {
    return Object.freeze({
      ...a,
      width: a.width + b.width,
      height: a.height + b.height
    });
  }
}

// src/geometry/rect/ToArray.ts
function toArray2(rect) {
  if (isPositioned(rect)) {
    return [rect.x, rect.y, rect.width, rect.height];
  } else if (isRect(rect)) {
    return [rect.width, rect.height];
  } else {
    throw new Error(
      `Param 'rect' is not a rectangle. Got: ${JSON.stringify(rect)}`
    );
  }
}

// src/geometry/path/index.ts
var path_exports = {};
__export(path_exports, {
  getEnd: () => getEnd,
  getStart: () => getStart
});

// src/geometry/bezier/Guard.ts
var isQuadraticBezier = (path) => path.quadratic !== void 0;
var isCubicBezier = (path) => path.cubic1 !== void 0 && path.cubic2 !== void 0;

// src/geometry/path/index.ts
var getStart = function(path) {
  if (isQuadraticBezier(path)) return path.a;
  else if (isLine(path)) return path.a;
  else throw new Error(`Unknown path type ${JSON.stringify(path)}`);
};
var getEnd = function(path) {
  if (isQuadraticBezier(path)) return path.b;
  else if (isLine(path)) return path.b;
  else throw new Error(`Unknown path type ${JSON.stringify(path)}`);
};

// src/geometry/Grid.ts
var Grid_exports = {};
__export(Grid_exports, {
  access1dArray: () => access1dArray,
  allDirections: () => allDirections,
  array2dUpdater: () => array2dUpdater,
  asRectangles: () => asRectangles,
  cellAtPoint: () => cellAtPoint,
  cellEquals: () => cellEquals,
  cellFromIndex: () => cellFromIndex,
  cellKeyString: () => cellKeyString,
  cellMiddle: () => cellMiddle,
  cells: () => cells,
  crossDirections: () => crossDirections,
  getLine: () => getLine,
  getVectorFromCardinal: () => getVectorFromCardinal,
  guardCell: () => guardCell,
  indexFromCell: () => indexFromCell,
  inside: () => inside,
  isEqual: () => isEqual5,
  neighbours: () => neighbours,
  offset: () => offset,
  offsetCardinals: () => offsetCardinals,
  rectangleForCell: () => rectangleForCell,
  rows: () => rows,
  simpleLine: () => simpleLine,
  toArray: () => toArray3,
  visitArray: () => visitArray,
  visitFor: () => visitFor,
  visitNeigbours: () => visitNeigbours,
  visitor: () => visitor,
  visitorBreadth: () => visitorBreadth,
  visitorColumn: () => visitorColumn,
  visitorDepth: () => visitorDepth,
  visitorRandom: () => visitorRandom,
  visitorRandomContiguous: () => visitorRandomContiguous,
  visitorRow: () => visitorRow
});
var isCell = (cell) => {
  if (cell === void 0) return false;
  return `x` in cell && `y` in cell;
};
var isNeighbour = (n) => {
  if (n === void 0) return false;
  if (n[1] === void 0) return false;
  return true;
};
var isEqual5 = (a, b) => {
  if (b === void 0) return false;
  if (a === void 0) return false;
  if (`rows` in a && `cols` in a) {
    if (`rows` in b && `cols` in b) {
      if (a.rows !== b.rows || a.cols !== b.cols) return false;
    } else return false;
  }
  if (`size` in a) {
    if (`size` in b) {
      if (a.size !== b.size) return false;
    } else return false;
  }
  return true;
};
var cellKeyString = (v) => `Cell{${v.x},${v.y}}`;
var cellEquals = (a, b) => {
  if (b === void 0) return false;
  if (a === void 0) return false;
  return a.x === b.x && a.y === b.y;
};
var guardCell = (cell, parameterName = `Param`, grid) => {
  if (cell === void 0) {
    throw new Error(parameterName + ` is undefined. Expecting {x,y}`);
  }
  if (cell.x === void 0) throw new Error(parameterName + `.x is undefined`);
  if (cell.y === void 0) throw new Error(parameterName + `.y is undefined`);
  if (Number.isNaN(cell.x)) throw new Error(parameterName + `.x is NaN`);
  if (Number.isNaN(cell.y)) throw new Error(parameterName + `.y is NaN`);
  if (!Number.isInteger(cell.x)) {
    throw new TypeError(parameterName + `.x is non-integer`);
  }
  if (!Number.isInteger(cell.y)) {
    throw new TypeError(parameterName + `.y is non-integer`);
  }
  if (grid !== void 0 && !inside(grid, cell)) {
    throw new Error(
      `${parameterName} is outside of grid. Cell: ${cell.x},${cell.y} Grid: ${grid.cols}, ${grid.rows}`
    );
  }
};
var guardGrid = (grid, parameterName = `Param`) => {
  if (grid === void 0) {
    throw new Error(`${parameterName} is undefined. Expecting grid.`);
  }
  if (!(`rows` in grid)) throw new Error(`${parameterName}.rows is undefined`);
  if (!(`cols` in grid)) throw new Error(`${parameterName}.cols is undefined`);
  if (!Number.isInteger(grid.rows)) {
    throw new TypeError(`${parameterName}.rows is not an integer`);
  }
  if (!Number.isInteger(grid.cols)) {
    throw new TypeError(`${parameterName}.cols is not an integer`);
  }
};
var inside = (grid, cell) => {
  if (cell.x < 0 || cell.y < 0) return false;
  if (cell.x >= grid.cols || cell.y >= grid.rows) return false;
  return true;
};
var rectangleForCell = (grid, cell) => {
  guardCell(cell);
  const size = grid.size;
  const x = cell.x * size;
  const y = cell.y * size;
  const r = fromTopLeft({ x, y }, size, size);
  return r;
};
function* asRectangles(grid) {
  for (const c of cells(grid)) {
    yield rectangleForCell(grid, c);
  }
}
var toArray3 = (grid, initialValue) => {
  const returnValue = [];
  for (let row = 0; row < grid.rows; row++) {
    returnValue[row] = Array.from({ length: grid.cols });
    if (initialValue) {
      for (let col = 0; col < grid.cols; col++) {
        returnValue[row][col] = initialValue;
      }
    }
  }
  return returnValue;
};
var cellAtPoint = (grid, position) => {
  const size = grid.size;
  throwNumberTest(size, `positive`, `grid.size`);
  if (position.x < 0 || position.y < 0) return;
  const x = Math.floor(position.x / size);
  const y = Math.floor(position.y / size);
  if (x >= grid.cols) return;
  if (y >= grid.rows) return;
  return { x, y };
};
var allDirections = Object.freeze([
  `n`,
  `ne`,
  `nw`,
  `e`,
  `s`,
  `se`,
  `sw`,
  `w`
]);
var crossDirections = Object.freeze([
  `n`,
  `e`,
  `s`,
  `w`
]);
var neighbours = (grid, cell, bounds = `undefined`, directions) => {
  const directories = directions ?? allDirections;
  const points = directories.map(
    (c) => offset(grid, cell, getVectorFromCardinal(c), bounds)
  );
  return zipKeyValue(directories, points);
};
function* visitNeigbours(grid, cell, bounds = `undefined`, directions) {
  const directories = directions ?? allDirections;
  const points = directories.map(
    (c) => offset(grid, cell, getVectorFromCardinal(c), bounds)
  );
  for (const pt of points) {
    if (pt !== void 0) yield pt;
  }
}
var cellMiddle = (grid, cell) => {
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
  let error = dx - dy;
  const cells2 = [];
  while (true) {
    cells2.push(Object.freeze({ x: startX, y: startY }));
    if (startX === end.x && startY === end.y) break;
    const error2 = 2 * error;
    if (error2 > -dy) {
      error -= dy;
      startX += sx;
    }
    if (error2 < dx) {
      error += dx;
      startY += sy;
    }
  }
  return cells2;
};
var offsetCardinals = (grid, start, steps, bounds = `stop`) => {
  guardGrid(grid, `grid`);
  guardCell(start, `start`);
  throwIntegerTest(steps, `aboveZero`, `steps`);
  const directions = allDirections;
  const vectors = directions.map((d) => getVectorFromCardinal(d, steps));
  const cells2 = directions.map(
    (d, index) => offset(grid, start, vectors[index], bounds)
  );
  return zipKeyValue(directions, cells2);
};
var getVectorFromCardinal = (cardinal2, multiplier = 1) => {
  let v;
  switch (cardinal2) {
    case `n`: {
      v = { x: 0, y: -1 * multiplier };
      break;
    }
    case `ne`: {
      v = { x: 1 * multiplier, y: -1 * multiplier };
      break;
    }
    case `e`: {
      v = { x: 1 * multiplier, y: 0 };
      break;
    }
    case `se`: {
      v = { x: 1 * multiplier, y: 1 * multiplier };
      break;
    }
    case `s`: {
      v = { x: 0, y: 1 * multiplier };
      break;
    }
    case `sw`: {
      v = { x: -1 * multiplier, y: 1 * multiplier };
      break;
    }
    case `w`: {
      v = { x: -1 * multiplier, y: 0 };
      break;
    }
    case `nw`: {
      v = { x: -1 * multiplier, y: -1 * multiplier };
      break;
    }
    default: {
      v = { x: 0, y: 0 };
    }
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
    throw new Error(
      `Only does vertical and horizontal: ${start.x},${start.y} - ${end.x},${end.y}`
    );
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
    case `wrap`: {
      x += vector.x % grid.cols;
      y += vector.y % grid.rows;
      if (x < 0) x = grid.cols + x;
      else if (x >= grid.cols) {
        x -= grid.cols;
      }
      if (y < 0) y = grid.rows + y;
      else if (y >= grid.rows) {
        y -= grid.rows;
      }
      break;
    }
    case `stop`: {
      x += vector.x;
      y += vector.y;
      x = clampIndex(x, grid.cols);
      y = clampIndex(y, grid.rows);
      break;
    }
    case `undefined`: {
      x += vector.x;
      y += vector.y;
      if (x < 0 || y < 0) return;
      if (x >= grid.cols || y >= grid.rows) return;
      break;
    }
    case `unbounded`: {
      x += vector.x;
      y += vector.y;
      break;
    }
    default: {
      throw new Error(`Unknown BoundsLogic case ${bounds}`);
    }
  }
  return Object.freeze({ x, y });
};
var neighbourList = (grid, cell, directions, bounds) => {
  const cellNeighbours = neighbours(grid, cell, bounds, directions);
  const entries = Object.entries(cellNeighbours);
  return entries.filter((n) => isNeighbour(n));
};
var visitor = function* (logic, grid, start, opts = {}) {
  guardGrid(grid, `grid`);
  guardCell(start, `start`, grid);
  const v = opts.visited ?? mutable(cellKeyString);
  const possibleNeighbours = logic.options ?? ((g, c) => neighbourList(g, c, crossDirections, `undefined`));
  if (!isCell(start)) {
    throw new Error(`'start' parameter is undefined or not a cell`);
  }
  let cellQueue = [start];
  let moveQueue = [];
  let current = void 0;
  while (cellQueue.length > 0) {
    if (current === void 0) {
      const nv = cellQueue.pop();
      if (nv === void 0) {
        break;
      }
      current = nv;
    }
    if (!v.has(current)) {
      v.add(current);
      yield current;
      const nextSteps = possibleNeighbours(grid, current).filter(
        (step) => {
          if (step[1] === void 0) return false;
          return !v.has(step[1]);
        }
      );
      if (nextSteps.length === 0) {
        if (current !== void 0) {
          cellQueue = cellQueue.filter((cq) => cellEquals(cq, current));
        }
      } else {
        for (const n of nextSteps) {
          if (n === void 0) continue;
          if (n[1] === void 0) continue;
          moveQueue.push(n);
        }
      }
    }
    moveQueue = moveQueue.filter((step) => !v.has(step[1]));
    if (moveQueue.length === 0) {
      current = void 0;
    } else {
      const potential = logic.select(moveQueue);
      if (potential !== void 0) {
        cellQueue.push(potential[1]);
        current = potential[1];
      }
    }
  }
};
var visitorDepth = (grid, start, opts = {}) => visitor(
  {
    select: (nbos) => nbos.at(-1)
  },
  grid,
  start,
  opts
);
var visitorBreadth = (grid, start, opts = {}) => visitor(
  {
    select: (nbos) => nbos[0]
  },
  grid,
  start,
  opts
);
var randomNeighbour = (nbos) => randomElement(nbos);
var visitorRandomContiguous = (grid, start, opts = {}) => visitor(
  {
    select: randomNeighbour
  },
  grid,
  start,
  opts
);
var visitorRandom = (grid, start, opts = {}) => visitor(
  {
    options: (grid2, cell) => {
      const t2 = [];
      for (const c of cells(grid2, cell)) {
        t2.push([`n`, c]);
      }
      return t2;
    },
    select: randomNeighbour
  },
  grid,
  start,
  opts
);
var visitorRow = (grid, start, opts = {}) => {
  if (!start) start = { x: 0, y: 0 };
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
  throwIntegerTest(steps, ``, `steps`);
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
      if (opts.debug) {
        console.log(
          `stepsMade: ${stepsMade} cell: ${c.x}, ${c.y} reverse: ${opts.reversed}`
        );
      }
    } else {
      if (steps >= grid.cols * grid.rows) {
        steps -= grid.cols * grid.rows;
        stepsMade = 0;
        v = visitor2(grid, start, opts);
        v.next();
        c = start;
        if (opts.debug) console.log(`resetting visitor to ${steps}`);
      } else throw new Error(`Value not received by visitor`);
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
var rows = function* (grid, start) {
  if (!start) start = { x: 0, y: 0 };
  let row = start.y;
  let rowCells = [];
  for (const c of cells(grid, start)) {
    if (c.y === row) {
      rowCells.push(c);
    } else {
      yield rowCells;
      rowCells = [c];
      row = c.y;
    }
  }
  if (rowCells.length > 0) yield rowCells;
};
var cells = function* (grid, start) {
  if (!start) start = { x: 0, y: 0 };
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
    if (x === start.x && y === start.y) canMove = false;
  } while (canMove);
};
var access1dArray = (array, cols) => {
  const grid = { cols, rows: Math.ceil(array.length / cols) };
  const fn = (cell, wrap3) => {
    const index = indexFromCell(grid, cell, wrap3);
    if (index === void 0) return void 0;
    return array[index];
  };
  return fn;
};
var array2dUpdater = (grid, array) => {
  const fn = (v, position) => {
    const pos = cellAtPoint(grid, position);
    if (pos === void 0) {
      throw new Error(
        `Position does not exist. Pos: ${JSON.stringify(
          position
        )} Grid: ${JSON.stringify(grid)}`
      );
    }
    array[pos.y][pos.x] = v;
  };
  return fn;
};
function* visitArray(array, cols, iteratorFunction, opts) {
  if (typeof array === `undefined`) {
    throw new TypeError(`First parameter is undefined, expected an array`);
  }
  if (array === null) throw new Error(`First parameter is null, expected an array`);
  if (!Array.isArray(array)) throw new Error(`First parameter should be an array`);
  throwIntegerTest(cols, `aboveZero`, `cols`);
  if (array.length === 0) return;
  const wrap3 = opts?.boundsWrap ?? `stop`;
  const rows2 = Math.ceil(array.length / cols);
  const grid = {
    cols,
    rows: rows2
  };
  if (iteratorFunction === void 0) iteratorFunction = cells;
  const iter = iteratorFunction(grid, { x: 0, y: 0 }, opts);
  for (const cell of iter) {
    const index = indexFromCell(grid, cell, wrap3);
    if (index === void 0) return void 0;
    yield [array[index], index];
  }
}
var indexFromCell = (grid, cell, wrap3) => {
  guardGrid(grid, `grid`);
  if (cell.x < 0) {
    switch (wrap3) {
      case `stop`: {
        cell = { ...cell, x: 0 };
        break;
      }
      case `unbounded`: {
        throw new Error(`unbounded not supported`);
      }
      case `undefined`: {
        return void 0;
      }
      case `wrap`: {
        cell = offset(grid, { x: 0, y: cell.y }, { x: cell.x, y: 0 }, `wrap`);
        break;
      }
    }
  }
  if (cell.y < 0) {
    switch (wrap3) {
      case `stop`: {
        cell = { ...cell, y: 0 };
        break;
      }
      case `unbounded`: {
        throw new Error(`unbounded not supported`);
      }
      case `undefined`: {
        return void 0;
      }
      case `wrap`: {
        cell = { ...cell, y: grid.rows + cell.y };
        break;
      }
    }
  }
  if (cell.x >= grid.cols) {
    switch (wrap3) {
      case `stop`: {
        cell = { ...cell, x: grid.cols - 1 };
        break;
      }
      case `unbounded`: {
        throw new Error(`unbounded not supported`);
      }
      case `undefined`: {
        return void 0;
      }
      case `wrap`: {
        cell = { ...cell, x: cell.x % grid.cols };
        break;
      }
    }
  }
  if (cell.y >= grid.rows) {
    switch (wrap3) {
      case `stop`: {
        cell = { ...cell, y: grid.rows - 1 };
        break;
      }
      case `unbounded`: {
        throw new Error(`unbounded not supported`);
      }
      case `undefined`: {
        return void 0;
      }
      case `wrap`: {
        cell = { ...cell, y: cell.y % grid.rows };
        break;
      }
    }
  }
  const index = cell.y * grid.cols + cell.x;
  return index;
};
var cellFromIndex = (colsOrGrid, index) => {
  let cols = 0;
  cols = typeof colsOrGrid === `number` ? colsOrGrid : colsOrGrid.cols;
  throwIntegerTest(cols, `aboveZero`, `colsOrGrid`);
  return {
    x: index % cols,
    y: Math.floor(index / cols)
  };
};

// src/geometry/bezier/index.ts
var bezier_exports = {};
__export(bezier_exports, {
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
var { abs: abs2, cos, sin, acos, atan2, sqrt, pow } = Math;
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
  // Legendre-Gauss abscissae with n=24 (x_i values, defined at i=n as the roots of the nth order Legendre polynomial Pn(x))
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
  // Legendre-Gauss weights with n=24 (w_i values, defined by a function linked to in the Bezier primer article)
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
          dCpts[i].z = dCpts[i].z + (dCpts[i + 1].z - dCpts[i].z) * t2;
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
    return abs2(a - b) <= (precision || epsilon);
  },
  length: function(derivativeFn) {
    const z = 0.5, len = utils.Tvalues.length;
    let sum5 = 0;
    for (let i = 0, t2; i < len; i++) {
      t2 = z * utils.Tvalues[i] + z;
      sum5 += utils.Cvalues[i] * utils.arcfn(t2, derivativeFn);
    }
    return z * sum5;
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
  // round as string, to avoid rounding errors
  round: function(v, d) {
    const s = "" + v;
    const pos = s.indexOf(".");
    return parseFloat(s.substring(0, pos + 1 + d));
  },
  dist: function(p1, p2) {
    const dx = p1.x - p2.x, dy = p1.y - p2.y;
    return sqrt(dx * dx + dy * dy);
  },
  closest: function(LUT, point2) {
    let mdist = pow(2, 63), mpos, d;
    LUT.forEach(function(p, idx) {
      d = utils.dist(point2, p);
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
    return abs2(top / bottom);
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
    return new Bezier(
      p1.x,
      p1.y,
      (p1.x + p2.x) / 2,
      (p1.y + p2.y) / 2,
      p2.x,
      p2.y
    );
  },
  findbbox: function(sections) {
    let mx = nMax, my = nMax, MX = nMin, MY = nMin;
    sections.forEach(function(s) {
      const bbox7 = s.bbox();
      if (mx > bbox7.x.min) mx = bbox7.x.min;
      if (my > bbox7.y.min) my = bbox7.y.min;
      if (MX < bbox7.x.max) MX = bbox7.x.max;
      if (MY < bbox7.y.max) MY = bbox7.y.max;
    });
    return {
      x: { min: mx, mid: (mx + MX) / 2, max: MX, size: MX - mx },
      y: { min: my, mid: (my + MY) / 2, max: MY, size: MY - my }
    };
  },
  shapeintersections: function(s1, bbox1, s2, bbox22, curveIntersectionThreshold) {
    if (!utils.bboxoverlap(bbox1, bbox22)) return [];
    const intersections2 = [];
    const a1 = [s1.startcap, s1.forward, s1.back, s1.endcap];
    const a2 = [s2.startcap, s2.forward, s2.back, s2.endcap];
    a1.forEach(function(l1) {
      if (l1.virtual) return;
      a2.forEach(function(l2) {
        if (l2.virtual) return;
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
      return utils.shapeintersections(
        shape,
        shape.bbox,
        s2,
        s2.bbox,
        curveIntersectionThreshold
      );
    };
    return shape;
  },
  getminmax: function(curve, d, list) {
    if (!list) return { min: 0, max: 0 };
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
      num = sqrt(
        pow(d.y * dd.z - dd.y * d.z, 2) + pow(d.z * dd.x - dd.z * d.x, 2) + pow(d.x * dd.y - dd.x * d.y, 2)
      );
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
      adk = (abs2(nk - k) + abs2(k - pk)) / 2;
    }
    return { k, r, dk, adk };
  },
  inflections: function(points) {
    if (points.length < 4) return [];
    const p = utils.align(points, { p1: points[0], p2: points.slice(-1)[0] }), a = p[2].x * p[1].y, b = p[3].x * p[1].y, c = p[1].x * p[2].y, d = p[3].x * p[2].y, v1 = 18 * (-3 * a + 2 * b + 3 * c - d), v2 = 18 * (3 * a - b - 3 * c), v3 = 18 * (c - a);
    if (utils.approximately(v1, 0)) {
      if (!utils.approximately(v2, 0)) {
        let t2 = -v3 / v2;
        if (0 <= t2 && t2 <= 1) return [t2];
      }
      return [];
    }
    const d2 = 2 * v1;
    if (utils.approximately(d2, 0)) return [];
    const trm = v2 * v2 - 4 * v1 * v3;
    if (trm < 0) return [];
    const sq = Math.sqrt(trm);
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
      if (abs2(l - t2) >= d) return false;
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
    if (pairs.length === 0) return results;
    pairs.forEach(function(pair) {
      results = results.concat(
        utils.pairiteration(pair.left, pair.right, threshold)
      );
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
var PolyBezier = class _PolyBezier {
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
    return new _PolyBezier(offset2);
  }
};

// node_modules/bezier-js/src/bezier.js
var { abs: abs3, min, max, cos: cos2, sin: sin2, acos: acos2, sqrt: sqrt2 } = Math;
var pi2 = Math.PI;
var Bezier = class _Bezier {
  constructor(coords) {
    let args = coords && coords.forEach ? coords : Array.from(arguments).slice();
    let coordlen = false;
    if (typeof args[0] === "object") {
      coordlen = args.length;
      const newargs = [];
      args.forEach(function(point3) {
        ["x", "y", "z"].forEach(function(d) {
          if (typeof point3[d] !== "undefined") {
            newargs.push(point3[d]);
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
          throw new Error(
            "Only new Bezier(point[]) is accepted for 4th and higher order curves"
          );
        }
        higher = true;
      }
    } else {
      if (len !== 6 && len !== 8 && len !== 9 && len !== 12) {
        if (arguments.length !== 1) {
          throw new Error(
            "Only new Bezier(point[]) is accepted for 4th and higher order curves"
          );
        }
      }
    }
    const _3d = this._3d = !higher && (len === 9 || len === 12) || coords && coords[0] && typeof coords[0].z !== "undefined";
    const points = this.points = [];
    for (let idx = 0, step = _3d ? 3 : 2; idx < len; idx += step) {
      var point2 = {
        x: args[idx],
        y: args[idx + 1]
      };
      if (_3d) {
        point2.z = args[idx + 2];
      }
      points.push(point2);
    }
    const order = this.order = points.length - 1;
    const dims = this.dims = ["x", "y"];
    if (_3d) dims.push("z");
    this.dimlen = dims.length;
    const aligned = utils.align(points, { p1: points[0], p2: points[order] });
    const baselength = utils.dist(points[0], points[order]);
    this._linear = aligned.reduce((t2, p) => t2 + abs3(p.y), 0) < baselength / 50;
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
      return new _Bezier(p2, p2, p3);
    }
    if (t2 === 1) {
      return new _Bezier(p1, p2, p2);
    }
    const abc = _Bezier.getABC(2, p1, p2, p3, t2);
    return new _Bezier(p1, abc.A, p3);
  }
  static cubicFromPoints(S, B, E, t2, d1) {
    if (typeof t2 === "undefined") {
      t2 = 0.5;
    }
    const abc = _Bezier.getABC(3, S, B, E, t2);
    if (typeof d1 === "undefined") {
      d1 = utils.dist(B, abc.C);
    }
    const d2 = d1 * (1 - t2) / t2;
    const selen = utils.dist(S, E), lx = (E.x - S.x) / selen, ly = (E.y - S.y) / selen, bx1 = d1 * lx, by1 = d1 * ly, bx2 = d2 * lx, by2 = d2 * ly;
    const e1 = { x: B.x - bx1, y: B.y - by1 }, e2 = { x: B.x + bx2, y: B.y + by2 }, A = abc.A, v1 = { x: A.x + (e1.x - A.x) / (1 - t2), y: A.y + (e1.y - A.y) / (1 - t2) }, v2 = { x: A.x + (e2.x - A.x) / t2, y: A.y + (e2.y - A.y) / t2 }, nc1 = { x: S.x + (v1.x - S.x) / t2, y: S.y + (v1.y - S.y) / t2 }, nc2 = {
      x: E.x + (v2.x - E.x) / (1 - t2),
      y: E.y + (v2.y - E.y) / (1 - t2)
    };
    return new _Bezier(S, nc1, nc2, E);
  }
  static getUtils() {
    return utils;
  }
  getUtils() {
    return _Bezier.getUtils();
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
    if (this._3d) return false;
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
    return _Bezier.getABC(this.order, S, B, E, t2);
  }
  getLUT(steps) {
    this.verify();
    steps = steps || 100;
    if (this._lut.length === steps + 1) {
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
  on(point2, error) {
    error = error || 5;
    const lut = this.getLUT(), hits = [];
    for (let i = 0, c, t2 = 0; i < lut.length; i++) {
      c = lut[i];
      if (utils.dist(c, point2) < error) {
        hits.push(c);
        t2 += i / lut.length;
      }
    }
    if (!hits.length) return false;
    return t /= hits.length;
  }
  project(point2) {
    const LUT = this.getLUT(), l = LUT.length - 1, closest = utils.closest(LUT, point2), mpos = closest.mpos, t1 = (mpos - 1) / l, t2 = (mpos + 1) / l, step = 0.1 / l;
    let mdist = closest.mdist, t3 = t1, ft = t3, p;
    mdist += 1;
    for (let d; t3 < t2 + step; t3 += step) {
      p = this.compute(t3);
      d = utils.dist(point2, p);
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
    for (let i = 1, pi5, pim; i < k; i++) {
      pi5 = p[i];
      pim = p[i - 1];
      np[i] = {
        x: (k - i) / k * pi5.x + i / k * pim.x,
        y: (k - i) / k * pi5.y + i / k * pim.y
      };
    }
    np[k] = p[k - 1];
    return new _Bezier(np);
  }
  derivative(t2) {
    return utils.compute(t2, this.dpoints[0], this._3d);
  }
  dderivative(t2) {
    return utils.compute(t2, this.dpoints[1], this._3d);
  }
  align() {
    let p = this.points;
    return new _Bezier(utils.align(p, { p1: p[0], p2: p[p.length - 1] }));
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
    return { t: t2, x: -d.y / q, y: d.x / q };
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
      t: t2,
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
      left: this.order === 2 ? new _Bezier([q[0], q[3], q[5]]) : new _Bezier([q[0], q[4], q[7], q[9]]),
      right: this.order === 2 ? new _Bezier([q[5], q[4], q[2]]) : new _Bezier([q[9], q[8], q[6], q[3]]),
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
    this.dims.forEach(
      function(dim) {
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
      }.bind(this)
    );
    result.values = roots.sort(utils.numberSort).filter(function(v, idx) {
      return roots.indexOf(v) === idx;
    });
    return result;
  }
  bbox() {
    const extrema = this.extrema(), result = {};
    this.dims.forEach(
      function(d) {
        result[d] = utils.getminmax(this, d, extrema[d]);
      }.bind(this)
    );
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
      return [new _Bezier(coords)];
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
      if (a1 > 0 && a2 < 0 || a1 < 0 && a2 > 0) return false;
    }
    const n1 = this.normal(0);
    const n2 = this.normal(1);
    let s = n1.x * n2.x + n1.y * n2.y;
    if (this._3d) {
      s += n1.z * n2.z;
    }
    return abs3(acos2(s)) < pi2 / 3;
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
            if (abs3(t1 - t2) < step) {
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
    return new _Bezier(
      this.points.map((p, i) => ({
        x: p.x + v.x * d[i],
        y: p.y + v.y * d[i]
      }))
    );
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
      return this.translate(
        this.normal(0),
        distanceFn ? distanceFn(0) : d,
        distanceFn ? distanceFn(1) : d
      );
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
        if (order === 2 && !!t2) return;
        const p = np[t2 * order];
        const d2 = this.derivative(t2);
        const p2 = { x: p.x + d2.x, y: p.y + d2.y };
        np[t2 + 1] = utils.lli4(p, p2, o, points[t2 + 1]);
      });
      return new _Bezier(np);
    }
    [0, 1].forEach(function(t2) {
      if (order === 2 && !!t2) return;
      var p = points[t2 + 1];
      var ov = {
        x: p.x - o.x,
        y: p.y - o.y
      };
      var rc = distanceFn ? distanceFn((t2 + 1) / order) : d;
      if (distanceFn && !clockwise) rc = -rc;
      var m = sqrt2(ov.x * ov.x + ov.y * ov.y);
      ov.x /= m;
      ov.y /= m;
      np[t2 + 1] = {
        x: p.x + rc * ov.x,
        y: p.y + rc * ov.y
      };
    });
    return new _Bezier(np);
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
      const segments2 = [ls2, new _Bezier(fline), le2, new _Bezier(bline)];
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
        fcurves.push(
          segment.scale(linearDistanceFunction(d1, d3, tlen, alen, slen))
        );
        bcurves.push(
          segment.scale(linearDistanceFunction(-d2, -d4, tlen, alen, slen))
        );
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
      const shape = utils.makeshape(
        outline[i],
        outline[len - i],
        curveIntersectionThreshold
      );
      shape.startcap.virtual = i > 1;
      shape.endcap.virtual = i < len / 2 - 1;
      shapes.push(shape);
    }
    return shapes;
  }
  intersects(curve, curveIntersectionThreshold) {
    if (!curve) return this.selfintersects(curveIntersectionThreshold);
    if (curve.p1 && curve.p2) {
      return this.lineIntersects(curve);
    }
    if (curve instanceof _Bezier) {
      curve = curve.reduce();
    }
    return this.curveintersects(
      this.reduce(),
      curve,
      curveIntersectionThreshold
    );
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
      const result = utils.pairiteration(
        pair.left,
        pair.right,
        curveIntersectionThreshold
      );
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
    return abs3(d1 - ref) + abs3(d2 - ref);
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
        if (!done) prev_e = t_e;
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

// src/geometry/bezier/index.ts
var quadraticBend = (a, b, bend = 0) => quadraticSimple(a, b, bend);
var quadraticSimple = (start, end, bend = 0) => {
  if (Number.isNaN(bend)) throw new Error(`bend is NaN`);
  if (bend < -1 || bend > 1) throw new Error(`Expects bend range of -1 to 1`);
  const middle = interpolate(0.5, start, end);
  let target = middle;
  if (end.y < start.y) {
    target = bend > 0 ? { x: Math.min(start.x, end.x), y: Math.min(start.y, end.y) } : { x: Math.max(start.x, end.x), y: Math.max(start.y, end.y) };
  } else {
    target = bend > 0 ? { x: Math.max(start.x, end.x), y: Math.min(start.y, end.y) } : { x: Math.min(start.x, end.x), y: Math.max(start.y, end.y) };
  }
  const handle = interpolate(Math.abs(bend), middle, target);
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
    nearest: (_) => {
      throw new Error(`not implemented`);
    },
    bbox: () => {
      const { x, y } = bzr.bbox();
      const xSize = x.size;
      const ySize = y.size;
      if (xSize === void 0) throw new Error(`x.size not present on calculated bbox`);
      if (ySize === void 0) throw new Error(`x.size not present on calculated bbox`);
      return fromTopLeft({ x: x.min, y: y.min }, xSize, ySize);
    },
    relativePosition: (_point, _intersectionThreshold) => {
      throw new Error(`Not implemented`);
    },
    distanceToPoint: (_point) => {
      throw new Error(`Not implemented`);
    },
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
    nearest: (_) => {
      throw new Error(`not implemented`);
    },
    bbox: () => {
      const { x, y } = bzr.bbox();
      const xSize = x.size;
      const ySize = y.size;
      if (xSize === void 0) throw new Error(`x.size not present on calculated bbox`);
      if (ySize === void 0) throw new Error(`x.size not present on calculated bbox`);
      return fromTopLeft({ x: x.min, y: y.min }, xSize, ySize);
    },
    distanceToPoint: (_point) => {
      throw new Error(`Not implemented`);
    },
    relativePosition: (_point, _intersectionThreshold) => {
      throw new Error(`Not implemented`);
    },
    toString: () => bzr.toString(),
    toSvgString: () => quadraticToSvgString(a, b, quadratic2),
    kind: `bezier/quadratic`
  });
};

// src/geometry/path/CompoundPath.ts
var CompoundPath_exports = {};
__export(CompoundPath_exports, {
  bbox: () => bbox4,
  computeDimensions: () => computeDimensions,
  distanceToPoint: () => distanceToPoint,
  fromPaths: () => fromPaths,
  guardContinuous: () => guardContinuous,
  interpolate: () => interpolate4,
  relativePosition: () => relativePosition2,
  setSegment: () => setSegment,
  toString: () => toString4,
  toSvgString: () => toSvgString2
});
var setSegment = (compoundPath, index, path) => {
  const existing = [...compoundPath.segments];
  existing[index] = path;
  return fromPaths(...existing);
};
var interpolate4 = (paths, t2, useWidth, dimensions) => {
  if (dimensions === void 0) {
    dimensions = computeDimensions(paths);
  }
  const expected = t2 * (useWidth ? dimensions.totalWidth : dimensions.totalLength);
  let soFar = 0;
  const l = useWidth ? dimensions.widths : dimensions.lengths;
  for (const [index, element] of l.entries()) {
    if (soFar + element >= expected) {
      const relative = expected - soFar;
      let amt = relative / element;
      if (amt > 1) amt = 1;
      return paths[index].interpolate(amt);
    } else soFar += element;
  }
  return { x: 0, y: 0 };
};
var distanceToPoint = (paths, point2) => {
  if (paths.length === 0) return 0;
  let distances = paths.map((p, index) => ({ path: p, index, distance: p.distanceToPoint(point2) }));
  distances = sortByNumericProperty(distances, `distance`);
  if (distances.length === 0) throw new Error(`Could not look up distances`);
  return distances[0].distance;
};
var relativePosition2 = (paths, point2, intersectionThreshold, dimensions) => {
  if (dimensions === void 0) {
    dimensions = computeDimensions(paths);
  }
  let distances = paths.map((p, index) => ({ path: p, index, distance: p.distanceToPoint(point2) }));
  distances = sortByNumericProperty(distances, `distance`);
  if (distances.length < 0) throw new Error(`Point does not intersect with path`);
  const d = distances[0];
  if (d.distance > intersectionThreshold) throw new Error(`Point does not intersect with path. Minimum distance: ${d.distance}, threshold: ${intersectionThreshold}`);
  const relativePositionOnPath = d.path.relativePosition(point2, intersectionThreshold);
  let accumulated = 0;
  for (let index = 0; index < d.index; index++) {
    accumulated += dimensions.lengths[index];
  }
  accumulated += dimensions.lengths[d.index] * relativePositionOnPath;
  const accumulatedRel = accumulated / dimensions.totalLength;
  console.log(`acc: ${accumulated} rel: ${accumulatedRel} on path: ${relativePositionOnPath} path: ${d.index}`);
  return accumulatedRel;
};
var computeDimensions = (paths) => {
  const widths = paths.map((l) => l.bbox().width);
  const lengths3 = paths.map((l) => l.length());
  let totalLength = 0;
  let totalWidth = 0;
  for (const length5 of lengths3) {
    totalLength += length5;
  }
  for (const width of widths) {
    totalWidth += width;
  }
  return { totalLength, totalWidth, widths, lengths: lengths3 };
};
var bbox4 = (paths) => {
  const boxes = paths.map((p) => p.bbox());
  const corners3 = boxes.flatMap((b) => corners(b));
  return bbox(...corners3);
};
var toString4 = (paths) => paths.map((p) => p.toString()).join(`, `);
var guardContinuous = (paths) => {
  let lastPos = getEnd(paths[0]);
  for (let index = 1; index < paths.length; index++) {
    const start = getStart(paths[index]);
    if (!isEqual(start, lastPos)) throw new Error(`Path index ${index} does not start at prior path end. Start: ${start.x},${start.y} expected: ${lastPos.x},${lastPos.y}`);
    lastPos = getEnd(paths[index]);
  }
};
var toSvgString2 = (paths) => paths.flatMap((p) => p.toSvgString());
var fromPaths = (...paths) => {
  guardContinuous(paths);
  const dims = computeDimensions(paths);
  return Object.freeze({
    segments: paths,
    length: () => dims.totalLength,
    nearest: (_) => {
      throw new Error(`not implemented`);
    },
    interpolate: (t2, useWidth = false) => interpolate4(paths, t2, useWidth, dims),
    relativePosition: (point2, intersectionThreshold) => relativePosition2(paths, point2, intersectionThreshold, dims),
    distanceToPoint: (point2) => distanceToPoint(paths, point2),
    bbox: () => bbox4(paths),
    toString: () => toString4(paths),
    toSvgString: () => toSvgString2(paths),
    kind: `compound`
  });
};

// src/geometry/Ellipse.ts
var Ellipse_exports = {};
__export(Ellipse_exports, {
  fromDegrees: () => fromDegrees
});
var fromDegrees = (radiusX, radiusY, rotationDeg = 0, startAngleDeg = 0, endAngleDeg = 360) => ({
  radiusX,
  radiusY,
  rotation: degreeToRadian(rotationDeg),
  startAngle: degreeToRadian(startAngleDeg),
  endAngle: degreeToRadian(endAngleDeg)
});

// src/geometry/CurveSimplification.ts
var CurveSimplification_exports = {};
__export(CurveSimplification_exports, {
  rdpPerpendicularDistance: () => rdpPerpendicularDistance,
  rdpShortestDistance: () => rdpShortestDistance
});
var rdpShortestDistance = (points, epsilon2 = 0.1) => {
  const firstPoint = points[0];
  const lastPoint = points.at(-1);
  if (points.length < 3) {
    return points;
  }
  let index = -1;
  let distribution = 0;
  for (let index_ = 1; index_ < points.length - 1; index_++) {
    const cDistribution = distanceFromPointToLine(points[index_], firstPoint, lastPoint);
    if (cDistribution > distribution) {
      distribution = cDistribution;
      index = index_;
    }
  }
  if (distribution > epsilon2) {
    const l1 = points.slice(0, index + 1);
    const l2 = points.slice(index);
    const r1 = rdpShortestDistance(l1, epsilon2);
    const r2 = rdpShortestDistance(l2, epsilon2);
    const rs = [...r1.slice(0, -1), ...r2];
    return rs;
  } else {
    return [firstPoint, lastPoint];
  }
};
var rdpPerpendicularDistance = (points, epsilon2 = 0.1) => {
  const firstPoint = points[0];
  const lastPoint = points.at(-1);
  if (points.length < 3) {
    return points;
  }
  let index = -1;
  let distribution = 0;
  for (let index_ = 1; index_ < points.length - 1; index_++) {
    const cDistribution = findPerpendicularDistance(points[index_], firstPoint, lastPoint);
    if (cDistribution > distribution) {
      distribution = cDistribution;
      index = index_;
    }
  }
  if (distribution > epsilon2) {
    const l1 = points.slice(0, index + 1);
    const l2 = points.slice(index);
    const r1 = rdpPerpendicularDistance(l1, epsilon2);
    const r2 = rdpPerpendicularDistance(l2, epsilon2);
    const rs = [...r1.slice(0, -1), ...r2];
    return rs;
  } else {
    return [firstPoint, lastPoint];
  }
};
function findPerpendicularDistance(p, p1, p2) {
  let result;
  let slope2;
  let intercept;
  if (p1.x == p2.x) {
    result = Math.abs(p.x - p1.x);
  } else {
    slope2 = (p2.y - p1.y) / (p2.x - p1.x);
    intercept = p1.y - slope2 * p1.x;
    result = Math.abs(slope2 * p.x - p.y + intercept) / Math.sqrt(Math.pow(slope2, 2) + 1);
  }
  return result;
}
var distanceFromPointToLine = (p, index, index_) => {
  const lineLength = distance(index, index_);
  if (lineLength == 0) {
    return distance(p, index);
  }
  const t2 = ((p.x - index.x) * (index_.x - index.x) + (p.y - index.y) * (index_.y - index.y)) / lineLength;
  if (t2 < 0) {
    return distance(p, index);
  }
  if (t2 > 1) {
    return distance(p, index_);
  }
  return distance(p, { x: index.x + t2 * (index_.x - index.x), y: index.y + t2 * (index_.y - index.y) });
};

// src/geometry/QuadTree.ts
var QuadTree_exports = {};
__export(QuadTree_exports, {
  Direction: () => Direction,
  QuadTreeNode: () => QuadTreeNode,
  quadTree: () => quadTree
});
var Direction = /* @__PURE__ */ ((Direction2) => {
  Direction2[Direction2["Nw"] = 0] = "Nw";
  Direction2[Direction2["Ne"] = 1] = "Ne";
  Direction2[Direction2["Sw"] = 2] = "Sw";
  Direction2[Direction2["Se"] = 3] = "Se";
  return Direction2;
})(Direction || {});
var quadTree = (bounds, initialData = [], opts = {}) => {
  const o = {
    maxItems: opts.maxItems ?? 4,
    maxLevels: opts.maxLevels ?? 4
  };
  const n = new QuadTreeNode(void 0, bounds, 0, o);
  for (const d of initialData) {
    n.add(d);
  }
  return n;
};
var QuadTreeNode = class _QuadTreeNode {
  /**
   * Constructor
   * @param boundary
   * @param level
   * @param opts
   */
  constructor(parent, boundary, level, opts) {
    this.boundary = boundary;
    this.level = level;
    this.opts = opts;
    this.#parent = parent;
  }
  #items = [];
  #children = [];
  #parent;
  getLengthChildren() {
    return this.#children.length;
  }
  *parents() {
    let n = this;
    while (n.#parent !== void 0) {
      yield n.#parent;
      n = n.#parent;
    }
  }
  getParent() {
    return this.#parent;
  }
  /**
   * Iterates over immediate children
   */
  *children() {
    for (const c of this.#children) {
      yield c;
    }
  }
  /**
   * Array of QuadTreeItem
   * @returns
   */
  getValue() {
    return this.#items;
  }
  getIdentity() {
    return this;
  }
  /**
   * Get a descendant node in a given direction
   * @param d
   * @returns
   */
  direction(d) {
    return this.#children[d];
  }
  /**
   * Add an item to the quadtree
   * @param p
   * @returns False if item is outside of boundary, True if item was added
   */
  add(p) {
    if (!isIntersecting3(this.boundary, p)) return false;
    if (this.#children.length > 0) {
      for (const d of this.#children) d.add(p);
      return true;
    }
    this.#items.push(p);
    if (this.#items.length > this.opts.maxItems && this.level < this.opts.maxLevels) {
      if (this.#children.length === 0) {
        this.#subdivide();
      }
      for (const item of this.#items) {
        for (const d of this.#children) d.add(item);
      }
      this.#items = [];
    }
    return true;
  }
  /**
   * Returns true if point is inside node's boundary
   * @param p
   * @returns
   */
  couldHold(p) {
    return intersectsPoint(this.boundary, p);
  }
  #subdivide() {
    const w = this.boundary.width / 2;
    const h = this.boundary.height / 2;
    const x = this.boundary.x;
    const y = this.boundary.y;
    const coords = fromNumbers2(x + w, y, x, y, x, y + h, x + w, y + h);
    const rects = coords.map((p) => fromTopLeft(p, w, h));
    this.#children = rects.map(
      (r) => new _QuadTreeNode(this, r, this.level + 1, this.opts)
    );
  }
};

// src/geometry/Scaler.ts
var Scaler_exports = {};
__export(Scaler_exports, {
  scaler: () => scaler
});

// src/geometry/rect/Placeholder.ts
var placeholder = Object.freeze({
  width: Number.NaN,
  height: Number.NaN
});
var placeholderPositioned = Object.freeze({
  x: Number.NaN,
  y: Number.NaN,
  width: Number.NaN,
  height: Number.NaN
});

// src/geometry/Scaler.ts
var scaler = (scaleBy = `both`, defaultRect) => {
  const defaultBounds = defaultRect ?? placeholder;
  let sw = 1;
  let sh = 1;
  let s = { x: 1, y: 1 };
  const computeScale = () => {
    switch (scaleBy) {
      case `height`: {
        return { x: sh, y: sh };
      }
      case `width`: {
        return { x: sw, y: sw };
      }
      case `min`: {
        return { x: Math.min(sw, sh), y: Math.min(sw, sh) };
      }
      case `max`: {
        return { x: Math.max(sw, sh), y: Math.max(sw, sh) };
      }
      default: {
        return { x: sw, y: sh };
      }
    }
  };
  const normalise4 = (a, b, c, d) => {
    let inX = Number.NaN;
    let inY = Number.NaN;
    let outW = defaultBounds.width;
    let outH = defaultBounds.height;
    if (typeof a === `number`) {
      inX = a;
      if (typeof b === `number`) {
        inY = b;
        if (c === void 0) return [inX, inY, outW, outH];
        if (isRect(c)) {
          outW = c.width;
          outH = c.height;
        } else if (typeof c === `number`) {
          outW = c;
          if (typeof d === `number`) {
            outH = d;
          } else {
            throw new TypeError(`Missing final height value`);
          }
        } else throw new Error(`Missing valid output range`);
      } else if (isRect(b)) {
        outW = b.width;
        outH = b.height;
      } else {
        throw new Error(
          `Expected input y or output Rect to follow first number parameter`
        );
      }
    } else if (isPoint(a)) {
      inX = a.x;
      inY = a.y;
      if (b === void 0) return [inX, inY, outW, outH];
      if (isRect(b)) {
        outW = b.width;
        outH = b.height;
      } else if (typeof b === `number`) {
        outW = b;
        if (typeof c === `number`) {
          outH = c;
        } else {
          throw new TypeError(
            `Expected height as third parameter after Point and output width`
          );
        }
      } else {
        throw new TypeError(
          `Expected Rect or width as second parameter when first parameter is a Point`
        );
      }
    } else {
      throw new Error(`Expected input Point or x value as first parameter`);
    }
    return [inX, inY, outW, outH];
  };
  const scaleAbs = (a, b, c, d) => {
    const n = normalise4(a, b, c, d);
    return scaleNormalised(true, ...n);
  };
  const scaleRel = (a, b, c, d) => {
    const n = normalise4(a, b, c, d);
    return scaleNormalised(false, ...n);
  };
  const scaleNormalised = (abs4, x, y, w, h) => {
    if (Number.isNaN(w)) throw new Error(`Output width range missing`);
    if (Number.isNaN(h)) throw new Error(`Output height range missing`);
    if (w !== sw || h !== sh) {
      sw = w;
      sh = h;
      s = computeScale();
    }
    return abs4 ? {
      x: x * s.x,
      y: y * s.y
    } : {
      x: x / s.x,
      y: y / s.y
    };
  };
  return {
    computeScale,
    rel: scaleRel,
    abs: scaleAbs,
    width: defaultBounds.width,
    height: defaultBounds.height
  };
};

// src/geometry/Convolve2d.ts
var Convolve2d_exports = {};
__export(Convolve2d_exports, {
  boxBlurKernel: () => boxBlurKernel,
  convolve: () => convolve,
  convolveCell: () => convolveCell,
  convolveImage: () => convolveImage,
  edgeDetectionKernel: () => edgeDetectionKernel,
  gaussianBlur3Kernel: () => gaussianBlur3Kernel,
  gaussianBlur5Kernel: () => gaussianBlur5Kernel,
  identityKernel: () => identityKernel,
  kernel2dToArray: () => kernel2dToArray,
  multiply: () => multiply5,
  rgbReducer: () => rgbReducer,
  sharpenKernel: () => sharpenKernel,
  unsharpMasking5Kernel: () => unsharpMasking5Kernel
});

// src/visual/ImageDataGrid.ts
var ImageDataGrid_exports = {};
__export(ImageDataGrid_exports, {
  accessor: () => accessor
});
var accessor = (image) => {
  const grid = { rows: image.width, cols: image.height };
  const data = image.data;
  const fn = (cell, bounds) => {
    const index = indexFromCell(grid, cell, bounds);
    if (index === void 0) {
      return void 0;
    }
    const pxIndex = index * 4;
    return {
      r: data[pxIndex],
      g: data[pxIndex + 1],
      b: data[pxIndex + 2],
      opacity: data[pxIndex + 3],
      space: `srgb`
    };
  };
  return fn;
};

// src/geometry/Convolve2d.ts
var multiply5 = (kernel, scalar) => {
  const rows2 = kernel.length;
  const cols = kernel[0].length;
  const copy = [];
  for (let row = 0; row < rows2; row++) {
    copy[row] = [];
    for (let col = 0; col < cols; col++) {
      copy[row][col] = kernel[row][col] * scalar;
    }
  }
  return copy;
};
function convolveCell(c, kernel, source, access, reduce2) {
  const valuesAtKernelPos = kernel.map((o) => {
    const pos = offset(source, c, o[0], `stop`);
    if (!pos) return [o[1], void 0];
    return [o[1], access(pos, `undefined`)];
  });
  return reduce2(valuesAtKernelPos);
}
function* convolveImage(kernel, image) {
  const grid = { rows: image.width, cols: image.height };
  const imageDataAsGrid = accessor(image);
  yield* convolve(kernel, grid, imageDataAsGrid, cells(grid), rgbReducer);
}
function* convolve(kernel, source, access, visitor2, reduce2, origin) {
  if (!origin) {
    const kernelRows = kernel.length;
    const kernelCols = kernel[0].length;
    origin = { x: Math.floor(kernelRows / 2), y: Math.floor(kernelCols / 2) };
  }
  const asArray = kernel2dToArray(kernel, origin);
  for (const c of visitor2) {
    const v = convolveCell(c, asArray, source, access, reduce2);
    yield [c, v];
  }
}
var kernel2dToArray = (kernel, origin) => {
  const offsets = [];
  const rows2 = kernel.length;
  const cols = kernel[0].length;
  if (!origin) origin = { x: Math.floor(rows2 / 2), y: Math.floor(cols / 2) };
  for (let xx = 0; xx < rows2; xx++) {
    for (let yy = 0; yy < cols; yy++) {
      offsets.push([{ x: xx - origin.x, y: yy - origin.y }, kernel[xx][yy]]);
    }
  }
  return offsets;
};
var rgbReducer = (values) => {
  let r = 0;
  let g = 0;
  let b = 0;
  const opacity = 0;
  for (const value of values) {
    const rgb = value[1];
    const scale2 = value[0];
    if (rgb === void 0) continue;
    if (rgb.opacity === 0) continue;
    if (scale2 === 0) continue;
    r += rgb.r * scale2;
    g += rgb.g * scale2;
    b += rgb.b * scale2;
  }
  const result = {
    r,
    g,
    b,
    opacity: 255,
    space: `srgb`
  };
  return result;
};
var identityKernel = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0]
];
var edgeDetectionKernel = [
  [0, -1, 0],
  [-1, 4, -1],
  [0, -1, 0]
];
var sharpenKernel = [
  [0, -1, 0],
  [-1, 5, -1],
  [0, -1, 0]
];
var boxBlurKernel = multiply5([
  [1, 1, 1],
  [1, 1, 1],
  [1, 1, 1]
], 1 / 9);
var gaussianBlur3Kernel = multiply5([
  [1, 2, 1],
  [2, 4, 2],
  [1, 2, 1]
], 1 / 16);
var gaussianBlur5Kernel = multiply5([
  [1, 4, 6, 4, 1],
  [4, 16, 24, 16, 4],
  [6, 24, 36, 24, 6],
  [4, 16, 24, 16, 4],
  [1, 4, 6, 4, 1]
], 1 / 256);
var unsharpMasking5Kernel = multiply5([
  [1, 4, 6, 4, 1],
  [4, 16, 24, 16, 4],
  [6, 24, -476, 24, 6],
  [4, 16, 24, 16, 4],
  [1, 4, 6, 4, 1]
], -1 / 256);

// src/geometry/arc/index.ts
var arc_exports = {};
__export(arc_exports, {
  bbox: () => bbox5,
  distanceCenter: () => distanceCenter2,
  fromDegrees: () => fromDegrees2,
  guard: () => guard6,
  interpolate: () => interpolate5,
  isArc: () => isArc,
  isEqual: () => isEqual6,
  isPositioned: () => isPositioned3,
  length: () => length4,
  point: () => point,
  toLine: () => toLine,
  toPath: () => toPath4,
  toSvg: () => toSvg2
});
var isArc = (p) => p.startRadian !== void 0 && p.endRadian !== void 0;
var isPositioned3 = (p) => p.x !== void 0 && p.y !== void 0;
var piPi4 = Math.PI * 2;
function fromDegrees2(radius, startDegrees, endDegrees, origin) {
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
var toLine = (arc) => fromPoints(
  point(arc, arc.startRadian),
  point(arc, arc.endRadian)
);
var point = (arc, angleRadian3, origin) => {
  if (angleRadian3 > arc.endRadian) throw new Error(`angleRadian beyond end angle of arc`);
  if (angleRadian3 < arc.startRadian) throw new Error(`angleRadian beyond start angle of arc`);
  if (origin === void 0) {
    origin = isPositioned3(arc) ? arc : { x: 0, y: 0 };
  }
  return {
    x: Math.cos(angleRadian3) * arc.radius + origin.x,
    y: Math.sin(angleRadian3) * arc.radius + origin.y
  };
};
var guard6 = (arc) => {
  if (arc === void 0) throw new Error(`Arc is undefined`);
  if (isPositioned3(arc)) {
    guard(arc, `arc`);
  }
  if (arc.radius === void 0) throw new Error(`Arc radius is undefined (${JSON.stringify(arc)})`);
  if (typeof arc.radius !== `number`) throw new Error(`Radius must be a number`);
  if (Number.isNaN(arc.radius)) throw new Error(`Radius is NaN`);
  if (arc.radius <= 0) throw new Error(`Radius must be greater than zero`);
  if (arc.startRadian === void 0) throw new Error(`Arc is missing 'startRadian' field`);
  if (arc.endRadian === void 0) throw new Error(`Arc is missing 'startRadian' field`);
  if (Number.isNaN(arc.endRadian)) throw new Error(`Arc endRadian is NaN`);
  if (Number.isNaN(arc.startRadian)) throw new Error(`Arc endRadian is NaN`);
  if (arc.startRadian >= arc.endRadian) throw new Error(`startRadian is expected to be les than endRadian`);
};
var interpolate5 = (amount, arc, origin) => {
  guard6(arc);
  return point(arc, arc.startRadian + (arc.endRadian - arc.startRadian) * amount, origin);
};
var toPath4 = (arc) => {
  guard6(arc);
  return Object.freeze({
    ...arc,
    nearest: (point2) => {
      throw new Error(`not implemented`);
    },
    interpolate: (amount) => interpolate5(amount, arc),
    bbox: () => bbox5(arc),
    length: () => length4(arc),
    toSvgString: () => toSvg2(arc),
    relativePosition: (_point, _intersectionThreshold) => {
      throw new Error(`Not implemented`);
    },
    distanceToPoint: (_point) => {
      throw new Error(`Not implemented`);
    },
    kind: `arc`
  });
};
var length4 = (arc) => piPi4 * arc.radius * ((arc.startRadian - arc.endRadian) / piPi4);
var bbox5 = (arc) => {
  if (isPositioned3(arc)) {
    const middle = interpolate5(0.5, arc);
    const asLine = toLine(arc);
    return bbox(middle, asLine.a, asLine.b);
  } else {
    return {
      width: arc.radius * 2,
      height: arc.radius * 2
    };
  }
};
var toSvg2 = (a, b, c, d, e) => {
  if (isArc(a)) {
    if (isPositioned3(a)) {
      return toSvgFull2(a, a.radius, a.startRadian, a.endRadian, b);
    } else {
      return isPoint(b) ? toSvgFull2(b, a.radius, a.startRadian, a.endRadian, c) : toSvgFull2({ x: 0, y: 0 }, a.radius, a.startRadian, a.endRadian);
    }
  } else {
    if (c === void 0) throw new Error(`startAngle undefined`);
    if (d === void 0) throw new Error(`endAngle undefined`);
    if (isPoint(a)) {
      if (typeof b === `number` && typeof c === `number` && typeof d === `number`) {
        return toSvgFull2(a, b, c, d, e);
      } else {
        throw new TypeError(`Expected (point, number, number, number). Missing a number param.`);
      }
    } else {
      throw new Error(`Expected (point, number, number, number). Missing first point.`);
    }
  }
};
var toSvgFull2 = (origin, radius, startRadian, endRadian, opts) => {
  if (opts === void 0 || typeof opts !== `object`) opts = {};
  const isFullCircle = endRadian - startRadian === 360;
  const start = toCartesian(radius, endRadian - 0.01, origin);
  const end = toCartesian(radius, startRadian, origin);
  const { largeArc = false, sweep = false } = opts;
  const d = [`
    M ${start.x} ${start.y}
    A ${radius} ${radius} 0 ${largeArc ? `1` : `0`} ${sweep ? `1` : `0`} ${end.x} ${end.y},
  `];
  if (isFullCircle) d.push(`z`);
  return d;
};
var distanceCenter2 = (a, b) => distance(a, b);
var isEqual6 = (a, b) => {
  if (a.radius !== b.radius) return false;
  if (isPositioned3(a) && isPositioned3(b)) {
    if (a.x !== b.x) return false;
    if (a.y !== b.y) return false;
    if (a.z !== b.z) return false;
    return true;
  } else if (!isPositioned3(a) && !isPositioned3(b)) {
  } else return false;
  if (a.endRadian !== b.endRadian) return false;
  if (a.startRadian !== b.startRadian) return false;
  return true;
};

// src/geometry/Vector.ts
var Vector_exports = {};
__export(Vector_exports, {
  clampMagnitude: () => clampMagnitude3,
  divide: () => divide4,
  dotProduct: () => dotProduct4,
  fromLineCartesian: () => fromLineCartesian,
  fromLinePolar: () => fromLinePolar,
  fromPointPolar: () => fromPointPolar,
  fromRadians: () => fromRadians,
  multiply: () => multiply6,
  normalise: () => normalise3,
  quadrantOffsetAngle: () => quadrantOffsetAngle,
  subtract: () => subtract4,
  sum: () => sum4,
  toCartesian: () => toCartesian2,
  toPolar: () => toPolar,
  toRadians: () => toRadians,
  toString: () => toString5
});
var EmptyCartesian2 = Object.freeze({ x: 0, y: 0 });
var piPi5 = Math.PI * 2;
var pi3 = Math.PI;
var fromRadians = (radians) => {
  return Object.freeze({
    x: Math.cos(radians),
    y: Math.sin(radians)
  });
};
var toRadians = (point2) => {
  return Math.atan2(point2.y, point2.x);
};
var fromPointPolar = (pt, angleNormalisation = ``, origin = EmptyCartesian2) => {
  pt = subtract(pt, origin);
  let direction = Math.atan2(pt.y, pt.x);
  if (angleNormalisation === `unipolar` && direction < 0) direction += piPi5;
  else if (angleNormalisation === `bipolar`) {
    if (direction > pi3) direction -= piPi5;
    else if (direction <= -pi3) direction += piPi5;
  }
  return Object.freeze({
    distance: distance(pt),
    angleRadian: direction
  });
};
var fromLineCartesian = (line) => subtract(line.b, line.a);
var fromLinePolar = (line) => {
  guard2(line, `line`);
  const pt = subtract(line.b, line.a);
  return fromPointPolar(pt);
};
var isPolar = (v) => {
  if (isPolarCoord(v)) return true;
  return false;
};
var isCartesian = (v) => {
  if (isPoint(v)) return true;
  return false;
};
var normalise3 = (v) => {
  if (isPolar(v)) {
    return normalise(v);
  } else if (isCartesian(v)) {
    return normalise2(v);
  }
  throw new Error(`Expected polar/cartesian vector. Got: ${v}`);
};
var quadrantOffsetAngle = (p) => {
  if (p.x >= 0 && p.y >= 0) return 0;
  if (p.x < 0 && p.y >= 0) return pi3;
  if (p.x < 0 && p.y < 0) return pi3;
  return piPi5;
};
var toPolar = (v, origin = Empty) => {
  if (isPolar(v)) {
    return v;
  } else if (isCartesian(v)) {
    return fromCartesian(v, origin);
  }
  throw new Error(`Expected polar/cartesian vector. Got: ${v}`);
};
var toCartesian2 = (v) => {
  if (isPolar(v)) {
    return toPoint(v);
  } else if (isCartesian(v)) {
    return v;
  }
  throw new Error(`Expected polar/cartesian vector. Got: ${v}`);
};
var toString5 = (v, digits) => {
  if (isPolar(v)) {
    return toString(v, digits);
  } else if (isCartesian(v)) {
    return toString2(v, digits);
  }
  throw new Error(`Expected polar/cartesian vector. Got: ${v}`);
};
var dotProduct4 = (a, b) => {
  if (isPolar(a) && isPolar(b)) {
    return dotProduct2(a, b);
  } else if (isCartesian(a) && isCartesian(b)) {
    return dotProduct3(a, b);
  }
  throw new Error(`Expected two polar/Cartesian vectors.`);
};
var clampMagnitude3 = (v, max2 = 1, min2 = 0) => {
  if (isPolar(v)) {
    return clampMagnitude(v, max2, min2);
  } else if (isCartesian(v)) {
    return clampMagnitude2(v, max2, min2);
  }
  throw new Error(`Expected either polar or Cartesian vector`);
};
var sum4 = (a, b) => {
  const polar = isPolar(a);
  a = toCartesian2(a);
  b = toCartesian2(b);
  const c = sum(a, b);
  return polar ? toPolar(c) : c;
};
var subtract4 = (a, b) => {
  const polar = isPolar(a);
  a = toCartesian2(a);
  b = toCartesian2(b);
  const c = subtract(a, b);
  return polar ? toPolar(c) : c;
};
var multiply6 = (a, b) => {
  const polar = isPolar(a);
  a = toCartesian2(a);
  b = toCartesian2(b);
  const c = multiply2(a, b);
  return polar ? toPolar(c) : c;
};
var divide4 = (a, b) => {
  const polar = isPolar(a);
  a = toCartesian2(a);
  b = toCartesian2(b);
  const c = divide(a, b);
  return polar ? toPolar(c) : c;
};

// src/geometry/SurfacePoints.ts
var SurfacePoints_exports = {};
__export(SurfacePoints_exports, {
  circleRings: () => circleRings,
  circleVogelSpiral: () => circleVogelSpiral,
  sphereFibonacci: () => sphereFibonacci
});
var cos3 = Math.cos;
var sin3 = Math.sin;
var asin = Math.asin;
var sqrt3 = Math.sqrt;
var pow2 = Math.pow;
var pi4 = Math.PI;
var piPi6 = Math.PI * 2;
var goldenAngle = pi4 * (3 - sqrt3(5));
var goldenSection = (1 + sqrt3(5)) / 2;
function* circleVogelSpiral(circle, opts = {}) {
  const maxPoints = opts.maxPoints ?? 5e3;
  const density = opts.density ?? 0.95;
  const rotationOffset = opts.rotation ?? 0;
  const c = toPositioned(circle ?? { radius: 1, x: 0, y: 0 });
  const max2 = c.radius;
  let spacing = c.radius * scale(density, 0, 1, 0.3, 0.01);
  if (opts.spacing) spacing = opts.spacing;
  let radius = 0;
  let count = 0;
  let angle = 0;
  while (count < maxPoints && radius < max2) {
    radius = spacing * count ** 0.5;
    angle = rotationOffset + count * 2 * pi4 / goldenSection;
    yield Object.freeze({
      x: c.x + radius * cos3(angle),
      y: c.y + radius * sin3(angle)
    });
    count++;
  }
}
function* circleRings(circle, opts = {}) {
  const rings = opts.rings ?? 5;
  const c = toPositioned(circle ?? { radius: 1, x: 0, y: 0 });
  const ringR = 1 / rings;
  const rotationOffset = opts.rotation ?? 0;
  let ringCount = 1;
  yield Object.freeze({ x: c.x, y: c.y });
  for (let r = ringR; r <= 1; r += ringR) {
    const n = Math.round(pi4 / asin(1 / (2 * ringCount)));
    for (const theta of linearSpace(0, piPi6, n + 1)) {
      yield Object.freeze({
        x: c.x + r * cos3(theta + rotationOffset) * c.radius,
        y: c.y + r * sin3(theta + rotationOffset) * c.radius
      });
    }
    ringCount++;
  }
}
function* sphereFibonacci(samples = 100, rotationRadians = 0, sphere) {
  const offset2 = 2 / samples;
  const s = sphere ?? { x: 0, y: 0, z: 0, radius: 1 };
  for (let index = 0; index < samples; index++) {
    const y = index * offset2 - 1 + offset2 / 2;
    const r = sqrt3(1 - pow2(y, 2));
    const a = (index + 1) % samples * goldenAngle + rotationRadians;
    const x = cos3(a) * r;
    const z = sin3(a) * r;
    yield Object.freeze({
      x: s.x + x * s.radius,
      y: s.y + y * s.radius,
      z: s.z + z * s.radius
    });
  }
}

// src/geometry/triangle/index.ts
var triangle_exports = {};
__export(triangle_exports, {
  Empty: () => Empty3,
  Equilateral: () => Equilateral_exports,
  Isosceles: () => Isosceles_exports,
  Placeholder: () => Placeholder3,
  Right: () => Right_exports,
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
  equilateralFromVertex: () => equilateralFromVertex,
  fromFlatArray: () => fromFlatArray2,
  fromPoints: () => fromPoints3,
  fromRadius: () => fromRadius,
  guard: () => guard7,
  innerCircle: () => innerCircle,
  intersectsPoint: () => intersectsPoint2,
  isAcute: () => isAcute,
  isEmpty: () => isEmpty4,
  isEqual: () => isEqual7,
  isEquilateral: () => isEquilateral,
  isIsosceles: () => isIsosceles,
  isOblique: () => isOblique,
  isObtuse: () => isObtuse,
  isPlaceholder: () => isPlaceholder4,
  isRightAngle: () => isRightAngle,
  isTriangle: () => isTriangle,
  lengths: () => lengths2,
  outerCircle: () => outerCircle,
  perimeter: () => perimeter,
  rotate: () => rotate4,
  rotateByVertex: () => rotateByVertex,
  toFlatArray: () => toFlatArray2
});

// src/geometry/triangle/Guard.ts
var guard7 = (t2, name = `t`) => {
  if (t2 === void 0) throw new Error(`{$name} undefined`);
  guard(t2.a, name + `.a`);
  guard(t2.b, name + `.b`);
  guard(t2.c, name + `.c`);
};

// src/geometry/triangle/Edges.ts
var edges2 = (t2) => {
  guard7(t2);
  return joinPointsToLines(t2.a, t2.b, t2.c, t2.a);
};

// src/geometry/triangle/Area.ts
var area3 = (t2) => {
  guard7(t2, `t`);
  const lengths3 = edges2(t2).map((l) => length(l));
  const p = (lengths3[0] + lengths3[1] + lengths3[2]) / 2;
  return Math.sqrt(p * (p - lengths3[0]) * (p - lengths3[1]) * (p - lengths3[2]));
};

// src/geometry/triangle/Centroid.ts
var centroid2 = (t2) => {
  guard7(t2);
  const total = reduce(
    [t2.a, t2.b, t2.c],
    (p, accumulator) => ({
      x: p.x + accumulator.x,
      y: p.y + accumulator.y
    })
  );
  const div = {
    x: total.x / 3,
    y: total.y / 3
  };
  return div;
};

// src/geometry/triangle/Perimeter.ts
var perimeter = (t2) => {
  guard7(t2);
  return edges2(t2).reduce((accumulator, v) => accumulator + length(v), 0);
};

// src/geometry/triangle/InnerCircle.ts
var innerCircle = (t2) => {
  const c = centroid2(t2);
  const p = perimeter(t2) / 2;
  const a = area3(t2);
  const radius = a / p;
  return { radius, ...c };
};

// src/geometry/triangle/OuterCircle.ts
var outerCircle = (t2) => {
  const [a, b, c] = edges2(t2).map((l) => length(l));
  const cent = centroid2(t2);
  const radius = a * b * c / Math.sqrt((a + b + c) * (-a + b + c) * (a - b + c) * (a + b - c));
  return {
    radius,
    ...cent
  };
};

// src/geometry/triangle/Rotate.ts
var rotate4 = (triangle, amountRadian, origin) => {
  if (amountRadian === void 0 || amountRadian === 0) return triangle;
  if (origin === void 0) origin = centroid2(triangle);
  return Object.freeze({
    ...triangle,
    a: rotate2(triangle.a, amountRadian, origin),
    b: rotate2(triangle.b, amountRadian, origin),
    c: rotate2(triangle.c, amountRadian, origin)
  });
};

// src/geometry/triangle/Equilateral.ts
var Equilateral_exports = {};
__export(Equilateral_exports, {
  area: () => area4,
  centerFromA: () => centerFromA,
  centerFromB: () => centerFromB,
  centerFromC: () => centerFromC,
  circumcircle: () => circumcircle,
  fromCenter: () => fromCenter2,
  height: () => height,
  incircle: () => incircle,
  perimeter: () => perimeter2
});
var pi4over3 = Math.PI * 4 / 3;
var pi2over3 = Math.PI * 2 / 3;
var resolveLength = (t2) => {
  if (typeof t2 === `number`) return t2;
  return t2.length;
};
var fromCenter2 = (t2, origin, rotationRad) => {
  if (!origin) origin = Object.freeze({ x: 0, y: 0 });
  const r = resolveLength(t2) / Math.sqrt(3);
  const rot = rotationRad ?? Math.PI * 1.5;
  const b = {
    x: r * Math.cos(rot) + origin.x,
    y: r * Math.sin(rot) + origin.y
  };
  const a = {
    x: r * Math.cos(rot + pi4over3) + origin.x,
    y: r * Math.sin(rot + pi4over3) + origin.y
  };
  const c = {
    x: r * Math.cos(rot + pi2over3) + origin.x,
    y: r * Math.sin(rot + pi2over3) + origin.y
  };
  return Object.freeze({ a, b, c });
};
var centerFromA = (t2, ptA) => {
  if (!ptA) ptA = Object.freeze({ x: 0, y: 0 });
  const r = resolveLength(t2);
  const { radius } = incircle(t2);
  return {
    x: ptA.x + r / 2,
    y: ptA.y - radius
  };
};
var centerFromB = (t2, ptB) => {
  if (!ptB) ptB = Object.freeze({ x: 0, y: 0 });
  const { radius } = incircle(t2);
  return {
    x: ptB.x,
    y: ptB.y + radius * 2
  };
};
var centerFromC = (t2, ptC) => {
  if (!ptC) ptC = Object.freeze({ x: 0, y: 0 });
  const r = resolveLength(t2);
  const { radius } = incircle(t2);
  return {
    x: ptC.x - r / 2,
    y: ptC.y - radius
  };
};
var height = (t2) => Math.sqrt(3) / 2 * resolveLength(t2);
var perimeter2 = (t2) => resolveLength(t2) * 3;
var area4 = (t2) => Math.pow(resolveLength(t2), 2) * Math.sqrt(3) / 4;
var circumcircle = (t2) => ({
  radius: Math.sqrt(3) / 3 * resolveLength(t2)
});
var incircle = (t2) => ({
  radius: Math.sqrt(3) / 6 * resolveLength(t2)
});

// src/geometry/triangle/Right.ts
var Right_exports = {};
__export(Right_exports, {
  adjacentFromHypotenuse: () => adjacentFromHypotenuse,
  adjacentFromOpposite: () => adjacentFromOpposite,
  angleAtPointA: () => angleAtPointA,
  angleAtPointB: () => angleAtPointB,
  area: () => area5,
  circumcircle: () => circumcircle2,
  fromA: () => fromA,
  fromB: () => fromB,
  fromC: () => fromC,
  height: () => height2,
  hypotenuseFromAdjacent: () => hypotenuseFromAdjacent,
  hypotenuseFromOpposite: () => hypotenuseFromOpposite,
  hypotenuseSegments: () => hypotenuseSegments,
  incircle: () => incircle2,
  medians: () => medians,
  oppositeFromAdjacent: () => oppositeFromAdjacent,
  oppositeFromHypotenuse: () => oppositeFromHypotenuse,
  perimeter: () => perimeter3,
  resolveLengths: () => resolveLengths
});
var fromA = (t2, origin) => {
  if (!origin) origin = Object.freeze({ x: 0, y: 0 });
  const tt = resolveLengths(t2);
  const seg = hypotenuseSegments(t2);
  const h = height2(t2);
  const a = { x: origin.x, y: origin.y };
  const b = { x: origin.x + tt.hypotenuse, y: origin.y };
  const c = { x: origin.x + seg[1], y: origin.y - h };
  return { a, b, c };
};
var fromB = (t2, origin) => {
  if (!origin) origin = Object.freeze({ x: 0, y: 0 });
  const tt = resolveLengths(t2);
  const seg = hypotenuseSegments(t2);
  const h = height2(t2);
  const b = { x: origin.x, y: origin.y };
  const a = { x: origin.x - tt.hypotenuse, y: origin.y };
  const c = { x: origin.x - seg[0], y: origin.y - h };
  return { a, b, c };
};
var fromC = (t2, origin) => {
  if (!origin) origin = Object.freeze({ x: 0, y: 0 });
  const seg = hypotenuseSegments(t2);
  const h = height2(t2);
  const c = { x: origin.x, y: origin.y };
  const a = { x: origin.x - seg[1], y: origin.y + h };
  const b = { x: origin.x + seg[0], y: origin.y + h };
  return { a, b, c };
};
var resolveLengths = (t2) => {
  const a = t2.adjacent;
  const o = t2.opposite;
  const h = t2.hypotenuse;
  if (a !== void 0 && o !== void 0) {
    return {
      ...t2,
      adjacent: a,
      opposite: o,
      hypotenuse: Math.hypot(a, o)
    };
  } else if (a && h) {
    return {
      ...t2,
      adjacent: a,
      hypotenuse: h,
      opposite: h * h - a * a
    };
  } else if (o && h) {
    return {
      ...t2,
      hypotenuse: h,
      opposite: o,
      adjacent: h * h - o * o
    };
  } else if (t2.opposite && t2.hypotenuse && t2.adjacent) {
    return t2;
  }
  throw new Error(`Missing at least two edges`);
};
var height2 = (t2) => {
  const tt = resolveLengths(t2);
  const p = tt.opposite * tt.opposite / tt.hypotenuse;
  const q = tt.adjacent * tt.adjacent / tt.hypotenuse;
  return Math.sqrt(p * q);
};
var hypotenuseSegments = (t2) => {
  const tt = resolveLengths(t2);
  const p = tt.opposite * tt.opposite / tt.hypotenuse;
  const q = tt.adjacent * tt.adjacent / tt.hypotenuse;
  return [p, q];
};
var perimeter3 = (t2) => {
  const tt = resolveLengths(t2);
  return tt.adjacent + tt.hypotenuse + tt.opposite;
};
var area5 = (t2) => {
  const tt = resolveLengths(t2);
  return tt.opposite * tt.adjacent / 2;
};
var angleAtPointA = (t2) => {
  const tt = resolveLengths(t2);
  return Math.acos(
    (tt.adjacent * tt.adjacent + tt.hypotenuse * tt.hypotenuse - tt.opposite * tt.opposite) / (2 * tt.adjacent * tt.hypotenuse)
  );
};
var angleAtPointB = (t2) => {
  const tt = resolveLengths(t2);
  return Math.acos(
    (tt.opposite * tt.opposite + tt.hypotenuse * tt.hypotenuse - tt.adjacent * tt.adjacent) / (2 * tt.opposite * tt.hypotenuse)
  );
};
var medians = (t2) => {
  const tt = resolveLengths(t2);
  const b = tt.adjacent * tt.adjacent;
  const c = tt.hypotenuse * tt.hypotenuse;
  const a = tt.opposite * tt.opposite;
  return [
    Math.sqrt(2 * (b + c) - a) / 2,
    Math.sqrt(2 * (c + a) - b) / 2,
    Math.sqrt(2 * (a + b) - c) / 2
  ];
};
var circumcircle2 = (t2) => {
  const tt = resolveLengths(t2);
  return { radius: tt.hypotenuse / 2 };
};
var incircle2 = (t2) => {
  const tt = resolveLengths(t2);
  return {
    radius: (tt.adjacent + tt.opposite - tt.hypotenuse) / 2
  };
};
var oppositeFromAdjacent = (angleRad, adjacent) => Math.tan(angleRad) * adjacent;
var oppositeFromHypotenuse = (angleRad, hypotenuse) => Math.sin(angleRad) * hypotenuse;
var adjacentFromHypotenuse = (angleRadian3, hypotenuse) => Math.cos(angleRadian3) * hypotenuse;
var adjacentFromOpposite = (angleRadian3, opposite) => opposite / Math.tan(angleRadian3);
var hypotenuseFromOpposite = (angleRadian3, opposite) => opposite / Math.sin(angleRadian3);
var hypotenuseFromAdjacent = (angleRadian3, adjacent) => adjacent / Math.cos(angleRadian3);

// src/geometry/triangle/Isosceles.ts
var Isosceles_exports = {};
__export(Isosceles_exports, {
  apexAngle: () => apexAngle,
  area: () => area6,
  baseAngle: () => baseAngle,
  circumcircle: () => circumcircle3,
  fromA: () => fromA2,
  fromB: () => fromB2,
  fromC: () => fromC2,
  fromCenter: () => fromCenter3,
  height: () => height3,
  incircle: () => incircle3,
  legHeights: () => legHeights,
  medians: () => medians2,
  perimeter: () => perimeter4
});
var baseAngle = (t2) => Math.acos(t2.base / (2 * t2.legs));
var apexAngle = (t2) => {
  const aa = t2.legs * t2.legs;
  const cc = t2.base * t2.base;
  return Math.acos((2 * aa - cc) / (2 * aa));
};
var height3 = (t2) => {
  const aa = t2.legs * t2.legs;
  const cc = t2.base * t2.base;
  return Math.sqrt((4 * aa - cc) / 4);
};
var legHeights = (t2) => {
  const b = baseAngle(t2);
  return t2.base * Math.sin(b);
};
var perimeter4 = (t2) => 2 * t2.legs + t2.base;
var area6 = (t2) => {
  const h = height3(t2);
  return h * t2.base / 2;
};
var circumcircle3 = (t2) => {
  const h = height3(t2);
  const hh = h * h;
  const cc = t2.base * t2.base;
  return { radius: (4 * hh + cc) / (8 * h) };
};
var incircle3 = (t2) => {
  const h = height3(t2);
  return { radius: t2.base * h / (2 * t2.legs + t2.base) };
};
var medians2 = (t2) => {
  const aa = t2.legs * t2.legs;
  const cc = t2.base * t2.base;
  const medianAB = Math.sqrt(aa + 2 * cc) / 2;
  const medianC = Math.sqrt(4 * aa - cc) / 2;
  return [medianAB, medianAB, medianC];
};
var fromCenter3 = (t2, origin) => {
  if (!origin) origin = Object.freeze({ x: 0, y: 0 });
  const h = height3(t2);
  const incircleR = incircle3(t2).radius;
  const verticalToApex = h - incircleR;
  const a = { x: origin.x - t2.base / 2, y: origin.y + incircleR };
  const b = { x: origin.x + t2.base / 2, y: origin.y + incircleR };
  const c = { x: origin.x, y: origin.y - verticalToApex };
  return { a, b, c };
};
var fromA2 = (t2, origin) => {
  if (!origin) origin = Object.freeze({ x: 0, y: 0 });
  const h = height3(t2);
  const a = { x: origin.x, y: origin.y };
  const b = { x: origin.x + t2.base, y: origin.y };
  const c = { x: origin.x + t2.base / 2, y: origin.y - h };
  return { a, b, c };
};
var fromB2 = (t2, origin) => {
  if (!origin) origin = Object.freeze({ x: 0, y: 0 });
  const h = height3(t2);
  const b = { x: origin.x, y: origin.y };
  const a = { x: origin.x - t2.base, y: origin.y };
  const c = { x: origin.x - t2.base / 2, y: origin.y - h };
  return { a, b, c };
};
var fromC2 = (t2, origin) => {
  if (!origin) origin = Object.freeze({ x: 0, y: 0 });
  const h = height3(t2);
  const c = { x: origin.x, y: origin.y };
  const a = { x: origin.x - t2.base / 2, y: origin.y + h };
  const b = { x: origin.x + t2.base / 2, y: origin.y + h };
  return { a, b, c };
};

// src/geometry/triangle/index.ts
var piPi7 = Math.PI * 2;
var Empty3 = Object.freeze({
  a: { x: 0, y: 0 },
  b: { x: 0, y: 0 },
  c: { x: 0, y: 0 }
});
var Placeholder3 = Object.freeze({
  a: { x: Number.NaN, y: Number.NaN },
  b: { x: Number.NaN, y: Number.NaN },
  c: { x: Number.NaN, y: Number.NaN }
});
var isEmpty4 = (t2) => isEmpty(t2.a) && isEmpty(t2.b) && isEmpty(t2.c);
var isPlaceholder4 = (t2) => isPlaceholder(t2.a) && isPlaceholder(t2.b) && isPlaceholder(t2.c);
var apply3 = (t2, fn) => Object.freeze({
  ...t2,
  a: fn(t2.a, `a`),
  b: fn(t2.b, `b`),
  c: fn(t2.c, `c`)
});
var isTriangle = (p) => {
  if (p === void 0) return false;
  const tri = p;
  if (!isPoint(tri.a)) return false;
  if (!isPoint(tri.b)) return false;
  if (!isPoint(tri.c)) return false;
  return true;
};
var isEqual7 = (a, b) => isEqual(a.a, b.a) && isEqual(a.b, b.b) && isEqual(a.c, b.c);
var corners2 = (t2) => {
  guard7(t2);
  return [t2.a, t2.b, t2.c];
};
var lengths2 = (t2) => {
  guard7(t2);
  return [
    distance(t2.a, t2.b),
    distance(t2.b, t2.c),
    distance(t2.c, t2.a)
  ];
};
var angles = (t2) => {
  guard7(t2);
  return [
    angleRadian(t2.a, t2.b),
    angleRadian(t2.b, t2.c),
    angleRadian(t2.c, t2.a)
  ];
};
var anglesDegrees = (t2) => {
  guard7(t2);
  return radianToDegree(angles(t2));
};
var isEquilateral = (t2) => {
  guard7(t2);
  const [a, b, c] = lengths2(t2);
  return a === b && b === c;
};
var isIsosceles = (t2) => {
  const [a, b, c] = lengths2(t2);
  if (a === b) return true;
  if (b === c) return true;
  if (c === a) return true;
  return false;
};
var isRightAngle = (t2) => angles(t2).includes(Math.PI / 2);
var isOblique = (t2) => !isRightAngle(t2);
var isAcute = (t2) => !angles(t2).some((v) => v >= Math.PI / 2);
var isObtuse = (t2) => angles(t2).some((v) => v > Math.PI / 2);
var fromRadius = (origin, radius, opts = {}) => {
  throwNumberTest(radius, `positive`, `radius`);
  guard(origin, `origin`);
  const initialAngleRadian = opts.initialAngleRadian ?? 0;
  const angles2 = [
    initialAngleRadian,
    initialAngleRadian + piPi7 * 1 / 3,
    initialAngleRadian + piPi7 * 2 / 3
  ];
  const points = angles2.map((a) => toCartesian(radius, a, origin));
  return fromPoints3(points);
};
var rotateByVertex = (triangle, amountRadian, vertex = `b`) => {
  const origin = vertex === `a` ? triangle.a : vertex === `b` ? triangle.b : triangle.c;
  return Object.freeze({
    a: rotate2(triangle.a, amountRadian, origin),
    b: rotate2(triangle.b, amountRadian, origin),
    c: rotate2(triangle.c, amountRadian, origin)
  });
};
var equilateralFromVertex = (origin, length5 = 10, angleRadian3 = Math.PI / 2) => {
  if (!origin) origin = Object.freeze({ x: 0, y: 0 });
  const a = project(origin, length5, Math.PI - -angleRadian3 / 2);
  const c = project(origin, length5, Math.PI - angleRadian3 / 2);
  return { a, b: origin, c };
};
var toFlatArray2 = (t2) => {
  guard7(t2);
  return [t2.a.x, t2.a.y, t2.b.x, t2.b.y, t2.c.x, t2.c.y];
};
var fromFlatArray2 = (coords) => {
  if (!Array.isArray(coords)) throw new Error(`coords expected as array`);
  if (coords.length !== 6) {
    throw new Error(
      `coords array expected with 6 elements. Got ${coords.length}`
    );
  }
  return fromPoints3(fromNumbers2(...coords));
};
var fromPoints3 = (points) => {
  if (!Array.isArray(points)) throw new Error(`points expected as array`);
  if (points.length !== 3) {
    throw new Error(
      `points array expected with 3 elements. Got ${points.length}`
    );
  }
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
  const pt = getPointParameter2(a, b);
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
  guard7(t2);
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
  const pt = getPointParameter2(a, b);
  if (!intersectsPoint(box, pt)) return false;
  const bc = barycentricCoord(t2, pt);
  return 0 <= bc.a && bc.a <= 1 && 0 <= bc.b && bc.b <= 1 && 0 <= bc.c && bc.c <= 1;
};

export {
  joinPointsToLines,
  isLine,
  length,
  guard3 as guard,
  isPlaceholder2 as isPlaceholder,
  getPointParameter2 as getPointParameter,
  distance,
  divide,
  degreeToRadian,
  radianInvert,
  radianToDegree,
  radiansFromAxisX,
  subtract,
  Empty,
  Polar_exports,
  isEqual,
  angleRadian,
  intersectsPoint,
  Placeholder,
  distanceToExterior,
  multiply2 as multiply,
  relation,
  point_exports,
  Empty2,
  line_exports,
  Waypoint_exports,
  corners,
  shape_exports,
  Layout_exports,
  circle_exports,
  cardinal,
  getEdgeX,
  getEdgeY,
  empty,
  emptyPositioned,
  isEqualSize,
  multiply4 as multiply2,
  subtract3 as subtract2,
  rect_exports,
  isQuadraticBezier,
  isCubicBezier,
  path_exports,
  Grid_exports,
  quadraticSimple,
  toPath3 as toPath,
  bezier_exports,
  CompoundPath_exports,
  Ellipse_exports,
  CurveSimplification_exports,
  QuadTree_exports,
  placeholder,
  placeholderPositioned,
  scaler,
  Scaler_exports,
  ImageDataGrid_exports,
  Convolve2d_exports,
  arc_exports,
  Vector_exports,
  SurfacePoints_exports,
  corners2,
  triangle_exports,
  geometry_exports
};
//# sourceMappingURL=chunk-MVQCQHQL.js.map