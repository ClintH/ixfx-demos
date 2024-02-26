import {
  resolveEl
} from "./chunk-W7ZO7ANV.js";
import {
  pingPong,
  pingPongPercent
} from "./chunk-66GP6WDD.js";
import {
  integerUniqueGen
} from "./chunk-ABQLNHE2.js";
import {
  Elapsed_exports,
  delayLoop,
  interval
} from "./chunk-DPDF4IK4.js";
import {
  queue_exports
} from "./chunk-XZVDMAEV.js";
import {
  IterableSync_exports
} from "./chunk-6GALWGUT.js";
import {
  IterableAsync_exports,
  intervalToMs,
  sleep,
  toStringDefault2 as toStringDefault
} from "./chunk-NXOR4XWZ.js";
import {
  afterMatch
} from "./chunk-MX6757FI.js";
import {
  throwIntegerTest,
  throwNumberTest
} from "./chunk-UKONBQSB.js";
import {
  __export
} from "./chunk-ERASX3TW.js";

// src/generators/index.ts
var generators_exports = {};
__export(generators_exports, {
  Async: () => IterableAsync_exports,
  Chain: () => chain_exports,
  Sync: () => IterableSync_exports,
  count: () => count,
  delayLoop: () => delayLoop,
  interval: () => interval,
  numericPercent: () => numericPercent,
  numericRange: () => numericRange,
  numericRangeRaw: () => numericRangeRaw,
  pingPong: () => pingPong,
  pingPongPercent: () => pingPongPercent,
  randomUniqueInteger: () => integerUniqueGen,
  stringSegmentsFromEnd: () => stringSegmentsFromEnd
});

// src/generators/chain/index.ts
var chain_exports = {};
__export(chain_exports, {
  Dom: () => Dom_exports,
  Links: () => Links_exports,
  addToArray: () => addToArray,
  asArray: () => asArray,
  asCallback: () => asCallback,
  asPromise: () => asPromise,
  asValue: () => asValue,
  fromEvent: () => fromEvent,
  fromFunction: () => fromFunction,
  lazy: () => lazy,
  mergeAsArray: () => mergeAsArray,
  mergeFlat: () => mergeFlat,
  run: () => run,
  runN: () => runN,
  single: () => single,
  synchronise: () => synchronise,
  tick: () => tick
});

// src/generators/Iterable.ts
var isAsyncIterable = (v) => Symbol.asyncIterator in new Object(v);

// src/generators/chain/Util.ts
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

// src/generators/chain/Links.ts
var Links_exports = {};
__export(Links_exports, {
  average: () => average,
  chunk: () => chunk,
  debounce: () => debounce,
  delay: () => delay,
  drop: () => drop,
  duration: () => duration,
  filter: () => filter,
  flatten: () => flatten,
  max: () => max,
  min: () => min,
  rank: () => rank,
  rankArray: () => rankArray,
  take: () => take,
  tally: () => tally,
  total: () => total,
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
      if (++yielded > limit)
        break;
      yield value;
    }
  }
  take2._name = `take`;
  return take2;
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
      if (elapsed() < rateMs)
        continue;
      yield value;
      elapsed = Elapsed_exports.since();
    }
  }
  debounce2._name = `debounce`;
  return debounce2;
}
function tally() {
  async function* tally2(input) {
    input = resolveToGen(input);
    let count2 = 0;
    for await (const _ of input) {
      yield ++count2;
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
      const arrayValue = Array.isArray(value) ? value : [value];
      for (const subValue of arrayValue) {
        if (typeof subValue !== `number`)
          break;
        min3 = Math.min(subValue, min3);
        yield min3;
      }
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
      const valueArray = Array.isArray(value) ? value : [value];
      for (const subValue of valueArray) {
        if (typeof subValue !== `number`)
          break;
        max3 = Math.max(subValue, max3);
        yield max3;
      }
    }
  }
  max2._name = `max`;
  return max2;
}
function rank(r, options = {}) {
  const includeType = options.includeType;
  const emitEqualRanked = options.emitEqualRanked ?? false;
  const emitRepeatHighest = options.emitRepeatHighest ?? false;
  async function* rank2(input) {
    input = resolveToGen(input);
    let best;
    for await (const value of input) {
      let emit = false;
      if (includeType && typeof value !== includeType)
        continue;
      if (best === void 0) {
        best = value;
        emit = true;
      } else {
        const result = r(value, best);
        if (result == `a`) {
          best = value;
          emit = true;
        } else if (result === `eq` && emitEqualRanked) {
          emit = true;
        } else if (emitRepeatHighest) {
          emit = true;
        }
      }
      if (emit)
        yield best;
    }
  }
  rank2._name = `rank`;
  return rank2;
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
      if (withinArrays)
        best = void 0;
      for (const subValue of value) {
        if (includeType && typeof subValue !== includeType)
          continue;
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
      if (emit && best)
        yield best;
    }
  }
  rankArray2._name = `rankArray`;
  return rankArray2;
}
function average() {
  async function* average2(input) {
    input = resolveToGen(input);
    let total2 = 0;
    let count2 = 0;
    for await (const value of input) {
      if (typeof value !== `number`)
        break;
      count2++;
      total2 += value;
      yield total2 / count2;
    }
  }
  average2._name = `average`;
  return average2;
}
function total() {
  async function* average2(input) {
    input = resolveToGen(input);
    let total2 = 0;
    for await (const value of input) {
      if (typeof value !== `number`)
        break;
      total2 += value;
      yield total2;
    }
  }
  average2._name = `average`;
  return average2;
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

// src/generators/chain/Dom.ts
var Dom_exports = {};
__export(Dom_exports, {
  perValue: () => perValue,
  query: () => query
});
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
  if (byReference && options.key)
    throw new Error(`byReference and key options are mutually exclusive`);
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
        if (options.beforeInsert)
          options.beforeInsert(el);
        parentEl.append(el);
        if (options.afterInsert)
          options.afterInsert(el);
      }
      usedElements.add(el);
      yield { el, value };
    }
    for (const [id, el] of map.entries()) {
      if (usedElements.has(el))
        continue;
      if (options.beforeRemove)
        options.beforeRemove(el);
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

// src/generators/chain/index.ts
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
      chained.push(rank(r, options));
      return w;
    },
    transform: (transformer) => {
      chained.push(transform(transformer));
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
      chained.push(filter((v) => predicate(v)));
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
      chained.push(average());
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
    asGenerator,
    asAsync(data) {
      let d = data ?? dataToUse;
      for (const c of chained) {
        if (d === void 0 && isNoInput(c)) {
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
async function addToArray(array, valueToWrap) {
  const outputType = typeof valueToWrap === `function` ? valueToWrap() : valueToWrap;
  for await (const value of outputType) {
    array.push(value);
  }
}
async function single(f, input) {
  const iterator = await f([input]).next();
  return iterator.value;
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
async function* mergeAsArray(...sources) {
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
async function* synchronise(...sources) {
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
var getLinkName = (c) => {
  if (`_name` in c) {
    return c._name;
  } else {
    return c.name;
  }
};
async function* runN(...functions) {
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
  if (input === void 0)
    return;
  for await (const v of input) {
    yield v;
  }
}

// src/generators/index.ts
var numericRangeRaw = function* (interval2, start = 0, end, repeating = false) {
  if (interval2 <= 0)
    throw new Error(`Interval is expected to be above zero`);
  if (end === void 0)
    end = Number.MAX_SAFE_INTEGER;
  let v = start;
  do {
    while (v < end) {
      yield v;
      v += interval2;
    }
  } while (repeating);
};
function* stringSegmentsFromEnd(source, delimiter = `.`) {
  while (source.length > 0) {
    yield source;
    const trimmed = afterMatch(source, delimiter);
    if (trimmed === source) {
      break;
    }
    source = trimmed;
  }
}
var numericRange = function* (interval2, start = 0, end, repeating = false, rounding) {
  throwNumberTest(interval2, `nonZero`);
  const negativeInterval = interval2 < 0;
  if (end === void 0) {
  } else {
    if (negativeInterval && start < end) {
      throw new Error(
        `Interval of ${interval2} will never go from ${start} to ${end}`
      );
    }
    if (!negativeInterval && start > end) {
      throw new Error(
        `Interval of ${interval2} will never go from ${start} to ${end}`
      );
    }
  }
  rounding = rounding ?? 1e3;
  if (end === void 0)
    end = Number.MAX_SAFE_INTEGER;
  else
    end *= rounding;
  interval2 = interval2 * rounding;
  do {
    let v = start * rounding;
    while (!negativeInterval && v <= end || negativeInterval && v >= end) {
      yield v / rounding;
      v += interval2;
    }
  } while (repeating);
};
var count = function* (amount, offset = 0) {
  throwIntegerTest(amount, ``, `amount`);
  throwIntegerTest(offset, ``, `offset`);
  if (amount === 0)
    return;
  let index = 0;
  do {
    yield amount < 0 ? -index + offset : index + offset;
  } while (index++ < Math.abs(amount) - 1);
};
var numericPercent = function(interval2 = 0.01, repeating = false, start = 0, end = 1) {
  throwNumberTest(interval2, `percentage`, `interval`);
  throwNumberTest(start, `percentage`, `start`);
  throwNumberTest(end, `percentage`, `end`);
  return numericRange(interval2, start, end, repeating);
};

export {
  chain_exports,
  numericRangeRaw,
  stringSegmentsFromEnd,
  numericRange,
  count,
  numericPercent,
  generators_exports
};
