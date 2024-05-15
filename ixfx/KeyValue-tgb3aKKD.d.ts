import { M as MinMaxAvgTotal } from './MinMaxAvg-X_wBRrCz.js';

type StringOrNumber = string | number | bigint;
type Primitive = string | number | bigint | boolean;
type PrimitiveOrObject = Primitive | object;
type BasicType = StringOrNumber | object;
type KeyValue = readonly [key: string, value: StringOrNumber];
/**
 * Returns _true_ if `value` is number, string, bigint or boolean.
 * Returns _false_ if `value` is an object, null, undefined
 * @param value Value to check
 * @returns _True_ if value is number, string, bigint or boolean.
 */
declare function isPrimitive(value: any): value is Primitive;
declare function isPrimitiveOrObject(value: any): value is PrimitiveOrObject;
type KeyValueSorter = (data: Array<KeyValue>) => Array<KeyValue>;
type SortSyles = `value` | `value-reverse` | `key` | `key-reverse`;
declare const getSorter: (sortStyle: SortSyles) => KeyValueSorter;
declare const minMaxAvg: (entries: ReadonlyArray<KeyValue>, conversionFunction?: (v: KeyValue) => number) => MinMaxAvgTotal;

type KeyValue$1_BasicType = BasicType;
type KeyValue$1_KeyValue = KeyValue;
type KeyValue$1_KeyValueSorter = KeyValueSorter;
type KeyValue$1_Primitive = Primitive;
type KeyValue$1_PrimitiveOrObject = PrimitiveOrObject;
type KeyValue$1_SortSyles = SortSyles;
type KeyValue$1_StringOrNumber = StringOrNumber;
declare const KeyValue$1_getSorter: typeof getSorter;
declare const KeyValue$1_isPrimitive: typeof isPrimitive;
declare const KeyValue$1_isPrimitiveOrObject: typeof isPrimitiveOrObject;
declare const KeyValue$1_minMaxAvg: typeof minMaxAvg;
declare namespace KeyValue$1 {
  export { type KeyValue$1_BasicType as BasicType, type KeyValue$1_KeyValue as KeyValue, type KeyValue$1_KeyValueSorter as KeyValueSorter, type KeyValue$1_Primitive as Primitive, type KeyValue$1_PrimitiveOrObject as PrimitiveOrObject, type KeyValue$1_SortSyles as SortSyles, type KeyValue$1_StringOrNumber as StringOrNumber, KeyValue$1_getSorter as getSorter, KeyValue$1_isPrimitive as isPrimitive, KeyValue$1_isPrimitiveOrObject as isPrimitiveOrObject, KeyValue$1_minMaxAvg as minMaxAvg };
}

export { type BasicType as B, KeyValue$1 as K, type Primitive as P, type SortSyles as S, type KeyValue as a, type PrimitiveOrObject as b, type StringOrNumber as c, isPrimitiveOrObject as d, type KeyValueSorter as e, getSorter as g, isPrimitive as i, minMaxAvg as m };
