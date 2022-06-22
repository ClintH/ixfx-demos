import {
  getOrGenerate
} from "./chunk-LTK4DV2D.js";
import {
  repeat
} from "./chunk-CW5MV3S3.js";
import {
  __publicField
} from "./chunk-6SYKIMQH.js";

// src/temporal/TrackedValue.ts
var TrackedBase = class {
  constructor(id, opts = {}) {
    this.id = id;
    __publicField(this, "seenCount");
    __publicField(this, "storeIntermediate");
    __publicField(this, "resetAfterSamples");
    this.storeIntermediate = opts.storeIntermediate ?? false;
    this.resetAfterSamples = opts.resetAfterSamples ?? -1;
    this.seenCount = 0;
  }
  reset() {
    this.seenCount = 0;
    this.onReset();
  }
  seen(...p) {
    if (this.resetAfterSamples > 0 && this.seenCount > this.resetAfterSamples) {
      this.reset();
    }
    this.seenCount += p.length;
    const t = this.seenImpl(p);
    this.onSeen(t);
  }
  onSeen(_p) {
  }
};
var TrackedPrimitiveValue = class extends TrackedBase {
  constructor(id, opts) {
    super(id, opts);
    __publicField(this, "values");
    __publicField(this, "timestamps");
    this.values = [];
    this.timestamps = [];
  }
  get last() {
    return this.values.at(-1);
  }
  get initial() {
    return this.values.at(0);
  }
  get size() {
    return this.values.length;
  }
  get elapsed() {
    if (this.values.length < 0)
      throw new Error(`No values seen yet`);
    return Date.now() - this.timestamps[0];
  }
  onReset() {
    this.values = [];
    this.timestamps = [];
  }
  seenImpl(p) {
    const last = p.at(-1);
    const now = Date.now();
    if (this.storeIntermediate) {
      this.values.push(...p);
      this.timestamps.push(...repeat(p.length, () => now));
    } else if (this.values.length === 0) {
      this.values.push(last);
      this.timestamps.push(now);
    } else if (this.values.length === 2) {
      this.values[1] = last;
      this.timestamps[1] = now;
    } else if (this.values.length === 1) {
      this.values.push(last);
      this.timestamps.push(now);
    }
    return p;
  }
};
var TrackedObject = class extends TrackedBase {
  constructor(id, opts) {
    super(id, opts);
    __publicField(this, "values");
    this.values = [];
  }
  onReset() {
    this.values = [];
  }
  seenImpl(p) {
    const ts = p.map((v) => `at` in v ? v : {
      ...v,
      at: Date.now()
    });
    const last = ts.at(-1);
    if (this.storeIntermediate)
      this.values.push(...ts);
    else if (this.values.length === 0) {
      this.values.push(last);
    } else if (this.values.length === 2) {
      this.values[1] = last;
    } else if (this.values.length === 1) {
      this.values.push(last);
    }
    return ts;
  }
  get last() {
    if (this.values.length === 1)
      return this.values[0];
    return this.values.at(-1);
  }
  get initial() {
    return this.values.at(0);
  }
  get size() {
    return this.values.length;
  }
  get elapsed() {
    return Date.now() - this.values[0].at;
  }
};
var TrackedValueMap = class {
  constructor(creator) {
    __publicField(this, "store");
    __publicField(this, "gog");
    this.store = /* @__PURE__ */ new Map();
    this.gog = getOrGenerate(this.store, creator);
  }
  get size() {
    return this.store.size;
  }
  has(id) {
    return this.store.has(id);
  }
  async seen(id, ...values) {
    const trackedValue = await this.getTrackedValue(id, ...values);
    return trackedValue.seen(...values);
  }
  async getTrackedValue(id, ...values) {
    if (id === null)
      throw new Error(`id parameter cannot be null`);
    if (id === void 0)
      throw new Error(`id parameter cannot be undefined`);
    const trackedValue = await this.gog(id, values[0]);
    return trackedValue;
  }
  delete(id) {
    this.store.delete(id);
  }
  reset() {
    this.store = /* @__PURE__ */ new Map();
  }
  *ids() {
    yield* this.store.keys();
  }
  *values() {
    yield* this.store.values();
  }
  trackedByAge() {
    const tp = Array.from(this.store.values());
    tp.sort((a, b) => {
      const aa = a.elapsed;
      const bb = b.elapsed;
      if (aa === bb)
        return 0;
      if (aa > bb)
        return -1;
      return 1;
    });
    return tp;
  }
  valuesByAge() {
    const tb = this.trackedByAge();
    return tb.map((t) => t.last);
  }
  *last() {
    for (const p of this.store.values()) {
      yield p.last;
    }
  }
  *initialValues() {
    for (const p of this.store.values()) {
      yield p.initial;
    }
  }
  get(id) {
    return this.store.get(id);
  }
};

export {
  TrackedPrimitiveValue,
  TrackedObject,
  TrackedValueMap
};
//# sourceMappingURL=chunk-Z3S62C4B.js.map