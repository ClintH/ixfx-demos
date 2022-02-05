import {
  msRelativeTimer
} from "./chunk-CKMPEC2A.js";
import {
  StateMachine
} from "./chunk-KYWIDCWW.js";
import {
  quadraticSimple,
  toPath
} from "./chunk-UW4D4N3E.js";
import {
  SimpleEventEmitter
} from "./chunk-JBDRQ5KW.js";
import {
  clamp,
  map
} from "./chunk-AUFNMJGA.js";
import {
  __export,
  __privateAdd,
  __privateGet,
  __privateSet,
  __publicField
} from "./chunk-FQLUQVDZ.js";

// src/modulation/index.ts
var modulation_exports = {};
__export(modulation_exports, {
  adsr: () => adsr,
  defaultAdsrOpts: () => defaultAdsrOpts,
  getEasings: () => getEasings,
  tick: () => tick,
  timer: () => timer
});

// src/modulation/Easing.ts
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
    __publicField(this, "releasedAt");
    this.attackDuration = opts.attackDuration ?? 300;
    this.decayDuration = opts.decayDuration ?? 500;
    this.releaseDuration = opts.releaseDuration ?? 1e3;
    this.shouldLoop = opts.shouldLoop ?? false;
    this.releasedAt = 0;
    const descr = {
      attack: [`decay`, `release`],
      decay: [`sustain`, `release`],
      sustain: [`release`],
      release: [`complete`],
      complete: null
    };
    __privateSet(this, _sm, new StateMachine(`attack`, descr));
    __privateGet(this, _sm).addEventListener(`change`, (ev) => {
      if (ev.newState === `release` && __privateGet(this, _holdingInitial)) {
        __privateGet(this, _timer)?.reset();
      }
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
      return false;
    let elapsed = __privateGet(this, _timer).elapsed();
    const wasHeld = __privateGet(this, _holdingInitial) && !__privateGet(this, _holding);
    let hasChanged = false;
    do {
      hasChanged = false;
      switch (__privateGet(this, _sm).state) {
        case `attack`:
          if (elapsed > this.attackDuration || wasHeld) {
            __privateGet(this, _sm).next();
            hasChanged = true;
          }
          break;
        case `decay`:
          if (elapsed > this.decayDurationTotal || wasHeld) {
            __privateGet(this, _sm).next();
            hasChanged = true;
          }
          break;
        case `sustain`:
          if (!__privateGet(this, _holding) || wasHeld) {
            elapsed = 0;
            __privateGet(this, _sm).next();
            __privateGet(this, _timer)?.reset();
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
    return hasChanged;
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
        this.releasedAt = relative;
        break;
      case `decay`:
        relative = (elapsed - this.attackDuration) / this.decayDuration;
        this.releasedAt = relative;
        break;
      case `sustain`:
        relative = 1;
        this.releasedAt = relative;
        break;
      case `release`:
        relative = Math.min(elapsed / this.releaseDuration, 1);
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
    if (!__privateGet(this, _holdingInitial))
      return;
    __privateSet(this, _holding, false);
    this.computeRaw();
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
    let v2;
    switch (stage) {
      case `attack`:
        v = this.attackPath.compute(amt).y;
        break;
      case `decay`:
        v = this.decayPath.compute(amt).y;
        break;
      case `sustain`:
        v = this.sustainLevel;
        break;
      case `release`:
        v = this.releasePath.compute(amt);
        v2 = map(v.y, 0, this.releaseLevel, 0, this.releasedAt);
        console.log(`Release level: ${this.releaseLevel} released at ${this.releasedAt} v: ${v.y} v2: ${v2}`);
        v = v2;
        break;
      case `complete`:
        v = this.releaseLevel;
        break;
      default:
        throw new Error(`Unknown state: ${stage}`);
    }
    return [stage, v, amt];
  }
};
var adsr = (opts) => new Adsr(opts);

export {
  timer,
  tick,
  getEasings,
  defaultAdsrOpts,
  adsr,
  modulation_exports
};
//# sourceMappingURL=chunk-D4W6YRFZ.js.map