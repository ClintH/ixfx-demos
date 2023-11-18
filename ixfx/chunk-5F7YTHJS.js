import {
  Bipolar_exports,
  flip
} from "./chunk-6RYWFF4G.js";
import {
  compareData,
  getField,
  getPathsAndData,
  isEqualContextString,
  updateByPath
} from "./chunk-LNCFJFAU.js";
import {
  PointTracker,
  TrackedPointMap,
  pointTracker,
  pointsTracker
} from "./chunk-IYC664IV.js";
import {
  scale,
  scaleClamped,
  scalePercent,
  scalePercentages,
  scaler,
  scalerPercent
} from "./chunk-LQ2RK4OW.js";
import {
  NumberTracker,
  PrimitiveTracker,
  TrackedValueMap,
  TrackerBase,
  numberTracker
} from "./chunk-D6MMLAFL.js";
import {
  NumberMap,
  immutable
} from "./chunk-Q6AX6JVR.js";
import {
  PriorityMutable,
  queue_exports
} from "./chunk-IEB4AISO.js";
import {
  StackMutable
} from "./chunk-EKQK4G3I.js";
import {
  IterableSync_exports
} from "./chunk-IC4XTFPE.js";
import {
  KeyValue_exports,
  getSorter
} from "./chunk-FQHO5ZXN.js";
import {
  DispatchList,
  Elapsed_exports,
  QueueMutable,
  average,
  averageWeighted,
  clamp,
  clampIndex,
  interpolate,
  interpolateAngle,
  minMaxAvg,
  wrap,
  wrapInteger,
  wrapRange
} from "./chunk-HR35CHTB.js";
import {
  SimpleEventEmitter
} from "./chunk-WW6RH5H5.js";
import {
  IterableAsync_exports,
  intervalToMs,
  sleep,
  toStringDefault2 as toStringDefault
} from "./chunk-7X5X4U3O.js";
import {
  throwIntegerTest,
  throwNumberTest
} from "./chunk-X6JJYMWG.js";
import {
  logSet
} from "./chunk-NEQZAMQB.js";
import {
  __export
} from "./chunk-VE7DK22H.js";

// src/data/index.ts
var data_exports = {};
__export(data_exports, {
  Bipolar: () => Bipolar_exports,
  Chains: () => Chain_exports,
  Correlate: () => Correlate_exports,
  FrequencyMutable: () => FrequencyMutable,
  Graphs: () => graphs_exports,
  IntervalTracker: () => IntervalTracker,
  Normalise: () => Normalise_exports,
  NumberTracker: () => NumberTracker,
  PointTracker: () => PointTracker,
  Pool: () => Pool_exports,
  PrimitiveTracker: () => PrimitiveTracker,
  Reactive: () => Reactive_exports,
  Table: () => Table,
  TrackedPointMap: () => TrackedPointMap,
  TrackedValueMap: () => TrackedValueMap,
  TrackerBase: () => TrackerBase,
  clamp: () => clamp,
  clampIndex: () => clampIndex,
  flip: () => flip,
  frequencyMutable: () => frequencyMutable,
  interpolate: () => interpolate,
  interpolateAngle: () => interpolateAngle,
  intervalTracker: () => intervalTracker,
  movingAverage: () => movingAverage,
  movingAverageLight: () => movingAverageLight,
  movingAverageTimed: () => movingAverageTimed,
  noiseFilter: () => noiseFilter,
  numberTracker: () => numberTracker,
  piPi: () => piPi,
  pointTracker: () => pointTracker,
  pointsTracker: () => pointsTracker,
  scale: () => scale,
  scaleClamped: () => scaleClamped,
  scalePercent: () => scalePercent,
  scalePercentages: () => scalePercentages,
  scaler: () => scaler,
  scalerPercent: () => scalerPercent,
  trackUnique: () => trackUnique,
  wrap: () => wrap,
  wrapInteger: () => wrapInteger,
  wrapRange: () => wrapRange
});

// src/data/Normalise.ts
var Normalise_exports = {};
__export(Normalise_exports, {
  array: () => array,
  stream: () => stream
});
var stream = (minDefault, maxDefault) => {
  let min2 = minDefault ?? Number.MAX_SAFE_INTEGER;
  let max2 = maxDefault ?? Number.MIN_SAFE_INTEGER;
  throwNumberTest(minDefault);
  throwNumberTest(maxDefault);
  return (v) => {
    throwNumberTest(v);
    min2 = Math.min(min2, v);
    max2 = Math.max(max2, v);
    return scale(v, min2, max2);
  };
};
var array = (values, minForced, maxForced) => {
  if (!Array.isArray(values)) {
    throw new Error(`values param should be an array`);
  }
  const mma = minMaxAvg(values);
  const min2 = minForced ?? mma.min;
  const max2 = maxForced ?? mma.max;
  return values.map((v) => clamp(scale(v, min2, max2)));
};

// src/data/FrequencyMutable.ts
var FrequencyMutable = class extends SimpleEventEmitter {
  #store;
  #keyString;
  /**
   * Constructor
   * @param keyString Function to key items. Uses JSON.stringify by default
   */
  constructor(keyString = void 0) {
    super();
    this.#store = /* @__PURE__ */ new Map();
    if (keyString === void 0) {
      keyString = (a) => {
        if (a === void 0)
          throw new Error(`Cannot create key for undefined`);
        if (typeof a === `string`) {
          return a;
        } else {
          return JSON.stringify(a);
        }
      };
    }
    this.#keyString = keyString;
  }
  /**
   * Clear data. Fires `change` event
   */
  clear() {
    this.#store.clear();
    this.fireEvent(`change`, void 0);
  }
  /**
   * @returns Iterator over keys (ie. groups)
   */
  keys() {
    return this.#store.keys();
  }
  /**
   * @returns Iterator over frequency counts
   */
  values() {
    return this.#store.values();
  }
  /**
   * @returns Copy of entries as an array of `[key, count]`
   */
  toArray() {
    return Array.from(this.#store.entries());
  }
  /**
   * Returns a string with keys and counts, useful for debugging.
   * @returns
   */
  debugString() {
    let t = ``;
    for (const [key, count] of this.#store.entries()) {
      t += `${key}: ${count}, `;
    }
    if (t.endsWith(`, `))
      return t.substring(0, t.length - 2);
    return t;
  }
  /**
   *
   * @param value Value to count
   * @returns Frequency of value, or _undefined_ if it does not exist
   */
  frequencyOf(value) {
    if (typeof value === `string`)
      return this.#store.get(value);
    const key = this.#keyString(value);
    return this.#store.get(key);
  }
  /**
   *
   * @param value Value to count
   * @returns Relative frequency of `value`, or _undefined_ if it does not exist
   */
  relativeFrequencyOf(value) {
    let freq;
    if (typeof value === `string`)
      freq = this.#store.get(value);
    else {
      const key = this.#keyString(value);
      freq = this.#store.get(key);
    }
    if (freq === void 0)
      return;
    const mma = this.minMaxAvg();
    return freq / mma.total;
  }
  /**
   * @returns Copy of entries as an array
   */
  entries() {
    return Array.from(this.#store.entries());
  }
  /**
   *
   * @returns Returns `{min,max,avg,total}`
   */
  minMaxAvg() {
    return KeyValue_exports.minMaxAvg(this.entries());
  }
  /**
   *
   * @param sortStyle Sorting style (default: _value_, ie. count)
   * @returns Sorted array of [key,frequency]
   */
  entriesSorted(sortStyle = `value`) {
    const s = getSorter(sortStyle);
    return s(this.entries());
  }
  /**
   *
   * @param values Values to add. Fires _change_ event after adding item(s)
   */
  //eslint-disable-next-line functional/prefer-immutable-types
  add(...values) {
    if (values === void 0)
      throw new Error(`value parameter is undefined`);
    const keys = values.map(this.#keyString);
    keys.forEach((key) => {
      const score = this.#store.get(key) ?? 0;
      this.#store.set(key, score + 1);
    });
    this.fireEvent(`change`, void 0);
  }
};
var frequencyMutable = (keyString) => new FrequencyMutable(keyString);

// src/data/MovingAverage.ts
var movingAverageLight = (scaling = 3) => {
  throwNumberTest(scaling, `aboveZero`, `scaling`);
  let average3 = 0;
  let count = 0;
  let disposed = false;
  const ma = {
    dispose() {
      disposed = true;
    },
    get isDisposed() {
      return disposed;
    },
    add(v) {
      if (disposed)
        throw new Error(`MovingAverage disposed, cannot add`);
      count++;
      average3 = average3 + (v - average3) / Math.min(count, scaling);
      return average3;
    },
    clear() {
      if (disposed)
        throw new Error(`MovingAverage disposed, cannot clear`);
      average3 = 0;
      count = 0;
    },
    compute() {
      return average3;
    }
  };
  return ma;
};
var movingAverageTimed = (updateRateMs = 200, value = 0, scaling = 3) => {
  throwNumberTest(scaling, `aboveZero`, `scaling`);
  throwNumberTest(updateRateMs, `aboveZero`, `decayRateMs`);
  const mal = movingAverageLight(scaling);
  let timer = 0;
  const reschedule = () => {
    if (timer !== 0)
      clearTimeout(timer);
    timer = setTimeout(decay, updateRateMs);
  };
  const decay = () => {
    mal.add(value);
    if (!mal.isDisposed)
      setTimeout(decay, updateRateMs);
  };
  const ma = {
    add(v) {
      reschedule();
      return mal.add(v);
    },
    dispose() {
      mal.dispose();
    },
    clear: function() {
      mal.clear();
    },
    compute: function() {
      return mal.compute();
    },
    isDisposed: false
  };
  return ma;
};
var movingAverage = (samples = 100, weighter) => {
  let disposed = false;
  let q = new QueueMutable({
    capacity: samples,
    discardPolicy: `older`
  });
  const clear = () => {
    q = new QueueMutable({
      capacity: samples,
      discardPolicy: `older`
    });
  };
  const compute = () => {
    return weighter === void 0 ? average(q.data) : averageWeighted(q.data, weighter);
  };
  const add = (v) => {
    q.enqueue(v);
    return compute();
  };
  const dispose = () => {
    disposed = true;
  };
  return { add, compute, clear, dispose, isDisposed: disposed };
};
var PiPi = Math.PI * 2;
var smoothingFactor = (timeDelta, cutoff) => {
  const r = PiPi * cutoff * timeDelta;
  return r / (r + 1);
};
var exponentialSmoothing = (smoothingFactor2, value, previous) => {
  return smoothingFactor2 * value + (1 - smoothingFactor2) * previous;
};
var noiseFilter = (cutoffMin = 1, speedCoefficient = 0, cutoffDefault = 1) => {
  let previousValue = 0;
  let derivativeLast = 0;
  let timestampLast = 0;
  const compute = (value, timestamp) => {
    if (timestamp === void 0)
      timestamp = performance.now();
    const timeDelta = timestamp - timestampLast;
    const s = smoothingFactor(timeDelta, cutoffDefault);
    const valueDelta = (value - previousValue) / timeDelta;
    const derivative = exponentialSmoothing(s, valueDelta, derivativeLast);
    const cutoff = cutoffMin + speedCoefficient * Math.abs(derivative);
    const a = smoothingFactor(timeDelta, cutoff);
    const smoothed = exponentialSmoothing(a, value, previousValue);
    previousValue = smoothed;
    derivativeLast = derivative;
    timestampLast = timestamp;
    return smoothed;
  };
  return compute;
};

// src/data/IntervalTracker.ts
var IntervalTracker = class extends NumberTracker {
  lastMark = 0;
  mark() {
    if (this.lastMark > 0) {
      this.seen(window.performance.now() - this.lastMark);
    }
    this.lastMark = window.performance.now();
  }
};
var intervalTracker = (opts) => new IntervalTracker(opts);

// src/data/Reactive.ts
var Reactive_exports = {};
__export(Reactive_exports, {
  batch: () => batch,
  event: () => event,
  field: () => field,
  generator: () => generator,
  hasValue: () => hasValue,
  isSignal: () => isSignal,
  manual: () => manual,
  mergeAsArray: () => mergeAsArray,
  number: () => number,
  object: () => object,
  prepare: () => prepare,
  resolveAfter: () => resolveAfter,
  resolveSource: () => resolveSource,
  synchronise: () => synchronise,
  throttle: () => throttle,
  toArray: () => toArray,
  transform: () => transform,
  win: () => win
});

// src/data/graphs/DirectedGraph.ts
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

// src/data/Table.ts
var Table = class {
  rows = [];
  rowLabels = [];
  colLabels = [];
  labelColumns(...labels) {
    this.colLabels = labels;
  }
  labelColumn(columnNumber, label) {
    this.colLabels[columnNumber] = label;
  }
  getColumnLabelIndex(label) {
    for (const [index, l] of this.colLabels.entries()) {
      if (l === label)
        return index;
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
      if (row === void 0)
        r.push([]);
      else
        r.push([...row]);
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
    if (row === void 0)
      return void 0;
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
    if (row === void 0)
      return void 0;
    const object2 = {};
    for (let index = 0; index < this.colLabels.length; index++) {
      const label = this.colLabels.at(index) ?? index.toString();
      object2[label] = row[index];
    }
    return object2;
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
    if (index === void 0)
      throw new Error(`Column not found: ${column}`);
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

// src/data/graphs/DirectedGraph.ts
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
  if (edge.weight !== void 0)
    return edge.weight;
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
  if (context === void 0)
    return;
  const vertex = typeof context === `string` ? graph3.vertices.get(context) : context;
  if (vertex === void 0)
    throw new Error(`Vertex not found ${JSON.stringify(context)}`);
  for (const edge of vertex.out) {
    const edgeV = graph3.vertices.get(edge.id);
    if (edgeV === void 0)
      throw new Error(`Could not find vertex: ${edge.id}`);
    yield edgeV;
  }
}
var vertexHasOut = (vertex, outIdOrVertex) => {
  if (vertex === void 0)
    return false;
  const outId = typeof outIdOrVertex === `string` ? outIdOrVertex : outIdOrVertex.id;
  return vertex.out.some((edge) => edge.id === outId);
};
var hasNoOuts = (graph3, vertex) => {
  const context = typeof vertex === `string` ? graph3.vertices.get(vertex) : vertex;
  if (context === void 0)
    return false;
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
  if (v !== void 0)
    return { graph: graph3, vertex: v };
  const vv = createVertex(id);
  const gg = updateGraphVertex(graph3, vv);
  return { graph: gg, vertex: vv };
};
var getOrFail = (graph3, id) => {
  const v = graph3.vertices.get(id);
  if (v === void 0)
    throw new Error(`Vertex '${id}' not found in graph`);
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
  if (edge.weight !== void 0)
    return edge.weight;
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
  if (!bidi)
    return graph3;
  for (const toSingle of toList) {
    const result = connectTo(graph3, toSingle, from, weight);
    graph3 = result.graph;
  }
  return graph3;
}
var debugDumpVertex = (v) => {
  const r = [
    `${v.id}`
  ];
  const stringForEdge2 = (edge) => edge.weight === void 0 ? edge.id : `${edge.id} (${edge.weight})`;
  for (const edge of v.out) {
    r.push(` -> ${stringForEdge2(edge)}`);
  }
  if (v.out.length === 0)
    r[0] += ` (terminal)`;
  return r;
};
function areAdjacent(graph3, a, b) {
  if (hasOut(graph3, a, b.id))
    return true;
  if (hasOut(graph3, b, a.id))
    return true;
}
function resolveVertex(graph3, idOrVertex) {
  const v = typeof idOrVertex === `string` ? graph3.vertices.get(idOrVertex) : idOrVertex;
  if (v === void 0)
    throw new Error(`Id not found ${idOrVertex}`);
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
    if (target !== void 0 && target === v)
      return;
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
    if (v === void 0)
      continue;
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
  if (source === void 0)
    throw new Error(`source vertex not found`);
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
    if (u === void 0)
      throw new Error(`Bug. Queue unexpectedly empty`);
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
      if (id === source.id)
        break;
      const v = previous.get(id);
      if (v === void 0 || v === null)
        throw new Error(`Id not present: ${id}`);
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
  const keyValues = IterableSync_exports.map(vertices2, (f) => {
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
        if (v.id === v1.id)
          continue;
        if (hasOut(graph3, u, v1)) {
          const g = disconnect(graph3, u, v1);
          return transitiveReduction(g);
        }
      }
    }
  }
  return graph3;
}

// src/data/Reactive.ts
function isSignal(v) {
  if (v.value !== void 0)
    return false;
  if (`signal` in v && v.signal !== void 0)
    return true;
  return false;
}
function hasValue(v) {
  if (v.value !== void 0)
    return true;
  return false;
}
function number(initialValue) {
  let value = initialValue;
  const events = initEvent();
  const set = (v) => {
    value = v;
    events.notify(v);
  };
  return {
    dispose: events.dispose,
    isDisposed: events.isDisposed,
    last: () => value,
    on: events.on,
    set
  };
}
function mergeAsArray(...values) {
  const event2 = initEvent();
  const data = [];
  for (const [index, v] of values.entries()) {
    data[index] = void 0;
    v.on((valueChanged) => {
      if (!isSignal(valueChanged)) {
        data[index] = valueChanged.value;
      }
      event2.notify(data);
    });
  }
  return {
    on: event2.on
  };
}
function synchronise(...sources) {
  const event2 = initEvent();
  let data = [];
  for (const [index, v] of sources.entries()) {
    data[index] = void 0;
    v.on((valueChanged) => {
      if (isSignal(valueChanged)) {
        if (valueChanged.signal === `done`) {
          sources.splice(index, 1);
        }
        return;
      }
      data[index] = valueChanged.value;
      if (!data.includes(void 0)) {
        event2.notify(data);
        data = [];
      }
    });
  }
  return {
    on: event2.on
  };
}
function resolveAfter(interval, callbackOrValue, options = {}) {
  const intervalMs = intervalToMs(interval, 0);
  const event2 = initEvent();
  const loops = options.infinite ? Number.MAX_SAFE_INTEGER : options.loops ?? 1;
  let remaining = loops;
  const run2 = () => {
    if (typeof callbackOrValue === `function`) {
      const value = callbackOrValue();
      event2.notify(value);
    } else {
      event2.notify(callbackOrValue);
    }
    remaining--;
    if (remaining > 0) {
      setTimeout(run2, intervalMs);
    }
  };
  setTimeout(run2, intervalMs);
  const r = {
    on: event2.on
  };
  return r;
}
function event(target, name, options = {}) {
  const process = options.process;
  const initialValue = process ? process() : void 0;
  const rxObject = initialValue ? object(initialValue, { deepEntries: true }) : object(void 0, { deepEntries: true });
  const lazy2 = options.lazy ?? false;
  let eventAdded = false;
  let disposed = false;
  const callback = (args) => {
    rxObject.set(process ? process(args) : args);
  };
  const remove = () => {
    if (!eventAdded)
      return;
    eventAdded = false;
    target.removeEventListener(name, callback);
  };
  const add = () => {
    if (eventAdded)
      return;
    eventAdded = true;
    target.addEventListener(name, callback);
  };
  if (!lazy2)
    add();
  return {
    last: () => {
      if (lazy2)
        add();
      return rxObject.last();
    },
    dispose: (reason) => {
      if (disposed)
        return;
      disposed = true;
      remove();
      rxObject.dispose(reason);
    },
    isDisposed() {
      return disposed;
    },
    on: (handler) => {
      if (lazy2)
        add();
      return rxObject.on(handler);
    }
  };
}
function manual() {
  const events = initEvent();
  return {
    set(value) {
      events.notify(value);
    },
    on: events.on
  };
}
function object(initialValue, options = {}) {
  const eq = options.eq ?? isEqualContextString;
  const setEvent = initEvent();
  const diffEvent = initEvent();
  let value = initialValue;
  let disposed = false;
  const set = (v) => {
    if (value !== void 0) {
      const diff = compareData(value, v, ``, options);
      if (diff.length === 0)
        return;
      diffEvent.notify(diff);
    }
    value = v;
    setEvent.notify(v);
  };
  const update = (toMerge) => {
    const pd = getPathsAndData(toMerge);
    if (value === void 0) {
      value = toMerge;
    } else {
      const diff = compareData(toMerge, value);
      if (diff.length === 0)
        return;
      value = {
        ...value,
        ...toMerge
      };
      diffEvent.notify(pd);
    }
    setEvent.notify(value);
  };
  const updateField = (path, valueForField) => {
    if (value === void 0)
      throw new Error(`Cannot update value when it has not already been set`);
    const existing = getField(value, path);
    if (eq(existing, valueForField, path))
      return;
    const o = updateByPath(value, path, valueForField);
    value = o;
    diffEvent.notify([{ path, value: valueForField, previous: existing }]);
    setEvent.notify(o);
  };
  const dispose = (reason) => {
    if (disposed)
      return;
    diffEvent.dispose(reason);
    setEvent.dispose(reason);
    disposed = true;
  };
  return {
    dispose,
    isDisposed() {
      return disposed;
    },
    /**
     * Update a field.
     * Exception is thrown if field does not exist
     */
    updateField,
    last: () => value,
    on: setEvent.on,
    onDiff: diffEvent.on,
    /**
     * Set the whole object
     */
    set,
    /**
     * Update the object with a partial set of fields and values
     */
    update
  };
}
function initEvent(options = {}) {
  let dispatcher;
  let disposed = false;
  let firstSubscribe = false;
  let emptySubscriptions = true;
  const onFirstSubscribe = options.onFirstSubscribe ?? void 0;
  const onNoSubscribers = options.onNoSubscribers ?? void 0;
  const isEmpty = () => {
    if (dispatcher === void 0)
      return;
    if (!dispatcher.isEmpty)
      return;
    if (!emptySubscriptions) {
      emptySubscriptions = true;
      firstSubscribe = false;
      if (onNoSubscribers)
        onNoSubscribers();
    }
  };
  return {
    dispose: (reason) => {
      if (disposed)
        return;
      dispatcher?.notify({ value: void 0, signal: `done`, context: `Disposed: ${reason}` });
      disposed = true;
    },
    isDisposed: () => {
      return disposed;
    },
    clear: () => {
      dispatcher?.clear();
      isEmpty();
    },
    notify: (v) => {
      if (disposed)
        throw new Error(`Disposed`);
      dispatcher?.notify({ value: v });
    },
    through: (pass) => {
      if (disposed)
        throw new Error(`Disposed`);
      dispatcher?.notify(pass);
    },
    signal: (signal, context) => {
      if (disposed)
        throw new Error(`Disposed`);
      dispatcher?.notify({ signal, value: void 0, context });
    },
    on: (handler) => {
      if (disposed)
        throw new Error(`Disposed`);
      if (dispatcher === void 0)
        dispatcher = new DispatchList();
      const id = dispatcher.add(handler);
      if (!firstSubscribe) {
        firstSubscribe = true;
        if (onFirstSubscribe)
          setTimeout(() => {
            onFirstSubscribe();
          }, 10);
      }
      return () => {
        dispatcher?.remove(id);
        isEmpty();
      };
    }
  };
}
var initUpstream = (upstreamSource, options) => {
  const lazy2 = options.lazy ?? true;
  const disposeIfSourceDone = options.disposeIfSourceDone ?? true;
  const onValue = options.onValue ?? ((_v) => {
  });
  const source = resolveSource(upstreamSource);
  let unsub;
  const start = () => {
    if (unsub !== void 0)
      return;
    if (options.onStart)
      options.onStart();
    unsub = source.on((value) => {
      if (isSignal(value)) {
        if (value.signal === `done`) {
          stop();
          if (disposeIfSourceDone)
            events.dispose(`Source is completed`);
        } else {
          events.through(value);
        }
      } else if (hasValue(value)) {
        onValue(value.value);
      }
    });
  };
  const stop = () => {
    if (unsub === void 0)
      return;
    unsub();
    unsub = void 0;
    if (options.onStop)
      options.onStop();
  };
  const initOpts = {
    onFirstSubscribe() {
      if (lazy2)
        start();
    },
    onNoSubscribers() {
      if (lazy2)
        stop();
    }
  };
  if (!lazy2)
    start();
  const events = initEvent(initOpts);
  return events;
};
function field(fieldSource, field2, options = {}) {
  const upstream = initUpstream(fieldSource, {
    disposeIfSourceDone: true,
    ...options,
    onValue(value) {
      let t = value[field2];
      if (t === void 0 && options.missingFieldDefault !== void 0) {
        t = options.missingFieldDefault;
      }
      upstream.notify(t);
    }
  });
  return {
    on: upstream.on
  };
}
function transform(input, transformer, options = {}) {
  const upstream = initUpstream(input, {
    ...options,
    onValue(value) {
      const t = transformer(value);
      upstream.notify(t);
    }
  });
  return {
    on: upstream.on
  };
}
function generator(generator2, options = {}) {
  const lazy2 = options.lazy ?? true;
  let reading = false;
  const eventOpts = {
    onFirstSubscribe() {
      if (lazy2 && !reading) {
        readingStart();
      }
    },
    onNoSubscribers() {
      if (lazy2 && reading) {
        reading = false;
      }
    }
  };
  const events = initEvent(eventOpts);
  const read = async () => {
    try {
      const v = await generator2.next();
      if (v.done) {
        events.dispose(`Generator complete`);
        return;
      }
      if (!reading)
        return;
      events.notify(v.value);
    } catch (error) {
      events.dispose(`Generator error: ${error.toString()}`);
      return;
    }
    if (events.isDisposed())
      return;
    if (!reading)
      return;
    setTimeout(read);
  };
  const readingStart = () => {
    if (reading)
      return;
    reading = true;
    void read();
  };
  if (!lazy2)
    readingStart();
  return {
    on: events.on,
    dispose: events.dispose,
    isDisposed: events.isDisposed
  };
}
var resolveSource = (source) => {
  if (`on` in source)
    return source;
  if (Array.isArray(source)) {
    return generator(source.values(), { lazy: true });
  } else {
    return generator(source, { lazy: true });
  }
};
function batch(batchSource, options = {}) {
  const elapsed = intervalToMs(options.elapsed, 0);
  const queue = new QueueMutable();
  const limit = options.limit ?? 0;
  const logic = options.logic ?? `or`;
  const returnRemainder = options.returnRemainder ?? true;
  let lastFire = performance.now();
  const upstreamOpts = {
    ...options,
    onStop() {
      if (returnRemainder && !queue.isEmpty) {
        const data = queue.toArray();
        queue.clear();
        upstream.notify(data);
      }
    },
    onValue(value) {
      queue.enqueue(value);
      trigger();
    }
  };
  const upstream = initUpstream(batchSource, upstreamOpts);
  const trigger = () => {
    const now = performance.now();
    let byElapsed = false;
    let byLimit = false;
    if (elapsed > 0 && now - lastFire > elapsed) {
      lastFire = now;
      byElapsed = true;
    }
    if (limit > 0 && queue.length >= limit) {
      byLimit = true;
    }
    if (logic === `or` && (!byElapsed && !byLimit))
      return;
    if (logic === `and` && (!byElapsed || !byLimit))
      return;
    const data = queue.toArray();
    queue.clear();
    upstream.notify(data);
  };
  const r = {
    on: upstream.on
  };
  return r;
}
var toArray = async (reactiveSource, options = {}) => {
  const source = resolveSource(reactiveSource);
  const maxValues = options.limit ?? Number.MAX_SAFE_INTEGER;
  const maxDuration = options.elapsed ?? Number.MAX_SAFE_INTEGER;
  let buffer = [];
  let start = -1;
  const promise = new Promise((resolve, _reject) => {
    const done = () => {
      off();
      resolve(buffer);
      buffer = [];
    };
    const off = source.on((value) => {
      if (start === -1)
        start = Date.now();
      if (isSignal(value) && value.signal === `done`) {
        done();
      } else if (hasValue(value)) {
        buffer.push(value.value);
        if (buffer.length >= maxValues) {
          done();
        }
      }
      if (Date.now() - start > maxDuration) {
        done();
      }
    });
  });
  return promise;
};
function throttle(throttleSource, options = {}) {
  const elapsed = intervalToMs(options.elapsed, 0);
  let lastFire = performance.now();
  let lastValue;
  const upstream = initUpstream(throttleSource, {
    ...options,
    onValue(value) {
      lastValue = value;
      trigger();
    }
  });
  const trigger = () => {
    const now = performance.now();
    let byElapsed = false;
    if (elapsed > 0 && now - lastFire > elapsed) {
      lastFire = now;
      byElapsed = true;
    }
    if (!byElapsed)
      return;
    if (lastValue !== void 0) {
      upstream.notify(lastValue);
    }
  };
  const r = {
    on: upstream.on
  };
  return r;
}
function win() {
  const generateRect = () => ({ width: window.innerWidth, height: window.innerHeight });
  const size = event(window, `resize`, {
    lazy: true,
    process: () => generateRect()
  });
  const pointer = event(window, `pointermove`, {
    lazy: true,
    process: (args) => {
      if (args === void 0)
        return { x: 0, y: 0 };
      const pe = args;
      return { x: pe.x, y: pe.y };
    }
  });
  const dispose = (reason = `Reactive.win.dispose`) => {
    size.dispose(reason);
    pointer.dispose(reason);
  };
  return { dispose, size, pointer };
}
function isReactive(o) {
  if (typeof o !== `object`)
    return false;
  if (`on` in o) {
    return typeof o.on === `function`;
  }
  return false;
}
function prepare(rx) {
  let g = graph();
  const nodes = /* @__PURE__ */ new Map();
  const events = initEvent();
  const process = (o, path) => {
    for (const [key, value] of Object.entries(o)) {
      const subPath = path + `.` + key;
      g = connect(g, {
        from: path,
        to: subPath
      });
      if (isReactive(value)) {
        nodes.set(subPath, { value, type: `rx` });
        value.on((v) => {
          console.log(`Reactive.prepare value: ${JSON.stringify(v)} path: ${subPath}`);
        });
      } else {
        const valueType = typeof value;
        if (valueType === `bigint` || valueType === `boolean` || valueType === `number` || valueType === `string`) {
          nodes.set(subPath, { type: `primitive`, value });
        } else if (valueType === `object`) {
          process(value, subPath);
        } else if (valueType === `function`) {
          console.log(`Reactive.process - not handling functions`);
        }
      }
    }
  };
  const returnValue = {
    graph: g,
    on: events.on
  };
  return returnValue;
}

// src/data/Chain.ts
var Chain_exports = {};
__export(Chain_exports, {
  addToArray: () => addToArray,
  asArray: () => asArray,
  asCallback: () => asCallback,
  asPromise: () => asPromise,
  asValue: () => asValue,
  average: () => average2,
  chunk: () => chunk,
  debounce: () => debounce,
  delay: () => delay,
  drop: () => drop,
  duration: () => duration,
  filter: () => filter,
  flatten: () => flatten,
  fromEvent: () => fromEvent,
  fromFunction: () => fromFunction,
  lazy: () => lazy,
  max: () => max,
  mergeAsArray: () => mergeAsArray2,
  mergeFlat: () => mergeFlat,
  min: () => min,
  prepare: () => prepare2,
  run: () => run,
  single: () => single,
  synchronise: () => synchronise2,
  take: () => take,
  tally: () => tally,
  tick: () => tick,
  total: () => total,
  transform: () => transform2
});

// src/Iterable.ts
var isAsyncIterable = (v) => Symbol.asyncIterator in new Object(v);

// src/data/Chain.ts
function* primitiveToGenerator(value) {
  yield value;
}
async function* primitiveToAsyncGenerator(value) {
  yield value;
  await sleep(1);
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
function delay(options) {
  const before = intervalToMs(options.before, 0);
  const after = intervalToMs(options.after, 0);
  async function* delay2(input) {
    input = resolveToGen(input);
    for await (const value of input) {
      if (before > 0) {
        await sleep(before);
      }
      yield value;
      if (after > 0) {
        await sleep(after);
      }
    }
  }
  delay2._name = `delay`;
  return delay2;
}
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
          throw new Error(`Function '${getName(c)}' requires input. Provide it to the function, or call 'input' earlier.`);
        }
      } else {
        d = c(d);
      }
    }
    return d;
  };
  const w = {
    asGenerator,
    transform: (transformer) => {
      chained.push(transform2(transformer));
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
      chained.push(filter(predicate));
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
      chained.push(average2());
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
    asAsync(data) {
      let d = data ?? dataToUse;
      for (const c of chained) {
        if (d === void 0 && isNoInput(c)) {
          d = c();
        } else if (d === void 0) {
          throw new Error(`Function '${getName(c)}' needs input. Pass in data calling 'asAsync', or call 'input' earlier`);
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
function debounce(rate) {
  const rateMs = intervalToMs(rate, 0);
  async function* debounce2(input) {
    input = resolveToGen(input);
    let elapsed = Elapsed_exports.since();
    for await (const value of input) {
      if (elapsed() < rateMs)
        continue;
      yield value;
      elapsed = Elapsed_exports.since();
    }
  }
  debounce2._name = `debounce`;
  return debounce2;
}
function duration(elapsed) {
  const durationMs = intervalToMs(elapsed, 0);
  async function* duration2(input) {
    input = resolveToGen(input);
    const elapsed2 = Elapsed_exports.since();
    for await (const value of input) {
      if (elapsed2() > durationMs)
        break;
      yield value;
    }
  }
  duration2._name = `duration`;
  return duration2;
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
  for await (const value of outputType) {
    callback(value);
  }
  if (onDone)
    onDone();
}
async function asArray(valueToWrap) {
  const outputType = typeof valueToWrap === `function` ? valueToWrap() : valueToWrap;
  return IterableAsync_exports.toArray(outputType);
}
async function addToArray(array2, valueToWrap) {
  const outputType = typeof valueToWrap === `function` ? valueToWrap() : valueToWrap;
  for await (const value of outputType) {
    array2.push(value);
  }
}
async function single(f, input) {
  const iterator = await f([input]).next();
  return iterator.value;
}
function flatten(flattener) {
  async function* flatten2(input) {
    input = resolveToGen(input);
    for await (const value of input) {
      yield flattener(value);
    }
  }
  flatten2._name = `flatten`;
  return flatten2;
}
function transform2(transformer) {
  async function* transform3(input) {
    input = resolveToGen(input);
    for await (const value of input) {
      yield transformer(value);
    }
  }
  transform3._name = `transform`;
  return transform3;
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
async function* mergeAsArray2(...sources) {
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
async function* synchronise2(...sources) {
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
function take(limit) {
  async function* take2(input) {
    input = resolveToGen(input);
    let yielded = 0;
    for await (const value of input) {
      if (++yielded > limit)
        break;
      yield value;
    }
  }
  take2._name = `take`;
  return take2;
}
var getName = (c) => {
  if (`_name` in c) {
    return c._name;
  } else {
    return c.name;
  }
};
function tally() {
  async function* tally2(input) {
    input = resolveToGen(input);
    let count = 0;
    for await (const _ of input) {
      yield ++count;
    }
  }
  tally2._name = `tally`;
  return tally2;
}
function min() {
  async function* min2(input) {
    input = resolveToGen(input);
    let min3 = Number.MAX_SAFE_INTEGER;
    for await (const value of input) {
      if (typeof value !== `number`)
        break;
      min3 = Math.min(value, min3);
      yield min3;
    }
  }
  min2._name = `min`;
  return min2;
}
function max() {
  async function* max2(input) {
    input = resolveToGen(input);
    let max3 = Number.MIN_SAFE_INTEGER;
    for await (const value of input) {
      if (typeof value !== `number`)
        break;
      max3 = Math.max(value, max3);
      yield max3;
    }
  }
  max2._name = `max`;
  return max2;
}
function average2() {
  async function* average3(input) {
    input = resolveToGen(input);
    let total2 = 0;
    let count = 0;
    for await (const value of input) {
      if (typeof value !== `number`)
        break;
      count++;
      total2 += value;
      yield total2 / count;
    }
  }
  average3._name = `average`;
  return average3;
}
function total() {
  async function* average3(input) {
    input = resolveToGen(input);
    let total2 = 0;
    for await (const value of input) {
      if (typeof value !== `number`)
        break;
      total2 += value;
      yield total2;
    }
  }
  average3._name = `average`;
  return average3;
}
function chunk(size, returnRemainders = true) {
  throwIntegerTest(size, `aboveZero`, `size`);
  async function* chunk2(input) {
    input = resolveToGen(input);
    let buffer = [];
    for await (const value of input) {
      buffer.push(value);
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
function filter(predicate) {
  async function* filter2(input) {
    input = resolveToGen(input);
    for await (const value of input) {
      if (predicate(value)) {
        yield value;
      }
    }
  }
  filter2._name = `filter`;
  return filter2;
}
function drop(predicate) {
  async function* drop2(input) {
    input = resolveToGen(input);
    for await (const value of input) {
      if (!predicate(value)) {
        yield value;
      }
    }
  }
  drop2._name = `drop`;
  return drop2;
}
async function* run(...functions) {
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
function prepare2(...functions) {
  const r = (source) => {
    return run(source, ...functions);
  };
  return r;
}

// src/data/graphs/index.ts
var graphs_exports = {};
__export(graphs_exports, {
  Directed: () => DirectedGraph_exports,
  Undirected: () => UndirectedGraph_exports
});

// src/data/graphs/UndirectedGraph.ts
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
  if (v !== void 0)
    return { graph: graph3, vertex: v };
  const vv = createVertex2(id);
  const gg = updateGraphVertex2(graph3, vv);
  return { graph: gg, vertex: vv };
};
function resolveVertex2(graph3, idOrVertex) {
  const v = typeof idOrVertex === `string` ? graph3.vertices.get(idOrVertex) : idOrVertex;
  if (v === void 0)
    throw new Error(`Id not found ${idOrVertex}`);
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
    if (edge.a == aa.id && edge.b === bb.id)
      return edge;
    if (edge.a == bb.id && edge.b === aa.id)
      return edge;
  }
  return;
};
function connectTo2(graph3, a, b, weight) {
  const aResult = getOrCreate2(graph3, a);
  graph3 = aResult.graph;
  const bResult = getOrCreate2(graph3, b);
  graph3 = bResult.graph;
  let edge = getConnection(graph3, a, b);
  if (edge !== void 0)
    return { graph: graph3, edge };
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
  if (context === void 0)
    return;
  const vertex = typeof context === `string` ? graph3.vertices.get(context) : context;
  if (vertex === void 0)
    throw new Error(`Vertex not found ${JSON.stringify(context)}`);
  for (const edge of graph3.edges) {
    if (edge.a === context)
      yield resolveVertex2(graph3, edge.b);
    else if (edge.b === context)
      yield resolveVertex2(graph3, edge.a);
  }
}
function* edgesForVertex(graph3, context) {
  if (context === void 0)
    return;
  const vertex = typeof context === `string` ? graph3.vertices.get(context) : context;
  if (vertex === void 0)
    throw new Error(`Vertex not found ${JSON.stringify(context)}`);
  for (const edge of graph3.edges) {
    if (edge.a === context)
      yield edge;
    else if (edge.b === context)
      yield edge;
  }
}

// src/data/TrackUnique.ts
var trackUnique = (toString = toStringDefault) => {
  const set = /* @__PURE__ */ new Set();
  return (value) => {
    const asString = typeof value === `string` ? value : toString(value);
    if (set.has(asString))
      return false;
    set.add(asString);
    return true;
  };
};

// src/data/Correlate.ts
var Correlate_exports = {};
__export(Correlate_exports, {
  align: () => align,
  alignById: () => alignById
});
var orderScore = (a, b) => {
  if (a.score > b.score)
    return -1;
  else if (a.score < b.score)
    return 1;
  return 0;
};
var align = (similarityFn, lastData, newData, opts = {}) => {
  const matchThreshold = opts.matchThreshold ?? 0;
  const debug = opts.debug ?? false;
  const results = /* @__PURE__ */ new Map();
  const newThings = [];
  const lastMap = /* @__PURE__ */ new Map();
  lastData?.forEach((d, index) => {
    if (d === void 0) {
      throw new Error(`'lastData' contains undefined (index: ${index})`);
    }
    lastMap.set(d.id, d);
  });
  for (let i = 0; i < newData.length; i++) {
    const newD = newData[i];
    if (!lastData || lastData.length === 0) {
      if (debug)
        console.debug(`Correlate.align() new id: ${newD.id}`);
      newThings.push(newD);
      continue;
    }
    const scoredLastValues = Array.from(lastMap.values()).map((last) => ({
      id: last.id,
      score: last === null ? -1 : similarityFn(last, newD),
      last
    }));
    if (scoredLastValues.length === 0) {
      if (debug) {
        console.debug(`Correlate.align() no valid last values id: ${newD.id}`);
      }
      newThings.push(newD);
      continue;
    }
    scoredLastValues.sort(orderScore);
    const top = scoredLastValues[0];
    if (top.score < matchThreshold) {
      if (debug) {
        console.debug(
          `Correlate.align() new item does not reach threshold. Top score: ${top.score} id: ${newD.id}`
        );
      }
      newThings.push(newD);
      continue;
    }
    if (debug && top.id !== newD.id) {
      console.log(
        `Correlate.align() Remapped ${newD.id} -> ${top.id} (score: ${top.score})`
      );
    }
    results.set(top.id, { ...newD, id: top.id });
    lastMap.delete(top.id);
  }
  newThings.forEach((t) => results.set(t.id, t));
  return Array.from(results.values());
};
var alignById = (fn, opts = {}) => {
  let lastData = [];
  const compute = (newData) => {
    lastData = align(fn, lastData, newData, opts);
    return [...lastData];
  };
  return compute;
};

// src/data/Pool.ts
var Pool_exports = {};
__export(Pool_exports, {
  Pool: () => Pool,
  PoolUser: () => PoolUser,
  Resource: () => Resource,
  create: () => create
});
var PoolUser = class extends SimpleEventEmitter {
  /**
   * Constructor
   * @param key User key
   * @param resource Resource being used
   */
  //eslint-disable-next-line functional/prefer-immutable-types
  constructor(key, resource) {
    super();
    this.key = key;
    this.resource = resource;
    this._lastUpdate = performance.now();
    this._pool = resource.pool;
    this._userExpireAfterMs = this._pool.userExpireAfterMs;
    this._state = `idle`;
    this._pool.log.log(`PoolUser ctor key: ${this.key}`);
  }
  _lastUpdate;
  _pool;
  _state;
  _userExpireAfterMs;
  /**
   * Returns a human readable debug string
   * @returns
   */
  toString() {
    if (this.isDisposed)
      return `PoolUser. State: disposed`;
    return `PoolUser. State: ${this._state} Elapsed: ${performance.now() - this._lastUpdate} Data: ${JSON.stringify(this.resource.data)}`;
  }
  /**
   * Resets countdown for instance expiry.
   * Throws an error if instance is disposed.
   */
  keepAlive() {
    if (this._state === `disposed`)
      throw new Error(`PoolItem disposed`);
    this._lastUpdate = performance.now();
  }
  /**
   * @internal
   * @param reason
   * @returns
   */
  _dispose(reason) {
    if (this._state === `disposed`)
      return;
    const resource = this.resource;
    const data = resource.data;
    this._state = `disposed`;
    resource._release(this);
    this._pool.log.log(`PoolUser dispose key: ${this.key} reason: ${reason}`);
    this.fireEvent(`disposed`, { data, reason });
    super.clearEventListeners();
  }
  /**
   * Release this instance
   * @param reason
   */
  release(reason) {
    if (this.isDisposed)
      throw new Error(`User disposed`);
    const resource = this.resource;
    const data = resource.data;
    this._pool.log.log(`PoolUser release key: ${this.key} reason: ${reason}`);
    this.fireEvent(`released`, { data, reason });
    this._dispose(`release-${reason}`);
  }
  // #region Properties
  get data() {
    if (this.isDisposed)
      throw new Error(`User disposed`);
    return this.resource.data;
  }
  /**
   * Returns true if this instance has expired.
   * Expiry counts if elapsed time is greater than `userExpireAfterMs`
   */
  get isExpired() {
    if (this._userExpireAfterMs > 0) {
      return performance.now() > this._lastUpdate + this._userExpireAfterMs;
    }
    return false;
  }
  /**
   * Returns elapsed time since last 'update'
   */
  get elapsed() {
    return performance.now() - this._lastUpdate;
  }
  /**
   * Returns true if instance is disposed
   */
  get isDisposed() {
    return this._state === `disposed`;
  }
  /**
   * Returns true if instance is neither disposed nor expired
   */
  get isValid() {
    if (this.isDisposed || this.isExpired)
      return false;
    if (this.resource.isDisposed)
      return false;
    return true;
  }
  // #endregion
};
var Resource = class {
  /**
   * Constructor.
   * @param pool Pool
   * @param data Data
   */
  constructor(pool, data) {
    this.pool = pool;
    if (data === void 0)
      throw new Error(`Parameter 'data' is undefined`);
    if (pool === void 0)
      throw new Error(`Parameter 'pool' is undefined`);
    this.#data = data;
    this.#lastUsersChange = 0;
    this.#resourcesWithoutUserExpireAfterMs = pool.resourcesWithoutUserExpireAfterMs;
    this.#capacityPerResource = pool.capacityPerResource;
    this.#users = [];
    this.#state = `idle`;
  }
  #state;
  #data;
  #users;
  #capacityPerResource;
  #resourcesWithoutUserExpireAfterMs;
  #lastUsersChange;
  /**
   * Gets data associated with resource.
   * Throws an error if disposed
   */
  get data() {
    if (this.#state === `disposed`)
      throw new Error(`Resource disposed`);
    return this.#data;
  }
  /**
   * Changes the data associated with this resource.
   * Throws an error if disposed or `data` is undefined.
   * @param data
   */
  updateData(data) {
    if (this.#state === `disposed`)
      throw new Error(`Resource disposed`);
    if (data === void 0)
      throw new Error(`Parameter 'data' is undefined`);
    this.#data = data;
  }
  /**
   * Returns a human-readable debug string for resource
   * @returns
   */
  toString() {
    return `Resource (expired: ${this.isExpiredFromUsers} users: ${this.#users.length}, state: ${this.#state}) data: ${JSON.stringify(this.data)}`;
  }
  /**
   * Assigns a user to this resource.
   * @internal
   * @param user
   */
  _assign(user) {
    const existing = this.#users.find((u) => u === user || u.key === user.key);
    if (existing)
      throw new Error(`User instance already assigned to resource`);
    this.#users.push(user);
    this.#lastUsersChange = performance.now();
  }
  /**
   * Releases a user from this resource
   * @internal
   * @param user
   */
  _release(user) {
    this.#users = this.#users.filter((u) => u !== user);
    this.pool._release(user);
    this.#lastUsersChange = performance.now();
  }
  /**
   * Returns true if resource can have additional users allocated
   */
  get hasUserCapacity() {
    return this.usersCount < this.#capacityPerResource;
  }
  /**
   * Returns number of uses of the resource
   */
  get usersCount() {
    return this.#users.length;
  }
  /**
   * Returns true if automatic expiry is enabled, and that interval
   * has elapsed since the users list has changed for this resource
   */
  get isExpiredFromUsers() {
    if (this.#resourcesWithoutUserExpireAfterMs <= 0)
      return false;
    if (this.#users.length > 0)
      return false;
    return performance.now() > this.#resourcesWithoutUserExpireAfterMs + this.#lastUsersChange;
  }
  /**
   * Returns true if instance is disposed
   */
  get isDisposed() {
    return this.#state === `disposed`;
  }
  /**
   * Disposes the resource.
   * If it is already disposed, it does nothing.
   * @param reason
   * @returns
   */
  dispose(reason) {
    if (this.#state === `disposed`)
      return;
    const data = this.#data;
    this.#state = `disposed`;
    this.pool.log.log(`Resource disposed (${reason})`);
    for (const u of this.#users) {
      u._dispose(`resource-${reason}`);
    }
    this.#users = [];
    this.#lastUsersChange = performance.now();
    this.pool._releaseResource(this, reason);
    if (this.pool.freeResource)
      this.pool.freeResource(data);
  }
};
var Pool = class {
  _resources;
  _users;
  capacity;
  userExpireAfterMs;
  resourcesWithoutUserExpireAfterMs;
  capacityPerResource;
  fullPolicy;
  generateResource;
  freeResource;
  log;
  /**
   * Constructor.
   *
   * By default, no capacity limit, one user per resource
   * @param opts Pool options
   */
  constructor(opts = {}) {
    this.capacity = opts.capacity ?? -1;
    this.fullPolicy = opts.fullPolicy ?? `error`;
    this.capacityPerResource = opts.capacityPerResource ?? 1;
    this.userExpireAfterMs = opts.userExpireAfterMs ?? -1;
    this.resourcesWithoutUserExpireAfterMs = opts.resourcesWithoutUserExpireAfterMs ?? -1;
    this.generateResource = opts.generate;
    this.freeResource = opts.free;
    this._users = /* @__PURE__ */ new Map();
    this._resources = [];
    this.log = logSet(`Pool`, opts.debug ?? false);
    const timer = Math.max(
      this.userExpireAfterMs,
      this.resourcesWithoutUserExpireAfterMs
    );
    if (timer > 0) {
      setInterval(() => {
        this.maintain();
      }, timer * 1.1);
    }
  }
  /**
   * Returns a debug string of Pool state
   * @returns
   */
  dumpToString() {
    let r = `Pool
    capacity: ${this.capacity} userExpireAfterMs: ${this.userExpireAfterMs} capacityPerResource: ${this.capacityPerResource}
    resources count: ${this._resources.length}`;
    const resource = this._resources.map((r2) => r2.toString()).join(`\r
	`);
    r += `\r
Resources:\r
	` + resource;
    r += `\r
Users: \r
`;
    for (const [k, v] of this._users.entries()) {
      r += `	k: ${k} v: ${v.toString()}\r
`;
    }
    return r;
  }
  /**
   * Sorts users by longest elapsed time since update
   * @returns
   */
  getUsersByLongestElapsed() {
    return [...this._users.values()].sort((a, b) => {
      const aa = a.elapsed;
      const bb = b.elapsed;
      if (aa === bb)
        return 0;
      if (aa < bb)
        return 1;
      return -1;
    });
  }
  /**
   * Returns resources sorted with least used first
   * @returns
   */
  getResourcesSortedByUse() {
    return [...this._resources].sort((a, b) => {
      if (a.usersCount === b.usersCount)
        return 0;
      if (a.usersCount < b.usersCount)
        return -1;
      return 1;
    });
  }
  /**
   * Adds a resource to the pool.
   * Throws an error if the capacity limit is reached.
   * @param resource
   * @returns
   */
  addResource(resource) {
    if (resource === void 0) {
      throw new Error(`Cannot add undefined resource`);
    }
    if (resource === null)
      throw new Error(`Cannot add null resource`);
    if (this.capacity > 0 && this._resources.length === this.capacity) {
      throw new Error(
        `Capacity limit (${this.capacity}) reached. Cannot add more.`
      );
    }
    this.log.log(`Adding resource: ${JSON.stringify(resource)}`);
    const pi = new Resource(this, resource);
    this._resources.push(pi);
    return pi;
  }
  /**
   * Performs maintenance, removing disposed/expired resources & users.
   * This is called automatically when using a resource.
   */
  maintain() {
    let changed = false;
    const nuke = [];
    for (const p of this._resources) {
      if (p.isDisposed) {
        this.log.log(`Maintain, disposed resource: ${JSON.stringify(p.data)}`);
        nuke.push(p);
      } else if (p.isExpiredFromUsers) {
        this.log.log(`Maintain, expired resource: ${JSON.stringify(p.data)}`);
        nuke.push(p);
      }
    }
    if (nuke.length > 0) {
      for (const resource of nuke) {
        resource.dispose(`diposed/expired`);
      }
      changed = true;
    }
    const userKeysToRemove = [];
    for (const [key, user] of this._users.entries()) {
      if (!user.isValid) {
        this.log.log(
          `Maintain. Invalid user: ${user.key} (Disposed: ${user.isDisposed} Expired: ${user.isExpired} Resource disposed: ${user.resource.isDisposed})`
        );
        userKeysToRemove.push(key);
        user._dispose(`invalid`);
      }
    }
    for (const userKey of userKeysToRemove) {
      this._users.delete(userKey);
      changed = true;
    }
    if (changed) {
      this.log.log(
        `End: resource len: ${this._resources.length} users: ${this.usersLength}`
      );
    }
  }
  /**
   * Iterate over resources in the pool.
   * To iterate over the data associated with each resource, use
   * `values`.
   */
  *resources() {
    const resource = [...this._resources];
    for (const r of resource) {
      yield r;
    }
  }
  /**
   * Iterate over resource values in the pool.
   * to iterate over the resources, use `resources`.
   *
   * Note that values may be returned even though there is no
   * active user.
   */
  *values() {
    const resource = [...this._resources];
    for (const r of resource) {
      yield r.data;
    }
  }
  /**
   * Unassociate a key with a pool item
   * @param userKey
   */
  release(userKey, reason) {
    const pi = this._users.get(userKey);
    if (!pi)
      return;
    pi.release(reason ?? `Pool.release`);
  }
  /**
   * @internal
   * @param user
   */
  //eslint-disable-next-line functional/prefer-immutable-types
  _release(user) {
    this._users.delete(user.key);
  }
  /**
   * @internal
   * @param resource
   * @param _
   */
  //eslint-disable-next-line functional/prefer-immutable-types
  _releaseResource(resource, _) {
    this._resources = this._resources.filter((v) => v !== resource);
  }
  /**
   * Returns true if `v` has an associted resource in the pool
   * @param resource
   * @returns
   */
  hasResource(resource) {
    const found = this._resources.find((v) => v.data === resource);
    return found !== void 0;
  }
  /**
   * Returns true if a given `userKey` is in use.
   * @param userKey
   * @returns
   */
  hasUser(userKey) {
    return this._users.has(userKey);
  }
  /**
   * @internal
   * @param key
   * @param resource
   * @returns
   */
  //eslint-disable-next-line functional/prefer-immutable-types
  _assign(key, resource) {
    const u = new PoolUser(key, resource);
    this._users.set(key, u);
    resource._assign(u);
    return u;
  }
  /**
   * @internal
   * @param userKey
   * @returns
   */
  _findUser(userKey) {
    const sorted = this.getResourcesSortedByUse();
    if (sorted.length > 0 && sorted[0].hasUserCapacity) {
      const u = this._assign(userKey, sorted[0]);
      return u;
    }
    if (this.generateResource && (this.capacity < 0 || this._resources.length < this.capacity)) {
      this.log.log(
        `capacity: ${this.capacity} resources: ${this._resources.length}`
      );
      const resourceGenerated = this.addResource(this.generateResource());
      const u = this._assign(userKey, resourceGenerated);
      return u;
    }
  }
  /**
   * Return the number of users
   */
  get usersLength() {
    return [...this._users.values()].length;
  }
  /**
   * 'Uses' a resource, returning the value
   * @param userKey
   * @returns
   */
  useValue(userKey) {
    const resource = this.use(userKey);
    return resource.resource.data;
  }
  /**
   * Gets a pool item based on a user key.
   * The same key should return the same pool item,
   * for as long as it still exists.
   * @param userKey
   * @returns
   */
  use(userKey) {
    const pi = this._users.get(userKey);
    if (pi) {
      pi.keepAlive();
      return pi;
    }
    this.maintain();
    const match = this._findUser(userKey);
    if (match)
      return match;
    if (this.fullPolicy === `error`) {
      console.log(this.dumpToString());
      throw new Error(
        `Pool is fully used (fullPolicy: ${this.fullPolicy}, capacity: ${this.capacity})`
      );
    }
    if (this.fullPolicy === `evictOldestUser`) {
      const users = this.getUsersByLongestElapsed();
      if (users.length > 0) {
        this.release(users[0].key, `evictedOldestUser`);
        const match2 = this._findUser(userKey);
        if (match2)
          return match2;
      }
    }
    throw new Error(`Pool is fully used (${this.fullPolicy})`);
  }
};
var create = (opts = {}) => new Pool(opts);

// src/data/index.ts
var piPi = Math.PI * 2;

export {
  Normalise_exports,
  FrequencyMutable,
  frequencyMutable,
  movingAverageLight,
  movingAverageTimed,
  movingAverage,
  noiseFilter,
  IntervalTracker,
  intervalTracker,
  Table,
  Reactive_exports,
  Chain_exports,
  graphs_exports,
  trackUnique,
  Correlate_exports,
  Pool_exports,
  piPi,
  data_exports
};
//# sourceMappingURL=chunk-5F7YTHJS.js.map