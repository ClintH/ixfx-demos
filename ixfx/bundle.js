import {
  Random_exports
} from "./chunk-IFVBVU2P.js";
import {
  KeyValue_exports,
  getSorter
} from "./chunk-AVGHJEWZ.js";
import {
  visual_exports
} from "./chunk-EJYCGNKW.js";
import {
  dom_exports
} from "./chunk-L7NPGFXB.js";
import "./chunk-SBKZPT5N.js";
import {
  modulation_exports
} from "./chunk-ZKEVKSIO.js";
import {
  StateMachine
} from "./chunk-2THIUUNP.js";
import {
  geometry_exports
} from "./chunk-HKPWQDQW.js";
import {
  collections_exports
} from "./chunk-U6RUNGK3.js";
import "./chunk-RRAKEYPR.js";
import {
  clamp,
  clampZeroBounds,
  isEqualDefault,
  isEqualValueDefault,
  lerp,
  toStringDefault
} from "./chunk-ZFK2QSBD.js";
import {
  SimpleEventEmitter
} from "./chunk-HQCU5VB2.js";
import {
  Generators_exports
} from "./chunk-A6WUZTS4.js";
import {
  continuously,
  delay,
  msRelativeTimer,
  resettableTimeout,
  sleep,
  tickRelativeTimer
} from "./chunk-OMIWL6CW.js";
import "./chunk-QFSGSUQ6.js";
import {
  __privateAdd,
  __privateGet,
  __privateSet
} from "./chunk-FQLUQVDZ.js";

// src/MutableFrequency.ts
var mutableFrequency = (keyString) => new MutableFrequency(keyString);
var _store, _keyString;
var MutableFrequency = class extends SimpleEventEmitter {
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
  entriesSorted(sortStyle) {
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
export {
  collections_exports as Collections,
  dom_exports as Dom,
  Generators_exports as Generators,
  geometry_exports as Geometry,
  KeyValue_exports as KeyValues,
  modulation_exports as Modulation,
  MutableFrequency,
  Random_exports as Random,
  StateMachine,
  visual_exports as Visual,
  clamp,
  clampZeroBounds,
  continuously,
  delay,
  isEqualDefault,
  isEqualValueDefault,
  lerp,
  msRelativeTimer,
  mutableFrequency,
  resettableTimeout,
  sleep,
  tickRelativeTimer,
  toStringDefault
};
//# sourceMappingURL=bundle.js.map