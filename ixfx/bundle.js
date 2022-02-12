import {
  visual_exports
} from "./chunk-DBBTHACN.js";
import "./chunk-SMDZ5Z5K.js";
import {
  Generators_exports
} from "./chunk-YYGW2TA2.js";
import {
  modulation_exports
} from "./chunk-2NL2I57L.js";
import {
  Timer_exports
} from "./chunk-R5XXMDFJ.js";
import {
  Random_exports
} from "./chunk-BDF7FKTC.js";
import {
  KeyValue_exports,
  getSorter
} from "./chunk-G4VQBCDN.js";
import {
  dom_exports
} from "./chunk-DIQ6ZWAQ.js";
import "./chunk-MKNK5GQX.js";
import {
  Drawing_exports
} from "./chunk-HE7DZLZC.js";
import "./chunk-Q3Q65ZLU.js";
import {
  geometry_exports
} from "./chunk-5JM3IB7G.js";
import {
  collections_exports
} from "./chunk-AGSKCOEP.js";
import "./chunk-U5MCJANK.js";
import "./chunk-G5Q3FAR4.js";
import "./chunk-LD7UJMNO.js";
import {
  clamp,
  clampZeroBounds,
  interpolate,
  isEqualDefault,
  isEqualValueDefault,
  scale,
  scalePercent,
  scalePercentOutput,
  startsEnds,
  toStringDefault,
  wrap,
  wrapDegrees,
  wrapRange
} from "./chunk-4M4QV6VA.js";
import "./chunk-EGNKYH6P.js";
import {
  flow_exports
} from "./chunk-A3QG26TU.js";
import "./chunk-GAMNYXM7.js";
import {
  SimpleEventEmitter
} from "./chunk-HCHJFXUB.js";
import "./chunk-RKVT4IML.js";
import {
  __privateAdd,
  __privateGet,
  __privateSet
} from "./chunk-YDTVC7MM.js";

// src/FrequencyMutable.ts
var _store, _keyString;
var FrequencyMutable = class extends SimpleEventEmitter {
  constructor(keyString = void 0) {
    super();
    __privateAdd(this, _store, void 0);
    __privateAdd(this, _keyString, void 0);
    __privateSet(this, _store, /* @__PURE__ */ new Map());
    if (keyString === void 0) {
      keyString = (a) => {
        if (a === void 0)
          throw new Error(`Cannot create key for undefined`);
        if (typeof a === `string`) {
          return a;
        } else {
          return JSON.stringify(a);
        }
      };
    }
    __privateSet(this, _keyString, keyString);
  }
  clear() {
    __privateGet(this, _store).clear();
    this.fireEvent(`change`, void 0);
  }
  keys() {
    return __privateGet(this, _store).keys();
  }
  values() {
    return __privateGet(this, _store).values();
  }
  toArray() {
    return Array.from(__privateGet(this, _store).entries());
  }
  frequencyOf(value) {
    if (typeof value === `string`)
      return __privateGet(this, _store).get(value);
    const key = __privateGet(this, _keyString).call(this, value);
    return __privateGet(this, _store).get(key);
  }
  relativeFrequencyOf(value) {
    if (typeof value === `string`)
      return __privateGet(this, _store).get(value);
    const key = __privateGet(this, _keyString).call(this, value);
    const freq = __privateGet(this, _store).get(key);
    if (freq === void 0)
      return;
    const mma = this.minMaxAvg();
    return freq / mma.total;
  }
  entries() {
    return Array.from(__privateGet(this, _store).entries());
  }
  minMaxAvg() {
    return KeyValue_exports.minMaxAvg(this.entries());
  }
  entriesSorted(sortStyle = `value`) {
    const s = getSorter(sortStyle);
    return s(this.entries());
  }
  add(...values) {
    if (values === void 0)
      throw new Error(`value parameter is undefined`);
    const keys = values.map(__privateGet(this, _keyString));
    keys.forEach((key) => {
      const score = __privateGet(this, _store).get(key) ?? 0;
      __privateGet(this, _store).set(key, score + 1);
    });
    this.fireEvent(`change`, void 0);
  }
};
_store = new WeakMap();
_keyString = new WeakMap();
var frequencyMutable = (keyString) => new FrequencyMutable(keyString);
export {
  collections_exports as Collections,
  dom_exports as Dom,
  Drawing_exports as Drawing,
  flow_exports as Flow,
  FrequencyMutable,
  Generators_exports as Generators,
  geometry_exports as Geometry,
  KeyValue_exports as KeyValues,
  modulation_exports as Modulation,
  Random_exports as Random,
  Timer_exports as Timers,
  visual_exports as Visual,
  clamp,
  clampZeroBounds,
  frequencyMutable,
  interpolate,
  isEqualDefault,
  isEqualValueDefault,
  scale,
  scalePercent,
  scalePercentOutput,
  startsEnds,
  toStringDefault,
  wrap,
  wrapDegrees,
  wrapRange
};
