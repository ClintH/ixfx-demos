import {
  compareData,
  getField,
  isEqualContextString,
  map,
  updateByPath
} from "./chunk-4AKKJDZ5.js";
import {
  resolveEl
} from "./chunk-YEKILLGJ.js";
import {
  DispatchList,
  continuously,
  timeout
} from "./chunk-N26YSP3N.js";
import {
  NumberMap,
  immutable
} from "./chunk-PPUK7HTL.js";
import {
  StackMutable
} from "./chunk-DUBCDOSH.js";
import {
  PriorityMutable
} from "./chunk-OTN26LTM.js";
import {
  IterableSync_exports
} from "./chunk-XQ6J6FHH.js";
import {
  QueueMutable
} from "./chunk-6AR5IC6V.js";
import {
  shuffle
} from "./chunk-YFLKLOTE.js";
import {
  intervalToMs,
  isPlainObjectOrPrimitive
} from "./chunk-QMMKIDRO.js";
import {
  __export
} from "./chunk-ERASX3TW.js";

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

// src/data/Reactive.ts
var Reactive_exports = {};
__export(Reactive_exports, {
  Dom: () => ReactiveDom_exports,
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
  fromObject: () => fromObject,
  fromProxy: () => fromProxy,
  fromProxySymbol: () => fromProxySymbol,
  generator: () => generator,
  hasLast: () => hasLast,
  initStream: () => initStream,
  initUpstream: () => initUpstream,
  isDisposable: () => isDisposable,
  manual: () => manual,
  mergeAsArray: () => mergeAsArray,
  messageHasValue: () => messageHasValue,
  messageIsDoneSignal: () => messageIsDoneSignal,
  messageIsSignal: () => messageIsSignal,
  number: () => number,
  observable: () => observable,
  observableWritable: () => observableWritable,
  pipe: () => pipe,
  prepare: () => prepare,
  resolve: () => resolve,
  resolveSource: () => resolveSource,
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
  transform: () => transform,
  wrap: () => wrap
});

// src/data/ReactiveDom.ts
var ReactiveDom_exports = {};
__export(ReactiveDom_exports, {
  bind: () => bind,
  bindDiffUpdate: () => bindDiffUpdate,
  bindElement: () => bindElement,
  bindHtmlContent: () => bindHtmlContent,
  bindTextContent: () => bindTextContent,
  bindUpdate: () => bindUpdate,
  createUpdate: () => createUpdate,
  win: () => win
});
var bindTextContent = (elOrQuery, source, bindOpts = {}) => {
  return bind(elOrQuery, source, { ...bindOpts, elField: `textContent` });
};
var bindHtmlContent = (elOrQuery, source, bindOpts = {}) => {
  return bind(elOrQuery, source, { ...bindOpts, elField: `innerHTML` });
};
var bindElement = (source, elOrQuery, ...binds) => {
  const el2 = resolveEl(elOrQuery);
  if (binds.length === 0) {
    binds.push({ elField: `textContent` });
  }
  binds.map((bind2) => {
    if (bind2.element !== void 0)
      return bind2;
    return { ...bind2, element: el2 };
  });
  return bind(source, ...binds);
};
var bind = (source, ...binds) => {
  const resolveBindUpdater = (bind2) => {
    if (bind2.elField !== void 0 || bind2.cssVariable === void 0 && bind2.attribName === void 0) {
      const field2 = bind2.elField ?? `textContent`;
      return (v) => {
        bind2.element[field2] = v;
      };
    }
    if (bind2.attribName !== void 0) {
      const attrib = bind2.attribName;
      return (v) => {
        bind2.element.setAttribute(attrib, v);
      };
    }
    if (bind2.cssVariable !== void 0) {
      let css = bind2.cssVariable;
      if (!css.startsWith(`--`))
        css = `--` + css;
      return (v) => {
        el.style.setProperty(css, v);
      };
    }
  };
  const bindsResolved = binds.map((bind2) => ({
    update: resolveBindUpdater(bind2),
    transformer: bind2.transform ?? ((v) => {
      if (typeof v === `object`)
        return JSON.stringify(v);
      return v;
    }),
    sourceField: bind2.sourceField
  }));
  const unsub = source.on((message) => {
    if (messageHasValue(message)) {
      if (sourceField)
        update(transformer(message.value[sourceField]));
      else
        update(transformer(message.value));
    } else if (messageIsSignal(message)) {
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
    },
    el
  };
};
var bindUpdate = (elOrQuery, source, updater) => {
  const el2 = resolveEl(elOrQuery);
  const update2 = (value) => {
    updater(value, el2);
  };
  const unsub = source.on((message) => {
    if (messageHasValue(message)) {
      console.log(message);
      update2(message.value);
    } else {
      console.warn(message);
    }
  });
  if (hasLast(source)) {
    update2(source.last());
  }
  return {
    remove: (removeElement) => {
      unsub();
      if (removeElement) {
        el2.remove();
      }
    },
    el: el2
  };
};
var bindDiffUpdate = (elOrQuery, source, updater, opts = {}) => {
  const el2 = resolveEl(elOrQuery);
  const update2 = (value) => {
    updater(value, el2);
  };
  const unsub = source.onDiff((message) => {
    if (messageHasValue(message)) {
      update2(message.value);
    } else {
      console.warn(message);
    }
  });
  const init = () => {
    if (hasLast(source) && opts.initial)
      opts.initial(source.last(), el2);
  };
  init();
  return {
    refresh: () => {
      init();
    },
    remove: (removeElement) => {
      unsub();
      if (removeElement) {
        el2.remove();
      }
    },
    el: el2
  };
};
var createUpdate = (source, updater, options = {}) => {
  const tag = options.tagName ?? `DIV`;
  const el2 = document.createElement(tag);
  if (options.parentEl) {
    const parent = resolveEl(options.parentEl);
    parent.append(el2);
  }
  const b = bindUpdate(el2, source, updater);
  return b;
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

// src/data/ReactiveOps.ts
var to = (a, b, transform2, closeBonA = false) => {
  const unsub = a.on((message) => {
    if (messageHasValue(message)) {
      b.set(transform2(message.value));
    } else if (messageIsDoneSignal(message)) {
      unsub();
      if (closeBonA) {
        if (isDisposable(b)) {
          b.dispose(`Source closed (${message.context})`);
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
  return (r) => {
    const outputs = [];
    const source = resolveSource(r);
    for (let index = 0; index < quantity; index++) {
      outputs.push(initUpstream(source, { disposeIfSourceDone: true, lazy: true }));
    }
    return outputs;
  };
};
var splitLabelled = (...labels) => {
  return (r) => {
    const source = resolveSource(r);
    const t = {};
    for (const label of labels) {
      t[label] = initUpstream(source, { lazy: true, disposeIfSourceDone: true });
    }
    return t;
  };
};
var switcher = (cases, options = {}) => {
  return (r) => {
    const match = options.match ?? `first`;
    const source = resolveSource(r);
    let disposed = false;
    const t = {};
    for (const label of Object.keys(cases)) {
      t[label] = initStream();
    }
    const performDispose = () => {
      if (disposed)
        return;
      unsub();
      disposed = true;
      for (const stream of Object.values(t)) {
        stream.dispose(`switcher source dispose`);
      }
    };
    const unsub = source.on((message) => {
      if (messageHasValue(message)) {
        for (const [lbl, pred] of Object.entries(cases)) {
          if (pred(message.value)) {
            t[lbl].set(message.value);
            if (match === `first`)
              break;
          }
        }
      } else if (messageIsDoneSignal(message)) {
        performDispose();
      }
    });
    return t;
  };
};
var pipe = (...streams) => {
  const event = initStream();
  const unsubs = [];
  const performDispose = (reason) => {
    for (const s of streams) {
      if (isDisposable(s) && !s.isDisposed)
        s.dispose(reason);
    }
    for (const s of unsubs) {
      s();
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
  for (const [index, v] of values.entries()) {
    data[index] = void 0;
    v.on((valueChanged) => {
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
      const v = resolveSource(source);
      v.on((valueChanged) => {
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
      if (lazy && c.runState === `idle`)
        c.start();
    },
    onNoSubscribers() {
      if (lazy) {
        c.cancel();
      }
    }
  });
  const loops = options.infinite ? Number.MAX_SAFE_INTEGER : options.loops ?? 1;
  let remaining = loops;
  const c = continuously(() => {
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
    c.start();
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
        let t = value[fieldName];
        if (t === void 0 && options.missingFieldDefault !== void 0) {
          t = options.missingFieldDefault;
        }
        upstream.set(t);
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
function transform(transformer2, options = {}) {
  return (input) => {
    const upstream = initUpstream(input, {
      ...options,
      onValue(value) {
        const t = transformer2(value);
        upstream.set(t);
      }
    });
    return toReadable(upstream);
  };
}
function annotate(transformer2, options = {}) {
  return (input) => {
    const upstream = initUpstream(input, {
      ...options,
      onValue(value) {
        const t = transformer2(value);
        upstream.set(t);
      }
    });
    return toReadable(upstream);
  };
}
var annotateElapsed = () => {
  return (input) => {
    let last = 0;
    const a = annotate((value) => {
      const elapsed = last === 0 ? 0 : Date.now() - last;
      last = Date.now();
      return { ...value, elapsedMs: elapsed };
    })(input);
    return a;
  };
};
var cloneFromFields = () => transform((v) => {
  const entries = [];
  for (const field2 in v) {
    const value = v[field2];
    if (isPlainObjectOrPrimitive(value)) {
      entries.push([field2, value]);
    }
  }
  return Object.fromEntries(entries);
});
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
        for (const v of values) {
          if (options.predicate(v)) {
            upstream.set(v);
          }
        }
      } else if (options.at) {
        upstream.set(values.at(options.at));
      }
    }
  });
  return upstream;
}
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
      const s = resolveSource(source);
      s.on((message) => {
        if (messageHasValue(message))
          callback(message.value);
      });
    },
    batch: (options) => {
      const w = wrap(batch(source, options));
      return w;
    },
    annotate: (transformer2) => {
      const a = annotate(transformer2)(source);
      return wrap(a);
    },
    annotateElapsed: () => {
      return wrap(annotateElapsed()(source));
    },
    field: (fieldName, options = {}) => {
      const f = field(fieldName, options)(source);
      return wrap(f);
    },
    filter: (predicate, options) => {
      return wrap(filter(predicate, options)(source));
    },
    split: (options = {}) => {
      const streams = split(options)(source).map((v) => wrap(v));
      return streams;
    },
    splitLabelled: (...labels) => {
      const l = splitLabelled(...labels)(source);
      const m = map(l, (v) => wrap(v));
      return m;
    },
    switcher: (cases, options = {}) => {
      const s = switcher(cases, options)(source);
      const m = map(s, (v) => wrap(v));
      return m;
    },
    synchronise: (...additionalSources) => {
      const unwrapped = additionalSources.map((v) => {
        return `source` in v ? v.source : resolveSource(v);
      });
      return wrap(synchronise()(source, ...unwrapped));
    },
    debounce: (options = {}) => {
      return wrap(debounce(source, options));
    },
    throttle: (options = {}) => {
      return wrap(throttle(source, options));
    },
    transform: (transformer2, options = {}) => {
      return wrap(transform(transformer2, options)(source));
    }
  };
}
var opify = (fn, ...args) => {
  return (source) => {
    return fn(source, ...args);
  };
};
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
  throttle: (options) => opify(throttle, options)
  // throttle: <V>(options: Partial<ThrottleOptions>): ReactiveOp<V, V> => {
  //   return (source: ReactiveOrSource> V >)
  // }
};
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
    const v = lastValue;
    if (v) {
      upstream.set(v);
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
var createVertex = (id) => {
  return {
    id,
    out: []
  };
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
      if (ii.out.some((o) => o.id === jj.id)) {
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
  const vertices2 = `vertices` in graph2 ? graph2.vertices.values() : graph2;
  for (const v of vertices2) {
    const str = debugDumpVertex(v);
    r.push(...str.map((line) => ` ${line}`));
  }
  return r;
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
  const outs = outIdOrVertex.map((o) => resolveVertex(graph2, o));
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
  const v = graph2.vertices.get(id);
  if (v !== void 0)
    return { graph: graph2, vertex: v };
  const vv = createVertex(id);
  const gg = updateGraphVertex(graph2, vv);
  return { graph: gg, vertex: vv };
};
var getOrFail = (graph2, id) => {
  const v = graph2.vertices.get(id);
  if (v === void 0)
    throw new Error(`Vertex '${id}' not found in graph`);
  return v;
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
    out: fromV.out.filter((t) => t.id !== toV.id)
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
var debugDumpVertex = (v) => {
  const r = [
    `${v.id}`
  ];
  const stringForEdge = (edge) => edge.weight === void 0 ? edge.id : `${edge.id} (${edge.weight})`;
  for (const edge of v.out) {
    r.push(` -> ${stringForEdge(edge)}`);
  }
  if (v.out.length === 0)
    r[0] += ` (terminal)`;
  return r;
};
function areAdjacent(graph2, a, b) {
  if (hasOut(graph2, a, b.id))
    return true;
  if (hasOut(graph2, b, a.id))
    return true;
}
function resolveVertex(graph2, idOrVertex) {
  const v = typeof idOrVertex === `string` ? graph2.vertices.get(idOrVertex) : idOrVertex;
  if (v === void 0)
    throw new Error(`Id not found ${idOrVertex}`);
  return v;
}
function* bfs(graph2, startIdOrVertex, targetIdOrVertex) {
  const start = resolveVertex(graph2, startIdOrVertex);
  const target = targetIdOrVertex === void 0 ? void 0 : resolveVertex(graph2, targetIdOrVertex);
  const queue = new QueueMutable();
  const seen = /* @__PURE__ */ new Set();
  queue.enqueue(start);
  while (!queue.isEmpty) {
    const v = queue.dequeue();
    yield v;
    if (target !== void 0 && target === v)
      return;
    for (const edge of adjacentVertices(graph2, v)) {
      if (!seen.has(edge.id)) {
        seen.add(edge.id);
        queue.enqueue(resolveVertex(graph2, edge.id));
      }
    }
  }
}
function* dfs(graph2, startIdOrVertex) {
  const source = resolveVertex(graph2, startIdOrVertex);
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
        const destination = graph2.vertices.get(edge.id);
        if (destination) {
          s.push(destination);
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
    const vertexU = graph2.vertices.get(u);
    for (const neighbour of vertexU.out) {
      const alt = distances.get(u) + distance(graph2, neighbour);
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
var clone = (graph2) => {
  const g = {
    vertices: immutable([...graph2.vertices.entries()])
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
    const u = queue.dequeue();
    topOrder.push(u);
    for (const neighbour of u.out) {
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
  const keyValues = IterableSync_exports.map(vertices2, (f) => {
    return [f.id, f];
  });
  const m = immutable([...keyValues]);
  return {
    vertices: m
  };
}
function getCycles(graph2) {
  let index = 0;
  const stack = new StackMutable();
  const vertices2 = /* @__PURE__ */ new Map();
  const scc = [];
  for (const v of graph2.vertices.values()) {
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
function transitiveReduction(graph2) {
  for (const u of vertices(graph2)) {
    for (const v of adjacentVertices(graph2, u)) {
      for (const v1 of dfs(graph2, v)) {
        if (v.id === v1.id)
          continue;
        if (hasOut(graph2, u, v1)) {
          const g = disconnect(graph2, u, v1);
          return transitiveReduction(g);
        }
      }
    }
  }
  return graph2;
}

// src/data/ReactiveGraph.ts
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
  const events = initStream();
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
    // eslint-disable-next-line @typescript-eslint/unbound-method
    on: events.on,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    value: events.value
  };
  return returnValue;
}

// src/data/Reactive.ts
var symbol = Symbol(`Rx`);
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
function messageHasValue(v) {
  if (v.value !== void 0)
    return true;
  return false;
}
var hasLast = (rx) => {
  if (`last` in rx) {
    const v = rx.last();
    if (v !== void 0)
      return true;
  }
  return false;
};
var isDisposable = (v) => {
  return `isDisposed` in v && `dispose` in v;
};
function number(initialValue) {
  let value = initialValue;
  const events = initStream();
  const set = (v) => {
    value = v;
    events.set(v);
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
  const remove = () => {
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
      remove();
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
  const set = (v) => {
    if (value !== void 0) {
      const diff = compareData(value, v, ``, options);
      if (diff.length === 0)
        return;
      diffEvent.set(diff);
    }
    value = v;
    setEvent.set(v);
  };
  const update2 = (toMerge) => {
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
      console.log(`Rx.object.updateField identical existig: ${existing} value: ${valueForField} path: ${path}`);
      return;
    }
    const o = updateByPath(value, path, valueForField);
    value = o;
    diffEvent.set([{ path, value: valueForField, previous: existing }]);
    setEvent.set(o);
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
    update: update2
  };
}
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
    set: (v) => {
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
      const v = await generator2.next();
      if (v.done) {
        events.dispose(`Generator complete`);
        return;
      }
      if (!reading)
        return;
      events.set(v.value);
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
var resolveSource = (source) => {
  if (`on` in source)
    return source;
  if (Array.isArray(source)) {
    return generator(source.values(), { lazy: true });
  } else {
    return generator(source, { lazy: true });
  }
};
var fromArray = (array, options = {}) => {
  const lazy = options.lazy ?? false;
  const idle = options.idle ?? ``;
  const intervalMs = intervalToMs(options.intervalMs, 5);
  let index = 0;
  let lastValue = array[0];
  const s = initStream({
    onFirstSubscribe() {
      if (lazy && c.runState === `idle`)
        c.start();
    },
    onNoSubscribers() {
      if (lazy) {
        if (idle === `pause`) {
          c.cancel();
        } else if (idle === `reset`) {
          c.cancel();
          index = 0;
        }
      }
    }
  });
  const c = continuously(() => {
    lastValue = array[index];
    index++;
    s.set(lastValue);
    if (index === array.length) {
      return false;
    }
  }, intervalMs);
  if (!lazy)
    c.start();
  return {
    isDone() {
      return index === array.length;
    },
    last() {
      return lastValue;
    },
    on: s.on,
    value: s.value
  };
};
async function toArrayOrThrow(source, options = {}) {
  const limit = options.limit ?? Number.MAX_SAFE_INTEGER;
  const maximumWait = options.maximumWait ?? 5 * 1e3;
  const v = await toArray(source, { limit, maximumWait, underThreshold: `partial` });
  if (options.limit && v.length < options.limit)
    throw new Error(`Threshold not reached. Wanted: ${options.limit}, got ${v.length}`);
  return v;
}
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
var fromProxy = (target) => {
  const rx = fromObject(target);
  const proxy = new Proxy(target, {
    set(target2, p, newValue, _receiver) {
      if (typeof p === `string`) {
        rx.updateField(p, newValue);
      }
      target2[p] = newValue;
      return true;
    }
  });
  return { proxy, rx };
};
var fromProxySymbol = (target) => {
  const { proxy, rx } = fromProxy(target);
  const p = proxy;
  p[symbol] = rx;
  return p;
};

// src/dom/DomRx.ts
var DomRx_exports = {};
__export(DomRx_exports, {
  elements: () => elements,
  resizeObservable: () => resizeObservable,
  themeChange: () => themeChange,
  windowResize: () => windowResize
});
var windowResize = (elapsed) => Ops.debounce({ elapsed: elapsed ?? 100 })(fromEvent(window, `resize`));
var themeChange = () => {
  const m = observable((stream) => {
    const ro = new MutationObserver((entries) => {
      stream.set(entries);
    });
    const opts = {
      attributeFilter: [`class`],
      attributes: true
    };
    ro.observe(document.documentElement, opts);
    return () => {
      ro.disconnect();
    };
  });
  return m;
};
var resizeObservable = (elem, timeout2) => {
  if (elem === null) {
    throw new Error(`elem parameter is null. Expected element to observe`);
  }
  if (elem === void 0) {
    throw new Error(`elem parameter is undefined. Expected element to observe`);
  }
  const m = observable((stream) => {
    const ro = new ResizeObserver((entries) => {
      stream.set(entries);
    });
    ro.observe(elem);
    return () => {
      ro.unobserve(elem);
    };
  });
  return Ops.debounce({ elapsed: timeout2 ?? 100 })(m);
};
var elements = (source) => {
  source.onDiff((message) => {
    console.log(`diff`, message);
  });
  if (hasLast(source)) {
    const last = source.last();
    console.log(`last`, last);
  }
};

// src/dom/CanvasSizing.ts
var parentSizeCanvas = (domQueryOrEl, onResized, timeoutMs = 100) => {
  const el2 = resolveEl(domQueryOrEl);
  if (el2.nodeName !== `CANVAS`) {
    throw new Error(
      `Expected HTML element with node name CANVAS, not ${el2.nodeName}`
    );
  }
  const parent = el2.parentElement;
  if (parent === null)
    throw new Error(`Element has no parent`);
  const ctx = el2.getContext(`2d`);
  if (ctx === null)
    throw new Error(`Could not create drawing context`);
  el2.style.width = `100%`;
  el2.style.height = `100%`;
  const ro = resizeObservable(parent, timeoutMs).value(
    (entries) => {
      const entry = entries.find((v) => v.target === parent);
      if (entry === void 0)
        return;
      const width = entry.contentRect.width;
      const height = entry.contentRect.height;
      el2.setAttribute(`width`, el2.offsetWidth + `px`);
      el2.setAttribute(`height`, el2.offsetHeight + `px`);
      if (onResized !== void 0) {
        const bounds = {
          min: Math.min(width, height),
          max: Math.max(width, height),
          width,
          height,
          center: { x: width / 2, y: height / 2 }
        };
        onResized({ ctx, el: el2, bounds });
      }
    }
  );
  return ro;
};
var fullSizeCanvas = (domQueryOrEl, onResized, skipCss = false) => {
  if (domQueryOrEl === null || domQueryOrEl === void 0) {
    throw new Error(`domQueryOrEl is null or undefined`);
  }
  const el2 = resolveEl(domQueryOrEl);
  if (el2.nodeName !== `CANVAS`) {
    throw new Error(
      `Expected HTML element with node name CANVAS, not ${el2.nodeName}`
    );
  }
  const ctx = el2.getContext(`2d`);
  if (ctx === null)
    throw new Error(`Could not create drawing context`);
  const update2 = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    el2.width = width;
    el2.height = height;
    if (onResized !== void 0) {
      const bounds = {
        min: Math.min(width, height),
        max: Math.max(width, height),
        width,
        height,
        center: { x: width / 2, y: height / 2 }
      };
      onResized({ ctx, el: el2, bounds });
    }
  };
  if (!skipCss) {
    el2.style.top = `0`;
    el2.style.left = `0`;
    el2.style.zIndex = `-100`;
    el2.style.position = `fixed`;
  }
  const r = windowResize();
  r.value(update2);
  update2();
  return r;
};

export {
  Table,
  DirectedGraph_exports,
  Reactive_exports,
  windowResize,
  resizeObservable,
  DomRx_exports,
  parentSizeCanvas,
  fullSizeCanvas
};
