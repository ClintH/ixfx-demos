import {
  minMaxAvg
} from "./chunk-KHC3C4P2.js";
import {
  defaultComparer
} from "./chunk-BBT4NEOP.js";
import {
  __export
} from "./chunk-Q2EHUQVZ.js";

// src/KeyValue.ts
var KeyValue_exports = {};
__export(KeyValue_exports, {
  getSorter: () => getSorter,
  isPrimitive: () => isPrimitive,
  minMaxAvg: () => minMaxAvg2
});
function isPrimitive(v) {
  if (typeof v == `number`)
    return true;
  if (typeof v === `string`)
    return true;
  if (typeof v == `bigint`)
    return true;
  if (typeof v === `boolean`)
    return true;
  return false;
}
var sorterByValueIndex = (index, reverse = false) => {
  return (values) => {
    const s = values.toSorted((a, b) => {
      return defaultComparer(a[index], b[index]);
    });
    if (reverse)
      return s.reverse();
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
  isPrimitive,
  getSorter,
  minMaxAvg2 as minMaxAvg,
  KeyValue_exports
};
//# sourceMappingURL=chunk-YOLZFTRH.js.map