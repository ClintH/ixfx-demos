import {
  minMaxAvg
} from "./chunk-BXWBMVS6.js";
import {
  defaultComparer
} from "./chunk-N37UR7MZ.js";
import {
  __export
} from "./chunk-AFNFQUHK.js";

// src/KeyValue.ts
var KeyValue_exports = {};
__export(KeyValue_exports, {
  getSorter: () => getSorter,
  minMaxAvg: () => minMaxAvg2
});
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
  getSorter,
  minMaxAvg2 as minMaxAvg,
  KeyValue_exports
};
//# sourceMappingURL=chunk-NBBVKVFQ.js.map