import {
  minMaxAvg
} from "./chunk-YOQ54OW2.js";
import {
  defaultComparer
} from "./chunk-Z5PR74I2.js";
import {
  __export
} from "./chunk-Q2EHUQVZ.js";

// src/KeyValue.ts
var KeyValue_exports = {};
__export(KeyValue_exports, {
  getSorter: () => getSorter,
  isPrimitive: () => isPrimitive,
  isPrimitiveOrObject: () => isPrimitiveOrObject,
  minMaxAvg: () => minMaxAvg2
});
function isPrimitive(value) {
  if (typeof value === `number`)
    return true;
  if (typeof value === `string`)
    return true;
  if (typeof value === `bigint`)
    return true;
  if (typeof value === `boolean`)
    return true;
  return false;
}
function isPrimitiveOrObject(value) {
  if (isPrimitive(value))
    return true;
  if (typeof value === `object`)
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
  isPrimitiveOrObject,
  getSorter,
  minMaxAvg2 as minMaxAvg,
  KeyValue_exports
};
//# sourceMappingURL=chunk-XWCACJL7.js.map