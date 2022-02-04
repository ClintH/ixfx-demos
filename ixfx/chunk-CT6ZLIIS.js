import {
  isStringArray,
  quadraticSimple,
  toPath
} from "./chunk-KMINRPBY.js";
import {
  SimpleEventEmitter
} from "./chunk-DJIAFAUX.js";
import {
  clamp
} from "./chunk-H4TGENJF.js";
import {
  __export,
  __privateAdd,
  __privateGet,
  __privateSet,
  __publicField
} from "./chunk-FQLUQVDZ.js";

// src/modulation/Envelope.ts
var Envelope_exports = {};
__export(Envelope_exports, {
  adsr: () => adsr,
  defaultAdsrOpts: () => defaultAdsrOpts
});

// src/Timer.ts
var msRelativeTimer = () => {
  let start = window.performance.now();
  return {
    reset: () => {
      start = window.performance.now();
    },
    elapsed: () => window.performance.now() - start
  };
};

// src/StateMachine.ts
var fromList = (...states) => {
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
        return [false, `Machine cannot ${priorState} -> ${newState}. Allowed transitions: ${rules.join(`, `)}`];
    } else {
      if (newState !== rules && rules !== `*`)
        return [false, `Machine cannot ${priorState} -> ${newState}. Allowed transition: ${rules}`];
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

// src/modulation/Envelope.ts
var defaultAdsrOpts = () => ({
  attackBend: -1,
  decayBend: -0.3,
  releaseBend: -0.3,
  peakLevel: 1,
  initialLevel: 0,
  sustainLevel: 0.6,
  releaseLevel: 0,
  attackDuration: 600,
  decayDuration: 200,
  releaseDuration: 800,
  shouldLoop: false
});
var _sm, _timeSource, _timer, _holding, _holdingInitial;
var AdsrBase = class extends SimpleEventEmitter {
  constructor(opts) {
    super();
    __privateAdd(this, _sm, void 0);
    __privateAdd(this, _timeSource, void 0);
    __privateAdd(this, _timer, void 0);
    __privateAdd(this, _holding, void 0);
    __privateAdd(this, _holdingInitial, void 0);
    __publicField(this, "attackDuration");
    __publicField(this, "decayDuration");
    __publicField(this, "releaseDuration");
    __publicField(this, "decayDurationTotal");
    __publicField(this, "shouldLoop");
    this.attackDuration = opts.attackDuration ?? 300;
    this.decayDuration = opts.decayDuration ?? 500;
    this.releaseDuration = opts.releaseDuration ?? 1e3;
    this.shouldLoop = opts.shouldLoop ?? false;
    const descr = fromList(`attack`, `decay`, `sustain`, `release`, `complete`);
    __privateSet(this, _sm, new StateMachine(`attack`, descr));
    __privateGet(this, _sm).addEventListener(`change`, (ev) => {
      super.fireEvent(`change`, ev);
    });
    __privateGet(this, _sm).addEventListener(`stop`, (ev) => {
      super.fireEvent(`complete`, ev);
    });
    __privateSet(this, _timeSource, msRelativeTimer);
    __privateSet(this, _holding, __privateSet(this, _holdingInitial, false));
    this.decayDurationTotal = this.attackDuration + this.decayDuration;
  }
  switchState() {
    if (__privateGet(this, _timer) === void 0)
      return;
    let elapsed = __privateGet(this, _timer).elapsed();
    let hasChanged = false;
    do {
      hasChanged = false;
      switch (__privateGet(this, _sm).state) {
        case `attack`:
          if (elapsed > this.attackDuration) {
            __privateGet(this, _sm).next();
            hasChanged = true;
          }
          break;
        case `decay`:
          if (elapsed > this.decayDurationTotal) {
            __privateGet(this, _sm).next();
            hasChanged = true;
          }
          break;
        case `sustain`:
          if (!__privateGet(this, _holding)) {
            elapsed = 0;
            __privateGet(this, _timer)?.reset();
            __privateGet(this, _sm).next();
            hasChanged = true;
          }
          break;
        case `release`:
          if (elapsed > this.releaseDuration) {
            __privateGet(this, _sm).next();
            hasChanged = true;
          }
          break;
        case `complete`:
          if (this.shouldLoop) {
            this.trigger(__privateGet(this, _holdingInitial));
          }
      }
    } while (hasChanged);
  }
  computeRaw() {
    if (__privateGet(this, _timer) === void 0)
      return [void 0, 0];
    this.switchState();
    const elapsed = __privateGet(this, _timer).elapsed();
    let relative = 0;
    const state = __privateGet(this, _sm).state;
    switch (state) {
      case `attack`:
        relative = elapsed / this.attackDuration;
        break;
      case `decay`:
        relative = (elapsed - this.attackDuration) / this.decayDuration;
        break;
      case `sustain`:
        relative = 1;
        break;
      case `release`:
        relative = elapsed / this.releaseDuration;
        break;
      case `complete`:
        return [void 0, 0];
      default:
        throw new Error(`State machine in unknown state: ${state}`);
    }
    return [state, relative];
  }
  get isDone() {
    return __privateGet(this, _sm).isDone;
  }
  trigger(hold = false) {
    __privateGet(this, _sm).reset();
    __privateSet(this, _timer, __privateGet(this, _timeSource).call(this));
    __privateSet(this, _holding, hold);
    __privateSet(this, _holdingInitial, hold);
  }
  release() {
    __privateSet(this, _holding, false);
  }
};
_sm = new WeakMap();
_timeSource = new WeakMap();
_timer = new WeakMap();
_holding = new WeakMap();
_holdingInitial = new WeakMap();
var Adsr = class extends AdsrBase {
  constructor(opts) {
    super(opts);
    __publicField(this, "attackPath");
    __publicField(this, "decayPath");
    __publicField(this, "releasePath");
    __publicField(this, "initialLevel");
    __publicField(this, "peakLevel");
    __publicField(this, "releaseLevel");
    __publicField(this, "sustainLevel");
    __publicField(this, "attackBend");
    __publicField(this, "decayBend");
    __publicField(this, "releaseBend");
    this.initialLevel = opts.initialLevel ?? 0;
    this.peakLevel = opts.peakLevel ?? 1;
    this.releaseLevel = opts.releaseLevel ?? 0;
    this.sustainLevel = opts.sustainLevel ?? 0.75;
    this.attackBend = opts.attackBend ?? 0;
    this.releaseBend = opts.releaseBend ?? 0;
    this.decayBend = opts.decayBend ?? 0;
    const max = 1;
    this.attackPath = toPath(quadraticSimple({ x: 0, y: this.initialLevel }, { x: max, y: this.peakLevel }, -this.attackBend));
    this.decayPath = toPath(quadraticSimple({ x: 0, y: this.peakLevel }, { x: max, y: this.sustainLevel }, -this.decayBend));
    this.releasePath = toPath(quadraticSimple({ x: 0, y: this.sustainLevel }, { x: max, y: this.releaseLevel }, -this.releaseBend));
  }
  compute() {
    const [stage, amt] = super.computeRaw();
    if (stage === void 0)
      return [void 0, NaN, NaN];
    let v;
    switch (stage) {
      case `attack`:
        v = this.attackPath.compute(amt);
        break;
      case `decay`:
        v = this.decayPath.compute(amt);
        break;
      case `sustain`:
        v = { x: 1, y: this.sustainLevel };
        break;
      case `release`:
        v = this.releasePath.compute(amt);
        break;
      case `complete`:
        v = { x: 1, y: this.releaseLevel };
        break;
      default:
        throw new Error(`Unknown state: ${stage}`);
    }
    return [stage, v.y, amt];
  }
};
var adsr = (opts) => new Adsr(opts);

// src/modulation/Easing.ts
var Easing_exports = {};
__export(Easing_exports, {
  getEasings: () => getEasings,
  tick: () => tick,
  timer: () => timer
});
var sqrt = Math.sqrt;
var pow = Math.pow;
var cos = Math.cos;
var PI = Math.PI;
var sin = Math.sin;
var msRelativeTimer2 = function(upperBound) {
  let start = performance.now();
  return {
    reset: () => {
      start = performance.now();
    },
    elapsed: () => clamp((performance.now() - start) / upperBound),
    isDone: () => performance.now() - start >= upperBound
  };
};
var tickRelativeTimer = function(upperBound) {
  let start = 0;
  return {
    reset: () => {
      start = 0;
    },
    elapsed: () => clamp(start++ / upperBound),
    isDone: () => start >= upperBound
  };
};
var timer = function(easingName, durationMs) {
  return create(easingName, durationMs, msRelativeTimer2);
};
var tick = function(easingName, durationTicks) {
  return create(easingName, durationTicks, tickRelativeTimer);
};
var create = function(easingName, duration, timerSource) {
  const fn = resolveEasing(easingName);
  const timer2 = timerSource(duration);
  return {
    isDone: () => timer2.isDone(),
    compute: () => {
      const relative = timer2.elapsed();
      return fn(relative);
    },
    reset: () => {
      timer2.reset();
    }
  };
};
var resolveEasing = function(easingName) {
  const name = easingName.toLowerCase();
  for (const [k, v] of Object.entries(easings)) {
    if (k.toLowerCase() === name) {
      return v;
    }
  }
  throw Error(`Easing '${easingName}' not found.`);
};
var getEasings = function() {
  return Array.from(Object.keys(easings));
};
var easeOutBounce = function(x) {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
};
var easings = {
  easeInSine: (x) => 1 - cos(x * PI / 2),
  easeOutSine: (x) => sin(x * PI / 2),
  easeInQuad: (x) => x * x,
  easeOutQuad: (x) => 1 - (1 - x) * (1 - x),
  easeInOutSine: (x) => -(cos(PI * x) - 1) / 2,
  easeInOutQuad: (x) => x < 0.5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2,
  easeInCubic: (x) => x * x * x,
  easeOutCubic: (x) => 1 - pow(1 - x, 3),
  easeInQuart: (x) => x * x * x * x,
  easeOutQuart: (x) => 1 - pow(1 - x, 4),
  easeInQuint: (x) => x * x * x * x * x,
  easeOutQuint: (x) => 1 - pow(1 - x, 5),
  easeInExpo: (x) => x === 0 ? 0 : pow(2, 10 * x - 10),
  easeOutExpo: (x) => x === 1 ? 1 : 1 - pow(2, -10 * x),
  easeInOutQuint: (x) => x < 0.5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2,
  easeInOutExpo: (x) => x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? pow(2, 20 * x - 10) / 2 : (2 - pow(2, -20 * x + 10)) / 2,
  easeInCirc: (x) => 1 - sqrt(1 - pow(x, 2)),
  easeOutCirc: (x) => sqrt(1 - pow(x - 1, 2)),
  easeInBack: (x) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return c3 * x * x * x - c1 * x * x;
  },
  easeOutBack: (x) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2);
  },
  easeInOutCirc: (x) => x < 0.5 ? (1 - sqrt(1 - pow(2 * x, 2))) / 2 : (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2,
  easeInOutBack: (x) => {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;
    return x < 0.5 ? pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2) / 2 : (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
  },
  easeInElastic: (x) => {
    const c4 = 2 * PI / 3;
    return x === 0 ? 0 : x === 1 ? 1 : -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4);
  },
  easeOutElastic: (x) => {
    const c4 = 2 * PI / 3;
    return x === 0 ? 0 : x === 1 ? 1 : pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1;
  },
  easeInBounce: (x) => 1 - easeOutBounce(1 - x),
  easeOutBounce,
  easeInOutElastic: (x) => {
    const c5 = 2 * PI / 4.5;
    return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2 : pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5) / 2 + 1;
  },
  easeInOutBounce: (x) => x < 0.5 ? (1 - easeOutBounce(1 - 2 * x)) / 2 : (1 + easeOutBounce(2 * x - 1)) / 2
};

export {
  Envelope_exports,
  Easing_exports
};
//# sourceMappingURL=chunk-CT6ZLIIS.js.map