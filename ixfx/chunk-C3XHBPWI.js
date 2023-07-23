import {
  SimpleEventEmitter,
  __export,
  __privateAdd,
  __privateGet,
  __privateSet
} from "./chunk-S6CC37P2.js";

// src/flow/StateMachine.ts
var StateMachine_exports = {};
__export(StateMachine_exports, {
  StateMachine: () => StateMachine,
  create: () => create,
  descriptionFromList: () => descriptionFromList,
  drive: () => drive,
  fromList: () => fromList,
  fromListBidirectional: () => fromListBidirectional
});

// src/Guards.ts
var number = (value, range = ``, paramName = `?`) => {
  if (typeof value === `undefined`)
    throw new Error(`Parameter ${paramName} is undefined`);
  if (Number.isNaN(value))
    throw new Error(`Parameter '${paramName}' is NaN`);
  if (typeof value !== `number`)
    throw new Error(`Parameter '${paramName}' is not a number (${value})`);
  switch (range) {
    case `positive`:
      if (value < 0)
        throw new Error(`Parameter '${paramName}' must be at least zero (${value})`);
      break;
    case `negative`:
      if (value > 0)
        throw new Error(`Parameter '${paramName}' must be zero or lower (${value})`);
      break;
    case `aboveZero`:
      if (value <= 0)
        throw new Error(`Parameter '${paramName}' must be above zero (${value})`);
      break;
    case `belowZero`:
      if (value >= 0)
        throw new Error(`Parameter '${paramName}' must be below zero (${value})`);
      break;
    case `percentage`:
      if (value > 1 || value < 0)
        throw new Error(`Parameter '${paramName}' must be in percentage range (0 to 1). (${value})`);
      break;
    case `nonZero`:
      if (value === 0)
        throw new Error(`Parameter '${paramName}' must non-zero. (${value})`);
      break;
    case `bipolar`:
      if (value > 1 || value < -1)
        throw new Error(`Parameter '${paramName}' must be in bipolar percentage range (-1 to 1). (${value})`);
      break;
  }
  return true;
};
var nullUndef = (value, paramName = "?") => {
  if (typeof value === `undefined`)
    throw new Error(`${paramName} param is undefined`);
  if (value === null)
    throw new Error(`${paramName} param is null`);
};
var percent = (value, paramName = `?`) => number(value, `percentage`, paramName);
var integer = (value, range = ``, paramName = `?`) => {
  number(value, range, paramName);
  if (!Number.isInteger(value))
    throw new Error(`Parameter ${paramName} is not an integer`);
};
var integerParse = (value, range = ``, defaultValue = Number.NaN) => {
  if (value === void 0)
    return defaultValue;
  if (value === null)
    return defaultValue;
  try {
    integer(Number.parseInt(value), range, "parsed");
  } catch (ex) {
    return defaultValue;
  }
  return parseInt(value);
};
var isStringArray = (value) => {
  if (!Array.isArray(value))
    return false;
  return value.find((v) => typeof v !== `string`) === void 0;
};
var array = (value, paramName = `?`) => {
  if (!Array.isArray(value))
    throw new Error(`Parameter '${paramName}' is expected to be an array'`);
};

// src/flow/StateMachine.ts
var isDriverDescription = (v) => {
  if (Array.isArray(v))
    return false;
  const vv = v;
  if (typeof vv.expressions !== `undefined`)
    return true;
  return false;
};
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
var bidirectionalDescriptionFromList = (...states) => {
  const t = {};
  for (let i = 0; i < states.length; i++) {
    t[states[i]] = [];
  }
  for (let i = 0; i < states.length; i++) {
    const v = t[states[i]];
    if (i === states.length - 1) {
      if (states.length > 1)
        v.push(states[i - 1]);
      else {
        t[states[i]] = null;
      }
    } else {
      v.push(states[i + 1]);
      if (i > 0)
        v.push(states[i - 1]);
    }
  }
  return t;
};
var fromList = (...states) => new StateMachine(states[0], descriptionFromList(...states));
var fromListBidirectional = (...states) => new StateMachine(states[0], bidirectionalDescriptionFromList(...states));
var create = (initial, m, opts = { debug: false }) => new StateMachine(initial, m, opts);
var _state, _debug, _m, _isDone, _initial, _changedAt;
var _StateMachine = class extends SimpleEventEmitter {
  /**
   * Create a state machine with initial state, description and options
   * @param string initial Initial state
   * @param MachineDescription m Machine description
   * @param Options Options for machine (defaults to `{debug:false}`)
   * @memberof StateMachine
   */
  constructor(initial, m, opts = { debug: false }) {
    super();
    // eslint-disable-next-line functional/prefer-readonly-type
    __privateAdd(this, _state, void 0);
    // eslint-disable-next-line functional/prefer-readonly-type
    __privateAdd(this, _debug, void 0);
    // eslint-disable-next-line functional/prefer-readonly-type
    __privateAdd(this, _m, void 0);
    // eslint-disable-next-line functional/prefer-readonly-type
    __privateAdd(this, _isDone, void 0);
    // eslint-disable-next-line functional/prefer-readonly-type
    __privateAdd(this, _initial, void 0);
    // eslint-disable-next-line functional/prefer-readonly-type
    __privateAdd(this, _changedAt, void 0);
    const [isValid, errorMsg] = _StateMachine.validate(initial, m);
    if (!isValid)
      throw new Error(errorMsg);
    __privateSet(this, _initial, initial);
    __privateSet(this, _m, m);
    __privateSet(this, _debug, opts.debug ?? false);
    __privateSet(this, _state, initial);
    __privateSet(this, _isDone, false);
    __privateSet(this, _changedAt, 0);
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
  /**
   * Moves to the next state if possible. If multiple states are possible, it will use the first.
   * If machine is finalised, no error is thrown and null is returned.
   * 
   * @returns {(string|null)} Returns new state, or null if machine is finalised
   * @memberof StateMachine
   */
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
  /**
   * Returns true if state machine is in its final state
   *
   * @returns
   * @memberof StateMachine
   */
  get isDone() {
    return __privateGet(this, _isDone);
  }
  /**
   * Resets machine to initial state
   *
   * @memberof StateMachine
   */
  reset() {
    __privateSet(this, _isDone, false);
    __privateSet(this, _state, __privateGet(this, _initial));
    __privateSet(this, _changedAt, Date.now());
  }
  /**
   * Checks whether a state change is valid.
   *
   * @static
   * @param priorState From state
   * @param newState To state
   * @param description Machine description
   * @returns If valid: [true,''], if invalid: [false, 'Error msg here']
   * @memberof StateMachine
   */
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
  /**
   * Gets or sets state. Throws an error if an invalid transition is attempted.
   * Use `StateMachine.isValid` to check validity without changing.
   * 
   * If `newState` is the same as current state, the request is ignored silently.
   *
   * @memberof StateMachine
   */
  set state(newState) {
    const priorState = __privateGet(this, _state);
    if (newState === priorState)
      return;
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
    __privateSet(this, _changedAt, Date.now());
    setTimeout(() => {
      this.fireEvent(`change`, { newState, priorState });
      if (this.isDone)
        this.fireEvent(`stop`, { state: newState });
    }, 1);
  }
  get state() {
    return __privateGet(this, _state);
  }
  /**
   * Returns timestamp when state was last changed.
   * See also `elapsed`
   */
  get changedAt() {
    return __privateGet(this, _changedAt);
  }
  /**
   * Returns milliseconds elapsed since last state change.
   * See also `changedAt`
   */
  get elapsed() {
    return Date.now() - __privateGet(this, _changedAt);
  }
};
var StateMachine = _StateMachine;
_state = new WeakMap();
_debug = new WeakMap();
_m = new WeakMap();
_isDone = new WeakMap();
_initial = new WeakMap();
_changedAt = new WeakMap();
var normaliseDriverDescription = (d) => {
  const select = d.select ?? `first`;
  const expressions = Array.isArray(d.expressions) ? d.expressions : [d.expressions];
  const n = {
    select,
    expressions,
    tryAll: d.tryAll ?? true
  };
  return n;
};
var sortResults = (arr = []) => {
  const a = arr.filter((v) => v !== void 0);
  a.sort((a2, b) => {
    const aScore = a2.score ?? 0;
    const bScore = b.score ?? 0;
    if (aScore === bScore)
      return 0;
    if (aScore > bScore)
      return -1;
    return 1;
  });
  return a;
};
var drive = (sm, driver) => {
  const defaultSelect = `first`;
  const d = {};
  for (const key of Object.keys(driver)) {
    const branch = driver[key];
    if (isDriverDescription(branch)) {
      d[key] = normaliseDriverDescription(branch);
    } else if (Array.isArray(branch)) {
      d[key] = {
        select: defaultSelect,
        expressions: branch,
        tryAll: true
      };
    } else {
      d[key] = {
        select: defaultSelect,
        tryAll: true,
        expressions: [branch]
      };
    }
  }
  const drive2 = (r) => {
    try {
      if (typeof r.next !== void 0 && r.next) {
        sm.next();
      } else if (typeof r.state !== void 0) {
        sm.state = r.state;
      } else if (typeof r.reset !== void 0 && r.reset) {
        sm.reset();
      } else {
        throw new Error(`Result has neither 'reset', 'next' nor 'state' properties needed to drive state machine`);
      }
      return true;
    } catch (ex) {
      console.warn(ex);
      return false;
    }
  };
  const processResultSet = (branch, resultSet) => {
    for (const result of resultSet) {
      if (drive2(result))
        return true;
      if (!branch.tryAll)
        break;
    }
    return false;
  };
  const processBranch = (branch, args) => {
    if (!branch)
      return false;
    let handled = false;
    switch (branch.select) {
      case `first`:
        for (const expr of branch.expressions) {
          const r = expr(args);
          if (!r)
            continue;
          if (drive2(r)) {
            handled = true;
            break;
          }
        }
        break;
      case `highest`:
        handled = processResultSet(branch, [...sortResults(branch.expressions.map((e) => e(args)))]);
        break;
      case `lowest`:
        handled = processResultSet(branch, [...sortResults(branch.expressions.map((e) => e(args)))].reverse());
        break;
      default:
        throw new Error(`Unknown select type: ${branch.select}. Expected first, highest or lowest`);
    }
    return handled;
  };
  const process = (args) => {
    let branch = d[sm.state];
    if (!branch && sm.isDone)
      d[`__done`];
    if (!branch)
      branch = d[`__default`];
    let handled = processBranch(branch, args);
    if (!handled) {
      branch = d[`__fallback`];
      handled = processBranch(branch, args);
    }
  };
  return process;
};

export {
  number,
  nullUndef,
  percent,
  integer,
  integerParse,
  array,
  descriptionFromList,
  fromList,
  fromListBidirectional,
  create,
  StateMachine,
  drive,
  StateMachine_exports
};
//# sourceMappingURL=chunk-C3XHBPWI.js.map