// src/util/MapKeys.ts
var mapKeys = (object, mapFunction) => {
  const destinationObject = {};
  for (const entries of Object.entries(object)) {
    const key = mapFunction(entries[0]);
    destinationObject[key] = entries[1];
  }
  return destinationObject;
};

export {
  mapKeys
};
//# sourceMappingURL=chunk-HOGLR6UM.js.map