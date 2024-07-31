import { T as TraversableTree$1, a as TreeNode, S as SimplifiedNode, L as LabelledSingleValue, b as LabelledNode, c as LabelledValue, d as LabelledValues } from './Types-DvArcVMB.js';
import { I as IsEqual } from './IsEqual-CTTf-Oj9.js';

type DiffAnnotation<T> = {
    /**
     * In the case of changes, this is old value
     */
    a: TraversableTree$1<T>;
    /**
     * In the case of changes, this is the new value
     */
    b: TraversableTree$1<T>;
    /**
     * If true, this node's value has been modified
     */
    valueChanged: boolean;
    /**
     * If true, one of the child values has changed
     */
    childChanged: boolean;
    /**
     * List of new children
     */
    added: Array<TraversableTree$1<T>>;
    /**
     * List of removed children
     */
    removed: Array<TraversableTree$1<T>>;
};
type DiffNode<T> = TreeNode<DiffAnnotation<T>> & {
    toString: () => string;
};
declare const compare$1: <T>(a: TraversableTree$1<T>, b: TraversableTree$1<T>, eq?: IsEqual<T>, parent?: DiffNode<T> | undefined) => DiffNode<T>;

/**
 * Compares two nodes.
 *
 * By default uses `isEqualValueIgnoreOrder` to compare nodes. This means
 * values of nodes will be compared, ignoring the order of fields.
 * @param a
 * @param b
 * @param eq Comparison function. Uses `isEqualValueIgnoreOrder` by default.
 * @returns Compare results
 */
declare const compare: <T>(a: TreeNode<T>, b: TreeNode<T>, eq?: IsEqual<T>) => DiffNode<T>;
/**
 * Converts `TreeNode` to `SimplifiedNode`, removing the 'parent' fields.
 * This can be useful because if you have the whole tree, the parent field
 * is redundant and because it makes circular references can make dumping to console etc more troublesome.
 *
 * Recursive: strips parentage of all children and so on too.
 * @param node
 * @returns
 */
declare const stripParentage: <T>(node: TreeNode<T>) => SimplifiedNode<T>;
/**
 * Wraps a {@link TreeNode} for a more object-oriented means of access.
 */
type WrappedNode<T> = TraversableTree$1<T> & {
    /**
     * Underlying Node
     */
    wraps: TreeNode<T>;
    /**
     * Gets value, if defined
     * @returns Value of Node
     */
    getValue: () => T | undefined;
    /**
     * Remove node and its children from tree
     * @returns
     */
    remove: () => void;
    /**
     * Adds a child node
     * @param child
     * @returns
     */
    add: (child: WrappedNode<T> | TreeNode<T>) => WrappedNode<T>;
    /**
     * Adds a new child node, with `value` as its value
     * @param value
     * @returns
     */
    addValue: (value: T) => WrappedNode<T>;
    /**
     * Returns _true_ if `child` is an immediate child of this node
     * @param child
     * @returns
     */
    hasChild: (child: WrappedNode<T> | TreeNode<T>) => boolean;
    queryValue: (value: T) => IterableIterator<WrappedNode<T>>;
    /**
     * Returns _true_ if `child` is contained any any descendant
     * @param child
     * @returns
     */
    hasAnyChild: (child: WrappedNode<T> | TreeNode<T>) => boolean;
    /**
     * Returns _true_ if `parent` is the immediate parent for this node
     * @param parent
     * @returns
     */
    hasParent: (parent: WrappedNode<T> | TreeNode<T>) => boolean;
    /**
     * Returns _true_ if `parent` is the immediate or ancestor parent for this node
     * @param parent
     * @returns
     */
    hasAnyParent: (parent: WrappedNode<T> | TreeNode<T>) => boolean;
};
/**
 * Wraps node `n` for a more object-oriented means of access.
 * It will wrap child nodes on demand. For this reason, WrappedNode object
 * identity is not stable
 * @param n Node to wrap
 * @returns
 */
declare const wrap: <T>(n: TreeNode<T>) => WrappedNode<T>;
/**
 * Removes `child` from the tree structure it is in.
 * It removes `child` from its parent. Any sub-children of `child` still remain connected.
 * @param child
 * @returns
 */
declare const remove: <T>(child: TreeNode<T>) => void;
/**
 * Depth-first iteration of the children of `node`
 * @param node
 * @returns
 */
declare function depthFirst$2<T>(node: TreeNode<T>): IterableIterator<TreeNode<T>>;
/**
 * Breadth-first iteration of the children of `node`
 * @param node
 * @returns
 */
declare function breadthFirst$1<T>(node: TreeNode<T>): IterableIterator<TreeNode<T>>;
/**
 * Validates the tree from `root` downwards.
 * @param root
 * @param seen
 * @returns
 */
declare function treeTest<T>(root: TreeNode<T>, seen?: Array<TreeNode<T>>): [ok: boolean, msg: string, node: TreeNode<T>];
/**
 * Throws an exception if `root` fails tree validation
 * @param root
 * @returns
 */
declare function throwTreeTest<T>(root: TreeNode<T>): void;
/**
 * Iterate over direct children of `root`
 * @param root
 */
declare function children$1<T>(root: TreeNode<T>): IterableIterator<TreeNode<T>>;
/**
 * Iterate over all parents of `root`. First result is the immediate parent.
 * @param root
 */
declare function parents$1<T>(root: TreeNode<T>): IterableIterator<TreeNode<T>>;
/**
 * Returns the depth of `node`. A root node (ie. with no parents) has a depth of 0.
 * @param node
 * @returns
 */
declare function nodeDepth(node: TreeNode<any>): number;
declare const hasChild$1: <T>(child: TreeNode<T>, parent: TreeNode<T>) => boolean;
declare const findChildByValue$1: <T>(value: T, parent: TreeNode<T>, eq?: IsEqual<T>) => TreeNode<T> | undefined;
declare function queryByValue<T>(value: T, parent: TreeNode<T>, eq?: IsEqual<T>): IterableIterator<TreeNode<T>>;
/**
 * Returns _true_ if `prospectiveChild` is some child node of `parent`,
 * anywhere in the tree structure.
 *
 * Use {@link hasChild} to only check immediate children.
 * @param prospectiveChild
 * @param parent
 * @returns
 */
declare const hasAnyChild$1: <T>(prospectiveChild: TreeNode<T>, parent: TreeNode<T>) => boolean;
declare const findAnyChildByValue$1: <T>(value: T, parent: TreeNode<T>, eq?: IsEqual<T>) => TreeNode<T> | undefined;
declare const getRoot: <T>(node: TreeNode<T>) => TreeNode<T>;
/**
 * Returns _true_ if `prospectiveParent` is any ancestor
 * parent of `child`.
 *
 * Use {@link hasParent} to only check immediate parent.
 * @param child
 * @param prospectiveParent
 * @returns
 */
declare const hasAnyParent$1: <T>(child: TreeNode<T>, prospectiveParent: TreeNode<T>) => boolean;
/**
 * Returns _true_ if `prospectiveParent` is the immediate
 * parent of `child`.
 *
 * Use {@link hasAnyParent} to check for any ancestor parent.
 * @param child
 * @param prospectiveParent
 * @returns
 */
declare const hasParent$1: <T>(child: TreeNode<T>, prospectiveParent: TreeNode<T>) => boolean;
/**
 * Computes the maximum depth of the tree.
 * That is, how many steps down from `node` it can go.
 * If a tree is: root -> childA -> subChildB
 * ```js
 * // Yields 2, since there are at max two steps down from root
 * computeMaxDepth(root);
 * ```
 * @param node
 * @returns
 */
declare const computeMaxDepth: <T>(node: TreeNode<T>) => number;
declare const add: <T>(child: TreeNode<T>, parent: TreeNode<T>) => void;
declare const addValue: <T>(value: T | undefined, parent: TreeNode<T>) => TreeNode<T>;
/**
 * Creates the root for a tree, with an optional `value`.
 * Use {@link rootWrapped} if you want a more object-oriented mode of access.
 * @param value
 * @returns
 */
declare const root: <T>(value?: T | undefined) => TreeNode<T>;
declare const fromPlainObject: (value: Record<string, any>, label?: string, parent?: TreeNode<any>, seen?: Array<any>) => TreeNode<LabelledSingleValue<any>>;
/**
 * Creates a tree, returning it as a {@link WrappedNode} for object-oriented access.
 * Use {@link root} alternatively.
 * @param value
 * @returns
 */
declare const rootWrapped: <T>(value: T | undefined) => WrappedNode<T>;
declare const createNode: <T>(value: T | undefined, parent?: TreeNode<T> | undefined) => TreeNode<T>;
declare const childrenLength$1: <T>(node: TreeNode<T>) => number;
declare const value: <T>(node: TreeNode<T>) => T | undefined;
/**
 * Projects `node` as a dynamic traversable.
 * Dynamic in the sense that it creates the traversable project for nodes on demand.
 * A consequence is that node identities are not stable.
 * @param node
 * @returns
 */
declare const asDynamicTraversable$1: <T>(node: TreeNode<T>) => TraversableTree$1<T>;
declare const setChildren: <T>(parent: TreeNode<T>, children: Array<TreeNode<T>>) => void;
declare const toStringDeep$2: <T>(node: TreeNode<T>, indent?: number) => string;
declare function followValue$1<T>(root: TreeNode<T>, continuePredicate: (nodeValue: T, depth: number) => boolean, depth?: number): IterableIterator<T | undefined>;

type TreeMutable_WrappedNode<T> = WrappedNode<T>;
declare const TreeMutable_add: typeof add;
declare const TreeMutable_addValue: typeof addValue;
declare const TreeMutable_compare: typeof compare;
declare const TreeMutable_computeMaxDepth: typeof computeMaxDepth;
declare const TreeMutable_createNode: typeof createNode;
declare const TreeMutable_fromPlainObject: typeof fromPlainObject;
declare const TreeMutable_getRoot: typeof getRoot;
declare const TreeMutable_nodeDepth: typeof nodeDepth;
declare const TreeMutable_queryByValue: typeof queryByValue;
declare const TreeMutable_remove: typeof remove;
declare const TreeMutable_root: typeof root;
declare const TreeMutable_rootWrapped: typeof rootWrapped;
declare const TreeMutable_setChildren: typeof setChildren;
declare const TreeMutable_stripParentage: typeof stripParentage;
declare const TreeMutable_throwTreeTest: typeof throwTreeTest;
declare const TreeMutable_treeTest: typeof treeTest;
declare const TreeMutable_value: typeof value;
declare const TreeMutable_wrap: typeof wrap;
declare namespace TreeMutable {
  export { type TreeMutable_WrappedNode as WrappedNode, TreeMutable_add as add, TreeMutable_addValue as addValue, asDynamicTraversable$1 as asDynamicTraversable, breadthFirst$1 as breadthFirst, children$1 as children, childrenLength$1 as childrenLength, TreeMutable_compare as compare, TreeMutable_computeMaxDepth as computeMaxDepth, TreeMutable_createNode as createNode, depthFirst$2 as depthFirst, findAnyChildByValue$1 as findAnyChildByValue, findChildByValue$1 as findChildByValue, followValue$1 as followValue, TreeMutable_fromPlainObject as fromPlainObject, TreeMutable_getRoot as getRoot, hasAnyChild$1 as hasAnyChild, hasAnyParent$1 as hasAnyParent, hasChild$1 as hasChild, hasParent$1 as hasParent, TreeMutable_nodeDepth as nodeDepth, parents$1 as parents, TreeMutable_queryByValue as queryByValue, TreeMutable_remove as remove, TreeMutable_root as root, TreeMutable_rootWrapped as rootWrapped, TreeMutable_setChildren as setChildren, TreeMutable_stripParentage as stripParentage, TreeMutable_throwTreeTest as throwTreeTest, toStringDeep$2 as toStringDeep, TreeMutable_treeTest as treeTest, TreeMutable_value as value, TreeMutable_wrap as wrap };
}

/**
 * Options for parsing a path
 */
type PathOpts$1 = Readonly<{
    /**
     * Separator for path, eg '.'
     */
    separator: string;
    /**
     * If two values are stored at same path, what to do? Default: overwrite
     * * overwrite: last-write wins
     * * ignore: first-write wins
     * * allow: allow multiple values
     */
    duplicates: `overwrite` | `allow` | `ignore`;
}>;
/**
 * Creates a wrapper for working with 'pathed' trees.
 * An example is a filesystem.
 *
 * ```js
 * const t = create();
 * // Store a value. Path implies a structure of
 * //   c -> users -> admin
 * // ...which is autoatically created
 * t.add({x:10}, `c.users.admin`);
 *
 * t.add({x:20}, `c.users.guest`);
 * // Tree will now be:
 * // c-> users -> admin
 * //            -> guest
 *
 * t.getValue(`c.users.guest`); // { x:20 }
 * ```
 *
 * By default only a single value can be stored at a path.
 * Set options to allow this:
 * ```js
 * const t = create({ duplicates: `allow` });
 * t.add({x:10}, `c.users.admin`);
 * t.add({x:20}, `c.users.admin`);
 * t.getValue(`c.users.admin`);   // Throws an error because there are multiple values
 * t.getValues(`c.users.admin`);  // [ {x:10}, {x:20 } ]
 * ```
 * @param pathOpts
 * @returns
 */
declare const create$1: <T>(pathOpts?: Partial<PathOpts$1>) => {
    add: (value: T, path: string) => void;
    prettyPrint: () => string;
    remove: (path: string) => boolean;
    getValue: (path: string) => T | undefined;
    getValues: (path: string) => Array<T>;
    hasPath: (path: string) => boolean;
    childrenLength: (path: string) => number;
    getNode: (path: string) => LabelledNode<T> | undefined;
    clearValues: (path: string) => boolean;
};
/**
 * Adds a value by a string path, with '.' as a the default delimiter
 * Automatically generates intermediate nodes.
 *
 * ```js
 * const root = addValueByPath({}, 'c');
 * addValueByPath({x:'blah'}, 'c.users.admin', root);
 * ```
 *
 * Creates the structure:
 * ```
 * c          value: { }            label: c
 * + users    value: undefined      label: users
 *  + admin   value: { x: 'blah' }  label: admin
 * ```
 *
 * By default, multiple values under same key are overwritten, with the most recent winning.
 * @param value
 * @param path
 * @param pathOpts
 */
declare const addValueByPath: <T>(value: T, path: string, node?: LabelledNode<T> | undefined, pathOpts?: Partial<PathOpts$1>) => LabelledNode<T>;
declare const removeByPath: <T>(path: string, root: LabelledNode<T>, pathOpts?: Partial<PathOpts$1>) => boolean;
declare const clearValuesByPath: <T>(path: string, root: LabelledNode<T>, pathOpts?: Partial<PathOpts$1>) => boolean;
declare const childrenLengthByPath: <T>(path: string, node: LabelledNode<T>, pathOpts?: Partial<PathOpts$1>) => number;
declare const valueByPath: <T>(path: string, node: LabelledNode<T>, pathOpts?: Partial<PathOpts$1>) => T | undefined;
declare const valuesByPath: <T>(path: string, node: LabelledNode<T>, pathOpts?: Partial<PathOpts$1>) => Array<T>;

declare const Pathed_addValueByPath: typeof addValueByPath;
declare const Pathed_childrenLengthByPath: typeof childrenLengthByPath;
declare const Pathed_clearValuesByPath: typeof clearValuesByPath;
declare const Pathed_removeByPath: typeof removeByPath;
declare const Pathed_valueByPath: typeof valueByPath;
declare const Pathed_valuesByPath: typeof valuesByPath;
declare namespace Pathed {
  export { type PathOpts$1 as PathOpts, Pathed_addValueByPath as addValueByPath, Pathed_childrenLengthByPath as childrenLengthByPath, Pathed_clearValuesByPath as clearValuesByPath, create$1 as create, Pathed_removeByPath as removeByPath, Pathed_valueByPath as valueByPath, Pathed_valuesByPath as valuesByPath };
}

type Entry = Readonly<{
    name: string;
    sourceValue: any;
    nodeValue: any;
}>;
type EntryWithAncestors = Readonly<{
    name: string;
    sourceValue: any;
    nodeValue: any;
    ancestors: Array<string>;
}>;
type EntryStatic = Readonly<{
    name: string;
    value: any;
    ancestors?: Array<string>;
}>;
/**
 * Options for parsing a path
 */
type PathOpts = {
    /**
     * Separator for path, eg '.'
     */
    readonly separator?: string;
};
/**
 * Helper function to get a 'friendly' string representation of an array of {@link Entry}.
 * @param entries
 * @returns
 */
declare function prettyPrintEntries(entries: ReadonlyArray<Entry>): string;
/**
 * Returns a human-friendly debug string for a tree-like structure
 * ```js
 * console.log(Trees.prettyPrint(obj));
 * ```
 * @param indent
 * @param node
 * @param options
 * @returns
 */
declare const prettyPrint: (node: object, indent?: number, options?: Partial<ChildrenOptions>) => string;
/**
 * Returns a debug string representation of the node (recursive)
 * @param node
 * @param indent
 * @returns
 */
declare const toStringDeep$1: (node: TreeNode<Entry | EntryStatic>, indent?: number) => string;
type ChildrenOptions = Readonly<{
    filter: `none` | `leaves` | `branches`;
    name: string;
}>;
/**
 * Returns the direct children of a tree-like object as a pairing
 * of node name and value. Supports basic objects, Maps and arrays.
 *
 * Sub-children are included as an object blob.
 *
 * @example Simple object
 * ```js
 * const o = {
 *  colour: {
 *    r: 0.5, g: 0.5, b: 0.5
 *  }
 * };
 *
 * const children = [ ...Trees.children(o) ];
 * // Children:
 * // [
 * //  { name: "colour", value: { b: 0.5, g: 0.5, r: 0.5 } }
 * // ]
 * const subChildren = [ ...Trees.children(o.colour) ];
 * // [ { name: "r", value: 0.5 }, { name: "g", value: 0.5 }, { name: "b", value: 0.5 } ]
 * ```
 *
 * Arrays are assigned a name based on index.
 * @example Arrays
 * ```js
 * const colours = [ { r: 1, g: 0, b: 0 }, { r: 0, g: 1, b: 0 }, { r: 0, g: 0, b: 1 } ];
 * // Children:
 * // [
 * //  { name: "array[0]", value: {r:1,g:0,b:0} },
 * //  { name: "array[1]", value: {r:0,g:1,b:0} },
 * //  { name: "array[2]", value: {r:0,g:0,b:1} },
 * // ]
 * ```
 *
 * Pass in `options.name` (eg 'colours') to have names generated as 'colours[0]', etc.
 * Options can also be used to filter children. By default all direct children are returned.
 * @param node
 * @param options
 */
declare function children<T extends object>(node: T, options?: Partial<ChildrenOptions>): IterableIterator<Entry>;
declare function depthFirst$1<T extends object>(node: T, options?: Partial<ChildrenOptions>, ancestors?: Array<string>): IterableIterator<EntryWithAncestors>;
/**
 * Returns the closest matching entry, tracing `path` in an array, Map or simple object.
 * Returns an entry with _undefined_ value at the point where tracing stopped.
 * Use {@link traceByPath} to step through all the segments.
 *
 * ```js
  * const people = {
    *  jane: {
 *   address: {
 *    postcode: 1000,
    *    street: 'West St',
    *    city: 'Blahville'
 *   },
 * colour: 'red'
  *  }
 * }
 * Trees.getByPath('jane.address.postcode', people); // '.' default separator
 * // ['postcode', 1000]
 * Trees.getByPath('jane.address.country.state', people);
 * // ['country', undefined] - since full path could not be resolved.
 * ```
 * @param path Path, eg `jane.address.postcode`
 * @param node Node to look within
 * @param options Options for parsing path. By default '.' is used as a separator
 * @returns
 */
declare function getByPath<T extends object>(path: string, node: T, options?: PathOpts): Entry;
/**
 * Enumerates over children of `node` towards the node named in `path`.
 * This is useful if you want to get the interim steps to the target node.
 *
 * Use {@link getByPath} if you don't care about interim steps.
 *
 * ```js
  * const people = {
    *  jane: {
 *   address: {
 *    postcode: 1000,
    *    street: 'West St',
    *    city: 'Blahville'
 *   },
 * colour: 'red'
  *  }
 * }
 * for (const p of Trees.traceByPath('jane.address.street', people)) {
 * // { name: "jane", value: { address: { postcode: 1000,street: 'West St', city: 'Blahville' }, colour: 'red'} },
 * // { name: "address", value: { postcode: 1000, street: 'West St', city: 'Blahville' } },
 * // { name: "street", value: "West St" } }
 * }
 * ```
 *
 * Results stop when the path can't be followed any further.
 * The last entry will have a name of the last sought path segment, and _undefined_ as its value.
 *
 * @param path Path to traverse
 * @param node Starting node
 * @param options Options for path traversal logic
 * @returns
 */
declare function traceByPath<T extends object>(path: string, node: T, options?: PathOpts): Iterable<EntryWithAncestors>;
/**
 * Returns a projection of `node` as a dynamic traversable.
 * This means that the tree structure is dynamically created as last-minute as possible.
 *
 * Note that the object identity of TraversableTree return results is not stable.
 * This is because they are created on-the-fly by reading fields of `node`.
 *
 * ```js
 * const c1 = [ ...asDynamicTraversable(someObject).children() ];
 * const c2 = [ ...asDynamicTraversable(someObject).children() ];
 *
 * // Object identity is not the same
 * c1[ 0 ] === c1[ 0 ]; // false
 * // ...even though its referring to the same value
 * c1[ 0 ].getValue() === c1[ 0 ].getValue(); // true
 * ```
 *
 * Instead .getIdentity() to get a stable identity:
 * ```js
 * c1[ 0 ].getIdentity() === c2[ 0 ].getIdentity(); // true
 * ```
 * @param node
 * @param options
 * @param ancestors
 * @param parent
 * @returns
 */
declare const asDynamicTraversable: <T extends object>(node: T, options?: Partial<ChildrenOptions>, ancestors?: Array<string>, parent?: TraversableTree$1<EntryStatic> | undefined) => TraversableTree$1<EntryStatic>;
/**
 * Reads all fields and sub-fields of `node`, returning as a 'wrapped' tree structure.
 * @param node
 * @param options
 * @returns
 */
declare const createWrapped: <T extends object>(node: T, options: Partial<CreateOptions>) => WrappedNode<any>;
type CreateOptions = {
    name: string;
    /**
     * If _true_, only leaf nodes have values. This avoids repetition (important
     * when comparing trees), with semantics being in the tree itself.
     *
     * When _false_ (default) values get decomposed down the tree. This
     * makes it easy to get all the data for a branch of the tree.
     *
     *
     * Eg if storing { person: { address { state: `qld` } } }
     * When _true_, the tree would be:
     * ```
     * person, value: undefined
     *  + address, value: undefined
     *    + state, value: 'qld'
     * ```
     * But when _false_, the tree would be:
     * ```
     * person, value: { address: { state: `qld } }
     *  + address, value: { state: `qld` }
     *    + state, value: `qld`
     * ```
     */
    valuesAtLeaves: boolean;
};
/**
 * Reads all fields and sub-fields of `node`, returning as a basic tree structure.
 * The structure is a snapshot of the object. If the object changes afterwards, the tree will
 * remain the same.
 *
 * Alternatively, consider {@link asDynamicTraversable} which reads the object dynamically.
 * @param node
 * @param options
 * @returns
 */
declare const create: <T extends object>(node: T, options?: Partial<CreateOptions>) => TreeNode<EntryStatic>;
/**
 * Returns a copy of `node` with its (and all its children's) parent information removed.
 * @param node
 * @param options
 * @returns
 */
declare const createSimplified: <T extends object>(node: T, options?: Partial<CreateOptions>) => SimplifiedNode<EntryStatic>;

type TraverseObject_ChildrenOptions = ChildrenOptions;
type TraverseObject_CreateOptions = CreateOptions;
type TraverseObject_Entry = Entry;
type TraverseObject_EntryStatic = EntryStatic;
type TraverseObject_EntryWithAncestors = EntryWithAncestors;
type TraverseObject_PathOpts = PathOpts;
declare const TraverseObject_asDynamicTraversable: typeof asDynamicTraversable;
declare const TraverseObject_children: typeof children;
declare const TraverseObject_create: typeof create;
declare const TraverseObject_createSimplified: typeof createSimplified;
declare const TraverseObject_createWrapped: typeof createWrapped;
declare const TraverseObject_getByPath: typeof getByPath;
declare const TraverseObject_prettyPrint: typeof prettyPrint;
declare const TraverseObject_prettyPrintEntries: typeof prettyPrintEntries;
declare const TraverseObject_traceByPath: typeof traceByPath;
declare namespace TraverseObject {
  export { type TraverseObject_ChildrenOptions as ChildrenOptions, type TraverseObject_CreateOptions as CreateOptions, type TraverseObject_Entry as Entry, type TraverseObject_EntryStatic as EntryStatic, type TraverseObject_EntryWithAncestors as EntryWithAncestors, type TraverseObject_PathOpts as PathOpts, TraverseObject_asDynamicTraversable as asDynamicTraversable, TraverseObject_children as children, TraverseObject_create as create, TraverseObject_createSimplified as createSimplified, TraverseObject_createWrapped as createWrapped, depthFirst$1 as depthFirst, TraverseObject_getByPath as getByPath, TraverseObject_prettyPrint as prettyPrint, TraverseObject_prettyPrintEntries as prettyPrintEntries, toStringDeep$1 as toStringDeep, TraverseObject_traceByPath as traceByPath };
}

declare const childrenLength: <T>(tree: TraversableTree$1<T>) => number;
/**
 * Returns _true_ if `child` is parented at any level (grand-parented etc) by `possibleParent`
 * @param child Child being sought
 * @param possibleParent Possible parent of child
 * @param eq Equality comparison function {@link isEqualDefault} used by default
 * @returns
 */
declare const hasAnyParent: <T>(child: TraversableTree$1<T>, possibleParent: TraversableTree$1<T>, eq?: IsEqual<TraversableTree$1<T>>) => boolean;
declare const hasAnyParentValue: <T>(child: TraversableTree$1<T>, possibleParentValue: T, eq?: IsEqual<T>) => boolean;
declare const findAnyParentByValue: <TValue>(child: TraversableTree$1<TValue>, possibleParentValue: TValue, eq?: IsEqual<TValue>) => TraversableTree$1<TValue> | undefined;
/**
 * Returns _true_ if `child` exists within `possibleParent`. By default it only looks at the immediate
 * parent (maxDepth: 0). Use Number.MAX_SAFE_INTEGER for searching recursively upwards (or {@link hasAnyParent})
 * @param child Child being sought
 * @param possibleParent Possible parent of child
 * @param maxDepth Max depth of traversal. Default of 0 only looks for immediate parent.
 * @param eq Equality comparison function. {@link isEqualDefault} used by default.
 * @returns
 */
declare const hasParent: <T>(child: TraversableTree$1<T>, possibleParent: TraversableTree$1<T>, eq?: IsEqual<TraversableTree$1<T>>, maxDepth?: number) => boolean;
declare const hasParentValue: <TValue>(child: TraversableTree$1<TValue>, possibleParentValue: TValue, eq?: IsEqual<TValue>, maxDepth?: number) => boolean;
declare const findParentByValue: <TValue>(child: TraversableTree$1<TValue>, possibleParentValue: TValue, eq?: IsEqual<TValue>, maxDepth?: number) => TraversableTree$1<TValue> | undefined;
/**
 * Returns _true_ if `prospectiveChild` can be legally added to `parent`.
 * _False_ is returned if:
 *  * `parent` and `prospectiveChild` are equal
 *  * `parent` already contains `prospectiveChild`
 *  * `prospectiveChild` has `parent` as its own child
 *
 * Throws an error if `parent` or `prospectiveChild` is null/undefined.
 * @param parent Parent to add to
 * @param prospectiveChild Prospective child
 * @param eq Equality function
 */
declare const couldAddChild: <T>(parent: TraversableTree$1<T>, prospectiveChild: TraversableTree$1<T>, eq?: IsEqual<TraversableTree$1<T>>) => void;
/**
 * Returns _true_ if _possibleChild_ is contained within _parent_ tree.
 * That is, it is any sub-child.
 * @param parent Parent tree
 * @param possibleChild Sought child
 * @param eq Equality function, or {@link isEqualDefault} if undefined.
 * @returns
 */
declare const hasAnyChild: <T>(parent: TraversableTree$1<T>, possibleChild: TraversableTree$1<T>, eq?: IsEqual<TraversableTree$1<T>>) => boolean;
declare const hasAnyChildValue: <T>(parent: TraversableTree$1<T>, possibleChildValue: T, eq?: IsEqual<T>) => boolean;
/**
 * Returns _true_ if _possibleChild_ is contained within _maxDepth_ children
 * of _parent_ node. By default only looks at immediate children (maxDepth = 0).
 *
 * ```js
 * // Just check parentNode for childNode
 * Trees.hasChild(parentNode, childNode);
 * // See if parentNode or parentNode's parents have childNode
 * Trees.hasChild(parentNode, childNode, 1);
 * // Use custom equality function, in this case comparing on name field
 * Trees.hasChild(parentNode, childNode, 0, (a, b) => a.name === b.name);
 * ```
 * @param parent Parent tree
 * @param possibleChild Sought child
 * @param maxDepth Maximum depth. 0 for immediate children, Number.MAX_SAFE_INTEGER for boundless
 * @param eq Equality function, or {@link isEqualDefault} if undefined.
 * @returns
 */
declare const hasChild: <T>(parent: TraversableTree$1<T>, possibleChild: TraversableTree$1<T>, eq?: IsEqual<TraversableTree$1<T>>, maxDepth?: number) => boolean;
declare const hasChildValue: <T>(parent: TraversableTree$1<T>, possibleValue: T, eq?: IsEqual<T>, maxDepth?: number) => boolean;
/**
 * Iterates over siblings of `node`.
 *
 * Other iteration options:
 * * {@link breadthFirst}: Children, breadth-first
 * * {@link depthFirst}: Children, depth-first
 * * {@link parents}: Chain of parents, starting with immediate parent
 * * {@link siblings}: Nodes with same parent
 * @param node Node to begin from
 * @returns
 */
declare function siblings<T>(node: TraversableTree$1<T>): IterableIterator<TraversableTree$1<T>>;
/**
 * Iterates over parents of `node`, starting with immediate parent
 *
 * Other iteration options:
 * * {@link breadthFirst}: Children, breadth-first
 * * {@link depthFirst}: Children, depth-first
 * * {@link parents}: Chain of parents, starting with immediate parent
 * * {@link siblings}: Nodes with same parent
 * @param node Node to begin from
 * @returns
 */
declare function parents<T>(node: TraversableTree$1<T>): IterableIterator<TraversableTree$1<T>>;
declare const findAnyChildByValue: <TValue>(parent: TraversableTree$1<TValue>, possibleValue: TValue, eq?: IsEqual<TValue>) => TraversableTree$1<TValue> | undefined;
declare const findChildByValue: <TValue>(parent: TraversableTree$1<TValue>, possibleValue: TValue, eq?: IsEqual<TValue>, maxDepth?: number) => TraversableTree$1<TValue> | undefined;
/**
 * Iterates over children of `root`, depth-first.
 *
 * Other iteration options:
 * * {@link breadthFirst}: Children, breadth-first
 * * {@link depthFirst}: Children, depth-first
 * * {@link parents}: Chain of parents, starting with immediate parent
 * * {@link siblings}: Nodes with same parent
 * @param root Root node
 * @returns
 */
declare function depthFirst<T extends TraversableTree$1<any>>(root: T): Generator<T>;
/**
 * Iterates over the children of `root`, breadth-first
 *
 * Other iteration options:
 * * {@link breadthFirst}: Children, breadth-first
 * * {@link depthFirst}: Children, depth-first
 * * {@link parents}: Chain of parents, starting with immediate parent
 * * {@link siblings}: Nodes with same parent
 * @param root Root node
 * @param depth How many levels to traverse
 * @returns
 */
declare function breadthFirst<T>(root: TraversableTree$1<T>, depth?: number): IterableIterator<TraversableTree$1<T>>;
/**
 * Applies `predicate` to `root` and all its child nodes, returning the node where
 * `predicate` yields _true_.
 * Use {@link findByValue} to find a node by its value
 * @param root
 * @param predicate
 * @param order Iterate children by breadth or depth. Default 'breadth'
 * @returns
 */
declare function find<T>(root: TraversableTree$1<T>, predicate: (node: TraversableTree$1<T>) => boolean, order?: `breadth` | `depth`): TraversableTree$1<T> | undefined;
/**
 * Applies `predicate` to `root` and all its child nodes, returning the node value for
 * `predicate` yields _true_.
 * Use {@link find} to filter by nodes rather than values
 *
 * ```js
 * const n = findByValue(root, (v) => v.name === 'Bob');
 * ```
 * @param root
 * @param predicate
 * @param order Iterate children by breadth or depth. Default 'breadth'
 * @returns
 */
declare function findByValue<T>(root: TraversableTree$1<T>, predicate: (nodeValue: T) => boolean, order?: `breadth` | `depth`): TraversableTree$1<T> | undefined;
/**
 * Search through children in a path-like manner.
 *
 * It finds the first child of `root` that matches `continuePredicate`.
 * The function gets passed a depth of 1 to begin with. It recurses, looking for the next sub-child, etc.
 *
 * If it can't find a child, it stops.
 *
 * This is different to 'find' functions, which exhausively search all possible child nodes, regardless of position in tree.
 *
 * ```js
 * const path = 'a.aa.aaa'.split('.');
 * const pred = (nodeValue, depth) => {
 *  if (nodeValue === path[0]) {
 *    path.shift(); // Remove first element
 *    return true;
 *  }
 *  return false;
 * }
 *
 * // Assuming we have a tree of string values:
 * // a
 * //   - aa
 * //       - aaa
 * //   - ab
 * // b
 * //   - ba
 * for (const c of follow(tree, pred)) {
 *  // Returns nodes: a, aa and then aaa
 * }
 * ```
 * @param root
 * @param continuePredicate
 * @param depth
 */
declare function followValue<T>(root: TraversableTree$1<T>, continuePredicate: (nodeValue: T, depth: number) => boolean, depth?: number): IterableIterator<T>;
declare function toStringDeep<T>(node: TraversableTree$1<T>, depth?: number): string;
declare function toString(...nodes: Array<TraversableTree$1<any>>): string;

declare const TraversableTree_breadthFirst: typeof breadthFirst;
declare const TraversableTree_childrenLength: typeof childrenLength;
declare const TraversableTree_couldAddChild: typeof couldAddChild;
declare const TraversableTree_depthFirst: typeof depthFirst;
declare const TraversableTree_find: typeof find;
declare const TraversableTree_findAnyChildByValue: typeof findAnyChildByValue;
declare const TraversableTree_findAnyParentByValue: typeof findAnyParentByValue;
declare const TraversableTree_findByValue: typeof findByValue;
declare const TraversableTree_findChildByValue: typeof findChildByValue;
declare const TraversableTree_findParentByValue: typeof findParentByValue;
declare const TraversableTree_followValue: typeof followValue;
declare const TraversableTree_hasAnyChild: typeof hasAnyChild;
declare const TraversableTree_hasAnyChildValue: typeof hasAnyChildValue;
declare const TraversableTree_hasAnyParent: typeof hasAnyParent;
declare const TraversableTree_hasAnyParentValue: typeof hasAnyParentValue;
declare const TraversableTree_hasChild: typeof hasChild;
declare const TraversableTree_hasChildValue: typeof hasChildValue;
declare const TraversableTree_hasParent: typeof hasParent;
declare const TraversableTree_hasParentValue: typeof hasParentValue;
declare const TraversableTree_parents: typeof parents;
declare const TraversableTree_siblings: typeof siblings;
declare const TraversableTree_toString: typeof toString;
declare const TraversableTree_toStringDeep: typeof toStringDeep;
declare namespace TraversableTree {
  export { TraversableTree_breadthFirst as breadthFirst, TraversableTree_childrenLength as childrenLength, TraversableTree_couldAddChild as couldAddChild, TraversableTree_depthFirst as depthFirst, TraversableTree_find as find, TraversableTree_findAnyChildByValue as findAnyChildByValue, TraversableTree_findAnyParentByValue as findAnyParentByValue, TraversableTree_findByValue as findByValue, TraversableTree_findChildByValue as findChildByValue, TraversableTree_findParentByValue as findParentByValue, TraversableTree_followValue as followValue, TraversableTree_hasAnyChild as hasAnyChild, TraversableTree_hasAnyChildValue as hasAnyChildValue, TraversableTree_hasAnyParent as hasAnyParent, TraversableTree_hasAnyParentValue as hasAnyParentValue, TraversableTree_hasChild as hasChild, TraversableTree_hasChildValue as hasChildValue, TraversableTree_hasParent as hasParent, TraversableTree_hasParentValue as hasParentValue, TraversableTree_parents as parents, TraversableTree_siblings as siblings, TraversableTree_toString as toString, TraversableTree_toStringDeep as toStringDeep };
}

declare const toTraversable: <T>(node: TreeNode<T> | TraversableTree$1<T> | object) => TraversableTree$1<any>;
declare const isTreeNode: (node: any) => node is TreeNode<any>;
declare const isTraversable: (node: any) => node is TraversableTree$1<any>;

type index_DiffAnnotation<T> = DiffAnnotation<T>;
type index_DiffNode<T> = DiffNode<T>;
declare const index_LabelledNode: typeof LabelledNode;
declare const index_LabelledSingleValue: typeof LabelledSingleValue;
declare const index_LabelledValue: typeof LabelledValue;
declare const index_LabelledValues: typeof LabelledValues;
declare const index_Pathed: typeof Pathed;
declare const index_SimplifiedNode: typeof SimplifiedNode;
declare const index_TreeNode: typeof TreeNode;
declare const index_isTraversable: typeof isTraversable;
declare const index_isTreeNode: typeof isTreeNode;
declare const index_toTraversable: typeof toTraversable;
declare namespace index {
  export { type index_DiffAnnotation as DiffAnnotation, type index_DiffNode as DiffNode, TraverseObject as FromObject, index_LabelledNode as LabelledNode, index_LabelledSingleValue as LabelledSingleValue, index_LabelledValue as LabelledValue, index_LabelledValues as LabelledValues, TreeMutable as Mutable, index_Pathed as Pathed, index_SimplifiedNode as SimplifiedNode, TraversableTree$1 as TraversableTree, TraversableTree as Traverse, index_TreeNode as TreeNode, compare$1 as compare, index_isTraversable as isTraversable, index_isTreeNode as isTreeNode, index_toTraversable as toTraversable };
}

export { type DiffAnnotation as D, Pathed as P, TreeMutable as T, isTreeNode as a, isTraversable as b, TraverseObject as c, TraversableTree as d, type DiffNode as e, compare$1 as f, index as i, toTraversable as t };
