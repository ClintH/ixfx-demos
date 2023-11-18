import { M as MinMaxAvgTotal } from './MinMaxAvg-48c469f8.js';
import * as fp_ts_lib_Ord_js from 'fp-ts/lib/Ord.js';

type StringOrNumber = string | number | bigint;
type Primitive = string | number | bigint | boolean;
type BasicType = StringOrNumber | object;
type KeyValue = readonly [key: string, value: StringOrNumber];
declare function isPrimitive(v: any): v is Primitive;
declare const byValueString: (reverse?: boolean) => fp_ts_lib_Ord_js.Ord<KeyValue>;
declare const sortByKey: (reverse?: boolean) => <A extends KeyValue>(as: A[]) => A[];
declare const sortByValueString: (reverse?: boolean) => <A extends KeyValue>(as: A[]) => A[];
declare const sortByValueNumber: (reverse?: boolean) => <A extends KeyValue>(as: A[]) => A[];
type Sorter = (data: Array<KeyValue>) => Array<KeyValue>;
declare const getSorter: (sortStyle: `value` | `valueReverse` | `key` | `keyReverse`) => <A extends KeyValue>(as: A[]) => A[];
declare const minMaxAvg: (entries: ReadonlyArray<KeyValue>, conversionFunction?: ((v: KeyValue) => number) | undefined) => MinMaxAvgTotal;

type KeyValue$1_BasicType = BasicType;
type KeyValue$1_KeyValue = KeyValue;
type KeyValue$1_Primitive = Primitive;
type KeyValue$1_Sorter = Sorter;
type KeyValue$1_StringOrNumber = StringOrNumber;
declare const KeyValue$1_byValueString: typeof byValueString;
declare const KeyValue$1_getSorter: typeof getSorter;
declare const KeyValue$1_isPrimitive: typeof isPrimitive;
declare const KeyValue$1_minMaxAvg: typeof minMaxAvg;
declare const KeyValue$1_sortByKey: typeof sortByKey;
declare const KeyValue$1_sortByValueNumber: typeof sortByValueNumber;
declare const KeyValue$1_sortByValueString: typeof sortByValueString;
declare namespace KeyValue$1 {
  export {
    KeyValue$1_BasicType as BasicType,
    KeyValue$1_KeyValue as KeyValue,
    KeyValue$1_Primitive as Primitive,
    KeyValue$1_Sorter as Sorter,
    KeyValue$1_StringOrNumber as StringOrNumber,
    KeyValue$1_byValueString as byValueString,
    KeyValue$1_getSorter as getSorter,
    KeyValue$1_isPrimitive as isPrimitive,
    KeyValue$1_minMaxAvg as minMaxAvg,
    KeyValue$1_sortByKey as sortByKey,
    KeyValue$1_sortByValueNumber as sortByValueNumber,
    KeyValue$1_sortByValueString as sortByValueString,
  };
}

export { BasicType as B, KeyValue$1 as K, Primitive as P, StringOrNumber as S, KeyValue as a, byValueString as b, sortByValueString as c, sortByValueNumber as d, Sorter as e, getSorter as g, isPrimitive as i, minMaxAvg as m, sortByKey as s };
