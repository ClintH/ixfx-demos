/**
 * Return _true_ if `a` and `b` ought to be considered equal
 * at a given path
 */
type IsEqualContext<V> = (a: V, b: V, path: string) => boolean;
/**
 * Returns _true_ if `a` and `b are equal based on their JSON representations.
 * `path` is ignored.
 * @param a
 * @param b
 * @param path
 * @returns
 */
declare const isEqualContextString: IsEqualContext<any>;
type Change<V> = {
    path: string;
    previous?: V;
    value: V;
};
type CompareDataOptions<V> = {
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
    a: string[];
    b: string[];
};
/**
 * Scans object, producing a list of changed fields where B's value differs from A.
 *
 * Options:
 * - `deepEntries` (_false_): If _false_ Object.entries are used to scan the object. This won't work for some objects, eg event args
 * - `eq` (JSON.stringify): By-value comparison function
 * - `includeMissingFromA` (_false): If _true_ includes fields present on B but missing on A.
 * @param a
 * @param b
 * @param pathPrefix
 * @param options
 * @returns
 */
declare const compareData: <V extends Record<string, any>>(a: V, b: V, options?: Partial<CompareDataOptions<V>>) => Array<Change<any>>;
/**
 * Returns a copy of `a` with changes applied.
 * @param a
 * @param changes
 */
declare const applyChanges: <V extends Record<string, any>>(a: V, changes: Array<Change<any>>) => V;
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
declare const getField: <V>(object: Record<string, any>, path: string) => V;
/**
 * Maps the properties of an object through a map function.
 * That is, run each of the values of an object through a function,
 * setting the result onto the same key structure as original.
 *
 * @example Double the value of all fields
 * ```js
 * const rect = { width: 100, height: 250 };
 * const doubled = mapObject(rect, (fieldValue) => {
 *  return fieldValue*2;
 * });
 * // Yields: { width: 200, height: 500 }
 * ```
 *
 * Since the map callback gets the name of the property, it can do context-dependent things.
 * ```js
 * const rect = { width: 100, height: 250, colour: 'red' }
 * const doubled = mapObject(rect, (fieldValue, fieldName) => {
 *  if (fieldName === 'width') return fieldValue*3;
 *  else if (typeof fieldValue === 'number') return fieldValue*2;
 *  return fieldValue;
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
 * const oAvg = mapObject(o, (value, key) => {
 *  return movingAverage(10);
 * });
 *
 * // Instead of { x:number, y:number... }, we now have { x:movingAverage(), y:movingAverage()... }
 * // Add a value to the averager
 * oAvg.x.add(20);
 * ```
 */
declare const map: <SourceType extends Record<string, any>, DestinationFieldType>(object: SourceType, mapFunction: (fieldValue: any, field: string, index: number) => DestinationFieldType) => RemapObjectPropertyType<SourceType, DestinationFieldType>;
type RemapObjectPropertyType<OriginalType, PropertyType> = {
    readonly [Property in keyof OriginalType]: PropertyType;
};
/**
 * Returns a list of paths for all the fields on `o`
 * ```
 * const d = {
 *  accel: { x: 1, y: 2, z: 3 },
 *   gyro: { x: 4, y: 5, z: 6 }
 * };
 * const paths = getFieldPaths(d);
 * // Yields [ `accel`, `gyro`, `accel.x`, `accel.y`,`accel.z`,`gyro.x`,`gyro.y`,`gyro.z` ]
 * ```
 *
 * Use {@link getField} to fetch data by this 'path' string.
 *
 * If object is _null_, an empty array is returned.
 *
 * If `onlyLeaves` is _true_, only leaf nodes are included. _false_ by default.
 * ```js
 * const paths = getFieldPaths(d, true);
 * // Yields [ `accel.x`, `accel.y`,`accel.z`,`gyro.x`,`gyro.y`,`gyro.z` ]
 * ```
 *
 * @param object Object to get paths for
 * @param onlyLeaves If true, only paths with a primitive value are returned.
 * @returns
 */
declare const getPaths: (object: object | null, onlyLeaves?: boolean) => ReadonlyArray<string>;
/**
 * Returns a representation of the object as a set of paths and data.
 * ```js
 * const o = { name: `hello`, size: 20, colour: { r:200, g:100, b:40 } }
 * getPathsAndData(o);
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
declare const getPathsAndData: (o: object, maxDepth?: number, prefix?: string) => Array<Change<any>>;

type Immutable_Change<V> = Change<V>;
type Immutable_CompareDataOptions<V> = CompareDataOptions<V>;
type Immutable_IsEqualContext<V> = IsEqualContext<V>;
type Immutable_RemapObjectPropertyType<OriginalType, PropertyType> = RemapObjectPropertyType<OriginalType, PropertyType>;
declare const Immutable_applyChanges: typeof applyChanges;
declare const Immutable_compareData: typeof compareData;
declare const Immutable_compareKeys: typeof compareKeys;
declare const Immutable_getField: typeof getField;
declare const Immutable_getPaths: typeof getPaths;
declare const Immutable_getPathsAndData: typeof getPathsAndData;
declare const Immutable_isEqualContextString: typeof isEqualContextString;
declare const Immutable_map: typeof map;
declare const Immutable_updateByPath: typeof updateByPath;
declare namespace Immutable {
  export { type Immutable_Change as Change, type Immutable_CompareDataOptions as CompareDataOptions, type Immutable_IsEqualContext as IsEqualContext, type Immutable_RemapObjectPropertyType as RemapObjectPropertyType, Immutable_applyChanges as applyChanges, Immutable_compareData as compareData, Immutable_compareKeys as compareKeys, Immutable_getField as getField, Immutable_getPaths as getPaths, Immutable_getPathsAndData as getPathsAndData, Immutable_isEqualContextString as isEqualContextString, Immutable_map as map, Immutable_updateByPath as updateByPath };
}

export { type Change as C, Immutable as I, type RemapObjectPropertyType as R, type IsEqualContext as a, type CompareDataOptions as b, compareKeys as c, compareData as d, applyChanges as e, getPaths as f, getField as g, getPathsAndData as h, isEqualContextString as i, map as m, updateByPath as u };
