import {
  guardArray
} from "./chunk-UH4IORRN.js";
import {
  defaultRandom
} from "./chunk-5VWJ6TUI.js";

// src/random/WeightedIndex.ts
var weightedIndex = (weightings, rand = defaultRandom) => {
  const precompute = [];
  let total = 0;
  for (let index = 0; index < weightings.length; index++) {
    total += weightings[index];
    precompute[index] = total;
  }
  if (total !== 1) throw new Error(`Weightings should add up to 1. Got: ${total}`);
  return () => {
    const v = rand();
    for (let index = 0; index < precompute.length; index++) {
      if (v <= precompute[index]) return index;
    }
    throw new Error(`Bug: weightedIndex could not select index`);
  };
};

// src/data/arrays/Random.ts
var randomIndex = (array, rand = Math.random) => Math.floor(rand() * array.length);
var randomPluck = (array, mutate = false, rand = Math.random) => {
  if (array === void 0) throw new Error(`array is undefined`);
  if (!Array.isArray(array)) throw new Error(`'array' param is not an array`);
  if (array.length === 0) return { value: void 0, array: [] };
  const index = randomIndex(array, rand);
  if (mutate) {
    return {
      value: array[index],
      //eslint-disable-next-line functional/immutable-data
      array: array.splice(index, 1)
    };
  } else {
    const t = [...array];
    t.splice(index, 1);
    return {
      value: array[index],
      array: t
    };
  }
};
var randomElement = (array, rand = Math.random) => {
  guardArray(array, `array`);
  return array[Math.floor(rand() * array.length)];
};
var randomElementWeightedSource = (array, weightings, randomSource = Math.random) => {
  if (array.length !== weightings.length) throw new Error(`Lengths of 'array' and 'weightings' should be the same.`);
  const r = weightedIndex(weightings, randomSource);
  return () => {
    const index = r();
    return array[index];
  };
};
var shuffle = (dataToShuffle, rand = Math.random) => {
  const array = [...dataToShuffle];
  for (let index = array.length - 1; index > 0; index--) {
    const index_ = Math.floor(rand() * (index + 1));
    [array[index], array[index_]] = [array[index_], array[index]];
  }
  return array;
};

export {
  weightedIndex,
  randomIndex,
  randomPluck,
  randomElement,
  randomElementWeightedSource,
  shuffle
};
//# sourceMappingURL=chunk-WIEQUAVY.js.map