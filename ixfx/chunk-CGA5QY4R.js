import {
  throwNumberTest
} from "./chunk-2OY2BTO2.js";

// src/geometry/point/Guard.ts
var isNull = (p) => p.x === null && p.y === null;
var isNaN = (p) => Number.isNaN(p.x) || Number.isNaN(p.y);
function guard(p, name = `Point`) {
  if (p === void 0) {
    throw new Error(
      `'${name}' is undefined. Expected {x,y} got ${JSON.stringify(p)}`
    );
  }
  if (p === null) {
    throw new Error(
      `'${name}' is null. Expected {x,y} got ${JSON.stringify(p)}`
    );
  }
  if (p.x === void 0) {
    throw new Error(
      `'${name}.x' is undefined. Expected {x,y} got ${JSON.stringify(p)}`
    );
  }
  if (p.y === void 0) {
    throw new Error(
      `'${name}.y' is undefined. Expected {x,y} got ${JSON.stringify(p)}`
    );
  }
  if (typeof p.x !== `number`) {
    throw new TypeError(`'${name}.x' must be a number. Got ${p.x}`);
  }
  if (typeof p.y !== `number`) {
    throw new TypeError(`'${name}.y' must be a number. Got ${p.y}`);
  }
  if (p.x === null) throw new Error(`'${name}.x' is null`);
  if (p.y === null) throw new Error(`'${name}.y' is null`);
  if (Number.isNaN(p.x)) throw new Error(`'${name}.x' is NaN`);
  if (Number.isNaN(p.y)) throw new Error(`'${name}.y' is NaN`);
}
var guardNonZeroPoint = (pt, name = `pt`) => {
  guard(pt, name);
  throwNumberTest(pt.x, `nonZero`, `${name}.x`);
  throwNumberTest(pt.y, `nonZero`, `${name}.y`);
  if (typeof pt.z !== `undefined`) {
    throwNumberTest(pt.z, `nonZero`, `${name}.z`);
  }
  return true;
};
function isPoint(p) {
  if (p === void 0) return false;
  if (p === null) return false;
  if (p.x === void 0) return false;
  if (p.y === void 0) return false;
  return true;
}
var isPoint3d = (p) => {
  if (p === void 0) return false;
  if (p === null) return false;
  if (p.x === void 0) return false;
  if (p.y === void 0) return false;
  if (p.z === void 0) return false;
  return true;
};
var isEmpty = (p) => p.x === 0 && p.y === 0;
var isPlaceholder = (p) => Number.isNaN(p.x) && Number.isNaN(p.y);

// src/geometry/line/FromPoints.ts
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

// src/geometry/line/FromNumbers.ts
var fromNumbers = (x1, y1, x2, y2) => {
  if (Number.isNaN(x1)) throw new Error(`x1 is NaN`);
  if (Number.isNaN(x2)) throw new Error(`x2 is NaN`);
  if (Number.isNaN(y1)) throw new Error(`y1 is NaN`);
  if (Number.isNaN(y2)) throw new Error(`y2 is NaN`);
  const a = { x: x1, y: y1 };
  const b = { x: x2, y: y2 };
  return fromPoints(a, b);
};

export {
  isNull,
  isNaN,
  guard,
  guardNonZeroPoint,
  isPoint,
  isPoint3d,
  isEmpty,
  isPlaceholder,
  fromPoints,
  fromNumbers
};
//# sourceMappingURL=chunk-CGA5QY4R.js.map