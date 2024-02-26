import {
  SetStringImmutable,
  SetStringMutable,
  set_exports
} from "./chunk-RCXAP77T.js";
import {
  QueueImmutable,
  queue_exports
} from "./chunk-DTAJ7TFM.js";
import {
  IterableSync_exports,
  integerUniqueGen,
  last,
  string
} from "./chunk-Q7SAKCA4.js";
import {
  Elapsed_exports,
  delayLoop,
  interval
} from "./chunk-JVEQSTEZ.js";
import {
  QueueMutable
} from "./chunk-GMKE2SCE.js";
import {
  MapOfSimpleMutable,
  SimpleEventEmitter,
  ofSimpleMutable
} from "./chunk-3LEZRET7.js";
import {
  resolveEl
} from "./chunk-L3UAAAAG.js";
import {
  isPrimitive
} from "./chunk-YOLZFTRH.js";
import {
  Iterables_exports,
  addKeepingExisting,
  addObject,
  arrays_exports,
  containsDuplicateInstances,
  deleteByValue,
  filter,
  find,
  firstEntryByIterablePredicate,
  firstEntryByIterableValue,
  fromIterable,
  fromObject,
  getClosestIntegerKey,
  getFromKeys,
  hasAnyValue,
  hasKeyValue,
  mapToArray,
  mapToObjectTransform,
  mergeByKey,
  sortByValue,
  sortByValueProperty,
  toArray,
  toObject,
  transformMap,
  without,
  zipKeyValue
} from "./chunk-KHC3C4P2.js";
import {
  IterableAsync_exports,
  intervalToMs,
  isEqualDefault,
  isEqualValueIgnoreOrder,
  sleep,
  toStringDefault2 as toStringDefault
} from "./chunk-BBT4NEOP.js";
import {
  integerTest,
  nullUndef,
  throwFromResult,
  throwIntegerTest,
  throwNumberTest
} from "./chunk-JNUBDOCI.js";
import {
  getOrGenerate,
  getOrGenerateSync
} from "./chunk-NEQZAMQB.js";
import {
  __export
} from "./chunk-Q2EHUQVZ.js";

// src/generators/index.ts
var generators_exports = {};
__export(generators_exports, {
  Async: () => IterableAsync_exports,
  Chain: () => chain_exports,
  Sync: () => IterableSync_exports,
  count: () => count,
  delayLoop: () => delayLoop,
  interval: () => interval,
  numericPercent: () => numericPercent,
  numericRange: () => numericRange,
  numericRangeRaw: () => numericRangeRaw,
  pingPong: () => pingPong,
  pingPongPercent: () => pingPongPercent,
  randomUniqueInteger: () => integerUniqueGen,
  stringSegmentsFromEnd: () => stringSegmentsFromEnd,
  stringSegmentsFromStart: () => stringSegmentsFromStart
});

// src/Text.ts
var Text_exports = {};
__export(Text_exports, {
  abbreviate: () => abbreviate,
  afterMatch: () => afterMatch,
  beforeAfterMatch: () => beforeAfterMatch,
  beforeMatch: () => beforeMatch,
  between: () => between,
  betweenChomp: () => betweenChomp,
  countCharsFromStart: () => countCharsFromStart,
  htmlEntities: () => htmlEntities,
  indexOfCharCode: () => indexOfCharCode,
  lineSpan: () => lineSpan,
  omitChars: () => omitChars,
  random: () => string,
  segmentsFromEnd: () => stringSegmentsFromEnd,
  splitByLength: () => splitByLength,
  splitRanges: () => splitRanges,
  startsEnds: () => startsEnds,
  toStringAbbreviate: () => toStringAbbreviate,
  unwrap: () => unwrap
});
var abbreviate = (source, maxLength = 15) => {
  throwFromResult(integerTest(maxLength, `aboveZero`, `maxLength`));
  if (typeof source !== `string`)
    throw new Error(`Parameter 'source' is not a string`);
  if (source.length > maxLength && source.length > 3) {
    if (maxLength > 15) {
      const chunk2 = Math.round((maxLength - 2) / 2);
      return source.slice(0, chunk2) + `...` + source.slice(-chunk2);
    }
    return source.slice(0, maxLength) + `...`;
  }
  return source;
};
var toStringAbbreviate = (source, maxLength = 20) => {
  if (source === void 0)
    return `(undefined)`;
  if (source === null)
    return `(null)`;
  return abbreviate(JSON.stringify(source), maxLength);
};
var between = (source, start, end, lastEndMatch = true) => {
  const startPos = source.indexOf(start);
  if (startPos < 0)
    return;
  if (end === void 0)
    end = start;
  const endPos = lastEndMatch ? source.lastIndexOf(end) : source.indexOf(end, startPos + 1);
  if (endPos < 0)
    return;
  return source.slice(startPos + 1, endPos);
};
var betweenChomp = (source, start, end, lastEndMatch = true) => {
  if (typeof source !== `string`)
    throw new Error(`Parameter 'source' is not a string`);
  if (typeof start !== `string`)
    throw new Error(`Parameter 'start' is not a string`);
  if (end !== void 0 && typeof end !== `string`)
    throw new Error(`Parameter 'end' is not a string`);
  const startPos = source.indexOf(start);
  if (startPos < 0)
    return [source, void 0];
  if (end === void 0)
    end = start;
  const endPos = lastEndMatch ? source.lastIndexOf(end) : source.indexOf(end, startPos + 1);
  if (endPos < 0)
    return [source, void 0];
  const between2 = source.slice(startPos + 1, endPos);
  const sourceResult = source.slice(0, startPos) + source.slice(endPos + 1);
  return [sourceResult, between2];
};
var indexOfCharCode = (source, code, start = 0, end = source.length - 1) => {
  for (let index = start; index <= end; index++) {
    if (source.codePointAt(index) === code)
      return index;
  }
  return -1;
};
var omitChars = (source, removeStart, removeLength) => source.slice(0, removeStart) + source.slice(removeStart + removeLength);
var splitByLength = (source, length) => {
  throwFromResult(integerTest(length, `aboveZero`, `length`));
  if (source === null)
    throw new Error(`source parameter null`);
  if (typeof source !== `string`) {
    throw new TypeError(`source parameter not a string`);
  }
  const chunks = Math.ceil(source.length / length);
  const returnValue = [];
  let start = 0;
  for (let c = 0; c < chunks; c++) {
    returnValue.push(source.slice(start, start + length));
    start += length;
  }
  return returnValue;
};
var beforeMatch = (source, match, options = {}) => {
  const ba = beforeAfterMatch(source, match, options);
  return ba[0];
};
var afterMatch = (source, match, options = {}) => {
  const ba = beforeAfterMatch(source, match, options);
  return ba[1];
};
var beforeAfterMatch = (source, match, options = {}) => {
  if (source === void 0)
    throw new Error(`Param 'source' is undefined`);
  let fallback = options.fallback;
  const ifNoMatch = options.ifNoMatch ?? (fallback ? `fallback` : `original`);
  if (ifNoMatch === `original`)
    fallback = source;
  if (ifNoMatch === `fallback` && fallback === void 0)
    throw new Error(`Fallback must be provided`);
  const startPos = options.startPos ?? void 0;
  const fromEnd = options.fromEnd ?? false;
  const m = fromEnd ? source.lastIndexOf(match, startPos) : source.indexOf(match, startPos);
  if (m < 0 && ifNoMatch === `throw`)
    throw new Error(`Match '${match}' not found in source.`);
  if (m < 0 && ifNoMatch === `original`)
    return [source, source];
  if (m < 0 && ifNoMatch === `fallback`) {
    return [fallback, fallback];
  }
  return [
    source.slice(0, m),
    source.slice(Math.max(0, m + match.length))
  ];
};
var unwrap = (source, ...wrappers) => {
  let matched = false;
  do {
    matched = false;
    for (const w of wrappers) {
      if (source.startsWith(w) && source.endsWith(w)) {
        source = source.slice(w.length, source.length - w.length * 2 + 1);
        matched = true;
      }
    }
  } while (matched);
  return source;
};
var lineSpan = (ranges, start, end) => {
  let s = -1;
  let endPos = -1;
  for (const [index, r] of ranges.entries()) {
    s = index;
    if (r.text.length === 0)
      continue;
    if (start < r.end) {
      break;
    }
  }
  for (let index = s; index < ranges.length; index++) {
    const r = ranges[index];
    endPos = index;
    if (end === r.end) {
      endPos = index + 1;
      break;
    }
    if (end < r.end) {
      break;
    }
  }
  return { length: endPos - s, start: s, end: endPos };
};
var splitRanges = (source, split) => {
  let start = 0;
  let text = ``;
  const ranges = [];
  let index = 0;
  for (let i = 0; i < source.length; i++) {
    if (source.indexOf(split, i) === i) {
      const end = i;
      ranges.push({
        text,
        start,
        end,
        index
      });
      start = end + 1;
      text = ``;
      index++;
    } else {
      text += source.charAt(i);
    }
  }
  if (start < source.length) {
    ranges.push({ text, start, index, end: source.length });
  }
  return ranges;
};
var countCharsFromStart = (source, ...chars) => {
  let counted = 0;
  for (let index = 0; index < source.length; index++) {
    if (chars.includes(source.charAt(index))) {
      counted++;
    } else {
      break;
    }
  }
  return counted;
};
var startsEnds = (source, start, end = start) => source.startsWith(start) && source.endsWith(end);
var htmlEntities = (source) => source.replaceAll(/[&<>\u00A0-\u9999]/g, (index) => `&#${index.codePointAt(0)};`);

// src/modulation/PingPong.ts
var pingPongPercent = function(interval2 = 0.1, lower, upper, start, rounding) {
  if (lower === void 0)
    lower = 0;
  if (upper === void 0)
    upper = 1;
  if (start === void 0)
    start = lower;
  throwNumberTest(interval2, `bipolar`, `interval`);
  throwNumberTest(upper, `bipolar`, `end`);
  throwNumberTest(start, `bipolar`, `offset`);
  throwNumberTest(lower, `bipolar`, `start`);
  return pingPong(interval2, lower, upper, start, rounding);
};
var pingPong = function* (interval2, lower, upper, start, rounding) {
  if (lower === void 0)
    throw new Error(`Parameter 'lower' is undefined`);
  if (interval2 === void 0) {
    throw new Error(`Parameter 'interval' is undefined`);
  }
  if (upper === void 0)
    throw new Error(`Parameter 'upper' is undefined`);
  if (rounding === void 0 && interval2 <= 1 && interval2 >= 0) {
    rounding = 10 / interval2;
  } else if (rounding === void 0)
    rounding = 1234;
  if (Number.isNaN(interval2))
    throw new Error(`interval parameter is NaN`);
  if (Number.isNaN(lower))
    throw new Error(`lower parameter is NaN`);
  if (Number.isNaN(upper))
    throw new Error(`upper parameter is NaN`);
  if (Number.isNaN(start))
    throw new Error(`upper parameter is NaN`);
  if (lower >= upper)
    throw new Error(`lower must be less than upper`);
  if (interval2 === 0)
    throw new Error(`Interval cannot be zero`);
  const distance = upper - lower;
  if (Math.abs(interval2) >= distance) {
    throw new Error(`Interval should be between -${distance} and ${distance}`);
  }
  let incrementing = interval2 > 0;
  upper = Math.floor(upper * rounding);
  lower = Math.floor(lower * rounding);
  interval2 = Math.floor(Math.abs(interval2 * rounding));
  if (interval2 === 0) {
    throw new Error(`Interval is zero (rounding: ${rounding})`);
  }
  if (start === void 0)
    start = lower;
  else
    start = Math.floor(start * rounding);
  if (start > upper || start < lower) {
    throw new Error(
      `Start (${start / rounding}) must be within lower (${lower / rounding}) and upper (${upper / rounding})`
    );
  }
  let v = start;
  yield v / rounding;
  let firstLoop = true;
  while (true) {
    v = v + (incrementing ? interval2 : -interval2);
    if (incrementing && v >= upper) {
      incrementing = false;
      v = upper;
      if (v === upper && firstLoop) {
        v = lower;
        incrementing = true;
      }
    } else if (!incrementing && v <= lower) {
      incrementing = true;
      v = lower;
      if (v === lower && firstLoop) {
        v = upper;
        incrementing = false;
      }
    }
    yield v / rounding;
    firstLoop = false;
  }
};

// src/generators/chain/index.ts
var chain_exports = {};
__export(chain_exports, {
  Dom: () => Dom_exports,
  Links: () => Links_exports,
  addToArray: () => addToArray,
  asArray: () => asArray,
  asCallback: () => asCallback,
  asPromise: () => asPromise,
  asValue: () => asValue,
  fromEvent: () => fromEvent,
  fromFunction: () => fromFunction,
  lazy: () => lazy,
  mergeAsArray: () => mergeAsArray,
  mergeFlat: () => mergeFlat,
  run: () => run,
  runN: () => runN,
  single: () => single,
  synchronise: () => synchronise,
  tick: () => tick
});

// src/collections/index.ts
var collections_exports = {};
__export(collections_exports, {
  Arrays: () => arrays_exports,
  Iterables: () => Iterables_exports,
  Maps: () => Map_exports,
  QueueImmutable: () => QueueImmutable,
  QueueMutable: () => QueueMutable,
  Queues: () => queue_exports,
  SetStringImmutable: () => SetStringImmutable,
  SetStringMutable: () => SetStringMutable,
  Sets: () => set_exports,
  StackImmutable: () => StackImmutable,
  StackMutable: () => StackMutable,
  Stacks: () => stack_exports,
  Trees: () => tree_exports,
  circularArray: () => circularArray
});

// src/collections/CircularArray.ts
var CircularArray = class _CircularArray extends Array {
  // ✔ Class is unit tested!
  /* eslint-disable-next-line functional/prefer-readonly-type */
  #capacity;
  /* eslint-disable-next-line functional/prefer-readonly-type */
  #pointer;
  constructor(capacity = 0) {
    super();
    throwIntegerTest(capacity, `positive`, `capacity`);
    this.#capacity = capacity;
    this.#pointer = 0;
  }
  /**
   * Add to array
   * @param thing Thing to add
   * @returns 
   */
  add(thing) {
    const ca = _CircularArray.from(this);
    ca[this.#pointer] = thing;
    ca.#capacity = this.#capacity;
    if (this.#capacity > 0) {
      ca.#pointer = this.#pointer + 1 === this.#capacity ? 0 : this.#pointer + 1;
    } else {
      ca.#pointer = this.#pointer + 1;
    }
    return ca;
  }
  get pointer() {
    return this.#pointer;
  }
  get isFull() {
    if (this.#capacity === 0)
      return false;
    return this.length === this.#capacity;
  }
};
var circularArray = (capacity) => new CircularArray(capacity);

// src/collections/tree/index.ts
var tree_exports = {};
__export(tree_exports, {
  FromObject: () => TraverseObject_exports,
  Mutable: () => TreeMutable_exports,
  Pathed: () => Pathed_exports,
  Traverse: () => TraversableTree_exports,
  compare: () => compare,
  isTraversable: () => isTraversable,
  isTreeNode: () => isTreeNode,
  toTraversable: () => toTraversable
});

// src/collections/tree/TraverseObject.ts
var TraverseObject_exports = {};
__export(TraverseObject_exports, {
  asDynamicTraversable: () => asDynamicTraversable2,
  children: () => children2,
  create: () => create,
  createSimplified: () => createSimplified,
  createWrapped: () => createWrapped,
  depthFirst: () => depthFirst2,
  getByPath: () => getByPath,
  prettyPrint: () => prettyPrint,
  prettyPrintEntries: () => prettyPrintEntries,
  toStringDeep: () => toStringDeep2,
  traceByPath: () => traceByPath
});

// src/collections/tree/TreeMutable.ts
var TreeMutable_exports = {};
__export(TreeMutable_exports, {
  add: () => add,
  addValue: () => addValue,
  asDynamicTraversable: () => asDynamicTraversable,
  breadthFirst: () => breadthFirst,
  children: () => children,
  childrenLength: () => childrenLength,
  compare: () => compare2,
  computeMaxDepth: () => computeMaxDepth,
  createNode: () => createNode,
  depthFirst: () => depthFirst,
  findAnyChildByValue: () => findAnyChildByValue,
  findChildByValue: () => findChildByValue,
  followValue: () => followValue,
  fromPlainObject: () => fromPlainObject,
  getRoot: () => getRoot,
  hasAnyChild: () => hasAnyChild,
  hasAnyParent: () => hasAnyParent,
  hasChild: () => hasChild,
  hasParent: () => hasParent,
  nodeDepth: () => nodeDepth,
  parents: () => parents,
  queryByValue: () => queryByValue,
  remove: () => remove,
  root: () => root,
  rootWrapped: () => rootWrapped,
  setChildren: () => setChildren,
  stripParentage: () => stripParentage,
  throwTreeTest: () => throwTreeTest,
  toStringDeep: () => toStringDeep,
  treeTest: () => treeTest,
  value: () => value,
  wrap: () => wrap
});

// src/collections/stack/StackFns.ts
var trimStack = (opts, stack, toAdd) => {
  const potentialLength = stack.length + toAdd.length;
  const policy = opts.discardPolicy ?? `additions`;
  const capacity = opts.capacity ?? potentialLength;
  const toRemove = potentialLength - capacity;
  if (opts.debug) {
    console.log(
      `Stack.push: stackLen: ${stack.length} potentialLen: ${potentialLength} toRemove: ${toRemove} policy: ${policy}`
    );
  }
  switch (policy) {
    case `additions`: {
      if (opts.debug) {
        console.log(
          `Stack.push:DiscardAdditions: stackLen: ${stack.length} slice: ${potentialLength - capacity} toAddLen: ${toAdd.length}`
        );
      }
      if (stack.length === opts.capacity) {
        return stack;
      } else {
        return [...stack, ...toAdd.slice(0, toAdd.length - toRemove)];
      }
    }
    case `newer`: {
      if (toRemove >= stack.length) {
        return toAdd.slice(
          Math.max(0, toAdd.length - capacity),
          Math.min(toAdd.length, capacity) + 1
        );
      } else {
        if (opts.debug) {
          console.log(` from orig: ${JSON.stringify(stack.slice(0, stack.length - toRemove))}`);
        }
        return [
          ...stack.slice(0, stack.length - toRemove),
          ...toAdd.slice(0, Math.min(toAdd.length, capacity - toRemove + 1))
        ];
      }
    }
    case `older`: {
      return [...stack, ...toAdd].slice(toRemove);
    }
    default: {
      throw new Error(`Unknown discard policy ${policy}`);
    }
  }
};
var push = (opts, stack, ...toAdd) => {
  const potentialLength = stack.length + toAdd.length;
  const overSize = opts.capacity && potentialLength > opts.capacity;
  const toReturn = overSize ? trimStack(opts, stack, toAdd) : [...stack, ...toAdd];
  return toReturn;
};
var pop = (opts, stack) => {
  if (stack.length === 0)
    throw new Error(`Stack is empty`);
  return stack.slice(0, -1);
};
var peek = (opts, stack) => stack.at(-1);
var isEmpty = (opts, stack) => stack.length === 0;
var isFull = (opts, stack) => {
  if (opts.capacity) {
    return stack.length >= opts.capacity;
  }
  return false;
};

// src/collections/stack/StackMutable.ts
var StackMutable = class {
  opts;
  /* eslint-disable-next-line functional/prefer-readonly-type */
  data;
  constructor(opts = {}, data = []) {
    this.opts = opts;
    this.data = data;
  }
  /**
   * Push data onto the stack.
   * If `toAdd` is empty, nothing happens
   * @param toAdd Data to add
   * @returns Length of stack
   */
  push(...toAdd) {
    if (toAdd.length === 0)
      return this.data.length;
    this.data = push(this.opts, this.data, ...toAdd);
    return this.data.length;
  }
  forEach(fn) {
    this.data.forEach(fn);
  }
  forEachFromTop(fn) {
    [...this.data].reverse().forEach(fn);
  }
  pop() {
    const v = peek(this.opts, this.data);
    this.data = pop(this.opts, this.data);
    return v;
  }
  get isEmpty() {
    return isEmpty(this.opts, this.data);
  }
  get isFull() {
    return isFull(this.opts, this.data);
  }
  get peek() {
    return peek(this.opts, this.data);
  }
  get length() {
    return this.data.length;
  }
};
var mutable = (opts = {}, ...startingItems) => new StackMutable({ ...opts }, [...startingItems]);

// src/collections/tree/Compare.ts
var compare = (a, b, eq = isEqualValueIgnoreOrder, parent) => {
  const valueEqual = valueOrIdentityEqual(a, b, eq);
  const childrenCompare = compareChildren(a, b, eq);
  const diff = {
    valueChanged: !valueEqual,
    a,
    b,
    added: childrenCompare.added,
    removed: childrenCompare.removed,
    childChanged: false
  };
  const diffNode = {
    value: diff,
    childrenStore: [],
    parent
  };
  const childrenDiff = childrenCompare.identical.map((c) => compare(c[0], c[1], eq, diffNode));
  const someChildChange = hasChange(diff) || childrenDiff.some((v) => hasChange(v.value));
  setChildren(diffNode, childrenDiff);
  diffNode.toString = () => toString(diffNode, 0);
  diffNode.value.childChanged = someChildChange;
  throwTreeTest(diffNode);
  return diffNode;
};
var hasChange = (vv) => {
  if (vv === void 0)
    return false;
  if (vv.valueChanged)
    return true;
  if (vv.childChanged)
    return true;
  if (vv.added.length > 0)
    return true;
  if (vv.removed.length > 0)
    return true;
  return false;
};
var compareChildren = (a, b, eq = isEqualValueIgnoreOrder) => {
  const childrenOfA = [...a.children()];
  const childrenOfB = [...b.children()];
  const identical = [];
  const removed = [];
  for (const childA of childrenOfA) {
    let foundIndex = -1;
    for (const [index, childOfB] of childrenOfB.entries()) {
      const d = valueOrIdentityEqual(childA, childOfB, eq);
      if (d) {
        identical.push([childA, childOfB]);
        foundIndex = index;
        break;
      }
    }
    if (foundIndex === -1) {
      removed.push(childA);
    } else {
      childrenOfB.splice(foundIndex, 1);
    }
  }
  const added = [...childrenOfB];
  return { added, identical, removed };
};
var valueOrIdentityEqual = (a, b, eq) => {
  if (a.getIdentity() === b.getIdentity())
    return true;
  if (eq(a.getValue(), b.getValue()))
    return true;
  return false;
};
var toStringSingle = (n) => {
  return JSON.stringify(n.getValue());
};
var toString = (n, indent = 0) => {
  if (n === void 0)
    return `(undefined)`;
  let t = toStringDiff(n.value, indent);
  for (const c of n.childrenStore) {
    t += toString(c, indent + 2);
  }
  return t;
};
var toStringDiff = (n, indent) => {
  const spaces = ` `.repeat(indent);
  if (n === void 0)
    return `${spaces}(undefined)`;
  const t = [];
  t.push(`a: ${toStringSingle(n.a)} b: ${toStringSingle(n.b)}`);
  if (n.valueChanged)
    t.push(`Value changed. Child changed: ${n.childChanged}`);
  else
    t.push(`Value unchanged. Child changed: ${n.childChanged}`);
  if (n.added.length > 0) {
    t.push(`Added:`);
    for (const c of n.added) {
      t.push(` - ` + toStringSingle(c));
    }
  }
  if (n.removed.length > 0) {
    t.push(`Removed: ${n.removed.length}`);
    for (const c of n.removed) {
      t.push(` - ` + toStringSingle(c));
    }
  }
  t.push(`----
`);
  return t.map((line) => spaces + line).join(`
`);
};

// src/collections/tree/TreeMutable.ts
var compare2 = (a, b, eq) => {
  return compare(asDynamicTraversable(a), asDynamicTraversable(b), eq);
};
var stripParentage = (node) => {
  const n = {
    value: node.value,
    childrenStore: node.childrenStore.map((c) => stripParentage(c))
  };
  return n;
};
var unwrapped = (node) => `wraps` in node ? node.wraps : node;
var wrapped = (node) => `wraps` in node ? node : wrap(node);
var wrap = (n) => {
  return {
    *children() {
      for (const c of n.childrenStore) {
        yield wrap(c);
      }
    },
    getValue: () => n.value,
    getIdentity: () => n,
    *queryValue(value2) {
      for (const v of queryByValue(value2, unwrapped(n))) {
        yield wrap(v);
      }
    },
    getParent: () => n.parent === void 0 ? void 0 : wrap(n.parent),
    hasParent: (parent) => {
      return hasParent(n, unwrapped(parent));
    },
    hasAnyParent: (parent) => {
      return hasAnyParent(n, unwrapped(parent));
    },
    hasChild: (child) => {
      return hasChild(unwrapped(child), n);
    },
    hasAnyChild: (child) => {
      return hasAnyChild(unwrapped(child), n);
    },
    remove: () => {
      remove(n);
    },
    addValue: (value2) => {
      const nodeValue = addValue(value2, n);
      return wrap(nodeValue);
    },
    add: (child) => {
      add(unwrapped(child), n);
      return wrapped(child);
    },
    wraps: n
  };
};
var remove = (child) => {
  const p = child.parent;
  if (p === void 0)
    return;
  child.parent = void 0;
  p.childrenStore = without(p.childrenStore, child);
};
function* depthFirst(node) {
  if (!root)
    return;
  const stack = new StackMutable();
  stack.push(...node.childrenStore);
  let entry = stack.pop();
  while (entry) {
    yield entry;
    if (entry) {
      stack.push(...entry.childrenStore);
    }
    if (stack.isEmpty)
      break;
    entry = stack.pop();
  }
}
function* breadthFirst(node) {
  if (!node)
    return;
  const queue = new QueueMutable();
  queue.enqueue(...node.childrenStore);
  let entry = queue.dequeue();
  while (entry) {
    yield entry;
    if (entry) {
      queue.enqueue(...entry.childrenStore);
    }
    if (queue.isEmpty)
      break;
    entry = queue.dequeue();
  }
}
function treeTest(root2, seen = []) {
  if (root2.parent === root2)
    return [false, `Root has itself as parent`, root2];
  if (seen.includes(root2))
    return [false, `Same node instance is appearing further in tree`, root2];
  seen.push(root2);
  if (containsDuplicateInstances(root2.childrenStore))
    return [false, `Children list contains duplicates`, root2];
  for (const c of root2.childrenStore) {
    if (c.parent !== root2)
      return [false, `Member of childrenStore does not have .parent set`, c];
    if (hasAnyChild(root2, c))
      return [false, `Child has parent as its own child`, c];
    const v = treeTest(c, seen);
    if (!v[0])
      return v;
  }
  return [true, ``, root2];
}
function throwTreeTest(root2) {
  const v = treeTest(root2);
  if (v[0])
    return;
  throw new Error(`${v[1]} Node: ${toStringAbbreviate(v[2].value, 30)}`, { cause: v[2] });
}
function* children(root2) {
  for (const c of root2.childrenStore) {
    yield c;
  }
}
function* parents(root2) {
  let p = root2.parent;
  while (p) {
    yield p;
    p = p.parent;
  }
}
function nodeDepth(node) {
  const p = [...parents(node)];
  return p.length;
}
var hasChild = (child, parent) => {
  for (const c of parent.childrenStore) {
    if (c === child)
      return true;
  }
  return false;
};
var findChildByValue = (value2, parent, eq = isEqualDefault) => {
  for (const c of parent.childrenStore) {
    if (eq(value2, c.value))
      return c;
  }
};
function* queryByValue(value2, parent, eq = isEqualDefault) {
  for (const c of parent.childrenStore) {
    if (eq(value2, c.value))
      yield c;
  }
}
var hasAnyChild = (prospectiveChild, parent) => {
  for (const c of breadthFirst(parent)) {
    if (c === prospectiveChild)
      return true;
  }
  return false;
};
var findAnyChildByValue = (value2, parent, eq = isEqualDefault) => {
  for (const c of breadthFirst(parent)) {
    if (eq(c.value, value2))
      return c;
  }
};
var getRoot = (node) => {
  if (node.parent)
    return getRoot(node.parent);
  return node;
};
var hasAnyParent = (child, prospectiveParent) => {
  for (const p of parents(child)) {
    if (p === prospectiveParent)
      return true;
  }
  return false;
};
var hasParent = (child, prospectiveParent) => {
  return child.parent === prospectiveParent;
};
var computeMaxDepth = (node) => {
  return computeMaxDepthImpl(node, 0);
};
var computeMaxDepthImpl = (node, startingDepth = 0) => {
  let depth = startingDepth;
  for (const c of node.childrenStore) {
    depth = Math.max(depth, computeMaxDepthImpl(c, startingDepth + 1));
  }
  return depth;
};
var add = (child, parent) => {
  throwAttemptedChild(child, parent);
  const p = child.parent;
  parent.childrenStore = [...parent.childrenStore, child];
  child.parent = parent;
  if (p) {
    p.childrenStore = without(p.childrenStore, child);
  }
};
var addValue = (value2, parent) => {
  return createNode(value2, parent);
};
var root = (value2) => {
  return createNode(value2);
};
var fromPlainObject = (value2, label = ``, parent, seen = []) => {
  const entries = Object.entries(value2);
  parent = parent === void 0 ? root() : addValue({ label, value: value2 }, parent);
  for (const entry of entries) {
    const value3 = entry[1];
    if (seen.includes(value3))
      continue;
    seen.push(value3);
    if (typeof entry[1] === `object`) {
      fromPlainObject(value3, entry[0], parent, seen);
    } else {
      addValue({ label: entry[0], value: value3 }, parent);
    }
  }
  return parent;
};
var rootWrapped = (value2) => {
  return wrap(createNode(value2));
};
var createNode = (value2, parent) => {
  const n = {
    childrenStore: [],
    parent,
    value: value2
  };
  if (parent !== void 0) {
    parent.childrenStore = [...parent.childrenStore, n];
  }
  return n;
};
var childrenLength = (node) => {
  return node.childrenStore.length;
};
var value = (node) => {
  return node.value;
};
var asDynamicTraversable = (node) => {
  const t = {
    *children() {
      for (const c of node.childrenStore) {
        yield asDynamicTraversable(c);
      }
    },
    getParent() {
      if (node.parent === void 0)
        return;
      return asDynamicTraversable(node.parent);
    },
    getValue() {
      return node.value;
    },
    getIdentity() {
      return node;
    }
  };
  return t;
};
var throwAttemptedChild = (c, parent) => {
  if (parent === c)
    throw new Error(`Cannot add self as child`);
  if (c.parent === parent)
    return;
  if (hasAnyParent(parent, c))
    throw new Error(`Child contains parent (1)`, { cause: c });
  if (hasAnyParent(c, parent))
    throw new Error(`Parent already contains child`, { cause: c });
  if (hasAnyChild(parent, c))
    throw new Error(`Child contains parent (2)`, { cause: c });
};
var setChildren = (parent, children3) => {
  for (const c of children3) {
    throwAttemptedChild(c, parent);
  }
  parent.childrenStore = [...children3];
  for (const c of children3) {
    c.parent = parent;
  }
};
var toStringDeep = (node, indent = 0) => {
  const t = `${`  `.repeat(indent)} + ${node.value ? JSON.stringify(node.value) : `-`}`;
  return node.childrenStore.length > 0 ? t + `
` + node.childrenStore.map((d) => toStringDeep(d, indent + 1)).join(`
`) : t;
};
function* followValue(root2, continuePredicate, depth = 1) {
  for (const c of root2.childrenStore) {
    const value2 = c.value;
    if (value2 === void 0)
      continue;
    if (continuePredicate(value2, depth)) {
      yield c.value;
      yield* followValue(c, continuePredicate, depth + 1);
    }
  }
}

// src/collections/tree/TraverseObject.ts
function prettyPrintEntries(entries) {
  if (entries.length === 0)
    return `(empty)`;
  let t = ``;
  for (const [index, entry] of entries.entries()) {
    t += `  `.repeat(index);
    t += entry.name + ` = ` + JSON.stringify(entry.nodeValue) + `
`;
  }
  return t;
}
var prettyPrint = (node, indent = 0, options = {}) => {
  nullUndef(node, `node`);
  const defaultName = options.name ?? `node`;
  const entry = getNamedEntry(node, defaultName);
  const t = `${`  `.repeat(indent)} + name: ${entry.name} value: ${JSON.stringify(entry.nodeValue)}`;
  const childrenAsArray = [...children2(node, options)];
  return childrenAsArray.length > 0 ? t + `
` + childrenAsArray.map((d) => prettyPrint(d.nodeValue, indent + 1, { ...options, name: d.name })).join(`
`) : t;
};
var toStringDeep2 = (node, indent = 0) => {
  let t = ` `.repeat(indent) + ` ` + node.value?.name;
  if (node.value !== void 0) {
    if (`sourceValue` in node.value && `nodeValue` in node.value) {
      let sourceValue = toStringAbbreviate(node.value?.sourceValue, 20);
      const nodeValue = toStringAbbreviate(node.value?.nodeValue, 20);
      sourceValue = sourceValue === nodeValue ? `` : `source: ` + sourceValue;
      t += ` = ${nodeValue} ${sourceValue}`;
    } else if (`value` in node.value && node.value.value !== void 0)
      t += ` = ${node.value.value}`;
    if (`ancestors` in node.value) {
      t += ` (ancestors: ${node.value.ancestors.join(`, `)})`;
    }
  }
  t += `
`;
  for (const c of node.childrenStore) {
    t += toStringDeep2(c, indent + 1);
  }
  return t;
};
function* children2(node, options = {}) {
  nullUndef(node, `node`);
  const filter3 = options.filter ?? `none`;
  const filterByValue = (v) => {
    if (filter3 === `none`)
      return [true, isPrimitive(v)];
    else if (filter3 === `leaves` && isPrimitive(v))
      return [true, true];
    else if (filter3 === `branches` && !isPrimitive(v))
      return [true, false];
    return [false, isPrimitive(v)];
  };
  if (Array.isArray(node)) {
    for (const [index, element] of node.entries()) {
      const f = filterByValue(element);
      if (f[0]) {
        yield { name: index.toString(), sourceValue: element, nodeValue: f[1] ? element : void 0 };
      }
    }
  } else if (typeof node === `object`) {
    const entriesIter = `entries` in node ? node.entries() : Object.entries(node);
    for (const [name, value2] of entriesIter) {
      const f = filterByValue(value2);
      if (f[0]) {
        yield { name, sourceValue: value2, nodeValue: f[1] ? value2 : void 0 };
      }
    }
  }
}
function* depthFirst2(node, options = {}, ancestors = []) {
  for (const c of children2(node, options)) {
    yield { ...c, ancestors: [...ancestors] };
    yield* depthFirst2(c.sourceValue, options, [...ancestors, c.name]);
  }
}
function childByName(name, node) {
  for (const d of children2(node)) {
    if (d.name === name)
      return d;
  }
}
function getByPath(path, node, opts = {}) {
  const v = last(traceByPath(path, node, opts));
  if (!v)
    throw new Error(`Could not trace path: ${path} `);
  return v;
}
function* traceByPath(path, node, opts = {}) {
  nullUndef(path, `path`);
  nullUndef(node, `node`);
  const separator = opts.separator ?? `.`;
  const pathSplit = path.split(separator);
  const ancestors = [];
  for (const p of pathSplit) {
    const entry = childByName(p, node);
    if (!entry) {
      yield { name: p, sourceValue: void 0, nodeValue: void 0, ancestors };
      return;
    }
    node = entry.sourceValue;
    yield { ...entry, ancestors: [...ancestors] };
    ancestors.push(p);
  }
}
var asDynamicTraversable2 = (node, options = {}, ancestors = [], parent) => {
  const name = options.name ?? `object`;
  const t = {
    *children() {
      for (const c of children2(node, options)) {
        yield asDynamicTraversable2(c.sourceValue, { ...options, name: c.name }, [...ancestors, name], t);
      }
    },
    getParent() {
      return parent;
    },
    getValue() {
      return { name, value: node, ancestors };
    },
    getIdentity() {
      return node;
    }
  };
  return t;
};
var createWrapped = (node, options) => {
  return wrap(create(node, options));
};
var create = (node, options = {}) => {
  const valuesAtLeaves = options.valuesAtLeaves ?? false;
  const valueFor = valuesAtLeaves ? (v) => {
    if (isPrimitive(v))
      return v;
  } : (v) => v;
  return createImpl(node, valueFor(node), options, []);
};
var createImpl = (sourceValue, nodeValue, options = {}, ancestors) => {
  const defaultName = options.name ?? `object_ci`;
  const r = root({ name: defaultName, value: nodeValue, ancestors: [...ancestors] });
  ancestors = [...ancestors, defaultName];
  for (const c of children2(sourceValue, options)) {
    const v = options.valuesAtLeaves ? c.nodeValue : c.sourceValue;
    add(createImpl(c.sourceValue, v, { ...options, name: c.name }, ancestors), r);
  }
  return r;
};
var createSimplified = (node, options = {}) => {
  return stripParentage(create(node, options));
};
function getNamedEntry(node, defaultName = ``) {
  if (`name` in node && `nodeValue` in node && `sourceValue` in node)
    return node;
  if (`name` in node) {
    return { name: node.name, nodeValue: node, sourceValue: node };
  }
  return { name: defaultName, nodeValue: node, sourceValue: node };
}

// src/collections/tree/Pathed.ts
var Pathed_exports = {};
__export(Pathed_exports, {
  addValueByPath: () => addValueByPath,
  childrenLengthByPath: () => childrenLengthByPath,
  clearValuesByPath: () => clearValuesByPath,
  create: () => create2,
  removeByPath: () => removeByPath,
  valueByPath: () => valueByPath,
  valuesByPath: () => valuesByPath
});
var create2 = (pathOpts = {}) => {
  let root2;
  const add3 = (value2, path) => {
    const n = addValueByPath(value2, path, root2, pathOpts);
    if (root2 === void 0) {
      root2 = getRoot(n);
    }
  };
  const prettyPrint2 = () => {
    if (root2 === void 0)
      return `(empty)`;
    return toStringDeep(root2);
  };
  const getValue = (path) => {
    if (root2 === void 0)
      return;
    return valueByPath(path, root2, pathOpts);
  };
  const remove2 = (path) => {
    if (root2 === void 0)
      return false;
    return removeByPath(path, root2, pathOpts);
  };
  const hasPath = (path) => {
    if (root2 === void 0)
      return false;
    const c = findChildByPath(path, root2, pathOpts);
    return c !== void 0;
  };
  const getNode = (path) => {
    if (root2 === void 0)
      return;
    const c = findChildByPath(path, root2, pathOpts);
    return c;
  };
  const childrenLength3 = (path) => {
    if (root2 === void 0)
      return 0;
    const c = findChildByPath(path, root2, pathOpts);
    if (c === void 0)
      return 0;
    return c.childrenStore.length;
  };
  const getValues = (path) => {
    if (root2 === void 0)
      return [];
    return valuesByPath(path, root2, pathOpts);
  };
  const clearValues = (path) => {
    if (root2 === void 0)
      return false;
    return clearValuesByPath(path, root2, pathOpts);
  };
  return { add: add3, prettyPrint: prettyPrint2, remove: remove2, getValue, getValues, hasPath, childrenLength: childrenLength3, getNode, clearValues };
};
var addValueByPath = (value2, path, node, pathOpts = {}) => {
  const separator = pathOpts.separator ?? `.`;
  const duplicatePath = pathOpts.duplicates ?? `overwrite`;
  const split = path.split(separator);
  let count2 = 0;
  for (const p of split) {
    const lastEntry = count2 === split.length - 1;
    const found = findChildByLabel(p, node);
    if (found === void 0) {
      const labelled = {
        value: lastEntry ? value2 : void 0,
        label: p
      };
      node = createNode(labelled, node);
    } else {
      node = found;
      if (lastEntry) {
        switch (duplicatePath) {
          case `ignore`: {
            break;
          }
          case `allow`: {
            const existing = getValuesFromNode(node);
            node.value = {
              values: [...existing, value2],
              label: p
            };
            break;
          }
          case `overwrite`: {
            node.value = {
              value: value2,
              label: p
            };
            break;
          }
        }
      } else {
        node = found;
      }
    }
    count2++;
  }
  if (node === void 0)
    throw new Error(`Could not create tree`);
  return node;
};
var removeByPath = (path, root2, pathOpts = {}) => {
  if (root2 === void 0)
    return false;
  const c = findChildByPath(path, root2, pathOpts);
  if (c === void 0)
    return false;
  remove(c);
  return true;
};
var clearValuesByPath = (path, root2, pathOpts = {}) => {
  if (root2 === void 0)
    return false;
  const c = findChildByPath(path, root2, pathOpts);
  if (c === void 0)
    return false;
  c.value = {
    label: c.value?.label ?? ``,
    value: void 0
  };
  return true;
};
var childrenLengthByPath = (path, node, pathOpts = {}) => {
  if (node === void 0)
    return 0;
  const c = findChildByPath(path, node, pathOpts);
  if (c === void 0)
    return 0;
  return c.childrenStore.length;
};
var findChildByLabel = (label, node) => {
  if (node === void 0)
    return void 0;
  if (label === void 0)
    throw new Error(`Parameter 'label' cannot be undefined`);
  if (node.value?.label === label)
    return node;
  for (const c of node.childrenStore) {
    if (c.value?.label === label)
      return c;
  }
};
var valueByPath = (path, node, pathOpts = {}) => {
  const values = valuesByPath(path, node, pathOpts);
  if (values.length === 0)
    return void 0;
  if (values.length > 1)
    throw new Error(`Multiple values at path. Use getValues instead`);
  return values[0];
};
var getValuesFromNode = (c) => {
  if (c.value === void 0)
    return [];
  if (`values` in c.value)
    return c.value.values;
  if (`value` in c.value) {
    if (c.value.value === void 0)
      return [];
    return [c.value.value];
  }
  return [];
};
var findChildByPath = (path, node, pathOpts = {}) => {
  const separator = pathOpts.separator ?? `.`;
  const split = path.split(separator);
  let c = node;
  for (const p of split) {
    c = findChildByLabel(p, c);
    if (c === void 0) {
      return;
    }
  }
  return c;
};
var valuesByPath = (path, node, pathOpts = {}) => {
  const separator = pathOpts.separator ?? `.`;
  const split = path.split(separator);
  let c = node;
  for (const p of split) {
    c = findChildByLabel(p, c);
    if (c === void 0) {
      return [];
    }
  }
  return getValuesFromNode(c);
};

// src/collections/tree/TraversableTree.ts
var TraversableTree_exports = {};
__export(TraversableTree_exports, {
  breadthFirst: () => breadthFirst2,
  childrenLength: () => childrenLength2,
  couldAddChild: () => couldAddChild,
  depthFirst: () => depthFirst3,
  find: () => find2,
  findAnyChildByValue: () => findAnyChildByValue2,
  findAnyParentByValue: () => findAnyParentByValue,
  findByValue: () => findByValue,
  findChildByValue: () => findChildByValue2,
  findParentByValue: () => findParentByValue,
  followValue: () => followValue2,
  hasAnyChild: () => hasAnyChild2,
  hasAnyChildValue: () => hasAnyChildValue,
  hasAnyParent: () => hasAnyParent2,
  hasAnyParentValue: () => hasAnyParentValue,
  hasChild: () => hasChild2,
  hasChildValue: () => hasChildValue,
  hasParent: () => hasParent2,
  hasParentValue: () => hasParentValue,
  parents: () => parents2,
  siblings: () => siblings,
  toString: () => toString2,
  toStringDeep: () => toStringDeep3
});
var childrenLength2 = (tree) => {
  return [...tree.children()].length;
};
var hasAnyParent2 = (child, possibleParent, eq) => {
  return hasParent2(child, possibleParent, eq, Number.MAX_SAFE_INTEGER);
};
var hasAnyParentValue = (child, possibleParentValue, eq) => {
  return hasParentValue(child, possibleParentValue, eq, Number.MAX_SAFE_INTEGER);
};
var findAnyParentByValue = (child, possibleParentValue, eq) => {
  return findParentByValue(child, possibleParentValue, eq, Number.MAX_SAFE_INTEGER);
};
var hasParent2 = (child, possibleParent, eq = isEqualDefault, maxDepth = 0) => {
  if (maxDepth < 0)
    return false;
  const p = child.getParent();
  if (p === void 0)
    return false;
  if (eq(p, possibleParent))
    return true;
  if (eq(p.getIdentity(), possibleParent.getIdentity()))
    return true;
  return hasParent2(p, possibleParent, eq, maxDepth - 1);
};
var hasParentValue = (child, possibleParentValue, eq = isEqualDefault, maxDepth = 0) => {
  if (maxDepth < 0)
    return false;
  const p = child.getParent();
  if (p === void 0)
    return false;
  if (eq(p.getValue(), possibleParentValue))
    return true;
  return hasParentValue(p, possibleParentValue, eq, maxDepth - 1);
};
var findParentByValue = (child, possibleParentValue, eq = isEqualDefault, maxDepth = 0) => {
  if (maxDepth < 0)
    return;
  const p = child.getParent();
  if (p === void 0)
    return;
  if (eq(p.getValue(), possibleParentValue))
    return p;
  return findParentByValue(p, possibleParentValue, eq, maxDepth - 1);
};
var couldAddChild = (parent, prospectiveChild, eq = isEqualDefault) => {
  if (eq(parent, prospectiveChild))
    throw new Error(`Child equals parent`);
  if (hasAnyChild2(parent, prospectiveChild, eq)) {
    throw new Error(`Circular. Parent already has child`);
  }
  if (hasAnyChild2(prospectiveChild, parent, eq)) {
    throw new Error(`Prospective child has parent as child relation`);
  }
};
var hasAnyChild2 = (parent, possibleChild, eq = isEqualDefault) => {
  return hasChild2(parent, possibleChild, eq, Number.MAX_SAFE_INTEGER);
};
var hasAnyChildValue = (parent, possibleChildValue, eq = isEqualDefault) => {
  return hasChildValue(parent, possibleChildValue, eq, Number.MAX_SAFE_INTEGER);
};
var hasChild2 = (parent, possibleChild, eq = isEqualDefault, maxDepth = 0) => {
  if (maxDepth < 0)
    return false;
  if (eq(parent, possibleChild))
    return true;
  if (eq(parent.getIdentity(), possibleChild.getIdentity()))
    return true;
  for (const c of breadthFirst2(parent, maxDepth)) {
    if (eq(c, possibleChild))
      return true;
    if (eq(c.getIdentity(), possibleChild.getIdentity()))
      return true;
  }
  return false;
};
var hasChildValue = (parent, possibleValue, eq = isEqualDefault, maxDepth = 0) => {
  if (maxDepth < 0)
    return false;
  if (eq(parent.getValue(), possibleValue))
    return true;
  for (const c of breadthFirst2(parent, maxDepth)) {
    if (eq(c.getValue(), possibleValue))
      return true;
  }
  return false;
};
function* siblings(node) {
  const p = node.getParent();
  if (p === void 0)
    return;
  for (const s of p.children()) {
    if (s === node)
      continue;
    yield s;
  }
}
function* parents2(node) {
  let p = node.getParent();
  while (p !== void 0) {
    yield p;
    p = p.getParent();
  }
}
var findAnyChildByValue2 = (parent, possibleValue, eq = isEqualDefault) => {
  return findChildByValue2(parent, possibleValue, eq, Number.MAX_SAFE_INTEGER);
};
var findChildByValue2 = (parent, possibleValue, eq = isEqualDefault, maxDepth = 0) => {
  if (maxDepth < 0)
    return;
  if (eq(parent.getValue(), possibleValue))
    return parent;
  for (const d of breadthFirst2(parent, maxDepth)) {
    if (eq(d.getValue(), possibleValue))
      return d;
  }
  return;
};
function* depthFirst3(root2) {
  if (!root2)
    return;
  const stack = new StackMutable();
  let entry = root2;
  while (entry) {
    stack.push(...entry.children());
    entry = stack.pop();
    if (entry)
      yield entry;
  }
}
function* breadthFirst2(root2, depth = Number.MAX_SAFE_INTEGER) {
  if (!root2)
    return;
  const queue = new QueueMutable();
  let entry = root2;
  while (entry) {
    if (depth < 0)
      return;
    for (const c of entry.children()) {
      yield c;
      queue.enqueue(c);
    }
    entry = queue.dequeue();
    depth--;
  }
}
function find2(root2, predicate, order = `breadth`) {
  if (predicate(root2))
    return root2;
  const iter = order === `breadth` ? breadthFirst2 : depthFirst3;
  for (const c of iter(root2)) {
    if (predicate(c))
      return c;
  }
}
function findByValue(root2, predicate, order = `breadth`) {
  if (predicate(root2.getValue()))
    return root2;
  const iter = order === `breadth` ? breadthFirst2 : depthFirst3;
  for (const c of iter(root2)) {
    if (predicate(c.getValue()))
      return c;
  }
}
function* followValue2(root2, continuePredicate, depth = 1) {
  for (const c of root2.children()) {
    if (continuePredicate(c.getValue(), depth)) {
      yield c.getValue();
      yield* followValue2(c, continuePredicate, depth + 1);
    }
  }
}
function toStringDeep3(node, depth = 0) {
  if (node === void 0)
    return `(undefined)`;
  if (node === null)
    return `(null)`;
  const v = node.getValue();
  let type = typeof v;
  if (Array.isArray(v))
    type = `array`;
  let t = `  `.repeat(depth) + `value: ${JSON.stringify(v)} (${type})
`;
  for (const n of node.children()) {
    t += toStringDeep3(n, depth + 1);
  }
  return t;
}
function toString2(...nodes) {
  let t = ``;
  for (const node of nodes) {
    const v = node.getValue();
    const vString = toStringAbbreviate(v);
    const children3 = [...node.children()];
    const parent = node.getParent();
    let type = typeof v;
    if (Array.isArray(v))
      type = `array`;
    t += `value: ${vString} (${type}) kids: ${children3.length} parented: ${parent ? `y` : `n`}
`;
  }
  return t;
}

// src/collections/tree/index.ts
var toTraversable = (node) => {
  if (isTraversable(node))
    return node;
  if (isTreeNode(node))
    return asDynamicTraversable(node);
  if (typeof node === `object`)
    return asDynamicTraversable2(node);
  throw new Error(`Parameter 'node' not convertible`);
};
var isTreeNode = (node) => {
  if (`parent` in node && `childrenStore` in node && `value` in node) {
    if (Array.isArray(node.childrenStore))
      return true;
  }
  return false;
};
var isTraversable = (node) => {
  return `children` in node && `getParent` in node && `getValue` in node && `getIdentity` in node;
};

// src/collections/stack/index.ts
var stack_exports = {};
__export(stack_exports, {
  immutable: () => immutable,
  mutable: () => mutable
});

// src/collections/stack/StackImmutable.ts
var StackImmutable = class _StackImmutable {
  opts;
  /* eslint-disable-next-line functional/prefer-readonly-type */
  data;
  constructor(opts = {}, data = []) {
    this.opts = opts;
    this.data = data;
  }
  push(...toAdd) {
    return new _StackImmutable(
      this.opts,
      push(this.opts, this.data, ...toAdd)
    );
  }
  pop() {
    return new _StackImmutable(this.opts, pop(this.opts, this.data));
  }
  forEach(fn) {
    this.data.forEach(fn);
  }
  forEachFromTop(fn) {
    [...this.data].reverse().forEach(fn);
  }
  get isEmpty() {
    return isEmpty(this.opts, this.data);
  }
  get isFull() {
    return isFull(this.opts, this.data);
  }
  get peek() {
    return peek(this.opts, this.data);
  }
  get length() {
    return this.data.length;
  }
};
var immutable = (opts = {}, ...startingItems) => new StackImmutable({ ...opts }, [...startingItems]);

// src/collections/Map/index.ts
var Map_exports = {};
__export(Map_exports, {
  ExpiringMap: () => ExpiringMap,
  MapOfMutableImpl: () => MapOfMutableImpl,
  MapOfSimpleMutable: () => MapOfSimpleMutable,
  NumberMap: () => NumberMap,
  addKeepingExisting: () => addKeepingExisting,
  addObject: () => addObject,
  deleteByValue: () => deleteByValue,
  expiringMap: () => create3,
  filter: () => filter,
  find: () => find,
  firstEntryByIterablePredicate: () => firstEntryByIterablePredicate,
  firstEntryByIterableValue: () => firstEntryByIterableValue,
  fromIterable: () => fromIterable,
  fromObject: () => fromObject,
  getClosestIntegerKey: () => getClosestIntegerKey,
  getFromKeys: () => getFromKeys,
  getOrGenerate: () => getOrGenerate,
  getOrGenerateSync: () => getOrGenerateSync,
  hasAnyValue: () => hasAnyValue,
  hasKeyValue: () => hasKeyValue,
  immutable: () => immutable2,
  mapOfSimpleMutable: () => ofSimpleMutable,
  mapToArray: () => mapToArray,
  mapToObjectTransform: () => mapToObjectTransform,
  mergeByKey: () => mergeByKey,
  mutable: () => mutable2,
  ofArrayMutable: () => ofArrayMutable,
  ofCircularMutable: () => ofCircularMutable,
  ofSetMutable: () => ofSetMutable,
  sortByValue: () => sortByValue,
  sortByValueProperty: () => sortByValueProperty,
  toArray: () => toArray,
  toObject: () => toObject,
  transformMap: () => transformMap,
  zipKeyValue: () => zipKeyValue
});

// src/collections/Map/ExpiringMap.ts
var create3 = (opts = {}) => new ExpiringMap(opts);
var ExpiringMap = class extends SimpleEventEmitter {
  capacity;
  store;
  keyCount;
  evictPolicy;
  autoDeleteElapsedMs;
  autoDeletePolicy;
  constructor(opts = {}) {
    super();
    this.capacity = opts.capacity ?? -1;
    throwIntegerTest(this.capacity, `nonZero`, `capacity`);
    this.store = /* @__PURE__ */ new Map();
    this.keyCount = 0;
    if (opts.evictPolicy && this.capacity <= 0) {
      throw new Error(`evictPolicy is set, but no capacity limit is set`);
    }
    this.evictPolicy = opts.evictPolicy ?? `none`;
    this.autoDeleteElapsedMs = opts.autoDeleteElapsedMs ?? -1;
    this.autoDeletePolicy = opts.autoDeletePolicy ?? `none`;
    if (this.autoDeleteElapsedMs > 0) {
      setInterval(
        () => this.#maintain(),
        Math.max(1e3, this.autoDeleteElapsedMs * 2)
      );
    }
  }
  /**
   * Returns the number of keys being stored.
   */
  get keyLength() {
    return this.keyCount;
  }
  *entries() {
    for (const entry of this.store.entries()) {
      yield [entry[0], entry[1].value];
    }
  }
  *values() {
    for (const v of this.store.values()) {
      yield v.value;
    }
  }
  *keys() {
    yield* this.store.keys();
  }
  /**
   * Returns the elapsed time since `key`
   * was set. Returns _undefined_ if `key`
   * does not exist
   */
  elapsedSet(key) {
    const v = this.store.get(key);
    if (!v)
      return v;
    return Date.now() - v.lastSet;
  }
  /**
   * Returns the elapsed time since `key`
   * was accessed. Returns _undefined_ if `key`
   * does not exist
   */
  elapsedGet(key) {
    const v = this.store.get(key);
    if (!v)
      return v;
    return Date.now() - v.lastGet;
  }
  /**
   * Returns true if `key` is stored.
   * Does not affect the key's last access time.
   * @param key
   * @returns
   */
  has(key) {
    return this.store.has(key);
  }
  /**
   * Gets an item from the map by key, returning
   * undefined if not present
   * @param key Key
   * @returns Value, or undefined
   */
  get(key) {
    const v = this.store.get(key);
    if (v) {
      return v.value;
    }
  }
  /**
   * Deletes the value under `key`, if present.
   *
   * Returns _true_ if something was removed.
   * @param key
   * @returns
   */
  delete(key) {
    const val = this.store.get(key);
    if (!val)
      return false;
    const d = this.store.delete(key);
    this.keyCount = this.keyCount - 1;
    this.fireEvent(`removed`, {
      key,
      value: val.value
    });
    return d;
  }
  /**
   * Updates the lastSet/lastGet time for a value
   * under `k`.
   *
   * Returns false if key was not found
   * @param key
   * @returns
   */
  touch(key) {
    const v = this.store.get(key);
    if (!v)
      return false;
    this.store.set(key, {
      ...v,
      lastSet: Date.now(),
      lastGet: Date.now()
    });
    return true;
  }
  findEvicteeKey() {
    if (this.evictPolicy === `none`)
      return null;
    let sortBy = ``;
    if (this.evictPolicy === `oldestGet`)
      sortBy = `lastGet`;
    else if (this.evictPolicy === `oldestSet`)
      sortBy = `lastSet`;
    else
      throw Error(`Unknown eviction policy ${this.evictPolicy}`);
    const sorted = sortByValueProperty(this.store, sortBy);
    return sorted[0][0];
  }
  #maintain() {
    if (this.autoDeletePolicy === `none`)
      return;
    this.deleteWithElapsed(this.autoDeleteElapsedMs, this.autoDeletePolicy);
  }
  /**
   * Deletes all values where elapsed time has past
   * for get/set or either.
   *
   * Remove items are returned
   * @param time
   * @param prop get/set/either
   */
  deleteWithElapsed(time, prop) {
    const entries = [...this.store.entries()];
    const prune = [];
    const now = Date.now();
    for (const e of entries) {
      const elapsedGet = now - e[1].lastGet;
      const elapsedSet = now - e[1].lastSet;
      const elapsed = prop === `get` ? elapsedGet : prop === `set` ? elapsedSet : Math.max(elapsedGet, elapsedSet);
      if (elapsed >= time) {
        prune.push([e[0], e[1].value]);
      }
    }
    for (const e of prune) {
      this.store.delete(e[0]);
      this.keyCount = this.keyCount - 1;
      const eventArgs = {
        key: e[0],
        value: e[1]
      };
      this.fireEvent(`expired`, eventArgs);
      this.fireEvent(`removed`, eventArgs);
    }
    return prune;
  }
  /**
   * Sets the `key` to be `value`.
   *
   * If the key already exists, it is updated.
   *
   * If the map is full, according to its capacity,
   * another value is selected for removal.
   * @param key
   * @param value
   * @returns
   */
  set(key, value2) {
    const existing = this.store.get(key);
    if (existing) {
      this.store.set(key, {
        ...existing,
        lastSet: performance.now()
      });
      return;
    }
    if (this.keyCount === this.capacity && this.capacity > 0) {
      const key2 = this.findEvicteeKey();
      if (!key2) {
        throw new Error(`ExpiringMap full (capacity: ${this.capacity})`);
      }
      const existing2 = this.store.get(key2);
      this.store.delete(key2);
      this.keyCount = this.keyCount - 1;
      if (existing2) {
        const eventArgs = { key: key2, value: existing2.value };
        this.fireEvent(`expired`, eventArgs);
        this.fireEvent(`removed`, eventArgs);
      }
    }
    this.keyCount++;
    this.store.set(key, {
      lastGet: 0,
      lastSet: Date.now(),
      value: value2
    });
    this.fireEvent(`newKey`, { key, value: value2 });
  }
};

// src/collections/Map/MapImmutableFns.ts
var addArray = (map, data) => {
  const x = new Map(map.entries());
  for (const d of data) {
    if (d[0] === void 0)
      throw new Error(`key cannot be undefined`);
    if (d[1] === void 0)
      throw new Error(`value cannot be undefined`);
    x.set(d[0], d[1]);
  }
  return x;
};
var addObjects = (map, data) => {
  const x = new Map(map.entries());
  for (const d of data) {
    if (d.key === void 0)
      throw new Error(`key cannot be undefined`);
    if (d.value === void 0)
      throw new Error(`value cannot be undefined`);
    x.set(d.key, d.value);
  }
  return x;
};
var has = (map, key) => map.has(key);
var add2 = (map, ...data) => {
  if (map === void 0)
    throw new Error(`map parameter is undefined`);
  if (data === void 0)
    throw new Error(`data parameter i.s undefined`);
  if (data.length === 0)
    return map;
  const firstRecord = data[0];
  const isObject = typeof firstRecord.key !== `undefined` && typeof firstRecord.value !== `undefined`;
  return isObject ? addObjects(map, data) : addArray(map, data);
};
var set = (map, key, value2) => {
  const x = new Map(map.entries());
  x.set(key, value2);
  return x;
};
var del = (map, key) => {
  const x = new Map(map.entries());
  x.delete(key);
  return x;
};

// src/collections/Map/Map.ts
var immutable2 = (dataOrMap) => {
  if (dataOrMap === void 0)
    return immutable2([]);
  if (Array.isArray(dataOrMap))
    return immutable2(add2(/* @__PURE__ */ new Map(), ...dataOrMap));
  const data = dataOrMap;
  return {
    add: (...itemsToAdd) => {
      const s = add2(data, ...itemsToAdd);
      return immutable2(s);
    },
    set: (key, value2) => {
      const s = set(data, key, value2);
      return immutable2(s);
    },
    get: (key) => data.get(key),
    delete: (key) => immutable2(del(data, key)),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    clear: () => immutable2(),
    has: (key) => data.has(key),
    entries: () => data.entries(),
    values: () => data.values(),
    isEmpty: () => data.size === 0
  };
};

// src/collections/Map/MapMutable.ts
var mutable2 = (...data) => {
  let m = add2(/* @__PURE__ */ new Map(), ...data);
  return {
    add: (...data2) => {
      m = add2(m, ...data2);
    },
    delete: (key) => {
      m = del(m, key);
    },
    clear: () => {
      m = add2(/* @__PURE__ */ new Map());
    },
    set: (key, value2) => {
      m = set(m, key, value2);
    },
    get: (key) => m.get(key),
    entries: () => m.entries(),
    values: () => m.values(),
    isEmpty: () => m.size === 0,
    has: (key) => has(m, key)
  };
};

// src/collections/Map/MapOfMultiImpl.ts
var MapOfMutableImpl = class extends SimpleEventEmitter {
  /* eslint-disable-next-line functional/prefer-readonly-type */
  #map = /* @__PURE__ */ new Map();
  groupBy;
  type;
  constructor(type, opts = {}) {
    super();
    this.type = type;
    this.groupBy = opts.groupBy ?? toStringDefault;
  }
  /**
   * Returns the type name. For in-built implementations, it will be one of: array, set or circular
   */
  get typeName() {
    return this.type.name;
  }
  /**
   * Returns the number of keys
   */
  get lengthKeys() {
    return this.#map.size;
  }
  /**
   * Returns the length of the longest child list
   */
  get lengthMax() {
    let m = 0;
    for (const v of this.#map.values()) {
      m = Math.max(m, this.type.count(v));
    }
    return m;
  }
  debugString() {
    const keys = [...this.#map.keys()];
    let r = `Keys: ${keys.join(`, `)}\r
`;
    for (const k of keys) {
      const v = this.#map.get(k);
      if (v === void 0) {
        r += ` - ${k} (undefined)\r
`;
      } else {
        const asArray2 = this.type.toArray(v);
        if (asArray2 !== void 0) {
          r += ` - ${k} (${this.type.count(v)}) = ${JSON.stringify(
            asArray2
          )}\r
`;
        }
      }
    }
    ;
    return r;
  }
  get isEmpty() {
    return this.#map.size === 0;
  }
  clear() {
    this.#map.clear();
    super.fireEvent(`clear`, true);
  }
  //eslint-disable-next-line functional/prefer-immutable-types
  addKeyedValues(key, ...values) {
    const set2 = this.#map.get(key);
    if (set2 === void 0) {
      this.#map.set(key, this.type.add(void 0, values));
      super.fireEvent(`addedKey`, { key });
      super.fireEvent(`addedValues`, { values });
    } else {
      this.#map.set(key, this.type.add(set2, values));
      super.fireEvent(`addedValues`, { values });
    }
  }
  //eslint-disable-next-line functional/prefer-immutable-types
  set(key, values) {
    this.addKeyedValues(key, ...values);
    return this;
  }
  addValue(...values) {
    for (const v of values)
      this.addKeyedValues(this.groupBy(v), v);
  }
  hasKeyValue(key, value2, eq) {
    const m = this.#map.get(key);
    if (m === void 0)
      return false;
    return this.type.has(m, value2, eq);
  }
  //eslint-disable-next-line functional/prefer-tacit
  has(key) {
    return this.#map.has(key);
  }
  deleteKeyValue(key, value2) {
    const a = this.#map.get(key);
    if (a === void 0)
      return false;
    return this.deleteKeyValueFromMap(a, key, value2);
  }
  deleteKeyValueFromMap(map, key, value2) {
    const preCount = this.type.count(map);
    const filtered = this.type.without(map, value2);
    const postCount = filtered.length;
    this.#map.set(key, this.type.add(void 0, filtered));
    return preCount > postCount;
  }
  deleteByValue(value2) {
    let something = false;
    [...this.#map.keys()].filter((key) => {
      const a = this.#map.get(key);
      if (!a)
        throw new Error(`Bug: map could not be accessed`);
      if (this.deleteKeyValueFromMap(a, key, value2)) {
        something = true;
        if (this.count(key) === 0)
          this.delete(key);
      }
    });
    return something;
  }
  delete(key) {
    const a = this.#map.get(key);
    if (a === void 0)
      return false;
    this.#map.delete(key);
    this.fireEvent(`deleteKey`, { key });
    return true;
  }
  firstKeyByValue(value2, eq = isEqualDefault) {
    const keys = [...this.#map.keys()];
    const found = keys.find((key) => {
      const a = this.#map.get(key);
      if (a === void 0)
        throw new Error(`Bug: map could not be accessed`);
      const r = this.type.has(a, value2, eq);
      return r;
    });
    return found;
  }
  count(key) {
    const entry = this.#map.get(key);
    if (entry === void 0)
      return 0;
    return this.type.count(entry);
  }
  /**
   * Iterates over values stored under `key`
   * An empty array is returned if there are no values
   */
  *get(key) {
    const m = this.#map.get(key);
    if (m === void 0)
      return;
    yield* this.type.iterable(m);
  }
  /**
   * Iterate over the values stored under `key`.
   * If key does not exist, iteration is essentially a no-op
   * @param key
   * @returns
   */
  *valuesFor(key) {
    const m = this.#map.get(key);
    if (m === void 0)
      return;
    yield* this.type.iterable(m);
  }
  //eslint-disable-next-line functional/prefer-tacit
  getSource(key) {
    return this.#map.get(key);
  }
  /* eslint-disable-next-line functional/prefer-readonly-type */
  *keys() {
    yield* this.#map.keys();
  }
  *entriesFlat() {
    for (const entry of this.#map.entries()) {
      for (const v of this.type.iterable(entry[1])) {
        yield [entry[0], v];
      }
    }
  }
  *valuesFlat() {
    for (const entry of this.#map.entries()) {
      yield* this.type.iterable(entry[1]);
    }
  }
  *entries() {
    for (const [k, v] of this.#map.entries()) {
      const temporary = [...this.type.iterable(v)];
      yield [k, temporary];
    }
  }
  /* eslint-disable-next-line functional/prefer-readonly-type */
  *keysAndCounts() {
    for (const key of this.keys()) {
      yield [key, this.count(key)];
    }
  }
  merge(other) {
    for (const key of other.keys()) {
      const data = other.get(key);
      this.addKeyedValues(key, ...data);
    }
  }
  get size() {
    return this.#map.size;
  }
  /*
    forEach_(
      fn: (
        value: ReadonlyArray<V>,
        key: string,
        //eslint-disable-next-line functional/prefer-immutable-types
        map: Map<string, ReadonlyArray<V>>
      ) => void,
      _?: any
    ) {
      // for (const [key,value] of this.#map.entries()) {
      //   value
      // }
      // @ts-expect-error
      this.#map.forEach(fn);
    }
    */
  get [Symbol.toStringTag]() {
    return this.#map[Symbol.toStringTag];
  }
  // [Symbol.iterator]() {
  //   return this.type[Symbol.iterator]();
  // }
};

// src/collections/Map/MapOfSetMutable.ts
var ofSetMutable = (opts) => {
  const hash = opts?.hash ?? toStringDefault;
  const comparer = (a, b) => hash(a) === hash(b);
  const t = {
    get name() {
      return `set`;
    },
    iterable: (source) => source.values(),
    add: (dest, values) => addKeepingExisting(dest, hash, ...values),
    count: (source) => source.size,
    find: (source, predicate) => find(source, predicate),
    filter: (source, predicate) => filter(source, predicate),
    toArray: (source) => toArray(source),
    has: (source, value2) => hasAnyValue(source, value2, comparer),
    without: (source, value2) => without(toArray(source), value2, comparer)
  };
  const m = new MapOfMutableImpl(t, opts);
  return m;
};

// src/collections/Map/MapOfCircularMutable.ts
var ofCircularMutable = (opts) => {
  const comparer = isEqualDefault;
  const t = {
    get name() {
      return `circular`;
    },
    add: (dest, values) => {
      if (dest === void 0)
        dest = circularArray(opts.capacity);
      for (const v of values) {
        dest = dest.add(v);
      }
      return dest;
    },
    count: (source) => source.length,
    find: (source, predicate) => source.find(predicate),
    filter: (source, predicate) => source.filter(predicate),
    toArray: (source) => source,
    iterable: (source) => source.values(),
    has: (source, value2) => source.find((v) => comparer(v, value2)) !== void 0,
    without: (source, value2) => source.filter((v) => !comparer(v, value2))
  };
  return new MapOfMutableImpl(t, opts);
};

// src/collections/Map/NumberMap.ts
var NumberMap = class extends Map {
  defaultValue;
  constructor(defaultValue = 0) {
    super();
    this.defaultValue = defaultValue;
  }
  get(key) {
    const v = super.get(key);
    if (v === void 0)
      return this.defaultValue;
    return v;
  }
  reset(key) {
    super.set(key, this.defaultValue);
    return this.defaultValue;
  }
  multiply(key, amount) {
    const v = super.get(key);
    let value2 = v ?? this.defaultValue;
    value2 *= amount;
    super.set(key, value2);
    return value2;
  }
  add(key, amount = 1) {
    const v = super.get(key);
    let value2 = v ?? this.defaultValue;
    value2 += amount;
    super.set(key, value2);
    return value2;
  }
  subtract(key, amount = 1) {
    const v = super.get(key);
    let value2 = v ?? this.defaultValue;
    value2 -= amount;
    super.set(key, value2);
    return value2;
  }
};

// src/collections/Map/MapOfArrayMutable.ts
var ofArrayMutable = (opts = {}) => {
  const convertToString = opts.convertToString;
  const toStringFunction = typeof convertToString === `undefined` ? isEqualDefault : (a, b) => convertToString(a) === convertToString(b);
  const comparer = opts.comparer ?? toStringFunction;
  const t = {
    get name() {
      return `array`;
    },
    add: (destination, values) => {
      if (destination === void 0)
        return [...values];
      return [...destination, ...values];
    },
    iterable: (source) => source.values(),
    count: (source) => source.length,
    find: (source, predicate) => source.find((f) => predicate(f)),
    filter: (source, predicate) => source.filter((f) => predicate(f)),
    toArray: (source) => source,
    has: (source, value2) => source.some((v) => comparer(v, value2)),
    without: (source, value2) => source.filter((v) => !comparer(v, value2))
    //[Symbol.iterator]: (source) => source[Symbol.iterator]()
  };
  const m = new MapOfMutableImpl(t, opts);
  return m;
};

// src/generators/Iterable.ts
var isAsyncIterable = (v) => Symbol.asyncIterator in new Object(v);

// src/generators/chain/Util.ts
function* primitiveToGenerator(value2) {
  yield value2;
}
async function* primitiveToAsyncGenerator(value2) {
  yield value2;
  await sleep(1);
}
function resolveToGen(input) {
  if (Array.isArray(input)) {
    const a = input.values();
    a._name = `arrayInput`;
    return a;
  } else if (typeof input === `number` || typeof input === `boolean` || typeof input === `string`) {
    return primitiveToGenerator(input);
  } else if (typeof input === `function`) {
    return input();
  }
  return input;
}
function resolveToAsyncGen(input) {
  if (input === void 0)
    return;
  if (Array.isArray(input)) {
    return IterableAsync_exports.fromArray(input);
  } else if (typeof input === `number` || typeof input === `boolean` || typeof input === `string`) {
    return primitiveToAsyncGenerator(input);
  } else if (typeof input === `function`) {
    return input();
  } else if (isAsyncIterable(input)) {
    return input;
  }
  return IterableAsync_exports.fromIterable(input);
}

// src/generators/chain/Links.ts
var Links_exports = {};
__export(Links_exports, {
  average: () => average,
  chunk: () => chunk,
  debounce: () => debounce,
  delay: () => delay,
  drop: () => drop,
  duration: () => duration,
  filter: () => filter2,
  flatten: () => flatten,
  max: () => max,
  min: () => min,
  rank: () => rank,
  rankArray: () => rankArray,
  take: () => take,
  tally: () => tally,
  total: () => total,
  transform: () => transform
});
function transform(transformer) {
  async function* transform2(input) {
    input = resolveToGen(input);
    for await (const value2 of input) {
      yield transformer(value2);
    }
  }
  transform2._name = `transform`;
  return transform2;
}
function take(limit) {
  async function* take2(input) {
    input = resolveToGen(input);
    let yielded = 0;
    for await (const value2 of input) {
      if (++yielded > limit)
        break;
      yield value2;
    }
  }
  take2._name = `take`;
  return take2;
}
function flatten(flattener) {
  async function* flatten2(input) {
    input = resolveToGen(input);
    for await (const value2 of input) {
      yield flattener(value2);
    }
  }
  flatten2._name = `flatten`;
  return flatten2;
}
function duration(elapsed) {
  const durationMs = intervalToMs(elapsed, 0);
  async function* duration2(input) {
    input = resolveToGen(input);
    const elapsed2 = Elapsed_exports.since();
    for await (const value2 of input) {
      if (elapsed2() > durationMs)
        break;
      yield value2;
    }
  }
  duration2._name = `duration`;
  return duration2;
}
function delay(options) {
  const before = intervalToMs(options.before, 0);
  const after = intervalToMs(options.after, 0);
  async function* delay2(input) {
    input = resolveToGen(input);
    for await (const value2 of input) {
      if (before > 0) {
        await sleep(before);
      }
      yield value2;
      if (after > 0) {
        await sleep(after);
      }
    }
  }
  delay2._name = `delay`;
  return delay2;
}
function debounce(rate) {
  const rateMs = intervalToMs(rate, 0);
  async function* debounce2(input) {
    input = resolveToGen(input);
    let elapsed = Elapsed_exports.since();
    for await (const value2 of input) {
      if (elapsed() < rateMs)
        continue;
      yield value2;
      elapsed = Elapsed_exports.since();
    }
  }
  debounce2._name = `debounce`;
  return debounce2;
}
function tally() {
  async function* tally2(input) {
    input = resolveToGen(input);
    let count2 = 0;
    for await (const _ of input) {
      yield ++count2;
    }
  }
  tally2._name = `tally`;
  return tally2;
}
function min() {
  async function* min2(input) {
    input = resolveToGen(input);
    let min3 = Number.MAX_SAFE_INTEGER;
    for await (const value2 of input) {
      const arrayValue = Array.isArray(value2) ? value2 : [value2];
      for (const subValue of arrayValue) {
        if (typeof subValue !== `number`)
          break;
        min3 = Math.min(subValue, min3);
        yield min3;
      }
    }
  }
  min2._name = `min`;
  return min2;
}
function max() {
  async function* max2(input) {
    input = resolveToGen(input);
    let max3 = Number.MIN_SAFE_INTEGER;
    for await (const value2 of input) {
      const valueArray = Array.isArray(value2) ? value2 : [value2];
      for (const subValue of valueArray) {
        if (typeof subValue !== `number`)
          break;
        max3 = Math.max(subValue, max3);
        yield max3;
      }
    }
  }
  max2._name = `max`;
  return max2;
}
function rank(r, options = {}) {
  const includeType = options.includeType;
  const emitEqualRanked = options.emitEqualRanked ?? false;
  const emitRepeatHighest = options.emitRepeatHighest ?? false;
  async function* rank2(input) {
    input = resolveToGen(input);
    let best;
    for await (const value2 of input) {
      let emit = false;
      if (includeType && typeof value2 !== includeType)
        continue;
      if (best === void 0) {
        best = value2;
        emit = true;
      } else {
        const result = r(value2, best);
        if (result == `a`) {
          best = value2;
          emit = true;
        } else if (result === `eq` && emitEqualRanked) {
          emit = true;
        } else if (emitRepeatHighest) {
          emit = true;
        }
      }
      if (emit)
        yield best;
    }
  }
  rank2._name = `rank`;
  return rank2;
}
function rankArray(r, options = {}) {
  const includeType = options.includeType;
  const emitEqualRanked = options.emitEqualRanked ?? false;
  const emitRepeatHighest = options.emitRepeatHighest ?? false;
  const withinArrays = options.withinArrays ?? false;
  async function* rankArray2(input) {
    input = resolveToGen(input);
    let best;
    for await (const value2 of input) {
      let emit = false;
      if (withinArrays)
        best = void 0;
      for (const subValue of value2) {
        if (includeType && typeof subValue !== includeType)
          continue;
        if (best === void 0) {
          best = subValue;
          emit = true;
        } else {
          const result = r(subValue, best);
          if (result == `a`) {
            best = subValue;
            emit = true;
          } else if (result === `eq` && emitEqualRanked) {
            emit = true;
          } else if (emitRepeatHighest) {
            emit = true;
          }
        }
      }
      if (emit && best)
        yield best;
    }
  }
  rankArray2._name = `rankArray`;
  return rankArray2;
}
function average() {
  async function* average2(input) {
    input = resolveToGen(input);
    let total2 = 0;
    let count2 = 0;
    for await (const value2 of input) {
      if (typeof value2 !== `number`)
        break;
      count2++;
      total2 += value2;
      yield total2 / count2;
    }
  }
  average2._name = `average`;
  return average2;
}
function total() {
  async function* average2(input) {
    input = resolveToGen(input);
    let total2 = 0;
    for await (const value2 of input) {
      if (typeof value2 !== `number`)
        break;
      total2 += value2;
      yield total2;
    }
  }
  average2._name = `average`;
  return average2;
}
function chunk(size, returnRemainders = true) {
  throwIntegerTest(size, `aboveZero`, `size`);
  async function* chunk2(input) {
    input = resolveToGen(input);
    let buffer = [];
    for await (const value2 of input) {
      buffer.push(value2);
      if (buffer.length >= size) {
        yield buffer;
        buffer = [];
      }
    }
    if (returnRemainders && buffer.length > 0)
      yield buffer;
  }
  chunk2._name = `chunk`;
  return chunk2;
}
function filter2(predicate) {
  async function* filter3(input) {
    input = resolveToGen(input);
    for await (const value2 of input) {
      if (predicate(value2)) {
        yield value2;
      }
    }
  }
  filter3._name = `filter`;
  return filter3;
}
function drop(predicate) {
  async function* drop2(input) {
    input = resolveToGen(input);
    for await (const value2 of input) {
      if (!predicate(value2)) {
        yield value2;
      }
    }
  }
  drop2._name = `drop`;
  return drop2;
}

// src/generators/chain/Dom.ts
var Dom_exports = {};
__export(Dom_exports, {
  perValue: () => perValue,
  query: () => query
});
var createMap = (key) => {
  const keyFunction = key ?? ((value2) => value2);
  const map = /* @__PURE__ */ new Map();
  return {
    has(key2) {
      return map.has(keyFunction(key2));
    },
    get(key2) {
      return map.get(keyFunction(key2));
    },
    set(key2, value2) {
      map.set(keyFunction(key2), value2);
    },
    entries() {
      return map.entries();
    },
    delete(key2) {
      map.delete(key2);
    }
  };
};
function perValue(options = {}) {
  const byReference = options.byReference;
  const tagName = options.tagName ?? `div`;
  if (byReference && options.key)
    throw new Error(`byReference and key options are mutually exclusive`);
  const keyFunction = byReference ? void 0 : options.key ?? toStringDefault;
  const map = createMap(keyFunction);
  const parentElementOrQuery = options.parentEl ?? document.body;
  const parentEl = resolveEl(parentElementOrQuery);
  const usedElements = /* @__PURE__ */ new Set();
  async function* perValue2(input) {
    for await (const value2 of resolveToGen(input)) {
      let el = map.get(value2);
      if (!el) {
        el = document.createElement(tagName);
        map.set(value2, el);
        if (options.beforeInsert)
          options.beforeInsert(el);
        parentEl.append(el);
        if (options.afterInsert)
          options.afterInsert(el);
      }
      usedElements.add(el);
      yield { el, value: value2 };
    }
    for (const [id, el] of map.entries()) {
      if (usedElements.has(el))
        continue;
      if (options.beforeRemove)
        options.beforeRemove(el);
      el.remove();
      map.delete(id);
    }
  }
  perValue2._name = `dom.perValue`;
  return perValue2;
}
function query(options = {}) {
  const baseElement = options.baseElement ?? document;
  async function* query2(input) {
    const gen = resolveToGen(input);
    for await (const value2 of gen) {
      for (const element of baseElement.querySelectorAll(value2)) {
        yield element;
      }
    }
  }
  query2._name = `dom.query`;
  return query2;
}

// src/generators/chain/index.ts
function isNoInput(c) {
  if (`_allowNoInput` in c)
    return true;
  return false;
}
function lazy() {
  const chained = [];
  let dataToUse;
  const asGenerator = (data) => {
    if (data === void 0)
      data = dataToUse;
    let d = resolveToAsyncGen(data);
    for (const c of chained) {
      if (d === void 0) {
        if (isNoInput(c)) {
          d = c();
        } else {
          throw new Error(`Function '${getLinkName(c)}' requires input. Provide it to the function, or call 'input' earlier.`);
        }
      } else {
        d = c(d);
      }
    }
    return d;
  };
  const w = {
    rankArray: (r, options) => {
      chained.push(rankArray(r, options));
      return w;
    },
    rank: (r, options) => {
      chained.push(rank(r, options));
      return w;
    },
    transform: (transformer) => {
      chained.push(transform(transformer));
      return w;
    },
    flatten: (flattener) => {
      chained.push(flatten(flattener));
      return w;
    },
    drop: (predicate) => {
      chained.push(drop(predicate));
      return w;
    },
    delay: (options) => {
      chained.push(delay(options));
      return w;
    },
    duration: (elapsed) => {
      chained.push(duration(elapsed));
      return w;
    },
    debounce: (rate) => {
      chained.push(debounce(rate));
      return w;
    },
    fromFunction: (callback) => {
      chained.push(fromFunction(callback));
      return w;
    },
    take: (limit) => {
      chained.push(take(limit));
      return w;
    },
    chunk: (size, returnRemainders = true) => {
      chained.push(chunk(size, returnRemainders));
      return w;
    },
    filter: (predicate) => {
      chained.push(filter2((v) => predicate(v)));
      return w;
    },
    min: () => {
      chained.push(min());
      return w;
    },
    max: () => {
      chained.push(max());
      return w;
    },
    average: () => {
      chained.push(average());
      return w;
    },
    total: () => {
      chained.push(total());
      return w;
    },
    tally: () => {
      chained.push(tally());
      return w;
    },
    input(data) {
      dataToUse = data;
      return w;
    },
    asGenerator,
    asAsync(data) {
      let d = data ?? dataToUse;
      for (const c of chained) {
        if (d === void 0 && isNoInput(c)) {
          d = c();
        } else if (d === void 0) {
          throw new Error(`Function '${getLinkName(c)}' needs input. Pass in data calling 'asAsync', or call 'input' earlier`);
        } else {
          d = c(d);
        }
      }
      return w;
    },
    asArray: async (data) => {
      const g = asGenerator(data);
      return await IterableAsync_exports.toArray(g);
    },
    firstOutput: async (data) => {
      const g = asGenerator(data);
      const v = await g.next();
      return v.value;
    },
    lastOutput: async (data) => {
      const g = asGenerator(data);
      let lastValue;
      for await (const v of g) {
        lastValue = v;
      }
      return lastValue;
    }
  };
  return w;
}
function tick(options) {
  const intervalMs = intervalToMs(options.interval, 0);
  const asClockTime = options.asClockTime ?? false;
  const loops = options.loops ?? Number.MAX_SAFE_INTEGER;
  let looped = 0;
  const durationTime = intervalToMs(options.elapsed, Number.MAX_SAFE_INTEGER);
  async function* ts() {
    const elapsed = Elapsed_exports.since();
    while (looped < loops && elapsed() < durationTime) {
      yield asClockTime ? Date.now() : elapsed();
      const expectedTimeDiff = looped * intervalMs - elapsed();
      await sleep(Math.max(0, intervalMs + expectedTimeDiff));
      looped++;
    }
  }
  ts._name = `timestamp`;
  return ts;
}
function fromFunction(callback) {
  async function* fromFunction2() {
    while (true) {
      const v = await callback();
      if (v === void 0)
        break;
      yield v;
    }
  }
  fromFunction2._name = `fromFunction`;
  return fromFunction2;
}
var oncePromise = (target, name) => {
  return new Promise((resolve) => {
    const handler = (...args) => {
      target.removeEventListener(name, handler);
      resolve(args);
    };
    target.addEventListener(name, handler);
  });
};
function fromEvent(target, name) {
  async function* fromEvent2() {
    while (true) {
      yield await oncePromise(target, name);
    }
  }
  fromEvent2._name = `fromEvent`;
  return fromEvent2;
}
function asPromise(valueToWrap) {
  let lastValue;
  const outputType = typeof valueToWrap === `function` ? valueToWrap() : valueToWrap;
  async function asPromise2() {
    const v = await outputType.next();
    if (v.done)
      return;
    lastValue = v.value;
    return lastValue;
  }
  return asPromise2;
}
function asValue(valueToWrap, initialValue) {
  let lastValue = initialValue;
  let awaiting = false;
  const outputType = typeof valueToWrap === `function` ? valueToWrap() : valueToWrap;
  function asValue2() {
    if (!awaiting) {
      awaiting = true;
      outputType.next().then((v) => {
        lastValue = v.value;
        awaiting = false;
      }).catch((error) => {
        awaiting = false;
        throw error;
      });
    }
    return lastValue;
  }
  return asValue2;
}
async function asCallback(valueToWrap, callback, onDone) {
  const outputType = typeof valueToWrap === `function` ? valueToWrap() : valueToWrap;
  for await (const value2 of outputType) {
    callback(value2);
  }
  if (onDone)
    onDone();
}
async function asArray(valueToWrap) {
  const outputType = typeof valueToWrap === `function` ? valueToWrap() : valueToWrap;
  return IterableAsync_exports.toArray(outputType);
}
async function addToArray(array, valueToWrap) {
  const outputType = typeof valueToWrap === `function` ? valueToWrap() : valueToWrap;
  for await (const value2 of outputType) {
    array.push(value2);
  }
}
async function single(f, input) {
  const iterator = await f([input]).next();
  return iterator.value;
}
async function* mergeFlat(...sources) {
  const sourcesInput = sources.map((source) => resolveToAsyncGen(source));
  const buffer = queue_exports.mutable();
  let completed = 0;
  const schedule = async (source) => {
    if (source === void 0) {
      completed++;
      return;
    }
    const x = await source.next();
    if (x.done) {
      completed++;
    } else {
      buffer.enqueue(x.value);
      setTimeout(() => schedule(source), 1);
    }
  };
  for (const source of sourcesInput) {
    setTimeout(() => schedule(source), 1);
  }
  const loopSpeed = 10;
  let loopFactor = 1;
  while (completed < sourcesInput.length) {
    const d = buffer.dequeue();
    if (d === void 0) {
      loopFactor = Math.min(loopFactor + 1, 10);
    } else {
      yield d;
      loopFactor = 1;
    }
    await sleep(loopSpeed * loopFactor);
  }
}
async function* mergeAsArray(...sources) {
  const sourcesInput = sources.map((source) => resolveToGen(source));
  let somethingProduced = true;
  while (somethingProduced) {
    let data = [];
    for (let index = 0; index < sourcesInput.length; index++) {
      data[index] = null;
    }
    somethingProduced = false;
    for (const [index, source] of sourcesInput.entries()) {
      const v = await source.next();
      if (!v.done) {
        data[index] = v.value;
        somethingProduced = true;
      }
    }
    if (somethingProduced) {
      yield data;
      data = [];
    }
  }
}
async function* synchronise(...sources) {
  const sourcesInput = sources.map((source) => resolveToGen(source));
  let somethingStopped = false;
  while (!somethingStopped) {
    let data = [];
    for (let index = 0; index < sourcesInput.length; index++) {
      data[index] = null;
    }
    somethingStopped = false;
    for (const [index, source] of sourcesInput.entries()) {
      const v = await source.next();
      if (v.done) {
        somethingStopped = true;
        break;
      } else {
        data[index] = v.value;
      }
    }
    if (somethingStopped)
      break;
    yield data;
    data = [];
  }
}
var getLinkName = (c) => {
  if (`_name` in c) {
    return c._name;
  } else {
    return c.name;
  }
};
async function* runN(...functions) {
  let input;
  for (const fnOrData of functions) {
    if (typeof fnOrData === `function`) {
      input = fnOrData(input ?? []);
    } else {
      input = resolveToGen(fnOrData);
    }
  }
  if (input === void 0)
    return;
  for await (const v of input) {
    yield v;
  }
}
async function* run(gen, l0, l1, l2, l3, l4, l5) {
  let input;
  const functions = arguments;
  for (const fnOrData of functions) {
    if (typeof fnOrData === `function`) {
      input = fnOrData(input ?? []);
    } else {
      input = resolveToGen(fnOrData);
    }
  }
  if (input === void 0)
    return;
  for await (const v of input) {
    yield v;
  }
}

// src/generators/index.ts
var numericRangeRaw = function* (interval2, start = 0, end, repeating = false) {
  if (interval2 <= 0)
    throw new Error(`Interval is expected to be above zero`);
  if (end === void 0)
    end = Number.MAX_SAFE_INTEGER;
  let v = start;
  do {
    while (v < end) {
      yield v;
      v += interval2;
    }
  } while (repeating);
};
function* stringSegmentsFromEnd(source, delimiter = `.`) {
  while (source.length > 0) {
    yield source;
    const trimmed = afterMatch(source, delimiter);
    if (trimmed === source) {
      break;
    }
    source = trimmed;
  }
}
function* stringSegmentsFromStart(source, delimiter = `.`) {
  let accumulator = ``;
  const orig = source;
  while (source.length > 0) {
    const ba = beforeAfterMatch(source, delimiter, { fromEnd: true, ifNoMatch: `original` });
    if (ba[0] === ba[1] && ba[1] === source) {
      break;
    }
    const v = ba[1] + accumulator;
    yield v;
    accumulator = delimiter + v;
    source = ba[0];
  }
  yield orig;
}
var numericRange = function* (interval2, start = 0, end, repeating = false, rounding) {
  throwNumberTest(interval2, `nonZero`);
  const negativeInterval = interval2 < 0;
  if (end === void 0) {
  } else {
    if (negativeInterval && start < end) {
      throw new Error(
        `Interval of ${interval2} will never go from ${start} to ${end}`
      );
    }
    if (!negativeInterval && start > end) {
      throw new Error(
        `Interval of ${interval2} will never go from ${start} to ${end}`
      );
    }
  }
  rounding = rounding ?? 1e3;
  if (end === void 0)
    end = Number.MAX_SAFE_INTEGER;
  else
    end *= rounding;
  interval2 = interval2 * rounding;
  do {
    let v = start * rounding;
    while (!negativeInterval && v <= end || negativeInterval && v >= end) {
      yield v / rounding;
      v += interval2;
    }
  } while (repeating);
};
var count = function* (amount, offset = 0) {
  throwIntegerTest(amount, ``, `amount`);
  throwIntegerTest(offset, ``, `offset`);
  if (amount === 0)
    return;
  let index = 0;
  do {
    yield amount < 0 ? -index + offset : index + offset;
  } while (index++ < Math.abs(amount) - 1);
};
var numericPercent = function(interval2 = 0.01, repeating = false, start = 0, end = 1) {
  throwNumberTest(interval2, `percentage`, `interval`);
  throwNumberTest(start, `percentage`, `start`);
  throwNumberTest(end, `percentage`, `end`);
  return numericRange(interval2, start, end, repeating);
};

export {
  circularArray,
  pingPongPercent,
  pingPong,
  chain_exports,
  numericRangeRaw,
  stringSegmentsFromEnd,
  stringSegmentsFromStart,
  numericRange,
  count,
  numericPercent,
  generators_exports,
  abbreviate,
  toStringAbbreviate,
  between,
  betweenChomp,
  indexOfCharCode,
  omitChars,
  splitByLength,
  beforeMatch,
  afterMatch,
  beforeAfterMatch,
  unwrap,
  lineSpan,
  splitRanges,
  countCharsFromStart,
  startsEnds,
  htmlEntities,
  Text_exports,
  StackMutable,
  compare,
  TreeMutable_exports,
  depthFirst2 as depthFirst,
  TraverseObject_exports,
  Pathed_exports,
  TraversableTree_exports,
  toTraversable,
  isTreeNode,
  isTraversable,
  tree_exports,
  StackImmutable,
  stack_exports,
  create3 as create,
  ExpiringMap,
  immutable2 as immutable,
  mutable2 as mutable,
  MapOfMutableImpl,
  ofSetMutable,
  ofCircularMutable,
  NumberMap,
  ofArrayMutable,
  Map_exports,
  collections_exports
};
//# sourceMappingURL=chunk-BOSU35ZW.js.map