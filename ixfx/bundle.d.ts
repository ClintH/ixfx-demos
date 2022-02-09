export { i as Geometry } from './index-c713ce07';
export { i as Flow } from './index-00513425';
export { D as Drawing } from './Drawing-ecae5a60';
export { i as Visual } from './index-d30f29e4';
export { i as Dom } from './index-9cc3680a';
export { i as Modulation } from './index-0e0e029d';
export { i as Collections } from './index-62526eca';
export { G as Generators } from './Generators-306edfc2';
export { R as Random } from './Random-88850926';
import { K as KeyValue } from './KeyValue-5c033442';
export { K as KeyValue, a as KeyValues } from './KeyValue-5c033442';
import { ToString } from './util';
export { IsEqual, ToString, clamp, clampZeroBounds, isEqualDefault, isEqualValueDefault, lerp, scale, scalePercent, scalePercentOutput, toStringDefault } from './util';
export { T as Timers } from './Timer-0ec89564';
import { S as SimpleEventEmitter } from './Events-53171926';
import './Circle-965512ab';
import './Rect-a483e621';
import './Interfaces-66f61f8b';
import './StateMachine-5b1032f5';
import 'rxjs';
import './Forms-846a05a5';
import './Set-598dd5a3';
import './Arrays-582f094b';
import './Map-696d80a2';
import 'fp-ts/Ord';

declare type FrequencyEventMap = {
    readonly change: void;
};
/**
 * Frequency keeps track of how many times a particular value is seen, but
 * unlike a {@link Maps|Map} it does not store the data. By default compares
 * items by value (via JSON.stringify).
 *
 * Create with {@link frequencyMutable}.
 *
 * Fires `change` event when items are added or it is cleared.
 *
 * Overview
 * ```
 * const fh = frequencyMutable();
 * fh.add(value); // adds a value
 * fh.clear();    // clears all data
 * fh.keys() / .values() // returns an iterator for keys and values
 * fh.toArray();  //  returns an array of data in the shape [[key,freq],[key,freq]...]
 * ```
 *
 * Usage
 * ```
 * const fh = frequencyMutable();
 * fh.add(`apples`); // Count an occurence of `apples`
 * fh.add(`oranges)`;
 * fh.add(`apples`);
 *
 * const fhData = fh.toArray(); // Expect result [[`apples`, 2], [`oranges`, 1]]
 * fhData.forEach((d) => {
 *  const [key,freq] = d;
 *  console.log(`Key '${key}' occurred ${freq} time(s).`);
 * })
 * ```
 *
 * Custom key string
 * ```
 * const fh = frequencyMutable( person => person.name);
 * // All people with name `Samantha` will be counted in same group
 * fh.add({name:`Samantha`, city:`Brisbane`});
 * ```
 * @template V Type of items
 */
declare class FrequencyMutable<V> extends SimpleEventEmitter<FrequencyEventMap> {
    #private;
    /**
     * Constructor
     * @param keyString Function to key items. Uses JSON.stringify by default
     */
    constructor(keyString?: ToString<V> | undefined);
    /**
     * Clear data. Fires `change` event
     */
    clear(): void;
    /**
     * @returns Iterator over keys (ie. groups)
     */
    keys(): IterableIterator<string>;
    /**
     * @returns Iterator over frequency counts
     */
    values(): IterableIterator<number>;
    /**
     * @returns Copy of entries as an array of `[key, count]`
     */
    toArray(): [key: string, count: number][];
    /**
     *
     * @param value Value to count
     * @returns Frequency of value, or _undefined_ if it does not exist
     */
    frequencyOf(value: V | string): number | undefined;
    /**
     *
     * @param value Value to count
     * @returns Relative frequency of `value`, or _undefined_ if it does not exist
     */
    relativeFrequencyOf(value: V | string): number | undefined;
    /**
     * @returns Copy of entries as an array
     */
    entries(): Array<KeyValue>;
    /**
     *
     * @returns Returns `{min,max,avg,total}`
     */
    minMaxAvg(): {
        readonly min: number;
        readonly total: number;
        readonly max: number;
        readonly avg: number;
    };
    /**
     *
     * @param sortStyle Sorting style (default: _value_, ie. count)
     * @returns Sorted array of [key,frequency]
     */
    entriesSorted(sortStyle?: `value` | `valueReverse` | `key` | `keyReverse`): ReadonlyArray<KeyValue>;
    /**
     *
     * @param values Values to add. Fires _change_ event after adding item(s)
     */
    add(...values: V[]): void;
}
/**
 * Creates a FrequencyMutable
 * @inheritdoc FrequencyMutable
 * @template V Data type of items
 * @param keyString Function to generate keys for items. If not specified, uses JSON.stringify
 * @returns
 */
declare const frequencyMutable: <V>(keyString?: ToString<V> | undefined) => FrequencyMutable<V>;

export { FrequencyMutable, frequencyMutable };
