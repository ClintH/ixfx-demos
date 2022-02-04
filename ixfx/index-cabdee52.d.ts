import { S as SimpleEventEmitter } from './Events-faeaa6ab';
import { P as Path } from './Rect-04af8f31';

/**
 * Creates an easing based on clock time
 *
 * @param {string} easingName Name of easing
 * @param {number} durationMs Duration in milliseconds
 * @returns Easing
 */
declare const timer: (easingName: string, durationMs: number) => Easing;
/**
 * Creates an easing based on ticks
 *
 * @param {string} easingName Name of easing
 * @param {number} durationTicks Duration in ticks
 * @returns {Easing}
 */
declare const tick: (easingName: string, durationTicks: number) => Easing;
declare type Easing = {
    /**
     * Computes the current value of the easing
     *
     * @returns {number}
     */
    compute(): number;
    /**
     * Reset the easing
     *
     */
    reset(): void;
    /**
     * Returns true if the easing is complete
     *
     * @returns {boolean}
     */
    isDone(): boolean;
};
/**
 * Return list of available easings
 *
 * @returns {string[]}
 */
declare const getEasings: () => string[];

declare const defaultAdsrOpts: () => AdsrOpts;
declare type AdsrOpts = AdsrBaseOpts & {
    /**
     * Attack bezier 'bend'
     *
     * @type {number} Bend from -1 to 1. 0 for a straight line
     */
    readonly attackBend: number;
    /**
     * Decay bezier 'bend'
     *
     * @type {number} Bend from -1 to 1. 0 for a straight line
     */
    readonly decayBend: number;
    /**
     * Release bezier 'bend'
     *
     * @type {number} Bend from -1 to 1. 0 for a straight line
     */
    readonly releaseBend: number;
    readonly peakLevel: number;
    readonly initialLevel: number;
    readonly sustainLevel: number;
    readonly releaseLevel: number;
};
declare type AdsrBaseOpts = {
    /**
     * If true, envelope indefinately returns to attack stage after release
     *
     * @type {boolean}
     */
    readonly shouldLoop: boolean;
    /**
     * Duration for attack stage
     * Unit depends on timer source
     * @type {number}
     */
    readonly attackDuration: number;
    /**
     * Duration for decay stage
     * Unit depends on timer source
     * @type {number}
     */
    readonly decayDuration: number;
    /**
     * Duration for release stage
     * Unit depends on timer source
     * @type {number}
     */
    readonly releaseDuration: number;
};
interface StateChangeEvent {
    readonly newState: string;
    readonly priorState: string;
}
interface CompleteEvent {
}
declare type Events = {
    readonly change: StateChangeEvent;
    readonly complete: CompleteEvent;
};
declare class AdsrBase extends SimpleEventEmitter<Events> {
    #private;
    attackDuration: number;
    decayDuration: number;
    releaseDuration: number;
    decayDurationTotal: number;
    shouldLoop: boolean;
    constructor(opts: AdsrBaseOpts);
    switchState(): void;
    computeRaw(): [stage: string | undefined, amount: number];
    get isDone(): boolean;
    trigger(hold?: boolean): void;
    release(): void;
}
declare class Adsr extends AdsrBase {
    readonly attackPath: Path;
    readonly decayPath: Path;
    readonly releasePath: Path;
    readonly initialLevel: number;
    readonly peakLevel: number;
    readonly releaseLevel: number;
    readonly sustainLevel: number;
    readonly attackBend: number;
    readonly decayBend: number;
    readonly releaseBend: number;
    constructor(opts: AdsrOpts);
    compute(): [stage: string | undefined, scaled: number, raw: number];
}
declare const adsr: (opts: AdsrOpts) => Adsr;

declare const index_timer: typeof timer;
declare const index_tick: typeof tick;
type index_Easing = Easing;
declare const index_getEasings: typeof getEasings;
declare const index_defaultAdsrOpts: typeof defaultAdsrOpts;
type index_AdsrOpts = AdsrOpts;
type index_AdsrBaseOpts = AdsrBaseOpts;
type index_StateChangeEvent = StateChangeEvent;
type index_CompleteEvent = CompleteEvent;
declare const index_adsr: typeof adsr;
declare namespace index {
  export {
    index_timer as timer,
    index_tick as tick,
    index_Easing as Easing,
    index_getEasings as getEasings,
    index_defaultAdsrOpts as defaultAdsrOpts,
    index_AdsrOpts as AdsrOpts,
    index_AdsrBaseOpts as AdsrBaseOpts,
    index_StateChangeEvent as StateChangeEvent,
    index_CompleteEvent as CompleteEvent,
    index_adsr as adsr,
  };
}

export { AdsrOpts as A, CompleteEvent as C, Easing as E, StateChangeEvent as S, tick as a, AdsrBaseOpts as b, adsr as c, defaultAdsrOpts as d, getEasings as g, index as i, timer as t };
