import {
  queue_exports
} from "./chunk-2LUR5STP.js";
import {
  isEqual
} from "./chunk-ZRXEXVUC.js";
import {
  average,
  fromArray,
  fromIterable,
  max,
  min,
  nextWithTimeout,
  rank,
  sum,
  tally,
  toArray
} from "./chunk-FVOMQHH6.js";
import {
  promiseFromEvent,
  sleep
} from "./chunk-NYNE45QF.js";
import {
  Stopwatch_exports
} from "./chunk-XC4MJHLC.js";
import {
  isAsyncIterable
} from "./chunk-YLRZZLGG.js";
import {
  resolveEl
} from "./chunk-ZNCB3DZ2.js";
import {
  intervalToMs
} from "./chunk-2LQNQUVT.js";
import {
  some
} from "./chunk-UK6L3VJJ.js";
import {
  isEqualValueIgnoreOrder,
  toStringDefault
} from "./chunk-6UZ3OSJO.js";
import {
  throwIntegerTest
} from "./chunk-CSXWZ3IC.js";
import {
  __export
} from "./chunk-L5EJU35C.js";

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
    return fromArray(input);
  } else if (typeof input === `number` || typeof input === `boolean` || typeof input === `string`) {
    return primitiveToAsyncGenerator(input);
  } else if (typeof input === `function`) {
    return input();
  } else if (isAsyncIterable(input)) {
    return input;
  }
  return fromIterable(input);
}

// src/iterables/chain/Dom.ts
var createMap = (key) => {
  const keyFunction = key ?? ((value) => value);
  const map = /* @__PURE__ */ new Map();
  return {
    has(key2) {
      return map.has(keyFunction(key2));
    },
    get(key2) {
      return map.get(keyFunction(key2));
    },
    set(key2, value) {
      map.set(keyFunction(key2), value);
    },
    entries() {
      return map.entries();
    },
    delete(key2) {
      map.delete(key2);
    }
  };
};
function perValue(options = {}) {
  const byReference = options.byReference;
  const tagName = options.tagName ?? `div`;
  if (byReference && options.key) throw new Error(`byReference and key options are mutually exclusive`);
  const keyFunction = byReference ? void 0 : options.key ?? toStringDefault;
  const map = createMap(keyFunction);
  const parentElementOrQuery = options.parentEl ?? document.body;
  const parentEl = resolveEl(parentElementOrQuery);
  const usedElements = /* @__PURE__ */ new Set();
  async function* perValue2(input) {
    for await (const value of resolveToGen(input)) {
      let el = map.get(value);
      if (!el) {
        el = document.createElement(tagName);
        map.set(value, el);
        if (options.beforeInsert) options.beforeInsert(el);
        parentEl.append(el);
        if (options.afterInsert) options.afterInsert(el);
      }
      usedElements.add(el);
      yield { el, value };
    }
    for (const [id, el] of map.entries()) {
      if (usedElements.has(el)) continue;
      if (options.beforeRemove) options.beforeRemove(el);
      el.remove();
      map.delete(id);
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
  filter: () => filter,
  max: () => max2,
  min: () => min2,
  rank: () => rank2,
  rankArray: () => rankArray,
  reduce: () => reduce,
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
function reduce(reducer) {
  async function* reduce2(input) {
    input = resolveToGen(input);
    for await (const value of input) {
      yield reducer(value);
    }
  }
  reduce2._name = `reduce`;
  return reduce2;
}
function duration(elapsed) {
  const durationMs = intervalToMs(elapsed, 0);
  async function* duration2(input) {
    input = resolveToGen(input);
    const elapsed2 = Stopwatch_exports.since();
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
    let elapsed = Stopwatch_exports.since();
    for await (const value of input) {
      if (elapsed() < rateMs) continue;
      yield value;
      elapsed = Stopwatch_exports.since();
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
function min2() {
  async function* min3(input) {
    input = resolveToGen(input);
    const p = min();
    for await (const value of input) {
      const x = p(value);
      if (x === void 0) continue;
      yield x;
    }
  }
  min3._name = `min`;
  return min3;
}
function max2() {
  async function* max3(input) {
    input = resolveToGen(input);
    const p = max();
    for await (const value of input) {
      const x = p(value);
      if (x === void 0) continue;
      yield x;
    }
  }
  max3._name = `max`;
  return max3;
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
  return toArray(outputType, options);
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
  async function* fromArray2() {
    for (const v of it) {
      await sleep(delay2);
      yield v;
    }
  }
  fromArray2._name = `fromArray`;
  fromArray2._type = `GenFactoryNoInput`;
  return fromArray2;
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
  async function* fromIterable2() {
    for await (const v of it) {
      yield v;
    }
  }
  fromIterable2._name = `fromIterable`;
  fromIterable2._type = `GenFactoryNoInput`;
  return fromIterable2;
}

// src/iterables/chain/from/Ticks.ts
function timestamp(options) {
  const intervalMs = intervalToMs(options.interval, 0);
  const asClockTime = options.asClockTime ?? false;
  const loops = options.loops ?? Number.MAX_SAFE_INTEGER;
  let looped = 0;
  const durationTime = intervalToMs(options.elapsed, Number.MAX_SAFE_INTEGER);
  async function* ts() {
    const elapsed = Stopwatch_exports.since();
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
      chained.push(reduce(reducer));
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
      chained.push(filter((v) => predicate(v)));
      return w;
    },
    min: () => {
      chained.push(min2());
      return w;
    },
    max: () => {
      chained.push(max2());
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
      return await toArray(g);
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
  const isDone = () => !some(states, (v) => !v.done);
  const isWaiting = () => some(states, (v) => v.waiting !== void 0);
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

export {
  isGenFactoryNoInput,
  resolveToGen,
  resolveToAsyncGen,
  Dom_exports,
  Links_exports,
  addToArray,
  asArray,
  asCallback,
  asPromise,
  asValue,
  runN,
  run,
  prepare,
  timestamp,
  from_exports,
  lazy,
  mergeFlat,
  combineLatestToArray,
  combineLatestToObject,
  single,
  syncToArray,
  chain_exports
};
//# sourceMappingURL=chunk-PIZIMCR3.js.map