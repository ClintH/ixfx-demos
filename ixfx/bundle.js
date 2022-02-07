import {
  Generators_exports
} from "./chunk-ZKWDSJBY.js";
import {
  Random_exports
} from "./chunk-IFVBVU2P.js";
import {
  KeyValue_exports,
  getSorter
} from "./chunk-UV3RUDZE.js";
import {
  visual_exports
} from "./chunk-ABRXPOEG.js";
import {
  dom_exports
} from "./chunk-7UKU2W2O.js";
import "./chunk-S7E3L2QN.js";
import {
  modulation_exports
} from "./chunk-Q5M2BURA.js";
import {
  StateMachine
} from "./chunk-KYWIDCWW.js";
import {
  Timer_exports
} from "./chunk-CH52SGIG.js";
import {
  geometry_exports
} from "./chunk-ODCLGFJS.js";
import "./chunk-QFSGSUQ6.js";
import {
  collections_exports
} from "./chunk-EIPZA6TZ.js";
import "./chunk-CUSOACMW.js";
import {
  SimpleEventEmitter
} from "./chunk-JBDRQ5KW.js";
import "./chunk-VRGUIV5Y.js";
import {
  clamp,
  clampZeroBounds,
  isEqualDefault,
  isEqualValueDefault,
  lerp,
  map,
  toStringDefault
} from "./chunk-44P5CV5L.js";
import "./chunk-CICENSOU.js";
import {
  __privateAdd,
  __privateGet,
  __privateSet
} from "./chunk-FQLUQVDZ.js";

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
  FrequencyMutable,
  Generators_exports as Generators,
  geometry_exports as Geometry,
  KeyValue_exports as KeyValues,
  modulation_exports as Modulation,
  Random_exports as Random,
  StateMachine,
  Timer_exports as Timers,
  visual_exports as Visual,
  clamp,
  clampZeroBounds,
  frequencyMutable,
  isEqualDefault,
  isEqualValueDefault,
  lerp,
  map,
  toStringDefault
};
//# sourceMappingURL=bundle.js.map