import { P as Primitive } from './PrimitiveTypes-F6miV4Zn.js';
import { I as Interval } from './IntervalType-B4PbUkjV.js';
import { R as Result } from './Results-adq5iCSD.js';
import { I as IsEqual } from './IsEqual-CTTf-Oj9.js';
import { a as RankFunction, b as RankOptions } from './Types-AjpgZy7P.js';

type ChangeKind = `mutate` | `add` | `del`;
type ChangeRecord<TKey extends string | number | symbol> = [kind: ChangeKind, path: TKey, value: any];
/**
 * Result of {@link compareData}
 */
type CompareChangeSet<TKey extends string | number> = {
    /**
     * _True_ if there are any changes
     */
    hasChanged: boolean;
    /**
     * Results for child objects
     */
    children: Record<TKey, CompareChangeSet<any>>;
    /**
     * Values that have changed
     */
    changed: Record<TKey, any>;
    /**
     * Fields that have been added
     */
    added: Record<TKey, any>;
    /**
     * Fields that have been removed
     */
    removed: Array<TKey>;
    isArray: boolean;
    /**
     * Summary of changes
     */
    summary: Array<ChangeRecord<TKey>>;
};
/**
 * Compares the keys of two objects, returning a set of those in
 * common, and those in either A or B exclusively.
 * ```js
 * const a = { colour: `red`, intensity: 5 };
 * const b = { colour: `pink`, size: 10 };
 * const c = compareKeys(a, b);
 * // c.shared = [ `colour` ]
 * // c.a = [ `intensity` ]
 * // c.b = [ `size`  ]
 * ```
 * @param a
 * @param b
 * @returns
 */
declare const compareKeys: (a: object, b: object) => {
    shared: string[];
    isSame: boolean;
    a: string[];
    b: string[];
};
/**
 * Returns the changed fields from A -> B. It's assumed that A and B have the same shape.
 * ie. returns an object that only consists of fields which have changed in B compared to A.
 *
 * ```js
 * const a = { msg: `hi`, v: 10 };
 *
 * changedDataFields(a, { msg: `hi`,   v: 10 }); // {}
 * changedDataFields(a, { msg: `hi!!`, v: 10 }); // { msg: `hi!!` }
 * changedDataFields(a, { msg: `hi!!` });       // { msg: `hi!!`, v: undefined }
 * ```
 *
 * Under the hood, we use {@link compareData}(a, b, true). If B has additional or removed fields,
 * this is considered an error.
 *
 * If a field is an array, the whole array is returned, rather than a diff.
 * @param a
 * @param b
 */
declare const changedDataFields: (a: object, b: object) => any[] | Record<string, any>;
declare const compareArrays: <TValue>(a: Array<TValue>, b: Array<TValue>, eq?: IsEqual<TValue>) => CompareChangeSet<number>;
/**
 * Compares A to B. Assumes they are simple objects, essentially key-value pairs, where the
 * values are primitive values or other simple objects. It also works with arrays.
 *
 * Uses === equality semantics by default.
 * @param a
 * @param b
 */
declare const compareData$1: (a: object, b: object, assumeSameShape?: boolean, eq?: IsEqual<any>) => CompareChangeSet<string>;

/**
 * Remaps `TShape` so each field has type `TFieldValue`.
 * Recursive.
 */
type RecursiveReplace<TShape, TFieldValue> = {
    [P in keyof TShape]: TShape[P] extends (infer U)[] ? RecursiveReplace<U, TFieldValue>[] : TShape[P] extends number | string | symbol | undefined ? TFieldValue : RecursiveReplace<TShape[P], TFieldValue>;
};
type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends (infer U)[] ? RecursivePartial<U>[] : T[P] extends object | undefined ? RecursivePartial<T[P]> : T[P];
};
type ReadonlyRemapObjectPropertyType<OriginalType, PropertyType> = {
    readonly [Property in keyof OriginalType]: PropertyType;
};
type RemapObjectPropertyType<OriginalType, PropertyType> = {
    [Property in keyof OriginalType]: PropertyType;
};
type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> & {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>>;
}[Keys];

/**
 * Returns _true_ if Object.entries() is empty for `value`
 * @param value
 * @returns
 */
declare const isEmptyEntries: (value: object) => boolean;
/**
 * Return _true_ if `a` and `b` ought to be considered equal
 * at a given path
 */
type IsEqualContext<V> = (a: V, b: V | undefined, path: string) => boolean;
/**
 * Returns _true_ if `a` and `b are equal based on their JSON representations.
 * `path` is ignored.
 * @param a
 * @param b
 * @param path
 * @returns
 */
declare const isEqualContextString: IsEqualContext<any>;

type PathData<V> = {
    path: string;
    value: V;
};
type PathDataChange<V> = PathData<V> & {
    previous?: V;
    state: `change` | `added` | `removed`;
};
type CompareDataOptions<V> = {
    /**
     * If _true_, it treats the B value as a partial
     * version of B. Only the things present in B are compared.
     * Omissions from B are not treated as removed keys.
     */
    asPartial: boolean;
    /**
     * If _true_ (default), if a value is undefined,
     * it signals that the key itself is removed.
     */
    undefinedValueMeansRemoved: boolean;
    pathPrefix: string;
    /**
     * Comparison function for values. By default uses
     * JSON.stringify() to compare by value.
     */
    eq: IsEqualContext<V>;
    /**
     * If true, inherited fields are also compared.
     * This is necessary for events, for example.
     *
     * Only plain-object values are used, the other keys are ignored.
     */
    deepEntries: boolean;
    /**
     * If _true_, includes fields that are present in B, but missing in A.
     * _False_ by default.
     */
    includeMissingFromA: boolean;
    /**
     * If _true_, emits a change under the path of a parent if its child has changed.
     * If _false_ (default) only changed keys are emitted.
     *
     * Eg if data is:
     * `{ colour: { h:0.5, s: 0.3, l: 0.5 }}`
     * and we compare with:
     * `{ colour: { h:1, s: 0.3, l: 0.5 }}`
     *
     * By default only 'colour.h' is emitted. If _true_ is set, 'colour' and 'colour.h' is emitted.
     */
    includeParents: boolean;
};
/**
 * Scans object, producing a list of changed fields where B's value (newer) differs from A (older).
 *
 * Options:
 * - `deepEntries` (_false_): If _false_ Object.entries are used to scan the object. However this won't work for some objects, eg event args, thus _true_ is needed.
 * - `eq` (JSON.stringify): By-value comparison function
 * - `includeMissingFromA` (_false): If _true_ includes fields present on B but missing on A.
 * - `asPartial` (_false): If _true_, treats B as a partial update to B. This means that things missing from B are not considered removals.
 * @param a 'Old' value
 * @param b 'New' value
 * @param options Options for comparison
 * @returns
 */
declare function compareData<V extends Record<string, any>>(a: V, b: Partial<V>, options?: Partial<CompareDataOptions<V>>): Generator<PathDataChange<any>>;
/**
 * Returns a copy of `source` with `changes` applied.
 * @param source
 * @param changes
 */
declare const applyChanges: <V extends Record<string, any>>(source: V, changes: Array<PathDataChange<any>>) => V;
/**
 * Returns a copy of `target` object with a specified path changed to `value`.
 *
 * ```js
 * const a = {
 *  message: `Hello`,
 *  position: { x: 10, y: 20 }
 * }
 *
 * const a1 = updateByPath(a, `message`, `new message`);
 * // a1 = { message: `new message`, position: { x: 10, y: 20 }}
 * const a2 = updateByPath(a, `position.x`, 20);
 * // a2 = { message: `hello`, position: { x: 20, y: 20 }}
 * ```
 *
 * Paths can also be array indexes:
 * ```js
 * updateByPath([`a`,`b`,`c`], 2, `d`);
 * // Yields: [ `a`, `b`, `d` ]
 * ```
 *
 * By default, only existing array indexes can be updated. Use the `allowShapeChange` parameter
 * to allow setting arbitrary indexes.
 * ```js
 * // Throws because array index 3 is undefined
 * updateByPath([ `a`, `b`, `c` ], `3`, `d`);
 *
 * // With allowShapeChange flag
 * updateByPath([ `a`, `b`, `c` ], `3`, `d`, true);
 * // Returns: [ `a`, `b`, `c`, `d` ]
 * ```
 *
 * Throws an error if:
 * * `path` cannot be resolved (eg. `position.z` in the above example)
 * * `value` applied to `target` results in the object having a different shape (eg missing a field, field
 * changing type, or array index out of bounds). Use `allowShapeChange` to suppress this error.
 * * Path is undefined or not a string
 * * Target is undefined/null
 * @param target Object to update
 * @param path Path to set value
 * @param value Value to set
 * @param allowShapeChange By default _false_, throwing an error if an update change the shape of the original object.
 * @returns
 */
declare const updateByPath: <V extends Record<string, any>>(target: V, path: string, value: any, allowShapeChange?: boolean) => V;
/**
 * Gets the data at `path` in `object`. Assumes '.' separates each segment of path.
 * ```js
 * getField({ name: { first: `Thom`, last: `Yorke` }}, `name.first`); // 'Thom'
 * getField({ colours: [`red`, `green`, `blue` ]}, `colours.1`); // `green`
 * ```
 *
 * Returns _undefined_ if path could not be resolved.
 *
 * Throws if:
 * * `path` is not a string or empty
 * * `object` is _undefined_ or null
 * @param object
 * @param path
 * @returns
 */
declare const getField: <V>(object: Record<string, any>, path: string) => Result<V>;
/**
 * Iterates 'paths' for all the fields on `o`
 * ```
 * const d = {
 *  accel: { x: 1, y: 2, z: 3 },
 *  gyro: { x: 4, y: 5, z: 6 }
 * };
 * const paths = [...getFieldPaths(d)];
 * // Yields [ `accel`, `gyro`, `accel.x`, `accel.y`,`accel.z`,`gyro.x`,`gyro.y`,`gyro.z` ]
 * ```
 *
 * Use {@link getField} to fetch data based on a path
 *
 * If object is _null_ or _undefined_, no results are returned.
 *
 * If `onlyLeaves` is _true_ (default: _false_), only 'leaf' nodes are included.
 * Leaf nodes are those that contain a primitive value.
 * ```js
 * const paths = getFieldPaths(d, true);
 * // Yields [ `accel.x`, `accel.y`,`accel.z`,`gyro.x`,`gyro.y`,`gyro.z` ]
 * ```
 *
 * @param object Object to get paths for.
 * @param onlyLeaves If true, only paths with a primitive value are returned.
 * @returns
 */
declare function getPaths(object: object | null, onlyLeaves?: boolean): Generator<string>;
/**
 * Returns a representation of the object as a set of paths and data.
 * ```js
 * const o = { name: `hello`, size: 20, colour: { r:200, g:100, b:40 } }
 * const pd = [...getPathsAndData(o)];
 * // Yields:
 * // [
 * // { path: `name`, value: `hello` },
 * // { path: `size`, value: `20` },
 * // { path: `colour.r`, value: `200` },
 * // { path: `colour.g`, value: `100` },
 * // { path: `colour.b`, value: `40` }
 * //]
 * ```
 * @param o Object to get paths and data for
 * @param maxDepth Set maximum recursion depth. By default unlimited.
 * @param prefix Manually set a path prefix if it's necessary
 * @returns
 */
declare function getPathsAndData(o: object, onlyLeaves?: boolean, maxDepth?: number, prefix?: string): Generator<PathData<any>>;

type Pathed_CompareDataOptions<V> = CompareDataOptions<V>;
type Pathed_PathData<V> = PathData<V>;
type Pathed_PathDataChange<V> = PathDataChange<V>;
declare const Pathed_applyChanges: typeof applyChanges;
declare const Pathed_compareData: typeof compareData;
declare const Pathed_getField: typeof getField;
declare const Pathed_getPaths: typeof getPaths;
declare const Pathed_getPathsAndData: typeof getPathsAndData;
declare const Pathed_updateByPath: typeof updateByPath;
declare namespace Pathed {
  export { type Pathed_CompareDataOptions as CompareDataOptions, type Pathed_PathData as PathData, type Pathed_PathDataChange as PathDataChange, Pathed_applyChanges as applyChanges, Pathed_compareData as compareData, Pathed_getField as getField, Pathed_getPaths as getPaths, Pathed_getPathsAndData as getPathsAndData, Pathed_updateByPath as updateByPath };
}

/**
 * Outputs the current largest-seen value
 * @returns
 */
declare const max$1: () => Process<number | Array<number>, number>;
/**
 * Outputs the current smallest-seen value
 * @returns
 */
declare const min$1: () => Process<number | Array<number>, number>;
/**
 * Returns a sum of values
 * @returns
 */
declare const sum$1: () => Process<number | Array<number>, number>;
/**
 * Returns the current average of input values
 * @returns
 */
declare const average$1: () => Process<number | Array<number>, number>;
/**
 * Returns the tally (ie number of) values
 * @param countArrayItems
 * @returns
 */
declare const tally$1: (countArrayItems: boolean) => Process<any, number>;
/**
 * Returns the 'best' value seen so far as determined by a ranking function.
 * This is similar to min/max but usable for objects.
 * @param r
 * @param options
 * @returns
 */
declare function rank$1<In>(r: RankFunction<In>, options?: Partial<RankOptions>): (value: In) => In | undefined;

type Process<TIn, TOut> = (value: TIn) => TOut;
type ProcessFactory<TIn, TOut> = () => Process<TIn, TOut>;
type Processors1<T1, T2> = [
    Process<T1, T2>
];
type Processors2<T1, T2, T3> = [
    Process<T1, T2>,
    Process<T2, T3>
];
type Processors3<T1, T2, T3, T4> = [
    Process<T1, T2>,
    Process<T2, T3>,
    Process<T3, T4>
];
type Processors4<T1, T2, T3, T4, T5> = [
    Process<T1, T2>,
    Process<T2, T3>,
    Process<T3, T4>,
    Process<T4, T5>
];
type Processors5<T1, T2, T3, T4, T5, T6> = [
    Process<T1, T2>,
    Process<T2, T3>,
    Process<T3, T4>,
    Process<T4, T5>,
    Process<T5, T6>
];
type Processors<T1, T2, T3, T4, T5, T6> = Processors1<T1, T2> | Processors2<T1, T2, T3> | Processors3<T1, T2, T3, T4> | Processors4<T1, T2, T3, T4, T5> | Processors5<T1, T2, T3, T4, T5, T6>;
declare function chain<T1, T2>(...processors: [Process<T1, T2>]): (value: T1) => T2;
declare function chain<T1, T2, T3>(...processors: [Process<T1, T2>, Process<T2, T3>]): (value: T1) => T3;
declare function chain<T1, T2, T3, T4>(...processors: [Process<T1, T2>, Process<T2, T3>, Process<T3, T4>]): (value: T1) => T4;
declare function chain<T1, T2, T3, T4, T5>(...processors: [Process<T1, T2>, Process<T2, T3>, Process<T3, T4>, Process<T4, T5>]): (value: T1) => T5;
declare function chain<T1, T2, T3, T4, T5, T6>(...processors: [Process<T1, T2>, Process<T2, T3>, Process<T3, T4>, Process<T4, T5>, Process<T5, T6>]): (value: T1) => T6;
/**
 * If a value is same as the previous value, _undefined_ is emitted instead.
 * @param eq Equality function. If not specified, === semantics are used.
 * @returns
 */
declare function seenLastToUndefined<TIn>(eq?: (a: TIn, b: TIn) => boolean): Process<TIn, TIn | undefined>;
/**
 * If a value is same as any previously-seen value, _undefined_ is emitted instead.
 * It stores all previous values and compares against them for each new value.
 * This would likely be not very efficient compared to {@link seenToUndefinedByKey} which uses a one-time computed
 * key and efficient storage of only the keys (using a Set).
 *
 * @param eq Equality function. If not specified, === semantics are used.
 * @returns
 */
declare function seenToUndefined<TIn>(eq?: (a: TIn, b: TIn) => boolean): Process<TIn, TIn | undefined>;
/**
 * If a value is the same as any previously-seen value, _undefined_ is emitted instead.
 * This version uses a function to create a string key of the object, by default JSON.stringify.
 * Thus we don't need to store all previously seen objects, just their keys.
 *
 * Alternatively, if a key function doesn't make sense for the value, use
 * {@link seenToUndefined}, which stores the values (less efficient).
 *
 * @param toString
 * @returns
 */
declare function seenToUndefinedByKey<TIn>(toString?: (value: TIn) => string): Process<TIn, TIn | undefined>;
/**
 * Calls a function if the input value is not undefined.
 * Return value from function is passed to next function in chain.
 *
 * ```js
 * const chain = Process.chain(
 *  Process.max(),
 *  Process.seenLastToUndefined(),
 *  Process.ifNotUndefined(v => {
 *    console.log(`v:`, v);
 *  })
 * );
 * chain(100); // Prints 'v:100'
 * chain(90);  // Nothing happens max value has not changed
 * chain(110); // Prints 'v:110'
 * ```
 * @param fn
 * @returns
 */
declare function ifNotUndefined<TIn, TOut>(fn: (value: Exclude<TIn, undefined>) => TOut): (value: TIn) => TIn | TOut;
declare class CancelError extends Error {
    constructor(message: any);
}
/**
 * Cancels the remaining chain operations if _undefined_ is an input.
 * See also {@link ifUndefined} or {@link ifNotUndefined}.
 *
 * ```js
 * const c3 = Process.chain(
 *  Basic.max(),
 *  Process.seenLastToUndefined(),
 *  Process.cancelIfUndefined(),
 *  (v => {
 *   console.log(v);
 *  })
 * );
 * c3(100); // Prints '100'
 * c3(90);  // Doesn't print anything since max does not change
 * c3(110); // Prints '110'
 * ```
 * @returns
 */
declare function cancelIfUndefined<TIn>(): (value: TIn | undefined) => TIn;
/**
 * Returns the output of `fn` if the input value is _undefined_.
 * See also: {@link ifNotUndefined} and {@link cancelIfUndefined}.
 * @param fn
 * @returns
 */
declare function ifUndefined<TIn, TOut>(fn: () => TOut): (value: TIn) => TOut | (TIn & ({} | null));

type Process$1_CancelError = CancelError;
declare const Process$1_CancelError: typeof CancelError;
type Process$1_Process<TIn, TOut> = Process<TIn, TOut>;
type Process$1_ProcessFactory<TIn, TOut> = ProcessFactory<TIn, TOut>;
type Process$1_Processors<T1, T2, T3, T4, T5, T6> = Processors<T1, T2, T3, T4, T5, T6>;
type Process$1_Processors1<T1, T2> = Processors1<T1, T2>;
type Process$1_Processors2<T1, T2, T3> = Processors2<T1, T2, T3>;
type Process$1_Processors3<T1, T2, T3, T4> = Processors3<T1, T2, T3, T4>;
type Process$1_Processors4<T1, T2, T3, T4, T5> = Processors4<T1, T2, T3, T4, T5>;
type Process$1_Processors5<T1, T2, T3, T4, T5, T6> = Processors5<T1, T2, T3, T4, T5, T6>;
declare const Process$1_cancelIfUndefined: typeof cancelIfUndefined;
declare const Process$1_chain: typeof chain;
declare const Process$1_ifNotUndefined: typeof ifNotUndefined;
declare const Process$1_ifUndefined: typeof ifUndefined;
declare const Process$1_seenLastToUndefined: typeof seenLastToUndefined;
declare const Process$1_seenToUndefined: typeof seenToUndefined;
declare const Process$1_seenToUndefinedByKey: typeof seenToUndefinedByKey;
declare namespace Process$1 {
  export { Process$1_CancelError as CancelError, type Process$1_Process as Process, type Process$1_ProcessFactory as ProcessFactory, type Process$1_Processors as Processors, type Process$1_Processors1 as Processors1, type Process$1_Processors2 as Processors2, type Process$1_Processors3 as Processors3, type Process$1_Processors4 as Processors4, type Process$1_Processors5 as Processors5, average$1 as average, Process$1_cancelIfUndefined as cancelIfUndefined, Process$1_chain as chain, Process$1_ifNotUndefined as ifNotUndefined, Process$1_ifUndefined as ifUndefined, max$1 as max, min$1 as min, rank$1 as rank, Process$1_seenLastToUndefined as seenLastToUndefined, Process$1_seenToUndefined as seenToUndefined, Process$1_seenToUndefinedByKey as seenToUndefinedByKey, sum$1 as sum, tally$1 as tally };
}

type SyncOptions = {
    /**
     * How to handle when a source completes.
     * * 'allow' means we continue synchronising with remaining alive sources. Use 'finalValue' option to control what data is returned for completed sources
     * * 'break' means we stop the stream, because synchronisation across all sources is no longer possible.
     *
     * Default: 'break'.
     */
    onSourceDone: `allow` | `break`;
    /**
     * Maximum time to wait for synchronisation to happen.
     * If interval is exceeded, stream closes.
     * Default: 2s
     */
    maximumWait: Interval;
    /**
     * If we continue synchronisation when a source is done (via `onSourceDone:'allow'`),
     * what source should be returned for a completed source?
     * * 'undefined': _undefined_
     * * 'last': the last received value, or _undefined_
     *
     * Default: 'undefined'
     */
    finalValue: `undefined` | `last`;
};
/**
 * Switcher options.
 *
 * match (default: 'first')
 * * 'first': Outputs to first case where predicate is _true_
 * * 'all': Outputs to all cases where predicate is _true_
 */
type SwitcherOptions = {
    match: `first` | `all`;
};
/**
 * Transform options
 */
type TransformOpts = InitStreamOptions & {
    traceInput: boolean;
    traceOutput: boolean;
};
type BatchOptions = InitStreamOptions & {
    /**
     * If _true_ (default) remaining results are yielded
     * if source closes. If _false_, only batches that meet
     * `elapsed` or `quantity` are emitted.
     */
    returnRemainder: boolean;
    /**
     * Amount of time to gather results for a batch.
     * 'elapsed' and 'quantity' is ORed. Meaning a batch will the minimum of
     * 'elapsed' and 'quantity'
     */
    elapsed: Interval;
    /**
     * Number of items to gather for a batch.
     * 'elapsed' and 'quantity' is ORed. Meaning a batch will the minimum of
     * 'elapsed' and 'quantity'
     */
    quantity: number;
};
type DebounceOptions = InitStreamOptions & {
    /**
     * Minimum time between events. Default 50ms
     */
    elapsed: Interval;
};
type FilterPredicate<In> = (value: In) => boolean;
type ThrottleOptions = InitStreamOptions & {
    elapsed: Interval;
};
type SplitOptions = {
    quantity: number;
};
type FieldOptions<TSource, TValue> = InitStreamOptions & {
    /**
     * If `field` is missing on a value, it is query from this object instead.
     * If this also is missing, `fallbackFieldValue` is attempted.
     */
    fallbackObject: TSource;
    /**
     * If `field` is missing on a value and `fallbackObject` (if specified),
     * this value is used in its place.
     * If not set, no value is emitted when the field is missing.
     */
    fallbackFieldValue: TValue;
};
type SingleFromArrayOptions<V> = {
    /**
     * Function to select a single value from array
     * @param value
     * @returns
     */
    predicate: (value: V) => boolean;
    /**
     * `default`: leave array in same order (default option)
     * `random`: shuffles array before further processing
     * function: function that sorts values
     */
    order: `default` | `random` | ((a: V, b: V) => number);
    /**
     * Selects an index from array. 0 being first, 1 being second.
     * Reverse indexing also works: -1 being last, -2 being second last...
     *
     * If index exceeds length of array, _undefined_ is returned
     */
    at: number;
};
type OpAsAnnotation = {
    annotate: true;
};
type OpMathOptions = Partial<InitStreamOptions> & {
    annotate?: boolean;
    /**
     * If _true_ (default) operations that return _undefined_ do not emit a value.
     * If _false_, _undefined_ is potentially emitted
     */
    skipUndefined?: boolean;
    /**
     * If _true_ (default) operations only emit a value if it has changed.
     * In the case of `max()`, for example, a stream of '1, 2, 3, 2, 1' would emit '1, 2, 3'.
     * If _false_ was used, same input would emit '1, 2, 3, 3, 3'
     */
    skipIdentical?: boolean;
};

type TriggerValue<TTriggerValue> = {
    value: TTriggerValue;
};
/**
 * Function which returns a result. Or promised result.
 *
 * `abort` value is a callback to exit out of looped execution.
 */
type FunctionFunction<T> = ((abort: (reason: string) => void) => T) | ((abort: (reason: string) => void) => Promise<T>);
type ArrayOptions = {
    /**
     * Interval between each item being read. Default: 5ms.
     */
    interval: Interval;
    lazy: Lazy;
    /**
     * Behaviour when reactive stops, for example due to having no subscribers
     * * continue: iteration continues through array where it left off
     * * reset: iteration begins from start of array
     */
    whenStopped: `continue` | `reset`;
    debugLifecycle: boolean;
    signal: AbortSignal;
};
/**
 * Function which returns a result. Or promised result.
 * Takes a `value` as first parameter, and callback to signal an abort as the second.
 */
type PingedFunctionFunction<T, TSource> = ((value: TSource, abort: (reason: string) => void) => T) | ((value: TSource, abort: (reason: string) => void) => Promise<T>);
/**
 * Trigger that calls a `fn`.
 * If `fn` returns _undefined_, it means the trigger is complete
 */
type TriggerFunction<TTriggerValue> = {
    fn: () => TTriggerValue;
};
type TriggerGenerator<TTriggerValue> = {
    gen: IterableIterator<TTriggerValue>;
};
/**
 * A trigger can be a value, a function or generator. Value triggers never complete.
 *
 * A trigger function is considered complete if it returns undefined.
 * A trigger generator is considered complete if it returns done.
 *
 */
type Trigger<TTriggerValue> = TriggerValue<TTriggerValue> | TriggerFunction<TTriggerValue> | TriggerGenerator<TTriggerValue>;
type TimeoutTriggerOptions<TTriggerValue> = Trigger<TTriggerValue> & {
    /**
     * Whether to repeatedly trigger even if upstream source doesn't emit values.
     * When _false_ (default) it will emit a max of one value after a source value if `interval` is reached.
     * When _true_, it will continue emitting values at `interval`.
     * Default: false
     */
    repeat?: boolean;
    /**
     * Interval before emitting trigger value
     * Default: 1s
     */
    interval: Interval;
    /**
     * If _true_ (default) start the timeout
     * immediately, even before the first value.
     * If _false_, it won't timeout until the first
     * upstream value happens.
     */
    immediate?: boolean;
};
/**
 * Options when creating a reactive object.
 */
type ObjectOptions<V extends Record<string, any>> = {
    /**
     * _false_ by default.
     * If _true_, inherited fields are included. This is necessary for event args, for example.
     */
    deepEntries: boolean;
    /**
     * Uses JSON.stringify() by default.
     * Fn that returns _true_ if two values are equal, given a certain path.
     */
    eq: IsEqualContext<V>;
};
type PingedFunctionOptions = {
    /**
     * If _true_, stream closes if function throws an error.
     * If _false_, errors are emitted as signals, but stream is not closed.
     * Default: _true_
     */
    closeOnError: boolean;
    /**
     * Laziness
     * * start: only begins on first subscriber. Keeps running even when there are no subscribers
     * * very: only begins on first subscriber. Stops looping if there are no subscribers
     * * never: begins calling function when initalised and doesn't stop until Reactive is disposed
     */
    lazy: Lazy;
    /**
   * If specified, a time before invoking function.
   * If `repeat` is used, this is in addition to `interval` time.
   */
    predelay: Interval;
    /***
  * If specified, signal is checked to prevent function execution.
  * Also used for aborting a looped fromFunction.
  */
    signal: AbortSignal;
};
/**
 * Options when creating a reactive object.
 */
type ArrayObjectOptions<V> = {
    /**
     * Uses JSON.stringify() by default.
     * Fn that returns _true_ if two values are equal, given a certain path.
     */
    eq: IsEqual<V>;
};
type FunctionOptions = Partial<InitLazyStreamOptions> & {
    /**
     * If _true_, stream closes if function throws an error.
     * If _false_, errors are emitted as signals, but stream is not closed.
     * Default: _true_
     */
    closeOnError: boolean;
    /**
     * Laziness
     * * start: only begins on first subscriber. Keeps running even when there are no subscribers
     * * very: only begins on first subscriber. Stops looping if there are no subscribers
     * * never: begins calling function when initalised and doesn't stop until Reactive is disposed
     */
    lazy: Lazy;
    /**
     * If specified, sets an upper limit of how many times we loop
     * (if this is also enabled)
     */
    maximumRepeats: number;
    /**
     * If specified, function is called repeatedly with this delay
     */
    interval: Interval;
    /**
     * If specified, a time before invoking function.
     * If `repeat` is used, this is in addition to `interval` time.
     */
    predelay: Interval;
    /***
     * If specified, signal is checked to prevent function execution.
     * Also used for aborting a looped fromFunction.
     */
    signal: AbortSignal;
};
type GeneratorOptions = {
    traceLifecycle: boolean;
    /**
     * Wait between reading from generator
     * Default: 5ms
     */
    readInterval: Interval;
    /**
     * Timeout when waiting for a value
     * Default: `{ mins: 5 }`
     */
    readTimeout: Interval;
    /**
     * If _true_, only accesses the generator if there is a subscriber.
     * Default: true
     */
    lazy: Lazy;
    signal: AbortSignal;
    /**
     * Behaviour when reactive stops, for example due to having no subscribers
     * * continue: iteration continues through array where it left off
     * * reset: iteration begins from start of array
     */
    whenStopped: `continue` | `reset`;
};
type EventOptions = {
    lazy?: Lazy;
    /**
     * If true, log messages are emitted
     * when event handlers are added/removed
     */
    debugLifecycle?: boolean;
    /**
     * If true, log messages are emitted
     * when the source event fires
     */
    debugFiring?: boolean;
};
type EventTriggerOptions = EventOptions & {
    /**
     * If _true_ sends an initial trigger when starting
     * Default: false
     */
    fireInitial: boolean;
};
type EventPluckedFieldOptions<T> = {
    lazy?: Lazy;
    initialValue: T;
};
type EventPluckedFieldOptions2<TDomSource, TValueDestination> = {
    lazy?: Lazy;
    initialValue: TValueDestination;
    domToValue: (value: TDomSource | undefined) => TValueDestination | undefined;
    valueToDom: (value: TValueDestination) => TDomSource;
};
type DomValueOptions = EventOptions & {
    /**
     * If true, the current value will be emitted even though it wasn't
     * triggered by an event.
     * Default: false
     */
    emitInitialValue: boolean;
    attributeName: string;
    fieldName: string;
    /**
     * Respond to when value has changed or when value is changing
     * Default: `changed`
     */
    when: `changed` | `changing`;
    fallbackValue: string;
    upstreamSource?: Reactive<any>;
    upstreamFilter?: (value: any) => string;
};
type DomNumberInputValueOptions = DomValueOptions & {
    /**
     * If true, sets up INPUT element to operate with relative values
     */
    relative?: boolean;
    /**
     * If true, when setting up, sets max to be on left side
     */
    inverted?: boolean;
    upstreamSource?: Reactive<number>;
};
type DerivedFunction<TOutput> = (...args: any[]) => TOutput;
type DerivedOptions<TResult, T> = {
    ignoreIdentical: boolean;
    eq: (a: TResult, b: TResult) => boolean;
} & CombineLatestOptions & UpstreamOptions<T>;

type SetHtmlOptionsQuery = {
    query: string;
};
type SetHtmlOptionsElement = {
    el: HTMLElement;
};
type SetHtmlOptions = (SetHtmlOptionsQuery | SetHtmlOptionsElement) & {
    /**
     * If _true_ .innerHTML is used
     * If _false_ (default) .textContent is used
     */
    asHtml?: boolean;
};
/**
 * Values from `input` are set to the textContent/innerHTML of an element.
 * ```js
 * const rxSource = Rx.From.string('hello');
 * const rxSet = Rx.Sinks.setHtmlText(rxSource, { query: })
 * ```
 * @param rxOrSource
 * @param optionsOrElementOrQuery
 */
declare const setHtmlText: (rxOrSource: ReactiveOrSource<any>, optionsOrElementOrQuery: SetHtmlOptions | string | HTMLElement) => Unsubscriber;

declare function max(input: ReactiveOrSource<any>, options: OpMathOptions): Reactive<number>;
declare function max(input: ReactiveOrSource<any>, options: OpAsAnnotation & OpMathOptions): Reactive<{
    value: number;
    max: number;
}>;
declare function min(input: ReactiveOrSource<any>, options: OpMathOptions): Reactive<number>;
declare function min(input: ReactiveOrSource<any>, options: OpAsAnnotation & OpMathOptions): Reactive<{
    value: number;
    min: number;
}>;
declare function average(input: ReactiveOrSource<any>, options: OpMathOptions): Reactive<number>;
declare function average(input: ReactiveOrSource<any>, options: OpAsAnnotation & OpMathOptions): Reactive<{
    value: number;
    average: number;
}>;
declare function sum(input: ReactiveOrSource<any>, options: OpMathOptions): Reactive<number>;
declare function sum(input: ReactiveOrSource<any>, options: OpAsAnnotation & OpMathOptions): Reactive<{
    value: number;
    sum: number;
}>;
type TallyOptions = OpMathOptions & {
    countArrayItems: boolean;
};
declare function tally(input: ReactiveOrSource<any>, options: Partial<TallyOptions>): Reactive<number>;
declare function tally<TIn>(input: ReactiveOrSource<TIn>, options: OpAsAnnotation & Partial<TallyOptions>): Reactive<{
    value: TIn;
    tally: number;
}>;
declare function rank<TIn>(input: ReactiveOrSource<any>, rank: RankFunction<TIn>, options: Partial<RankOptions & OpMathOptions>): Reactive<TIn>;
declare function rank<TIn>(input: ReactiveOrSource<any>, rank: RankFunction<TIn>, options: OpAsAnnotation & Partial<RankOptions & OpMathOptions>): Reactive<{
    value: TIn;
    rank: TIn;
}>;

type CombineLatestOptions = {
    /**
     * If _true_, disposes all the merged sources when the merged reactive closes.
     * Default: _true_.
     */
    disposeSources: boolean;
    /**
     * How to handle when a source ends.
     * * 'allow': continue combined stream, last value for done stream will kept
     * * 'break': stop combined stream
     *
     * Default: 'break'
     */
    onSourceDone: `allow` | `break`;
    /**
     * If _true_ (default), emits a value when initialised.
     */
    emitInitial: boolean;
};
type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
declare const symbol: unique symbol;
type SignalKinds = `done` | `warn`;
type Passed<V> = {
    value: V | undefined;
    signal?: SignalKinds;
    context?: string;
};
type PassedSignal = Passed<any> & {
    value: undefined;
    signal: SignalKinds;
    context: string;
};
type PassedValue<V> = Passed<V> & {
    value: V;
};
type UpstreamOptions<In> = {
    lazy: Lazy;
    /**
     * If _true_ (default), we dispose the underlying stream if the upstream closes. This happens after onStop() is called.
     */
    disposeIfSourceDone: boolean;
    onValue: (v: In) => void;
    /**
     * Called just before we subscribe to source
     * @returns
     */
    onStart: () => void;
    /**
     * Called after we unsubscribe from source
     * @returns
     */
    onStop: () => void;
    debugLabel: string;
    onDispose: (reason: string) => void;
};
type UpstreamInitialOptions<In> = UpstreamOptions<In> & {
    initialValue: In;
};
/**
 * Wrapped Reactive for object-oriented access
 */
type Wrapped<TIn> = {
    enacts: {
        setHtmlText: (options: SetHtmlOptions) => () => void;
    };
    source: Reactive<TIn>;
    /**
     * Annotate values with output from the `annotation` function.
     * Returned values will be in the form `{ value:TIn, annotation:TAnnotation }`
     * @param transformer
     * @returns
     */
    annotate: <TAnnotation>(transformer: (value: TIn) => TAnnotation) => Wrapped<{
        value: TIn;
        annotation: TAnnotation;
    }>;
    annotateWithOp: <TOut>(op: ReactiveOp<TIn, TOut>) => Wrapped<{
        value: TIn;
        annotation: TOut;
    }>;
    /**
    * Accumulate a batch of values, emitted as an array
    * @param options
    * @returns
    */
    batch: (options: Partial<BatchOptions>) => Wrapped<Array<TIn>>;
    debounce: (options: Partial<DebounceOptions>) => Wrapped<TIn>;
    /**
     * Pluck and emit a single field from values
     * @param fieldName
     * @param options
     * @returns
     */
    field: <TSource, TFieldType>(fieldName: keyof TIn, options: Partial<FieldOptions<TSource, TFieldType>>) => Wrapped<TFieldType>;
    /**
     * Throws away values that don't match `predicate`
     * @param predicate
     * @param options
     * @returns
     */
    filter: (predicate: FilterPredicate<TIn>, options: Partial<InitStreamOptions>) => Wrapped<TIn>;
    combineLatestToArray: <const T extends ReadonlyArray<ReactiveOrSource<any>>>(sources: T, options: Partial<CombineLatestOptions>) => Wrapped<RxValueTypes<T>>;
    combineLatestToObject: <const T extends Record<string, ReactiveOrSource<any>>>(sources: T, options: {
        name: string;
    } & Partial<CombineLatestOptions>) => Wrapped<RxValueTypeObject<T>>;
    min: (options?: Partial<OpMathOptions>) => Wrapped<number>;
    max: (options?: Partial<OpMathOptions>) => Wrapped<number>;
    average: (options?: Partial<OpMathOptions>) => Wrapped<number>;
    sum: (options?: Partial<OpMathOptions>) => Wrapped<number>;
    tally: (options?: Partial<TallyOptions>) => Wrapped<number>;
    /**
     * Converts one source stream into two, with values being emitted by both
     * @param options
     * @returns
     */
    split: (options?: Partial<SplitOptions>) => Array<Wrapped<TIn>>;
    /**
   * Emits values when this stream and any additional streams produce a value. The resulting stream is
   * thus an array of values, each source at a given index.
   * Waits to output a value until each stream has produced a value. Thus, the pace is determined by
   * the slowest stream.
   * @returns
   */
    syncToArray: <const T extends ReadonlyArray<ReactiveOrSource<any>>>(reactiveSources: T, options?: Partial<SyncOptions>) => Wrapped<[TIn, ...RxValueTypes<T>]>;
    syncToObject: <const T extends Record<string, ReactiveOrSource<any>>>(reactiveSources: T, options?: {
        name?: string;
    } & Partial<SyncOptions>) => Wrapped<RxValueTypeObject<T>>;
    /**
     * Creates new streams for each case, sending values to the stream if they match the filter predicate
     * @param cases
     * @param options
     * @returns
     */
    switcher: <TRec extends Record<string, FilterPredicate<TIn>>, TLabel extends keyof TRec>(cases: TRec, options: Partial<SwitcherOptions>) => Record<TLabel, Wrapped<TIn>>;
    /**
     * Creates new streams for each case
     * @param labels
     * @returns
     */
    splitLabelled: <K extends keyof TIn>(...labels: Array<K>) => Record<K, Wrapped<TIn>>;
    /**
     * Taps the stream, passing values to one or more 'processor' functions.
     * This processing essentially happens in parallel, not affecting the main stream.
     *
     * ```js
     * // Stream of pointermove events with {x:0,y:0} as default
     * const move = Rx.From.event(document.body, `pointermove`, {x:0,y:0});
     * // Wrap it for fluent access
     * const ptr = Rx.wrap(move)
     *  .tapProcess(
     *    // Create a string representation
     *    v => `${v.x},${v.y}`
     *    // Set to DOM
     *    v => {
     *      document.getElementById(`coords`).innerText = v;
     *    }
     *   )
     *  .onValue(value => {
     *    // 'value' will be original PointerEvent, since .tapProcess happened in parallel,
     *    // not affecting stream
     *  });
     * ```
     * @param processors One-five processing functions
     * @returns
     */
    tapProcess: <T2, T3, T4, T5, T6>(...processors: Processors<TIn, T2, T3, T4, T5, T6>) => Wrapped<TIn>;
    tapStream: (divergedStream: ReactiveWritable<TIn>) => Wrapped<TIn>;
    tapOps: <TOut>(source: ReactiveOrSource<TIn>, ...ops: Array<ReactiveOp<TIn, TOut>>) => Wrapped<TIn>;
    /**
     * Transforms all values
     * @param transformer
     * @param options
     * @returns
     */
    transform: <TOut>(transformer: (value: TIn) => TOut, options?: Partial<TransformOpts>) => Wrapped<TOut>;
    /**
     * Only allow values through if a minimum of time has elapsed. Throws away values.
     * Ie. converts a fast stream into a slower one.
     * @param options
     * @returns
     */
    throttle: (options: Partial<ThrottleOptions>) => Wrapped<TIn>;
    timeoutTrigger: <TTriggerValue>(options: TimeoutTriggerOptions<TTriggerValue>) => Wrapped<TIn | TTriggerValue>;
    /**
     * Copies values from source into an array, throwing
     * an error if expected number of items is not reached
     * @param options
     * @returns
     */
    toArrayOrThrow: (options: Partial<ToArrayOptions<TIn>>) => Promise<Array<TIn>>;
    /**
     * Copies values from source into an array.
     * @param options
     * @returns
     */
    toArray: (options: Partial<ToArrayOptions<TIn>>) => Promise<Array<TIn | undefined>>;
    /**
     * Listen for values
     * @param callback
     * @returns
     */
    onValue: (callback: (value: TIn) => void) => void;
};
type ToArrayOptions<V> = {
    /**
     * Maximim time to wait for `limit` to be reached. 10s by default.
     */
    maximumWait: Interval;
    /**
     * Number of items to read
     */
    limit: number;
    /**
     * Behaviour if threshold is not reached.
     * partial: return partial results
     * throw: throw an error
     * fill: fill remaining array slots with `fillValue`
     */
    underThreshold: `partial` | `throw` | `fill`;
    /**
     * Value to fill empty slots with if `underThreshold = 'fill'`.
     */
    fillValue: V;
};
/**
 * Laziness
 * * start: only begins on first subscriber. Keeps running even when there are no subscribers
 * * very: only begins on first subscriber. Stops looping if there are no subscribers
 * * never: begins calling function when initalised and doesn't stop until Reactive is disposed
 */
type Lazy = `initial` | `never` | `very`;
type InitLazyStreamOptions = Partial<InitStreamOptions> & {
    lazy: Lazy;
    debugLabel?: string;
    onStart: () => void;
    onStop: () => void;
};
type InitLazyStreamInitedOptions<T> = InitLazyStreamOptions & {
    initialValue: T;
};
type CountOptions = {
    lazy: Lazy;
    amount: number;
    offset: number;
    interval: Interval;
    signal: AbortSignal;
};
type ReactiveOrSource<V> = Wrapped<V> | Reactive<V> | IterableIterator<V> | AsyncIterableIterator<V> | Generator<V> | AsyncGenerator<V> | Array<V> | (() => V);
type BindUpdateOpts<V> = {
    initial: (v: V, el: HTMLElement) => void;
    binds: Record<string, DomBindValueTarget & {
        transform?: (value: any) => string;
    }>;
};
type Reactive<V> = {
    /**
     * Subscribes to a reactive. Receives
     * data as well as signals. Use `onValue` if you
     * just care about values.
     *
     * Return result unsubscribes.
     *
     * ```js
     * const unsub = someReactive.on(msg => {
     *    // Do something with msg.value
     * });
     *
     * unsub(); // Unsubscribe
     * ```
     * @param handler
     */
    on(handler: (value: Passed<V>) => void): Unsubscriber;
    /**
     * Subscribes to a reactive's values.
     * Returns a function that unsubscribes.
     * @param handler
     */
    onValue(handler: (value: V) => void): Unsubscriber;
    dispose(reason: string): void;
    isDisposed(): boolean;
    set?(value: V): void;
};
type ReactivePingable<V> = Reactive<V> & {
    ping(): void;
};
type Unsubscriber = () => void;
type ReactiveNonInitial<V> = Reactive<V> & {
    last(): V | undefined;
};
type ReactiveWritable<V> = Reactive<V> & {
    set(value: V): void;
};
type ReactiveInitial<V> = Reactive<V> & {
    last(): V;
};
type ReactiveFinite = {
    isDone(): boolean;
};
type ReactiveArray<V> = ReactiveWritable<Array<V>> & {
    push(value: V): void;
    deleteAt(index: number): void;
    deleteWhere(filter: (value: V) => boolean): number;
    setAt(index: number, value: V): void;
    insertAt(index: number, value: V): void;
    onArray(handler: (changes: Passed<Array<ChangeRecord<number>>>) => void): () => void;
};
type ObjectFieldHandler = {
    value: any;
    fieldName: string;
    pattern: string;
};
type ReactiveDiff<V> = Reactive<V> & ReactiveWritable<V> & {
    /**
     * Notifies when the value of `fieldName` is changed.
     *
     * Use the returned function to unsubscribe.
     * @param fieldName
     * @param handler
     */
    onField(fieldName: string, handler: (result: ObjectFieldHandler) => void): () => void;
    /**
     * Notifies of which field(s) were changed.
     * If you just care about the whole, changed data use the `value` event.
     *
     * Use the returned function to unsubscribe.
     * @param changes
     */
    onDiff(changes: (changes: Array<PathDataChange<any>>) => void): () => void;
    /**
     * Updates the reactive with some partial key-value pairs.
     * Keys omitted are left the same as the current value.
     * @param changedPart
     * @returns Returns new value
     */
    update(changedPart: RecursivePartial<V>): V;
    /**
     * Updates a particular field by its path
     * @param field
     * @param value
     */
    updateField(field: string, value: any): void;
};
type ReactiveStream<V> = Reactive<V> & ReactiveWritable<V> & {
    /**
     * Removes all the subscribers from this stream.
     */
    removeAllSubscribers(): void;
    /**
     * Dispatches a signal
     * @param signal
     * @param context
     */
    signal(signal: SignalKinds, context?: string): void;
};
type ReactiveInitialStream<V> = ReactiveStream<V> & ReactiveInitial<V>;
type DomBindValueTarget = {
    /**
     * If _true_ `innerHTML` is set (a shortcut for elField:`innerHTML`)
     */
    htmlContent?: boolean;
    /**
     * If _true_, 'textContent' is set (a shortcut for elField:'textContext')
     */
    textContent?: boolean;
    /**
     * If set, this DOM element field is set. Eg 'textContent'
     */
    elField?: string;
    /**
     * If set, this DOM attribute is set, Eg 'width'
     */
    attribName?: string;
    /**
     * If set, this CSS variable is set, Eg 'hue' (sets '--hue')
     */
    cssVariable?: string;
    /**
     * If set, this CSS property is set, Eg 'background-color'
     */
    cssProperty?: string;
};
type ElementBind = {
    /**
     * Tag name for this binding.
     * Overrides `defaultTag`
     */
    tagName?: string;
    /**
     * If _true_, sub-paths are appended to element, rather than `container`
     */
    nestChildren?: boolean;
    transform?: (value: any) => string;
};
type ElementsOptions = {
    container: HTMLElement | string;
    defaultTag: string;
    binds: Record<string, DomBindValueTarget & ElementBind>;
};
type DomBindTargetNode = {
    query?: string;
    element?: HTMLElement;
};
type DomBindTargetNodeResolved = {
    element: HTMLElement;
};
type DomBindUnresolvedSource<TSource, TDestination> = DomBindTargetNode & DomBindSourceValue<TSource, TDestination> & DomBindValueTarget;
type DomBindResolvedSource<TSource, TDestination> = DomBindTargetNodeResolved & DomBindSourceValue<TSource, TDestination> & DomBindValueTarget;
type DomBindSourceValue<TSource, TDestination> = {
    twoway?: boolean;
    /**
     * Field from source value to pluck and use.
     * This will also be the value passed to the transform
     */
    sourceField?: keyof TSource;
    transform?: (input: TSource) => TDestination;
    transformValue?: (input: any) => TDestination;
};
type DomBindInputOptions<TSource, TDestination> = DomBindSourceValue<TSource, TDestination> & {
    transformFromInput: (input: TDestination) => TSource;
};
type PipeSet<In, Out> = [
    Reactive<In>,
    ...Array<Reactive<any> & ReactiveWritable<any>>
];
type InitStreamOptions = {
    /**
     * Optional label to associate with this stream. Useful for debugging.
     */
    debugLabel: string;
    /**
     * Called when there is a subscriber after there were no subscribers.
     * Useful for 'startup' types of things that we want to run only when someone is actually listening.
     *
     * During the lifeycle of a stream, this could be called multiple times. Eg if all subscribers are removed
     * next time someone subscribes it will get called again.
     * @returns
     */
    onFirstSubscribe: () => void;
    /**
     * Called when there are no longer any subscribers. Useful for shutting down
     * activities now that no-one is listening.
     *
     * During the lifecycle of a stream, this could be called multiple times.
     * @returns
     */
    onNoSubscribers: () => void;
    /**
     * Called whenever the stream disposes. Useful for cleaning up.
     * @param reason
     * @returns
     */
    onDispose: (reason: string) => void;
};
type DomCreateOptions = {
    tagName: string;
    parentEl: string | HTMLElement;
};
type PipeDomBinding = {
    /**
     * Remove binding and optionally delete element(s) (false by default)
     */
    remove(deleteElements: boolean): void;
};
/**
 * WithValue stream options
 */
type WithValueOptions<V> = Partial<InitStreamOptions> & {
    /**
     * Initial value
     */
    initial: V;
    /**
     * Laziness
     */
    lazy?: Lazy;
};
type ResolveOptions = {
    /**
     * How many times to return value or call function.
     * If _infinite_ is set to true, this value is ignored
     */
    loops: number;
    /**
     * If _true_ loops forever
     */
    infinite: boolean;
    /**
     * Delay before value
     */
    interval: Interval;
    lazy: Lazy;
};
type ReactiveOpInit<TIn, TOut, TOpts> = (options: Partial<TOpts>) => ReactiveOp<TIn, TOut>;
type ReactiveOp<TIn, TOut> = (source: ReactiveOrSource<TIn>) => Reactive<TOut>;
type ReactiveOpLinks<In, Out> = [
    ReactiveOrSource<In>,
    ...Array<ReactiveOp<any, any>>,
    ReactiveOp<any, Out>
];
type RxValueTypes<T extends ReadonlyArray<ReactiveOrSource<any>>> = {
    [K in keyof T]: T[K] extends Reactive<infer V> ? V | undefined : T[K] extends Wrapped<infer V> ? V | undefined : T[K] extends Generator<infer V> ? V | undefined : T[K] extends AsyncGenerator<infer V> ? V | undefined : T[K] extends IterableIterator<infer V> ? V | undefined : T[K] extends AsyncIterableIterator<infer V> ? V | undefined : T[K] extends Array<infer V> ? V | undefined : never;
};
type RxValueTypeObject<T extends Record<string, ReactiveOrSource<any>>> = {
    [K in keyof T]: T[K] extends Reactive<infer V> ? V : T[K] extends Wrapped<infer V> ? V : T[K] extends Generator<infer V> ? V : T[K] extends AsyncGenerator<infer V> ? V : T[K] extends IterableIterator<infer V> ? V : T[K] extends AsyncIterableIterator<infer V> ? V : T[K] extends Array<infer V> ? V : never;
};
type RxValueTypeObjectOrUndefined<T extends Record<string, ReactiveOrSource<any>>> = {
    [K in keyof T]: T[K] extends Reactive<infer V> ? V | undefined : T[K] extends Wrapped<infer V> ? V | undefined : T[K] extends Generator<infer V> ? V | undefined : T[K] extends AsyncGenerator<infer V> ? V | undefined : T[K] extends IterableIterator<infer V> ? V | undefined : T[K] extends AsyncIterableIterator<infer V> ? V | undefined : T[K] extends Array<infer V> ? V | undefined : never;
};
type RxValueTypeRx<T extends Record<string, ReactiveOrSource<any>>> = {
    [K in keyof T]: T[K] extends Reactive<infer V> ? Reactive<V> : T[K] extends Wrapped<infer V> ? Reactive<V> : T[K] extends Generator<infer V> ? Reactive<V> : T[K] extends AsyncGenerator<infer V> ? Reactive<V> : T[K] extends IterableIterator<infer V> ? Reactive<V> : T[K] extends AsyncIterableIterator<infer V> ? Reactive<V> : T[K] extends Array<infer V> ? Reactive<V> : never;
};
type PrimitiveValueTypeObject<T extends Record<string, Primitive>> = {
    [K in keyof T]: T[K] extends number ? number | undefined : T[K] extends string ? string | undefined : T[K] extends boolean ? boolean | undefined : T[K] extends bigint ? bigint | undefined : never;
};

export { type TriggerGenerator as $, type InitStreamOptions as A, type BatchOptions as B, type ChangeKind as C, type DebounceOptions as D, type SplitOptions as E, type FieldOptions as F, type ReactiveStream as G, type SwitcherOptions as H, type IsEqualContext as I, type SyncOptions as J, type Processors as K, type ReactiveWritable as L, type ThrottleOptions as M, type TimeoutTriggerOptions as N, type ToArrayOptions as O, type Passed as P, type PassedSignal as Q, type RecursiveReplace as R, type SingleFromArrayOptions as S, type TransformOpts as T, type Unsubscriber as U, type PassedValue as V, type WithValueOptions as W, type Wrapped as X, type Trigger as Y, type TriggerValue as Z, type TriggerFunction as _, type RecursivePartial as a, type GeneratorOptions as a0, type FunctionOptions as a1, type CountOptions as a2, type ObjectFieldHandler as a3, type PathDataChange as a4, type DomBindSourceValue as a5, type PipeDomBinding as a6, type DomBindValueTarget as a7, type DomBindUnresolvedSource as a8, type BindUpdateOpts as a9, type ElementBind as aA, type InitLazyStreamInitedOptions as aB, type InitLazyStreamOptions as aC, type Lazy as aD, type OpAsAnnotation as aE, type Optional as aF, type PipeSet as aG, type PrimitiveValueTypeObject as aH, type ReactiveInitialStream as aI, type ReactiveOpInit as aJ, type ReactiveOpLinks as aK, type ResolveOptions as aL, type RxValueTypeObjectOrUndefined as aM, type SetHtmlOptionsElement as aN, type SetHtmlOptionsQuery as aO, type SignalKinds as aP, type UpstreamInitialOptions as aQ, type UpstreamOptions as aR, average as aS, max as aT, min as aU, rank as aV, setHtmlText as aW, sum as aX, tally as aY, type ElementsOptions as aa, type ArrayOptions as ab, type ReactiveFinite as ac, type ArrayObjectOptions as ad, type ReactiveArray as ae, type DerivedOptions as af, type DomNumberInputValueOptions as ag, type DomValueOptions as ah, type EventOptions as ai, type EventTriggerOptions as aj, type FunctionFunction as ak, type PingedFunctionFunction as al, type PingedFunctionOptions as am, type ObjectOptions as an, symbol as ao, type DerivedFunction as ap, type EventPluckedFieldOptions as aq, type EventPluckedFieldOptions2 as ar, type SetHtmlOptions as as, type OpMathOptions as at, type TallyOptions as au, type DomBindInputOptions as av, type DomBindResolvedSource as aw, type DomBindTargetNode as ax, type DomBindTargetNodeResolved as ay, type DomCreateOptions as az, type ReadonlyRemapObjectPropertyType as b, type RemapObjectPropertyType as c, type RequireOnlyOne as d, type ReactiveNonInitial as e, type ChangeRecord as f, type CompareChangeSet as g, Pathed as h, Process$1 as i, changedDataFields as j, compareArrays as k, compareData$1 as l, compareKeys as m, isEmptyEntries as n, isEqualContextString as o, type Reactive as p, type ReactiveOrSource as q, type ReactiveOp as r, type CombineLatestOptions as s, type RxValueTypes as t, type RxValueTypeRx as u, type RxValueTypeObject as v, type ReactiveDiff as w, type ReactiveInitial as x, type ReactivePingable as y, type FilterPredicate as z };
