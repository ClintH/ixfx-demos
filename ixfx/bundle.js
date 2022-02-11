import {
  visual_exports
} from "./chunk-EETANPBJ.js";
import {
  Generators_exports
} from "./chunk-45IHWYY6.js";
import {
  modulation_exports
} from "./chunk-6VQKXAME.js";
import {
  Timer_exports
} from "./chunk-5KBJPUCR.js";
import {
  Random_exports
} from "./chunk-IFVBVU2P.js";
import {
  KeyValue_exports,
  getSorter
} from "./chunk-3FVAODIO.js";
import {
  dom_exports
} from "./chunk-PDWLPHVC.js";
import "./chunk-PAZUXQJK.js";
import {
  Drawing_exports
} from "./chunk-4HGRCR6Y.js";
import {
  geometry_exports
} from "./chunk-WPLOGMNR.js";
import {
  collections_exports
} from "./chunk-X7FHZOXV.js";
import "./chunk-PQ6IJNUJ.js";
import "./chunk-XU5FJBDE.js";
import "./chunk-TK2R6EG6.js";
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
} from "./chunk-XQ3ULWLN.js";
import "./chunk-6Q372GD4.js";
import {
  flow_exports
} from "./chunk-C4IGCFS5.js";
import "./chunk-SGSAOIO3.js";
import {
  SimpleEventEmitter
} from "./chunk-JBDRQ5KW.js";
import "./chunk-OQJMMN6S.js";
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
//# sourceMappingURL=bundle.js.map