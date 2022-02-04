import { S as SimpleEventEmitter } from './Events-faeaa6ab';
import { P as Path } from './Rect-04af8f31';

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

declare const Envelope_defaultAdsrOpts: typeof defaultAdsrOpts;
type Envelope_AdsrOpts = AdsrOpts;
type Envelope_AdsrBaseOpts = AdsrBaseOpts;
type Envelope_StateChangeEvent = StateChangeEvent;
type Envelope_CompleteEvent = CompleteEvent;
declare const Envelope_adsr: typeof adsr;
declare namespace Envelope {
  export {
    Envelope_defaultAdsrOpts as defaultAdsrOpts,
    Envelope_AdsrOpts as AdsrOpts,
    Envelope_AdsrBaseOpts as AdsrBaseOpts,
    Envelope_StateChangeEvent as StateChangeEvent,
    Envelope_CompleteEvent as CompleteEvent,
    Envelope_adsr as adsr,
  };
}

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

declare const Easing$1_timer: typeof timer;
declare const Easing$1_tick: typeof tick;
type Easing$1_Easing = Easing;
declare const Easing$1_getEasings: typeof getEasings;
declare namespace Easing$1 {
  export {
    Easing$1_timer as timer,
    Easing$1_tick as tick,
    Easing$1_Easing as Easing,
    Easing$1_getEasings as getEasings,
  };
}

export { Easing$1 as E, Envelope as a };
