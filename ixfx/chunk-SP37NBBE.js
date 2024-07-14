import {
  QueueMutable
} from "./chunk-5PZ2TXZH.js";
import {
  intervalToMs
} from "./chunk-37WZU5ZM.js";
import {
  containsDuplicateInstances
} from "./chunk-MZFSDYZE.js";
import {
  slice
} from "./chunk-TZZOFPLH.js";
import {
  without
} from "./chunk-2XNNMGQC.js";
import {
  toStringAbbreviate
} from "./chunk-KQLC3QPI.js";
import {
  throwNullUndef
} from "./chunk-QZ7DQTW7.js";
import {
  isEqualDefault,
  isEqualValueIgnoreOrder,
  toStringDefault
} from "./chunk-SGQC7FGM.js";
import {
  __export
} from "./chunk-AFNFQUHK.js";

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

// src/iterables/IterableSync.ts
var IterableSync_exports = {};
__export(IterableSync_exports, {
  chunks: () => chunks,
  chunksOverlapping: () => chunksOverlapping,
  concat: () => concat,
  dropWhile: () => dropWhile,
  equals: () => equals,
  every: () => every,
  fill: () => fill,
  filter: () => filter,
  find: () => find,
  first: () => first,
  flatten: () => flatten,
  forEach: () => forEach,
  fromArray: () => fromArray,
  fromIterable: () => fromIterable,
  last: () => last,
  map: () => map,
  max: () => max,
  min: () => min,
  next: () => next,
  reduce: () => reduce,
  repeat: () => repeat,
  slice: () => slice,
  some: () => some,
  toArray: () => toArray,
  unique: () => unique,
  uniqueByValue: () => uniqueByValue,
  until: () => until,
  yieldNumber: () => yieldNumber,
  zip: () => zip
});

// src/iterables/Iterable.ts
var isAsyncIterable = (v) => Symbol.asyncIterator in new Object(v);
var isIterable = (v) => Symbol.iterator in new Object(v);
var fromEvent = (eventSource, eventType) => {
  const pullQueue = [];
  const pushQueue = [];
  let done = false;
  const pushValue = (args) => {
    if (pullQueue.length > 0) {
      const resolver = pullQueue.shift();
      resolver(...args);
    } else {
      pushQueue.push(args);
    }
  };
  const pullValue = () => new Promise((resolve) => {
    if (pushQueue.length > 0) {
      const arguments_ = pushQueue.shift();
      resolve(...arguments_);
    } else {
      pullQueue.push(resolve);
    }
  });
  const handler = (...arguments_) => {
    pushValue(arguments_);
  };
  eventSource.addEventListener(eventType, handler);
  const r = {
    next: async () => {
      if (done) return { done: true, value: void 0 };
      return {
        done: false,
        value: await pullValue()
      };
    },
    //eslint-disable-next-line @typescript-eslint/require-await
    return: async () => {
      done = true;
      eventSource.removeEventListener(eventType, handler);
      return { done: true, value: void 0 };
    },
    //eslint-disable-next-line @typescript-eslint/require-await
    throw: async (error) => {
      done = true;
      return {
        done: true,
        value: Promise.reject(new Error(error))
      };
    }
  };
  return r;
};

// src/iterables/sync/Reduce.ts
function reduce(it, f, start) {
  for (const v of it) start = f(start, v);
  return start;
}

// src/iterables/IterableSync.ts
function* uniqueByValue(input, toString3 = toStringDefault, seen = /* @__PURE__ */ new Set()) {
  for (const v of input) {
    const key = toString3(v);
    if (seen.has(key)) continue;
    seen.add(key);
    yield v;
  }
}
function yieldNumber(generator, defaultValue) {
  return () => {
    const v = generator.next().value;
    if (v === void 0) return defaultValue;
    return v;
  };
}
function first(it) {
  for (const value2 of it) {
    return value2;
  }
}
function last(it) {
  let returnValue;
  for (const value2 of it) {
    returnValue = value2;
  }
  return returnValue;
}
function* chunksOverlapping(it, size) {
  if (size <= 1) throw new Error(`Size should be at least 2`);
  let buffer = [];
  for (const v of it) {
    buffer.push(v);
    if (buffer.length === size) {
      yield buffer;
      buffer = [buffer.at(-1)];
    }
  }
  if (buffer.length <= 1) return;
  if (buffer.length > 0) yield buffer;
}
function* chunks(it, size) {
  let buffer = [];
  for (const v of it) {
    buffer.push(v);
    if (buffer.length === size) {
      yield buffer;
      buffer = [];
    }
  }
  if (buffer.length > 0) yield buffer;
}
function* concat(...its) {
  for (const it of its) yield* it;
}
function* dropWhile(it, f) {
  for (const v of it) {
    if (!f(v)) {
      yield v;
    }
  }
}
var until = (it, callback) => {
  for (const _ of it) {
    const value2 = callback();
    if (typeof value2 === `boolean` && !value2) break;
  }
};
var next = (it) => {
  return () => {
    const r = it.next();
    if (r.done) return;
    return r.value;
  };
};
function equals(it1, it2, equality) {
  while (true) {
    const index1 = it1.next(), index2 = it2.next();
    if (equality !== void 0) {
      if (!equality(index1.value, index2.value)) return false;
    } else if (index1.value !== index2.value) return false;
    if (index1.done ?? index2.done) return index1.done && index2.done;
  }
}
function every(it, f) {
  for (const v of it) {
    const result = f(v);
    if (!result) return false;
  }
  return true;
}
function* fill(it, v) {
  for (const _ of it) yield v;
}
function forEach(it, f) {
  for (const v of it) {
    const result = f(v);
    if (typeof result === `boolean` && !result) break;
  }
}
function* filter(it, f) {
  for (const v of it) {
    if (!f(v)) continue;
    yield v;
  }
}
function find(it, f) {
  for (const v of it) {
    if (f(v)) return v;
  }
}
function* flatten(it) {
  for (const v of it) {
    if (typeof v === `object`) {
      if (Array.isArray(v)) {
        for (const vv of v) yield vv;
      } else if (isIterable(v)) {
        for (const vv of v) {
          yield vv;
        }
      }
    } else {
      yield v;
    }
  }
}
function* map(it, f) {
  for (const v of it) {
    yield f(v);
  }
}
function* max(it, gt = (a, b) => a > b) {
  let max2;
  for (const v of it) {
    if (max2 === void 0) {
      max2 = v;
      yield max2;
      continue;
    }
    if (gt(v, max2)) {
      max2 = v;
      yield max2;
    }
  }
  return max2;
}
function* min(it, gt = (a, b) => a > b) {
  let min2;
  for (const v of it) {
    if (min2 === void 0) {
      min2 = v;
      yield min2;
    }
    if (gt(min2, v)) {
      min2 = v;
      yield min2;
    }
  }
}
function some(it, f) {
  for (const v of it) {
    if (f(v)) return true;
  }
  return false;
}
function* repeat(genCreator, repeatsOrSignal) {
  const repeats = typeof repeatsOrSignal === `number` ? repeatsOrSignal : Number.POSITIVE_INFINITY;
  const signal = typeof repeatsOrSignal === `number` ? void 0 : repeatsOrSignal;
  let count = repeats;
  while (true) {
    for (const v of genCreator()) {
      yield v;
      if (signal?.aborted) break;
    }
    if (Number.isFinite(repeats)) {
      count--;
      if (count === 0) break;
    }
    if (signal?.aborted) break;
  }
}
function* unique(iterable) {
  const buffer = [];
  let itera = [];
  itera = Array.isArray(iterable) ? iterable : [iterable];
  for (const it of itera) {
    for (const v of it) {
      if (buffer.includes(v)) continue;
      buffer.push(v);
      yield v;
    }
  }
}
function* zip(...its) {
  const iits = its.map((it) => it[Symbol.iterator]());
  while (true) {
    const vs = iits.map((it) => it.next());
    if (vs.some((v) => v.done)) return;
    yield vs.map((v) => v.value);
  }
}
function* fromIterable(iterable) {
  for (const v of iterable) {
    yield v;
  }
}
function toArray(it, options = {}) {
  const result = [];
  const started = Date.now();
  const maxItems = options.limit ?? Number.POSITIVE_INFINITY;
  const maxElapsed = intervalToMs(options.elapsed, Number.POSITIVE_INFINITY);
  for (const v of it) {
    if (result.length >= maxItems) break;
    if (Date.now() - started > maxElapsed) break;
    result.push(v);
  }
  return result;
}
function* fromArray(array) {
  for (const v of array) {
    yield v;
  }
}

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
  if (stack.length === 0) throw new Error(`Stack is empty`);
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
    if (toAdd.length === 0) return this.data.length;
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
  if (vv === void 0) return false;
  if (vv.valueChanged) return true;
  if (vv.childChanged) return true;
  if (vv.added.length > 0) return true;
  if (vv.removed.length > 0) return true;
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
  if (a.getIdentity() === b.getIdentity()) return true;
  if (eq(a.getValue(), b.getValue())) return true;
  return false;
};
var toStringSingle = (n) => {
  return JSON.stringify(n.getValue());
};
var toString = (n, indent = 0) => {
  if (n === void 0) return `(undefined)`;
  let t = toStringDiff(n.value, indent);
  for (const c of n.childrenStore) {
    t += toString(c, indent + 2);
  }
  return t;
};
var toStringDiff = (n, indent) => {
  const spaces = ` `.repeat(indent);
  if (n === void 0) return `${spaces}(undefined)`;
  const t = [];
  t.push(`a: ${toStringSingle(n.a)} b: ${toStringSingle(n.b)}`);
  if (n.valueChanged) t.push(`Value changed. Child changed: ${n.childChanged}`);
  else t.push(`Value unchanged. Child changed: ${n.childChanged}`);
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
  if (p === void 0) return;
  child.parent = void 0;
  p.childrenStore = without(p.childrenStore, child);
};
function* depthFirst(node) {
  if (!root) return;
  const stack = new StackMutable();
  stack.push(...node.childrenStore);
  let entry = stack.pop();
  while (entry) {
    yield entry;
    if (entry) {
      stack.push(...entry.childrenStore);
    }
    if (stack.isEmpty) break;
    entry = stack.pop();
  }
}
function* breadthFirst(node) {
  if (!node) return;
  const queue = new QueueMutable();
  queue.enqueue(...node.childrenStore);
  let entry = queue.dequeue();
  while (entry) {
    yield entry;
    if (entry) {
      queue.enqueue(...entry.childrenStore);
    }
    if (queue.isEmpty) break;
    entry = queue.dequeue();
  }
}
function treeTest(root2, seen = []) {
  if (root2.parent === root2) return [false, `Root has itself as parent`, root2];
  if (seen.includes(root2)) return [false, `Same node instance is appearing further in tree`, root2];
  seen.push(root2);
  if (containsDuplicateInstances(root2.childrenStore)) return [false, `Children list contains duplicates`, root2];
  for (const c of root2.childrenStore) {
    if (c.parent !== root2) return [false, `Member of childrenStore does not have .parent set`, c];
    if (hasAnyChild(root2, c)) return [false, `Child has parent as its own child`, c];
    const v = treeTest(c, seen);
    if (!v[0]) return v;
  }
  return [true, ``, root2];
}
function throwTreeTest(root2) {
  const v = treeTest(root2);
  if (v[0]) return;
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
    if (c === child) return true;
  }
  return false;
};
var findChildByValue = (value2, parent, eq = isEqualDefault) => {
  for (const c of parent.childrenStore) {
    if (eq(value2, c.value)) return c;
  }
};
function* queryByValue(value2, parent, eq = isEqualDefault) {
  for (const c of parent.childrenStore) {
    if (eq(value2, c.value)) yield c;
  }
}
var hasAnyChild = (prospectiveChild, parent) => {
  for (const c of breadthFirst(parent)) {
    if (c === prospectiveChild) return true;
  }
  return false;
};
var findAnyChildByValue = (value2, parent, eq = isEqualDefault) => {
  for (const c of breadthFirst(parent)) {
    if (eq(c.value, value2)) return c;
  }
};
var getRoot = (node) => {
  if (node.parent) return getRoot(node.parent);
  return node;
};
var hasAnyParent = (child, prospectiveParent) => {
  for (const p of parents(child)) {
    if (p === prospectiveParent) return true;
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
    if (seen.includes(value3)) continue;
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
      if (node.parent === void 0) return;
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
  if (parent === c) throw new Error(`Cannot add self as child`);
  if (c.parent === parent) return;
  if (hasAnyParent(parent, c)) throw new Error(`Child contains parent (1)`, { cause: c });
  if (hasAnyParent(c, parent)) throw new Error(`Parent already contains child`, { cause: c });
  if (hasAnyChild(parent, c)) throw new Error(`Child contains parent (2)`, { cause: c });
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
    if (value2 === void 0) continue;
    if (continuePredicate(value2, depth)) {
      yield c.value;
      yield* followValue(c, continuePredicate, depth + 1);
    }
  }
}

// src/IsPrimitive.ts
function isPrimitive(value2) {
  if (typeof value2 === `number`) return true;
  if (typeof value2 === `string`) return true;
  if (typeof value2 === `bigint`) return true;
  if (typeof value2 === `boolean`) return true;
  return false;
}

// src/collections/tree/TraverseObject.ts
function prettyPrintEntries(entries) {
  if (entries.length === 0) return `(empty)`;
  let t = ``;
  for (const [index, entry] of entries.entries()) {
    t += `  `.repeat(index);
    t += entry.name + ` = ` + JSON.stringify(entry.nodeValue) + `
`;
  }
  return t;
}
var prettyPrint = (node, indent = 0, options = {}) => {
  throwNullUndef(node, `node`);
  const defaultName = options.name ?? `node`;
  const entry = getNamedEntry(node, defaultName);
  const t = `${`  `.repeat(indent)} + name: ${entry.name} value: ${JSON.stringify(entry.nodeValue)}`;
  const childrenAsArray = [...children2(node, options)];
  return childrenAsArray.length > 0 ? t + `
` + childrenAsArray.map((d) => prettyPrint(d.nodeValue, indent + 1, { ...options, name: d.name })).join(`
`) : t;
};
var toStringDeep2 = (node, indent = 0) => {
  let t = ` `.repeat(indent) + ` ${node.value?.name}`;
  if (node.value !== void 0) {
    if (`sourceValue` in node.value && `nodeValue` in node.value) {
      let sourceValue = toStringAbbreviate(node.value?.sourceValue, 20);
      const nodeValue = toStringAbbreviate(node.value?.nodeValue, 20);
      sourceValue = sourceValue === nodeValue ? `` : `source: ` + sourceValue;
      t += ` = ${nodeValue} ${sourceValue}`;
    } else if (`value` in node.value && node.value.value !== void 0) t += ` = ${node.value.value}`;
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
  throwNullUndef(node, `node`);
  const filter2 = options.filter ?? `none`;
  const filterByValue = (v) => {
    if (filter2 === `none`) return [true, isPrimitive(v)];
    else if (filter2 === `leaves` && isPrimitive(v)) return [true, true];
    else if (filter2 === `branches` && !isPrimitive(v)) return [true, false];
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
    if (d.name === name) return d;
  }
}
function getByPath(path, node, options = {}) {
  const v = last(traceByPath(path, node, options));
  if (!v) throw new Error(`Could not trace path: ${path} `);
  return v;
}
function* traceByPath(path, node, options = {}) {
  throwNullUndef(path, `path`);
  throwNullUndef(node, `node`);
  const separator = options.separator ?? `.`;
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
    if (isPrimitive(v)) return v;
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
  if (`name` in node && `nodeValue` in node && `sourceValue` in node) return node;
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
  const add2 = (value2, path) => {
    const n = addValueByPath(value2, path, root2, pathOpts);
    if (root2 === void 0) {
      root2 = getRoot(n);
    }
  };
  const prettyPrint2 = () => {
    if (root2 === void 0) return `(empty)`;
    return toStringDeep(root2);
  };
  const getValue = (path) => {
    if (root2 === void 0) return;
    return valueByPath(path, root2, pathOpts);
  };
  const remove2 = (path) => {
    if (root2 === void 0) return false;
    return removeByPath(path, root2, pathOpts);
  };
  const hasPath = (path) => {
    if (root2 === void 0) return false;
    const c = findChildByPath(path, root2, pathOpts);
    return c !== void 0;
  };
  const getNode = (path) => {
    if (root2 === void 0) return;
    const c = findChildByPath(path, root2, pathOpts);
    return c;
  };
  const childrenLength3 = (path) => {
    if (root2 === void 0) return 0;
    const c = findChildByPath(path, root2, pathOpts);
    if (c === void 0) return 0;
    return c.childrenStore.length;
  };
  const getValues = (path) => {
    if (root2 === void 0) return [];
    return valuesByPath(path, root2, pathOpts);
  };
  const clearValues = (path) => {
    if (root2 === void 0) return false;
    return clearValuesByPath(path, root2, pathOpts);
  };
  return { add: add2, prettyPrint: prettyPrint2, remove: remove2, getValue, getValues, hasPath, childrenLength: childrenLength3, getNode, clearValues };
};
var addValueByPath = (value2, path, node, pathOpts = {}) => {
  const separator = pathOpts.separator ?? `.`;
  const duplicatePath = pathOpts.duplicates ?? `overwrite`;
  const split = path.split(separator);
  let count = 0;
  for (const p of split) {
    const lastEntry = count === split.length - 1;
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
    count++;
  }
  if (node === void 0) throw new Error(`Could not create tree`);
  return node;
};
var removeByPath = (path, root2, pathOpts = {}) => {
  if (root2 === void 0) return false;
  const c = findChildByPath(path, root2, pathOpts);
  if (c === void 0) return false;
  remove(c);
  return true;
};
var clearValuesByPath = (path, root2, pathOpts = {}) => {
  if (root2 === void 0) return false;
  const c = findChildByPath(path, root2, pathOpts);
  if (c === void 0) return false;
  c.value = {
    label: c.value?.label ?? ``,
    value: void 0
  };
  return true;
};
var childrenLengthByPath = (path, node, pathOpts = {}) => {
  if (node === void 0) return 0;
  const c = findChildByPath(path, node, pathOpts);
  if (c === void 0) return 0;
  return c.childrenStore.length;
};
var findChildByLabel = (label, node) => {
  if (node === void 0) return void 0;
  if (label === void 0) throw new Error(`Parameter 'label' cannot be undefined`);
  if (node.value?.label === label) return node;
  for (const c of node.childrenStore) {
    if (c.value?.label === label) return c;
  }
};
var valueByPath = (path, node, pathOpts = {}) => {
  const values = valuesByPath(path, node, pathOpts);
  if (values.length === 0) return void 0;
  if (values.length > 1) throw new Error(`Multiple values at path. Use getValues instead`);
  return values[0];
};
var getValuesFromNode = (c) => {
  if (c.value === void 0) return [];
  if (`values` in c.value) return c.value.values;
  if (`value` in c.value) {
    if (c.value.value === void 0) return [];
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
  if (maxDepth < 0) return false;
  const p = child.getParent();
  if (p === void 0) return false;
  if (eq(p, possibleParent)) return true;
  if (eq(p.getIdentity(), possibleParent.getIdentity())) return true;
  return hasParent2(p, possibleParent, eq, maxDepth - 1);
};
var hasParentValue = (child, possibleParentValue, eq = isEqualDefault, maxDepth = 0) => {
  if (maxDepth < 0) return false;
  const p = child.getParent();
  if (p === void 0) return false;
  if (eq(p.getValue(), possibleParentValue)) return true;
  return hasParentValue(p, possibleParentValue, eq, maxDepth - 1);
};
var findParentByValue = (child, possibleParentValue, eq = isEqualDefault, maxDepth = 0) => {
  if (maxDepth < 0) return;
  const p = child.getParent();
  if (p === void 0) return;
  if (eq(p.getValue(), possibleParentValue)) return p;
  return findParentByValue(p, possibleParentValue, eq, maxDepth - 1);
};
var couldAddChild = (parent, prospectiveChild, eq = isEqualDefault) => {
  if (eq(parent, prospectiveChild)) throw new Error(`Child equals parent`);
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
  if (maxDepth < 0) return false;
  if (eq(parent, possibleChild)) return true;
  if (eq(parent.getIdentity(), possibleChild.getIdentity())) return true;
  for (const c of breadthFirst2(parent, maxDepth)) {
    if (eq(c, possibleChild)) return true;
    if (eq(c.getIdentity(), possibleChild.getIdentity())) return true;
  }
  return false;
};
var hasChildValue = (parent, possibleValue, eq = isEqualDefault, maxDepth = 0) => {
  if (maxDepth < 0) return false;
  if (eq(parent.getValue(), possibleValue)) return true;
  for (const c of breadthFirst2(parent, maxDepth)) {
    if (eq(c.getValue(), possibleValue)) return true;
  }
  return false;
};
function* siblings(node) {
  const p = node.getParent();
  if (p === void 0) return;
  for (const s of p.children()) {
    if (s === node) continue;
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
  if (maxDepth < 0) return;
  if (eq(parent.getValue(), possibleValue)) return parent;
  for (const d of breadthFirst2(parent, maxDepth)) {
    if (eq(d.getValue(), possibleValue)) return d;
  }
  return;
};
function* depthFirst3(root2) {
  if (!root2) return;
  const stack = new StackMutable();
  let entry = root2;
  while (entry) {
    const entries = [...entry.children()];
    stack.push(...entries);
    if (stack.isEmpty) break;
    entry = stack.pop();
    if (entry) yield entry;
  }
}
function* breadthFirst2(root2, depth = Number.MAX_SAFE_INTEGER) {
  if (!root2) return;
  const queue = new QueueMutable();
  let entry = root2;
  while (entry) {
    if (depth < 0) return;
    for (const c of entry.children()) {
      yield c;
      queue.enqueue(c);
    }
    entry = queue.dequeue();
    depth--;
  }
}
function find2(root2, predicate, order = `breadth`) {
  if (predicate(root2)) return root2;
  const iter = order === `breadth` ? breadthFirst2 : depthFirst3;
  for (const c of iter(root2)) {
    if (predicate(c)) return c;
  }
}
function findByValue(root2, predicate, order = `breadth`) {
  if (predicate(root2.getValue())) return root2;
  const iter = order === `breadth` ? breadthFirst2 : depthFirst3;
  for (const c of iter(root2)) {
    if (predicate(c.getValue())) return c;
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
  if (node === void 0) return `(undefined)`;
  if (node === null) return `(null)`;
  const v = node.getValue();
  let type = typeof v;
  if (Array.isArray(v)) type = `array`;
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
    if (Array.isArray(v)) type = `array`;
    t += `value: ${vString} (${type}) kids: ${children3.length} parented: ${parent ? `y` : `n`}
`;
  }
  return t;
}

// src/collections/tree/index.ts
var toTraversable = (node) => {
  if (isTraversable(node)) return node;
  if (isTreeNode(node)) return asDynamicTraversable(node);
  if (typeof node === `object`) return asDynamicTraversable2(node);
  throw new Error(`Parameter 'node' not convertible`);
};
var isTreeNode = (node) => {
  if (`parent` in node && `childrenStore` in node && `value` in node) {
    if (Array.isArray(node.childrenStore)) return true;
  }
  return false;
};
var isTraversable = (node) => {
  return `children` in node && `getParent` in node && `getValue` in node && `getIdentity` in node;
};

export {
  isAsyncIterable,
  isIterable,
  fromEvent,
  reduce,
  uniqueByValue,
  chunks,
  concat,
  dropWhile,
  until,
  equals,
  every,
  fill,
  forEach,
  filter,
  find,
  flatten,
  map,
  max,
  min,
  some,
  unique,
  zip,
  fromIterable,
  toArray,
  fromArray,
  IterableSync_exports,
  push,
  pop,
  peek,
  isEmpty,
  isFull,
  StackMutable,
  mutable,
  compare,
  TreeMutable_exports,
  isPrimitive,
  depthFirst2 as depthFirst,
  TraverseObject_exports,
  Pathed_exports,
  TraversableTree_exports,
  toTraversable,
  isTreeNode,
  isTraversable,
  tree_exports
};
//# sourceMappingURL=chunk-SP37NBBE.js.map