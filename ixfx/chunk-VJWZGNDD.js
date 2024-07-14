import {
  guardArray
} from "./chunk-UH4IORRN.js";

// src/data/arrays/Pairwise.ts
function* pairwise(values) {
  guardArray(values, `values`);
  if (values.length < 2) throw new Error(`Array needs to have at least two entries. Length: ${values.length}`);
  for (let index = 1; index < values.length; index++) {
    yield [values[index - 1], values[index]];
  }
}
var pairwiseReduce = (array, reducer, initial) => {
  guardArray(array, `arr`);
  if (array.length < 2) return initial;
  for (let index = 0; index < array.length - 1; index++) {
    initial = reducer(initial, array[index], array[index + 1]);
  }
  return initial;
};

export {
  pairwise,
  pairwiseReduce
};
//# sourceMappingURL=chunk-VJWZGNDD.js.map