import { M as MinMaxAvgTotal } from './Types-S_XFjbWq.js';
import { K as KeyValue$1 } from './PrimitiveTypes-HWqXs_XP.js';

type KeyValueSorter = (data: Array<KeyValue$1>) => Array<KeyValue$1>;
type SortSyles = `value` | `value-reverse` | `key` | `key-reverse`;
declare const getSorter: (sortStyle: SortSyles) => KeyValueSorter;
declare const minMaxAvg: (entries: ReadonlyArray<KeyValue$1>, conversionFunction?: (v: KeyValue$1) => number) => MinMaxAvgTotal;

type KeyValue_KeyValueSorter = KeyValueSorter;
type KeyValue_SortSyles = SortSyles;
declare const KeyValue_getSorter: typeof getSorter;
declare const KeyValue_minMaxAvg: typeof minMaxAvg;
declare namespace KeyValue {
  export { type KeyValue_KeyValueSorter as KeyValueSorter, type KeyValue_SortSyles as SortSyles, KeyValue_getSorter as getSorter, KeyValue_minMaxAvg as minMaxAvg };
}

export { KeyValue as K, type SortSyles as S, type KeyValueSorter as a, getSorter as g, minMaxAvg as m };
