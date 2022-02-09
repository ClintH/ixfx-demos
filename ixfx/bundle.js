import {
  visual_exports
} from "./chunk-6B22C6YU.js";
import {
  Generators_exports
} from "./chunk-ABKOL5S5.js";
import {
  modulation_exports
} from "./chunk-AJTH26NL.js";
import {
  Timer_exports
} from "./chunk-V2PBCDXY.js";
import {
  Random_exports
} from "./chunk-BDF7FKTC.js";
import {
  KeyValue_exports,
  getSorter
} from "./chunk-UQBSTKS3.js";
import {
  dom_exports
} from "./chunk-JLAHASPM.js";
import "./chunk-XV5DYY72.js";
import {
  Drawing_exports
} from "./chunk-GJJBQUGS.js";
import {
  geometry_exports
} from "./chunk-5SFM3ZL6.js";
import {
  collections_exports
} from "./chunk-K4ASUAEI.js";
import "./chunk-U5MCJANK.js";
import "./chunk-G5Q3FAR4.js";
import "./chunk-QDHWKBIB.js";
import {
  clamp,
  clampZeroBounds,
  isEqualDefault,
  isEqualValueDefault,
  lerp,
  scale,
  scalePercent,
  scalePercentOutput,
  toStringDefault
} from "./chunk-L73ZEV4V.js";
import "./chunk-UDOW5UY7.js";
import {
  flow_exports
} from "./chunk-XGCIMDJI.js";
import "./chunk-IARP4YHS.js";
import {
  SimpleEventEmitter
} from "./chunk-HCHJFXUB.js";
import "./chunk-G4S3XAFG.js";
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
  isEqualDefault,
  isEqualValueDefault,
  lerp,
  scale,
  scalePercent,
  scalePercentOutput,
  toStringDefault
};
