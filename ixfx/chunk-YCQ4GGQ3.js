import {
  getOrGenerate
} from "./chunk-LTK4DV2D.js";
import {
  __publicField
} from "./chunk-6SYKIMQH.js";

// src/temporal/TrackedValue.ts
var TrackedValue = class {
  constructor(id, initial, opts = {}) {
    this.id = id;
    __publicField(this, "values");
    __publicField(this, "seenCount");
    __publicField(this, "storeIntermediate");
    __publicField(this, "resetAfterSamples");
    this.storeIntermediate = opts.storeIntermediate ?? false;
    this.resetAfterSamples = opts.resetAfterSamples ?? -1;
    this.seenCount = 0;
    const s = { ...initial, at: Date.now() };
    this.values = [s];
  }
  reset() {
    this.values = this.values.slice(1);
    this.seenCount = 0;
    this.onReset();
  }
  onReset() {
  }
  seen(...p) {
    const ts = p.map((v) => `at` in v ? v : {
      ...v,
      at: Date.now()
    });
    if (this.resetAfterSamples > 0 && this.seenCount > this.resetAfterSamples) {
      this.reset();
    }
    this.seenCount += p.length;
    const last = ts.at(-1);
    if (this.storeIntermediate)
      this.values.push(...ts);
    else if (this.values.length === 2) {
      this.values[1] = last;
    } else {
      this.values.push(last);
    }
    this.onSeen(ts);
    return this;
  }
  onSeen(_values) {
  }
  get last() {
    if (this.values.length === 1)
      return this.values[0];
    return this.values.at(-1);
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
  getByAge() {
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
  *last() {
    for (const p of this.store.values()) {
      yield p.last;
    }
  }
  *startValues() {
    for (const p of this.store.values()) {
      yield p.values[0];
    }
  }
  get(id) {
    return this.store.get(id);
  }
};

export {
  TrackedValue,
  TrackedValueMap
};
//# sourceMappingURL=chunk-YCQ4GGQ3.js.map