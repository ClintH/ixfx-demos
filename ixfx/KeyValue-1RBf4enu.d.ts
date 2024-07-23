import { a as MinMaxAvgTotal } from './Types-AemTbNiz.js';
import { K as KeyValue } from './PrimitiveTypes-HWqXs_XP.js';

type KeyValueSorter = (data: Array<KeyValue>) => Array<KeyValue>;
type SortSyles = `value` | `value-reverse` | `key` | `key-reverse`;
declare const getSorter: (sortStyle: SortSyles) => KeyValueSorter;
declare const minMaxAvg: (entries: ReadonlyArray<KeyValue>, conversionFunction?: (v: KeyValue) => number) => MinMaxAvgTotal;

export { type KeyValueSorter as K, type SortSyles as S, getSorter as g, minMaxAvg as m };
