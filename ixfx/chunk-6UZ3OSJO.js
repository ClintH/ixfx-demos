// src/util/ToString.ts
var objectToString = Object.prototype.toString;
var toTypeString = (value) => objectToString.call(value);
var isMap = (value) => toTypeString(value) === `[object Map]`;
var isSet = (value) => toTypeString(value) === `[object Set]`;
var toStringDefault = (itemToMakeStringFor) => typeof itemToMakeStringFor === `string` ? itemToMakeStringFor : JSON.stringify(itemToMakeStringFor);
var defaultToString = (object) => {
  if (object === null) return `null`;
  if (typeof object === `boolean` || typeof object === `number`) {
    return object.toString();
  }
  if (typeof object === `string`) return object;
  if (typeof object === `symbol`) throw new TypeError(`Symbol cannot be converted to string`);
  return JSON.stringify(object);
};

// src/util/IsEqual.ts
var toStringOrdered = (itemToMakeStringFor) => {
  if (typeof itemToMakeStringFor === `string`) return itemToMakeStringFor;
  const allKeys = /* @__PURE__ */ new Set();
  JSON.stringify(itemToMakeStringFor, (key, value) => (allKeys.add(key), value));
  return JSON.stringify(itemToMakeStringFor, [...allKeys].sort());
};
var isEqualDefault = (a, b) => a === b;
var isEqualValueDefault = (a, b) => {
  if (a === b) return true;
  return toStringDefault(a) === toStringDefault(b);
};
var isEqualValuePartial = (a, b, fieldComparer) => {
  if (typeof a !== `object`) throw new Error(`Parameter 'a' expected to be object`);
  if (typeof b !== `object`) throw new Error(`Parameter 'b' expected to be object`);
  if (Object.is(a, b)) return true;
  const comparer = fieldComparer ?? isEqualValuePartial;
  for (const entryB of Object.entries(b)) {
    const valueA = a[entryB[0]];
    const valueB = entryB[1];
    if (typeof valueA === `object` && typeof valueB === `object`) {
      if (!comparer(valueA, valueB)) {
        return false;
      }
    } else {
      if (valueA !== valueB) {
        return false;
      }
    }
  }
  return true;
};
var isEqualValueIgnoreOrder = (a, b) => {
  if (a === b) return true;
  return toStringOrdered(a) === toStringOrdered(b);
};

export {
  isMap,
  isSet,
  toStringDefault,
  defaultToString,
  toStringOrdered,
  isEqualDefault,
  isEqualValueDefault,
  isEqualValuePartial,
  isEqualValueIgnoreOrder
};
//# sourceMappingURL=chunk-6UZ3OSJO.js.map