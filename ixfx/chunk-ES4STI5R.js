import {
  arrays_exports
} from "./chunk-MM6D35JS.js";
import {
  zip
} from "./chunk-FT4AY56C.js";
import {
  Pathed_exports,
  Process_exports,
  isEmptyEntries,
  isEqualContextString,
  mapObjectByObject,
  mapObjectShallow
} from "./chunk-FVOMQHH6.js";
import {
  resolve,
  resolveSync,
  resolveWithFallback,
  resolveWithFallbackSync
} from "./chunk-TNZP4XTK.js";
import {
  logSet
} from "./chunk-BWJ5AMOD.js";
import {
  getOrGenerate,
  getOrGenerateSync
} from "./chunk-IQEKYUOH.js";
import {
  SimpleEventEmitter
} from "./chunk-YSD5376E.js";
import {
  addKeepingExisting,
  addObject,
  deleteByValue,
  filter,
  find,
  firstEntryByPredicate,
  firstEntryByValue,
  fromIterable,
  fromObject,
  getClosestIntegerKey,
  getFromKeys,
  hasAnyValue,
  hasKeyValue,
  mapToArray,
  mapToObjectTransform,
  mergeByKey,
  some,
  sortByValue,
  sortByValueProperty,
  toArray,
  toObject,
  transformMap,
  zipKeyValue
} from "./chunk-UK6L3VJJ.js";
import {
  changedDataFields,
  compareArrays,
  compareData,
  compareKeys
} from "./chunk-DWAKOV2F.js";
import {
  __export
} from "./chunk-L5EJU35C.js";

// src/data/index.ts
var data_exports = {};
__export(data_exports, {
  Arrays: () => arrays_exports,
  Correlate: () => Correlate_exports,
  Maps: () => maps_exports,
  Pathed: () => Pathed_exports,
  Pool: () => Pool_exports,
  Process: () => Process_exports,
  changedDataFields: () => changedDataFields,
  compareArrays: () => compareArrays,
  compareData: () => compareData,
  compareKeys: () => compareKeys,
  isEmptyEntries: () => isEmptyEntries,
  isEqualContextString: () => isEqualContextString,
  keysToNumbers: () => keysToNumbers,
  mapObjectByObject: () => mapObjectByObject,
  mapObjectShallow: () => mapObjectShallow,
  piPi: () => piPi,
  resolve: () => resolve,
  resolveFields: () => resolveFields,
  resolveSync: () => resolveSync,
  resolveWithFallback: () => resolveWithFallback,
  resolveWithFallbackSync: () => resolveWithFallbackSync
});

// src/data/Correlate.ts
var Correlate_exports = {};
__export(Correlate_exports, {
  align: () => align,
  alignById: () => alignById
});
var orderScore = (a, b) => {
  if (a.score > b.score) return -1;
  else if (a.score < b.score) return 1;
  return 0;
};
var align = (similarityFn, lastData, newData, options = {}) => {
  const matchThreshold = options.matchThreshold ?? 0;
  const debug = options.debug ?? false;
  const results = /* @__PURE__ */ new Map();
  const newThings = [];
  const lastMap = /* @__PURE__ */ new Map();
  lastData?.forEach((d, index) => {
    if (d === void 0) {
      throw new Error(`'lastData' contains undefined (index: ${index})`);
    }
    lastMap.set(d.id, d);
  });
  for (let i = 0; i < newData.length; i++) {
    const newD = newData[i];
    if (!lastData || lastData.length === 0) {
      if (debug) console.debug(`Correlate.align() new id: ${newD.id}`);
      newThings.push(newD);
      continue;
    }
    const scoredLastValues = Array.from(lastMap.values()).map((last) => ({
      id: last.id,
      score: last === null ? -1 : similarityFn(last, newD),
      last
    }));
    if (scoredLastValues.length === 0) {
      if (debug) {
        console.debug(`Correlate.align() no valid last values id: ${newD.id}`);
      }
      newThings.push(newD);
      continue;
    }
    scoredLastValues.sort(orderScore);
    const top = scoredLastValues[0];
    if (top.score < matchThreshold) {
      if (debug) {
        console.debug(
          `Correlate.align() new item does not reach threshold. Top score: ${top.score} id: ${newD.id}`
        );
      }
      newThings.push(newD);
      continue;
    }
    if (debug && top.id !== newD.id) {
      console.log(
        `Correlate.align() Remapped ${newD.id} -> ${top.id} (score: ${top.score})`
      );
    }
    results.set(top.id, { ...newD, id: top.id });
    lastMap.delete(top.id);
  }
  newThings.forEach((t) => results.set(t.id, t));
  return Array.from(results.values());
};
var alignById = (fn, options = {}) => {
  let lastData = [];
  const compute = (newData) => {
    lastData = align(fn, lastData, newData, options);
    return [...lastData];
  };
  return compute;
};

// src/data/KeysToNumbers.ts
var keysToNumbers = (object, onInvalidKey = `throw`) => {
  const returnObject = {};
  for (const entry of Object.entries(object)) {
    const asNumber = Number.parseInt(entry[0]);
    if (Number.isNaN(asNumber)) {
      switch (onInvalidKey) {
        case `throw`: {
          throw new TypeError(`Cannot convert key '${entry[0]}' to an integer`);
        }
        case `ignore`: {
          continue;
        }
        case `keep`: {
          returnObject[entry[0]] = entry[1];
          continue;
        }
        default: {
          throw new Error(`Param 'onInvalidKey' should be: 'throw', 'ignore' or 'keep'.`);
        }
      }
    }
    returnObject[asNumber] = entry[1];
  }
  return returnObject;
};

// src/data/Pool.ts
var Pool_exports = {};
__export(Pool_exports, {
  Pool: () => Pool,
  PoolUser: () => PoolUser,
  Resource: () => Resource,
  create: () => create
});
var PoolUser = class extends SimpleEventEmitter {
  /**
   * Constructor
   * @param key User key
   * @param resource Resource being used
   */
  //eslint-disable-next-line functional/prefer-immutable-types
  constructor(key, resource) {
    super();
    this.key = key;
    this.resource = resource;
    this._lastUpdate = performance.now();
    this._pool = resource.pool;
    this._userExpireAfterMs = this._pool.userExpireAfterMs;
    this._state = `idle`;
    this._pool.log.log(`PoolUser ctor key: ${this.key}`);
  }
  /**
   * Returns a human readable debug string
   * @returns
   */
  toString() {
    if (this.isDisposed) return `PoolUser. State: disposed`;
    return `PoolUser. State: ${this._state} Elapsed: ${performance.now() - this._lastUpdate} Data: ${JSON.stringify(this.resource.data)}`;
  }
  /**
   * Resets countdown for instance expiry.
   * Throws an error if instance is disposed.
   */
  keepAlive() {
    if (this._state === `disposed`) throw new Error(`PoolItem disposed`);
    this._lastUpdate = performance.now();
  }
  /**
   * @internal
   * @param reason
   * @returns
   */
  _dispose(reason, data) {
    if (this._state === `disposed`) return;
    const resource = this.resource;
    this._state = `disposed`;
    resource._release(this);
    this._pool.log.log(`PoolUser dispose key: ${this.key} reason: ${reason}`);
    this.fireEvent(`disposed`, { data, reason });
    super.clearEventListeners();
  }
  /**
   * Release this instance
   * @param reason
   */
  release(reason) {
    if (this.isDisposed) throw new Error(`User disposed`);
    const resource = this.resource;
    const data = resource.data;
    this._pool.log.log(`PoolUser release key: ${this.key} reason: ${reason}`);
    this.fireEvent(`released`, { data, reason });
    this._dispose(`release-${reason}`, data);
  }
  // #region Properties
  get data() {
    if (this.isDisposed) throw new Error(`User disposed`);
    return this.resource.data;
  }
  /**
   * Returns true if this instance has expired.
   * Expiry counts if elapsed time is greater than `userExpireAfterMs`
   */
  get isExpired() {
    if (this._userExpireAfterMs > 0) {
      return performance.now() > this._lastUpdate + this._userExpireAfterMs;
    }
    return false;
  }
  /**
   * Returns elapsed time since last 'update'
   */
  get elapsed() {
    return performance.now() - this._lastUpdate;
  }
  /**
   * Returns true if instance is disposed
   */
  get isDisposed() {
    return this._state === `disposed`;
  }
  /**
   * Returns true if instance is neither disposed nor expired
   */
  get isValid() {
    if (this.isDisposed || this.isExpired) return false;
    if (this.resource.isDisposed) return false;
    return true;
  }
  // #endregion
};
var Resource = class {
  /**
   * Constructor.
   * @param pool Pool
   * @param data Data
   */
  constructor(pool, data) {
    this.pool = pool;
    if (data === void 0) throw new Error(`Parameter 'data' is undefined`);
    if (pool === void 0) throw new Error(`Parameter 'pool' is undefined`);
    this.#data = data;
    this.#lastUsersChange = 0;
    this.#resourcesWithoutUserExpireAfterMs = pool.resourcesWithoutUserExpireAfterMs;
    this.#capacityPerResource = pool.capacityPerResource;
    this.#users = [];
    this.#state = `idle`;
  }
  #state;
  #data;
  #users;
  #capacityPerResource;
  #resourcesWithoutUserExpireAfterMs;
  #lastUsersChange;
  /**
   * Gets data associated with resource.
   * Throws an error if disposed
   */
  get data() {
    if (this.#state === `disposed`) throw new Error(`Resource disposed`);
    return this.#data;
  }
  /**
   * Changes the data associated with this resource.
   * Throws an error if disposed or `data` is undefined.
   * @param data
   */
  updateData(data) {
    if (this.#state === `disposed`) throw new Error(`Resource disposed`);
    if (data === void 0) throw new Error(`Parameter 'data' is undefined`);
    this.#data = data;
  }
  /**
   * Returns a human-readable debug string for resource
   * @returns
   */
  toString() {
    return `Resource (expired: ${this.isExpiredFromUsers} users: ${this.#users.length}, state: ${this.#state}) data: ${JSON.stringify(this.data)}`;
  }
  /**
   * Assigns a user to this resource.
   * @internal
   * @param user
   */
  _assign(user) {
    const existing = this.#users.find((u) => u === user || u.key === user.key);
    if (existing) throw new Error(`User instance already assigned to resource`);
    this.#users.push(user);
    this.#lastUsersChange = performance.now();
  }
  /**
   * Releases a user from this resource
   * @internal
   * @param user
   */
  _release(user) {
    this.#users = this.#users.filter((u) => u !== user);
    this.pool._release(user);
    this.#lastUsersChange = performance.now();
  }
  /**
   * Returns true if resource can have additional users allocated
   */
  get hasUserCapacity() {
    return this.usersCount < this.#capacityPerResource;
  }
  /**
   * Returns number of uses of the resource
   */
  get usersCount() {
    return this.#users.length;
  }
  /**
   * Returns true if automatic expiry is enabled, and that interval
   * has elapsed since the users list has changed for this resource
   */
  get isExpiredFromUsers() {
    if (this.#resourcesWithoutUserExpireAfterMs <= 0) return false;
    if (this.#users.length > 0) return false;
    return performance.now() > this.#resourcesWithoutUserExpireAfterMs + this.#lastUsersChange;
  }
  /**
   * Returns true if instance is disposed
   */
  get isDisposed() {
    return this.#state === `disposed`;
  }
  /**
   * Disposes the resource.
   * If it is already disposed, it does nothing.
   * @param reason
   * @returns
   */
  dispose(reason) {
    if (this.#state === `disposed`) return;
    const data = this.#data;
    this.#state = `disposed`;
    this.pool.log.log(`Resource disposed (${reason})`);
    for (const u of this.#users) {
      u._dispose(`resource-${reason}`, data);
    }
    this.#users = [];
    this.#lastUsersChange = performance.now();
    this.pool._releaseResource(this, reason);
    if (this.pool.freeResource) this.pool.freeResource(data);
  }
};
var Pool = class {
  /**
   * Constructor.
   *
   * By default, no capacity limit, one user per resource
   * @param options Pool options
   */
  constructor(options = {}) {
    this.capacity = options.capacity ?? -1;
    this.fullPolicy = options.fullPolicy ?? `error`;
    this.capacityPerResource = options.capacityPerResource ?? 1;
    this.userExpireAfterMs = options.userExpireAfterMs ?? -1;
    this.resourcesWithoutUserExpireAfterMs = options.resourcesWithoutUserExpireAfterMs ?? -1;
    this.generateResource = options.generate;
    this.freeResource = options.free;
    this._users = /* @__PURE__ */ new Map();
    this._resources = [];
    this.log = logSet(`Pool`, options.debug ?? false);
    const timer = Math.max(
      this.userExpireAfterMs,
      this.resourcesWithoutUserExpireAfterMs
    );
    if (timer > 0) {
      setInterval(() => {
        this.maintain();
      }, timer * 1.1);
    }
  }
  /**
   * Returns a debug string of Pool state
   * @returns
   */
  dumpToString() {
    let r = `Pool
    capacity: ${this.capacity} userExpireAfterMs: ${this.userExpireAfterMs} capacityPerResource: ${this.capacityPerResource}
    resources count: ${this._resources.length}`;
    const resource = this._resources.map((r2) => r2.toString()).join(`\r
	`);
    r += `\r
Resources:\r
	` + resource;
    r += `\r
Users: \r
`;
    for (const [k, v] of this._users.entries()) {
      r += `	k: ${k} v: ${v.toString()}\r
`;
    }
    return r;
  }
  /**
   * Sorts users by longest elapsed time since update
   * @returns
   */
  getUsersByLongestElapsed() {
    return [...this._users.values()].sort((a, b) => {
      const aa = a.elapsed;
      const bb = b.elapsed;
      if (aa === bb) return 0;
      if (aa < bb) return 1;
      return -1;
    });
  }
  /**
   * Returns resources sorted with least used first
   * @returns
   */
  getResourcesSortedByUse() {
    return [...this._resources].sort((a, b) => {
      if (a.usersCount === b.usersCount) return 0;
      if (a.usersCount < b.usersCount) return -1;
      return 1;
    });
  }
  /**
   * Adds a shared resource to the pool
   * @throws Error if the capacity limit is reached or resource is null
   * @param resource
   * @returns
   */
  addResource(resource) {
    if (resource === void 0) {
      throw new Error(`Cannot add undefined resource`);
    }
    if (resource === null) throw new TypeError(`Cannot add null resource`);
    if (this.capacity > 0 && this._resources.length === this.capacity) {
      throw new Error(
        `Capacity limit (${this.capacity}) reached. Cannot add more.`
      );
    }
    this.log.log(`Adding resource: ${JSON.stringify(resource)}`);
    const pi = new Resource(this, resource);
    this._resources.push(pi);
    return pi;
  }
  /**
   * Performs maintenance, removing disposed/expired resources & users.
   * This is called automatically when using a resource.
   */
  maintain() {
    let changed = false;
    const nuke = [];
    for (const p of this._resources) {
      if (p.isDisposed) {
        this.log.log(`Maintain, disposed resource: ${JSON.stringify(p.data)}`);
        nuke.push(p);
      } else if (p.isExpiredFromUsers) {
        this.log.log(`Maintain, expired resource: ${JSON.stringify(p.data)}`);
        nuke.push(p);
      }
    }
    if (nuke.length > 0) {
      for (const resource of nuke) {
        resource.dispose(`diposed/expired`);
      }
      changed = true;
    }
    const userKeysToRemove = [];
    for (const [key, user] of this._users.entries()) {
      if (!user.isValid) {
        this.log.log(
          `Maintain. Invalid user: ${user.key} (Disposed: ${user.isDisposed} Expired: ${user.isExpired} Resource disposed: ${user.resource.isDisposed})`
        );
        userKeysToRemove.push(key);
        user._dispose(`invalid`, user.data);
      }
    }
    for (const userKey of userKeysToRemove) {
      this._users.delete(userKey);
      changed = true;
    }
    if (changed) {
      this.log.log(
        `End: resource len: ${this._resources.length} users: ${this.usersLength}`
      );
    }
  }
  /**
   * Iterate over resources in the pool.
   * To iterate over the data associated with each resource, use
   * `values`.
   */
  *resources() {
    const resource = [...this._resources];
    for (const r of resource) {
      yield r;
    }
  }
  /**
   * Iterate over resource values in the pool.
   * to iterate over the resources, use `resources`.
   *
   * Note that values may be returned even though there is no
   * active user.
   */
  *values() {
    const resource = [...this._resources];
    for (const r of resource) {
      yield r.data;
    }
  }
  /**
   * Unassociate a key with a pool item
   * @param userKey
   */
  release(userKey, reason) {
    const pi = this._users.get(userKey);
    if (!pi) return;
    pi.release(reason ?? `Pool.release`);
  }
  /**
   * @internal
   * @param user
   */
  //eslint-disable-next-line functional/prefer-immutable-types
  _release(user) {
    this._users.delete(user.key);
  }
  /**
   * @internal
   * @param resource
   * @param _
   */
  //eslint-disable-next-line functional/prefer-immutable-types
  _releaseResource(resource, _) {
    this._resources = this._resources.filter((v) => v !== resource);
  }
  /**
   * Returns true if `v` has an associted resource in the pool
   * @param resource
   * @returns
   */
  hasResource(resource) {
    const found = this._resources.find((v) => v.data === resource);
    return found !== void 0;
  }
  /**
   * Returns true if a given `userKey` is in use.
   * @param userKey
   * @returns
   */
  hasUser(userKey) {
    return this._users.has(userKey);
  }
  /**
   * @internal
   * @param key
   * @param resource
   * @returns
   */
  //eslint-disable-next-line functional/prefer-immutable-types
  _assign(key, resource) {
    const u = new PoolUser(key, resource);
    this._users.set(key, u);
    resource._assign(u);
    return u;
  }
  /**
   * Allocates a resource for `userKey`
   * @internal
   * @param userKey
   * @returns
   */
  #allocateResource(userKey) {
    const sorted = this.getResourcesSortedByUse();
    if (sorted.length > 0 && sorted[0].hasUserCapacity) {
      const u = this._assign(userKey, sorted[0]);
      return u;
    }
    if (this.generateResource && (this.capacity < 0 || this._resources.length < this.capacity)) {
      this.log.log(
        `capacity: ${this.capacity} resources: ${this._resources.length}`
      );
      const resourceGenerated = this.addResource(this.generateResource());
      const u = this._assign(userKey, resourceGenerated);
      return u;
    }
  }
  /**
   * Return the number of users
   */
  get usersLength() {
    return [...this._users.values()].length;
  }
  /**
   * 'Uses' a resource, returning the value
   * @param userKey
   * @returns
   */
  useValue(userKey) {
    const resource = this.use(userKey);
    return resource.resource.data;
  }
  /**
   * Gets a pool item based on a 'user' key.
   * 
   * The same key should return the same pool item,
   * for as long as it still exists.
   * 
   * If a 'user' already has a resource, it will 'keep alive' their use.
   * If a 'user' does not already have resource
   *  - if there is capacity, a resource is allocated to user
   *  - if pool is full
   *    - fullPolicy = 'error': an error is thrown
   *    - fullPolicy = 'evictOldestUser': evicts an older user
   *    - Throw error
   * @param userKey
   * @throws Error If all resources are used and fullPolicy = 'error'
   * @returns
   */
  use(userKey) {
    const pi = this._users.get(userKey);
    if (pi) {
      pi.keepAlive();
      return pi;
    }
    this.maintain();
    const match = this.#allocateResource(userKey);
    if (match) return match;
    if (this.fullPolicy === `error`) {
      throw new Error(
        `Pool is fully used (fullPolicy: ${this.fullPolicy}, capacity: ${this.capacity})`
      );
    }
    if (this.fullPolicy === `evictOldestUser`) {
      const users = this.getUsersByLongestElapsed();
      if (users.length > 0) {
        this.release(users[0].key, `evictedOldestUser`);
        const match2 = this.#allocateResource(userKey);
        if (match2) return match2;
      }
    }
    throw new Error(`Pool is fully used (${this.fullPolicy})`);
  }
};
var create = (options = {}) => new Pool(options);

// src/data/ResolveFields.ts
async function resolveFields(object) {
  const resolvers = [];
  const keys = [];
  for (const entry of Object.entries(object)) {
    const resolvable = entry[1];
    resolvers.push(resolve(resolvable));
    keys.push(entry[0]);
  }
  const results = await Promise.all(resolvers);
  const entries = zip(keys, results);
  return Object.fromEntries(entries);
}

// src/data/maps/index.ts
var maps_exports = {};
__export(maps_exports, {
  addKeepingExisting: () => addKeepingExisting,
  addObject: () => addObject,
  deleteByValue: () => deleteByValue,
  filter: () => filter,
  find: () => find,
  firstEntryByPredicate: () => firstEntryByPredicate,
  firstEntryByValue: () => firstEntryByValue,
  fromIterable: () => fromIterable,
  fromObject: () => fromObject,
  getClosestIntegerKey: () => getClosestIntegerKey,
  getFromKeys: () => getFromKeys,
  getOrGenerate: () => getOrGenerate,
  getOrGenerateSync: () => getOrGenerateSync,
  hasAnyValue: () => hasAnyValue,
  hasKeyValue: () => hasKeyValue,
  mapToArray: () => mapToArray,
  mapToObjectTransform: () => mapToObjectTransform,
  mergeByKey: () => mergeByKey,
  some: () => some,
  sortByValue: () => sortByValue,
  sortByValueProperty: () => sortByValueProperty,
  toArray: () => toArray,
  toObject: () => toObject,
  transformMap: () => transformMap,
  zipKeyValue: () => zipKeyValue
});

// src/data/index.ts
var piPi = Math.PI * 2;

export {
  Correlate_exports,
  keysToNumbers,
  Pool_exports,
  resolveFields,
  maps_exports,
  piPi,
  data_exports
};
//# sourceMappingURL=chunk-ES4STI5R.js.map