import {
  StackMutable,
  isEmpty,
  isFull,
  map,
  mutable,
  peek,
  pop,
  push,
  tree_exports
} from "./chunk-R4J7WGCM.js";
import {
  Map_exports,
  NumberMap,
  circularArray,
  immutable
} from "./chunk-NKNAN3KD.js";
import {
  PriorityMutable,
  QueueImmutable,
  queue_exports
} from "./chunk-32Y5CK4C.js";
import {
  QueueMutable
} from "./chunk-6TH2VSQN.js";
import {
  SetStringImmutable,
  SetStringMutable,
  set_exports
} from "./chunk-IOH3DBVT.js";
import {
  __export
} from "./chunk-L5EJU35C.js";

// src/collections/index.ts
var collections_exports = {};
__export(collections_exports, {
  Graphs: () => graphs_exports,
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
  Table: () => Table,
  Trees: () => tree_exports,
  circularArray: () => circularArray
});

// src/collections/stack/index.ts
var stack_exports = {};
__export(stack_exports, {
  immutable: () => immutable2,
  mutable: () => mutable
});

// src/collections/stack/StackImmutable.ts
var StackImmutable = class _StackImmutable {
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
var immutable2 = (options = {}, ...startingItems) => new StackImmutable({ ...options }, [...startingItems]);

// src/collections/graphs/index.ts
var graphs_exports = {};
__export(graphs_exports, {
  Directed: () => DirectedGraph_exports,
  Undirected: () => UndirectedGraph_exports
});

// src/collections/graphs/DirectedGraph.ts
var DirectedGraph_exports = {};
__export(DirectedGraph_exports, {
  adjacentVertices: () => adjacentVertices,
  areAdjacent: () => areAdjacent,
  bfs: () => bfs,
  clone: () => clone,
  connect: () => connect,
  connectTo: () => connectTo,
  createVertex: () => createVertex,
  dfs: () => dfs,
  disconnect: () => disconnect,
  distance: () => distance,
  distanceDefault: () => distanceDefault,
  dumpGraph: () => dumpGraph,
  edges: () => edges,
  getCycles: () => getCycles,
  getOrCreate: () => getOrCreate,
  getOrFail: () => getOrFail,
  graph: () => graph,
  graphFromVertices: () => graphFromVertices,
  hasNoOuts: () => hasNoOuts,
  hasOnlyOuts: () => hasOnlyOuts,
  hasOut: () => hasOut,
  isAcyclic: () => isAcyclic,
  pathDijkstra: () => pathDijkstra,
  toAdjacencyMatrix: () => toAdjacencyMatrix,
  topologicalSort: () => topologicalSort,
  transitiveReduction: () => transitiveReduction,
  updateGraphVertex: () => updateGraphVertex,
  vertexHasOut: () => vertexHasOut,
  vertices: () => vertices
});

// src/collections/Table.ts
var Table = class {
  constructor() {
    this.rows = [];
    this.rowLabels = [];
    this.colLabels = [];
  }
  labelColumns(...labels) {
    this.colLabels = labels;
  }
  labelColumn(columnNumber, label) {
    this.colLabels[columnNumber] = label;
  }
  getColumnLabelIndex(label) {
    for (const [index, l] of this.colLabels.entries()) {
      if (l === label) return index;
    }
  }
  print() {
    console.table([...this.rowsWithLabelsObject()]);
  }
  *rowsWithLabelsArray() {
    for (let index = 0; index < this.rows.length; index++) {
      const labelledRow = this.getRowWithLabelsArray(index);
      yield labelledRow;
    }
  }
  /**
   * Return a copy of table as nested array
   * ```js
   * const t = new Table();
   * // add stuff
   * // ...
   * const m = t.asArray();
   * for (const row of m) {
   *  for (const colValue of row) {
   *    // iterate over all column values for this row
   *  }
   * }
   * ```
   * 
   * Alternative: get value at row Y and column X
   * ```js
   * const value = m[y][x];
   * ```
   * @returns 
   */
  asArray() {
    const r = [];
    for (const row of this.rows) {
      if (row === void 0) r.push([]);
      else r.push([...row]);
    }
    return r;
  }
  /**
   * Return the number of rows
   */
  get rowCount() {
    return this.rows.length;
  }
  /**
   * Return the maximum number of columns in any row
   */
  get columnCount() {
    const lengths = this.rows.map((row) => row.length);
    return Math.max(...lengths);
  }
  *rowsWithLabelsObject() {
    for (let index = 0; index < this.rows.length; index++) {
      const labelledRow = this.getRowWithLabelsObject(index);
      yield labelledRow;
    }
  }
  labelRows(...labels) {
    this.rowLabels = labels;
  }
  appendRow(...data) {
    this.rows.push(data);
  }
  getRowWithLabelsArray(rowNumber) {
    const row = this.rows.at(rowNumber);
    if (row === void 0) return void 0;
    return row.map((value, index) => [this.colLabels.at(index), value]);
  }
  /**
   * Return a row of objects. Keys use the column labels.
   * 
   * ```js
   * const row = table.getRowWithLabelsObject(10);
   * // eg:
   * // [{ colour: red, size: 10}, { colour: blue, size: 20 }]
   * ```
   * @param rowNumber 
   * @returns 
   */
  getRowWithLabelsObject(rowNumber) {
    const row = this.rows.at(rowNumber);
    if (row === void 0) return void 0;
    const object = {};
    for (let index = 0; index < this.colLabels.length; index++) {
      const label = this.colLabels.at(index) ?? index.toString();
      object[label] = row[index];
    }
    return object;
  }
  /**
   * Gets or creates a row at `rowNumber`.
   * @param rowNumber 
   * @returns 
   */
  getOrCreateRow(rowNumber) {
    let row = this.rows.at(rowNumber);
    if (row === void 0) {
      row = [];
      this.rows[rowNumber] = row;
    }
    return row;
  }
  /**
   * Gets the values at `rowNumber`
   * @param rowNumber 
   * @returns 
   */
  row(rowNumber) {
    return this.rows.at(rowNumber);
  }
  /**
   * Set the value of row,column to `value`
   * @param rowNumber 
   * @param columnNumber 
   * @param value 
   */
  set(rowNumber, columnNumber, value) {
    const row = this.getOrCreateRow(rowNumber);
    row[columnNumber] = value;
  }
  get(rowNumber, column) {
    const row = this.getOrCreateRow(rowNumber);
    const index = typeof column === `number` ? column : this.getColumnLabelIndex(column);
    if (index === void 0) throw new Error(`Column not found: ${column}`);
    return row[index];
  }
  /**
   * For a given row number, set all the columns to `value`.
   * `cols` gives the number of columns to set
   * @param rowNumber 
   * @param cols 
   * @param value 
   */
  setRow(rowNumber, cols, value) {
    const row = this.getOrCreateRow(rowNumber);
    for (let columnNumber = 0; columnNumber < cols; columnNumber++) {
      row[columnNumber] = value;
    }
  }
};

// src/collections/graphs/DirectedGraph.ts
var createVertex = (id) => {
  return {
    id,
    out: []
  };
};
function toAdjacencyMatrix(graph3) {
  const v = [...graph3.vertices.values()];
  const table = new Table();
  table.labelColumns(...v.map((vv) => vv.id));
  table.labelRows(...v.map((vv) => vv.id));
  for (let i = 0; i < v.length; i++) {
    table.setRow(i, v.length, false);
    const ii = v[i];
    for (const [j, jj] of v.entries()) {
      if (ii.out.some((o) => o.id === jj.id)) {
        table.set(i, j, true);
      }
    }
  }
  return table;
}
var dumpGraph = (graph3) => {
  const lines = debugGraphToArray(graph3);
  return lines.join(`
`);
};
var debugGraphToArray = (graph3) => {
  const r = [];
  const vertices2 = `vertices` in graph3 ? graph3.vertices.values() : graph3;
  for (const v of vertices2) {
    const str = debugDumpVertex(v);
    r.push(...str.map((line) => ` ${line}`));
  }
  return r;
};
var distance = (graph3, edge) => {
  if (edge.weight !== void 0) return edge.weight;
  return 1;
};
function* edges(graph3) {
  const vertices2 = [...graph3.vertices.values()];
  for (const vertex of vertices2) {
    for (const edge of vertex.out) {
      yield edge;
    }
  }
}
function* vertices(graph3) {
  const vertices2 = [...graph3.vertices.values()];
  for (const vertex of vertices2) {
    yield vertex;
  }
}
function* adjacentVertices(graph3, context) {
  if (context === void 0) return;
  const vertex = typeof context === `string` ? graph3.vertices.get(context) : context;
  if (vertex === void 0) throw new Error(`Vertex not found ${JSON.stringify(context)}`);
  for (const edge of vertex.out) {
    const edgeV = graph3.vertices.get(edge.id);
    if (edgeV === void 0) throw new Error(`Could not find vertex: ${edge.id}`);
    yield edgeV;
  }
}
var vertexHasOut = (vertex, outIdOrVertex) => {
  if (vertex === void 0) return false;
  const outId = typeof outIdOrVertex === `string` ? outIdOrVertex : outIdOrVertex.id;
  return vertex.out.some((edge) => edge.id === outId);
};
var hasNoOuts = (graph3, vertex) => {
  const context = typeof vertex === `string` ? graph3.vertices.get(vertex) : vertex;
  if (context === void 0) return false;
  return context.out.length === 0;
};
var hasOnlyOuts = (graph3, vertex, ...outIdOrVertex) => {
  const context = resolveVertex(graph3, vertex);
  const outs = outIdOrVertex.map((o) => resolveVertex(graph3, o));
  if (outs.length !== context.out.length) {
    return false;
  }
  for (const out of outs) {
    if (!hasOut(graph3, context, out)) {
      return false;
    }
  }
  return true;
};
var hasOut = (graph3, vertex, outIdOrVertex) => {
  const context = resolveVertex(graph3, vertex);
  const outId = typeof outIdOrVertex === `string` ? outIdOrVertex : outIdOrVertex.id;
  return context.out.some((edge) => edge.id === outId);
};
var getOrCreate = (graph3, id) => {
  const v = graph3.vertices.get(id);
  if (v !== void 0) return { graph: graph3, vertex: v };
  const vv = createVertex(id);
  const gg = updateGraphVertex(graph3, vv);
  return { graph: gg, vertex: vv };
};
var getOrFail = (graph3, id) => {
  const v = graph3.vertices.get(id);
  if (v === void 0) throw new Error(`Vertex '${id}' not found in graph`);
  return v;
};
var updateGraphVertex = (graph3, vertex) => {
  const gr = {
    ...graph3,
    vertices: graph3.vertices.set(vertex.id, vertex)
  };
  return gr;
};
var distanceDefault = (graph3, edge) => {
  if (edge.weight !== void 0) return edge.weight;
  return 1;
};
function disconnect(graph3, from, to) {
  const fromV = resolveVertex(graph3, from);
  const toV = resolveVertex(graph3, to);
  return hasOut(graph3, fromV, toV) ? updateGraphVertex(graph3, {
    ...fromV,
    out: fromV.out.filter((t) => t.id !== toV.id)
  }) : graph3;
}
function connectTo(graph3, from, to, weight) {
  const fromResult = getOrCreate(graph3, from);
  graph3 = fromResult.graph;
  const toResult = getOrCreate(graph3, to);
  graph3 = toResult.graph;
  const edge = {
    id: to,
    weight
  };
  if (!hasOut(graph3, fromResult.vertex, toResult.vertex)) {
    graph3 = updateGraphVertex(graph3, {
      ...fromResult.vertex,
      // Add new edge to list of edges for this node
      out: [...fromResult.vertex.out, edge]
    });
  }
  return { graph: graph3, edge };
}
function connect(graph3, options) {
  const { to, weight, from } = options;
  const bidi = options.bidi ?? false;
  const toList = Array.isArray(to) ? to : [to];
  for (const toSingle of toList) {
    const result = connectTo(graph3, from, toSingle, weight);
    graph3 = result.graph;
  }
  if (!bidi) return graph3;
  for (const toSingle of toList) {
    const result = connectTo(graph3, toSingle, from, weight);
    graph3 = result.graph;
  }
  return graph3;
}
var debugDumpVertex = (v) => {
  const r = [
    v.id
  ];
  const stringForEdge2 = (edge) => edge.weight === void 0 ? edge.id : `${edge.id} (${edge.weight})`;
  for (const edge of v.out) {
    r.push(` -> ${stringForEdge2(edge)}`);
  }
  if (v.out.length === 0) r[0] += ` (terminal)`;
  return r;
};
function areAdjacent(graph3, a, b) {
  if (hasOut(graph3, a, b.id)) return true;
  if (hasOut(graph3, b, a.id)) return true;
}
function resolveVertex(graph3, idOrVertex) {
  const v = typeof idOrVertex === `string` ? graph3.vertices.get(idOrVertex) : idOrVertex;
  if (v === void 0) throw new Error(`Id not found ${idOrVertex}`);
  return v;
}
function* bfs(graph3, startIdOrVertex, targetIdOrVertex) {
  const start = resolveVertex(graph3, startIdOrVertex);
  const target = targetIdOrVertex === void 0 ? void 0 : resolveVertex(graph3, targetIdOrVertex);
  const queue = new QueueMutable();
  const seen = /* @__PURE__ */ new Set();
  queue.enqueue(start);
  while (!queue.isEmpty) {
    const v = queue.dequeue();
    yield v;
    if (target !== void 0 && target === v) return;
    for (const edge of adjacentVertices(graph3, v)) {
      if (!seen.has(edge.id)) {
        seen.add(edge.id);
        queue.enqueue(resolveVertex(graph3, edge.id));
      }
    }
  }
}
function* dfs(graph3, startIdOrVertex) {
  const source = resolveVertex(graph3, startIdOrVertex);
  const s = new StackMutable();
  const seen = /* @__PURE__ */ new Set();
  s.push(source);
  while (!s.isEmpty) {
    const v = s.pop();
    if (v === void 0) continue;
    if (!seen.has(v.id)) {
      seen.add(v.id);
      yield v;
      for (const edge of v.out) {
        const destination = graph3.vertices.get(edge.id);
        if (destination) {
          s.push(destination);
        }
      }
    }
  }
}
var pathDijkstra = (graph3, sourceOrId) => {
  const source = typeof sourceOrId === `string` ? graph3.vertices.get(sourceOrId) : sourceOrId;
  if (source === void 0) throw new Error(`source vertex not found`);
  const distances = /* @__PURE__ */ new Map();
  const previous = /* @__PURE__ */ new Map();
  distances.set(source.id, 0);
  const pq = new PriorityMutable();
  const vertices2 = [...graph3.vertices.values()];
  for (const v of vertices2) {
    if (v.id !== source.id) {
      distances.set(v.id, Number.MAX_SAFE_INTEGER);
      previous.set(v.id, null);
    }
    pq.enqueueWithPriority(v.id, Number.MAX_SAFE_INTEGER);
  }
  while (!pq.isEmpty) {
    const u = pq.dequeueMin();
    if (u === void 0) throw new Error(`Bug. Queue unexpectedly empty`);
    const vertexU = graph3.vertices.get(u);
    for (const neighbour of vertexU.out) {
      const alt = distances.get(u) + distance(graph3, neighbour);
      if (alt < distances.get(neighbour.id)) {
        distances.set(neighbour.id, alt);
        previous.set(neighbour.id, vertexU);
        pq.changePriority(neighbour.id, alt, true);
      }
    }
  }
  const pathTo = (id) => {
    const path = [];
    while (true) {
      if (id === source.id) break;
      const v = previous.get(id);
      if (v === void 0 || v === null) throw new Error(`Id not present: ${id}`);
      path.push({ id, weight: distances.get(id) });
      id = v.id;
    }
    return path;
  };
  return {
    distances,
    previous,
    pathTo
  };
};
var clone = (graph3) => {
  const g = {
    vertices: immutable([...graph3.vertices.entries()])
  };
  return g;
};
var graph = (...initialConnections) => {
  let g = {
    vertices: immutable()
  };
  for (const ic of initialConnections) {
    g = connect(g, ic);
  }
  return g;
};
function isAcyclic(graph3) {
  const cycles = getCycles(graph3);
  return cycles.length === 0;
}
function topologicalSort(graph3) {
  const indegrees = new NumberMap(0);
  for (const edge of edges(graph3)) {
    indegrees.add(edge.id, 1);
  }
  const queue = new QueueMutable();
  let vertexCount = 0;
  for (const vertex of vertices(graph3)) {
    if (indegrees.get(vertex.id) === 0) {
      queue.enqueue(vertex);
    }
    vertexCount++;
  }
  const topOrder = [];
  while (!queue.isEmpty) {
    const u = queue.dequeue();
    topOrder.push(u);
    for (const neighbour of u.out) {
      const result = indegrees.subtract(neighbour.id, 1);
      if (result === 0) {
        queue.enqueue(graph3.vertices.get(neighbour.id));
      }
    }
  }
  if (topOrder.length !== vertexCount) {
    throw new Error(`Graph contains cycles`);
  }
  return graphFromVertices(topOrder);
}
function graphFromVertices(vertices2) {
  const keyValues = map(vertices2, (f) => {
    return [f.id, f];
  });
  const m = immutable([...keyValues]);
  return {
    vertices: m
  };
}
function getCycles(graph3) {
  let index = 0;
  const stack = new StackMutable();
  const vertices2 = /* @__PURE__ */ new Map();
  const scc = [];
  for (const v of graph3.vertices.values()) {
    vertices2.set(v.id, {
      ...v,
      lowlink: Number.NaN,
      index: Number.NaN,
      onStack: false
    });
  }
  const strongConnect = (vertex) => {
    vertex.index = index;
    vertex.lowlink = index;
    index++;
    stack.push(vertex);
    vertex.onStack = true;
    for (const edge of vertex.out) {
      const edgeV = vertices2.get(edge.id);
      if (Number.isNaN(edgeV.index)) {
        strongConnect(edgeV);
        vertex.lowlink = Math.min(vertex.lowlink, edgeV.lowlink);
      } else if (edgeV.onStack) {
        vertex.lowlink = Math.min(vertex.lowlink, edgeV.lowlink);
      }
    }
    if (vertex.lowlink === vertex.index) {
      const stronglyConnected = [];
      let w;
      while (vertex !== w) {
        w = stack.pop();
        w.onStack = false;
        stronglyConnected.push({ id: w.id, out: w.out });
      }
      if (stronglyConnected.length > 1)
        scc.push(stronglyConnected);
    }
  };
  for (const v of vertices2.values()) {
    if (Number.isNaN(v.index)) {
      strongConnect(v);
    }
  }
  return scc;
}
function transitiveReduction(graph3) {
  for (const u of vertices(graph3)) {
    for (const v of adjacentVertices(graph3, u)) {
      for (const v1 of dfs(graph3, v)) {
        if (v.id === v1.id) continue;
        if (hasOut(graph3, u, v1)) {
          const g = disconnect(graph3, u, v1);
          return transitiveReduction(g);
        }
      }
    }
  }
  return graph3;
}

// src/collections/graphs/UndirectedGraph.ts
var UndirectedGraph_exports = {};
__export(UndirectedGraph_exports, {
  adjacentVertices: () => adjacentVertices2,
  connect: () => connect2,
  connectTo: () => connectTo2,
  createVertex: () => createVertex2,
  dumpGraph: () => dumpGraph2,
  edgesForVertex: () => edgesForVertex,
  getConnection: () => getConnection,
  getOrCreate: () => getOrCreate2,
  graph: () => graph2,
  hasConnection: () => hasConnection,
  toAdjacencyMatrix: () => toAdjacencyMatrix2,
  updateGraphVertex: () => updateGraphVertex2
});
var createVertex2 = (id) => {
  return {
    id
  };
};
var updateGraphVertex2 = (graph3, vertex) => {
  const gr = {
    ...graph3,
    vertices: graph3.vertices.set(vertex.id, vertex)
  };
  return gr;
};
var getOrCreate2 = (graph3, id) => {
  const v = graph3.vertices.get(id);
  if (v !== void 0) return { graph: graph3, vertex: v };
  const vv = createVertex2(id);
  const gg = updateGraphVertex2(graph3, vv);
  return { graph: gg, vertex: vv };
};
function resolveVertex2(graph3, idOrVertex) {
  const v = typeof idOrVertex === `string` ? graph3.vertices.get(idOrVertex) : idOrVertex;
  if (v === void 0) throw new Error(`Id not found ${idOrVertex}`);
  return v;
}
var hasConnection = (graph3, a, b) => {
  const edge = getConnection(graph3, a, b);
  return edge !== void 0;
};
var getConnection = (graph3, a, b) => {
  const aa = resolveVertex2(graph3, a);
  const bb = resolveVertex2(graph3, b);
  for (const edge of graph3.edges) {
    if (edge.a == aa.id && edge.b === bb.id) return edge;
    if (edge.a == bb.id && edge.b === aa.id) return edge;
  }
  return;
};
function connectTo2(graph3, a, b, weight) {
  const aResult = getOrCreate2(graph3, a);
  graph3 = aResult.graph;
  const bResult = getOrCreate2(graph3, b);
  graph3 = bResult.graph;
  let edge = getConnection(graph3, a, b);
  if (edge !== void 0) return { graph: graph3, edge };
  edge = {
    a,
    b,
    weight
  };
  const graphChanged = {
    ...graph3,
    edges: [...graph3.edges, edge]
  };
  return { graph: graphChanged, edge };
}
function connect2(graph3, options) {
  const { a, weight, b } = options;
  const destinations = Array.isArray(b) ? b : [b];
  for (const destination of destinations) {
    const result = connectTo2(graph3, a, destination, weight);
    graph3 = result.graph;
  }
  return graph3;
}
var graph2 = (...initialConnections) => {
  let g = {
    vertices: immutable(),
    edges: []
  };
  for (const ic of initialConnections) {
    g = connect2(g, ic);
  }
  return g;
};
function toAdjacencyMatrix2(graph3) {
  const v = [...graph3.vertices.values()];
  const table = new Table();
  table.labelColumns(...v.map((vv) => vv.id));
  table.labelRows(...v.map((vv) => vv.id));
  for (let i = 0; i < v.length; i++) {
    table.setRow(i, v.length, false);
    const ii = v[i];
    for (const [j, jj] of v.entries()) {
      const connected = hasConnection(graph3, ii, jj);
      if (connected) {
        table.set(i, j, true);
      }
    }
  }
  return table;
}
var dumpGraph2 = (graph3) => {
  const lines = debugGraphToArray2(graph3);
  return lines.join(`
`);
};
var debugGraphToArray2 = (graph3) => {
  const r = [];
  r.push(`Vertices: ${[...graph3.vertices.values()].map((v) => v.id).join(`, `)}`);
  r.push(`Edges:`);
  for (const edge of graph3.edges) {
    r.push(stringForEdge(edge));
  }
  return r;
};
var stringForEdge = (edge) => {
  const weight = edge.weight ? ` (${edge.weight})` : ``;
  return `${edge.a} <-> ${edge.b}${weight}`;
};
function* adjacentVertices2(graph3, context) {
  if (context === void 0) return;
  const vertex = typeof context === `string` ? graph3.vertices.get(context) : context;
  if (vertex === void 0) throw new Error(`Vertex not found ${JSON.stringify(context)}`);
  for (const edge of graph3.edges) {
    if (edge.a === context) yield resolveVertex2(graph3, edge.b);
    else if (edge.b === context) yield resolveVertex2(graph3, edge.a);
  }
}
function* edgesForVertex(graph3, context) {
  if (context === void 0) return;
  const vertex = typeof context === `string` ? graph3.vertices.get(context) : context;
  if (vertex === void 0) throw new Error(`Vertex not found ${JSON.stringify(context)}`);
  for (const edge of graph3.edges) {
    if (edge.a === context) yield edge;
    else if (edge.b === context) yield edge;
  }
}

export {
  StackImmutable,
  stack_exports,
  Table,
  connect,
  graph,
  graphs_exports,
  collections_exports
};
//# sourceMappingURL=chunk-I3HI45DP.js.map