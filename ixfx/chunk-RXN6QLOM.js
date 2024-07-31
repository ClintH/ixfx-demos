import {
  tree_exports
} from "./chunk-OFFDJ4UM.js";
import {
  StackImmutable,
  immutable as immutable2
} from "./chunk-M2XIICMK.js";
import {
  ExpiringMap,
  Map_exports,
  circularArray
} from "./chunk-DIMQ6WOR.js";
import {
  QueueImmutable,
  queue_exports
} from "./chunk-2LUR5STP.js";
import {
  SetStringImmutable,
  SetStringMutable,
  set_exports
} from "./chunk-FKXNN6PM.js";
import {
  DirectedGraph_exports,
  Table
} from "./chunk-FVOMQHH6.js";
import {
  StackMutable,
  mutable
} from "./chunk-33YLZAWN.js";
import {
  immutable
} from "./chunk-XFNQJV53.js";
import {
  QueueMutable
} from "./chunk-4RHG66EP.js";
import {
  MapOfSimpleMutable
} from "./chunk-YSD5376E.js";
import {
  __export
} from "./chunk-L5EJU35C.js";

// src/collections/index.ts
var collections_exports = {};
__export(collections_exports, {
  ExpiringMap: () => ExpiringMap,
  Graphs: () => graphs_exports,
  MapOfSimpleMutable: () => MapOfSimpleMutable,
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

// src/collections/graphs/index.ts
var graphs_exports = {};
__export(graphs_exports, {
  Directed: () => DirectedGraph_exports,
  Undirected: () => UndirectedGraph_exports
});

// src/collections/graphs/UndirectedGraph.ts
var UndirectedGraph_exports = {};
__export(UndirectedGraph_exports, {
  adjacentVertices: () => adjacentVertices,
  connect: () => connect,
  connectTo: () => connectTo,
  connectWithEdges: () => connectWithEdges,
  createVertex: () => createVertex,
  dumpGraph: () => dumpGraph,
  edgesForVertex: () => edgesForVertex,
  getConnection: () => getConnection,
  getOrCreate: () => getOrCreate,
  graph: () => graph,
  hasConnection: () => hasConnection,
  toAdjacencyMatrix: () => toAdjacencyMatrix,
  updateGraphVertex: () => updateGraphVertex
});
var createVertex = (id) => {
  return {
    id
  };
};
var updateGraphVertex = (graph2, vertex) => {
  const gr = {
    ...graph2,
    vertices: graph2.vertices.set(vertex.id, vertex)
  };
  return gr;
};
var getOrCreate = (graph2, id) => {
  const v = graph2.vertices.get(id);
  if (v !== void 0) return { graph: graph2, vertex: v };
  const vv = createVertex(id);
  const gg = updateGraphVertex(graph2, vv);
  return { graph: gg, vertex: vv };
};
function resolveVertex(graph2, idOrVertex) {
  if (idOrVertex === void 0) throw new Error(`Param 'idOrVertex' is undefined. Expected string or Vertex`);
  if (graph2 === void 0) throw new Error(`Param 'graph' is undefined. Expected Graph`);
  const v = typeof idOrVertex === `string` ? graph2.vertices.get(idOrVertex) : idOrVertex;
  if (v === void 0) throw new Error(`Id not found ${idOrVertex}`);
  return v;
}
var hasConnection = (graph2, a, b) => {
  const edge = getConnection(graph2, a, b);
  return edge !== void 0;
};
var getConnection = (graph2, a, b) => {
  if (a === void 0) throw new Error(`Param 'a' is undefined. Expected string or Vertex`);
  if (b === void 0) throw new Error(`Param 'b' is undefined. Expected string or Vertex`);
  if (graph2 === void 0) throw new Error(`Param 'graph' is undefined. Expected Graph`);
  const aa = resolveVertex(graph2, a);
  const bb = resolveVertex(graph2, b);
  for (const edge of graph2.edges) {
    if (edge.a == aa.id && edge.b === bb.id) return edge;
    if (edge.a == bb.id && edge.b === aa.id) return edge;
  }
  return;
};
function connectTo(graph2, a, b, weight) {
  const aResult = getOrCreate(graph2, a);
  graph2 = aResult.graph;
  const bResult = getOrCreate(graph2, b);
  graph2 = bResult.graph;
  let edge = getConnection(graph2, a, b);
  if (edge !== void 0) return { graph: graph2, edge };
  edge = {
    a,
    b,
    weight
  };
  const graphChanged = {
    ...graph2,
    edges: [...graph2.edges, edge]
  };
  return { graph: graphChanged, edge };
}
function connect(graph2, options) {
  const result = connectWithEdges(graph2, options);
  return result.graph;
}
function connectWithEdges(graph2, options) {
  const { a, weight, b } = options;
  const destinations = Array.isArray(b) ? b : [b];
  let edges = [];
  for (const destination of destinations) {
    const result = connectTo(graph2, a, destination, weight);
    graph2 = result.graph;
    edges.push(result.edge);
  }
  return { graph: graph2, edges };
}
var graph = (...initialConnections) => {
  let g = {
    vertices: immutable(),
    edges: []
  };
  for (const ic of initialConnections) {
    g = connect(g, ic);
  }
  return g;
};
function toAdjacencyMatrix(graph2) {
  const v = [...graph2.vertices.values()];
  const table = new Table();
  table.labelColumns(...v.map((vv) => vv.id));
  table.labelRows(...v.map((vv) => vv.id));
  for (let i = 0; i < v.length; i++) {
    table.setRow(i, v.length, false);
    const ii = v[i];
    for (const [j, jj] of v.entries()) {
      const connected = hasConnection(graph2, ii, jj);
      if (connected) {
        table.set(i, j, true);
      }
    }
  }
  return table;
}
var dumpGraph = (graph2) => {
  const lines = debugGraphToArray(graph2);
  return lines.join(`
`);
};
var debugGraphToArray = (graph2) => {
  const r = [];
  r.push(`Vertices: ${[...graph2.vertices.values()].map((v) => v.id).join(`, `)}`);
  r.push(`Edges:`);
  for (const edge of graph2.edges) {
    r.push(stringForEdge(edge));
  }
  return r;
};
var stringForEdge = (edge) => {
  const weight = edge.weight ? ` (${edge.weight})` : ``;
  return `${edge.a} <-> ${edge.b}${weight}`;
};
function* adjacentVertices(graph2, context) {
  if (context === void 0) return;
  const vertex = typeof context === `string` ? graph2.vertices.get(context) : context;
  if (vertex === void 0) throw new Error(`Vertex not found ${JSON.stringify(context)}`);
  for (const edge of graph2.edges) {
    if (edge.a === context) yield resolveVertex(graph2, edge.b);
    else if (edge.b === context) yield resolveVertex(graph2, edge.a);
  }
}
function* edgesForVertex(graph2, context) {
  if (context === void 0) return;
  const vertex = typeof context === `string` ? graph2.vertices.get(context) : context;
  if (vertex === void 0) throw new Error(`Vertex not found ${JSON.stringify(context)}`);
  for (const edge of graph2.edges) {
    if (edge.a === context) yield edge;
    else if (edge.b === context) yield edge;
  }
}

export {
  stack_exports,
  graphs_exports,
  collections_exports
};
//# sourceMappingURL=chunk-RXN6QLOM.js.map