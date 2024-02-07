/**
 * Interval types allows for more expressive coding, rather than embedding millisecond values.
 *
 * eg: { mins: 5} rather than 5*60*1000 or worse, 300000
 *
 * Fields are cumulative. { secs: 2, millis: 1 } will equal 2001 milliseconds.
 *
 * Use {@link intervalToMs} to resolve an {@link Interval} to milliseconds. Use {@link Elapsed.toString} to get a human-readable version.
 */
type Interval = number | {
    readonly millis?: number;
    readonly secs?: number;
    readonly hours?: number;
    readonly mins?: number;
};
declare function intervalToMs(interval: Interval | undefined): number | undefined;
declare function intervalToMs(interval: Interval | undefined, defaultNumber: number): number;
declare function isInterval(interval: number | Interval | undefined): interval is Interval;

export { type Interval as I, isInterval as a, intervalToMs as i };
