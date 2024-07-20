import {
  jitter,
  jitterAbsolute,
  pingPong,
  pingPongPercent
} from "./chunk-TTX527YE.js";
import {
  Easing_exports
} from "./chunk-FCEXFCW7.js";
import {
  interpolateAngle
} from "./chunk-YEZDB5LJ.js";
import {
  Polar_exports,
  divide,
  getEdgeX,
  getEdgeY,
  point_exports,
  quadraticSimple,
  toPath
} from "./chunk-EX6BFSZ7.js";
import {
  scale
} from "./chunk-4NG2GB4D.js";
import {
  interval
} from "./chunk-RNUQGND2.js";
import {
  StateMachineWithEvents
} from "./chunk-XONNGZY5.js";
import {
  frequencyTimer,
  msElapsedTimer
} from "./chunk-4LUNZR7B.js";
import {
  clamp
} from "./chunk-REDAXMKO.js";
import {
  SimpleEventEmitter
} from "./chunk-QZPNGNL4.js";
import {
  intervalToMs
} from "./chunk-37WZU5ZM.js";
import {
  throwIntegerTest,
  throwNumberTest
} from "./chunk-JIDOUNL5.js";
import {
  __export
} from "./chunk-AFNFQUHK.js";

// src/modulation/index.ts
var modulation_exports = {};
__export(modulation_exports, {
  Easings: () => Easing_exports,
  Envelopes: () => Envelope_exports,
  Forces: () => Forces_exports,
  Oscillators: () => Oscillator_exports,
  Sources: () => sources_exports,
  adsr: () => adsr,
  adsrIterable: () => adsrIterable,
  arcShape: () => arcShape,
  defaultAdsrOpts: () => defaultAdsrOpts,
  jitter: () => jitter,
  jitterAbsolute: () => jitterAbsolute,
  pingPong: () => pingPong,
  pingPongPercent: () => pingPongPercent,
  sineBipolarShape: () => sineBipolarShape,
  sineShape: () => sineShape,
  squareShaper: () => squareShaper,
  triangleShaper: () => triangleShaper,
  wave: () => wave,
  waveFromSource: () => waveFromSource
});

// src/modulation/Envelope.ts
var Envelope_exports = {};
__export(Envelope_exports, {
  adsr: () => adsr,
  adsrIterable: () => adsrIterable,
  defaultAdsrOpts: () => defaultAdsrOpts
});
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
var adsrTransitionsInstance = Object.freeze({
  attack: [`decay`, `release`],
  decay: [`sustain`, `release`],
  sustain: [`release`],
  release: [`complete`],
  //eslint-disable-next-line unicorn/no-null
  complete: null
});
var AdsrBase = class extends SimpleEventEmitter {
  #sm;
  #timeSource;
  #timer;
  #holding;
  #holdingInitial;
  attackDuration;
  decayDuration;
  releaseDuration;
  decayDurationTotal;
  shouldLoop;
  constructor(opts) {
    super();
    this.attackDuration = opts.attackDuration ?? 300;
    this.decayDuration = opts.decayDuration ?? 500;
    this.releaseDuration = opts.releaseDuration ?? 1e3;
    this.shouldLoop = opts.shouldLoop ?? false;
    this.#sm = new StateMachineWithEvents(
      adsrTransitionsInstance,
      { initial: `attack` }
    );
    this.#sm.addEventListener(`change`, (event) => {
      if (event.newState === `release` && this.#holdingInitial) {
        this.#timer?.reset();
      }
      super.fireEvent(`change`, event);
    });
    this.#sm.addEventListener(`stop`, (event) => {
      super.fireEvent(`complete`, event);
    });
    this.#timeSource = msElapsedTimer;
    this.#holding = this.#holdingInitial = false;
    this.decayDurationTotal = this.attackDuration + this.decayDuration;
  }
  switchState() {
    if (this.#timer === void 0) return false;
    let elapsed2 = this.#timer.elapsed;
    const wasHeld = this.#holdingInitial && !this.#holding;
    let hasChanged = false;
    do {
      hasChanged = false;
      switch (this.#sm.state) {
        case `attack`: {
          if (elapsed2 > this.attackDuration || wasHeld) {
            this.#sm.next();
            hasChanged = true;
          }
          break;
        }
        case `decay`: {
          if (elapsed2 > this.decayDurationTotal || wasHeld) {
            this.#sm.next();
            hasChanged = true;
          }
          break;
        }
        case `sustain`: {
          if (!this.#holding || wasHeld) {
            elapsed2 = 0;
            this.#sm.next();
            this.#timer.reset();
            hasChanged = true;
          }
          break;
        }
        case `release`: {
          if (elapsed2 > this.releaseDuration) {
            this.#sm.next();
            hasChanged = true;
          }
          break;
        }
        case `complete`: {
          if (this.shouldLoop) {
            this.trigger(this.#holdingInitial);
          }
        }
      }
    } while (hasChanged);
    return hasChanged;
  }
  /**
   * Computes a stage progress from 0-1
   * @param allowStateChange
   * @returns
   */
  computeRaw(allowStateChange = true) {
    if (this.#timer === void 0) return [void 0, 0, this.#sm.state];
    if (allowStateChange) this.switchState();
    const previousStage = this.#sm.state;
    const elapsed2 = this.#timer.elapsed;
    let relative = 0;
    const state = this.#sm.state;
    switch (state) {
      case `attack`: {
        relative = elapsed2 / this.attackDuration;
        break;
      }
      case `decay`: {
        relative = (elapsed2 - this.attackDuration) / this.decayDuration;
        break;
      }
      case `sustain`: {
        relative = 1;
        break;
      }
      case `release`: {
        relative = Math.min(elapsed2 / this.releaseDuration, 1);
        break;
      }
      case `complete`: {
        return [void 0, 1, previousStage];
      }
      default: {
        throw new Error(`State machine in unknown state: ${state}`);
      }
    }
    return [state, relative, previousStage];
  }
  get isDone() {
    return this.#sm.isDone;
  }
  onTrigger() {
  }
  trigger(hold = false) {
    this.onTrigger();
    this.#sm.reset();
    this.#timer = this.#timeSource();
    this.#holding = hold;
    this.#holdingInitial = hold;
  }
  compute() {
  }
  release() {
    if (this.isDone || !this.#holdingInitial) return;
    this.#holding = false;
    this.compute();
  }
};
var AdsrImpl = class extends AdsrBase {
  attackPath;
  decayPath;
  releasePath;
  initialLevel;
  peakLevel;
  releaseLevel;
  sustainLevel;
  attackBend;
  decayBend;
  releaseBend;
  initialLevelOverride;
  retrigger;
  releasedAt;
  constructor(opts) {
    super(opts);
    this.initialLevel = opts.initialLevel ?? 0;
    this.peakLevel = opts.peakLevel ?? 1;
    this.releaseLevel = opts.releaseLevel ?? 0;
    this.sustainLevel = opts.sustainLevel ?? 0.75;
    this.retrigger = opts.retrigger ?? true;
    this.attackBend = opts.attackBend ?? 0;
    this.releaseBend = opts.releaseBend ?? 0;
    this.decayBend = opts.decayBend ?? 0;
    const max = 1;
    this.attackPath = toPath(
      quadraticSimple(
        { x: 0, y: this.initialLevel },
        { x: max, y: this.peakLevel },
        -this.attackBend
      )
    );
    this.decayPath = toPath(
      quadraticSimple(
        { x: 0, y: this.peakLevel },
        { x: max, y: this.sustainLevel },
        -this.decayBend
      )
    );
    this.releasePath = toPath(
      quadraticSimple(
        { x: 0, y: this.sustainLevel },
        { x: max, y: this.releaseLevel },
        -this.releaseBend
      )
    );
  }
  onTrigger() {
    this.initialLevelOverride = void 0;
    if (!this.retrigger) {
      const [_stage, scaled, _raw] = this.compute();
      if (!Number.isNaN(scaled) && scaled > 0) {
        this.initialLevelOverride = scaled;
      }
    }
  }
  get value() {
    return this.compute(true)[1];
  }
  compute(allowStateChange = true) {
    const [stage, amt] = super.computeRaw(allowStateChange);
    if (stage === void 0) return [void 0, Number.NaN, Number.NaN];
    let v;
    switch (stage) {
      case `attack`: {
        v = this.attackPath.interpolate(amt).y;
        if (this.initialLevelOverride !== void 0) {
          v = scale(v, 0, 1, this.initialLevelOverride, 1);
        }
        this.releasedAt = v;
        break;
      }
      case `decay`: {
        v = this.decayPath.interpolate(amt).y;
        this.releasedAt = v;
        break;
      }
      case `sustain`: {
        v = this.sustainLevel;
        this.releasedAt = v;
        break;
      }
      case `release`: {
        v = this.releasePath.interpolate(amt).y;
        if (this.releasedAt !== void 0) {
          v = scale(v, 0, this.sustainLevel, 0, this.releasedAt);
        }
        break;
      }
      case `complete`: {
        v = this.releaseLevel;
        this.releasedAt = void 0;
        break;
      }
      default: {
        throw new Error(`Unknown state: ${stage}`);
      }
    }
    return [stage, v, amt];
  }
};
var adsr = (opts) => new AdsrImpl(opts);
async function* adsrIterable(opts) {
  const envelope = adsr(opts.env);
  const sampleRateMs = opts.sampleRateMs ?? 100;
  envelope.trigger();
  for await (const v of interval(
    () => {
      if (envelope.isDone) return;
      return envelope.value;
    },
    {
      fixed: sampleRateMs,
      signal: opts.signal
    }
  )) {
    yield v;
  }
}

// src/modulation/Forces.ts
var Forces_exports = {};
__export(Forces_exports, {
  accelerationForce: () => accelerationForce,
  angleFromAccelerationForce: () => angleFromAccelerationForce,
  angleFromVelocityForce: () => angleFromVelocityForce,
  angularForce: () => angularForce,
  apply: () => apply,
  attractionForce: () => attractionForce,
  computeAccelerationToTarget: () => computeAccelerationToTarget,
  computeAttractionForce: () => computeAttractionForce,
  computePositionFromAngle: () => computePositionFromAngle,
  computePositionFromVelocity: () => computePositionFromVelocity,
  computeVelocity: () => computeVelocity,
  constrainBounce: () => constrainBounce,
  guard: () => guard,
  magnitudeForce: () => magnitudeForce,
  nullForce: () => nullForce,
  orientationForce: () => orientationForce,
  pendulumForce: () => pendulumForce,
  springForce: () => springForce,
  targetForce: () => targetForce,
  velocityForce: () => velocityForce
});
var guard = (t, name = `t`) => {
  if (t === void 0) {
    throw new Error(`Parameter ${name} is undefined. Expected ForceAffected`);
  }
  if (t === null) {
    throw new Error(`Parameter ${name} is null. Expected ForceAffected`);
  }
  if (typeof t !== `object`) {
    throw new TypeError(
      `Parameter ${name} is type ${typeof t}. Expected object of shape ForceAffected`
    );
  }
};
var constrainBounce = (bounds, dampen = 1) => {
  if (!bounds) bounds = { width: 1, height: 1 };
  const minX = getEdgeX(bounds, `left`);
  const maxX = getEdgeX(bounds, `right`);
  const minY = getEdgeY(bounds, `top`);
  const maxY = getEdgeY(bounds, `bottom`);
  return (t) => {
    const position = computePositionFromVelocity(
      t.position ?? point_exports.Empty,
      t.velocity ?? point_exports.Empty
    );
    let velocity = t.velocity ?? point_exports.Empty;
    let { x, y } = position;
    if (x > maxX) {
      x = maxX;
      velocity = point_exports.invert(point_exports.multiply(velocity, dampen), `x`);
    } else if (x < minX) {
      x = minX;
      velocity = point_exports.invert(point_exports.multiply(velocity, dampen), `x`);
    }
    if (y > maxY) {
      y = maxY;
      velocity = point_exports.multiply(point_exports.invert(velocity, `y`), dampen);
    } else if (position.y < minY) {
      y = minY;
      velocity = point_exports.invert(point_exports.multiply(velocity, dampen), `y`);
    }
    return Object.freeze({
      ...t,
      position: { x, y },
      velocity
    });
  };
};
var attractionForce = (attractors, gravity, distanceRange = {}) => (attractee) => {
  let accel = attractee.acceleration ?? point_exports.Empty;
  for (const a of attractors) {
    if (a === attractee) continue;
    const f = computeAttractionForce(a, attractee, gravity, distanceRange);
    accel = point_exports.sum(accel, f);
  }
  return {
    ...attractee,
    acceleration: accel
  };
};
var computeAttractionForce = (attractor, attractee, gravity, distanceRange = {}) => {
  if (attractor.position === void 0) {
    throw new Error(`attractor.position not set`);
  }
  if (attractee.position === void 0) {
    throw new Error(`attractee.position not set`);
  }
  const distributionRangeMin = distanceRange.min ?? 0.01;
  const distributionRangeMax = distanceRange.max ?? 0.7;
  const f = point_exports.normalise(
    point_exports.subtract(attractor.position, attractee.position)
  );
  const d = clamp(point_exports.distance(f), distributionRangeMin, distributionRangeMax);
  return point_exports.multiply(
    f,
    gravity * (attractor.mass ?? 1) * (attractee.mass ?? 1) / (d * d)
  );
};
var targetForce = (targetPos, opts = {}) => {
  const fn = (t) => {
    const accel = computeAccelerationToTarget(
      targetPos,
      t.position ?? { x: 0.5, y: 0.5 },
      opts
    );
    return {
      ...t,
      acceleration: point_exports.sum(t.acceleration ?? point_exports.Empty, accel)
    };
  };
  return fn;
};
var apply = (t, ...accelForces) => {
  if (t === void 0) throw new Error(`t parameter is undefined`);
  for (const f of accelForces) {
    if (f === null || f === void 0) continue;
    t = typeof f === `function` ? f(t) : {
      ...t,
      acceleration: point_exports.sum(t.acceleration ?? point_exports.Empty, f)
    };
  }
  const velo = computeVelocity(
    t.acceleration ?? point_exports.Empty,
    t.velocity ?? point_exports.Empty
  );
  const pos = computePositionFromVelocity(t.position ?? point_exports.Empty, velo);
  const ff = {
    ...t,
    position: pos,
    velocity: velo,
    // Clear accel, because it has been integrated into velocity
    acceleration: point_exports.Empty
  };
  return ff;
};
var accelerationForce = (vector, mass = `ignored`) => (t) => Object.freeze({
  ...t,
  acceleration: massApplyAccel(vector, t, mass)
  //Points.sum(t.acceleration ?? Points.Empty, op(t.mass ?? 1))
});
var massApplyAccel = (vector, thing, mass = `ignored`) => {
  let op;
  switch (mass) {
    case `dampen`: {
      op = (mass2) => divide(vector, mass2, mass2);
      break;
    }
    case `multiply`: {
      op = (mass2) => point_exports.multiply(vector, mass2, mass2);
      break;
    }
    case `ignored`: {
      op = (_mass) => vector;
      break;
    }
    default: {
      throw new Error(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `Unknown 'mass' parameter '${mass}. Expected 'dampen', 'multiply' or 'ignored'`
      );
    }
  }
  return point_exports.sum(thing.acceleration ?? point_exports.Empty, op(thing.mass ?? 1));
};
var magnitudeForce = (force, mass = `ignored`) => (t) => {
  if (t.velocity === void 0) return t;
  const mag = point_exports.distance(point_exports.normalise(t.velocity));
  const magSq = force * mag * mag;
  const vv = point_exports.multiply(point_exports.invert(t.velocity), magSq);
  return Object.freeze({
    ...t,
    acceleration: massApplyAccel(vv, t, mass)
  });
};
var nullForce = (t) => t;
var velocityForce = (force, mass) => {
  const pipeline = point_exports.pipeline(
    // Points.normalise,
    point_exports.invert,
    (v) => point_exports.multiply(v, force)
  );
  return (t) => {
    if (t.velocity === void 0) return t;
    const v = pipeline(t.velocity);
    return Object.freeze({
      ...t,
      acceleration: massApplyAccel(v, t, mass)
    });
  };
};
var angularForce = () => (t) => {
  const accumulator = t.angularAcceleration ?? 0;
  const vel = t.angularVelocity ?? 0;
  const angle = t.angle ?? 0;
  const v = vel + accumulator;
  const a = angle + v;
  return Object.freeze({
    ...t,
    angle: a,
    angularVelocity: v,
    angularAcceleration: 0
  });
};
var angleFromAccelerationForce = (scaling = 20) => (t) => {
  const accel = t.acceleration ?? point_exports.Empty;
  return Object.freeze({
    ...t,
    angularAcceleration: accel.x * scaling
  });
};
var angleFromVelocityForce = (interpolateAmt = 1) => (t) => {
  const a = point_exports.angle(t.velocity ?? point_exports.Empty);
  return Object.freeze({
    ...t,
    angle: interpolateAmt < 1 ? interpolateAngle(interpolateAmt, t.angle ?? 0, a) : a
  });
};
var springForce = (pinnedAt, restingLength = 0.5, k = 2e-4, damping = 0.999) => (t) => {
  const direction = point_exports.subtract(t.position ?? point_exports.Empty, pinnedAt);
  const mag = point_exports.distance(direction);
  const stretch = Math.abs(restingLength - mag);
  const f = point_exports.pipelineApply(
    direction,
    point_exports.normalise,
    (p) => point_exports.multiply(p, -k * stretch)
  );
  const accel = massApplyAccel(f, t, `dampen`);
  const velo = computeVelocity(
    accel ?? point_exports.Empty,
    t.velocity ?? point_exports.Empty
  );
  const veloDamped = point_exports.multiply(velo, damping, damping);
  return {
    ...t,
    velocity: veloDamped,
    acceleration: point_exports.Empty
  };
};
var pendulumForce = (pinnedAt, opts = {}) => (t) => {
  if (!pinnedAt) pinnedAt = { x: 0, y: 0 };
  const length = opts.length ?? point_exports.distance(pinnedAt, t.position ?? point_exports.Empty);
  const speed = opts.speed ?? 1e-3;
  const damping = opts.damping ?? 0.995;
  let angle = t.angle;
  if (angle === void 0) {
    if (t.position) {
      angle = point_exports.angle(pinnedAt, t.position) - Math.PI / 2;
    } else {
      angle = 0;
    }
  }
  const accel = -1 * speed / length * Math.sin(angle);
  const v = (t.angularVelocity ?? 0) + accel;
  angle += v;
  return Object.freeze({
    angularVelocity: v * damping,
    angle,
    position: computePositionFromAngle(length, angle + Math.PI / 2, pinnedAt)
  });
};
var computeVelocity = (acceleration, velocity, velocityMax) => {
  const p = point_exports.sum(velocity, acceleration);
  return velocityMax === void 0 ? p : point_exports.clampMagnitude(p, velocityMax);
};
var computeAccelerationToTarget = (targetPos, currentPos, opts = {}) => {
  const diminishBy = opts.diminishBy ?? 1e-3;
  const direction = point_exports.subtract(targetPos, currentPos);
  if (opts.range && // If direction is less than range, return { x: 0, y: 0}
  point_exports.compare(point_exports.abs(direction), opts.range) === -2) {
    return point_exports.Empty;
  }
  return point_exports.multiply(direction, diminishBy);
};
var computePositionFromVelocity = (position, velocity) => point_exports.sum(position, velocity);
var computePositionFromAngle = (distance, angleRadians, origin) => Polar_exports.toCartesian(distance, angleRadians, origin);
var _angularForce = angularForce();
var _angleFromAccelerationForce = angleFromAccelerationForce();
var orientationForce = (interpolationAmt = 0.5) => {
  const angleFromVel = angleFromVelocityForce(interpolationAmt);
  return (t) => {
    t = _angularForce(t);
    t = _angleFromAccelerationForce(t);
    t = angleFromVel(t);
    return t;
  };
};

// src/modulation/Oscillator.ts
var Oscillator_exports = {};
__export(Oscillator_exports, {
  saw: () => saw,
  sine: () => sine,
  sineBipolar: () => sineBipolar,
  spring: () => spring,
  square: () => square,
  triangle: () => triangle
});
var piPi = Math.PI * 2;
var springRaw = (opts = {}, from = 0, to = 1) => {
  const mass = opts.mass ?? 1;
  const stiffness = opts.stiffness ?? 100;
  const soft = opts.soft ?? false;
  const damping = opts.damping ?? 10;
  const velocity = opts.velocity ?? 0.1;
  const delta = to - from;
  if (soft || 1 <= damping / (2 * Math.sqrt(stiffness * mass))) {
    const angularFrequency = -Math.sqrt(stiffness / mass);
    const leftover = -angularFrequency * delta - velocity;
    return (t) => to - (delta + t * leftover) * Math.E ** (t * angularFrequency);
  } else {
    const dampingFrequency = Math.sqrt(4 * mass * stiffness - damping ** 2);
    const leftover = (damping * delta - 2 * mass * velocity) / dampingFrequency;
    const dfm = 0.5 * dampingFrequency / mass;
    const dm = -(0.5 * damping) / mass;
    return (t) => to - (Math.cos(t * dfm) * delta + Math.sin(t * dfm) * leftover) * Math.E ** (t * dm);
  }
};
function* spring(opts = {}, timerOrFreq) {
  if (timerOrFreq === void 0) timerOrFreq = msElapsedTimer();
  else if (typeof timerOrFreq === `number`) {
    timerOrFreq = frequencyTimer(timerOrFreq);
  }
  const fn = springRaw(opts, 0, 1);
  let doneCountdown = opts.countdown ?? 10;
  while (doneCountdown > 0) {
    const s = fn(timerOrFreq.elapsed / 1e3);
    yield s;
    if (s === 1) {
      doneCountdown--;
    } else {
      doneCountdown = 100;
    }
  }
}
function* sine(timerOrFreq) {
  if (timerOrFreq === void 0) throw new TypeError(`Parameter 'timerOrFreq' is undefined`);
  if (typeof timerOrFreq === `number`) {
    timerOrFreq = frequencyTimer(timerOrFreq);
  }
  while (true) {
    yield (Math.sin(timerOrFreq.elapsed * piPi) + 1) / 2;
  }
}
function* sineBipolar(timerOrFreq) {
  if (timerOrFreq === void 0) throw new TypeError(`Parameter 'timerOrFreq' is undefined`);
  if (typeof timerOrFreq === `number`) {
    timerOrFreq = frequencyTimer(timerOrFreq);
  }
  while (true) {
    yield Math.sin(timerOrFreq.elapsed * piPi);
  }
}
function* triangle(timerOrFreq) {
  if (typeof timerOrFreq === `number`) {
    timerOrFreq = frequencyTimer(timerOrFreq);
  }
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
  if (timerOrFreq === void 0) throw new TypeError(`Parameter 'timerOrFreq' is undefined`);
  if (typeof timerOrFreq === `number`) {
    timerOrFreq = frequencyTimer(timerOrFreq);
  }
  while (true) {
    yield timerOrFreq.elapsed;
  }
}
function* square(timerOrFreq) {
  if (typeof timerOrFreq === `number`) {
    timerOrFreq = frequencyTimer(timerOrFreq);
  }
  while (true) {
    yield timerOrFreq.elapsed < 0.5 ? 0 : 1;
  }
}

// src/modulation/sources/Ticks.ts
function ticks(totalTicks, options = {}) {
  throwIntegerTest(totalTicks, `aboveZero`, `totalTicks`);
  const exclusiveStart = options.exclusiveStart ?? false;
  const exclusiveEnd = options.exclusiveEnd ?? false;
  const cycleLimit = options.cycleLimit ?? Number.MAX_SAFE_INTEGER;
  const startPoint = exclusiveStart ? 1 : 0;
  const endPoint = exclusiveEnd ? totalTicks - 1 : totalTicks;
  let cycleCount = 0;
  let v = options.startAt ?? startPoint;
  if (options.startAtRelative) {
    let totalTicksForReal = totalTicks;
    if (exclusiveStart) totalTicksForReal--;
    if (exclusiveEnd) totalTicksForReal--;
    v = Math.round(options.startAtRelative * totalTicksForReal);
  }
  return (feedback) => {
    if (feedback) {
      if (feedback.resetAt !== void 0) {
        v = feedback.resetAt;
      }
      if (feedback.resetAtRelative !== void 0) {
        v = Math.floor(feedback.resetAtRelative * totalTicks);
      }
    }
    if (cycleCount >= cycleLimit) return 1;
    let current = v / totalTicks;
    v++;
    if (v > endPoint) {
      cycleCount++;
      v = startPoint;
    }
    return current;
  };
}

// src/modulation/sources/index.ts
var sources_exports = {};
__export(sources_exports, {
  bpm: () => bpm,
  elapsed: () => elapsed,
  hertz: () => hertz,
  perMinute: () => perMinute,
  perSecond: () => perSecond,
  ticks: () => ticks
});

// src/modulation/sources/Time.ts
function elapsed(interval2, options = {}) {
  const cycleLimit = options.cycleLimit ?? Number.MAX_SAFE_INTEGER;
  const limitValue = 1;
  let start = options.startAt ?? performance.now();
  let cycleCount = 0;
  const intervalMs = intervalToMs(interval2, 1e3);
  if (options.startAtRelative) {
    throwNumberTest(options.startAtRelative, `percentage`, `startAtRelative`);
    start = performance.now() - intervalMs * options.startAtRelative;
  }
  return (feedback) => {
    if (feedback) {
      if (feedback.resetAt !== void 0) {
        start = feedback.resetAt;
        if (start === 0) start = performance.now();
      }
      if (feedback.resetAtRelative !== void 0) {
        throwNumberTest(feedback.resetAtRelative, `percentage`, `resetAtRelative`);
        start = performance.now() - intervalMs * feedback.resetAtRelative;
      }
    }
    if (cycleCount >= cycleLimit) return limitValue;
    const now = performance.now();
    const elapsedCycle = now - start;
    if (elapsedCycle >= intervalMs) {
      cycleCount += Math.floor(elapsedCycle / intervalMs);
      start = now;
      if (cycleCount >= cycleLimit) return limitValue;
    }
    return elapsedCycle % intervalMs / intervalMs;
  };
}
function bpm(bpm2, options) {
  const interval2 = 60 * 1e3 / bpm2;
  return elapsed(interval2, options);
}
function hertz(hz, options) {
  const interval2 = 1e3 / hz;
  return elapsed(interval2, options);
}

// src/modulation/sources/PerSecond.ts
var perSecond = (amount, options = {}) => {
  const perMilli = amount / 1e3;
  const min = options.min ?? Number.MIN_SAFE_INTEGER;
  const max = options.max ?? Number.MAX_SAFE_INTEGER;
  let called = performance.now();
  return () => {
    const now = performance.now();
    const elapsed2 = now - called;
    called = now;
    const x = perMilli * elapsed2;
    if (x > max) return max;
    if (x < min) return min;
    return x;
  };
};
var perMinute = (amount, options = {}) => {
  return perSecond(amount / 60, options);
};

// src/modulation/Waveforms.ts
function triangleShaper(period = 1) {
  period = 1 / period;
  const halfPeriod = period / 2;
  return (t) => {
    const v = Math.abs(t % period - halfPeriod);
    return v;
  };
}
function squareShaper(period = 1) {
  period = 1 / period;
  const halfPeriod = period / 2;
  return (t) => {
    return t % period < halfPeriod ? 1 : 0;
  };
}
function sineShape(period = 1) {
  period = period * (Math.PI * 2);
  return (t) => {
    const v = (Math.sin(t * period) + 1) / 2;
    return v;
  };
}
function arcShape(period = 1) {
  period = period * (Math.PI * 2);
  return (t) => Math.abs(Math.sin(t * period));
}
function sineBipolarShape(period = 1) {
  period = period * (Math.PI * 2);
  return (t) => Math.sin(t * period);
}
function wave(options) {
  const shape = options.shape ?? `sine`;
  const invert = options.invert ?? false;
  const period = options.period ?? 1;
  let sourceFn;
  throwIntegerTest(period, `aboveZero`, `period`);
  const sourceOptions = {
    ...options
  };
  if (options.ticks) {
    sourceFn = ticks(options.ticks, sourceOptions);
  } else if (options.hertz) {
    sourceFn = hertz(options.hertz, sourceOptions);
  } else if (options.millis) {
    sourceFn = elapsed(options.millis, sourceOptions);
  } else if (options.source) {
    sourceFn = options.source;
  } else {
    const secs = options.secs ?? 5;
    sourceFn = elapsed(secs * 1e3, sourceOptions);
  }
  let shaperFn;
  switch (shape) {
    case `saw`:
      shaperFn = (v) => v;
      break;
    case `sine`:
      shaperFn = sineShape(period);
      break;
    case `sine-bipolar`:
      shaperFn = sineBipolarShape(period);
      break;
    case `square`:
      shaperFn = squareShaper(period);
      break;
    case `triangle`:
      shaperFn = triangleShaper(period);
      break;
    case `arc`:
      shaperFn = arcShape(period);
      break;
    default:
      throw new Error(`Unknown wave shape '${shape}'. Expected: sine, sine-bipolar, saw, triangle, arc or square`);
  }
  return waveFromSource(sourceFn, shaperFn, invert);
}
function waveFromSource(sourceFn, shaperFn, invert = false) {
  return (feedback) => {
    let v = sourceFn(feedback?.clock);
    if (feedback?.override) v = feedback.override;
    v = shaperFn(v);
    if (invert) v = 1 - v;
    return v;
  };
}

// src/modulation/index.ts
try {
  if (typeof window !== `undefined`) {
    window.ixfx = {
      ...window.ixfx,
      Modulation: { Forces: Forces_exports, Envelopes: Envelope_exports, Oscillators: Oscillator_exports, Easings: Easing_exports }
    };
  }
} catch {
}

export {
  defaultAdsrOpts,
  adsr,
  adsrIterable,
  Envelope_exports,
  Forces_exports,
  Oscillator_exports,
  sources_exports,
  triangleShaper,
  squareShaper,
  sineShape,
  arcShape,
  sineBipolarShape,
  wave,
  waveFromSource,
  modulation_exports
};
//# sourceMappingURL=chunk-DVDQH3RV.js.map