import {
  isEqual
} from "./chunk-CHBOXPIA.js";
import {
  IterableAsync_exports,
  average,
  chunks as chunks2,
  concat as concat2,
  dropWhile as dropWhile2,
  equals as equals2,
  every as every2,
  fill as fill2,
  filter as filter2,
  find as find2,
  flatten as flatten2,
  forEach as forEach2,
  fromArray as fromArray2,
  fromIterable as fromIterable2,
  map as map2,
  max as max2,
  max2 as max3,
  min as min2,
  min2 as min3,
  nextWithTimeout,
  rank,
  reduce as reduce2,
  slice as slice2,
  some as some2,
  sum,
  tally,
  toArray as toArray2,
  unique as unique2,
  uniqueByValue as uniqueByValue2,
  until as until2,
  zip as zip2
} from "./chunk-SJ3R4FCY.js";
import {
  resolveEl
} from "./chunk-ZNCB3DZ2.js";
import {
  promiseFromEvent,
  sleep
} from "./chunk-RNUQGND2.js";
import {
  Elapsed_exports
} from "./chunk-4LUNZR7B.js";
import {
  IterableSync_exports,
  chunks,
  concat,
  dropWhile,
  equals,
  every,
  fill,
  filter,
  find,
  flatten,
  forEach,
  fromArray,
  fromEvent,
  fromIterable,
  isAsyncIterable,
  isIterable,
  map,
  max,
  min,
  reduce,
  some,
  toArray,
  unique,
  uniqueByValue,
  until,
  zip
} from "./chunk-SP37NBBE.js";
import {
  Map_exports
} from "./chunk-KSOSZLHF.js";
import {
  queue_exports
} from "./chunk-RLUQAN6Q.js";
import {
  intervalToMs
} from "./chunk-37WZU5ZM.js";
import {
  slice
} from "./chunk-TZZOFPLH.js";
import {
  isEqualValueIgnoreOrder,
  toStringDefault
} from "./chunk-SGQC7FGM.js";
import {
  throwIntegerTest
} from "./chunk-JIDOUNL5.js";
import {
  __export
} from "./chunk-AFNFQUHK.js";

// src/iterables/index.ts
var iterables_exports = {};
__export(iterables_exports, {
  Async: () => IterableAsync_exports,
  Chains: () => chain_exports,
  Sync: () => IterableSync_exports,
  chunks: () => chunks3,
  combineLatestToArray: () => combineLatestToArray2,
  concat: () => concat3,
  dropWhile: () => dropWhile3,
  equals: () => equals3,
  every: () => every3,
  fill: () => fill3,
  filter: () => filter4,
  find: () => find3,
  flatten: () => flatten3,
  forEach: () => forEach3,
  fromArray: () => fromArray3,
  fromEvent: () => fromEvent,
  fromIterable: () => fromIterable3,
  isAsyncIterable: () => isAsyncIterable,
  isIterable: () => isIterable,
  map: () => map3,
  max: () => max5,
  min: () => min5,
  reduce: () => reduce4,
  slice: () => slice3,
  some: () => some3,
  toArray: () => toArray3,
  unique: () => unique3,
  uniqueByValue: () => uniqueByValue3,
  until: () => until3,
  zip: () => zip3
});

// src/iterables/chain/index.ts
var chain_exports = {};
__export(chain_exports, {
  Dom: () => Dom_exports,
  From: () => from_exports,
  Links: () => Links_exports,
  addToArray: () => addToArray,
  asArray: () => asArray,
  asCallback: () => asCallback,
  asPromise: () => asPromise,
  asValue: () => asValue,
  combineLatestToArray: () => combineLatestToArray,
  combineLatestToObject: () => combineLatestToObject,
  isGenFactoryNoInput: () => isGenFactoryNoInput,
  lazy: () => lazy,
  mergeFlat: () => mergeFlat,
  prepare: () => prepare,
  resolveToAsyncGen: () => resolveToAsyncGen,
  resolveToGen: () => resolveToGen,
  run: () => run,
  runN: () => runN,
  single: () => single,
  syncToArray: () => syncToArray,
  timestamp: () => timestamp
});

// src/iterables/chain/Dom.ts
var Dom_exports = {};
__export(Dom_exports, {
  perValue: () => perValue,
  query: () => query
});

// src/iterables/chain/Util.ts
function isGenFactoryNoInput(c) {
  if (!(`_type` in c)) return false;
  if (c._type === `GenFactoryNoInput`) return true;
  return false;
}
function* primitiveToGenerator(value) {
  yield value;
}
async function* primitiveToAsyncGenerator(value) {
  yield value;
  await sleep(1);
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
function resolveToAsyncGen(input) {
  if (input === void 0) return;
  if (Array.isArray(input)) {
    return fromArray2(input);
  } else if (typeof input === `number` || typeof input === `boolean` || typeof input === `string`) {
    return primitiveToAsyncGenerator(input);
  } else if (typeof input === `function`) {
    return input();
  } else if (isAsyncIterable(input)) {
    return input;
  }
  return fromIterable2(input);
}

// src/iterables/chain/Dom.ts
var createMap = (key) => {
  const keyFunction = key ?? ((value) => value);
  const map4 = /* @__PURE__ */ new Map();
  return {
    has(key2) {
      return map4.has(keyFunction(key2));
    },
    get(key2) {
      return map4.get(keyFunction(key2));
    },
    set(key2, value) {
      map4.set(keyFunction(key2), value);
    },
    entries() {
      return map4.entries();
    },
    delete(key2) {
      map4.delete(key2);
    }
  };
};
function perValue(options = {}) {
  const byReference = options.byReference;
  const tagName = options.tagName ?? `div`;
  if (byReference && options.key) throw new Error(`byReference and key options are mutually exclusive`);
  const keyFunction = byReference ? void 0 : options.key ?? toStringDefault;
  const map4 = createMap(keyFunction);
  const parentElementOrQuery = options.parentEl ?? document.body;
  const parentEl = resolveEl(parentElementOrQuery);
  const usedElements = /* @__PURE__ */ new Set();
  async function* perValue2(input) {
    for await (const value of resolveToGen(input)) {
      let el = map4.get(value);
      if (!el) {
        el = document.createElement(tagName);
        map4.set(value, el);
        if (options.beforeInsert) options.beforeInsert(el);
        parentEl.append(el);
        if (options.afterInsert) options.afterInsert(el);
      }
      usedElements.add(el);
      yield { el, value };
    }
    for (const [id, el] of map4.entries()) {
      if (usedElements.has(el)) continue;
      if (options.beforeRemove) options.beforeRemove(el);
      el.remove();
      map4.delete(id);
    }
  }
  perValue2._name = `dom.perValue`;
  return perValue2;
}
function query(options = {}) {
  const baseElement = options.baseElement ?? document;
  async function* query2(input) {
    const gen = resolveToGen(input);
    for await (const value of gen) {
      for (const element of baseElement.querySelectorAll(value)) {
        yield element;
      }
    }
  }
  query2._name = `dom.query`;
  return query2;
}

// src/iterables/chain/Links.ts
var Links_exports = {};
__export(Links_exports, {
  average: () => average2,
  chunk: () => chunk,
  debounce: () => debounce,
  delay: () => delay,
  drop: () => drop,
  duration: () => duration,
  filter: () => filter3,
  max: () => max4,
  min: () => min4,
  rank: () => rank2,
  rankArray: () => rankArray,
  reduce: () => reduce3,
  sum: () => sum2,
  take: () => take,
  tally: () => tally2,
  transform: () => transform
});
function transform(transformer) {
  async function* transform2(input) {
    input = resolveToGen(input);
    for await (const value of input) {
      yield transformer(value);
    }
  }
  transform2._name = `transform`;
  return transform2;
}
function take(limit) {
  async function* take2(input) {
    input = resolveToGen(input);
    let yielded = 0;
    for await (const value of input) {
      if (++yielded > limit) break;
      yield value;
    }
  }
  take2._name = `take`;
  return take2;
}
function reduce3(reducer) {
  async function* reduce5(input) {
    input = resolveToGen(input);
    for await (const value of input) {
      yield reducer(value);
    }
  }
  reduce5._name = `reduce`;
  return reduce5;
}
function duration(elapsed) {
  const durationMs = intervalToMs(elapsed, 0);
  async function* duration2(input) {
    input = resolveToGen(input);
    const elapsed2 = Elapsed_exports.since();
    for await (const value of input) {
      if (elapsed2() > durationMs) break;
      yield value;
    }
  }
  duration2._name = `duration`;
  return duration2;
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
function debounce(rate) {
  const rateMs = intervalToMs(rate, 0);
  async function* debounce2(input) {
    input = resolveToGen(input);
    let elapsed = Elapsed_exports.since();
    for await (const value of input) {
      if (elapsed() < rateMs) continue;
      yield value;
      elapsed = Elapsed_exports.since();
    }
  }
  debounce2._name = `debounce`;
  return debounce2;
}
function tally2(countArrayItems = true) {
  async function* tally3(input) {
    input = resolveToGen(input);
    const p = tally(countArrayItems);
    for await (const v of input) {
      yield p(v);
    }
  }
  tally3._name = `tally`;
  return tally3;
}
function min4() {
  async function* min6(input) {
    input = resolveToGen(input);
    const p = min2();
    for await (const value of input) {
      const x = p(value);
      if (x === void 0) continue;
      yield x;
    }
  }
  min6._name = `min`;
  return min6;
}
function max4() {
  async function* max6(input) {
    input = resolveToGen(input);
    const p = max2();
    for await (const value of input) {
      const x = p(value);
      if (x === void 0) continue;
      yield x;
    }
  }
  max6._name = `max`;
  return max6;
}
function rank2(r, options = {}) {
  async function* rank3(input) {
    input = resolveToGen(input);
    const p = rank(r, options);
    for await (const value of input) {
      const x = p(value);
      if (x === void 0) continue;
      yield x;
    }
  }
  rank3._name = `rank`;
  return rank3;
}
function rankArray(r, options = {}) {
  const includeType = options.includeType;
  const emitEqualRanked = options.emitEqualRanked ?? false;
  const emitRepeatHighest = options.emitRepeatHighest ?? false;
  const withinArrays = options.withinArrays ?? false;
  async function* rankArray2(input) {
    input = resolveToGen(input);
    let best;
    for await (const value of input) {
      let emit = false;
      if (withinArrays) best = void 0;
      for (const subValue of value) {
        if (includeType && typeof subValue !== includeType) continue;
        if (best === void 0) {
          best = subValue;
          emit = true;
        } else {
          const result = r(subValue, best);
          if (result == `a`) {
            best = subValue;
            emit = true;
          } else if (result === `eq` && emitEqualRanked) {
            emit = true;
          } else if (emitRepeatHighest) {
            emit = true;
          }
        }
      }
      if (emit && best) yield best;
    }
  }
  rankArray2._name = `rankArray`;
  return rankArray2;
}
function average2() {
  async function* average3(input) {
    input = resolveToGen(input);
    const p = average();
    for await (const value of input) {
      const x = p(value);
      if (x === void 0) continue;
      yield x;
    }
  }
  average3._name = `average`;
  return average3;
}
function sum2() {
  async function* total(input) {
    input = resolveToGen(input);
    const p = sum();
    for await (const value of input) {
      const x = p(value);
      if (x === void 0) continue;
      yield x;
    }
  }
  total._name = `total`;
  return total;
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
    if (returnRemainders && buffer.length > 0) yield buffer;
  }
  chunk2._name = `chunk`;
  return chunk2;
}
function filter3(predicate) {
  async function* filter5(input) {
    input = resolveToGen(input);
    for await (const value of input) {
      if (predicate(value)) {
        yield value;
      }
    }
  }
  filter5._name = `filter`;
  return filter5;
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

// src/iterables/chain/AddToArray.ts
async function addToArray(array2, valueToWrap) {
  const outputType = typeof valueToWrap === `function` ? valueToWrap() : valueToWrap;
  for await (const value of outputType) {
    array2.push(value);
  }
}

// src/iterables/chain/AsArray.ts
async function asArray(valueToWrap, options = {}) {
  const outputType = typeof valueToWrap === `function` ? valueToWrap() : valueToWrap;
  return toArray2(outputType, options);
}

// src/iterables/chain/AsCallback.ts
async function asCallback(valueToWrap, callback, onDone) {
  const outputType = typeof valueToWrap === `function` ? valueToWrap() : valueToWrap;
  for await (const value of outputType) {
    callback(value);
  }
  if (onDone) onDone();
}

// src/iterables/chain/AsPromise.ts
function asPromise(valueToWrap) {
  let lastValue;
  const outputType = typeof valueToWrap === `function` ? valueToWrap() : valueToWrap;
  async function asPromise2() {
    const v = await outputType.next();
    if (v.done) return;
    lastValue = v.value;
    return lastValue;
  }
  return asPromise2;
}

// src/iterables/chain/AsValue.ts
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

// src/iterables/chain/Run.ts
async function* runN(...functions) {
  let input;
  for (const fnOrData of functions) {
    input = typeof fnOrData === `function` ? fnOrData(input ?? []) : resolveToGen(fnOrData);
  }
  if (input === void 0) return;
  for await (const v of input) {
    yield v;
  }
}
async function* run(gen, l0, l1, l2, l3, l4, l5) {
  let input;
  const functions = arguments;
  for (const fnOrData of functions) {
    if (typeof fnOrData === `function`) {
      input = fnOrData(input ?? []);
    } else {
      input = resolveToGen(fnOrData);
    }
  }
  if (input === void 0) return;
  for await (const v of input) {
    yield v;
  }
}

// src/iterables/chain/Prepare.ts
function prepare(...functions) {
  const r = (source) => {
    return runN(source, ...functions);
  };
  return r;
}

// src/iterables/chain/from/index.ts
var from_exports = {};
__export(from_exports, {
  array: () => array,
  event: () => event,
  func: () => func,
  iterable: () => iterable,
  timestamp: () => timestamp
});

// src/iterables/chain/from/Array.ts
function array(it, delay2 = 5) {
  async function* fromArray4() {
    for (const v of it) {
      await sleep(delay2);
      yield v;
    }
  }
  fromArray4._name = `fromArray`;
  fromArray4._type = `GenFactoryNoInput`;
  return fromArray4;
}

// src/iterables/chain/from/Event.ts
function event(target, name) {
  async function* event2() {
    while (true) {
      yield await promiseFromEvent(target, name);
    }
  }
  event2._name = `event`;
  event2._type = `GenFactoryNoInput`;
  return event2;
}

// src/iterables/chain/from/Function.ts
function func(callback) {
  async function* fromFunction() {
    while (true) {
      const v = await callback();
      if (v === void 0) break;
      yield v;
    }
  }
  fromFunction._name = `fromFunction`;
  fromFunction._type = `GenFactoryNoInput`;
  return fromFunction;
}

// src/iterables/chain/from/Iterable.ts
function iterable(it) {
  async function* fromIterable4() {
    for await (const v of it) {
      yield v;
    }
  }
  fromIterable4._name = `fromIterable`;
  fromIterable4._type = `GenFactoryNoInput`;
  return fromIterable4;
}

// src/iterables/chain/from/Ticks.ts
function timestamp(options) {
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
  ts._type = `GenFactoryNoInput`;
  return ts;
}

// src/iterables/chain/Lazy.ts
var getLinkName = (c) => {
  return c._name ?? c.name;
};
function lazy() {
  const chained = [];
  let dataToUse;
  const asGenerator = (data) => {
    if (data === void 0) data = dataToUse;
    let d = resolveToAsyncGen(data);
    for (const c of chained) {
      if (d === void 0) {
        if (isGenFactoryNoInput(c)) {
          d = c();
        } else {
          throw new Error(`Function '${getLinkName(c)}' requires input. Provide it to the function, or call 'input' earlier.`);
        }
      } else {
        d = c(d);
      }
    }
    return d;
  };
  const w = {
    rankArray: (r, options) => {
      chained.push(rankArray(r, options));
      return w;
    },
    rank: (r, options) => {
      chained.push(rank2(r, options));
      return w;
    },
    transform: (transformer) => {
      chained.push(transform(transformer));
      return w;
    },
    reduce: (reducer) => {
      chained.push(reduce3(reducer));
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
      chained.push(func(callback));
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
      chained.push(filter3((v) => predicate(v)));
      return w;
    },
    min: () => {
      chained.push(min4());
      return w;
    },
    max: () => {
      chained.push(max4());
      return w;
    },
    average: () => {
      chained.push(average2());
      return w;
    },
    sum: () => {
      chained.push(sum2());
      return w;
    },
    tally: (countArrayItems) => {
      chained.push(tally2(countArrayItems));
      return w;
    },
    input(data) {
      dataToUse = data;
      return w;
    },
    asGenerator,
    asAsync(data) {
      let d = data ?? dataToUse;
      for (const c of chained) {
        if (d === void 0 && isGenFactoryNoInput(c)) {
          d = c();
        } else if (d === void 0) {
          throw new Error(`Function '${getLinkName(c)}' needs input. Pass in data calling 'asAsync', or call 'input' earlier`);
        } else {
          d = c(d);
        }
      }
      return w;
    },
    asArray: async (data) => {
      const g = asGenerator(data);
      return await toArray2(g);
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

// src/iterables/chain/MergeFlat.ts
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

// src/iterables/chain/CombineLatestToArray.ts
async function* combineLatestToArray(sources, options = {}) {
  const onSourceDone = options.onSourceDone ?? `break`;
  const finalValue = options.finalValue ?? `undefined`;
  const afterEmit = options.afterEmit ?? `last`;
  const inputs = sources.map((source, index) => ({ waiting: void 0, index, gen: resolveToGen(source), done: false, lastValue: void 0 }));
  const isDone = () => !inputs.some((v) => !v.done);
  const isWaiting = () => inputs.some((v) => v.waiting !== void 0);
  const allEmpty = (d) => !d.some((v) => v !== void 0);
  let lastEmitted = [];
  while (true) {
    const promises = [];
    for (const input of inputs) {
      if (input.done) continue;
      if (input.waiting !== void 0) {
        promises.push(input.waiting);
        continue;
      }
      const p = Promise.resolve((async () => {
        if (input.done) return input;
        const v = await input.gen.next();
        input.waiting = void 0;
        if (v.done) {
          input.done = true;
          if (finalValue === `undefined`) input.lastValue = void 0;
        } else {
          input.lastValue = v.value;
        }
        return input;
      })());
      input.waiting = p;
      promises.push(p);
    }
    const won = await Promise.race(promises);
    if (won.done && onSourceDone === `break`) break;
    const d = inputs.map((v) => v.lastValue);
    if (d.length === 0) {
      return;
    }
    const dataEmpty = allEmpty(d);
    if (dataEmpty && !isWaiting()) {
      return;
    }
    if (!isEqual(lastEmitted, d) && !dataEmpty) {
      lastEmitted = d;
      yield d;
    }
    if (afterEmit === `undefined`) {
      for (const input of inputs) {
        if (input.waiting !== void 0) continue;
        input.lastValue = void 0;
      }
    }
    if (isDone()) {
      break;
    }
  }
}

// src/iterables/chain/CombineLatestToObject.ts
async function* combineLatestToObject(sources, options = {}) {
  const onSourceDone = options.onSourceDone ?? `break`;
  const finalValue = options.finalValue ?? `undefined`;
  const afterEmit = options.afterEmit ?? `last`;
  const states = /* @__PURE__ */ new Map();
  for (const [key, value] of Object.entries(sources)) {
    states.set(key, {
      gen: resolveToGen(value),
      done: false,
      lastValue: void 0,
      waiting: void 0,
      key
    });
  }
  const isDone = () => !Map_exports.some(states, (v) => !v.done);
  const isWaiting = () => Map_exports.some(states, (v) => v.waiting !== void 0);
  const allEmpty = (d) => {
    for (const v of Object.values(d)) {
      if (v !== void 0) return false;
    }
    return true;
  };
  const getData = () => {
    const r = {};
    for (const [key, state] of states) {
      r[key] = state.lastValue;
    }
    return r;
  };
  let lastEmitted;
  while (true) {
    const promises = [];
    for (const input of states.values()) {
      if (input.done) continue;
      if (input.waiting !== void 0) {
        promises.push(input.waiting);
        continue;
      }
      const p = Promise.resolve((async () => {
        if (input.done) return input;
        const v = await input.gen.next();
        input.waiting = void 0;
        if (v.done) {
          input.done = true;
          if (finalValue === `undefined`) input.lastValue = void 0;
        } else {
          input.lastValue = v.value;
        }
        return input;
      })());
      input.waiting = p;
      promises.push(p);
    }
    const won = await Promise.race(promises);
    if (won.done && onSourceDone === `break`) break;
    const d = getData();
    const dataEmpty = allEmpty(d);
    if (dataEmpty && !isWaiting()) {
      return;
    }
    if (!isEqualValueIgnoreOrder(lastEmitted, d) && !dataEmpty) {
      lastEmitted = d;
      yield d;
    }
    if (afterEmit === `undefined`) {
      for (const input of states.values()) {
        if (input.waiting !== void 0) continue;
        input.lastValue = void 0;
      }
    }
    if (isDone()) {
      break;
    }
  }
}

// src/iterables/chain/Single.ts
async function single(f, input) {
  const iterator = await f([input]).next();
  return iterator.value;
}

// src/iterables/chain/Sync.ts
async function* syncToArray(sources, options = {}) {
  const onSourceDone = options.onSourceDone ?? `break`;
  const maximumWaitMs = intervalToMs(options.maximumWait, 2e3);
  const finalValue = options.finalValue ?? `undefined`;
  const inputs = sources.map((source) => ({ seq: 0, lastValue: void 0, gen: resolveToGen(source), done: false }));
  const nextWithTimeoutOpts = {
    millis: maximumWaitMs
  };
  let seq = 0;
  const isAllDone = () => !inputs.some((v) => !v.done);
  let go = true;
  while (go) {
    seq++;
    for (const input of inputs) {
      if (input.done) {
        input.seq = seq;
        continue;
      }
      const v = await nextWithTimeout(input.gen, nextWithTimeoutOpts);
      if (v.done) {
        input.done = true;
        input.seq = seq;
        if (finalValue === `undefined`) {
          input.lastValue = void 0;
        }
        if (onSourceDone === `break`) {
          return;
        }
      } else {
        input.lastValue = v.value;
        input.seq = seq;
      }
    }
    if (go) {
      const d = inputs.filter((v) => v.seq === seq).map((v) => v.lastValue);
      if (d.length === 0) return;
      if (!d.some((v) => v !== void 0)) return;
      yield d;
    }
    if (isAllDone()) go = false;
  }
}

// src/iterables/index.ts
function combineLatestToArray2(sources, options = {}) {
  return combineLatestToArray(sources, options);
}
function min5(it, gt = (a, b) => a > b) {
  return isAsyncIterable(it) ? min3(it, gt) : min(it, gt);
}
function max5(it, gt = (a, b) => a > b) {
  return isAsyncIterable(it) ? max3(it, gt) : max(it, gt);
}
function dropWhile3(it, f) {
  return isAsyncIterable(it) ? dropWhile2(it, f) : dropWhile(it, f);
}
function until3(it, callback) {
  if (isAsyncIterable(it)) {
    return until2(it, callback);
  } else {
    until(it, callback);
  }
}
function chunks3(it, size) {
  return isAsyncIterable(it) ? chunks2(it, size) : chunks(it, size);
}
function filter4(it, f) {
  return isAsyncIterable(it) ? filter2(it, f) : filter(it, f);
}
function fill3(it, v) {
  return isAsyncIterable(it) ? fill2(it, v) : fill(it, v);
}
function concat3(...its) {
  return isAsyncIterable(its[0]) ? concat2(...its) : concat(...its);
}
function find3(it, f) {
  return isAsyncIterable(it) ? find2(it, f) : find(it, f);
}
function forEach3(it, f) {
  if (isAsyncIterable(it)) {
    return forEach2(it, f);
  } else {
    forEach(it, f);
  }
}
function map3(it, f) {
  return isAsyncIterable(it) ? map2(it, f) : map(it, f);
}
function fromArray3(array2, interval) {
  return interval === void 0 ? fromArray(array2) : fromArray2(array2, interval);
}
function flatten3(it) {
  return isAsyncIterable(it) ? flatten2(it) : flatten(it);
}
function some3(it, f) {
  return isAsyncIterable(it) ? some2(it, f) : some(it, f);
}
function reduce4(it, f, start) {
  return isAsyncIterable(it) ? reduce2(it, f, start) : reduce(it, f, start);
}
function slice3(it, start = 0, end = Number.POSITIVE_INFINITY) {
  return isAsyncIterable(it) ? slice2(it, start, end) : slice(it, end);
}
function unique3(iterable2) {
  if (Array.isArray(iterable2)) {
    if (iterable2.length === 0) return fromArray([]);
    return isAsyncIterable(iterable2[0]) ? unique2(iterable2) : unique(iterable2);
  } else if (isAsyncIterable(iterable2)) {
    return unique2(iterable2);
  } else {
    return unique(iterable2);
  }
}
function* uniqueByValue3(input, toString = toStringDefault, seen = /* @__PURE__ */ new Set()) {
  return isAsyncIterable(input) ? uniqueByValue2(input, toString, seen) : uniqueByValue(input, toString, seen);
}
function toArray3(it, options = {}) {
  return isAsyncIterable(it) ? toArray2(it, options) : toArray(it, options);
}
function every3(it, f) {
  return isAsyncIterable(it) ? every2(it, f) : every(it, f);
}
function equals3(it1, it2, equality) {
  const as = isAsyncIterable(it1) && isAsyncIterable(it2);
  return as ? equals2(it1, it2, equality) : equals(it1, it2, equality);
}
function zip3(...its) {
  if (its.length === 0) return fromArray([]);
  return isAsyncIterable(its[0]) ? zip2(...its) : zip(...its);
}
function fromIterable3(iterable2, interval) {
  if (isAsyncIterable(iterable2) || interval !== void 0) return fromIterable2(iterable2, interval);
  return fromIterable(iterable2);
}

export {
  chain_exports,
  combineLatestToArray2 as combineLatestToArray,
  min5 as min,
  max5 as max,
  dropWhile3 as dropWhile,
  until3 as until,
  chunks3 as chunks,
  filter4 as filter,
  fill3 as fill,
  concat3 as concat,
  find3 as find,
  forEach3 as forEach,
  map3 as map,
  fromArray3 as fromArray,
  flatten3 as flatten,
  some3 as some,
  reduce4 as reduce,
  slice3 as slice,
  unique3 as unique,
  uniqueByValue3 as uniqueByValue,
  toArray3 as toArray,
  every3 as every,
  equals3 as equals,
  zip3 as zip,
  fromIterable3 as fromIterable,
  iterables_exports
};
//# sourceMappingURL=chunk-UIRIS2M5.js.map