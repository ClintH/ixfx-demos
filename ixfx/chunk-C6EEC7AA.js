import {
  require_dist
} from "./chunk-4ERYWDMX.js";
import {
  depthFirst
} from "./chunk-6M3QNAIS.js";
import {
  isInteger,
  isPlainObjectOrPrimitive
} from "./chunk-NFVCKP37.js";
import {
  __export,
  __toESM
} from "./chunk-VE7DK22H.js";

// src/Immutable.ts
var Immutable_exports = {};
__export(Immutable_exports, {
  applyChanges: () => applyChanges,
  compareData: () => compareData,
  getField: () => getField,
  getPaths: () => getPaths,
  getPathsAndData: () => getPathsAndData,
  isEqualContextString: () => isEqualContextString,
  map: () => map,
  updateByPath: () => updateByPath
});
var import_json5 = __toESM(require_dist(), 1);
var isEqualContextString = (a, b, _path) => {
  return import_json5.default.stringify(a) === import_json5.default.stringify(b);
};
var compareData = (a, b, pathPrefix = ``, options = {}) => {
  const deepProbe = options.deepEntries ?? false;
  const eq = options.eq ?? isEqualContextString;
  const changes = [];
  let entries = [];
  if (deepProbe) {
    for (const field in a) {
      const value = a[field];
      if (isPlainObjectOrPrimitive(value)) {
        entries.push([field, value]);
      }
    }
  } else {
    entries = Object.entries(a);
  }
  for (const [key, valueA] of entries) {
    if (typeof valueA === `object`) {
      changes.push(...compareData(valueA, b[key], key + `.`, options));
    } else {
      const valueB = b[key];
      const sub = pathPrefix + key;
      if (!eq(valueA, valueB, sub)) {
        changes.push({ path: sub, previous: valueA, value: valueB });
      }
    }
  }
  return changes;
};
var applyChanges = (a, changes) => {
  for (const change of changes) {
    a = updateByPath(a, change.path, change.value);
  }
  return a;
};
var updateByPath = (o, path, value, createIfNecessary = false) => {
  if (path === void 0)
    throw new Error(`Parameter 'path' is undefined`);
  if (typeof path !== `string`)
    throw new Error(`Parameter 'path' should be a string. Got: ${typeof path}`);
  if (o === void 0)
    throw new Error(`Parameter 'o' is undefined`);
  if (o === null)
    throw new Error(`Parameter 'o' is null`);
  const split = path.split(`.`);
  const r = updateByPathImpl(o, split, value, createIfNecessary);
  return r;
};
var updateByPathImpl = (o, split, value, createIfNecessary) => {
  if (split.length === 0)
    return value;
  const start = split.shift();
  if (!start)
    return value;
  const isInt = isInteger(start);
  if (isInt && Array.isArray(o)) {
    const index = Number.parseInt(start);
    const copy = [...o];
    copy[index] = updateByPathImpl(copy[index], split, value, createIfNecessary);
    return copy;
  } else if (start in o) {
    const copy = { ...o };
    copy[start] = updateByPathImpl(copy[start], split, value, createIfNecessary);
    return copy;
  } else {
    throw new Error(`Path ${start} not found in data`);
  }
};
var getField = (object, path) => {
  if (typeof path !== `string`)
    throw new Error(`Parameter 'path' ought to be a string`);
  if (path.length === 0)
    throw new Error(`Parameter 'path' is empty`);
  if (object === void 0)
    throw new Error(`Parameter 'object' is undefined`);
  if (object === null)
    throw new Error(`Parameter 'object' is null`);
  const split = path.split(`.`);
  const v = getFieldImpl(object, split);
  return v;
};
var getFieldImpl = (object, split) => {
  if (object === void 0)
    throw new Error(`Parameter 'object' is undefined`);
  if (split.length === 0)
    throw new Error(`Path run out`);
  const start = split.shift();
  if (!start)
    throw new Error(`Unexpected empty split path`);
  const isInt = isInteger(start);
  if (isInt && Array.isArray(object)) {
    const index = Number.parseInt(start);
    if (split.length === 0) {
      return object[index];
    } else {
      return getFieldImpl(object[index], split);
    }
  } else if (start in object) {
    if (split.length === 0) {
      return object[start];
    } else {
      return getFieldImpl(object[start], split);
    }
  } else {
    throw new Error(`Path ${start} not found in data`);
  }
};
var map = (object, mapFunction) => {
  const entries = Object.entries(object);
  const mapped = entries.map(([sourceField, sourceFieldValue], index) => [
    sourceField,
    mapFunction(sourceFieldValue, sourceField, index)
  ]);
  return Object.fromEntries(mapped);
};
var getPaths = (object, onlyLeaves = false) => {
  if (object === void 0)
    throw new Error(`Parameter 'object' is undefined`);
  if (object === null)
    return [];
  const result = [];
  const iter = depthFirst(object);
  for (const c of iter) {
    if (c.nodeValue === void 0 && onlyLeaves)
      continue;
    let path = c.name;
    if (c.ancestors.length > 0)
      path = c.ancestors.join(`.`) + `.` + path;
    result.push(path);
  }
  return result;
};
var getPathsAndData = (o) => {
  if (o === null)
    return [];
  if (o === void 0)
    return [];
  const result = [];
  getPathsAndDataImpl(o, ``, result);
  return result;
};
var getPathsAndDataImpl = (o, prefix, result) => {
  if (typeof o === `object`) {
    for (const entries of Object.entries(o)) {
      const sub = (prefix.length > 0 ? prefix + `.` : ``) + entries[0];
      result.push({ path: sub, value: entries[1] });
      getPathsAndDataImpl(entries[1], sub, result);
    }
  }
  return result;
};

export {
  isEqualContextString,
  compareData,
  applyChanges,
  updateByPath,
  getField,
  map,
  getPaths,
  getPathsAndData,
  Immutable_exports
};
//# sourceMappingURL=chunk-C6EEC7AA.js.map