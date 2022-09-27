import {
  untilMatch
} from "./chunk-ZTX6UONG.js";
import {
  IterableAsync_exports
} from "./chunk-L327JBP6.js";
import {
  number
} from "./chunk-M24U4LLG.js";
import {
  __export
} from "./chunk-6SYKIMQH.js";

// src/Util.ts
var Util_exports = {};
__export(Util_exports, {
  IterableAsync: () => IterableAsync_exports,
  getFieldByPath: () => getFieldByPath,
  getFieldPaths: () => getFieldPaths,
  ifNaN: () => ifNaN,
  isEqualDefault: () => isEqualDefault,
  isEqualValueDefault: () => isEqualValueDefault,
  isPowerOfTwo: () => isPowerOfTwo,
  relativeDifference: () => relativeDifference,
  roundUpToMultiple: () => roundUpToMultiple,
  runningiOS: () => runningiOS,
  toStringDefault: () => toStringDefault
});
var ifNaN = (v, fallback) => {
  if (Number.isNaN(v))
    return fallback;
  return v;
};
var isPowerOfTwo = (x) => Math.log2(x) % 1 === 0;
var relativeDifference = (initial) => (v) => v / initial;
var getFieldByPath = (o, path = ``) => {
  if (path.length === 0)
    return o;
  if (path in o) {
    return o[path];
  } else {
    const start = untilMatch(path, `.`);
    if (start in o) {
      return getFieldByPath(o[start], path.substring(start.length + 1));
    } else {
      return void 0;
    }
  }
};
var getFieldPaths = (o) => {
  const paths = [];
  const probe = (o2, prefix = ``) => {
    if (typeof o2 === `object`) {
      const keys = Object.keys(o2);
      if (prefix.length > 0)
        prefix += `.`;
      keys.forEach((k) => probe(o2[k], prefix + k));
    } else {
      paths.push(prefix);
    }
  };
  probe(o);
  return paths;
};
var roundUpToMultiple = (v, multiple) => {
  number(v, `nonZero`, `v`);
  number(multiple, `nonZero`, `muliple`);
  return Math.ceil(v / multiple) * multiple;
};
var isEqualDefault = (a, b) => a === b;
var isEqualValueDefault = (a, b) => {
  if (a === b)
    return true;
  return toStringDefault(a) === toStringDefault(b);
};
var toStringDefault = (itemToMakeStringFor) => typeof itemToMakeStringFor === `string` ? itemToMakeStringFor : JSON.stringify(itemToMakeStringFor);
var runningiOS = () => [
  `iPad Simulator`,
  `iPhone Simulator`,
  `iPod Simulator`,
  `iPad`,
  `iPhone`,
  `iPod`
].includes(navigator.platform) || navigator.userAgent.includes(`Mac`) && `ontouchend` in document;
try {
  if (typeof window !== `undefined`) {
    window.ixfx = { ...window.ixfx, getFieldByPath, getFieldPaths };
  }
} catch {
}

export {
  ifNaN,
  isPowerOfTwo,
  relativeDifference,
  getFieldByPath,
  getFieldPaths,
  roundUpToMultiple,
  isEqualDefault,
  isEqualValueDefault,
  toStringDefault,
  runningiOS,
  Util_exports
};
//# sourceMappingURL=chunk-BFWHGJN7.js.map