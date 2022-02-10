import {
  msElapsedTimer,
  relativeTimer,
  ticksElapsedTimer
} from "./chunk-SLNVYYA3.js";
import {
  quadraticSimple,
  toPath
} from "./chunk-HF2GNML5.js";
import {
  scale
} from "./chunk-L73ZEV4V.js";
import {
  StateMachine
} from "./chunk-IARP4YHS.js";
import {
  SimpleEventEmitter
} from "./chunk-HCHJFXUB.js";
import {
  __export,
  __privateAdd,
  __privateGet,
  __privateSet,
  __publicField
} from "./chunk-YDTVC7MM.js";

// src/modulation/index.ts
var modulation_exports = {};
__export(modulation_exports, {
  Oscillators: () => Oscillator_exports,
  adsr: () => adsr,
  defaultAdsrOpts: () => defaultAdsrOpts,
  easeOverTicks: () => easeOverTicks,
  easeOverTime: () => easeOverTime,
  getEasings: () => getEasings
});

// src/modulation/Easing.ts
var sqrt = Math.sqrt;
var pow = Math.pow;
var cos = Math.cos;
var pi = Math.PI;
var sin = Math.sin;
var easeOverTime = function(name, durationMs) {
  return create(name, durationMs, msElapsedTimer);
};
var easeOverTicks = function(name, durationTicks) {
  return create(name, durationTicks, ticksElapsedTimer);
};
var create = function(name, duration, timerSource) {
  const fn = resolveEasing(name);
  const timer = relativeTimer(duration, timerSource(), true);
  return {
    get isDone() {
      return timer.isDone;
    },
    compute: () => {
      const relative = timer.elapsed;
      return fn(relative);
    },
    reset: () => {
      timer.reset();
    }
  };
};
var resolveEasing = function(name) {
  name = name.toLocaleLowerCase();
  const found = Object.entries(easings).find(([k, _v]) => k.toLocaleLowerCase() === name);
  if (found === void 0)
    throw new Error(`Easing '${name}' not found.`);
  return found[1];
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
  easeInSine: (x) => 1 - cos(x * pi / 2),
  easeOutSine: (x) => sin(x * pi / 2),
  easeInQuad: (x) => x * x,
  easeOutQuad: (x) => 1 - (1 - x) * (1 - x),
  easeInOutSine: (x) => -(cos(pi * x) - 1) / 2,
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
    const c4 = 2 * pi / 3;
    return x === 0 ? 0 : x === 1 ? 1 : -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4);
  },
  easeOutElastic: (x) => {
    const c4 = 2 * pi / 3;
    return x === 0 ? 0 : x === 1 ? 1 : pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1;
  },
  easeInBounce: (x) => 1 - easeOutBounce(1 - x),
  easeOutBounce,
  easeInOutElastic: (x) => {
    const c5 = 2 * pi / 4.5;
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
    this.attackDuration = opts.attackDuration ?? 300;
    this.decayDuration = opts.decayDuration ?? 500;
    this.releaseDuration = opts.releaseDuration ?? 1e3;
    this.shouldLoop = opts.shouldLoop ?? false;
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
    __privateSet(this, _timeSource, msElapsedTimer);
    __privateSet(this, _holding, __privateSet(this, _holdingInitial, false));
    this.decayDurationTotal = this.attackDuration + this.decayDuration;
  }
  switchState() {
    if (__privateGet(this, _timer) === void 0)
      return false;
    let elapsed = __privateGet(this, _timer).elapsed;
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
  computeRaw(allowStateChange = true) {
    if (__privateGet(this, _timer) === void 0)
      return [void 0, 0, __privateGet(this, _sm).state];
    if (allowStateChange)
      this.switchState();
    const prevStage = __privateGet(this, _sm).state;
    const elapsed = __privateGet(this, _timer).elapsed;
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
        relative = Math.min(elapsed / this.releaseDuration, 1);
        break;
      case `complete`:
        return [void 0, 1, prevStage];
      default:
        throw new Error(`State machine in unknown state: ${state}`);
    }
    return [state, relative, prevStage];
  }
  get isDone() {
    return __privateGet(this, _sm).isDone;
  }
  onTrigger() {
  }
  trigger(hold = false) {
    this.onTrigger();
    __privateGet(this, _sm).reset();
    __privateSet(this, _timer, __privateGet(this, _timeSource).call(this));
    __privateSet(this, _holding, hold);
    __privateSet(this, _holdingInitial, hold);
  }
  compute() {
  }
  release() {
    if (this.isDone || !__privateGet(this, _holdingInitial))
      return;
    __privateSet(this, _holding, false);
    this.compute();
  }
};
_sm = new WeakMap();
_timeSource = new WeakMap();
_timer = new WeakMap();
_holding = new WeakMap();
_holdingInitial = new WeakMap();
var AdsrImpl = class extends AdsrBase {
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
    __publicField(this, "initialLevelOverride");
    __publicField(this, "retrigger");
    __publicField(this, "releasedAt");
    this.initialLevel = opts.initialLevel ?? 0;
    this.peakLevel = opts.peakLevel ?? 1;
    this.releaseLevel = opts.releaseLevel ?? 0;
    this.sustainLevel = opts.sustainLevel ?? 0.75;
    this.retrigger = opts.retrigger ?? true;
    this.attackBend = opts.attackBend ?? 0;
    this.releaseBend = opts.releaseBend ?? 0;
    this.decayBend = opts.decayBend ?? 0;
    const max = 1;
    this.attackPath = toPath(quadraticSimple({ x: 0, y: this.initialLevel }, { x: max, y: this.peakLevel }, -this.attackBend));
    this.decayPath = toPath(quadraticSimple({ x: 0, y: this.peakLevel }, { x: max, y: this.sustainLevel }, -this.decayBend));
    this.releasePath = toPath(quadraticSimple({ x: 0, y: this.sustainLevel }, { x: max, y: this.releaseLevel }, -this.releaseBend));
  }
  onTrigger() {
    this.initialLevelOverride = void 0;
    if (!this.retrigger) {
      const [_stage, scaled, _raw] = this.compute();
      if (!Number.isNaN(scaled) && scaled > 0) {
        console.log(`Retrigger. Last value was: ${scaled}`);
        this.initialLevelOverride = scaled;
      }
    }
  }
  compute(allowStateChange = true) {
    const [stage, amt] = super.computeRaw(allowStateChange);
    if (stage === void 0)
      return [void 0, NaN, NaN];
    let v;
    switch (stage) {
      case `attack`:
        v = this.attackPath.compute(amt).y;
        if (this.initialLevelOverride !== void 0) {
          v = scale(v, 0, this.initialLevel, this.initialLevelOverride, this.initialLevel);
        }
        this.releasedAt = v;
        break;
      case `decay`:
        v = this.decayPath.compute(amt).y;
        this.releasedAt = v;
        break;
      case `sustain`:
        v = this.sustainLevel;
        this.releasedAt = v;
        break;
      case `release`:
        v = this.releasePath.compute(amt).y;
        if (this.releasedAt !== void 0)
          v = scale(v, 0, this.sustainLevel, 0, this.releasedAt);
        break;
      case `complete`:
        v = this.releaseLevel;
        this.releasedAt = void 0;
        break;
      default:
        throw new Error(`Unknown state: ${stage}`);
    }
    return [stage, v, amt];
  }
};
var adsr = (opts) => new AdsrImpl(opts);

// src/modulation/Oscillator.ts
var Oscillator_exports = {};
__export(Oscillator_exports, {
  saw: () => saw,
  sine: () => sine,
  sineBipolar: () => sineBipolar,
  square: () => square,
  triangle: () => triangle
});
function* sine(timerSrc) {
  const t = timerSrc();
  while (true) {
    yield (Math.sin(t.elapsed * Math.PI * 2) + 1) / 2;
  }
}
function* sineBipolar(timerSrc) {
  const t = timerSrc();
  while (true) {
    yield Math.sin(t.elapsed * Math.PI * 2);
  }
}
function* triangle(timerSrc) {
  const t = timerSrc();
  while (true) {
    let v = t.elapsed;
    if (v < 0.5) {
      v *= 2;
    } else {
      v = 2 - v * 2;
    }
    yield v;
  }
}
function* saw(timerSrc) {
  const t = timerSrc();
  while (true) {
    yield t.elapsed;
  }
}
function* square(timerSrc) {
  const t = timerSrc();
  while (true) {
    const v = t.elapsed;
    if (v < 0.5)
      yield 0;
    yield 1;
  }
}

export {
  easeOverTime,
  easeOverTicks,
  getEasings,
  defaultAdsrOpts,
  adsr,
  Oscillator_exports,
  modulation_exports
};
