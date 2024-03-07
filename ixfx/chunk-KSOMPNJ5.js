import {
  toStringAbbreviate
} from "./chunk-7KTY42OF.js";
import {
  last
} from "./chunk-DI7TMLF6.js";
import {
  QueueMutable
} from "./chunk-3JJ2GHGZ.js";
import {
  isPrimitive
} from "./chunk-36BU5EN5.js";
import {
  containsDuplicateInstances,
  without
} from "./chunk-46GN7MZ3.js";
import {
  isEqualDefault,
  isEqualValueIgnoreOrder
} from "./chunk-XJES6KLL.js";
import {
  nullUndef
} from "./chunk-WUN4GNAA.js";
import {
  __export
} from "./chunk-Q2EHUQVZ.js";

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
  const filter = options.filter ?? `none`;
  const filterByValue = (v) => {
    if (filter === `none`)
      return [true, isPrimitive(v)];
    else if (filter === `leaves` && isPrimitive(v))
      return [true, true];
    else if (filter === `branches` && !isPrimitive(v))
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

export {
  push,
  pop,
  peek,
  isEmpty,
  isFull,
  StackMutable,
  mutable,
  compare,
  remove,
  getRoot,
  createNode,
  asDynamicTraversable,
  toStringDeep,
  TreeMutable_exports,
  depthFirst2 as depthFirst,
  asDynamicTraversable2,
  TraverseObject_exports
};
//# sourceMappingURL=chunk-KSOMPNJ5.js.map