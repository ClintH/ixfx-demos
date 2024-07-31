import { c as RemapObjectPropertyType, e as ReactiveNonInitial, C as ChangeKind, f as ChangeRecord, g as CompareChangeSet, I as IsEqualContext, h as Pathed, i as Process, j as changedDataFields, k as compareArrays, l as compareData, m as compareKeys, n as isEmptyEntries, o as isEqualContextString } from './Types-wAi1hdUW.js';
import { S as SimpleEventEmitter } from './Events-DJgOvcWD.js';
import { b as LogSet } from './Types-CF8sZZ-9.js';
import { R as ResolveToValue, a as ResolveFallbackOpts, b as ResolveToValueAsync, c as ResolveToValueSync, r as resolve, d as resolveSync, e as resolveWithFallback, f as resolveWithFallbackSync } from './Resolve-Dv_PAeQ5.js';
import { N as NumberFunction, R as RankArrayOptions, a as RankFunction, b as RankOptions, V as ValueType } from './Types-AjpgZy7P.js';
import { i as index$2 } from './index-BkmnTtk3.js';
import { G as GetOrGenerate, g as getOrGenerate, a as getOrGenerateSync } from './GetOrGenerate-CVpu5gTc.js';
import { a as IWithEntries, I as IDictionary } from './IMappish-qfjdy4T9.js';
import { I as IsEqual } from './IsEqual-CTTf-Oj9.js';
import { T as ToString } from './ToString-DO94OWoh.js';

/**
 * Returns the similarity of `a` and `b` to each other,
 * where higher similarity should be a higher number.
 * @param a
 * @param b
 */
type Similarity<V> = (a: V, b: V) => number;
/**
 * Options for alignmnent
 */
type AlignOpts = {
    /**
     * If the similarity score is above this threshold,
     * consider them the same
     */
    readonly matchThreshold?: number;
    /**
     * If true, additional console messages are printed during
     * execution.
     */
    readonly debug?: boolean;
};
/**
 * Some data with an id property.
 */
type DataWithId<V> = V & {
    readonly id: string;
};
/**
 * Attempts to align prior data with new data, based on a provided similarity function.
 *
 * See also `alignById` for a version which encloses parameters.
 *
 * ```js
 * // Compare data based on x,y distance
 * const fn = (a, b) => {
 *  return 1-Points.distance(a, b);
 * }
 * const lastData = [
 *  { id:`1`, x:100, y:200 }
 *  ...
 * ]
 * const newData = [
 *  { id:`2`, x:101, y:200 }
 * ]
 * const aligned = Correlate.align(fn, lastdata, newData, opts);
 *
 * // Result:
 * [
 *  { id:`1`, x:101, y:200 }
 * ]
 * ```
 * @param similarityFn Function to compute similarity
 * @param lastData Old data
 * @param newData New data
 * @param options Options
 * @returns
 */
declare const align: <V>(similarityFn: Similarity<V>, lastData: readonly DataWithId<V>[] | undefined, newData: readonly DataWithId<V>[], options?: AlignOpts) => readonly DataWithId<V>[];
/**
 * Returns a function that attempts to align a series of data by its id.
 * See also {@link align} for a version with no internal storage.
 *
 * ```js
 * // Compare data based on x,y distance
 * const fn = (a, b) => {
 *  return 1-Points.distance(a, b);
 * }
 * const aligner = Correlate.alignById(fn, opts);
 *
 * const lastData = [
 *  { id:`1`, x:100, y:200 }
 *  ...
 * ]
 * const aligned = aligner(lastData);
 *
 * ```
 * @param fn Function to compute similarity
 * @param options Options
 * @returns
 */
declare const alignById: <V>(fn: Similarity<V>, options?: AlignOpts) => (newData: DataWithId<V>[]) => DataWithId<V>[];

type Correlate_AlignOpts = AlignOpts;
type Correlate_DataWithId<V> = DataWithId<V>;
type Correlate_Similarity<V> = Similarity<V>;
declare const Correlate_align: typeof align;
declare const Correlate_alignById: typeof alignById;
declare namespace Correlate {
  export { type Correlate_AlignOpts as AlignOpts, type Correlate_DataWithId as DataWithId, type Correlate_Similarity as Similarity, Correlate_align as align, Correlate_alignById as alignById };
}

/**
 * Returns a copy of `object` with integer numbers as keys instead of whatever it has.
 * ```js
 * keysToNumbers({ '1': true }); // Yields: { 1: true }
 * ```
 *
 * The `onInvalidKey` sets how to handle keys that cannot be converted to integers.
 * * 'throw' (default): throws an exception
 * * 'ignore': that key & value is ignored
 * * 'keep': uses the string key instead
 *
 *
 * ```js
 * keysToNumber({ hello: 'there' }, `ignore`); // Yields: {  }
 * keysToNumber({ hello: 'there' }, `throw`);  // Exception
 * keysToNumber({ hello: 'there' }, `keep`);   // Yields: { hello: 'there' }
 * ```
 *
 * Floating-point numbers will be converted to integer by rounding.
 * ```js
 * keysToNumbers({ '2.4': 'hello' }); // Yields: { 2: 'hello' }
 * ```
 * @param object
 * @param onInvalidKey
 * @returns
 */
declare const keysToNumbers: <T>(object: Record<any, T>, onInvalidKey?: `throw` | `ignore` | `keep`) => Record<number, T>;

/**
 * Maps the top-level properties of an object through a map function.
 * That is, run each of the values of an object through a function,
 * setting the result onto the same key structure as original.
 *
 * It is NOT recursive.
 *
 * The mapping function gets a single args object, consisting of `{ value, field, index }`,
 * where 'value' is the value of the field, 'field' the name, and 'index' a numeric count.
 * @example Double the value of all fields
 * ```js
 * const rect = { width: 100, height: 250 };
 * const doubled = mapObjectShallow(rect, args => {
 *  return args.value*2;
 * });
 * // Yields: { width: 200, height: 500 }
 * ```
 *
 * Since the map callback gets the name of the property, it can do context-dependent things.
 * ```js
 * const rect = { width: 100, height: 250, colour: 'red' }
 * const doubled = mapObjectShallow(rect, args => {
 *  if (args.field === 'width') return args.value*3;
 *  else if (typeof args.value === 'number') return args.value*2;
 *  return args.value;
 * });
 * // Yields: { width: 300, height: 500, colour: 'red' }
 * ```
 * In addition to bulk processing, it allows remapping of property types.
 *
 * In terms of type-safety, the mapped properties are assumed to have the
 * same type.
 *
 * ```js
 * const o = {
 *  x: 10,
 *  y: 20,
 *  width: 200,
 *  height: 200
 * }
 *
 * // Make each property use an averager instead
 * const oAvg = mapObjectShallow(o, args => {
 *  return movingAverage(10);
 * });
 *
 * // Instead of { x:number, y:number... }, we now have { x:movingAverage(), y:movingAverage()... }
 * // Add a value to the averager
 * oAvg.x.add(20);
 * ```
 */
declare const mapObjectShallow: <TSource extends Record<string, any>, TFieldValue>(object: TSource, mapFunction: (args: MapObjectArgs) => TFieldValue) => RemapObjectPropertyType<TSource, TFieldValue>;
type MapObjectArgs = {
    field: string;
    path: string;
    value: any;
    index: number;
};
/**
 * Maps the contents of `data` using `mapper` as a structured set of map functions.
 * ```js
 * const a = {
 *  person: {
 *    size: 20
 *  }
 *  hello: `there`
 * }
 * mapObjectByObject(a, {
 *  person: {
 *    size: (value, context) => {
 *      return value * 2
 *    }
 *  }
 * });
 * // Yields: { person: { size: 40 }, hello: `there` }
 * ```
 * @param data
 * @param mapper
 * @returns
 */
declare function mapObjectByObject(data: any, mapper: Record<string, (value: any, context: any) => any>): {
    [k: string]: unknown;
};

/**
 * Policy for when the pool is fully used
 */
type FullPolicy = `error` | `evictOldestUser`;
/**
 * Pool options
 */
type Opts<V> = {
    /**
     * Maximum number of resources for this pool
     */
    readonly capacity?: number;
    /**
     * If above 0, users will be removed if there is no activity after this interval.
     * Activity is marked whenever `use` us called with that user key.
     * Default: disabled
     */
    readonly userExpireAfterMs?: number;
    /**
     * If above 0, resources with no users will be automatically removed after this interval.
     * Default: disabled
     */
    readonly resourcesWithoutUserExpireAfterMs?: number;
    /**
     * Maximum number of users per resource. Defaults to 1
     */
    readonly capacityPerResource?: number;
    /**
     * What to do if pool is full and a new resource allocation is requested.
     * Default is `error`, throwing an error when pool is full.
     */
    readonly fullPolicy?: FullPolicy;
    /**
     * If true, additional logging will trace activity of pool.
     * Default: false
     */
    readonly debug?: boolean;
    /**
     * If specified, this function will generate new resources as needed.
     */
    readonly generate?: () => V;
    /**
     * If specified, this function will be called when a resource is disposed
     */
    readonly free?: (v: V) => void;
};
/**
 * Function that initialises a pool item
 */
/**
 * State of pool
 */
type PoolState = `idle` | `active` | `disposed`;
type PoolUserEventMap<V> = {
    readonly disposed: {
        readonly data: V;
        readonly reason: string;
    };
    readonly released: {
        readonly data: V;
        readonly reason: string;
    };
};
/**
 * A use of a pool resource
 *
 * Has two events, _disposed_ and _released_.
 */
declare class PoolUser<V> extends SimpleEventEmitter<PoolUserEventMap<V>> {
    readonly key: string;
    readonly resource: Resource<V>;
    private _lastUpdate;
    private _pool;
    private _state;
    private _userExpireAfterMs;
    /**
     * Constructor
     * @param key User key
     * @param resource Resource being used
     */
    constructor(key: string, resource: Resource<V>);
    /**
     * Returns a human readable debug string
     * @returns
     */
    toString(): string;
    /**
     * Resets countdown for instance expiry.
     * Throws an error if instance is disposed.
     */
    keepAlive(): void;
    /**
     * @internal
     * @param reason
     * @returns
     */
    _dispose(reason: string, data: V): void;
    /**
     * Release this instance
     * @param reason
     */
    release(reason: string): void;
    get data(): V;
    /**
     * Returns true if this instance has expired.
     * Expiry counts if elapsed time is greater than `userExpireAfterMs`
     */
    get isExpired(): boolean;
    /**
     * Returns elapsed time since last 'update'
     */
    get elapsed(): number;
    /**
     * Returns true if instance is disposed
     */
    get isDisposed(): boolean;
    /**
     * Returns true if instance is neither disposed nor expired
     */
    get isValid(): boolean;
}
/**
 * A resource allocated in the Pool
 */
declare class Resource<V> {
    #private;
    readonly pool: Pool<V>;
    /**
     * Constructor.
     * @param pool Pool
     * @param data Data
     */
    constructor(pool: Pool<V>, data: V);
    /**
     * Gets data associated with resource.
     * Throws an error if disposed
     */
    get data(): V;
    /**
     * Changes the data associated with this resource.
     * Throws an error if disposed or `data` is undefined.
     * @param data
     */
    updateData(data: V): void;
    /**
     * Returns a human-readable debug string for resource
     * @returns
     */
    toString(): string;
    /**
     * Assigns a user to this resource.
     * @internal
     * @param user
     */
    _assign(user: PoolUser<V>): void;
    /**
     * Releases a user from this resource
     * @internal
     * @param user
     */
    _release(user: PoolUser<V>): void;
    /**
     * Returns true if resource can have additional users allocated
     */
    get hasUserCapacity(): boolean;
    /**
     * Returns number of uses of the resource
     */
    get usersCount(): number;
    /**
     * Returns true if automatic expiry is enabled, and that interval
     * has elapsed since the users list has changed for this resource
     */
    get isExpiredFromUsers(): boolean;
    /**
     * Returns true if instance is disposed
     */
    get isDisposed(): boolean;
    /**
     * Disposes the resource.
     * If it is already disposed, it does nothing.
     * @param reason
     * @returns
     */
    dispose(reason: string): void;
}
/**
 * Resource pool
 * It does the housekeeping of managing a limited set of resources which are shared by 'users'.
 * All resources in the Pool are meant to be the same kind of object.
 *
 * An example is an audio sketch driven by TensorFlow. We might want to allocate a sound oscillator per detected human body. A naive implementation would be to make an oscillator for each detected body. However, because poses appear/disappear unpredictably, it's a lot of extra work to maintain the binding between pose and oscillator.
 *
 * Instead, we might use the Pool to allocate oscillators to poses. This will allow us to limit resources and clean up automatically if they haven't been used for a while.
 *
 * Resources can be added manually with `addResource()`, or automatically by providing a `generate()` function in the Pool options. They can then be accessed via a _user key_. This is meant to associated with a single 'user' of a resource. For example, if we are associating oscillators with TensorFlow poses, the 'user key' might be the id of the pose.
 */
declare class Pool<V> {
    #private;
    private _resources;
    private _users;
    readonly capacity: number;
    readonly userExpireAfterMs: number;
    readonly resourcesWithoutUserExpireAfterMs: number;
    readonly capacityPerResource: number;
    readonly fullPolicy: FullPolicy;
    private generateResource?;
    readonly freeResource?: (v: V) => void;
    readonly log: LogSet;
    /**
     * Constructor.
     *
     * By default, no capacity limit, one user per resource
     * @param options Pool options
     */
    constructor(options?: Opts<V>);
    /**
     * Returns a debug string of Pool state
     * @returns
     */
    dumpToString(): string;
    /**
     * Sorts users by longest elapsed time since update
     * @returns
     */
    getUsersByLongestElapsed(): PoolUser<V>[];
    /**
     * Returns resources sorted with least used first
     * @returns
     */
    getResourcesSortedByUse(): Resource<V>[];
    /**
     * Adds a shared resource to the pool
     * @throws Error if the capacity limit is reached or resource is null
     * @param resource
     * @returns
     */
    addResource(resource: V): Resource<V>;
    /**
     * Performs maintenance, removing disposed/expired resources & users.
     * This is called automatically when using a resource.
     */
    maintain(): void;
    /**
     * Iterate over resources in the pool.
     * To iterate over the data associated with each resource, use
     * `values`.
     */
    resources(): Generator<Resource<V>, void, unknown>;
    /**
     * Iterate over resource values in the pool.
     * to iterate over the resources, use `resources`.
     *
     * Note that values may be returned even though there is no
     * active user.
     */
    values(): Generator<V, void, unknown>;
    /**
     * Unassociate a key with a pool item
     * @param userKey
     */
    release(userKey: string, reason?: string): void;
    /**
     * @internal
     * @param user
     */
    _release(user: PoolUser<V>): void;
    /**
     * @internal
     * @param resource
     * @param _
     */
    _releaseResource(resource: Resource<V>, _: string): void;
    /**
     * Returns true if `v` has an associted resource in the pool
     * @param resource
     * @returns
     */
    hasResource(resource: V): boolean;
    /**
     * Returns true if a given `userKey` is in use.
     * @param userKey
     * @returns
     */
    hasUser(userKey: string): boolean;
    /**
     * @internal
     * @param key
     * @param resource
     * @returns
     */
    private _assign;
    /**
     * Return the number of users
     */
    get usersLength(): number;
    /**
     * 'Uses' a resource, returning the value
     * @param userKey
     * @returns
     */
    useValue(userKey: string): V;
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
    use(userKey: string): PoolUser<V>;
}
/**
 * Creates an instance of a Pool
 * @param options
 * @returns
 */
declare const create: <V>(options?: Opts<V>) => Pool<V>;

type Pool$1_FullPolicy = FullPolicy;
type Pool$1_Opts<V> = Opts<V>;
type Pool$1_Pool<V> = Pool<V>;
declare const Pool$1_Pool: typeof Pool;
type Pool$1_PoolState = PoolState;
type Pool$1_PoolUser<V> = PoolUser<V>;
declare const Pool$1_PoolUser: typeof PoolUser;
type Pool$1_PoolUserEventMap<V> = PoolUserEventMap<V>;
type Pool$1_Resource<V> = Resource<V>;
declare const Pool$1_Resource: typeof Resource;
declare const Pool$1_create: typeof create;
declare namespace Pool$1 {
  export { type Pool$1_FullPolicy as FullPolicy, type Pool$1_Opts as Opts, Pool$1_Pool as Pool, type Pool$1_PoolState as PoolState, Pool$1_PoolUser as PoolUser, type Pool$1_PoolUserEventMap as PoolUserEventMap, Pool$1_Resource as Resource, Pool$1_create as create };
}

type ResolvedObject<T extends Record<string, ResolveToValue<any>>> = {
    [K in keyof T]: T[K] extends number ? number : T[K] extends string ? string : T[K] extends boolean ? boolean : T[K] extends bigint ? bigint : T[K] extends () => Promise<any> ? Awaited<ReturnType<T[K]>> : T[K] extends () => any ? ReturnType<T[K]> : T[K] extends ReactiveNonInitial<infer V> ? V : T[K] extends Generator<infer V> ? V : T[K] extends AsyncGenerator<infer V> ? V : T[K] extends IterableIterator<infer V> ? V : T[K] extends AsyncIterableIterator<infer V> ? V : T[K] extends Array<infer V> ? V : T[K] extends object ? T[K] : never;
};
/**
 * Returns a copy of `object`, with the same properties. For each property
 * that has a basic value (string, number, boolean, object), the value is set
 * for the return object. If the property is a function or generator, its value
 * is used instead. Async functions and generators are also usable.
 *
 * Not recursive.
 *
 * In the below example, the function for the property `random` is invoked.
 * ```js
 * const state = {
 *  length: 10,
 *  random: () => Math.random();
 * }
 * const x = resolveFields(state);
 * // { length: 10, random: 0.1235 }
 * ```
 *
 * It also works with generators
 * ```js
 * import { count } from './numbers.js';
 *
 * const state = {
 *  length: 10,
 *  index: count(2) // Generator that yields: 0, 1 and then ends
 * }
 * resolveFields(state); // { length: 10, index: 0 }
 * resolveFields(state); // { length: 10, index: 1 }
 * // Generator finishes after counting twice:
 * resolveFields(state); // { length: 10, index: undefined }
 * ```
 * @param object
 * @returns
 */
declare function resolveFields<T extends Record<string, ResolveToValue<any>>>(object: T): Promise<ResolvedObject<T>>;

/**
 * Gets the closest integer key to `target` in `data`.
 * * Requires map to have numbers as keys, not strings
 * * Math.round is used for rounding `target`.
 *
 * Examples:
 * ```js
 * // Assuming numeric keys 1, 2, 3, 4 exist:
 * getClosestIntegerKey(map, 3);    // 3
 * getClosestIntegerKey(map, 3.1);  // 3
 * getClosestIntegerKey(map, 3.5);  // 4
 * getClosestIntegerKey(map, 3.6);  // 4
 * getClosestIntegerKey(map, 100);  // 4
 * getClosestIntegerKey(map, -100); // 1
 * ```
 * @param data Map
 * @param target Target value
 * @returns
 */
declare const getClosestIntegerKey: (data: ReadonlyMap<number, any>, target: number) => number;
/**
 * Returns the first value in `data` that matches a key from `keys`.
 * ```js
 * // Iterate, yielding: `a.b.c.d`, `b.c.d`, `c.d`, `d`
 * const keys = Text.segmentsFromEnd(`a.b.c.d`);
 * // Gets first value that matches a key (starting from most precise)
 * const value = getFromKeys(data, keys);
 * ```
 * @param data
 * @param keys
 * @returns
 */
declare const getFromKeys: <T>(data: ReadonlyMap<string, T>, keys: Iterable<string>) => T | undefined;
/**
 * Returns true if map contains `value` under `key`, using `comparer` function. Use {@link hasAnyValue} if you don't care
 * what key value might be under.
 *
 * Having a comparer function is useful to check by value rather than object reference.
 *
 * @example Find key value based on string equality
 * ```js
 * hasKeyValue(map,`hello`, `samantha`, (a, b) => a === b);
 * ```
 * @param map Map to search
 * @param key Key to search
 * @param value Value to search
 * @param comparer Function to determine match
 * @returns True if key is found
 */
declare const hasKeyValue: <K, V>(map: ReadonlyMap<K, V>, key: K, value: V, comparer: IsEqual<V>) => boolean;
/**
 * Deletes all key/values from map where value matches `value`,
 * with optional comparer. Mutates map.
 *
 * ```js
 * import { Maps } from "https://unpkg.com/ixfx/dist/collections.js"
 *
 * // Compare fruits based on their colour property
 * const colourComparer = (a, b) => a.colour === b.colour;
 *
 * // Deletes all values where .colour = `red`
 * Maps.deleteByValue(map, { colour: `red` }, colourComparer);
 * ```
 * @param map
 * @param value
 * @param comparer
 */
declare const deleteByValue: <K, V>(map: ReadonlyMap<K, V>, value: V, comparer?: IsEqual<V>) => void;
/**
 * Finds first entry by iterable value. Expects a map with an iterable as values.
 *
 * ```js
 * const map = new Map();
 * map.set('hello', 'a');
 * map.set('there', 'b');
 *
 * const entry = firstEntryByPredicate(map, (value, key) => {
 *  return (value === 'b');
 * });
 * // Entry is: ['there', 'b']
 * ```
 *
 * An alternative is {@link firstEntryByValue} to search by value.
 * @param map Map to search
 * @param predicate Filter function returns true when there is a match of value
 * @returns Entry, or _undefined_ if `filter` function never returns _true_
 */
declare const firstEntryByPredicate: <K, V>(map: IWithEntries<K, V>, predicate: (value: V, key: K) => boolean) => readonly [key: K, value: V] | undefined;
/**
 * Finds first entry by value.
 *
 * ```js
 * const map = new Map();
 * map.set('hello', 'a');
 * map.set('there', 'b');
 *
 * const entry = firstEntryByValue(map, 'b');
 * // Entry is: ['there', 'b']
 * ```
 *
 * An alternative is {@link firstEntryByValue} to search by predicate function.
 * @param map Map to search
 * @param value Value to seek
 * @param isEqual Filter function which checks equality. Uses JS comparer by default.
 * @returns Entry, or _undefined_ if `value` not found.
 */
declare const firstEntryByValue: <K, V>(map: IWithEntries<K, V>, value: V, isEqual?: IsEqual<V>) => readonly [key: K, value: V] | undefined;
/**
 * Adds items to a map only if their key doesn't already exist
 *
 * Uses provided {@link Util.ToString} function to create keys for items. Item is only added if it doesn't already exist.
 * Thus the older item wins out, versus normal `Map.set` where the newest wins.
 *
 *
 * @example
 * ```js
 * import { Maps } from "https://unpkg.com/ixfx/dist/collections.js";
 * const map = new Map();
 * const peopleArray = [ _some people objects..._];
 * Maps.addKeepingExisting(map, p => p.name, ...peopleArray);
 * ```
 * @param set
 * @param hasher
 * @param values
 * @returns
 */
declare const addKeepingExisting: <V>(set: ReadonlyMap<string, V> | undefined, hasher: ToString<V>, ...values: ReadonlyArray<V>) => Map<any, any>;
/**
 * Returns a array of entries from a map, sorted by value.
 *
 * ```js
 * const m = new Map();
 * m.set(`4491`, { name: `Bob` });
 * m.set(`2319`, { name: `Alice` });
 *
 * // Compare by name
 * const comparer = (a, b) => defaultComparer(a.name, b.name);
 *
 * // Get sorted values
 * const sorted = Maps.sortByValue(m, comparer);
 * ```
 *
 * `sortByValue` takes a comparison function that should return -1, 0 or 1 to indicate order of `a` to `b`. If not provided, {@link Util.defaultComparer} is used.
 * @param map
 * @param comparer
 * @returns
 */
declare const sortByValue: <K, V>(map: ReadonlyMap<K, V>, comparer?: (a: V, b: V) => number) => [K, V][];
/**
 * Returns an array of entries from a map, sorted by a property of the value
 *
 * ```js
 * cosnt m = new Map();
 * m.set(`4491`, { name: `Bob` });
 * m.set(`2319`, { name: `Alice` });
 * const sorted = Maps.sortByValue(m, `name`);
 * ```
 * @param map Map to sort
 * @param property Property of value
 * @param compareFunction Comparer. If unspecified, uses a default.
 */
declare const sortByValueProperty: <K, V, Z>(map: ReadonlyMap<K, V>, property: string, compareFunction?: (a: Z, b: Z) => number) => [K, V][];
/**
 * Returns _true_ if any key contains `value`, based on the provided `comparer` function. Use {@link hasKeyValue}
 * if you only want to find a value under a certain key.
 *
 * Having a comparer function is useful to check by value rather than object reference.
 * @example Finds value where name is 'samantha', regardless of other properties
 * ```js
 * hasAnyValue(map, {name:`samantha`}, (a, b) => a.name === b.name);
 * ```
 *
 * Works by comparing `value` against all values contained in `map` for equality using the provided `comparer`.
 *
 * @param map Map to search
 * @param value Value to find
 * @param comparer Function that determines matching. Should return true if `a` and `b` are considered equal.
 * @returns True if value is found
 */
declare const hasAnyValue: <K, V>(map: ReadonlyMap<K, V>, value: V, comparer: IsEqual<V>) => boolean;
/**
 * Returns values where `predicate` returns true.
 *
 * If you just want the first match, use `find`
 *
 * @example All people over thirty
 * ```js
 * // for-of loop
 * for (const v of filter(people, person => person.age > 30)) {
 *
 * }
 * // If you want an array
 * const overThirty = Array.from(filter(people, person => person.age > 30));
 * ```
 * @param map Map
 * @param predicate Filtering predicate
 * @returns Values that match predicate
 */
declare function filter<V>(map: ReadonlyMap<string, V>, predicate: (v: V) => boolean): Generator<V, void, unknown>;
/**
 * Copies data to an array
 * @param map
 * @returns
 */
declare const toArray: <V>(map: ReadonlyMap<string, V>) => ReadonlyArray<V>;
/**
 * import { Maps } from 'https://unpkg.com/ixfx/dist/data.js';
 * Returns a Map from an iterable. By default throws an exception
 * if iterable contains duplicate values.
 *
 * ```js
 * const data = [
 *  { fruit: `granny-smith`, family: `apple`, colour: `green` }
 *  { fruit: `mango`, family: `stone-fruit`, colour: `orange` }
 * ];
 * const map = Maps.fromIterable(data, v => v.fruit);
 * ```
 * @param data Input data
 * @param keyFunction Function which returns a string id. By default uses the JSON value of the object.
 * @param allowOverwrites When set to _true_, items with same id will silently overwrite each other, with last write wins. _false_ by default.
 * @returns
 */
declare const fromIterable: <V>(data: Iterable<V>, keyFunction?: (itemToMakeStringFor: V) => string, allowOverwrites?: boolean) => ReadonlyMap<string, V>;
/**
 * Returns a Map from an object, or array of objects.
 * Assumes the top-level properties of the object is the key.
 *
 * ```js
 * import { Maps } from 'https://unpkg.com/ixfx/dist/data.js';
 * const data = {
 *  Sally: { name: `Sally`, colour: `red` },
 *  Bob: { name: `Bob`, colour: `pink` }
 * };
 * const map = Maps.fromObject(data);
 * map.get(`Sally`); // { name: `Sally`, colour: `red` }
 * ```
 *
 * To add an object to an existing map, use {@link addObject}.
 * @param data
 * @returns
 */
declare const fromObject: <V>(data: any) => ReadonlyMap<string, V>;
/**
 * Adds an object to an existing map. It assumes a structure where
 * each top-level property is a key:
 *
 * ```js
 * import { Maps } from 'https://unpkg.com/ixfx/dist/data.js';
 * const data = {
 *  Sally: { colour: `red` },
 *  Bob:   { colour: `pink` }
 * };
 * const map = new Map();
 * Maps.addObject(map, data);
 *
 * map.get(`Sally`); // { name: `Sally`, colour: `red` }
 * ```
 *
 * To create a new map from an object, use {@link fromObject} instead.
 * @param map
 * @param data
 */
declare const addObject: <V>(map: Map<string, V>, data: any) => void;
/**
 * Returns the first found value that matches `predicate` or _undefined_.
 *
 * Use {@link some} if you don't care about the value, just whether it appears.
 * Use {@link filter} to get all value(s) that match `predicate`.
 *
 * @example First person over thirty
 * ```js
 * const overThirty = find(people, person => person.age > 30);
 * ```
 * @param map Map to search
 * @param predicate Function that returns true for a matching value
 * @returns Found value or _undefined_
 */
declare const find: <V>(map: ReadonlyMap<string, V>, predicate: (v: V) => boolean) => V | undefined;
/**
 * Returns _true_ if `predicate` yields _true_ for any value in `map`.
 * Use {@link find} if you want the matched value.
 * ```js
 * const map = new Map();
 * map.set(`fruit`, `apple`);
 * map.set(`colour`, `red`);
 * Maps.some(map, v => v === `red`);    // true
 * Maps.some(map, v => v === `orange`); // false
 * ```
 * @param map
 * @param predicate
 * @returns
 */
declare const some: <V>(map: ReadonlyMap<string, V>, predicate: (v: V) => boolean) => boolean;
/**
 * Converts a map to a simple object, transforming from type `T` to `K` as it does so. If no transforms are needed, use {@link toObject}.
 *
 * ```js
 * const map = new Map();
 * map.set(`name`, `Alice`);
 * map.set(`pet`, `dog`);
 *
 * const o = mapToObjectTransform(map, v => {
 *  ...v,
 *  registered: true
 * });
 *
 * // Yields: { name: `Alice`, pet: `dog`, registered: true }
 * ```
 *
 * If the goal is to create a new map with transformed values, use {@link transformMap}.
 * @param m
 * @param valueTransform
 * @typeParam T Value type of input map
 * @typeParam K Value type of destination map
 * @returns
 */
declare const mapToObjectTransform: <T, K>(m: ReadonlyMap<string, T>, valueTransform: (value: T) => K) => Readonly<Record<string, K>>;
/**
 * Zips together an array of keys and values into an object. Requires that
 * `keys` and `values` are the same length.
 *
 * @example
 * ```js
 * const o = zipKeyValue([`a`, `b`, `c`], [0, 1, 2])
 * Yields: { a: 0, b: 1, c: 2}
 *```
 * @param keys String keys
 * @param values Values
 * @typeParam V Type of values
 * @return Object with keys and values
 */
declare const zipKeyValue: <V>(keys: ReadonlyArray<string>, values: ArrayLike<V | undefined>) => {
    [k: string]: V | undefined;
};
/**
 * Like `Array.map`, but for a Map. Transforms from Map<K,V> to Map<K,R>, returning as a new Map.
 *
 * @example
 * ```js
 * const mapOfStrings = new Map();
 * mapOfStrings.set(`a`, `10`);
 * mapOfStrings.get(`a`); // Yields `10` (a string)
 *
 * // Convert a map of string->string to string->number
 * const mapOfInts = transformMap(mapOfStrings, (value, key) => parseInt(value));
 *
 * mapOfInts.get(`a`); // Yields 10 (a proper number)
 * ```
 *
 * If you want to combine values into a single object, consider instead  {@link mapToObjectTransform}.
 * @param source
 * @param transformer
 * @typeParam K Type of keys (generally a string)
 * @typeParam V Type of input map values
 * @typeParam R Type of output map values
 * @returns
 */
declare const transformMap: <K, V, R>(source: ReadonlyMap<K, V>, transformer: (value: V, key: K) => R) => Map<K, R>;
/**
 * Converts a `Map` to a plain object, useful for serializing to JSON.
 * To convert back to a map use {@link fromObject}.
 *
 * @example
 * ```js
 * const map = new Map();
 * map.set(`Sally`, { name: `Sally`, colour: `red` });
 * map.set(`Bob`, { name: `Bob`, colour: `pink });
 *
 * const objects = Maps.toObject(map);
 * // Yields: {
 * //  Sally: { name: `Sally`, colour: `red` },
 * //  Bob: { name: `Bob`, colour: `pink` }
 * // }
 * ```
 * @param m
 * @returns
 */
declare const toObject: <T>(m: ReadonlyMap<string, T>) => Readonly<Record<string, T>>;
/**
 * Converts Map to Array with a provided `transformer` function. Useful for plucking out certain properties
 * from contained values and for creating a new map based on transformed values from an input map.
 *
 * @example Get an array of ages from a map of Person objects
 * ```js
 * let person = { age: 29, name: `John`};
 * map.add(person.name, person);
 *
 * const ages = mapToArray(map, (key, person) => person.age);
 * // [29, ...]
 * ```
 *
 * In the above example, the `transformer` function returns a number, but it could
 * just as well return a transformed version of the input:
 *
 * ```js
 * // Return with random heights and uppercased name
 * mapToArray(map, (key, person) => ({
 *  ...person,
 *  height: Math.random(),
 *  name: person.name.toUpperCase();
 * }))
 * // Yields:
 * // [{height: 0.12, age: 29, name: "JOHN"}, ...]
 * ```
 * @param m
 * @param transformer A function that takes a key and item, returning a new item.
 * @returns
 */
declare const mapToArray: <K, V, R>(m: ReadonlyMap<K, V>, transformer: (key: K, item: V) => R) => ReadonlyArray<R>;
/**
 * Returns a result of a merged into b.
 * B is always the 'newer' data that takes
 * precedence.
 */
type MergeReconcile<V> = (a: V, b: V) => V;
/**
 * Merges maps left to right, using the provided
 * `reconcile` function to choose a winner when keys overlap.
 *
 * There's also {@link Data.Arrays.mergeByKey Arrays.mergeByKey} if you don't already have a map.
 *
 * For example, if we have the map A:
 * 1 => `A-1`, 2 => `A-2`, 3 => `A-3`
 *
 * And map B:
 * 2 => `B-1`, 2 => `B-2`, 4 => `B-4`
 *
 * If they are merged with the reconile function:
 * ```js
 * const reconcile = (a, b) => b.replace(`-`, `!`);
 * const output = mergeByKey(reconcile, mapA, mapB);
 * ```
 *
 * The final result will be:
 *
 * 1 => `B!1`, 2 => `B!2`, 3 => `A-3`, 4 => `B-4`
 *
 * In this toy example, it's obvious how the reconciler transforms
 * data where the keys overlap. For the keys that do not overlap -
 * 3 and 4 in this example - they are copied unaltered.
 *
 * A practical use for `mergeByKey` has been in smoothing keypoints
 * from a TensorFlow pose. In this case, we want to smooth new keypoints
 * with older keypoints. But if a keypoint is not present, for it to be
 * passed through.
 *
 * @param reconcile
 * @param maps
 */
declare const mergeByKey: <K, V>(reconcile: MergeReconcile<V>, ...maps: ReadonlyArray<ReadonlyMap<K, V>>) => ReadonlyMap<K, V>;

declare const index$1_GetOrGenerate: typeof GetOrGenerate;
declare const index$1_IDictionary: typeof IDictionary;
declare const index$1_IWithEntries: typeof IWithEntries;
type index$1_MergeReconcile<V> = MergeReconcile<V>;
declare const index$1_addKeepingExisting: typeof addKeepingExisting;
declare const index$1_addObject: typeof addObject;
declare const index$1_deleteByValue: typeof deleteByValue;
declare const index$1_filter: typeof filter;
declare const index$1_find: typeof find;
declare const index$1_firstEntryByPredicate: typeof firstEntryByPredicate;
declare const index$1_firstEntryByValue: typeof firstEntryByValue;
declare const index$1_fromIterable: typeof fromIterable;
declare const index$1_fromObject: typeof fromObject;
declare const index$1_getClosestIntegerKey: typeof getClosestIntegerKey;
declare const index$1_getFromKeys: typeof getFromKeys;
declare const index$1_getOrGenerate: typeof getOrGenerate;
declare const index$1_getOrGenerateSync: typeof getOrGenerateSync;
declare const index$1_hasAnyValue: typeof hasAnyValue;
declare const index$1_hasKeyValue: typeof hasKeyValue;
declare const index$1_mapToArray: typeof mapToArray;
declare const index$1_mapToObjectTransform: typeof mapToObjectTransform;
declare const index$1_mergeByKey: typeof mergeByKey;
declare const index$1_some: typeof some;
declare const index$1_sortByValue: typeof sortByValue;
declare const index$1_sortByValueProperty: typeof sortByValueProperty;
declare const index$1_toArray: typeof toArray;
declare const index$1_toObject: typeof toObject;
declare const index$1_transformMap: typeof transformMap;
declare const index$1_zipKeyValue: typeof zipKeyValue;
declare namespace index$1 {
  export { index$1_GetOrGenerate as GetOrGenerate, index$1_IDictionary as IDictionary, index$1_IWithEntries as IWithEntries, type index$1_MergeReconcile as MergeReconcile, index$1_addKeepingExisting as addKeepingExisting, index$1_addObject as addObject, index$1_deleteByValue as deleteByValue, index$1_filter as filter, index$1_find as find, index$1_firstEntryByPredicate as firstEntryByPredicate, index$1_firstEntryByValue as firstEntryByValue, index$1_fromIterable as fromIterable, index$1_fromObject as fromObject, index$1_getClosestIntegerKey as getClosestIntegerKey, index$1_getFromKeys as getFromKeys, index$1_getOrGenerate as getOrGenerate, index$1_getOrGenerateSync as getOrGenerateSync, index$1_hasAnyValue as hasAnyValue, index$1_hasKeyValue as hasKeyValue, index$1_mapToArray as mapToArray, index$1_mapToObjectTransform as mapToObjectTransform, index$1_mergeByKey as mergeByKey, index$1_some as some, index$1_sortByValue as sortByValue, index$1_sortByValueProperty as sortByValueProperty, index$1_toArray as toArray, index$1_toObject as toObject, index$1_transformMap as transformMap, index$1_zipKeyValue as zipKeyValue };
}

declare const piPi: number;

declare const index_ChangeKind: typeof ChangeKind;
declare const index_ChangeRecord: typeof ChangeRecord;
declare const index_CompareChangeSet: typeof CompareChangeSet;
declare const index_Correlate: typeof Correlate;
declare const index_IsEqualContext: typeof IsEqualContext;
type index_MapObjectArgs = MapObjectArgs;
declare const index_NumberFunction: typeof NumberFunction;
declare const index_Pathed: typeof Pathed;
declare const index_Process: typeof Process;
declare const index_RankArrayOptions: typeof RankArrayOptions;
declare const index_RankFunction: typeof RankFunction;
declare const index_RankOptions: typeof RankOptions;
declare const index_ResolveFallbackOpts: typeof ResolveFallbackOpts;
declare const index_ResolveToValue: typeof ResolveToValue;
declare const index_ResolveToValueAsync: typeof ResolveToValueAsync;
declare const index_ResolveToValueSync: typeof ResolveToValueSync;
type index_ResolvedObject<T extends Record<string, ResolveToValue<any>>> = ResolvedObject<T>;
declare const index_ValueType: typeof ValueType;
declare const index_changedDataFields: typeof changedDataFields;
declare const index_compareArrays: typeof compareArrays;
declare const index_compareData: typeof compareData;
declare const index_compareKeys: typeof compareKeys;
declare const index_isEmptyEntries: typeof isEmptyEntries;
declare const index_isEqualContextString: typeof isEqualContextString;
declare const index_keysToNumbers: typeof keysToNumbers;
declare const index_mapObjectByObject: typeof mapObjectByObject;
declare const index_mapObjectShallow: typeof mapObjectShallow;
declare const index_piPi: typeof piPi;
declare const index_resolve: typeof resolve;
declare const index_resolveFields: typeof resolveFields;
declare const index_resolveSync: typeof resolveSync;
declare const index_resolveWithFallback: typeof resolveWithFallback;
declare const index_resolveWithFallbackSync: typeof resolveWithFallbackSync;
declare namespace index {
  export { index$2 as Arrays, index_ChangeKind as ChangeKind, index_ChangeRecord as ChangeRecord, index_CompareChangeSet as CompareChangeSet, index_Correlate as Correlate, index_IsEqualContext as IsEqualContext, type index_MapObjectArgs as MapObjectArgs, index$1 as Maps, index_NumberFunction as NumberFunction, index_Pathed as Pathed, Pool$1 as Pool, index_Process as Process, index_RankArrayOptions as RankArrayOptions, index_RankFunction as RankFunction, index_RankOptions as RankOptions, index_ResolveFallbackOpts as ResolveFallbackOpts, index_ResolveToValue as ResolveToValue, index_ResolveToValueAsync as ResolveToValueAsync, index_ResolveToValueSync as ResolveToValueSync, type index_ResolvedObject as ResolvedObject, index_ValueType as ValueType, index_changedDataFields as changedDataFields, index_compareArrays as compareArrays, index_compareData as compareData, index_compareKeys as compareKeys, index_isEmptyEntries as isEmptyEntries, index_isEqualContextString as isEqualContextString, index_keysToNumbers as keysToNumbers, index_mapObjectByObject as mapObjectByObject, index_mapObjectShallow as mapObjectShallow, index_piPi as piPi, index_resolve as resolve, index_resolveFields as resolveFields, index_resolveSync as resolveSync, index_resolveWithFallback as resolveWithFallback, index_resolveWithFallbackSync as resolveWithFallbackSync };
}

export { Correlate as C, type MapObjectArgs as M, Pool$1 as P, type ResolvedObject as R, index$1 as a, mapObjectByObject as b, index as i, keysToNumbers as k, mapObjectShallow as m, piPi as p, resolveFields as r };
