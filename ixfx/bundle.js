import {
  visual_exports
} from "./chunk-E5YLJEBN.js";
import {
  Generators_exports
} from "./chunk-EYXX2VGD.js";
import {
  modulation_exports
} from "./chunk-5WNVOIIJ.js";
import {
  Random_exports
} from "./chunk-IFVBVU2P.js";
import "./chunk-PBE4UKCE.js";
import {
  KeyValue_exports,
  getSorter
} from "./chunk-LFC23B3N.js";
import {
  collections_exports
} from "./chunk-FRVUOYS5.js";
import {
  dom_exports
} from "./chunk-MBZ4GFG7.js";
import "./chunk-4BHBQFN2.js";
import "./chunk-V6WGO73W.js";
import {
  flow_exports
} from "./chunk-IV26GIHI.js";
import "./chunk-3ROFWAHX.js";
import "./chunk-YFNN25WV.js";
import {
  geometry_exports
} from "./chunk-UWLZSNHO.js";
import "./chunk-PQ6IJNUJ.js";
import "./chunk-XU5FJBDE.js";
import "./chunk-JBV6FYKJ.js";
import {
  SimpleEventEmitter
} from "./chunk-JBDRQ5KW.js";
import {
  clamp,
  clampIndex,
  interpolate,
  isEqualDefault,
  isEqualValueDefault,
  scale,
  scalePercent,
  scalePercentages,
  startsEnds,
  toStringDefault,
  wrap,
  wrapDegrees,
  wrapRange
} from "./chunk-MNQGJO77.js";
import "./chunk-6JTGCZJL.js";
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
  flow_exports as Flow,
  FrequencyMutable,
  Generators_exports as Generators,
  geometry_exports as Geometry,
  KeyValue_exports as KeyValues,
  modulation_exports as Modulation,
  Random_exports as Random,
  visual_exports as Visual,
  clamp,
  clampIndex,
  frequencyMutable,
  interpolate,
  isEqualDefault,
  isEqualValueDefault,
  scale,
  scalePercent,
  scalePercentages,
  startsEnds,
  toStringDefault,
  wrap,
  wrapDegrees,
  wrapRange
};
//# sourceMappingURL=bundle.js.map