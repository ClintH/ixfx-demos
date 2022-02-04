import * as fp_ts_Ord from 'fp-ts/Ord';

declare type Primitive = string | number;
declare type KeyValue = readonly [key: string, value: Primitive];
declare const byValueString: (reverse?: boolean) => fp_ts_Ord.Ord<KeyValue>;
declare const sortByKey: (reverse?: boolean) => <A extends KeyValue>(as: A[]) => A[];
declare const sortByValueString: (reverse?: boolean) => <A extends KeyValue>(as: A[]) => A[];
declare const sortByValueNumber: (reverse?: boolean) => <A extends KeyValue>(as: A[]) => A[];
declare type SortingFn = (data: KeyValue[]) => KeyValue[];
declare const getSorter: (sortStyle: `value` | `valueReverse` | `key` | `keyReverse`) => <A extends KeyValue>(as: A[]) => A[];

type KeyValue$1_KeyValue = KeyValue;
declare const KeyValue$1_byValueString: typeof byValueString;
declare const KeyValue$1_sortByKey: typeof sortByKey;
declare const KeyValue$1_sortByValueString: typeof sortByValueString;
declare const KeyValue$1_sortByValueNumber: typeof sortByValueNumber;
type KeyValue$1_SortingFn = SortingFn;
declare const KeyValue$1_getSorter: typeof getSorter;
declare namespace KeyValue$1 {
  export {
    KeyValue$1_KeyValue as KeyValue,
    KeyValue$1_byValueString as byValueString,
    KeyValue$1_sortByKey as sortByKey,
    KeyValue$1_sortByValueString as sortByValueString,
    KeyValue$1_sortByValueNumber as sortByValueNumber,
    KeyValue$1_SortingFn as SortingFn,
    KeyValue$1_getSorter as getSorter,
  };
}

export { KeyValue as K, KeyValue$1 as a };
