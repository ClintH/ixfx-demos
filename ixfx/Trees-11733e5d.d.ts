import { I as IsEqual } from './Util-21835c84.js';

/**
 * Basic tree node implementation
 */
declare class TreeNodeMutable<V> implements TreeNode {
    #private;
    value: V;
    readonly label: string;
    /**
     * Constructor
     * @param value Value associated with node
     * @param label Label
     */
    constructor(value: V, label: string);
    getLengthChildren(): number;
    hasChild: (possibleChild: TreeNodeMutable<V>) => boolean;
    hasAnyChild: (possibleChild: TreeNodeMutable<V>) => boolean;
    hasParent: (possibleParent: TreeNodeMutable<V>) => boolean;
    hasAnyParent: (possibleParent: TreeNodeMutable<V>) => boolean;
    getByPath: (path: string, opts?: PathOpts) => TreeNodeMutable<V> | undefined;
    /**
     * Adds a value by a string path.
     * Automatically generates intermediate nodes.
     *
     * ```js
     * const rootValue = {}
     * const root = treeNodeMutable(rootValue, 'pc');
     * root.addValueByPath({x:'c'},  'c');
     * root.addValueByPath({x:'admin'}, 'c.users.admin');
     * ```
     *
     * Creates the structure:
     * ```
     * pc         {}
     * + c        {x: 'c' }
     *  + users   undefined
     *   + admin  {x: 'admin'}
     * ```
     * @param value
     * @param path
     * @param pathOpts
     */
    addValueByPath(value: V, path: string, pathOpts?: PathOpts): void;
    /**
     * Adds a child
     * Throws an error if child cannot be added due to logical inconsistency (eg adding a child to self)
     * @param child
     */
    add(child: TreeNodeMutable<V>): void;
    /**
     * Removes a child node.
     * Throws an exception if child was not found
     * @param child
     */
    remove(child: TreeNodeMutable<V>): void;
    /**
     * Sets the descendents of the node
     * 'Unparents' existing children nodes. Checks each new node that it can
     * be logically added
     * @param d
     */
    setDescendants(d: TreeNodeMutable<V>[]): void;
    /**
     * Returns a string representation of tree
     * @param indent
     * @returns
     */
    prettyPrint(indent?: number): string;
    /**
     * Iterates all parents up to its root.
     * First result is the immediate parent.
     */
    parents(): IterableIterator<TreeNodeMutable<V>>;
    /**
     * Iterates over the direct descendents of node
     */
    children(): IterableIterator<TreeNodeMutable<V>>;
    /**
     * Searches direct children, returning the node that has the given `label`
     * @param label
     * @returns
     */
    findChild(label: string): TreeNodeMutable<V> | undefined;
    /**
     * Returns _true_ if this node is root,
     * ie. does not have a parent
     */
    get isRoot(): boolean;
    /**
     * Returns _true_ if this node has no children
     */
    get isEmpty(): boolean;
}
/**
 * Create a root tree node
 * @param value Value associated with node
 * @param label Label for node
 * @returns New TreeNodeMutable instance
 */
declare const treeNodeMutable: <V>(value: V, label: string) => TreeNodeMutable<V>;

type Entry = readonly [name: string, value: any];
/**
 * TreeNode type
 */
type TreeNode = {
    /**
     * Direct children of node
     */
    children(): IterableIterator<TreeNode>;
    /**
     * Chain of parents of node. First result will be immediate parent,
     * last result will be the terminating parent (root)
     */
    parents(): IterableIterator<TreeNode>;
    getLengthChildren?(): number;
};
/**
 * Options for parsing a path
 */
type PathOpts = {
    /**
     * Separator for path, eg '.'
     */
    readonly separator?: string;
    /**
     * If true, [integer] will be used for arrays
     */
    readonly allowArrayIndexes?: boolean;
};
/**
 * Returns _true_ if `p` seems to match the `TreeNode` type.
 * Returns _false_ if `p` is undefined or null.
 *
 * @param p
 * @returns
 */
declare function isTreeNode(p: TreeNode | unknown): p is TreeNode;
/**
 * Returns the count of immediate children for this
 * TreeNode (or map, or plain object)
 *
 * ```js
 * const basicObj = {
 *  john: {
 *    address: { postcode: 1234, city: 'Blahville' }
 *  }
 * }
 * Trees.getLengthChildren(basicObj); // 1
 * ```
 * @param p
 * @returns
 */
declare const getLengthChildren: (p: TreeNode | object) => number;
/**
 * Returns a human-friendly debug string for a tree-like structure
 * ```js
 * console.log(Trees.prettyPrint(obj));
 * ```
 * @param indent
 * @param node
 * @param defaultLabel
 * @returns
 */
declare const prettyPrint: (node: object, indent?: number, defaultLabel?: string) => string;
/**
 * Returns the direct children of a tree-like object as a pairing
 * of node label and value. Supports basic objects, Maps, arrays and {@link TreeNode}s.
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
 * const children = [...Trees.directChildren(o)];
 * // Children:
 * // [
 * //  [ "colour", { b: 0.5, g: 0.5, r: 0.5 }]
 * // ]
 * ```
 *
 * Arrays are assigned a label based on index.
 * @example Arrays
 * ```js
  const colours = [ {r:1,g:0,b:0}, {r:0,g:1,b:0}, {r:0,g:0,b:1} ];
 * // Children:
 * // [
 * //  ["array[0]", {r:1,g:0,b:0}],
 * //  ["array[1]", {r:0,g:1,b:0}],
 * //  ["array[2]", {r:0,g:0,b:1}],
 * // ]
 * ```
 *
 * Pass in `defaultName` (eg 'colours') to have labels generated as 'colours[0]', etc.
 * @param node
 * @param defaultName
 */
declare function directChildren(node: object, defaultName?: string): IterableIterator<Entry>;
/**
 * Returns the closest matching entry, tracing `path` in a tree.
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
 *   colour: 'red'
 *  }
 * }
 * Trees.getByPath('jane.address.postcode', people); // '.' default separator
 * // ['postcode', 1000]
 * Trees.getByPath('jane.address.country.state', people);
 * // ['country', undefined] - since full path could not be resolved.
 * ```
 * @param path Path, eg `jane.address.postcode`
 * @param node Node to look within
 * @param opts Options for parsing path. By default '.' is used as a separator
 * @returns
 */
declare function getByPath(path: string, node: object, opts?: PathOpts): Entry;
/**
 * Enumerates from root over nodes that lead to the given path terminus.
 * Use {@link getByPath} to only fetch the closest matching entry.
 *
 * ```js
 * const people = {
 *  jane: {
 *   address: {
 *    postcode: 1000,
 *    street: 'West St',
 *    city: 'Blahville'
 *   },
 *   colour: 'red'
 *  }
 * }
 * for (const p of Trees.traceByPath('jane.address.street', rootNode)) {
 * // ["jane", { address: { postcode: 1000,street: 'West St', city: 'Blahville' }, colour: 'red'}],
 * // ["address", { postcode: 1000, street: 'West St', city: 'Blahville' }],
 * // ["street","West St"]
 * }
 * ```
 *
 * Results stop when the path can't be followed. The last entry will have a label of
 * the last sought path segment, and _undefined_ as its value.
 *
 * @param path
 * @param node
 * @returns
 */
declare function traceByPath(path: string, node: object, opts?: PathOpts): Iterable<Entry>;
/**
 * Depth-first traversal over object, array, Map or TreeNode
 * @param root
 * @returns
 */
declare function depthFirst(root: object): IterableIterator<Entry>;
/**
 * Breadth-first traversal over object, array, Map or TreeNode
 * @param root
 * @returns
 */
declare function breadthFirst(root: object): IterableIterator<Entry>;
/**
 * Returns _true_ if _possibleChild_ is contained within _parent_ tree.
 * That is, it is any possible sub-child.
 * @param parent Parent tree
 * @param possibleChild Sought child
 * @param eq Equality function, or {@link Util.isEqualDefault} if undefined.
 * @returns
 */
declare const hasAnyChild: <V extends TreeNode>(parent: V, possibleChild: V, eq?: IsEqual<V>) => boolean;
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
 * @param eq Equality function, or {@link Util.isEqualDefault} if undefined.
 * @returns
 */
declare const hasChild: <V extends TreeNode>(parent: V, possibleChild: V, maxDepth?: number, eq?: IsEqual<V>) => boolean;
/**
 * Returns _true_ if `child` exists within `possibleParent`. By default it only looks at the immediate
 * parent (maxDepth: 0). Use Number.MAX_SAFE_INTEGER for searching recursively upwards (or {@link hasAnyParent})
 * @param child Child being sought
 * @param possibleParent Possible parent of child
 * @param maxDepth Max depth of traversal. Default of 0 only looks for immediate parent.
 * @param eq Equality comparison function. {@link Util.isEqualDefault} used by default.
 * @returns
 */
declare const hasParent: <V extends TreeNode>(child: V, possibleParent: V, maxDepth?: number, eq?: IsEqual<V>) => boolean;
/**
 * Returns _true_ if `child` is parented at any level (grand-parented etc) by `possibleParent`
 * @param child Child being sought
 * @param possibleParent Possible parent of child
 * @param eq Equality comparison function {@link Util.isEqualDefault} used by default
 * @returns
 */
declare const hasAnyParent: <V extends TreeNode>(child: V, possibleParent: V, eq?: IsEqual<V>) => boolean;
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
declare const couldAddChild: <V extends TreeNode>(parent: V, prospectiveChild: V, eq?: IsEqual<V>) => void;

type Trees_Entry = Entry;
type Trees_PathOpts = PathOpts;
type Trees_TreeNode = TreeNode;
type Trees_TreeNodeMutable<V> = TreeNodeMutable<V>;
declare const Trees_TreeNodeMutable: typeof TreeNodeMutable;
declare const Trees_breadthFirst: typeof breadthFirst;
declare const Trees_couldAddChild: typeof couldAddChild;
declare const Trees_depthFirst: typeof depthFirst;
declare const Trees_directChildren: typeof directChildren;
declare const Trees_getByPath: typeof getByPath;
declare const Trees_getLengthChildren: typeof getLengthChildren;
declare const Trees_hasAnyChild: typeof hasAnyChild;
declare const Trees_hasAnyParent: typeof hasAnyParent;
declare const Trees_hasChild: typeof hasChild;
declare const Trees_hasParent: typeof hasParent;
declare const Trees_isTreeNode: typeof isTreeNode;
declare const Trees_prettyPrint: typeof prettyPrint;
declare const Trees_traceByPath: typeof traceByPath;
declare const Trees_treeNodeMutable: typeof treeNodeMutable;
declare namespace Trees {
  export {
    Trees_Entry as Entry,
    Trees_PathOpts as PathOpts,
    Trees_TreeNode as TreeNode,
    Trees_TreeNodeMutable as TreeNodeMutable,
    Trees_breadthFirst as breadthFirst,
    Trees_couldAddChild as couldAddChild,
    Trees_depthFirst as depthFirst,
    Trees_directChildren as directChildren,
    Trees_getByPath as getByPath,
    Trees_getLengthChildren as getLengthChildren,
    Trees_hasAnyChild as hasAnyChild,
    Trees_hasAnyParent as hasAnyParent,
    Trees_hasChild as hasChild,
    Trees_hasParent as hasParent,
    Trees_isTreeNode as isTreeNode,
    Trees_prettyPrint as prettyPrint,
    Trees_traceByPath as traceByPath,
    Trees_treeNodeMutable as treeNodeMutable,
  };
}

export { TreeNode as T, Trees as a };
