import {
  isStringArray
} from "./chunk-6M44PDIN.js";
import {
  SimpleEventEmitter
} from "./chunk-HCHJFXUB.js";
import {
  __export,
  __privateAdd,
  __privateGet,
  __privateSet
} from "./chunk-YDTVC7MM.js";

// src/flow/StateMachine.ts
var StateMachine_exports = {};
__export(StateMachine_exports, {
  StateMachine: () => StateMachine,
  create: () => create,
  descriptionFromList: () => descriptionFromList,
  fromList: () => fromList
});
var descriptionFromList = (...states) => {
  const t = {};
  for (let i = 0; i < states.length; i++) {
    if (i === states.length - 1) {
      t[states[i]] = null;
    } else {
      t[states[i]] = states[i + 1];
    }
  }
  return t;
};
var fromList = (...states) => new StateMachine(states[0], descriptionFromList(...states));
var create = (initial, m, opts = { debug: false }) => new StateMachine(initial, m, opts);
var _state, _debug, _m, _isDone, _initial;
var _StateMachine = class extends SimpleEventEmitter {
  constructor(initial, m, opts = { debug: false }) {
    super();
    __privateAdd(this, _state, void 0);
    __privateAdd(this, _debug, void 0);
    __privateAdd(this, _m, void 0);
    __privateAdd(this, _isDone, void 0);
    __privateAdd(this, _initial, void 0);
    const [isValid, errorMsg] = _StateMachine.validate(initial, m);
    if (!isValid)
      throw new Error(errorMsg);
    __privateSet(this, _initial, initial);
    __privateSet(this, _m, m);
    __privateSet(this, _debug, opts.debug ?? false);
    __privateSet(this, _state, initial);
    __privateSet(this, _isDone, false);
  }
  get states() {
    return Object.keys(__privateGet(this, _m));
  }
  static validate(initial, m) {
    const keys = Object.keys(m);
    const finalStates = [];
    const seenKeys = /* @__PURE__ */ new Set();
    const seenVals = /* @__PURE__ */ new Set();
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (seenKeys.has(key))
        return [false, `Key ${key} is already used`];
      seenKeys.add(key);
      if (typeof keys[i] !== `string`)
        return [false, `Key[${i}] is not a string`];
      const val = m[key];
      if (val === void 0)
        return [false, `Key ${key} value is undefined`];
      if (typeof val === `string`) {
        seenVals.add(val);
        if (val === key)
          return [false, `Loop present for ${key}`];
      } else if (Array.isArray(val)) {
        if (!isStringArray(val))
          return [false, `Key ${key} value is not an array of strings`];
        val.forEach((v) => seenVals.add(v));
        if (val.find((v) => v === key))
          return [false, `Loop present for ${key}`];
      } else if (val === null) {
        finalStates.push(key);
      } else {
        return [false, `Key ${key} has a value that is neither null, string or array`];
      }
    }
    const seenValsArray = Array.from(seenVals);
    const missing = seenValsArray.find((v) => !seenKeys.has(v));
    if (missing)
      return [false, `Potential state '${missing}' does not exist as a top-level state`];
    if (m[initial] === void 0)
      return [false, `Initial state ${initial} not present`];
    return [true, ``];
  }
  next() {
    const r = __privateGet(this, _m)[__privateGet(this, _state)];
    if (r === null)
      return null;
    if (Array.isArray(r)) {
      if (typeof r[0] === `string`)
        this.state = r[0];
      else
        throw new Error(`Error in machine description. Potential state array does not contain strings`);
    } else if (typeof r === `string`) {
      this.state = r;
    } else
      throw new Error(`Error in machine description. Potential state is neither array nor string`);
    return this.state;
  }
  get isDone() {
    return __privateGet(this, _isDone);
  }
  reset() {
    __privateSet(this, _isDone, false);
    __privateSet(this, _state, __privateGet(this, _initial));
  }
  static isValid(priorState, newState, description) {
    if (description[newState] === void 0)
      return [false, `Machine cannot change to non-existent state ${newState}`];
    const rules = description[priorState];
    if (Array.isArray(rules)) {
      if (!rules.includes(newState))
        return [false, `Machine cannot change '${priorState} -> ${newState}'. Allowed transitions: ${rules.join(`, `)}`];
    } else {
      if (newState !== rules && rules !== `*`)
        return [false, `Machine cannot '${priorState} -> ${newState}'. Allowed transition: ${rules}`];
    }
    return [true, `ok`];
  }
  isValid(newState) {
    return _StateMachine.isValid(this.state, newState, __privateGet(this, _m));
  }
  set state(newState) {
    const priorState = __privateGet(this, _state);
    const [isValid, errorMsg] = _StateMachine.isValid(priorState, newState, __privateGet(this, _m));
    if (!isValid)
      throw new Error(errorMsg);
    if (__privateGet(this, _debug))
      console.log(`StateMachine: ${priorState} -> ${newState}`);
    __privateSet(this, _state, newState);
    const rules = __privateGet(this, _m)[newState];
    if (rules === null) {
      __privateSet(this, _isDone, true);
    }
    setTimeout(() => {
      this.fireEvent(`change`, { newState, priorState });
      if (this.isDone)
        this.fireEvent(`stop`, { state: newState });
    }, 1);
  }
  get state() {
    return __privateGet(this, _state);
  }
};
var StateMachine = _StateMachine;
_state = new WeakMap();
_debug = new WeakMap();
_m = new WeakMap();
_isDone = new WeakMap();
_initial = new WeakMap();

export {
  descriptionFromList,
  fromList,
  create,
  StateMachine,
  StateMachine_exports
};
