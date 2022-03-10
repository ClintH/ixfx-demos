import {
  temporal_exports
} from "./chunk-5FKNARQS.js";
import {
  Text_exports
} from "./chunk-55ZKDOX4.js";
import {
  visual_exports
<<<<<<< Updated upstream
} from "./chunk-4QHRIV2D.js";
import {
  Generators_exports
} from "./chunk-75SFD24O.js";
import {
  modulation_exports
} from "./chunk-HEUMPV43.js";
import {
  Random_exports
} from "./chunk-IRTA6V53.js";
import "./chunk-JCPHO3EC.js";
import "./chunk-IKARDYYU.js";
import {
  KeyValue_exports,
  getSorter
} from "./chunk-3PNOIJE2.js";
import {
  collections_exports
} from "./chunk-VAHXRYL4.js";
import {
  dom_exports
} from "./chunk-C2GSEUUB.js";
import "./chunk-KE63R43T.js";
import "./chunk-6RSYJ7PX.js";
import {
  flow_exports
} from "./chunk-YNVHP56G.js";
import "./chunk-2XXOMLAI.js";
import "./chunk-MLAH6NN5.js";
import {
  geometry_exports
} from "./chunk-GLOC4ABQ.js";
import "./chunk-U5MCJANK.js";
import "./chunk-G5Q3FAR4.js";
import "./chunk-57USKCMY.js";
import {
  SimpleEventEmitter
} from "./chunk-HCHJFXUB.js";
=======
} from "./chunk-A3OQLAFF.js";
import {
  Generators_exports
} from "./chunk-JV6CQCW4.js";
import {
  modulation_exports
} from "./chunk-EHKPP5SR.js";
import {
  Random_exports
} from "./chunk-2OQPH7JM.js";
import "./chunk-CTQ6HR35.js";
import "./chunk-MXBALDCV.js";
import {
  KeyValue_exports
} from "./chunk-TITFEN5N.js";
import {
  collections_exports
} from "./chunk-B7RHPX6D.js";
import {
  dom_exports
} from "./chunk-TDKAXZAS.js";
import "./chunk-ULMYFS2R.js";
import "./chunk-QVRQKKRB.js";
import {
  flow_exports
} from "./chunk-NP7XBFS5.js";
import "./chunk-BNGD6RO3.js";
import "./chunk-FYQLQT42.js";
import {
  geometry_exports
} from "./chunk-LHJ7JM7H.js";
import "./chunk-PQ6IJNUJ.js";
import "./chunk-XU5FJBDE.js";
import "./chunk-TDPI3IJN.js";
import "./chunk-JBDRQ5KW.js";
>>>>>>> Stashed changes
import {
  clamp,
  clampIndex,
  interpolate,
  isEqualDefault,
  isEqualValueDefault,
  repeat,
  scale,
  scalePercent,
  scalePercentages,
  toStringDefault,
  wrap,
  wrapRange
<<<<<<< Updated upstream
} from "./chunk-5ATJXEJX.js";
import "./chunk-E6FEPMVF.js";
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
=======
} from "./chunk-TBQ2OBWU.js";
import "./chunk-MNTWLMDP.js";
import "./chunk-FQLUQVDZ.js";
>>>>>>> Stashed changes
export {
  collections_exports as Collections,
  dom_exports as Dom,
  flow_exports as Flow,
  Generators_exports as Generators,
  geometry_exports as Geometry,
  KeyValue_exports as KeyValues,
  modulation_exports as Modulation,
  Random_exports as Random,
  temporal_exports as Temporal,
  Text_exports as Text,
  visual_exports as Visual,
  clamp,
  clampIndex,
  interpolate,
  isEqualDefault,
  isEqualValueDefault,
  repeat,
  scale,
  scalePercent,
  scalePercentages,
  toStringDefault,
  wrap,
  wrapRange
};
