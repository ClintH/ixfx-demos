import {
  StackMutable,
  TraverseObject_exports,
  TreeMutable_exports,
  asDynamicTraversable,
  asDynamicTraversable2,
  compare,
  createNode,
  getRoot,
  remove,
  toStringDeep
} from "./chunk-33YLZAWN.js";
import {
  QueueMutable
} from "./chunk-4RHG66EP.js";
import {
  toStringAbbreviate
} from "./chunk-SPSPSDHG.js";
import {
  isEqualDefault
} from "./chunk-6UZ3OSJO.js";
import {
  __export
} from "./chunk-L5EJU35C.js";

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

// src/collections/tree/Pathed.ts
var Pathed_exports = {};
__export(Pathed_exports, {
  addValueByPath: () => addValueByPath,
  childrenLengthByPath: () => childrenLengthByPath,
  clearValuesByPath: () => clearValuesByPath,
  create: () => create,
  removeByPath: () => removeByPath,
  valueByPath: () => valueByPath,
  valuesByPath: () => valuesByPath
});
var create = (pathOpts = {}) => {
  let root;
  const add = (value, path) => {
    const n = addValueByPath(value, path, root, pathOpts);
    if (root === void 0) {
      root = getRoot(n);
    }
  };
  const prettyPrint = () => {
    if (root === void 0) return `(empty)`;
    return toStringDeep(root);
  };
  const getValue = (path) => {
    if (root === void 0) return;
    return valueByPath(path, root, pathOpts);
  };
  const remove2 = (path) => {
    if (root === void 0) return false;
    return removeByPath(path, root, pathOpts);
  };
  const hasPath = (path) => {
    if (root === void 0) return false;
    const c = findChildByPath(path, root, pathOpts);
    return c !== void 0;
  };
  const getNode = (path) => {
    if (root === void 0) return;
    const c = findChildByPath(path, root, pathOpts);
    return c;
  };
  const childrenLength2 = (path) => {
    if (root === void 0) return 0;
    const c = findChildByPath(path, root, pathOpts);
    if (c === void 0) return 0;
    return c.childrenStore.length;
  };
  const getValues = (path) => {
    if (root === void 0) return [];
    return valuesByPath(path, root, pathOpts);
  };
  const clearValues = (path) => {
    if (root === void 0) return false;
    return clearValuesByPath(path, root, pathOpts);
  };
  return { add, prettyPrint, remove: remove2, getValue, getValues, hasPath, childrenLength: childrenLength2, getNode, clearValues };
};
var addValueByPath = (value, path, node, pathOpts = {}) => {
  const separator = pathOpts.separator ?? `.`;
  const duplicatePath = pathOpts.duplicates ?? `overwrite`;
  const split = path.split(separator);
  let count = 0;
  for (const p of split) {
    const lastEntry = count === split.length - 1;
    const found = findChildByLabel(p, node);
    if (found === void 0) {
      const labelled = {
        value: lastEntry ? value : void 0,
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
              values: [...existing, value],
              label: p
            };
            break;
          }
          case `overwrite`: {
            node.value = {
              value,
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
var removeByPath = (path, root, pathOpts = {}) => {
  if (root === void 0) return false;
  const c = findChildByPath(path, root, pathOpts);
  if (c === void 0) return false;
  remove(c);
  return true;
};
var clearValuesByPath = (path, root, pathOpts = {}) => {
  if (root === void 0) return false;
  const c = findChildByPath(path, root, pathOpts);
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
  breadthFirst: () => breadthFirst,
  childrenLength: () => childrenLength,
  couldAddChild: () => couldAddChild,
  depthFirst: () => depthFirst,
  find: () => find,
  findAnyChildByValue: () => findAnyChildByValue,
  findAnyParentByValue: () => findAnyParentByValue,
  findByValue: () => findByValue,
  findChildByValue: () => findChildByValue,
  findParentByValue: () => findParentByValue,
  followValue: () => followValue,
  hasAnyChild: () => hasAnyChild,
  hasAnyChildValue: () => hasAnyChildValue,
  hasAnyParent: () => hasAnyParent,
  hasAnyParentValue: () => hasAnyParentValue,
  hasChild: () => hasChild,
  hasChildValue: () => hasChildValue,
  hasParent: () => hasParent,
  hasParentValue: () => hasParentValue,
  parents: () => parents,
  siblings: () => siblings,
  toString: () => toString,
  toStringDeep: () => toStringDeep2
});
var childrenLength = (tree) => {
  return [...tree.children()].length;
};
var hasAnyParent = (child, possibleParent, eq) => {
  return hasParent(child, possibleParent, eq, Number.MAX_SAFE_INTEGER);
};
var hasAnyParentValue = (child, possibleParentValue, eq) => {
  return hasParentValue(child, possibleParentValue, eq, Number.MAX_SAFE_INTEGER);
};
var findAnyParentByValue = (child, possibleParentValue, eq) => {
  return findParentByValue(child, possibleParentValue, eq, Number.MAX_SAFE_INTEGER);
};
var hasParent = (child, possibleParent, eq = isEqualDefault, maxDepth = 0) => {
  if (maxDepth < 0) return false;
  const p = child.getParent();
  if (p === void 0) return false;
  if (eq(p, possibleParent)) return true;
  if (eq(p.getIdentity(), possibleParent.getIdentity())) return true;
  return hasParent(p, possibleParent, eq, maxDepth - 1);
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
  if (hasAnyChild(parent, prospectiveChild, eq)) {
    throw new Error(`Circular. Parent already has child`);
  }
  if (hasAnyChild(prospectiveChild, parent, eq)) {
    throw new Error(`Prospective child has parent as child relation`);
  }
};
var hasAnyChild = (parent, possibleChild, eq = isEqualDefault) => {
  return hasChild(parent, possibleChild, eq, Number.MAX_SAFE_INTEGER);
};
var hasAnyChildValue = (parent, possibleChildValue, eq = isEqualDefault) => {
  return hasChildValue(parent, possibleChildValue, eq, Number.MAX_SAFE_INTEGER);
};
var hasChild = (parent, possibleChild, eq = isEqualDefault, maxDepth = 0) => {
  if (maxDepth < 0) return false;
  if (eq(parent, possibleChild)) return true;
  if (eq(parent.getIdentity(), possibleChild.getIdentity())) return true;
  for (const c of breadthFirst(parent, maxDepth)) {
    if (eq(c, possibleChild)) return true;
    if (eq(c.getIdentity(), possibleChild.getIdentity())) return true;
  }
  return false;
};
var hasChildValue = (parent, possibleValue, eq = isEqualDefault, maxDepth = 0) => {
  if (maxDepth < 0) return false;
  if (eq(parent.getValue(), possibleValue)) return true;
  for (const c of breadthFirst(parent, maxDepth)) {
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
function* parents(node) {
  let p = node.getParent();
  while (p !== void 0) {
    yield p;
    p = p.getParent();
  }
}
var findAnyChildByValue = (parent, possibleValue, eq = isEqualDefault) => {
  return findChildByValue(parent, possibleValue, eq, Number.MAX_SAFE_INTEGER);
};
var findChildByValue = (parent, possibleValue, eq = isEqualDefault, maxDepth = 0) => {
  if (maxDepth < 0) return;
  if (eq(parent.getValue(), possibleValue)) return parent;
  for (const d of breadthFirst(parent, maxDepth)) {
    if (eq(d.getValue(), possibleValue)) return d;
  }
  return;
};
function* depthFirst(root) {
  if (!root) return;
  const stack = new StackMutable();
  let entry = root;
  while (entry) {
    const entries = [...entry.children()];
    stack.push(...entries);
    if (stack.isEmpty) break;
    entry = stack.pop();
    if (entry) yield entry;
  }
}
function* breadthFirst(root, depth = Number.MAX_SAFE_INTEGER) {
  if (!root) return;
  const queue = new QueueMutable();
  let entry = root;
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
function find(root, predicate, order = `breadth`) {
  if (predicate(root)) return root;
  const iter = order === `breadth` ? breadthFirst : depthFirst;
  for (const c of iter(root)) {
    if (predicate(c)) return c;
  }
}
function findByValue(root, predicate, order = `breadth`) {
  if (predicate(root.getValue())) return root;
  const iter = order === `breadth` ? breadthFirst : depthFirst;
  for (const c of iter(root)) {
    if (predicate(c.getValue())) return c;
  }
}
function* followValue(root, continuePredicate, depth = 1) {
  for (const c of root.children()) {
    if (continuePredicate(c.getValue(), depth)) {
      yield c.getValue();
      yield* followValue(c, continuePredicate, depth + 1);
    }
  }
}
function toStringDeep2(node, depth = 0) {
  if (node === void 0) return `(undefined)`;
  if (node === null) return `(null)`;
  const v = node.getValue();
  let type = typeof v;
  if (Array.isArray(v)) type = `array`;
  let t = `  `.repeat(depth) + `value: ${JSON.stringify(v)} (${type})
`;
  for (const n of node.children()) {
    t += toStringDeep2(n, depth + 1);
  }
  return t;
}
function toString(...nodes) {
  let t = ``;
  for (const node of nodes) {
    const v = node.getValue();
    const vString = toStringAbbreviate(v);
    const children = [...node.children()];
    const parent = node.getParent();
    let type = typeof v;
    if (Array.isArray(v)) type = `array`;
    t += `value: ${vString} (${type}) kids: ${children.length} parented: ${parent ? `y` : `n`}
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
  Pathed_exports,
  TraversableTree_exports,
  toTraversable,
  isTreeNode,
  isTraversable,
  tree_exports
};
//# sourceMappingURL=chunk-OFFDJ4UM.js.map