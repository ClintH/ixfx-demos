import {
  zipKeyValue
} from "./chunk-PQ6IJNUJ.js";
import {
  setMutable
} from "./chunk-XU5FJBDE.js";
import {
  randomElement
} from "./chunk-7OKODHGY.js";
import {
  clampZeroBounds
} from "./chunk-NTQN762I.js";
import {
  integer,
  percent
} from "./chunk-OQJMMN6S.js";
import {
  __export
} from "./chunk-FQLUQVDZ.js";

// src/geometry/index.ts
var geometry_exports = {};
__export(geometry_exports, {
  Arcs: () => Arc_exports,
  Beziers: () => Bezier_exports,
  Circles: () => Circle_exports,
  Compound: () => CompoundPath_exports,
  Grids: () => Grid_exports,
  Lines: () => Line_exports,
  Paths: () => Path_exports,
  Points: () => Point_exports,
  Rects: () => Rect_exports,
  degreeToRadian: () => degreeToRadian,
  polarToCartesian: () => polarToCartesian,
  radianToDegree: () => radianToDegree,
  radiansFromAxisX: () => radiansFromAxisX
});

// src/geometry/Arc.ts
var Arc_exports = {};
__export(Arc_exports, {
  bbox: () => bbox2,
  compute: () => compute,
  distanceCenter: () => distanceCenter,
  fromDegrees: () => fromDegrees,
  guard: () => guard2,
  isArc: () => isArc,
  isEquals: () => isEquals,
  isPositioned: () => isPositioned,
  length: () => length,
  point: () => point,
  toLine: () => toLine,
  toPath: () => toPath,
  toSvg: () => toSvg
});

// src/geometry/Point.ts
var Point_exports = {};
__export(Point_exports, {
  bbox: () => bbox,
  diff: () => diff,
  distance: () => distance,
  equals: () => equals,
  findMinimum: () => findMinimum,
  from: () => from,
  fromNumbers: () => fromNumbers,
  guard: () => guard,
  isPoint: () => isPoint,
  lerp: () => lerp,
  multiply: () => multiply,
  sum: () => sum,
  toArray: () => toArray,
  toString: () => toString,
  withinRange: () => withinRange
});
var findMinimum = (compareFn, ...points) => {
  if (points.length === 0)
    throw new Error(`No points provided`);
  let min2 = points[0];
  points.forEach((p) => {
    min2 = compareFn(min2, p);
  });
  return min2;
};
var distance = (a, b) => {
  guard(a, `a`);
  guard(b, `b`);
  return Math.hypot(b.x - a.x, b.y - a.y);
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
var bbox = (...points) => {
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
  if (p.x === void 0)
    return false;
  if (p.y === void 0)
    return false;
  return true;
};
var toArray = (p) => [p.x, p.y];
var toString = (p) => {
  if (p.z !== void 0) {
    return `(${p.x},${p.y},${p.z})`;
  } else {
    return `(${p.x},${p.y})`;
  }
};
var equals = (a, b) => a.x === b.x && a.y === b.y;
var withinRange = (a, b, maxRange) => {
  if (typeof maxRange === `number`) {
    maxRange = { x: maxRange, y: maxRange };
  }
  const x = Math.abs(b.x - a.x);
  const y = Math.abs(b.y - a.y);
  return x <= maxRange.x && y <= maxRange.y;
};
var lerp = (a, b, amt) => ({ x: (1 - amt) * a.x + amt * b.x, y: (1 - amt) * a.y + amt * b.y });
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
var fromNumbers = (...coords) => {
  const pts = [];
  if (Array.isArray(coords[0])) {
    coords.forEach((coord) => {
      if (!(coord.length % 2 === 0))
        throw new Error(`coords array should be even-numbered`);
      pts.push(Object.freeze({ x: coord[0], y: coord[1] }));
    });
  } else {
    if (coords.length !== 2)
      throw new Error(`Expected two elements: [x,y]`);
    pts.push(Object.freeze({ x: coords[0], y: coords[1] }));
  }
  return pts;
};
var diff = function(a, b) {
  guard(a, `a`);
  guard(b, `b`);
  return {
    x: a.x - b.x,
    y: a.y - b.y
  };
};
var sum = function(a, b, c, d) {
  let ptA;
  let ptB;
  if (isPoint(a)) {
    ptA = a;
    if (isPoint(b)) {
      ptB = b;
    } else {
      if (b === void 0)
        throw new Error(`Expects x coordinate`);
      ptB = { x: b, y: c === void 0 ? 0 : c };
    }
  } else if (!isPoint(b)) {
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
function multiply(a, bOrX, y) {
  guard(a, `a`);
  if (typeof bOrX === `number`) {
    if (typeof y === `undefined`)
      y = 1;
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
var guard2 = (arc) => {
  if (arc === void 0)
    throw new Error(`Arc is undefined`);
  if (isPositioned(arc)) {
    guard(arc, `arc`);
  }
  if (arc.radius === void 0)
    throw new Error(`Radius undefined`);
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
var compute = (arc, t2, origin) => {
  guard2(arc);
  return point(arc, arc.startRadian + (arc.endRadian - arc.startRadian) * t2, origin);
};
var toPath = (arc) => {
  guard2(arc);
  return Object.freeze({
    ...arc,
    compute: (t2) => compute(arc, t2),
    bbox: () => bbox2(arc),
    length: () => length(arc),
    toSvgString: () => toSvg(arc),
    kind: `arc`
  });
};
var length = (arc) => piPi * arc.radius * ((arc.startRadian - arc.endRadian) / piPi);
var bbox2 = (arc) => {
  if (isPositioned(arc)) {
    const middle = compute(arc, 0.5);
    const asLine = toLine(arc);
    return Point_exports.bbox(middle, asLine.a, asLine.b);
  } else {
    return {
      width: arc.radius * 2,
      height: arc.radius * 2
    };
  }
};
var toSvg = (originOrArc, radiusOrOrigin, startRadian, endRadian) => {
  if (isArc(originOrArc)) {
    if (isPositioned(originOrArc)) {
      return toSvgFull(originOrArc, originOrArc.radius, originOrArc.startRadian, originOrArc.endRadian);
    } else {
      if (isPoint(radiusOrOrigin)) {
        return toSvgFull(radiusOrOrigin, originOrArc.radius, originOrArc.startRadian, originOrArc.endRadian);
      } else {
        return toSvgFull({ x: 0, y: 0 }, originOrArc.radius, originOrArc.startRadian, originOrArc.endRadian);
      }
    }
  } else {
    if (startRadian === void 0)
      throw new Error(`startAngle undefined`);
    if (endRadian === void 0)
      throw new Error(`endAngle undefined`);
    if (isPoint(originOrArc)) {
      if (typeof radiusOrOrigin === `number`) {
        return toSvgFull(originOrArc, radiusOrOrigin, startRadian, endRadian);
      } else {
        throw new Error(`Expected second parameter to be radius (number)`);
      }
    } else {
      throw new Error(`Expected Point, Arc or ArcPositioned as first parameter`);
    }
  }
};
var toSvgFull = (origin, radius, startRadian, endRadian) => {
  const isFullCircle = endRadian - startRadian === 360;
  const start = polarToCartesian(origin, radius, endRadian - 0.01);
  const end = polarToCartesian(origin, radius, startRadian);
  const arcSweep = endRadian - startRadian <= 180 ? `0` : `1`;
  const d = [
    `M`,
    start.x,
    start.y,
    `A`,
    radius,
    radius,
    0,
    arcSweep,
    0,
    end.x,
    end.y
  ];
  if (isFullCircle)
    d.push(`z`);
  return d.map((x) => x.toString());
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
  toPath: () => toPath2
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
    let sum2 = 0;
    for (let i = 0, t2; i < len; i++) {
      t2 = z * utils.Tvalues[i] + z;
      sum2 += utils.Cvalues[i] * utils.arcfn(t2, derivativeFn);
    }
    return z * sum2;
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
      const bbox6 = s.bbox();
      if (mx > bbox6.x.min)
        mx = bbox6.x.min;
      if (my > bbox6.y.min)
        my = bbox6.y.min;
      if (MX < bbox6.x.max)
        MX = bbox6.x.max;
      if (MY < bbox6.y.max)
        MY = bbox6.y.max;
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
    const reduce = function(t2) {
      return 0 <= t2 && t2 <= 1;
    };
    if (order === 2) {
      const a2 = aligned[0].y, b2 = aligned[1].y, c2 = aligned[2].y, d2 = a2 - 2 * b2 + c2;
      if (d2 !== 0) {
        const m1 = -sqrt(b2 * b2 - a2 * c2), m2 = -a2 + b2, v12 = -(m1 + m2) / d2, v2 = -(-m1 + m2) / d2;
        return [v12, v2].filter(reduce);
      } else if (b2 !== c2 && d2 === 0) {
        return [(2 * b2 - c2) / (2 * b2 - 2 * c2)].filter(reduce);
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
        return [-c / b].filter(reduce);
      }
      const q3 = sqrt(b * b - 4 * a * c), a2 = 2 * a;
      return [(q3 - b) / a2, (-b - q3) / a2].filter(reduce);
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
      return [x1, x2, x3].filter(reduce);
    } else if (discriminant === 0) {
      u1 = q2 < 0 ? crt(-q2) : -crt(q2);
      x1 = 2 * u1 - a / 3;
      x2 = -u1 - a / 3;
      return [x1, x2].filter(reduce);
    } else {
      const sd = sqrt(discriminant);
      u1 = crt(-q2 + sd);
      v1 = crt(q2 + sd);
      return [u1 - v1 - a / 3].filter(reduce);
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
  expandbox: function(bbox6, _bbox) {
    if (_bbox.x.min < bbox6.x.min) {
      bbox6.x.min = _bbox.x.min;
    }
    if (_bbox.y.min < bbox6.y.min) {
      bbox6.y.min = _bbox.y.min;
    }
    if (_bbox.z && _bbox.z.min < bbox6.z.min) {
      bbox6.z.min = _bbox.z.min;
    }
    if (_bbox.x.max > bbox6.x.max) {
      bbox6.x.max = _bbox.x.max;
    }
    if (_bbox.y.max > bbox6.y.max) {
      bbox6.y.max = _bbox.y.max;
    }
    if (_bbox.z && _bbox.z.max > bbox6.z.max) {
      bbox6.z.max = _bbox.z.max;
    }
    bbox6.x.mid = (bbox6.x.min + bbox6.x.max) / 2;
    bbox6.y.mid = (bbox6.y.min + bbox6.y.max) / 2;
    if (bbox6.z) {
      bbox6.z.mid = (bbox6.z.min + bbox6.z.max) / 2;
    }
    bbox6.x.size = bbox6.x.max - bbox6.x.min;
    bbox6.y.size = bbox6.y.max - bbox6.y.min;
    if (bbox6.z) {
      bbox6.z.size = bbox6.z.max - bbox6.z.min;
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
    var bbox6 = c[0].bbox();
    for (var i = 1; i < c.length; i++) {
      utils.expandbox(bbox6, c[i].bbox());
    }
    return bbox6;
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
  const middle = Line_exports.compute(start, end, 0.5);
  let target = middle;
  if (end.y < start.y) {
    target = bend > 0 ? { x: Math.min(start.x, end.x), y: Math.min(start.y, end.y) } : { x: Math.max(start.x, end.x), y: Math.max(start.y, end.y) };
  } else {
    target = bend > 0 ? { x: Math.max(start.x, end.x), y: Math.min(start.y, end.y) } : { x: Math.min(start.x, end.x), y: Math.max(start.y, end.y) };
  }
  const handle = Line_exports.compute(middle, target, Math.abs(bend));
  return quadratic(start, end, handle);
};
var computeQuadraticSimple = (start, end, bend, amt) => {
  const q = quadraticSimple(start, end, bend);
  const bzr = new Bezier(q.a, q.quadratic, q.b);
  return bzr.compute(amt);
};
var quadraticToSvgString = (start, end, handle) => [`M ${start.x} ${start.y} Q ${handle.x} ${handle.y} ${end.x} ${end.y}`];
var toPath2 = (cubicOrQuadratic) => {
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
    compute: (t2) => bzr.compute(t2),
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
    compute: (t2) => bzr.compute(t2),
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
  bbox: () => bbox3,
  compute: () => compute2,
  distanceCenter: () => distanceCenter2,
  intersectionLine: () => intersectionLine,
  intersections: () => intersections,
  isCircle: () => isCircle,
  isContainedBy: () => isContainedBy,
  isEquals: () => isEquals2,
  isIntersecting: () => isIntersecting,
  isPositioned: () => isPositioned2,
  length: () => length2,
  point: () => point2,
  toPath: () => toPath3,
  toSvg: () => toSvg2
});
var piPi2 = Math.PI * 2;
var isPositioned2 = (p) => p.x !== void 0 && p.y !== void 0;
var isCircle = (p) => p.radius !== void 0;
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
var guard3 = (circle) => {
  if (isPositioned2(circle)) {
    guard(circle, `circle`);
  }
  if (Number.isNaN(circle.radius))
    throw new Error(`Radius is NaN`);
  if (circle.radius <= 0)
    throw new Error(`Radius must be greater than zero`);
};
var compute2 = (circle, t2) => point2(circle, t2 * piPi2);
var length2 = (circle) => piPi2 * circle.radius;
var bbox3 = (circle) => {
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
  const vector = Point_exports.diff(b, a);
  const centerD = Math.sqrt(vector.y * vector.y + vector.x * vector.x);
  if (centerD > a.radius + b.radius)
    return [];
  if (centerD < Math.abs(a.radius - b.radius))
    return [];
  if (isEquals2(a, b))
    return [];
  const centroidD = (a.radius * a.radius - b.radius * b.radius + centerD * centerD) / (2 * centerD);
  const centroid = {
    x: a.x + vector.x * centroidD / centerD,
    y: a.y + vector.y * centroidD / centerD
  };
  const centroidIntersectionD = Math.sqrt(a.radius * a.radius - centroidD * centroidD);
  const intersection = {
    x: -vector.y * (centroidIntersectionD / centerD),
    y: vector.x * (centroidIntersectionD / centerD)
  };
  return [
    Point_exports.sum(centroid, intersection),
    Point_exports.diff(centroid, intersection)
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
var distanceCenter2 = (a, b) => Point_exports.distance(a, b);
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
var toPath3 = (circle) => {
  guard3(circle);
  return Object.freeze({
    ...circle,
    compute: (t2) => compute2(circle, t2),
    bbox: () => bbox3(circle),
    length: () => length2(circle),
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
  bbox: () => bbox4,
  compute: () => compute3,
  computeDimensions: () => computeDimensions,
  fromPaths: () => fromPaths,
  guardContinuous: () => guardContinuous,
  setSegment: () => setSegment,
  toString: () => toString2,
  toSvgString: () => toSvgString
});
var setSegment = (compoundPath, index, path) => {
  const existing = compoundPath.segments;
  existing[index] = path;
  return fromPaths(...existing);
};
var compute3 = (paths, t2, useWidth, dimensions) => {
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
      return paths[i].compute(amt);
    } else
      soFar += l[i];
  }
  return { x: 0, y: 0 };
};
var computeDimensions = (paths) => {
  const widths = paths.map((l) => l.bbox().width);
  const lengths = paths.map((l) => l.length());
  let totalLength = 0;
  let totalWidth = 0;
  for (let i = 0; i < lengths.length; i++)
    totalLength += lengths[i];
  for (let i = 0; i < widths.length; i++)
    totalWidth += widths[i];
  return { totalLength, totalWidth, widths, lengths };
};
var bbox4 = (paths) => {
  const boxes = paths.map((p) => p.bbox());
  const corners = boxes.map((b) => Rect_exports.getCorners(b)).flat();
  return Point_exports.bbox(...corners);
};
var toString2 = (paths) => paths.map((p) => p.toString()).join(`, `);
var guardContinuous = (paths) => {
  let lastPos = Path_exports.getEnd(paths[0]);
  for (let i = 1; i < paths.length; i++) {
    const start = Path_exports.getStart(paths[i]);
    if (!Point_exports.equals(start, lastPos))
      throw new Error(`Path index ` + i + ` does not start at prior path end. Start: ` + start.x + `,` + start.y + ` expected: ` + lastPos.x + `,` + lastPos.y);
    lastPos = Path_exports.getEnd(paths[i]);
  }
};
var toSvgString = (paths) => paths.flatMap((p) => p.toSvgString());
var fromPaths = (...paths) => {
  guardContinuous(paths);
  const dims = computeDimensions(paths);
  return Object.freeze({
    segments: paths,
    length: () => dims.totalLength,
    compute: (t2, useWidth = false) => compute3(paths, t2, useWidth, dims),
    bbox: () => bbox4(paths),
    toString: () => toString2(paths),
    toSvgString: () => toSvgString(paths),
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
  guard: () => guard4,
  inside: () => inside,
  isEqual: () => isEqual,
  neighbours: () => neighbours,
  offset: () => offset,
  offsetCardinals: () => offsetCardinals,
  rectangleForCell: () => rectangleForCell,
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
var isCell = (c) => {
  if (c === void 0)
    return false;
  return `x` in c && `y` in c;
};
var isNeighbour = (n) => {
  if (n === void 0)
    return false;
  if (n[1] === void 0)
    return false;
  return true;
};
var isEqual = (a, b) => {
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
var guard4 = (a, paramName = `Param`, grid) => {
  if (a === void 0)
    throw new Error(paramName + ` is undefined. Expecting {x,y}`);
  if (a.x === void 0)
    throw new Error(paramName + `.x is undefined`);
  if (a.y === void 0)
    throw new Error(paramName + `.y is undefined`);
  if (!Number.isInteger(a.x))
    throw new Error(paramName + `.x is non-integer`);
  if (!Number.isInteger(a.y))
    throw new Error(paramName + `.y is non-integer`);
  if (grid !== void 0) {
    if (!inside(grid, a))
      throw new Error(`${paramName} is outside of grid. Cell: ${a.x},${a.y} Grid: ${grid.cols}, ${grid.rows}`);
  }
};
var guardGrid = (g, paramName = `Param`) => {
  if (g === void 0)
    throw new Error(`${paramName} is undefined. Expecting grid.`);
  if (!(`rows` in g))
    throw new Error(`${paramName}.rows is undefined`);
  if (!(`cols` in g))
    throw new Error(`${paramName}.cols is undefined`);
  if (!Number.isInteger(g.rows))
    throw new Error(`${paramName}.rows is not an integer`);
  if (!Number.isInteger(g.cols))
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
  guard4(cell);
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
  guard4(cell);
  const size = grid.size;
  const x = cell.x * size;
  const y = cell.y * size;
  return Object.freeze({ x: x + size / 2, y: y + size / 2 });
};
var getLine = (start, end) => {
  guard4(start);
  guard4(end);
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
  guard4(start, `start`, grid);
  guard4(vector);
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
      x = clampZeroBounds(x, grid.cols);
      y = clampZeroBounds(y, grid.rows);
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
  guard4(start, `start`, grid);
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
  integer(steps, `positive`, `steps`);
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
var cells = function* (grid, start = { x: 0, y: 0 }) {
  guardGrid(grid, `grid`);
  guard4(start, `start`, grid);
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

// src/geometry/Line.ts
var Line_exports = {};
__export(Line_exports, {
  angleRadian: () => angleRadian,
  bbox: () => bbox5,
  compute: () => compute4,
  distance: () => distance2,
  equals: () => equals2,
  extendFromStart: () => extendFromStart,
  extendX: () => extendX,
  fromArray: () => fromArray,
  fromNumbers: () => fromNumbers2,
  fromPoints: () => fromPoints,
  fromPointsToPath: () => fromPointsToPath,
  guard: () => guard5,
  isLine: () => isLine,
  joinPointsToLines: () => joinPointsToLines,
  length: () => length3,
  nearest: () => nearest,
  slope: () => slope,
  toFlatArray: () => toFlatArray,
  toPath: () => toPath4,
  toString: () => toString3,
  toSvgString: () => toSvgString2,
  withinRange: () => withinRange2
});
var isLine = (p) => p.a !== void 0 && p.b !== void 0;
var equals2 = (a, b) => a.a === b.a && a.b === b.b;
var guard5 = (l, paramName = `line`) => {
  if (l === void 0)
    throw new Error(`${paramName} undefined`);
  if (l.a === void 0)
    throw new Error(`${paramName}.a undefined. Expected {a:Point, b:Point}`);
  if (l.b === void 0)
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
var withinRange2 = (l, p, maxRange) => {
  const dist = distance2(l, p);
  return dist <= maxRange;
};
var length3 = (aOrLine, b) => {
  let a;
  if (isLine(aOrLine)) {
    b = aOrLine.b;
    a = aOrLine.a;
  } else {
    a = aOrLine;
    if (b === void 0)
      throw new Error(`Requires both a and b parameters`);
  }
  guard(a, `a`);
  guard(a, `b`);
  const x = b.x - a.x;
  const y = b.y - a.y;
  if (a.z !== void 0 && b.z !== void 0) {
    const z = b.z - a.z;
    return Math.hypot(x, y, z);
  } else {
    return Math.hypot(x, y);
  }
};
var nearest = (line, p) => {
  const { a, b } = line;
  const atob = { x: b.x - a.x, y: b.y - a.y };
  const atop = { x: p.x - a.x, y: p.y - a.y };
  const len = atob.x * atob.x + atob.y * atob.y;
  let dot = atop.x * atob.x + atop.y * atob.y;
  const t2 = Math.min(1, Math.max(0, dot / len));
  dot = (b.x - a.x) * (p.y - a.y) - (b.y - a.y) * (p.x - a.x);
  return { x: a.x + atob.x * t2, y: a.y + atob.y * t2 };
};
var slope = (lineOrPoint, b) => {
  let a;
  if (isLine(lineOrPoint)) {
    a = lineOrPoint.a;
  } else {
    a = lineOrPoint;
    if (b === void 0)
      throw new Error(`b parameter required`);
  }
  return (b.y - a.y) / (b.x - a.x);
};
var extendX = (line, xIntersection) => {
  const y = line.a.y + (xIntersection - line.a.x) * slope(line);
  return { x: xIntersection, y };
};
var extendFromStart = (line, distance3) => {
  const len = length3(line);
  return Object.freeze({
    a: line.a,
    b: Object.freeze({
      x: line.b.x + (line.b.x - line.a.x) / len * distance3,
      y: line.b.y + (line.b.y - line.a.y) / len * distance3
    })
  });
};
var distance2 = (l, p) => {
  guard5(l, `l`);
  guard(p, `p`);
  const lineLength = length3(l);
  if (lineLength === 0) {
    return length3(l.a, p);
  }
  const near = nearest(l, p);
  return length3(near, p);
};
var compute4 = (a, b, t2) => {
  guard(a, `a`);
  guard(b, `b`);
  percent(t2, `t`);
  const d = length3(a, b);
  const d2 = d * (1 - t2);
  const x = b.x - d2 * (b.x - a.x) / d;
  const y = b.y - d2 * (b.y - a.y) / d;
  return { x, y };
};
var toString3 = (a, b) => Point_exports.toString(a) + `-` + Point_exports.toString(b);
var fromNumbers2 = (x1, y1, x2, y2) => {
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
var toSvgString2 = (a, b) => [`M${a.x} ${a.y} L ${b.x} ${b.y}`];
var fromArray = (arr) => {
  if (!Array.isArray(arr))
    throw new Error(`arr parameter is not an array`);
  if (arr.length !== 4)
    throw new Error(`array is expected to have length four`);
  return fromNumbers2(arr[0], arr[1], arr[2], arr[3]);
};
var fromPoints = (a, b) => {
  guard(a, `a`);
  guard(b, `b`);
  a = Object.freeze(a);
  b = Object.freeze(b);
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
var fromPointsToPath = (a, b) => toPath4(fromPoints(a, b));
var bbox5 = (line) => Point_exports.bbox(line.a, line.b);
var toPath4 = (line) => {
  const { a, b } = line;
  return Object.freeze({
    ...line,
    length: () => length3(a, b),
    compute: (t2) => compute4(a, b, t2),
    bbox: () => bbox5(line),
    toString: () => toString3(a, b),
    toFlatArray: () => toFlatArray(a, b),
    toSvgString: () => toSvgString2(a, b),
    toPoints: () => [a, b],
    kind: `line`
  });
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
  fromCenter: () => fromCenter,
  fromElement: () => fromElement,
  fromTopLeft: () => fromTopLeft,
  getCenter: () => getCenter,
  getCorners: () => getCorners,
  getLines: () => getLines,
  guard: () => guard6,
  isEqual: () => isEqual2,
  maxFromCorners: () => maxFromCorners
});
var fromElement = (el) => ({ width: el.clientWidth, height: el.clientHeight });
var isEqual2 = (a, b) => a.width === b.width && a.height === b.height;
var fromCenter = (origin, width, height) => {
  Point_exports.guard(origin, `origin`);
  guardDim(width, `width`);
  guardDim(height, `height`);
  const halfW = width / 2;
  const halfH = height / 2;
  return { x: origin.x - halfW, y: origin.y - halfH, width, height };
};
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
var guard6 = (rect, name = `rect`) => {
  if (rect === void 0)
    throw Error(`{$name} undefined`);
  guardDim(rect.width, name + `.width`);
  guardDim(rect.height, name + `.height`);
};
var fromTopLeft = (origin, width, height) => {
  guardDim(width, `width`);
  guardDim(height, `height`);
  Point_exports.guard(origin, `origin`);
  return { x: origin.x, y: origin.y, width, height };
};
var getCorners = (rect, origin) => {
  guard6(rect);
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
  guard6(rect);
  if (origin === void 0 && Point_exports.isPoint(rect))
    origin = rect;
  else if (origin === void 0)
    throw new Error(`Unpositioned rect needs origin param`);
  return {
    x: origin.x + rect.width / 2,
    y: origin.y + rect.height / 2
  };
};
var getLines = (rect, origin) => Line_exports.joinPointsToLines(...getCorners(rect, origin));

// src/geometry/index.ts
var degreeToRadian = (angleInDegrees) => (angleInDegrees - 90) * (Math.PI / 180);
var radianToDegree = (angleInRadians) => angleInRadians * 180 / Math.PI;
var radiansFromAxisX = (point3) => Math.atan2(point3.x, point3.y);
var polarToCartesian = (center, radius, angleRadians) => {
  guard(center);
  return {
    x: center.x + radius * Math.cos(angleRadians),
    y: center.y + radius * Math.sin(angleRadians)
  };
};

export {
  guard,
  Point_exports,
  Arc_exports,
  isQuadraticBezier,
  isCubicBezier,
  quadraticSimple,
  toPath2 as toPath,
  Bezier_exports,
  Circle_exports,
  CompoundPath_exports,
  Grid_exports,
  isLine,
  Line_exports,
  Path_exports,
  getCorners,
  Rect_exports,
  degreeToRadian,
  radianToDegree,
  radiansFromAxisX,
  polarToCartesian,
  geometry_exports
};
//# sourceMappingURL=chunk-P4NYFKWC.js.map