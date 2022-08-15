import { S as SimpleEventEmitter, I as ISimpleEventEmitter } from './Events-170d1411.js';
import { a as StateChangeEvent, b as StateMachine } from './StateMachine-d120065d.js';
import { Q as QueueMutable } from './Interfaces-2d05741a.js';
import { C as Continuously } from './index-001fb877.js';
import { N as NumberTracker } from './NumberTracker-43c93cbe.js';
import { a as Point, e as Rect } from './Point-806903b6.js';
import { M as ManualCapturer } from './Video-14c48ea4.js';

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

/**
 * Receives text
 */
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

/**
 * Options for JsonDevice
 */
declare type JsonDeviceOpts = {
    /**
     * How much data to transfer at a time
     */
    readonly chunkSize?: number;
    /**
     * Name of device. This is only used for assisting the console.log output
     */
    readonly name?: string;
    /**
     * Number of times to automatically try to reconnect
     */
    readonly connectAttempts?: number;
    /**
     * If true, additional logging will be done
     */
    readonly debug?: boolean;
};
/**
 * Data received event
 */
declare type JsonDataEvent = {
    /**
     * Data received
     */
    readonly data: string;
};
/**
 * Events emitted by JsonDevice
 */
declare type JsonDeviceEvents = {
    /**
     * Data received
     */
    readonly data: JsonDataEvent;
    /**
     * State changed
     */
    readonly change: StateChangeEvent;
};
declare abstract class JsonDevice extends SimpleEventEmitter<JsonDeviceEvents> {
    states: StateMachine;
    codec: Codec;
    verboseLogging: boolean;
    name: string;
    connectAttempts: number;
    chunkSize: number;
    rxBuffer: StringReceiveBuffer;
    txBuffer: StringWriteBuffer;
    constructor(config?: JsonDeviceOpts);
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

declare type SerialOpts = JsonDeviceOpts & {
    readonly filters?: ReadonlyArray<SerialPortFilter>;
    readonly baudRate?: number;
    /**
     * End-of-line string sequence. \r\n by default.
     */
    readonly eol?: string;
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
    constructor(config?: SerialOpts);
    /**
     * Writes text collected in buffer
     * @param txt
     */
    protected writeInternal(txt: string): Promise<void>;
    onClosed(): void;
    onPreConnect(): Promise<void>;
    onConnectAttempt(): Promise<void>;
}

type Serial_JsonDeviceEvents = JsonDeviceEvents;
type Serial_JsonDeviceOpts = JsonDeviceOpts;
type Serial_JsonDataEvent = JsonDataEvent;
type Serial_SerialOpts = SerialOpts;
type Serial_Device = Device;
declare const Serial_Device: typeof Device;
declare namespace Serial {
  export {
    Serial_JsonDeviceEvents as JsonDeviceEvents,
    Serial_JsonDeviceOpts as JsonDeviceOpts,
    Serial_JsonDataEvent as JsonDataEvent,
    Serial_SerialOpts as SerialOpts,
    Serial_Device as Device,
  };
}

declare type EspruinoSerialDeviceOpts = SerialOpts & {
    readonly evalTimeoutMs?: number;
};
declare class EspruinoSerialDevice extends Device {
    evalTimeoutMs: number;
    evalReplyBluetooth: boolean;
    constructor(opts?: EspruinoSerialDeviceOpts);
    disconnect(): void;
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
 * Instantiates a Puck.js. See {@link EspruinoBleDevice} for more info.
 * @returns Returns a connected instance, or throws exception if user cancelled or could not connect.
 */
declare const puck: (opts?: {
    readonly name?: string;
    readonly debug?: boolean;
}) => Promise<EspruinoBleDevice>;
/**
 * Create a serial-connected Espruino device. See {@link EspruinoSerialDevice} for more info.
 * @param opts
 * @returns Returns a connected instance, or throws exception if user cancelled or could not connect.
 */
declare const serial: (opts?: {
    readonly name?: string;
    readonly debug?: boolean;
    readonly evalTimeoutMs?: number;
}) => Promise<EspruinoSerialDevice>;
/**
 * Connects to a generic Espruino BLE device. See  {@link EspruinoBleDevice} for more info.
 * Use {@link puck} if you're connecting to a Puck.js
 * @returns Returns a connected instance, or throws exception if user cancelled or could not connect.
 */
declare const connectBle: () => Promise<EspruinoBleDevice>;
interface EspruinoDevice extends ISimpleEventEmitter<Events> {
    write(m: string): void;
    writeScript(code: string): void;
    disconnect(): void;
    get evalTimeoutMs(): number;
}
declare const deviceEval: (code: string, opts: EvalOpts | undefined, device: EspruinoDevice, evalReplyPrefix: string, debug: boolean, warn: (m: string) => void) => Promise<string>;

type Espruino_EspruinoBleDevice = EspruinoBleDevice;
declare const Espruino_EspruinoBleDevice: typeof EspruinoBleDevice;
type Espruino_EspruinoSerialDevice = EspruinoSerialDevice;
declare const Espruino_EspruinoSerialDevice: typeof EspruinoSerialDevice;
type Espruino_EspruinoSerialDeviceOpts = EspruinoSerialDeviceOpts;
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
    Espruino_EspruinoBleDevice as EspruinoBleDevice,
    Espruino_EspruinoSerialDevice as EspruinoSerialDevice,
    Espruino_EspruinoSerialDeviceOpts as EspruinoSerialDeviceOpts,
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
    Opts$1 as Opts,
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
/**
 * Constraints when requesting a camera source
 */
declare type Constraints = {
    /**
     * Camera facing: user is front-facing, environment is a rear camera
     */
    readonly facingMode?: `user` | `environment`;
    /**
     * Maximum resolution
     */
    readonly max?: Rect;
    /**
     * Minimum resolution
     */
    readonly min?: Rect;
    /**
     * Ideal resolution
     */
    readonly ideal?: Rect;
    /**
     * If specified, will try to use this media device id
     */
    readonly deviceId?: string;
    /**
     * Number of milliseconds to wait on `getUserMedia` before giving up.
     * Defaults to 30seconds
     */
    readonly startTimeoutMs?: number;
};
/**
 * Result from starting a camera
 */
declare type StartResult = {
    /**
     * Call dispose to stop the camera feed and remove any created resources,
     * such as a VIDEO element
     */
    readonly dispose: () => void;
    /**
     * Video element camera is connected to
     */
    readonly videoEl: HTMLVideoElement;
};
/**
 * Attempts to start a video-only stream from a camera into a hidden
 * VIDEO element for frame capture. The VIDEO element is created automatically.
 *
 *
 * ```js
 * import {Camera} from 'https://unpkg.com/ixfx/dist/visual.js'
 * try
 *  const { videoEl, dispose } = await Camera.start();
 *  for await (const frame of frames(videoEl)) {
 *   // Do something with pixels...
 *  }
 * } catch (ex) {
 *  console.error(`Video could not be started`);
 * }
 * ```
 *
 * Be sure to call the dispose() function to stop the video stream and remov
 * the created VIDEO element.
 *
 * _Constraints_ can be specified to select a camera and resolution:
 * ```js
 * import {Camera} from 'https://unpkg.com/ixfx/dist/visual.js'
 * try
 *  const { videoEl, dispose } = await Camera.start({
 *    facingMode: `environment`,
 *    max: { width: 640, height: 480 }
 *  });
 *  for await (const frame of frames(videoEl)) {
 *   // Do something with pixels...
 *  }
 * } catch (ex) {
 *  console.error(`Video could not be started`);
 * }
 * ```
 * @param constraints
 * @returns Returns `{ videoEl, dispose }`, where `videoEl` is the created VIDEO element, and `dispose` is a function for removing the element and stopping the video.
 */
declare const start: (constraints?: Constraints) => Promise<StartResult>;

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

declare type FrameProcessorOpts = {
    readonly showCanvas?: boolean;
    readonly showPreview?: boolean;
    /**
     * If specified, this function will be called after ImageData is captured
     * from the intermediate canvs. This allows for drawing on top of the
     * captured image.
     */
    readonly postCaptureDraw?: (ctx: CanvasRenderingContext2D, width: number, height: number) => void;
    readonly cameraConstraints?: Constraints;
};
declare class FrameProcessor {
    private _source;
    private _state;
    private _teardownNeeded;
    private _cameraConstraints;
    private _cameraStartResult;
    private _cameraCapture;
    private _showCanvas;
    private _showPreview;
    private _postCaptureDraw;
    private _timer;
    constructor(opts?: FrameProcessorOpts);
    showPreview(enabled: boolean): void;
    showCanvas(enabled: boolean): void;
    getCapturer(): ManualCapturer | undefined;
    useCamera(constraints?: Constraints): Promise<void>;
    private initCamera;
    dispose(): void;
    private init;
    private teardown;
    getFrame(): ImageData | undefined;
    getTimestamp(): number;
    private getFrameCamera;
}

/**
 * Generic support for Bluetooth LE devices
 */

type index_StringReceiveBuffer = StringReceiveBuffer;
declare const index_StringReceiveBuffer: typeof StringReceiveBuffer;
type index_StringWriteBuffer = StringWriteBuffer;
declare const index_StringWriteBuffer: typeof StringWriteBuffer;
type index_Codec = Codec;
declare const index_Codec: typeof Codec;
declare const index_Espruino: typeof Espruino;
declare const index_Camera: typeof Camera;
type index_FrameProcessor = FrameProcessor;
declare const index_FrameProcessor: typeof FrameProcessor;
type index_FrameProcessorOpts = FrameProcessorOpts;
declare const index_Serial: typeof Serial;
declare namespace index {
  export {
    NordicBleDevice$1 as Bluetooth,
    AudioAnalyser$1 as AudioAnalysers,
    AudioVisualiser$1 as AudioVisualisers,
    index_StringReceiveBuffer as StringReceiveBuffer,
    index_StringWriteBuffer as StringWriteBuffer,
    index_Codec as Codec,
    index_Espruino as Espruino,
    index_Camera as Camera,
    index_FrameProcessor as FrameProcessor,
    index_FrameProcessorOpts as FrameProcessorOpts,
    index_Serial as Serial,
  };
}

export { AudioAnalyser$1 as A, Codec as C, Espruino as E, FrameProcessor as F, NordicBleDevice$1 as N, StringReceiveBuffer as S, AudioVisualiser$1 as a, StringWriteBuffer as b, Camera as c, FrameProcessorOpts as d, Serial as e, index as i };
