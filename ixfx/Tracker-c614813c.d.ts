/**
 * Keeps track of the min, max and avg in a stream of values without actually storing them.
 *
 * Usage:
 *
 * ```js
 *  const t = tracker();
 *  t.seen(10);
 *
 *  t.avg / t.min/ t.max / t.getMinMax()
 * ```
 *
 * Use `reset()` to clear everything, or `resetAvg()` to only reset averaging calculation
 * @class Tracker
 */
declare class Tracker {
    samples: number;
    total: number;
    min: number;
    max: number;
    id: string | undefined;
    constructor(id?: string | undefined);
    get avg(): number;
    resetAvg(newId?: string | null): void;
    reset(newId?: string | null): void;
    seen(sample: number): void;
    getMinMaxAvg(): {
        min: number;
        max: number;
        avg: number;
    };
}
declare const tracker: (id?: string | undefined) => Tracker;

export { Tracker as T, tracker as t };
