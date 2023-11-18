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
};
/**
 * Scans object, producing a list of changed fields.
 *
 * @param a
 * @param b
 * @param pathPrefix
 * @returns
 */
declare const compareData: <V extends Record<string, any>>(a: V, b: V, pathPrefix?: string, options?: Partial<CompareDataOptions<V>>) => Array<Change<any>>;
/**
 * Returns a copy of `a` with changes applied.
 * @param a
 * @param changes
 */
declare const applyChanges: <V extends Record<string, any>>(a: V, changes: Array<Change<any>>) => V;
/**
 * Returns a copy of an object with a specified path changed to `value`.
 *
 * ```js
 * const a = {
 *  message: `Hello`,
 *  position: { x: 10, y: 20 }
 * }
 *
 * const a1 = updateByPath(a, `message`, `new message`);
 * const a2 = updateByPath(a, `position.x`, 20);
 * ```
 *
 * If the path cannot be resolved, an exception is thrown
 * @param o
 * @param path
 * @param value
 * @returns
 */
declare const updateByPath: <V extends Record<string, any>>(o: V, path: string, value: any, createIfNecessary?: boolean) => V;
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
 * That is, run each of the values of an object through a function, an return
 * the result.
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
 * In terms of typesafety, the mapped properties are assumed to have the
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
 * If object is _null_, and empty array is returned.
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
 * Returns a representation of the object
 * @param o
 * @returns
 */
declare const getPathsAndData: (o: object) => Array<Change<any>>;

type Immutable_Change<V> = Change<V>;
type Immutable_CompareDataOptions<V> = CompareDataOptions<V>;
type Immutable_IsEqualContext<V> = IsEqualContext<V>;
type Immutable_RemapObjectPropertyType<OriginalType, PropertyType> = RemapObjectPropertyType<OriginalType, PropertyType>;
declare const Immutable_applyChanges: typeof applyChanges;
declare const Immutable_compareData: typeof compareData;
declare const Immutable_getField: typeof getField;
declare const Immutable_getPaths: typeof getPaths;
declare const Immutable_getPathsAndData: typeof getPathsAndData;
declare const Immutable_isEqualContextString: typeof isEqualContextString;
declare const Immutable_map: typeof map;
declare const Immutable_updateByPath: typeof updateByPath;
declare namespace Immutable {
  export {
    Immutable_Change as Change,
    Immutable_CompareDataOptions as CompareDataOptions,
    Immutable_IsEqualContext as IsEqualContext,
    Immutable_RemapObjectPropertyType as RemapObjectPropertyType,
    Immutable_applyChanges as applyChanges,
    Immutable_compareData as compareData,
    Immutable_getField as getField,
    Immutable_getPaths as getPaths,
    Immutable_getPathsAndData as getPathsAndData,
    Immutable_isEqualContextString as isEqualContextString,
    Immutable_map as map,
    Immutable_updateByPath as updateByPath,
  };
}

export { Change as C, Immutable as I, RemapObjectPropertyType as R, IsEqualContext as a, CompareDataOptions as b, compareData as c, applyChanges as d, getPaths as e, getPathsAndData as f, getField as g, isEqualContextString as i, map as m, updateByPath as u };
