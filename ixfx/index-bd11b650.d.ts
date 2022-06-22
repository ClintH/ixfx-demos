import { S as SimpleEventEmitter, I as ISimpleEventEmitter } from './Events-5892cf2f.js';
import { S as StateMachine, a as StateChangeEvent } from './StateMachine-6f935f55.js';
import { Q as QueueMutable } from './Interfaces-36f9800e.js';
import { C as Continuously } from './Timer-504c3588.js';
import { N as NumberTracker } from './NumberTracker-ca33f3b6.js';
import { P as Point, e as Rect } from './Point-9785f83e.js';

/**
 * Handles utf-8 text encoding/decoding
 */
declare class Codec {
    enc: TextEncoder;
    dec: TextDecoder;
    /**
     * Convert string to Uint8Array buffer
     * @param str
     * @returns
     */
    toBuffer(str: string): Uint8Array;
    /**
     * Returns a string from a provided buffer
     * @param buffer
     * @returns
     */
    fromBuffer(buffer: ArrayBuffer): string;
}

declare class StringReceiveBuffer {
    private onData;
    separator: string;
    buffer: string;
    stream: WritableStream<string> | undefined;
    constructor(onData: (data: string) => void, separator?: string);
    clear(): void;
    writable(): WritableStream<string>;
    private createWritable;
    addImpl(str: string): string;
    add(str: string): void;
}

declare class StringWriteBuffer {
    private onData;
    private chunkSize;
    paused: boolean;
    queue: QueueMutable<string>;
    writer: Continuously;
    intervalMs: number;
    stream: WritableStream<string> | undefined;
    constructor(onData: (data: string) => Promise<void>, chunkSize?: number);
    clear(): void;
    writable(): WritableStream<string>;
    private createWritable;
    onWrite(): Promise<boolean>;
    add(str: string): void;
}

/**
 * An Espruino BLE-connection
 *
 * Use the `puck` function to initialise and connect to a Puck.js.
 * It must be called in a UI event handler for browser security reasons.
 *
 * ```js
 * const e = await puck();
 * ```
 *
 * Listen for events:
 * ```js
 * // Received something
 * e.addEventListener(`data`, d => console.log(d.data));
 * // Monitor connection state
 * e.addEventListener(`change`, c => console.log(`${d.priorState} -> ${d.newState}`));
 * ```
 *
 * Write to the device (note the \n for a new line at the end of the string). This will
 * execute the code on the Espruino.
 *
 * ```js
 * e.write(`digitalPulse(LED1,1,[10,500,10,500,10]);\n`);
 * ```
 *
 * Run some code and return result:
 * ```js
 * const result = await e.eval(`2+2\n`);
 * ```
 */
declare class EspruinoBleDevice extends NordicBleDevice {
    evalTimeoutMs: number;
    evalReplyBluetooth: boolean;
    /**
     * Creates instance. You probably would rather use {@link puck} to create.
     * @param device
     * @param opts
     */
    constructor(device: BluetoothDevice, opts?: Options);
    /**
     * Writes a script to Espruino.
     *
     * It will first send a CTRL+C to cancel any previous input, `reset()` to clear the board,
     * and then the provided `code` followed by a new line.
     *
     * Use {@link eval} instead to execute remote code and get the result back.
     *
     * ```js
     * // Eg from https://www.espruino.com/Web+Bluetooth
     * writeScript(`
     *  setInterval(() => Bluetooth.println(E.getTemperature()), 1000);
     *  NRF.on('disconnect',()=>reset());
     * `);
     * ```
     *
     * @param code Code to send. A new line is added automatically.
     */
    writeScript(code: string): Promise<void>;
    /**
     * Sends some code to be executed on the Espruino. The result
     * is packaged into JSON and sent back to your code. An exception is
     * thrown if code can't be executed for some reason.
     *
     * ```js
     * const sum = await e.eval(`2+2`);
     * ```
     *
     * It will wait for a period of time for a well-formed response from the
     * Espruino. This might not happen if there is a connection problem
     * or a syntax error in the code being evaled. In cases like the latter,
     * it will take up to `timeoutMs` (default 5 seconds) before we give up
     * waiting for a correct response and throw an error.
     *
     * Tweaking of the timeout may be required if `eval()` is giving up too quickly
     * or too slowly. A default timeout can be given when creating the class.
     *
     * Options:
     *  timeoutMs: Timeout for execution. 5 seconds by default
     *  assumeExclusive If true, eval assumes all replies from controller are in response to eval. True by default
     * @param code Code to run on the Espruino.
     * @param opts Options
     */
    eval(code: string, opts?: EvalOpts): Promise<string>;
}

declare type Opts$5 = {
    readonly chunkSize?: number;
    readonly name?: string;
    readonly connectAttempts?: number;
    readonly debug?: boolean;
};
declare type DataEvent$1 = {
    readonly data: string;
};
declare type Events$1 = {
    readonly data: DataEvent$1;
    readonly change: StateChangeEvent;
};
declare abstract class JsonDevice extends SimpleEventEmitter<Events$1> {
    states: StateMachine;
    codec: Codec;
    verboseLogging: boolean;
    name: string;
    connectAttempts: number;
    chunkSize: number;
    rxBuffer: StringReceiveBuffer;
    txBuffer: StringWriteBuffer;
    constructor(config?: Opts$5);
    get isConnected(): boolean;
    get isClosed(): boolean;
    write(txt: string): void;
    /**
     * Writes text to output device
     * @param txt
     */
    protected abstract writeInternal(txt: string): void;
    close(): void;
    /**
     * Must change state
     */
    abstract onClosed(): void;
    abstract onPreConnect(): Promise<void>;
    connect(): Promise<void>;
    /**
     * Should throw if did not succeed.
     */
    protected abstract onConnectAttempt(): Promise<void>;
    private onRx;
    protected verbose(m: string): void;
    protected log(m: string): void;
    protected warn(m: unknown): void;
}

declare type Opts$4 = Opts$5 & {
    readonly filters?: ReadonlyArray<SerialPortFilter>;
    readonly baudRate?: number;
};
/**
 * Serial device. Assumes data is sent with new line characters (\r\n) between messages.
 *
 * ```
 * const s = new Device();
 * s.addEventListener(`change`, evt => {
 *  console.log(`State change ${evt.priorState} -> ${evt.newState}`);
 *  if (evt.newState === `connected`) {
 *    // Do something when connected...
 *  }
 * });
 *
 * // In a UI event handler...
 * s.connect();
 * ```
 *
 * Reading incoming data:
 * ```
 * // Parse incoming data as JSON
 * s.addEventListener(`data`, evt => {
 *  try {
 *    const o = JSON.parse(evt.data);
 *    // If we get this far, JSON is legit
 *  } catch (ex) {
 *  }
 * });
 * ```
 *
 * Writing to the microcontroller
 * ```
 * s.write(JSON.stringify({msg:"hello"}));
 * ```
 */
declare class Device extends JsonDevice {
    private config;
    port: SerialPort | undefined;
    tx: WritableStreamDefaultWriter<string> | undefined;
    baudRate: number;
    constructor(config?: Opts$4);
    /**
     * Writes text collected in buffer
     * @param txt
     */
    protected writeInternal(txt: string): Promise<void>;
    onClosed(): void;
    onPreConnect(): Promise<void>;
    onConnectAttempt(): Promise<void>;
}

type Serial_Device = Device;
declare const Serial_Device: typeof Device;
declare namespace Serial {
  export {
    Opts$4 as Opts,
    Serial_Device as Device,
  };
}

declare type Opts$3 = Opts$4 & {
    readonly evalTimeoutMs?: number;
};
declare class EspruinoSerialDevice extends Device {
    evalTimeoutMs: number;
    evalReplyBluetooth: boolean;
    constructor(opts?: Opts$3);
    /**
     * Writes a script to Espruino.
     *
     * It will first send a CTRL+C to cancel any previous input, `reset()` to clear the board,
     * and then the provided `code` followed by a new line.
     *
     * Use {@link eval} instead to execute remote code and get the result back.
     *
     * ```js
     * // Eg from https://www.espruino.com/Web+Bluetooth
     * writeScript(`
     *  setInterval(() => Bluetooth.println(E.getTemperature()), 1000);
     *  NRF.on('disconnect',()=>reset());
     * `);
     * ```
     *
     * @param code Code to send. A new line is added automatically.
     */
    writeScript(code: string): Promise<void>;
    /**
     * Sends some code to be executed on the Espruino. The result
     * is packaged into JSON and sent back to your code. An exception is
     * thrown if code can't be executed for some reason.
     *
     * ```js
     * const sum = await e.eval(`2+2`);
     * ```
     *
     * It will wait for a period of time for a well-formed response from the
     * Espruino. This might not happen if there is a connection problem
     * or a syntax error in the code being evaled. In cases like the latter,
     * it will take up to `timeoutMs` (default 5 seconds) before we give up
     * waiting for a correct response and throw an error.
     *
     * Tweaking of the timeout may be required if `eval()` is giving up too quickly
     * or too slowly. A default timeout can be given when creating the class.
     *
     * Options:
     *  timeoutMs: Timeout for execution. 5 seconds by default
     *  assumeExclusive If true, eval assumes all replies from controller are in response to eval. True by default
     * @param code Code to run on the Espruino.
     * @param opts Options
     */
    eval(code: string, opts?: EvalOpts): Promise<string>;
}

declare type DataEvent = {
    readonly data: string;
};
declare type Events = {
    readonly data: DataEvent;
    readonly change: StateChangeEvent;
};
/**
 * Options for device
 */
declare type Options = {
    /**
     * Default milliseconds to wait before giving up on a well-formed reply. 5 seconds is the default.
     */
    readonly evalTimeoutMs?: number;
    /**
     * Name of device. Only used for printing log mesages to the console
     */
    readonly name?: string;
    /**
     * If true, additional logging information is printed
     */
    readonly debug?: boolean;
};
/**
 * Options for code evaluation
 */
declare type EvalOpts = {
    /**
     * Milliseconds to wait before giving up on well-formed reply. 5 seconds is the default.
     */
    readonly timeoutMs?: number;
    /**
     * If true (default), it assumes that anything received from the board
     * is a response to the eval
     */
    readonly assumeExclusive?: boolean;
};
/**
 * @inheritdoc EspruinoBleDevice
 * @returns Returns a connected instance, or throws exception if user cancelled or could not connect.
 */
declare const puck: (opts?: {
    readonly name?: string;
    readonly debug?: boolean;
}) => Promise<EspruinoBleDevice>;
/**
 * @inheritdoc EspruinoSerialDevice
 * @param opts
 * @returns Returns a connected instance, or throws exception if user cancelled or could not connect.
 */
declare const serial: (opts?: {
    readonly name?: string;
    readonly debug?: boolean;
    readonly evalTimeoutMs?: number;
}) => Promise<EspruinoSerialDevice>;
/**
 * @inheritdoc EspruinoDevice
 * @returns Returns a connected instance, or throws exception if user cancelled or could not connect.
 */
declare const connectBle: () => Promise<EspruinoBleDevice>;
interface EspruinoDevice extends ISimpleEventEmitter<Events> {
    write(m: string): void;
    get evalTimeoutMs(): number;
}
declare const deviceEval: (code: string, opts: EvalOpts | undefined, device: EspruinoDevice, evalReplyPrefix: string, debug: boolean, warn: (m: string) => void) => Promise<string>;

type Espruino_DataEvent = DataEvent;
type Espruino_Events = Events;
type Espruino_Options = Options;
type Espruino_EvalOpts = EvalOpts;
declare const Espruino_puck: typeof puck;
declare const Espruino_serial: typeof serial;
declare const Espruino_connectBle: typeof connectBle;
type Espruino_EspruinoDevice = EspruinoDevice;
declare const Espruino_deviceEval: typeof deviceEval;
declare namespace Espruino {
  export {
    Espruino_DataEvent as DataEvent,
    Espruino_Events as Events,
    Espruino_Options as Options,
    Espruino_EvalOpts as EvalOpts,
    Espruino_puck as puck,
    Espruino_serial as serial,
    Espruino_connectBle as connectBle,
    Espruino_EspruinoDevice as EspruinoDevice,
    Espruino_deviceEval as deviceEval,
  };
}

declare type Opts$2 = {
    readonly service: string;
    readonly rxGattCharacteristic: string;
    readonly txGattCharacteristic: string;
    readonly chunkSize: number;
    readonly name: string;
    readonly connectAttempts: number;
    readonly debug: boolean;
};
declare class BleDevice extends SimpleEventEmitter<Events> {
    private device;
    private config;
    states: StateMachine;
    codec: Codec;
    rx: BluetoothRemoteGATTCharacteristic | undefined;
    tx: BluetoothRemoteGATTCharacteristic | undefined;
    gatt: BluetoothRemoteGATTServer | undefined;
    verboseLogging: boolean;
    rxBuffer: StringReceiveBuffer;
    txBuffer: StringWriteBuffer;
    constructor(device: BluetoothDevice, config: Opts$2);
    get isConnected(): boolean;
    get isClosed(): boolean;
    write(txt: string): void;
    private writeInternal;
    disconnect(): void;
    connect(): Promise<void>;
    private onRx;
    protected verbose(m: string): void;
    protected log(m: string): void;
    protected warn(m: unknown): void;
}

declare const defaultOpts: {
    chunkSize: number;
    service: string;
    txGattCharacteristic: string;
    rxGattCharacteristic: string;
    name: string;
    connectAttempts: number;
    debug: boolean;
};
declare type Opts$1 = {
    readonly chunkSize?: number;
    readonly name?: string;
    readonly connectAttempts?: number;
    readonly debug?: boolean;
};
declare class NordicBleDevice extends BleDevice {
    constructor(device: BluetoothDevice, opts?: Opts$1);
}

declare const NordicBleDevice$1_defaultOpts: typeof defaultOpts;
type NordicBleDevice$1_NordicBleDevice = NordicBleDevice;
declare const NordicBleDevice$1_NordicBleDevice: typeof NordicBleDevice;
declare namespace NordicBleDevice$1 {
  export {
    NordicBleDevice$1_defaultOpts as defaultOpts,
    NordicBleDevice$1_NordicBleDevice as NordicBleDevice,
  };
}

declare class AudioVisualiser {
    freqMaxRange: number;
    audio: AudioAnalyser;
    parent: HTMLElement;
    lastPointer: Point;
    pointerDown: boolean;
    pointerClicking: boolean;
    pointerClickDelayMs: number;
    pointerDelaying: boolean;
    waveTracker: NumberTracker;
    freqTracker: NumberTracker;
    el: HTMLElement;
    constructor(parentElem: HTMLElement, audio: AudioAnalyser);
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

declare namespace AudioVisualiser$1 {
  export {
    AudioVisualiser as default,
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
declare type DataAnalyser = (node: AnalyserNode, analyser: AudioAnalyser) => void;
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
declare const basic: (onData: (freq: Float32Array, wave: Float32Array, analyser: AudioAnalyser) => void, opts?: Opts) => AudioAnalyser;
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
declare const freq: (onData: (freq: Float32Array, analyser: AudioAnalyser) => void, opts?: Opts) => AudioAnalyser;
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
declare const peakLevel: (onData: (level: number, analyser: AudioAnalyser) => void, opts?: Opts) => AudioAnalyser;
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
declare class AudioAnalyser {
    #private;
    showVis: boolean;
    fftSize: number;
    smoothingTimeConstant: number;
    debug: boolean;
    visualiser: AudioVisualiser | undefined;
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

type AudioAnalyser$1_Opts = Opts;
type AudioAnalyser$1_DataAnalyser = DataAnalyser;
declare const AudioAnalyser$1_basic: typeof basic;
declare const AudioAnalyser$1_freq: typeof freq;
declare const AudioAnalyser$1_peakLevel: typeof peakLevel;
type AudioAnalyser$1_AudioAnalyser = AudioAnalyser;
declare const AudioAnalyser$1_AudioAnalyser: typeof AudioAnalyser;
declare namespace AudioAnalyser$1 {
  export {
    AudioAnalyser$1_Opts as Opts,
    AudioAnalyser$1_DataAnalyser as DataAnalyser,
    AudioAnalyser$1_basic as basic,
    AudioAnalyser$1_freq as freq,
    AudioAnalyser$1_peakLevel as peakLevel,
    AudioAnalyser$1_AudioAnalyser as AudioAnalyser,
  };
}

/**
 * Print available media devices to console
 * @param filterKind Defaults `videoinput`
 */
declare const dumpDevices: (filterKind?: string) => Promise<void>;
declare type Constraints = {
    readonly facingMode?: `user` | `environment`;
    readonly max?: Rect;
    readonly min?: Rect;
};
declare type StartResult = {
    readonly dispose: () => void;
    readonly videoEl: HTMLVideoElement;
};
/**
 * Attempts to start a video-only stream from a camera into a hidden
 * VIDEO element for frame capture. The VIDEO element is created automatically.
 *
 *
 * ```
 * import { frames } from 'visual.js';
 * try
 *  const { videoEl, dispose } = await start();
 *  for await (const frame of frames(videoEl)) {
 *   // Do something with pixels...
 *  }
 * } catch (ex) {
 *  console.error(`Video could not be started`);
 * }
 * ```
 *
 * Be sure to call the dispose() function to stop the video stream and remove the created VIDEO element.
 *
 * @param constraints
 * @returns Returns {videoEl,dispose}, where videoEl is the created VIDEO element, and dispose is a function for removing the element and stopping the video.
 */
declare const start: (constraints?: Constraints) => Promise<StartResult | undefined>;

declare const Camera_dumpDevices: typeof dumpDevices;
type Camera_Constraints = Constraints;
type Camera_StartResult = StartResult;
declare const Camera_start: typeof start;
declare namespace Camera {
  export {
    Camera_dumpDevices as dumpDevices,
    Camera_Constraints as Constraints,
    Camera_StartResult as StartResult,
    Camera_start as start,
  };
}

/**
 * Generic support for Bluetooth LE devices
 */

declare const index_Espruino: typeof Espruino;
declare const index_Camera: typeof Camera;
declare const index_Serial: typeof Serial;
declare namespace index {
  export {
    NordicBleDevice$1 as Bluetooth,
    AudioAnalyser$1 as AudioAnalysers,
    AudioVisualiser$1 as AudioVisualisers,
    index_Espruino as Espruino,
    index_Camera as Camera,
    index_Serial as Serial,
  };
}

export { AudioAnalyser$1 as A, Camera as C, Espruino as E, NordicBleDevice$1 as N, Serial as S, AudioVisualiser$1 as a, index as i };
