type ToString<V> = (itemToMakeStringFor: V) => string;
declare const isMap: (value: unknown) => value is Map<any, any>;
declare const isSet: (value: unknown) => value is Set<any>;
/**
 * A default converter to string that uses JSON.stringify if its an object, or the thing itself if it's a string
 */
declare const toStringDefault: <V>(itemToMakeStringFor: V) => string;
declare const defaultToString: (object: any) => string;

export { type ToString as T, isSet as a, defaultToString as d, isMap as i, toStringDefault as t };
