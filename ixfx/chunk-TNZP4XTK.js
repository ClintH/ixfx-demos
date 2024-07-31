import {
  isIterable
} from "./chunk-YLRZZLGG.js";
import {
  getErrorMessage
} from "./chunk-4IJNRUE7.js";

// src/rx/Util.ts
function messageIsSignal(message) {
  if (message.value !== void 0) return false;
  if (`signal` in message && message.signal !== void 0) return true;
  return false;
}
function messageIsDoneSignal(message) {
  if (message.value !== void 0) return false;
  if (`signal` in message && message.signal === `done`) return true;
  return false;
}
function messageHasValue(v) {
  if (v.value !== void 0) return true;
  return false;
}
var isPingable = (rx) => {
  if (!isReactive(rx)) return false;
  if (`ping` in rx) {
    return true;
  }
  return false;
};
var hasLast = (rx) => {
  if (!isReactive(rx)) return false;
  if (`last` in rx) {
    const v = rx.last();
    if (v !== void 0) return true;
  }
  return false;
};
var isReactive = (rx) => {
  if (typeof rx !== `object`) return false;
  if (rx === null) return false;
  return `on` in rx && `onValue` in rx;
};
var isWritable = (rx) => {
  if (!isReactive(rx)) return false;
  if (`set` in rx) return true;
  return false;
};
var isWrapped = (v) => {
  if (typeof v !== `object`) return false;
  if (!(`source` in v)) return false;
  if (!(`annotateElapsed` in v)) return false;
  return true;
};
var opify = (fn, ...args) => {
  return (source) => {
    return fn(source, ...args);
  };
};
var isTriggerValue = (t) => `value` in t;
var isTriggerFunction = (t) => `fn` in t;
var isTriggerGenerator = (t) => isIterable(t);
var isTrigger = (t) => {
  if (typeof t !== `object`) return false;
  if (isTriggerValue(t)) return true;
  if (isTriggerFunction(t)) return true;
  if (isTriggerGenerator(t)) return true;
  return false;
};
function resolveTriggerValue(t) {
  if (isTriggerValue(t)) return [t.value, false];
  if (isTriggerFunction(t)) {
    const v = t.fn();
    if (v === void 0) return [void 0, true];
    return [v, false];
  }
  if (isTriggerGenerator(t)) {
    const v = t.gen.next();
    if (v.done) return [void 0, true];
    return [v.value, false];
  }
  throw new Error(`Invalid trigger. Missing 'value' or 'fn' fields`);
}

// src/data/Resolve.ts
async function resolve(r, ...args) {
  if (typeof r === `object`) {
    if (`next` in r) {
      const tag = r[Symbol.toStringTag];
      if (tag === `Generator` || tag == `Array Iterator`) {
        const v = r.next();
        if (`done` in v && `value` in v) return v.value;
        return v;
      } else if (tag === `AsyncGenerator`) {
        const v = await r.next();
        if (`done` in v && `value` in v) return v.value;
        return v;
      } else {
        throw new Error(`Object has 'next' prop, but does not have 'AsyncGenerator', 'Generator' or 'Array Iterator' string tag symbol. Got: '${tag}'`);
      }
    } else if (isReactive(r)) {
      if (hasLast(r)) return r.last();
      throw new Error(`Reactive does not have last value`);
    } else {
      return r;
    }
  } else if (typeof r === `function`) {
    const v = await r(args);
    return v;
  } else {
    return r;
  }
}
function resolveSync(r, ...args) {
  if (typeof r === `object`) {
    if (`next` in r) {
      const tag = r[Symbol.toStringTag];
      if (tag === `Generator` || tag == `Array Iterator`) {
        const v = r.next();
        if (`done` in v && `value` in v) return v.value;
        return v;
      } else if (tag === `AsyncGenerator`) {
        throw new Error(`resolveSync cannot work with an async generator`);
      } else {
        throw new Error(`Object has 'next' prop, but does not have 'Generator' or 'Array Iterator' string tag symbol. Got: '${tag}'`);
      }
    } else if (isReactive(r)) {
      if (hasLast(r)) return r.last();
      throw new Error(`Reactive does not have last value`);
    } else {
      return r;
    }
  } else if (typeof r === `function`) {
    return r(args);
  } else {
    return r;
  }
}
async function resolveWithFallback(p, fallback, ...args) {
  let errored = false;
  let fallbackValue = fallback.value;
  const overrideWithLast = fallback.overrideWithLast ?? false;
  if (fallbackValue === void 0) throw new Error(`Needs a fallback value`);
  try {
    const r = await resolve(p, ...args);
    if (typeof r === `undefined`) return fallbackValue;
    if (typeof r === `number` && Number.isNaN(r)) return fallbackValue;
    if (overrideWithLast) fallbackValue = r;
    return r;
  } catch (error) {
    if (!errored) {
      errored = true;
      console.warn(`resolveWithFallback swallowed an error. Additional errors not reported.`, getErrorMessage(error));
    }
    return fallbackValue;
  }
}
function resolveWithFallbackSync(p, fallback, ...args) {
  let errored = false;
  let fallbackValue = fallback.value;
  const overrideWithLast = fallback.overrideWithLast ?? false;
  if (fallbackValue === void 0) throw new Error(`Needs a fallback value`);
  try {
    const r = resolveSync(p, ...args);
    if (typeof r === `undefined`) return fallbackValue;
    if (typeof r === `number` && Number.isNaN(r)) return fallbackValue;
    if (overrideWithLast) fallbackValue = r;
    return r;
  } catch (error) {
    if (!errored) {
      errored = true;
      console.warn(`resolveWithFallbackSync swallowed an error. Additional errors not reported.`, getErrorMessage(error));
    }
    return fallbackValue;
  }
}

export {
  messageIsSignal,
  messageIsDoneSignal,
  messageHasValue,
  isPingable,
  hasLast,
  isReactive,
  isWritable,
  isWrapped,
  opify,
  isTriggerValue,
  isTriggerFunction,
  isTriggerGenerator,
  isTrigger,
  resolveTriggerValue,
  resolve,
  resolveSync,
  resolveWithFallback,
  resolveWithFallbackSync
};
//# sourceMappingURL=chunk-TNZP4XTK.js.map