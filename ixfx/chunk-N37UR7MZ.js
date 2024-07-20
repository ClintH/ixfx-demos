import {
  toStringAbbreviate
} from "./chunk-KQLC3QPI.js";
import {
  guards_exports
} from "./chunk-QZ7DQTW7.js";
import {
  mapKeys
} from "./chunk-HOGLR6UM.js";
import {
  defaultToString,
  isEqualDefault,
  isEqualValueDefault,
  isEqualValueIgnoreOrder,
  isEqualValuePartial,
  isMap,
  isSet,
  toStringDefault,
  toStringOrdered
} from "./chunk-SGQC7FGM.js";
import {
  __export
} from "./chunk-AFNFQUHK.js";

// src/util/index.ts
var util_exports = {};
__export(util_exports, {
  Guards: () => guards_exports,
  comparerInverse: () => comparerInverse,
  defaultComparer: () => defaultComparer,
  defaultToString: () => defaultToString,
  isEqualDefault: () => isEqualDefault,
  isEqualTrace: () => isEqualTrace,
  isEqualValueDefault: () => isEqualValueDefault,
  isEqualValueIgnoreOrder: () => isEqualValueIgnoreOrder,
  isEqualValuePartial: () => isEqualValuePartial,
  isInteger: () => isInteger,
  isMap: () => isMap,
  isSet: () => isSet,
  jsComparer: () => jsComparer,
  mapKeys: () => mapKeys,
  numericComparer: () => numericComparer,
  runningiOS: () => runningiOS,
  throwResult: () => throwResult,
  toStringDefault: () => toStringDefault,
  toStringOrdered: () => toStringOrdered
});

// src/util/Comparers.ts
var numericComparer = (x, y) => {
  if (x === y) return 0;
  if (x > y) return 1;
  return -1;
};
var jsComparer = (x, y) => {
  if (x === void 0 && y === void 0) return 0;
  if (x === void 0) return 1;
  if (y === void 0) return -1;
  const xString = defaultToString(x);
  const yString = defaultToString(y);
  if (xString < yString) return -1;
  if (xString > yString) return 1;
  return 0;
};
var comparerInverse = (comparer) => {
  return (x, y) => {
    const v = comparer(x, y);
    return v * -1;
  };
};
var defaultComparer = (x, y) => {
  if (typeof x === `number` && typeof y === `number`) {
    return numericComparer(x, y);
  }
  return jsComparer(x, y);
};

// src/util/IsEqualTrace.ts
var isEqualTrace = (eq) => {
  return (a, b) => {
    const result = eq(a, b);
    console.log(`isEqualTrace eq: ${result} a: ${toStringAbbreviate(a)} b: ${toStringAbbreviate(b)}`);
    return result;
  };
};

// src/util/IsInteger.ts
var isInteger = (value) => {
  if (value === void 0) return false;
  if (typeof value === `string`) {
    const v = Number.parseInt(value);
    if (Number.isNaN(v)) return false;
    if (v.toString() === value.toString()) return true;
    return false;
  }
  if (typeof value === `number`) {
    if (Number.isNaN(value)) return false;
    if (!Number.isFinite(value)) return false;
    if (Math.round(value) === value) return true;
    return false;
  }
  return false;
};

// src/util/Platform.ts
var runningiOS = () => [
  `iPad Simulator`,
  `iPhone Simulator`,
  `iPod Simulator`,
  `iPad`,
  `iPhone`,
  `iPod`
].includes(navigator.platform) || // iPad on iOS 13 detection
navigator.userAgent.includes(`Mac`) && `ontouchend` in document;

// src/util/Results.ts
function throwResult(result) {
  if (result.success) return true;
  if (typeof result.error === `string`) throw new Error(result.error);
  throw result.error;
}

export {
  numericComparer,
  jsComparer,
  comparerInverse,
  defaultComparer,
  isEqualTrace,
  isInteger,
  runningiOS,
  throwResult,
  util_exports
};
//# sourceMappingURL=chunk-N37UR7MZ.js.map