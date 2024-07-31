import {
  toStringAbbreviate
} from "./chunk-SPSPSDHG.js";
import {
  minMaxAvg
} from "./chunk-MYMJ4JUA.js";
import {
  guards_exports
} from "./chunk-46F56PDU.js";
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
} from "./chunk-6UZ3OSJO.js";
import {
  __export
} from "./chunk-L5EJU35C.js";

// src/util/index.ts
var util_exports = {};
__export(util_exports, {
  Guards: () => guards_exports,
  comparerInverse: () => comparerInverse,
  defaultComparer: () => defaultComparer,
  defaultToString: () => defaultToString,
  getSorter: () => getSorter,
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
  minMaxAvg: () => minMaxAvg2,
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

// src/util/KeyValue.ts
var sorterByValueIndex = (index, reverse = false) => {
  return (values) => {
    const s = values.toSorted((a, b) => {
      return defaultComparer(a[index], b[index]);
    });
    if (reverse) return s.reverse();
    return s;
  };
};
var getSorter = (sortStyle) => {
  switch (sortStyle) {
    case `value`: {
      return sorterByValueIndex(1, false);
    }
    case `value-reverse`: {
      return sorterByValueIndex(1, true);
    }
    case `key`: {
      return sorterByValueIndex(0, false);
    }
    case `key-reverse`: {
      return sorterByValueIndex(0, true);
    }
    default: {
      throw new Error(`Unknown sorting value '${sortStyle}'. Expecting: value, value-reverse, key or key-reverse`);
    }
  }
};
var minMaxAvg2 = (entries, conversionFunction) => {
  const converter = conversionFunction ?? ((v) => v[1]);
  const values = entries.map((entry) => converter(entry));
  return minMaxAvg(values);
};

export {
  numericComparer,
  jsComparer,
  comparerInverse,
  defaultComparer,
  isEqualTrace,
  isInteger,
  runningiOS,
  throwResult,
  getSorter,
  minMaxAvg2 as minMaxAvg,
  util_exports
};
//# sourceMappingURL=chunk-JEKP7EQY.js.map