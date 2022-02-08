import {
  visual_exports
} from "./chunk-CG7NP66B.js";
import {
  Generators_exports
} from "./chunk-TAJBS64S.js";
import {
  modulation_exports
} from "./chunk-OB5NBZOH.js";
import {
  Random_exports
} from "./chunk-IFVBVU2P.js";
import {
  StateMachine
} from "./chunk-IBAWT4MP.js";
import {
  Timer_exports
} from "./chunk-DEFU5INQ.js";
import {
  KeyValue_exports,
  getSorter
} from "./chunk-Q6URMP6F.js";
import {
  dom_exports
} from "./chunk-M35QZGT4.js";
import "./chunk-TY3WVHED.js";
import {
  Drawing_exports
} from "./chunk-NCXW57O2.js";
import {
  collections_exports
} from "./chunk-35OYLY6R.js";
import "./chunk-VXW5GB4S.js";
import {
  geometry_exports
} from "./chunk-OTCI2VI3.js";
import "./chunk-PQ6IJNUJ.js";
import "./chunk-XU5FJBDE.js";
import {
  SimpleEventEmitter
} from "./chunk-JBDRQ5KW.js";
import "./chunk-7OKODHGY.js";
import {
  clamp,
  clampZeroBounds,
  isEqualDefault,
  isEqualValueDefault,
  lerp,
  scale,
  scalePercentOutput,
  toStringDefault
} from "./chunk-NTQN762I.js";
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
  scale,
  scalePercentOutput,
  toStringDefault
};
//# sourceMappingURL=bundle.js.map