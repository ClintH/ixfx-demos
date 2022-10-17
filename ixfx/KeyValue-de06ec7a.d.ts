import { M as MinMaxAvgTotal } from './NumericArrays-a2b58360.js';
import * as fp_ts_lib_Ord_js from 'fp-ts/lib/Ord.js';

declare type Primitive = string | number;
declare type KeyValue = readonly [key: string, value: Primitive];
declare const byValueString: (reverse?: boolean) => fp_ts_lib_Ord_js.Ord<KeyValue>;
declare const sortByKey: (reverse?: boolean) => <A extends KeyValue>(as: A[]) => A[];
declare const sortByValueString: (reverse?: boolean) => <A extends KeyValue>(as: A[]) => A[];
declare const sortByValueNumber: (reverse?: boolean) => <A extends KeyValue>(as: A[]) => A[];
declare type SortingFn = (data: KeyValue[]) => KeyValue[];
declare const getSorter: (sortStyle: `value` | `valueReverse` | `key` | `keyReverse`) => <A extends KeyValue>(as: A[]) => A[];
declare const minMaxAvg: (entries: readonly KeyValue[], conversionFn?: ((v: KeyValue) => number) | undefined) => MinMaxAvgTotal;

type KeyValue$1_Primitive = Primitive;
type KeyValue$1_KeyValue = KeyValue;
declare const KeyValue$1_byValueString: typeof byValueString;
declare const KeyValue$1_sortByKey: typeof sortByKey;
declare const KeyValue$1_sortByValueString: typeof sortByValueString;
declare const KeyValue$1_sortByValueNumber: typeof sortByValueNumber;
type KeyValue$1_SortingFn = SortingFn;
declare const KeyValue$1_getSorter: typeof getSorter;
declare const KeyValue$1_minMaxAvg: typeof minMaxAvg;
declare namespace KeyValue$1 {
  export {
    KeyValue$1_Primitive as Primitive,
    KeyValue$1_KeyValue as KeyValue,
    KeyValue$1_byValueString as byValueString,
    KeyValue$1_sortByKey as sortByKey,
    KeyValue$1_sortByValueString as sortByValueString,
    KeyValue$1_sortByValueNumber as sortByValueNumber,
    KeyValue$1_SortingFn as SortingFn,
    KeyValue$1_getSorter as getSorter,
    KeyValue$1_minMaxAvg as minMaxAvg,
  };
}

export { KeyValue$1 as K, Primitive as P, SortingFn as S, KeyValue as a, byValueString as b, sortByValueString as c, sortByValueNumber as d, getSorter as g, minMaxAvg as m, sortByKey as s };
