import { a as MinMaxAvgTotal } from './Types-grp6zrDi.js';
import { K as KeyValue } from './PrimitiveTypes-F6miV4Zn.js';

type KeyValueSorter = (data: Array<KeyValue>) => Array<KeyValue>;
type SortSyles = `value` | `value-reverse` | `key` | `key-reverse`;
declare const getSorter: (sortStyle: SortSyles) => KeyValueSorter;
declare const minMaxAvg: (entries: ReadonlyArray<KeyValue>, conversionFunction?: (v: KeyValue) => number) => MinMaxAvgTotal;

export { type KeyValueSorter as K, type SortSyles as S, getSorter as g, minMaxAvg as m };
