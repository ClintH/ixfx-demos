import {
  stringSegmentsEndToEnd,
  stringSegmentsStartToStart
} from "./chunk-PJQ7J6OJ.js";
import {
  resolveEl
} from "./chunk-L3UAAAAG.js";
import {
  compareArrays
} from "./chunk-PQR7SZNU.js";
import {
  compareData,
  getField,
  getPathsAndData,
  isEqualContextString,
  map,
  updateByPath
} from "./chunk-UG5VC4V5.js";
import {
  NumberMap,
  immutable
} from "./chunk-6KC5Y434.js";
import {
  PriorityMutable
} from "./chunk-LTVMQVYQ.js";
import {
  DispatchList,
  continuously,
  timeout
} from "./chunk-A6Y6VVSF.js";
import {
  StackMutable
} from "./chunk-6QSGM2TM.js";
import {
  afterMatch,
  beforeMatch
} from "./chunk-7KTY42OF.js";
import {
  IterableSync_exports
} from "./chunk-6P2L4NAZ.js";
import {
  QueueMutable
} from "./chunk-75D4WLYC.js";
import {
  getFromKeys,
  insertAt,
  remove,
  shuffle
} from "./chunk-YM25TBRP.js";
import {
  intervalToMs,
  isEqualValueDefault,
  isPlainObjectOrPrimitive
} from "./chunk-XJES6KLL.js";
import {
  __export
} from "./chunk-Q2EHUQVZ.js";

// src/rx/index.ts
var rx_exports = {};
__export(rx_exports, {
  Dom: () => Dom_exports,
  LitHtml: () => x,
  Ops: () => Ops,
  annotate: () => annotate,
  annotateElapsed: () => annotateElapsed,
  batch: () => batch,
  cloneFromFields: () => cloneFromFields,
  debounce: () => debounce,
  field: () => field,
  filter: () => filter,
  fromArray: () => fromArray,
  fromEvent: () => fromEvent,
  fromGenerator: () => fromGenerator,
  fromObject: () => fromObject,
  fromProxy: () => fromProxy,
  fromProxySymbol: () => fromProxySymbol,
  fromQuery: () => fromQuery,
  generator: () => generator,
  hasLast: () => hasLast,
  isDisposable: () => isDisposable,
  lit: () => lit,
  manual: () => manual,
  mergeAsArray: () => mergeAsArray,
  messageHasValue: () => messageHasValue,
  messageIsDoneSignal: () => messageIsDoneSignal,
  messageIsSignal: () => messageIsSignal,
  number: () => number,
  observable: () => observable,
  observableWritable: () => observableWritable,
  opify: () => opify,
  pipe: () => pipe,
  prepare: () => prepare,
  readFromArray: () => readFromArray,
  resolve: () => resolve,
  run: () => run,
  singleFromArray: () => singleFromArray,
  split: () => split,
  splitLabelled: () => splitLabelled,
  switcher: () => switcher,
  symbol: () => symbol,
  synchronise: () => synchronise,
  throttle: () => throttle,
  to: () => to,
  toArray: () => toArray,
  toArrayOrThrow: () => toArrayOrThrow,
  toGenerator: () => toGenerator,
  transform: () => transform,
  wrap: () => wrap
});

// src/rx/Types.ts
var symbol = Symbol(`Rx`);

// src/rx/Util.ts
function messageIsSignal(message) {
  if (message.value !== void 0)
    return false;
  if (`signal` in message && message.signal !== void 0)
    return true;
  return false;
}
function messageIsDoneSignal(message) {
  if (message.value !== void 0)
    return false;
  if (`signal` in message && message.signal === `done`)
    return true;
  return false;
}
function messageHasValue(v2) {
  if (v2.value !== void 0)
    return true;
  return false;
}
var hasLast = (rx) => {
  if (`last` in rx) {
    const v2 = rx.last();
    if (v2 !== void 0)
      return true;
  }
  return false;
};
var isDisposable = (v2) => {
  return `isDisposed` in v2 && `dispose` in v2;
};
var opify = (fn, ...args) => {
  return (source) => {
    return fn(source, ...args);
  };
};

// src/rx/FromGenerator.ts
function generator(generator2, options = {}) {
  const lazy = options.lazy ?? true;
  let reading = false;
  const eventOpts = {
    onFirstSubscribe() {
      if (lazy && !reading) {
        readingStart();
      }
    },
    onNoSubscribers() {
      if (lazy && reading) {
        reading = false;
      }
    }
  };
  const events = initStream(eventOpts);
  const read = async () => {
    try {
      const v2 = await generator2.next();
      if (v2.done) {
        events.dispose(`Generator complete`);
        return;
      }
      if (!reading)
        return;
      events.set(v2.value);
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
  if (!lazy)
    readingStart();
  return {
    on: events.on,
    value: events.value,
    dispose: events.dispose,
    isDisposed: events.isDisposed
  };
}

// src/rx/ResolveSource.ts
var resolveSource = (source) => {
  if (`on` in source)
    return source;
  if (Array.isArray(source)) {
    return generator(source.values(), { lazy: true });
  } else {
    return generator(source, { lazy: true });
  }
};

// src/rx/InitStream.ts
var initUpstream = (upstreamSource, options) => {
  const lazy = options.lazy ?? true;
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
      if (messageIsSignal(value)) {
        if (value.signal === `done`) {
          stop();
          if (disposeIfSourceDone)
            events.dispose(`Source is completed`);
        } else {
          events.through(value);
        }
      } else if (messageHasValue(value)) {
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
      if (lazy)
        start();
    },
    onNoSubscribers() {
      if (lazy)
        stop();
    }
  };
  if (!lazy)
    start();
  const events = initStream(initOpts);
  return events;
};
function initStream(options = {}) {
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
  const subscribe = (handler) => {
    if (disposed)
      throw new Error(`Disposed`);
    if (dispatcher === void 0)
      dispatcher = new DispatchList();
    const id = dispatcher.add(handler);
    emptySubscriptions = false;
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
    reset: () => {
      dispatcher?.clear();
      isEmpty();
    },
    set: (v2) => {
      if (disposed)
        throw new Error(`Disposed`);
      dispatcher?.notify({ value: v2 });
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
    on: (handler) => subscribe(handler),
    value: (handler) => {
      const unsub = subscribe((message) => {
        if (messageHasValue(message)) {
          handler(message.value);
        }
      });
      return unsub;
    }
  };
}

// src/rx/Ops.ts
var to = (a2, b2, transform2, closeBonA = false) => {
  const unsub = a2.on((message) => {
    if (messageHasValue(message)) {
      b2.set(transform2(message.value));
    } else if (messageIsDoneSignal(message)) {
      unsub();
      if (closeBonA) {
        if (isDisposable(b2)) {
          b2.dispose(`Source closed (${message.context})`);
        } else {
          console.warn(`Reactive.to cannot close 'b' reactive since it is not disposable`);
        }
      }
    } else {
      console.warn(`Unsupported message: ${JSON.stringify(message)}`);
    }
  });
  return unsub;
};
var split = (options = {}) => {
  const quantity = options.quantity ?? 2;
  return (r2) => {
    const outputs = [];
    const source = resolveSource(r2);
    for (let index = 0; index < quantity; index++) {
      outputs.push(initUpstream(source, { disposeIfSourceDone: true, lazy: true }));
    }
    return outputs;
  };
};
var splitLabelled = (...labels) => {
  return (r2) => {
    const source = resolveSource(r2);
    const t2 = {};
    for (const label of labels) {
      t2[label] = initUpstream(source, { lazy: true, disposeIfSourceDone: true });
    }
    return t2;
  };
};
var switcher = (reactiveOrSource, cases, options = {}) => {
  const match = options.match ?? `first`;
  const source = resolveSource(reactiveOrSource);
  let disposed = false;
  const t2 = {};
  for (const label of Object.keys(cases)) {
    t2[label] = initStream();
  }
  const performDispose = () => {
    if (disposed)
      return;
    unsub();
    disposed = true;
    for (const stream of Object.values(t2)) {
      stream.dispose(`switcher source dispose`);
    }
  };
  const unsub = source.on((message) => {
    if (messageHasValue(message)) {
      for (const [lbl, pred] of Object.entries(cases)) {
        if (pred(message.value)) {
          t2[lbl].set(message.value);
          if (match === `first`)
            break;
        }
      }
    } else if (messageIsDoneSignal(message)) {
      performDispose();
    }
  });
  return t2;
};
var pipe = (...streams) => {
  const event = initStream();
  const unsubs = [];
  const performDispose = (reason) => {
    for (const s2 of streams) {
      if (isDisposable(s2) && !s2.isDisposed)
        s2.dispose(reason);
    }
    for (const s2 of unsubs) {
      s2();
    }
    event.dispose(reason);
  };
  for (let index = 0; index < streams.length; index++) {
    unsubs.push(streams[index].on((message) => {
      const isLast = index === streams.length - 1;
      if (messageHasValue(message)) {
        if (isLast) {
          event.set(message.value);
        } else {
          streams[index + 1].set(message.value);
        }
      } else if (messageIsDoneSignal(message)) {
        performDispose(`Upstream disposed`);
      }
    }));
  }
  return {
    on: event.on,
    value: event.value,
    dispose(reason) {
      performDispose(reason);
    },
    isDisposed() {
      return event.isDisposed();
    }
  };
};
function mergeAsArray(...values) {
  const event = initStream();
  const data = [];
  for (const [index, v2] of values.entries()) {
    data[index] = void 0;
    v2.on((valueChanged) => {
      if (!messageIsSignal(valueChanged)) {
        data[index] = valueChanged.value;
      }
      event.set(data);
    });
  }
  return {
    on: event.on,
    value: event.value
  };
}
function synchronise() {
  return (...sources) => {
    const event = initStream();
    let data = [];
    for (const [index, source] of sources.entries()) {
      data[index] = void 0;
      const v2 = resolveSource(source);
      v2.on((valueChanged) => {
        if (messageIsSignal(valueChanged)) {
          if (valueChanged.signal === `done`) {
            sources.splice(index, 1);
          }
          return;
        }
        data[index] = valueChanged.value;
        if (!data.includes(void 0)) {
          event.set(data);
          data = [];
        }
      });
    }
    return {
      on: event.on,
      value: event.value
    };
  };
}
function resolve(callbackOrValue, options = {}) {
  const intervalMs = intervalToMs(options.interval, 0);
  const lazy = options.lazy ?? false;
  const event = initStream({
    onFirstSubscribe() {
      if (lazy && c2.runState === `idle`)
        c2.start();
    },
    onNoSubscribers() {
      if (lazy) {
        c2.cancel();
      }
    }
  });
  const loops = options.infinite ? Number.MAX_SAFE_INTEGER : options.loops ?? 1;
  let remaining = loops;
  const c2 = continuously(() => {
    if (typeof callbackOrValue === `function`) {
      const value = callbackOrValue();
      event.set(value);
    } else {
      event.set(callbackOrValue);
    }
    remaining--;
    if (remaining === 0)
      return false;
  }, intervalMs);
  if (!lazy)
    c2.start();
  return {
    on: event.on,
    value: event.value
  };
}
function field(fieldName, options = {}) {
  return (fieldSource) => {
    const upstream = initUpstream(fieldSource, {
      disposeIfSourceDone: true,
      ...options,
      onValue(value) {
        let t2 = value[fieldName];
        if (t2 === void 0 && options.missingFieldDefault !== void 0) {
          t2 = options.missingFieldDefault;
        }
        upstream.set(t2);
      }
    });
    return toReadable(upstream);
  };
}
function filter(predicate, options) {
  return (input) => {
    const upstream = initUpstream(input, {
      ...options,
      onValue(value) {
        if (predicate(value)) {
          upstream.set(value);
        }
      }
    });
    return toReadable(upstream);
  };
}
var toReadable = (upstream) => ({ on: upstream.on, value: upstream.value });
function transform(input, transformer, options = {}) {
  const upstream = initUpstream(input, {
    ...options,
    onValue(value) {
      const t2 = transformer(value);
      upstream.set(t2);
    }
  });
  return toReadable(upstream);
}
function annotate(transformer, options = {}) {
  return (input) => {
    const upstream = initUpstream(input, {
      ...options,
      onValue(value) {
        const t2 = transformer(value);
        upstream.set(t2);
      }
    });
    return toReadable(upstream);
  };
}
var annotateElapsed = () => {
  return (input) => {
    let last = 0;
    const a2 = annotate((value) => {
      const elapsed = last === 0 ? 0 : Date.now() - last;
      last = Date.now();
      return { ...value, elapsedMs: elapsed };
    })(input);
    return a2;
  };
};
var cloneFromFields = (source) => {
  return transform(source, (v2) => {
    const entries = [];
    for (const field2 in v2) {
      const value = v2[field2];
      if (isPlainObjectOrPrimitive(value)) {
        entries.push([field2, value]);
      }
    }
    return Object.fromEntries(entries);
  });
};
function singleFromArray(source, options = {}) {
  const order = options.order ?? `default`;
  if (!options.at && !options.predicate)
    throw new Error(`Options must have 'predicate' or 'at' fields`);
  let preprocess = (values) => values;
  if (order === `random`)
    preprocess = shuffle;
  else if (typeof order === `function`)
    preprocess = (values) => values.toSorted(order);
  const upstream = initUpstream(source, {
    onValue(values) {
      values = preprocess(values);
      if (options.predicate) {
        for (const v2 of values) {
          if (options.predicate(v2)) {
            upstream.set(v2);
          }
        }
      } else if (options.at) {
        upstream.set(values.at(options.at));
      }
    }
  });
  return upstream;
}
var prepareOps = (...ops) => {
  return (source) => {
    for (const op of ops) {
      source = op(source);
    }
    return source;
  };
};
function run(source, ...ops) {
  const raw = prepareOps(...ops);
  return raw(source);
}
function batch(batchSource, options = {}) {
  const queue = new QueueMutable();
  const quantity = options.quantity ?? 0;
  const returnRemainder = options.returnRemainder ?? true;
  const upstreamOpts = {
    ...options,
    onStop() {
      if (returnRemainder && !queue.isEmpty) {
        const data = queue.toArray();
        queue.clear();
        upstream.set(data);
      }
    },
    onValue(value) {
      queue.enqueue(value);
      if (quantity > 0 && queue.length >= quantity) {
        send();
      }
      if (timer !== void 0 && timer.runState === `idle`) {
        timer.start();
      }
    }
  };
  const upstream = initUpstream(batchSource, upstreamOpts);
  const send = () => {
    if (queue.isEmpty)
      return;
    if (timer !== void 0)
      timer.start();
    const data = queue.toArray();
    queue.clear();
    upstream.set(data);
  };
  const timer = options.elapsed ? timeout(send, options.elapsed) : void 0;
  return toReadable(upstream);
}
function debounce(source, options = {}) {
  const elapsed = intervalToMs(options.elapsed, 50);
  let lastValue;
  const timer = timeout(() => {
    const v2 = lastValue;
    if (v2) {
      upstream.set(v2);
      lastValue = void 0;
    }
  }, elapsed);
  const upstream = initUpstream(source, {
    ...options,
    onValue(value) {
      lastValue = value;
      timer.start();
    }
  });
  return toReadable(upstream);
}
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
    if (elapsed > 0 && now - lastFire > elapsed) {
      lastFire = now;
      if (lastValue !== void 0) {
        upstream.set(lastValue);
      }
    }
  };
  return toReadable(upstream);
}

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
    for (const [index, l2] of this.colLabels.entries()) {
      if (l2 === label)
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
    const r2 = [];
    for (const row of this.rows) {
      if (row === void 0)
        r2.push([]);
      else
        r2.push([...row]);
    }
    return r2;
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
function toAdjacencyMatrix(graph2) {
  const v2 = [...graph2.vertices.values()];
  const table = new Table();
  table.labelColumns(...v2.map((vv) => vv.id));
  table.labelRows(...v2.map((vv) => vv.id));
  for (let i2 = 0; i2 < v2.length; i2++) {
    table.setRow(i2, v2.length, false);
    const ii = v2[i2];
    for (const [j2, jj] of v2.entries()) {
      if (ii.out.some((o2) => o2.id === jj.id)) {
        table.set(i2, j2, true);
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
  const r2 = [];
  const vertices2 = `vertices` in graph2 ? graph2.vertices.values() : graph2;
  for (const v2 of vertices2) {
    const str = debugDumpVertex(v2);
    r2.push(...str.map((line) => ` ${line}`));
  }
  return r2;
};
var distance = (graph2, edge) => {
  if (edge.weight !== void 0)
    return edge.weight;
  return 1;
};
function* edges(graph2) {
  const vertices2 = [...graph2.vertices.values()];
  for (const vertex of vertices2) {
    for (const edge of vertex.out) {
      yield edge;
    }
  }
}
function* vertices(graph2) {
  const vertices2 = [...graph2.vertices.values()];
  for (const vertex of vertices2) {
    yield vertex;
  }
}
function* adjacentVertices(graph2, context) {
  if (context === void 0)
    return;
  const vertex = typeof context === `string` ? graph2.vertices.get(context) : context;
  if (vertex === void 0)
    throw new Error(`Vertex not found ${JSON.stringify(context)}`);
  for (const edge of vertex.out) {
    const edgeV = graph2.vertices.get(edge.id);
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
var hasNoOuts = (graph2, vertex) => {
  const context = typeof vertex === `string` ? graph2.vertices.get(vertex) : vertex;
  if (context === void 0)
    return false;
  return context.out.length === 0;
};
var hasOnlyOuts = (graph2, vertex, ...outIdOrVertex) => {
  const context = resolveVertex(graph2, vertex);
  const outs = outIdOrVertex.map((o2) => resolveVertex(graph2, o2));
  if (outs.length !== context.out.length) {
    return false;
  }
  for (const out of outs) {
    if (!hasOut(graph2, context, out)) {
      return false;
    }
  }
  return true;
};
var hasOut = (graph2, vertex, outIdOrVertex) => {
  const context = resolveVertex(graph2, vertex);
  const outId = typeof outIdOrVertex === `string` ? outIdOrVertex : outIdOrVertex.id;
  return context.out.some((edge) => edge.id === outId);
};
var getOrCreate = (graph2, id) => {
  const v2 = graph2.vertices.get(id);
  if (v2 !== void 0)
    return { graph: graph2, vertex: v2 };
  const vv = createVertex(id);
  const gg = updateGraphVertex(graph2, vv);
  return { graph: gg, vertex: vv };
};
var getOrFail = (graph2, id) => {
  const v2 = graph2.vertices.get(id);
  if (v2 === void 0)
    throw new Error(`Vertex '${id}' not found in graph`);
  return v2;
};
var updateGraphVertex = (graph2, vertex) => {
  const gr = {
    ...graph2,
    vertices: graph2.vertices.set(vertex.id, vertex)
  };
  return gr;
};
var distanceDefault = (graph2, edge) => {
  if (edge.weight !== void 0)
    return edge.weight;
  return 1;
};
function disconnect(graph2, from, to2) {
  const fromV = resolveVertex(graph2, from);
  const toV = resolveVertex(graph2, to2);
  return hasOut(graph2, fromV, toV) ? updateGraphVertex(graph2, {
    ...fromV,
    out: fromV.out.filter((t2) => t2.id !== toV.id)
  }) : graph2;
}
function connectTo(graph2, from, to2, weight) {
  const fromResult = getOrCreate(graph2, from);
  graph2 = fromResult.graph;
  const toResult = getOrCreate(graph2, to2);
  graph2 = toResult.graph;
  const edge = {
    id: to2,
    weight
  };
  if (!hasOut(graph2, fromResult.vertex, toResult.vertex)) {
    graph2 = updateGraphVertex(graph2, {
      ...fromResult.vertex,
      // Add new edge to list of edges for this node
      out: [...fromResult.vertex.out, edge]
    });
  }
  return { graph: graph2, edge };
}
function connect(graph2, options) {
  const { to: to2, weight, from } = options;
  const bidi = options.bidi ?? false;
  const toList = Array.isArray(to2) ? to2 : [to2];
  for (const toSingle of toList) {
    const result = connectTo(graph2, from, toSingle, weight);
    graph2 = result.graph;
  }
  if (!bidi)
    return graph2;
  for (const toSingle of toList) {
    const result = connectTo(graph2, toSingle, from, weight);
    graph2 = result.graph;
  }
  return graph2;
}
var debugDumpVertex = (v2) => {
  const r2 = [
    `${v2.id}`
  ];
  const stringForEdge = (edge) => edge.weight === void 0 ? edge.id : `${edge.id} (${edge.weight})`;
  for (const edge of v2.out) {
    r2.push(` -> ${stringForEdge(edge)}`);
  }
  if (v2.out.length === 0)
    r2[0] += ` (terminal)`;
  return r2;
};
function areAdjacent(graph2, a2, b2) {
  if (hasOut(graph2, a2, b2.id))
    return true;
  if (hasOut(graph2, b2, a2.id))
    return true;
}
function resolveVertex(graph2, idOrVertex) {
  const v2 = typeof idOrVertex === `string` ? graph2.vertices.get(idOrVertex) : idOrVertex;
  if (v2 === void 0)
    throw new Error(`Id not found ${idOrVertex}`);
  return v2;
}
function* bfs(graph2, startIdOrVertex, targetIdOrVertex) {
  const start = resolveVertex(graph2, startIdOrVertex);
  const target = targetIdOrVertex === void 0 ? void 0 : resolveVertex(graph2, targetIdOrVertex);
  const queue = new QueueMutable();
  const seen = /* @__PURE__ */ new Set();
  queue.enqueue(start);
  while (!queue.isEmpty) {
    const v2 = queue.dequeue();
    yield v2;
    if (target !== void 0 && target === v2)
      return;
    for (const edge of adjacentVertices(graph2, v2)) {
      if (!seen.has(edge.id)) {
        seen.add(edge.id);
        queue.enqueue(resolveVertex(graph2, edge.id));
      }
    }
  }
}
function* dfs(graph2, startIdOrVertex) {
  const source = resolveVertex(graph2, startIdOrVertex);
  const s2 = new StackMutable();
  const seen = /* @__PURE__ */ new Set();
  s2.push(source);
  while (!s2.isEmpty) {
    const v2 = s2.pop();
    if (v2 === void 0)
      continue;
    if (!seen.has(v2.id)) {
      seen.add(v2.id);
      yield v2;
      for (const edge of v2.out) {
        const destination = graph2.vertices.get(edge.id);
        if (destination) {
          s2.push(destination);
        }
      }
    }
  }
}
var pathDijkstra = (graph2, sourceOrId) => {
  const source = typeof sourceOrId === `string` ? graph2.vertices.get(sourceOrId) : sourceOrId;
  if (source === void 0)
    throw new Error(`source vertex not found`);
  const distances = /* @__PURE__ */ new Map();
  const previous = /* @__PURE__ */ new Map();
  distances.set(source.id, 0);
  const pq = new PriorityMutable();
  const vertices2 = [...graph2.vertices.values()];
  for (const v2 of vertices2) {
    if (v2.id !== source.id) {
      distances.set(v2.id, Number.MAX_SAFE_INTEGER);
      previous.set(v2.id, null);
    }
    pq.enqueueWithPriority(v2.id, Number.MAX_SAFE_INTEGER);
  }
  while (!pq.isEmpty) {
    const u2 = pq.dequeueMin();
    if (u2 === void 0)
      throw new Error(`Bug. Queue unexpectedly empty`);
    const vertexU = graph2.vertices.get(u2);
    for (const neighbour of vertexU.out) {
      const alt = distances.get(u2) + distance(graph2, neighbour);
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
      const v2 = previous.get(id);
      if (v2 === void 0 || v2 === null)
        throw new Error(`Id not present: ${id}`);
      path.push({ id, weight: distances.get(id) });
      id = v2.id;
    }
    return path;
  };
  return {
    distances,
    previous,
    pathTo
  };
};
var clone = (graph2) => {
  const g2 = {
    vertices: immutable([...graph2.vertices.entries()])
  };
  return g2;
};
var graph = (...initialConnections) => {
  let g2 = {
    vertices: immutable()
  };
  for (const ic of initialConnections) {
    g2 = connect(g2, ic);
  }
  return g2;
};
function isAcyclic(graph2) {
  const cycles = getCycles(graph2);
  return cycles.length === 0;
}
function topologicalSort(graph2) {
  const indegrees = new NumberMap(0);
  for (const edge of edges(graph2)) {
    indegrees.add(edge.id, 1);
  }
  const queue = new QueueMutable();
  let vertexCount = 0;
  for (const vertex of vertices(graph2)) {
    if (indegrees.get(vertex.id) === 0) {
      queue.enqueue(vertex);
    }
    vertexCount++;
  }
  const topOrder = [];
  while (!queue.isEmpty) {
    const u2 = queue.dequeue();
    topOrder.push(u2);
    for (const neighbour of u2.out) {
      const result = indegrees.subtract(neighbour.id, 1);
      if (result === 0) {
        queue.enqueue(graph2.vertices.get(neighbour.id));
      }
    }
  }
  if (topOrder.length !== vertexCount) {
    throw new Error(`Graph contains cycles`);
  }
  return graphFromVertices(topOrder);
}
function graphFromVertices(vertices2) {
  const keyValues = IterableSync_exports.map(vertices2, (f2) => {
    return [f2.id, f2];
  });
  const m2 = immutable([...keyValues]);
  return {
    vertices: m2
  };
}
function getCycles(graph2) {
  let index = 0;
  const stack = new StackMutable();
  const vertices2 = /* @__PURE__ */ new Map();
  const scc = [];
  for (const v2 of graph2.vertices.values()) {
    vertices2.set(v2.id, {
      ...v2,
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
      let w2;
      while (vertex !== w2) {
        w2 = stack.pop();
        w2.onStack = false;
        stronglyConnected.push({ id: w2.id, out: w2.out });
      }
      if (stronglyConnected.length > 1)
        scc.push(stronglyConnected);
    }
  };
  for (const v2 of vertices2.values()) {
    if (Number.isNaN(v2.index)) {
      strongConnect(v2);
    }
  }
  return scc;
}
function transitiveReduction(graph2) {
  for (const u2 of vertices(graph2)) {
    for (const v2 of adjacentVertices(graph2, u2)) {
      for (const v1 of dfs(graph2, v2)) {
        if (v2.id === v1.id)
          continue;
        if (hasOut(graph2, u2, v1)) {
          const g2 = disconnect(graph2, u2, v1);
          return transitiveReduction(g2);
        }
      }
    }
  }
  return graph2;
}

// src/rx/Graph.ts
function isReactive(o2) {
  if (typeof o2 !== `object`)
    return false;
  if (`on` in o2) {
    return typeof o2.on === `function`;
  }
  return false;
}
function prepare(_rx) {
  let g2 = graph();
  const nodes = /* @__PURE__ */ new Map();
  const events = initStream();
  const process = (o2, path) => {
    for (const [key, value] of Object.entries(o2)) {
      const subPath = path + `.` + key;
      g2 = connect(g2, {
        from: path,
        to: subPath
      });
      if (isReactive(value)) {
        nodes.set(subPath, { value, type: `rx` });
        value.on((v2) => {
          console.log(`Reactive.prepare value: ${JSON.stringify(v2)} path: ${subPath}`);
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
    graph: g2,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    on: events.on,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    value: events.value
  };
  return returnValue;
}

// src/rx/ToArray.ts
async function toArray(source, options = {}) {
  const limit = options.limit ?? Number.MAX_SAFE_INTEGER;
  const maximumWait = intervalToMs(options.maximumWait, 10 * 1e3);
  const underThreshold = options.underThreshold ?? `partial`;
  const read = [];
  const rx = resolveSource(source);
  const promise = new Promise((resolve2, reject) => {
    const done = () => {
      clearTimeout(maxWait);
      unsub();
      if (read.length < limit && underThreshold === `throw`) {
        reject(new Error(`Threshold not reached. Wanted: ${limit} got: ${read.length}. Maximum wait: ${maximumWait}`));
        return;
      }
      if (read.length < limit && underThreshold === `fill`) {
        for (let index = 0; index < limit; index++) {
          if (read[index] === void 0)
            read[index] = options.fillValue;
        }
      }
      resolve2(read);
    };
    const maxWait = setTimeout(() => {
      done();
    }, maximumWait);
    const unsub = rx.on((message) => {
      if (messageIsDoneSignal(message)) {
        done();
      } else if (messageHasValue(message)) {
        read.push(message.value);
        if (read.length === limit) {
          done();
        }
      }
    });
  });
  return promise;
}
async function toArrayOrThrow(source, options = {}) {
  const limit = options.limit ?? Number.MAX_SAFE_INTEGER;
  const maximumWait = options.maximumWait ?? 5 * 1e3;
  const v2 = await toArray(source, { limit, maximumWait, underThreshold: `partial` });
  if (options.limit && v2.length < options.limit)
    throw new Error(`Threshold not reached. Wanted: ${options.limit}, got ${v2.length}`);
  return v2;
}

// src/rx/ToGenerator.ts
async function* toGenerator(source) {
  const s2 = resolveSource(source);
  let promiseResolve = (_2) => {
  };
  let promiseReject = (_2) => {
  };
  const promiseInit = () => new Promise((resolve2, reject) => {
    promiseResolve = resolve2;
    promiseReject = reject;
  });
  let promise = promiseInit();
  let keepRunning = true;
  s2.on((message) => {
    if (messageHasValue(message)) {
      promiseResolve(message.value);
      promise = promiseInit();
    } else if (messageIsDoneSignal(message)) {
      keepRunning = false;
      promiseReject(`Source has completed`);
    }
  });
  while (keepRunning) {
    yield await promise;
  }
}

// src/rx/FromArray.ts
function fromArray(initialValue = [], options = {}) {
  const eq = options.eq ?? isEqualValueDefault;
  const setEvent = initStream();
  const arrayEvent = initStream();
  let value = initialValue;
  let disposed = false;
  const set = (replacement) => {
    const diff = compareArrays(value, replacement, eq);
    console.log(`Rx.fromArray.set diff`, diff);
    value = replacement;
    setEvent.set([...replacement]);
  };
  const setAt = (index, v2) => {
    value[index] = v2;
    setEvent.set([...value]);
  };
  const push = (v2) => {
    value = [...value, v2];
    setEvent.set([...value]);
    const cr = [`add`, value.length - 1, v2];
    arrayEvent.set([cr]);
  };
  const deleteAt = (index) => {
    const valueChanged = remove(value, index);
    if (valueChanged.length === value.length)
      return;
    const diff = compareArrays(value, valueChanged, eq);
    console.log(diff.summary);
    value = valueChanged;
    setEvent.set([...value]);
    arrayEvent.set(diff.summary);
  };
  const deleteWhere = (filter2) => {
    const valueChanged = value.filter((v2) => !filter2(v2));
    const count = value.length - valueChanged.length;
    const diff = compareArrays(value, valueChanged, eq);
    value = valueChanged;
    setEvent.set([...value]);
    arrayEvent.set(diff.summary);
    return count;
  };
  const insertAt2 = (index, v2) => {
    const valueChanged = insertAt(value, index, v2);
    const diff = compareArrays(value, valueChanged, eq);
    value = valueChanged;
    setEvent.set([...value]);
    arrayEvent.set(diff.summary);
  };
  const dispose = (reason) => {
    if (disposed)
      return;
    setEvent.dispose(reason);
    disposed = true;
  };
  return {
    dispose,
    isDisposed() {
      return disposed;
    },
    last: () => value,
    on: setEvent.on,
    onArray: arrayEvent.on,
    value: setEvent.value,
    setAt,
    push,
    deleteAt,
    deleteWhere,
    insertAt: insertAt2,
    /**
     * Set the whole object
     */
    set
  };
}

// src/rx/Wrap.ts
function wrap(source) {
  return {
    source: resolveSource(source),
    toArray: (options) => {
      return toArray(source, options);
    },
    toArrayOrThrow: (options) => {
      return toArrayOrThrow(source, options);
    },
    value: (callback) => {
      const s2 = resolveSource(source);
      s2.on((message) => {
        if (messageHasValue(message))
          callback(message.value);
      });
    },
    batch: (options) => {
      const w2 = wrap(batch(source, options));
      return w2;
    },
    annotate: (transformer) => {
      const a2 = annotate(transformer)(source);
      return wrap(a2);
    },
    annotateElapsed: () => {
      return wrap(annotateElapsed()(source));
    },
    field: (fieldName, options = {}) => {
      const f2 = field(fieldName, options)(source);
      return wrap(f2);
    },
    filter: (predicate, options) => {
      return wrap(filter(predicate, options)(source));
    },
    split: (options = {}) => {
      const streams = split(options)(source).map((v2) => wrap(v2));
      return streams;
    },
    splitLabelled: (...labels) => {
      const l2 = splitLabelled(...labels)(source);
      const m2 = map(l2, (v2) => wrap(v2));
      return m2;
    },
    switcher: (cases, options = {}) => {
      const s2 = switcher(source, cases, options);
      const m2 = map(s2, (v2) => wrap(v2));
      return m2;
    },
    synchronise: (...additionalSources) => {
      const unwrapped = additionalSources.map((v2) => {
        return `source` in v2 ? v2.source : resolveSource(v2);
      });
      return wrap(synchronise()(source, ...unwrapped));
    },
    debounce: (options = {}) => {
      return wrap(debounce(source, options));
    },
    throttle: (options = {}) => {
      return wrap(throttle(source, options));
    },
    transform: (transformer, options = {}) => {
      return wrap(transform(source, transformer, options));
    }
  };
}

// node_modules/lit-html/lit-html.js
var t = globalThis;
var i = t.trustedTypes;
var s = i ? i.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0;
var e = "$lit$";
var h = `lit$${(Math.random() + "").slice(9)}$`;
var o = "?" + h;
var n = `<${o}>`;
var r = document;
var l = () => r.createComment("");
var c = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2;
var a = Array.isArray;
var u = (t2) => a(t2) || "function" == typeof t2?.[Symbol.iterator];
var d = "[ 	\n\f\r]";
var f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var v = /-->/g;
var _ = />/g;
var m = RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var p = /'/g;
var g = /"/g;
var $ = /^(?:script|style|textarea|title)$/i;
var y = (t2) => (i2, ...s2) => ({ _$litType$: t2, strings: i2, values: s2 });
var x = y(1);
var b = y(2);
var w = Symbol.for("lit-noChange");
var T = Symbol.for("lit-nothing");
var A = /* @__PURE__ */ new WeakMap();
var E = r.createTreeWalker(r, 129);
function C(t2, i2) {
  if (!Array.isArray(t2) || !t2.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return void 0 !== s ? s.createHTML(i2) : i2;
}
var P = (t2, i2) => {
  const s2 = t2.length - 1, o2 = [];
  let r2, l2 = 2 === i2 ? "<svg>" : "", c2 = f;
  for (let i3 = 0; i3 < s2; i3++) {
    const s3 = t2[i3];
    let a2, u2, d2 = -1, y2 = 0;
    for (; y2 < s3.length && (c2.lastIndex = y2, u2 = c2.exec(s3), null !== u2); )
      y2 = c2.lastIndex, c2 === f ? "!--" === u2[1] ? c2 = v : void 0 !== u2[1] ? c2 = _ : void 0 !== u2[2] ? ($.test(u2[2]) && (r2 = RegExp("</" + u2[2], "g")), c2 = m) : void 0 !== u2[3] && (c2 = m) : c2 === m ? ">" === u2[0] ? (c2 = r2 ?? f, d2 = -1) : void 0 === u2[1] ? d2 = -2 : (d2 = c2.lastIndex - u2[2].length, a2 = u2[1], c2 = void 0 === u2[3] ? m : '"' === u2[3] ? g : p) : c2 === g || c2 === p ? c2 = m : c2 === v || c2 === _ ? c2 = f : (c2 = m, r2 = void 0);
    const x2 = c2 === m && t2[i3 + 1].startsWith("/>") ? " " : "";
    l2 += c2 === f ? s3 + n : d2 >= 0 ? (o2.push(a2), s3.slice(0, d2) + e + s3.slice(d2) + h + x2) : s3 + h + (-2 === d2 ? i3 : x2);
  }
  return [C(t2, l2 + (t2[s2] || "<?>") + (2 === i2 ? "</svg>" : "")), o2];
};
var V = class _V {
  constructor({ strings: t2, _$litType$: s2 }, n2) {
    let r2;
    this.parts = [];
    let c2 = 0, a2 = 0;
    const u2 = t2.length - 1, d2 = this.parts, [f2, v2] = P(t2, s2);
    if (this.el = _V.createElement(f2, n2), E.currentNode = this.el.content, 2 === s2) {
      const t3 = this.el.content.firstChild;
      t3.replaceWith(...t3.childNodes);
    }
    for (; null !== (r2 = E.nextNode()) && d2.length < u2; ) {
      if (1 === r2.nodeType) {
        if (r2.hasAttributes())
          for (const t3 of r2.getAttributeNames())
            if (t3.endsWith(e)) {
              const i2 = v2[a2++], s3 = r2.getAttribute(t3).split(h), e2 = /([.?@])?(.*)/.exec(i2);
              d2.push({ type: 1, index: c2, name: e2[2], strings: s3, ctor: "." === e2[1] ? k : "?" === e2[1] ? H : "@" === e2[1] ? I : R }), r2.removeAttribute(t3);
            } else
              t3.startsWith(h) && (d2.push({ type: 6, index: c2 }), r2.removeAttribute(t3));
        if ($.test(r2.tagName)) {
          const t3 = r2.textContent.split(h), s3 = t3.length - 1;
          if (s3 > 0) {
            r2.textContent = i ? i.emptyScript : "";
            for (let i2 = 0; i2 < s3; i2++)
              r2.append(t3[i2], l()), E.nextNode(), d2.push({ type: 2, index: ++c2 });
            r2.append(t3[s3], l());
          }
        }
      } else if (8 === r2.nodeType)
        if (r2.data === o)
          d2.push({ type: 2, index: c2 });
        else {
          let t3 = -1;
          for (; -1 !== (t3 = r2.data.indexOf(h, t3 + 1)); )
            d2.push({ type: 7, index: c2 }), t3 += h.length - 1;
        }
      c2++;
    }
  }
  static createElement(t2, i2) {
    const s2 = r.createElement("template");
    return s2.innerHTML = t2, s2;
  }
};
function N(t2, i2, s2 = t2, e2) {
  if (i2 === w)
    return i2;
  let h2 = void 0 !== e2 ? s2._$Co?.[e2] : s2._$Cl;
  const o2 = c(i2) ? void 0 : i2._$litDirective$;
  return h2?.constructor !== o2 && (h2?._$AO?.(false), void 0 === o2 ? h2 = void 0 : (h2 = new o2(t2), h2._$AT(t2, s2, e2)), void 0 !== e2 ? (s2._$Co ??= [])[e2] = h2 : s2._$Cl = h2), void 0 !== h2 && (i2 = N(t2, h2._$AS(t2, i2.values), h2, e2)), i2;
}
var S = class {
  constructor(t2, i2) {
    this._$AV = [], this._$AN = void 0, this._$AD = t2, this._$AM = i2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t2) {
    const { el: { content: i2 }, parts: s2 } = this._$AD, e2 = (t2?.creationScope ?? r).importNode(i2, true);
    E.currentNode = e2;
    let h2 = E.nextNode(), o2 = 0, n2 = 0, l2 = s2[0];
    for (; void 0 !== l2; ) {
      if (o2 === l2.index) {
        let i3;
        2 === l2.type ? i3 = new M(h2, h2.nextSibling, this, t2) : 1 === l2.type ? i3 = new l2.ctor(h2, l2.name, l2.strings, this, t2) : 6 === l2.type && (i3 = new L(h2, this, t2)), this._$AV.push(i3), l2 = s2[++n2];
      }
      o2 !== l2?.index && (h2 = E.nextNode(), o2++);
    }
    return E.currentNode = r, e2;
  }
  p(t2) {
    let i2 = 0;
    for (const s2 of this._$AV)
      void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t2, s2, i2), i2 += s2.strings.length - 2) : s2._$AI(t2[i2])), i2++;
  }
};
var M = class _M {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t2, i2, s2, e2) {
    this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = t2, this._$AB = i2, this._$AM = s2, this.options = e2, this._$Cv = e2?.isConnected ?? true;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i2 = this._$AM;
    return void 0 !== i2 && 11 === t2?.nodeType && (t2 = i2.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i2 = this) {
    t2 = N(this, t2, i2), c(t2) ? t2 === T || null == t2 || "" === t2 ? (this._$AH !== T && this._$AR(), this._$AH = T) : t2 !== this._$AH && t2 !== w && this._(t2) : void 0 !== t2._$litType$ ? this.$(t2) : void 0 !== t2.nodeType ? this.T(t2) : u(t2) ? this.k(t2) : this._(t2);
  }
  S(t2) {
    return this._$AA.parentNode.insertBefore(t2, this._$AB);
  }
  T(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.S(t2));
  }
  _(t2) {
    this._$AH !== T && c(this._$AH) ? this._$AA.nextSibling.data = t2 : this.T(r.createTextNode(t2)), this._$AH = t2;
  }
  $(t2) {
    const { values: i2, _$litType$: s2 } = t2, e2 = "number" == typeof s2 ? this._$AC(t2) : (void 0 === s2.el && (s2.el = V.createElement(C(s2.h, s2.h[0]), this.options)), s2);
    if (this._$AH?._$AD === e2)
      this._$AH.p(i2);
    else {
      const t3 = new S(e2, this), s3 = t3.u(this.options);
      t3.p(i2), this.T(s3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i2 = A.get(t2.strings);
    return void 0 === i2 && A.set(t2.strings, i2 = new V(t2)), i2;
  }
  k(t2) {
    a(this._$AH) || (this._$AH = [], this._$AR());
    const i2 = this._$AH;
    let s2, e2 = 0;
    for (const h2 of t2)
      e2 === i2.length ? i2.push(s2 = new _M(this.S(l()), this.S(l()), this, this.options)) : s2 = i2[e2], s2._$AI(h2), e2++;
    e2 < i2.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i2.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, i2) {
    for (this._$AP?.(false, true, i2); t2 && t2 !== this._$AB; ) {
      const i3 = t2.nextSibling;
      t2.remove(), t2 = i3;
    }
  }
  setConnected(t2) {
    void 0 === this._$AM && (this._$Cv = t2, this._$AP?.(t2));
  }
};
var R = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t2, i2, s2, e2, h2) {
    this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t2, this.name = i2, this._$AM = e2, this.options = h2, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = T;
  }
  _$AI(t2, i2 = this, s2, e2) {
    const h2 = this.strings;
    let o2 = false;
    if (void 0 === h2)
      t2 = N(this, t2, i2, 0), o2 = !c(t2) || t2 !== this._$AH && t2 !== w, o2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let n2, r2;
      for (t2 = h2[0], n2 = 0; n2 < h2.length - 1; n2++)
        r2 = N(this, e3[s2 + n2], i2, n2), r2 === w && (r2 = this._$AH[n2]), o2 ||= !c(r2) || r2 !== this._$AH[n2], r2 === T ? t2 = T : t2 !== T && (t2 += (r2 ?? "") + h2[n2 + 1]), this._$AH[n2] = r2;
    }
    o2 && !e2 && this.j(t2);
  }
  j(t2) {
    t2 === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 ?? "");
  }
};
var k = class extends R {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t2) {
    this.element[this.name] = t2 === T ? void 0 : t2;
  }
};
var H = class extends R {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t2) {
    this.element.toggleAttribute(this.name, !!t2 && t2 !== T);
  }
};
var I = class extends R {
  constructor(t2, i2, s2, e2, h2) {
    super(t2, i2, s2, e2, h2), this.type = 5;
  }
  _$AI(t2, i2 = this) {
    if ((t2 = N(this, t2, i2, 0) ?? T) === w)
      return;
    const s2 = this._$AH, e2 = t2 === T && s2 !== T || t2.capture !== s2.capture || t2.once !== s2.once || t2.passive !== s2.passive, h2 = t2 !== T && (s2 === T || e2);
    e2 && this.element.removeEventListener(this.name, this, s2), h2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t2) : this._$AH.handleEvent(t2);
  }
};
var L = class {
  constructor(t2, i2, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    N(this, t2);
  }
};
var Z = t.litHtmlPolyfillSupport;
Z?.(V, M), (t.litHtmlVersions ??= []).push("3.1.2");
var j = (t2, i2, s2) => {
  const e2 = s2?.renderBefore ?? i2;
  let h2 = e2._$litPart$;
  if (void 0 === h2) {
    const t3 = s2?.renderBefore ?? null;
    e2._$litPart$ = h2 = new M(i2.insertBefore(l(), t3), t3, void 0, s2 ?? {});
  }
  return h2._$AI(t2), h2;
};

// src/rx/Lit.ts
var lit = (elOrQuery, source, gen) => {
  const el = resolveEl(elOrQuery);
  source.value((value) => {
    j(gen(value), el);
  });
  if (hasLast(source)) {
    j(gen(source.last()), el);
  }
};

// src/rx/ReadFromArray.ts
var readFromArray = (array, options = {}) => {
  const lazy = options.lazy ?? false;
  const idle = options.idle ?? ``;
  const intervalMs = intervalToMs(options.intervalMs, 5);
  let index = 0;
  let lastValue = array[0];
  const s2 = initStream({
    onFirstSubscribe() {
      if (lazy && c2.runState === `idle`)
        c2.start();
    },
    onNoSubscribers() {
      if (lazy) {
        if (idle === `pause`) {
          c2.cancel();
        } else if (idle === `reset`) {
          c2.cancel();
          index = 0;
        }
      }
    }
  });
  const c2 = continuously(() => {
    lastValue = array[index];
    index++;
    s2.set(lastValue);
    if (index === array.length) {
      return false;
    }
  }, intervalMs);
  if (!lazy)
    c2.start();
  return {
    isDone() {
      return index === array.length;
    },
    last() {
      return lastValue;
    },
    // eslint-disable-next-line @typescript-eslint/unbound-method
    on: s2.on,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    value: s2.value
  };
};

// src/rx/Dom.ts
var Dom_exports = {};
__export(Dom_exports, {
  bind: () => bind,
  bindDiffUpdate: () => bindDiffUpdate,
  bindElement: () => bindElement,
  bindHtml: () => bindHtml,
  bindText: () => bindText,
  bindUpdate: () => bindUpdate,
  elements: () => elements,
  win: () => win
});
var bindText = (source, elOrQuery, bindOpts = {}) => {
  return bindElement(source, elOrQuery, { ...bindOpts, elField: `textContent` });
};
var bindHtml = (source, elOrQuery, bindOpts = {}) => {
  return bindElement(source, elOrQuery, { ...bindOpts, elField: `innerHTML` });
};
var bindElement = (source, elOrQuery, ...binds) => {
  if (elOrQuery === null)
    throw new Error(`Param 'elOrQuery' is null`);
  if (elOrQuery === void 0)
    throw new Error(`Param 'elOrQuery' is undefined`);
  const el = resolveEl(elOrQuery);
  let b2 = [];
  if (binds.length === 0) {
    b2.push({ elField: `textContent` });
  } else {
    b2 = [...binds];
  }
  const bb = b2.map((bind2) => {
    if (`element` in bind2)
      return bind2;
    return { ...bind2, element: el };
  });
  return bind(source, ...bb);
};
var resolveBindUpdater = (bind2, element) => {
  const b2 = resolveBindUpdaterBase(bind2);
  return (value) => {
    b2(value, element);
  };
};
var resolveBindUpdaterBase = (bind2) => {
  if (bind2.elField !== void 0 || bind2.cssVariable === void 0 && bind2.attribName === void 0 && bind2.cssProperty === void 0 && bind2.textContent === void 0 && bind2.htmlContent === void 0) {
    const field2 = bind2.elField ?? `textContent`;
    return (v2, element) => {
      element[field2] = v2;
    };
  }
  if (bind2.attribName !== void 0) {
    const attrib = bind2.attribName;
    return (v2, element) => {
      element.setAttribute(attrib, v2);
    };
  }
  if (bind2.textContent) {
    return (v2, element) => {
      element.textContent = v2;
    };
  }
  if (bind2.htmlContent) {
    return (v2, element) => {
      element.innerHTML = v2;
    };
  }
  if (bind2.cssVariable !== void 0) {
    let css = bind2.cssVariable;
    if (!css.startsWith(`--`))
      css = `--` + css;
    return (v2, element) => {
      element.style.setProperty(css, v2);
    };
  }
  if (bind2.cssProperty !== void 0) {
    return (v2, element) => {
      element.style[bind2.cssProperty] = v2;
    };
  }
  return (_2, _element) => {
  };
};
var resolveTransform = (bind2) => {
  if (!bind2.transform && !bind2.transformValue)
    return;
  if (bind2.transformValue) {
    if (bind2.sourceField === void 0)
      throw new Error(`Expects 'sourceField' to be set when 'transformValue' is set`);
    return (value) => {
      const fieldValue = value[bind2.sourceField];
      return bind2.transformValue(fieldValue);
    };
  } else if (bind2.transform) {
    if (bind2.sourceField !== void 0)
      throw new Error(`If 'transform' is set, 'sourceField' is ignored`);
    return (value) => bind2.transform(value);
  }
};
var bind = (source, ...bindsUnresolvedElements) => {
  const binds = bindsUnresolvedElements.map((bind2) => {
    if (bind2.element && bind2.element !== void 0)
      return bind2;
    if (bind2.query)
      return {
        ...bind2,
        element: resolveEl(bind2.query)
      };
    throw new Error(`Unable to resolve element. Missing 'element' or 'query' values on bind. ${JSON.stringify(bind2)}`);
  });
  const bindsResolved = binds.map((bind2) => ({
    update: resolveBindUpdater(bind2, bind2.element),
    transformer: resolveTransform(bind2),
    sourceField: bind2.sourceField
  }));
  const update = (value) => {
    for (const bind2 of bindsResolved) {
      if (bind2.transformer) {
        bind2.update(bind2.transformer(value));
      } else {
        const v2 = bind2.sourceField ? value[bind2.sourceField] : value;
        if (typeof v2 === `object`) {
          if (bind2.sourceField) {
            bind2.update(JSON.stringify(v2));
          } else {
            bind2.update(JSON.stringify(v2));
          }
        } else
          bind2.update(v2);
      }
    }
  };
  const unsub = source.on((message) => {
    if (messageHasValue(message)) {
      update(message.value);
    } else if (messageIsSignal(message)) {
      console.warn(message);
    }
  });
  if (hasLast(source)) {
    update(source.last());
  }
  return {
    remove: (removeElements) => {
      unsub();
      if (removeElements) {
        for (const bind2 of binds) {
          bind2.element.remove();
        }
      }
    }
  };
};
var bindUpdate = (source, elOrQuery, updater) => {
  const el = resolveEl(elOrQuery);
  const update = (value) => {
    updater(value, el);
  };
  const unsub = source.on((message) => {
    if (messageHasValue(message)) {
      console.log(message);
      update(message.value);
    } else {
      console.warn(message);
    }
  });
  if (hasLast(source)) {
    update(source.last());
  }
  return {
    remove: (removeElement) => {
      unsub();
      if (removeElement) {
        el.remove();
      }
    }
  };
};
var bindDiffUpdate = (source, elOrQuery, updater, opts = {}) => {
  if (elOrQuery === null)
    throw new Error(`Param 'elOrQuery' is null`);
  if (elOrQuery === void 0)
    throw new Error(`Param 'elOrQuery' is undefined`);
  const el = resolveEl(elOrQuery);
  const binds = opts.binds;
  const update = (value) => {
    updater(value, el);
  };
  const unsub = source.onDiff((message) => {
    if (messageHasValue(message)) {
      update(message.value);
    } else {
      console.warn(message);
    }
  });
  const init = () => {
    if (hasLast(source) && opts.initial)
      opts.initial(source.last(), el);
  };
  init();
  return {
    refresh: () => {
      init();
    },
    remove: (removeElement) => {
      unsub();
      if (removeElement) {
        el.remove();
      }
    }
  };
};
var elements = (source, options) => {
  const containerEl = options.container ? resolveEl(options.container) : document.body;
  const defaultTag = options.defaultTag ?? `div`;
  const elByField = /* @__PURE__ */ new Map();
  const binds = /* @__PURE__ */ new Map();
  for (const [key, value] of Object.entries(options.binds ?? {})) {
    const tagName = value.tagName ?? defaultTag;
    binds.set(key, {
      ...value,
      update: resolveBindUpdaterBase(value),
      transform: resolveTransform(value),
      tagName,
      path: key
    });
  }
  const findBind = (path) => {
    const bind2 = getFromKeys(binds, stringSegmentsEndToEnd(path));
    if (bind2 !== void 0)
      return bind2;
    if (!path.includes(`.`))
      return binds.get(`_root`);
  };
  function* ancestorBinds(path) {
    for (const p2 of stringSegmentsStartToStart(path)) {
      if (binds.has(p2)) {
        yield binds.get(p2);
      } else {
      }
    }
    if (binds.has(`_root`) && path.includes(`.`))
      yield binds.get(`_root`);
  }
  const create = (path, value) => {
    const rootedPath = getRootedPath(path);
    console.log(`Rx.Dom.elements.create: ${path} rooted: ${rootedPath} value: ${JSON.stringify(value)}`);
    const bind2 = findBind(getRootedPath(path));
    let tagName = defaultTag;
    if (bind2?.tagName)
      tagName = bind2.tagName;
    const el = document.createElement(tagName);
    el.setAttribute(`data-path`, path);
    update(path, el, value);
    let parentForEl;
    for (const b2 of ancestorBinds(rootedPath)) {
      if (b2?.nestChildren) {
        const absoluteRoot = beforeMatch(path, `.`);
        const findBy = b2.path.replace(`_root`, absoluteRoot);
        parentForEl = elByField.get(findBy);
        if (parentForEl === void 0) {
        } else {
          break;
        }
      }
    }
    (parentForEl ?? containerEl).append(el);
    elByField.set(path, el);
    console.log(`Added el: ${path}`);
  };
  const update = (path, el, value) => {
    console.log(`Rx.dom.update path: ${path} value:`, value);
    const bind2 = findBind(getRootedPath(path));
    if (bind2 === void 0) {
      if (typeof value === `object`)
        value = JSON.stringify(value);
      el.textContent = value;
    } else {
      if (bind2.transform)
        value = bind2.transform(value);
      bind2.update(value, el);
    }
  };
  const changes = (changes2) => {
    const queue = new QueueMutable({}, changes2);
    let d2 = queue.dequeue();
    const seenPaths = /* @__PURE__ */ new Set();
    while (d2 !== void 0) {
      const path = d2.path;
      if (d2.previous === void 0) {
        console.log(`Rx.Dom.elements.changes no previous. path: ${path}`);
        create(path, d2.value);
        const subdata = getPathsAndData(d2.value, Number.MAX_SAFE_INTEGER, path);
        console.log(subdata);
        for (const dd of subdata) {
          if (!seenPaths.has(dd.path)) {
            queue.enqueue(dd);
            seenPaths.add(dd.path);
          }
        }
      } else if (d2.value === void 0) {
        const el = elByField.get(path);
        if (el === void 0) {
          console.warn(`No element to delete? ${path} `);
        } else {
          console.log(`Rx.Dom.elements.changes delete ${path}`);
          el.remove();
        }
      } else {
        const el = elByField.get(path);
        if (el === void 0) {
          console.warn(`Rx.Dom.elements.changes No element to update ? ${path} `);
          create(path, d2.value);
        } else {
          update(path, el, d2.value);
        }
      }
      d2 = queue.dequeue();
    }
  };
  source.onDiff((message) => {
    if (message.value) {
      console.log(`Rx.Dom.elements diff ${JSON.stringify(message.value)} `);
      changes(message.value);
    }
  });
  if (hasLast(source)) {
    const last = source.last();
    changes(getPathsAndData(last, 1));
  }
};
var getRootedPath = (path) => {
  const after = afterMatch(path, `.`);
  return after === path ? `_root` : `_root.` + after;
};
function win() {
  const generateRect = () => ({ width: window.innerWidth, height: window.innerHeight });
  const size = fromEvent(window, `resize`, {
    lazy: true,
    process: () => generateRect()
  });
  const pointer = fromEvent(window, `pointermove`, {
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

// src/rx/index.ts
function number(initialValue) {
  let value = initialValue;
  const events = initStream();
  const set = (v2) => {
    value = v2;
    events.set(v2);
  };
  return {
    dispose: events.dispose,
    isDisposed: events.isDisposed,
    last: () => value,
    on: events.on,
    value: events.value,
    set
  };
}
function fromEvent(target, name, options = {}) {
  if (target === null)
    throw new Error(`Param 'target' is null`);
  const process = options.process;
  const initialValue = process ? process() : void 0;
  const debugLifecycle = options.debugLifecycle ?? false;
  const debugFiring = options.debugFiring ?? false;
  const rxObject = initialValue ? fromObject(initialValue, { deepEntries: true }) : fromObject(void 0, { deepEntries: true });
  const lazy = options.lazy ?? false;
  let eventAdded = false;
  let disposed = false;
  const callback = (args) => {
    if (debugFiring)
      console.log(`Reactive.event '${name}' firing '${JSON.stringify(args)}`);
    rxObject.set(process ? process(args) : args);
  };
  const remove2 = () => {
    if (!eventAdded)
      return;
    eventAdded = false;
    target.removeEventListener(name, callback);
    if (debugLifecycle) {
      console.log(`Reactive.event remove '${name}'`);
    }
  };
  const add = () => {
    if (eventAdded)
      return;
    eventAdded = true;
    target.addEventListener(name, callback);
    if (debugLifecycle) {
      console.log(`Reactive.event add '${name}'`);
    }
  };
  if (!lazy)
    add();
  return {
    last: () => {
      if (lazy)
        add();
      return rxObject.last();
    },
    dispose: (reason) => {
      if (disposed)
        return;
      disposed = true;
      remove2();
      rxObject.dispose(reason);
    },
    isDisposed() {
      return disposed;
    },
    on: (handler) => {
      if (lazy)
        add();
      return rxObject.on(handler);
    },
    value: (handler) => {
      if (lazy)
        add();
      return rxObject.value(handler);
    }
  };
}
function fromQuery(query) {
  const elements2 = [...document.querySelectorAll(query)];
  return fromObject(elements2);
}
function manual(options = {}) {
  const events = initStream(options);
  return {
    set(value) {
      events.set(value);
    },
    on: events.on,
    value: events.value
  };
}
function observable(init) {
  const ow = observableWritable(init);
  return {
    on: ow.on,
    value: ow.value
  };
}
function observableWritable(init) {
  let onCleanup = () => {
  };
  const ow = manual({
    onFirstSubscribe() {
      onCleanup = init(ow);
    },
    onNoSubscribers() {
      if (onCleanup)
        onCleanup();
    }
  });
  return {
    ...ow,
    value: (callback) => {
      return ow.on((message) => {
        if (messageHasValue(message)) {
          callback(message.value);
        }
      });
    }
  };
}
function fromObject(initialValue, options = {}) {
  const eq = options.eq ?? isEqualContextString;
  const setEvent = initStream();
  const diffEvent = initStream();
  let value = initialValue;
  let disposed = false;
  const set = (v2) => {
    if (value !== void 0) {
      const diff = compareData(value, v2, { ...options, includeMissingFromA: true });
      if (diff.length === 0)
        return;
      diffEvent.set(diff);
    }
    value = v2;
    setEvent.set(v2);
  };
  const update = (toMerge) => {
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
      diffEvent.set(diff);
    }
    setEvent.set(value);
  };
  const updateField = (path, valueForField) => {
    if (value === void 0)
      throw new Error(`Cannot update value when it has not already been set`);
    const existing = getField(value, path);
    if (eq(existing, valueForField, path)) {
      return;
    }
    let diff = compareData(existing, valueForField, { ...options, includeMissingFromA: true });
    diff = diff.map((d2) => {
      if (d2.path.length > 0)
        return { ...d2, path: path + `.` + d2.path };
      return { ...d2, path };
    });
    const o2 = updateByPath(value, path, valueForField, true);
    value = o2;
    diffEvent.set(diff);
    setEvent.set(o2);
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
    value: setEvent.value,
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
function fromGenerator(gen) {
  const rx = initStream();
  setTimeout(async () => {
    try {
      for await (const value of gen) {
        rx.set(value);
      }
      rx.dispose(`Source generator complete`);
    } catch (error) {
      console.error(error);
      rx.dispose(`Error while iterating`);
    }
  }, 1);
  return rx;
}
var Ops = {
  batch: (options) => {
    return (source) => {
      return batch(source, options);
    };
  },
  debounce: (options) => {
    return (source) => {
      return debounce(source, options);
    };
  },
  transform: (transformer) => {
    return (source) => {
      return transform(source, transformer);
    };
  },
  throttle: (options) => opify(throttle, options)
};
var fromProxy = (target) => {
  const rx = fromObject(target);
  const proxy = new Proxy(target, {
    set(target2, p2, newValue, _receiver) {
      const isArray = Array.isArray(target2);
      if (isArray && p2 === `length`)
        return true;
      if (typeof p2 === `string`) {
        rx.updateField(p2, newValue);
      }
      if (isArray && typeof p2 === `string`) {
        const pAsNumber = Number.parseInt(p2);
        if (!Number.isNaN(pAsNumber)) {
          target2[pAsNumber] = newValue;
          return true;
        }
      }
      target2[p2] = newValue;
      return true;
    }
  });
  return { proxy, rx };
};
var fromProxySymbol = (target) => {
  const { proxy, rx } = fromProxy(target);
  const p2 = proxy;
  p2[symbol] = rx;
  return p2;
};

export {
  Table,
  DirectedGraph_exports,
  symbol,
  messageIsSignal,
  messageIsDoneSignal,
  messageHasValue,
  hasLast,
  isDisposable,
  opify,
  generator,
  to,
  split,
  splitLabelled,
  switcher,
  pipe,
  mergeAsArray,
  synchronise,
  resolve,
  field,
  filter,
  transform,
  annotate,
  annotateElapsed,
  cloneFromFields,
  singleFromArray,
  run,
  batch,
  debounce,
  throttle,
  prepare,
  toArray,
  toArrayOrThrow,
  toGenerator,
  fromArray,
  wrap,
  x,
  lit,
  readFromArray,
  Dom_exports,
  number,
  fromEvent,
  fromQuery,
  manual,
  observable,
  observableWritable,
  fromObject,
  fromGenerator,
  Ops,
  fromProxy,
  fromProxySymbol,
  rx_exports
};
/*! Bundled license information:

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
//# sourceMappingURL=chunk-ZLZAMZGI.js.map