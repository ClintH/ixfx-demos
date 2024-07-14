// src/data/arrays/ContainsDuplicateInstances.ts
var containsDuplicateInstances = (array) => {
  if (!Array.isArray(array)) throw new Error(`Parameter needs to be an array`);
  for (let index = 0; index < array.length; index++) {
    for (let x = 0; x < array.length; x++) {
      if (index === x) continue;
      if (array[index] === array[x]) return true;
    }
  }
  return false;
};

export {
  containsDuplicateInstances
};
//# sourceMappingURL=chunk-MZFSDYZE.js.map