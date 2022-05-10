import { P as Point } from './Rect-afd5c0f2.js';
import { T as Tracker } from './Tracker-ec5cafa7.js';

/**
 * Visualiser component
 *
 * Usage: import visualiser.js. Instantiate on document load, and pass in the
 * parent element into the constructor.
 *
 * eg: const v = new Visualiser(document.getElementById('renderer'));
 *
 * Data must be passed to the component via renderFreq or renderWave.
 *
 * Draws on https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API
 */

declare class Visualiser {
    freqMaxRange: number;
    audio: Analyser;
    parent: HTMLElement;
    lastPointer: Point;
    pointerDown: boolean;
    pointerClicking: boolean;
    pointerClickDelayMs: number;
    pointerDelaying: boolean;
    waveTracker: Tracker;
    freqTracker: Tracker;
    el: HTMLElement;
    constructor(parentElem: HTMLElement, audio: Analyser);
    renderFreq(freq: readonly number[]): void;
    isExpanded(): boolean;
    setExpanded(value: boolean): void;
    clear(): void;
    clearCanvas(canvas: HTMLCanvasElement | null): void;
    renderWave(wave: readonly number[], bipolar?: boolean): void;
    getPointerRelativeTo(elem: HTMLElement): {
        x: number;
        y: number;
    };
    onPointer(evt: MouseEvent | PointerEvent): void;
}

declare namespace AudioVisualiser {
  export {
    Visualiser as default,
  };
}

/**
 * Options for audio processing
 *
 * fftSize: Must be a power of 2, from 32 - 32768. Higher number means
 * more precision and higher CPU overhead
 * @see https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize
 *
 * smoothingTimeConstant: Range from 0-1, default is 0.8.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/smoothingTimeConstant
 *
 * debug: If true, additonal console logging will happen
 */
declare type Opts = Readonly<{
    readonly showVis?: boolean;
    /**
     * FFT size. Must be a power of 2, from 32 - 32768. Higher number means
     * more precision and higher CPU overhead
     * @see https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize
     */
    readonly fftSize?: number;
    /**
     * Range from 0-1, default is 0.8
     * @see https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/smoothingTimeConstant
     */
    readonly smoothingTimeConstant?: number;
    readonly debug?: boolean;
}>;
declare type DataAnalyser = (node: AnalyserNode, analyser: Analyser) => void;
/**
 * Basic audio analyser. Returns back waveform and FFT analysis. Use {@link peakLevel} if you want sound level, or {@link freq} if you just want FFT results.
 *
 * ```js
 * const onData = (freq, wave, analyser) => {
 *  // Demo: Get FFT results just for 100Hz-1KHz.
 *  const freqSlice = analyser.sliceByFrequency(100,1000,freq);
 *
 *  // Demo: Get FFT value for a particular frequency (1KHz)
 *  const amt = freq[analyser.getIndexForFrequency(1000)];
 * }
 * basic(onData, {fftSize: 512});
 * ```
 *
 * An `Analyser` instance is returned and can be controlled:
 * ```js
 * const analyser = basic(onData);
 * analyser.paused = true;
 * ```
 *
 * Note: Browers won't allow microphone access unless the call has come from a user-interaction, eg pointerup event handler.
 *
 * @param onData Handler for data
 * @param opts Options
 * @returns Analyser instance
 */
declare const basic: (onData: (freq: Float32Array, wave: Float32Array, analyser: Analyser) => void, opts?: Opts) => Analyser;
/**
 * Basic audio analyser. Returns FFT analysis. Use {@link peakLevel} if you want the sound level, or {@link basic} if you also want the waveform.
 *
 * ```js
 * const onData = (freq, analyser) => {
 *  // Demo: Print out each sound frequency (Hz) and amount of energy in that band
 *  for (let i=0;i<freq.length;i++) {
 *    const f = analyser.getFrequencyAtIndex(0);
 *    console.log(`${i}. frequency: ${f} amount: ${freq[i]}`);
 *  }
 * }
 * freq(onData, {fftSize:512});
 * ```
 *
 * Note: Browers won't allow microphone access unless the call has come from a user-interaction, eg pointerup event handler.
 *
 * @param onData
 * @param opts
 * @returns
 */
declare const freq: (onData: (freq: Float32Array, analyser: Analyser) => void, opts?: Opts) => Analyser;
/**
 * Basic audio analyser which reports the peak sound level.
 *
 * ```js
 * peakLevel(level => {
 *  console.log(level);
 * });
 * ```
 *
 * Note: Browers won't allow microphone access unless the call has come from a user-interaction, eg pointerup event handler.
 * @param onData
 * @param opts
 * @returns
 */
declare const peakLevel: (onData: (level: number, analyser: Analyser) => void, opts?: Opts) => Analyser;
/**
 * Helper for doing audio analysis. It takes case of connecting the audio stream, running in a loop and pause capability.
 *
 * Provide a function which works with an [AnalyserNode](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode), and does something with the result.
 * ```js
 * const myAnalysis = (node, analyser) => {
 *  const freq = new Float32Array(node.frequencyBinCount);
 *  node.getFloatFrequencyData(freq);
 *  // Do something with frequency data...
 * }
 * const a = new Analyser(myAnalysis);
 * ```
 *
 * Two helper functions provide ready-to-use Analysers:
 * * {@link peakLevel} peak decibel reading
 * * {@link freq} FFT results
 * * {@link basic} FFT results and waveform
 *
 * Note: Browers won't allow microphone access unless the call has come from a user-interaction, eg pointerup event handler.
 *
 */
declare class Analyser {
    #private;
    showVis: boolean;
    fftSize: number;
    smoothingTimeConstant: number;
    debug: boolean;
    visualiser: Visualiser | undefined;
    audioCtx: AudioContext | undefined;
    analyserNode: AnalyserNode | undefined;
    analyse: DataAnalyser;
    constructor(analyse: DataAnalyser, opts?: Opts);
    init(): void;
    get paused(): boolean;
    set paused(v: boolean);
    private setup;
    private onMicSuccess;
    private analyseLoop;
    /**
     * Returns the maximum FFT value within the given frequency range
     */
    getFrequencyRangeMax(lowFreq: number, highFreq: number, freqData: readonly number[]): number;
    /**
     * Returns a sub-sampling of frequency analysis data that falls between
     * `lowFreq` and `highFreq`.
     * @param lowFreq Low frequency
     * @param highFreq High frequency
     * @param freqData Full-spectrum frequency data
     * @returns Sub-sampling of analysis
     */
    sliceByFrequency(lowFreq: number, highFreq: number, freqData: readonly number[]): number[];
    /**
     * Returns the starting frequency for a given binned frequency index.
     * @param index Array index
     * @returns Sound frequency
     */
    getFrequencyAtIndex(index: number): number;
    /**
     * Returns a binned array index for a given frequency
     * @param freq Sound frequency
     * @returns Array index into frequency bins
     */
    getIndexForFrequency(freq: number): number;
}

type Analyser$1_Opts = Opts;
type Analyser$1_DataAnalyser = DataAnalyser;
declare const Analyser$1_basic: typeof basic;
declare const Analyser$1_freq: typeof freq;
declare const Analyser$1_peakLevel: typeof peakLevel;
type Analyser$1_Analyser = Analyser;
declare const Analyser$1_Analyser: typeof Analyser;
declare namespace Analyser$1 {
  export {
    Analyser$1_Opts as Opts,
    Analyser$1_DataAnalyser as DataAnalyser,
    Analyser$1_basic as basic,
    Analyser$1_freq as freq,
    Analyser$1_peakLevel as peakLevel,
    Analyser$1_Analyser as Analyser,
  };
}

declare namespace index {
  export {
    Analyser$1 as Analysers,
    AudioVisualiser as Visualiser,
  };
}

export { Analyser$1 as A, AudioVisualiser as a, index as i };
