/**
 * Source: https://github.com/amejiarosario/dsa.js-data-structures-algorithms-javascript/blob/c20acfb32f057355fa51fc0fedbdacebcab78baf/src/data-structures/trees/tree-node.js
 * License: MIT
 */
declare class TreeNode<V> {
    value: V;
    descendants: TreeNode<V>[];
    constructor(value: V);
}
/***
 * Breadth-first traversal
 */
declare function bfs<V>(root: TreeNode<V>): Generator<TreeNode<V> | undefined, void, unknown>;
/**
 * Depth-first traversal
 * @param root
 * @returns
 */
declare function dfs<V>(root: TreeNode<V>): Generator<TreeNode<V> | undefined, void, unknown>;

type Trees_TreeNode<V> = TreeNode<V>;
declare const Trees_TreeNode: typeof TreeNode;
declare const Trees_bfs: typeof bfs;
declare const Trees_dfs: typeof dfs;
declare namespace Trees {
  export {
    Trees_TreeNode as TreeNode,
    Trees_bfs as bfs,
    Trees_dfs as dfs,
  };
}

export { TreeNode as T, Trees as a };
