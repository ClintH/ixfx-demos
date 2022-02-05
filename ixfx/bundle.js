import {
  Generators_exports
} from "./chunk-H5Z72JA2.js";
import {
  Random_exports
} from "./chunk-IFVBVU2P.js";
import {
  KeyValue_exports,
  getSorter
} from "./chunk-BDJAXEXR.js";
import {
  visual_exports
} from "./chunk-G44UTPJC.js";
import {
  dom_exports
} from "./chunk-4WJCK6OW.js";
import "./chunk-S7E3L2QN.js";
import {
  modulation_exports
} from "./chunk-NT44FLGP.js";
import {
  Timer_exports
} from "./chunk-EOAXAHCL.js";
import {
  StateMachine
} from "./chunk-KYWIDCWW.js";
import {
  geometry_exports
} from "./chunk-VN6BZR7Y.js";
import "./chunk-QFSGSUQ6.js";
import {
  collections_exports
} from "./chunk-SG7ZQ2JY.js";
import "./chunk-RJ3ZNIWM.js";
import {
  SimpleEventEmitter
} from "./chunk-JBDRQ5KW.js";
import "./chunk-G65LGGOR.js";
import {
  clamp,
  clampZeroBounds,
  isEqualDefault,
  isEqualValueDefault,
  lerp,
  map,
  toStringDefault
} from "./chunk-UUCPAL4S.js";
import "./chunk-CICENSOU.js";
import {
  __privateAdd,
  __privateGet,
  __privateSet
} from "./chunk-FQLUQVDZ.js";

// src/MutableFrequency.ts
var frequencyMutable = (keyString) => new FrequencyMutable(keyString);
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