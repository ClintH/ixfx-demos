import {
  StateMachine
} from "./chunk-MP2OP3C7.js";
import {
  quadraticSimple,
  toPath
} from "./chunk-U4UMT6UO.js";
import {
  Easing_exports,
  defaultRandom
} from "./chunk-6KAONILS.js";
import {
  SimpleEventEmitter
} from "./chunk-HCHJFXUB.js";
import {
  frequencyTimer,
  msElapsedTimer
} from "./chunk-MGRO6247.js";
import {
  clamp,
  scale
} from "./chunk-YSYB6TIS.js";
import {
  number
} from "./chunk-6M44PDIN.js";
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
  Easings: () => Easing_exports,
  Oscillators: () => Oscillator_exports,
  adsr: () => adsr,
  defaultAdsrOpts: () => defaultAdsrOpts,
  jitter: () => jitter
});

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
  get value() {
    return this.compute(true)[1];
  }
  compute(allowStateChange = true) {
    const [stage, amt] = super.computeRaw(allowStateChange);
    if (stage === void 0)
      return [void 0, NaN, NaN];
    let v;
    switch (stage) {
      case `attack`:
        v = this.attackPath.interpolate(amt).y;
        if (this.initialLevelOverride !== void 0) {
          v = scale(v, 0, this.initialLevel, this.initialLevelOverride, this.initialLevel);
        }
        this.releasedAt = v;
        break;
      case `decay`:
        v = this.decayPath.interpolate(amt).y;
        this.releasedAt = v;
        break;
      case `sustain`:
        v = this.sustainLevel;
        this.releasedAt = v;
        break;
      case `release`:
        v = this.releasePath.interpolate(amt).y;
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
function* sine(timerOrFreq) {
  if (typeof timerOrFreq === `number`)
    timerOrFreq = frequencyTimer(timerOrFreq);
  while (true) {
    yield (Math.sin(timerOrFreq.elapsed * Math.PI * 2) + 1) / 2;
  }
}
function* sineBipolar(timerOrFreq) {
  if (typeof timerOrFreq === `number`)
    timerOrFreq = frequencyTimer(timerOrFreq);
  while (true) {
    yield Math.sin(timerOrFreq.elapsed * Math.PI * 2);
  }
}
function* triangle(timerOrFreq) {
  if (typeof timerOrFreq === `number`)
    timerOrFreq = frequencyTimer(timerOrFreq);
  while (true) {
    let v = timerOrFreq.elapsed;
    if (v < 0.5) {
      v *= 2;
    } else {
      v = 2 - v * 2;
    }
    yield v;
  }
}
function* saw(timerOrFreq) {
  if (typeof timerOrFreq === `number`)
    timerOrFreq = frequencyTimer(timerOrFreq);
  while (true) {
    yield timerOrFreq.elapsed;
  }
}
function* square(timerOrFreq) {
  if (typeof timerOrFreq === `number`)
    timerOrFreq = frequencyTimer(timerOrFreq);
  while (true) {
    yield timerOrFreq.elapsed < 0.5 ? 0 : 1;
  }
}

// src/modulation/index.ts
var jitter = (value, jitter2, opts = {}, rand = defaultRandom) => {
  number(value, `percentage`, `value`);
  number(jitter2, `percentage`, `jitter`);
  const type = opts.type ?? `abs`;
  const clamped = opts.clamped ?? true;
  let v;
  if (type === `rel`) {
    jitter2 = value * jitter2;
    const j = jitter2 * 2 * rand();
    v = value - jitter2 + j;
  } else if (type === `abs`) {
    const j = jitter2 * 2 * rand();
    v = value - jitter2 + j;
  } else {
    throw new Error(`Unknown jitter type: ${type}.`);
  }
  if (clamped)
    return clamp(v);
  return v;
};

export {
  defaultAdsrOpts,
  adsr,
  Oscillator_exports,
  jitter,
  modulation_exports
};
