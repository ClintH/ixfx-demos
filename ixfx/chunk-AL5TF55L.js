import {
  guardArray
} from "./chunk-UH4IORRN.js";

// src/data/arrays/SortByNumericProperty.ts
var sortByNumericProperty = (data, propertyName) => [...data].sort((a, b) => {
  guardArray(data, `data`);
  const av = a[propertyName];
  const bv = b[propertyName];
  if (av < bv) return -1;
  if (av > bv) return 1;
  return 0;
});

export {
  sortByNumericProperty
};
//# sourceMappingURL=chunk-AL5TF55L.js.map