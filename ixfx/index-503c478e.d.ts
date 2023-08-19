import { S as StateMachineWithEvents, a as StateChangeEvent, T as Transitions } from './StateMachine-0a0aaea7.js';
import { S as SimpleEventEmitter, I as ISimpleEventEmitter } from './Events-b4b55fba.js';
import { Q as QueueMutable } from './index-016f09b1.js';
import { I as Interval, C as Continuously } from './index-e1bed935.js';
import { N as NumberTracker } from './NumberTracker-4ec400fb.js';
import { a as Point, f as Rect } from './Point-acfe68c7.js';
import { M as ManualCapturer } from './Video-02eb65f6.js';

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
    close(): Promise<void>;
    clear(): void;
    writable(): WritableStream<string>;
    private createWritable;
    addImpl(str: string): string;
    add(str: string): void;
}

type Opts$3 = {
    readonly chunkSize?: number;
    readonly interval?: Interval;
};
/**
 * Buffers a queue of strings.
 *
 * When text is queued via {@link add}, it is chopped up
 * into chunks and sent in serial to the `dataHandler` function.
 * Data is processed at a set rate, by default 10ms.
 *
 * ```js
 * const dataHandler = (data:string) => {
 *  // Do something with queued data.
 *  // eg. send to serial port
 * }
 *
 * // Create a buffer with a chunk size of 100 characters
 * const b = new StringWriteBuffer(dataHandler, { chunkSize: 100 });
 * b.add('some text'); // Write to buffer
 * // dataHandler will be called until queued data is empty
 * ```
 *
 * It's also possible to get the buffer as a WritableStream<string>:
 * ```js
 * const dataHandler = (data:string) => { ... }
 * const b = new StringWriteBuffer(dataHandler, 100);
 * const s = b.writable();
 * ```
 *
 * Other functions:
 * ```js
 * b.close(); // Close buffer
 * b.clear(); // Clear queued data, but don't close anything
 * ```
 */
declare class StringWriteBuffer {
    private dataHandler;
    paused: boolean;
    queue: QueueMutable<string>;
    writer: Continuously;
    stream: WritableStream<string> | undefined;
    closed: boolean;
    chunkSize: number;
    /**
     * Constructor
     * @param dataHandler Calback to 'send' data onwards
     * @param chunkSize Size to break up strings
     */
    constructor(dataHandler: (data: string) => Promise<void>, opts?: Opts$3);
    /**
     * Close writer (async)
     */
    close(): Promise<void>;
    /**
     * Clear queued data.
     *
     * Throws an error if {@link close} has been called.
     */
    clear(): void;
    /**
     * Gets the buffer as a writable stream.
     *
     * Do not close stream directly, use .close on this class instead.
     *
     * Throws an error if .close() has been called.
     * @returns Underlying stream
     */
    writable(): WritableStream<string>;
    private createWritable;
    /**
     * Run in a `continunously` loop to process queued data
     * @returns _False_ if queue is empty and loop should stop. _True_ if it shoud continue.
     */
    onWrite(): Promise<boolean>;
    /**
     * Returns _true_ if {@link close} has been called.
     */
    get isClosed(): boolean;
    /**
     * Adds some queued data to send.
     * Longer strings are automatically chunked up according to the buffer's settings.
     *
     * Throws an error if {@link close} has been called.
     * @param str
     */
    add(str: string): void;
}

type Opts$2 = {
    readonly service: string;
    readonly rxGattCharacteristic: string;
    readonly txGattCharacteristic: string;
    readonly chunkSize: number;
    readonly name: string;
    readonly connectAttempts: number;
    readonly debug: boolean;
};
declare class BleDevice extends SimpleEventEmitter<IoEvents<GenericStateTransitions>> {
    private device;
    private config;
    states: StateMachineWithEvents<GenericStateTransitions>;
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
type Opts$1 = {
    readonly chunkSize?: number;
    readonly name?: string;
    readonly connectAttempts?: number;
    readonly debug?: boolean;
};
declare class NordicBleDevice extends BleDevice {
    constructor(device: BluetoothDevice, opts?: Opts$1);
}

type NordicBleDevice$1_NordicBleDevice = NordicBleDevice;
declare const NordicBleDevice$1_NordicBleDevice: typeof NordicBleDevice;
declare const NordicBleDevice$1_defaultOpts: typeof defaultOpts;
declare namespace NordicBleDevice$1 {
  export {
    NordicBleDevice$1_NordicBleDevice as NordicBleDevice,
    Opts$1 as Opts,
    NordicBleDevice$1_defaultOpts as defaultOpts,
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
type Opts = {
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
};
type DataAnalyser = (node: AnalyserNode, analyser: AudioAnalyser) => void;
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

type AudioAnalyser$1_AudioAnalyser = AudioAnalyser;
declare const AudioAnalyser$1_AudioAnalyser: typeof AudioAnalyser;
type AudioAnalyser$1_DataAnalyser = DataAnalyser;
type AudioAnalyser$1_Opts = Opts;
declare const AudioAnalyser$1_basic: typeof basic;
declare const AudioAnalyser$1_freq: typeof freq;
declare const AudioAnalyser$1_peakLevel: typeof peakLevel;
declare namespace AudioAnalyser$1 {
  export {
    AudioAnalyser$1_AudioAnalyser as AudioAnalyser,
    AudioAnalyser$1_DataAnalyser as DataAnalyser,
    AudioAnalyser$1_Opts as Opts,
    AudioAnalyser$1_basic as basic,
    AudioAnalyser$1_freq as freq,
    AudioAnalyser$1_peakLevel as peakLevel,
  };
}

/**
 * An Espruino BLE-connection
 *
 * See [online demos](https://clinth.github.io/ixfx-demos/io/)
 *
 * Use the `puck` function to initialise and connect to a Puck.js.
 * It must be called in a UI event handler for browser security reasons.
 *
 * ```js
 * import { Espruino } from 'https://unpkg.com/ixfx/dist/io.js'
 * const e = await Espruino.puck();
 * ```
 *
 * To connect to a particular device:
 *
 * ```js
 * import { Espruino } from 'https://unpkg.com/ixfx/dist/io.js'
 * const e = await Espruino.puck({name:`Puck.js a123`});
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
     *  debug: If true, execution is traced via `warn` callback
     * @param code Code to run on the Espruino.
     * @param opts Options
     * @param warn Function to pass warning/trace messages to. If undefined, this.warn is used, printing to console.
     */
    eval(code: string, opts?: EvalOpts, warn?: (msg: string) => void): Promise<string>;
}

/**
 * Options for JsonDevice
 */
type JsonDeviceOpts = {
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
type JsonDataEvent = {
    /**
     * Data received
     */
    readonly data: string;
};
/**
 * Events emitted by JsonDevice
 */
type JsonDeviceEvents = {
    /**
     * Data received
     */
    readonly data: JsonDataEvent;
    /**
     * State changed
     */
    readonly change: StateChangeEvent<GenericStateTransitions>;
};
declare abstract class JsonDevice extends SimpleEventEmitter<JsonDeviceEvents> {
    states: StateMachineWithEvents<GenericStateTransitions>;
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
    close(): Promise<void>;
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

type SerialOpts = JsonDeviceOpts & {
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
    abort: AbortController;
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

type Serial_Device = Device;
declare const Serial_Device: typeof Device;
type Serial_JsonDataEvent = JsonDataEvent;
type Serial_JsonDeviceEvents = JsonDeviceEvents;
type Serial_JsonDeviceOpts = JsonDeviceOpts;
type Serial_SerialOpts = SerialOpts;
declare namespace Serial {
  export {
    Serial_Device as Device,
    Serial_JsonDataEvent as JsonDataEvent,
    Serial_JsonDeviceEvents as JsonDeviceEvents,
    Serial_JsonDeviceOpts as JsonDeviceOpts,
    Serial_SerialOpts as SerialOpts,
  };
}

type EspruinoSerialDeviceOpts = SerialOpts & {
    readonly evalTimeoutMs?: number;
};
declare class EspruinoSerialDevice extends Device {
    evalTimeoutMs: number;
    evalReplyBluetooth: boolean;
    constructor(opts?: EspruinoSerialDeviceOpts);
    disconnect(): Promise<void>;
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
     *  assumeExclusive: If true, eval assumes all replies from controller are in response to eval. True by default
     *  debug: If true, execution is traced via `warn` callback
     * @param code Code to run on the Espruino.
     * @param opts Options
     * @param warn Function to pass warning/trace messages to. If undefined, this.warn is used, printing to console.
     */
    eval(code: string, opts?: EvalOpts, warn?: (msg: string) => void): Promise<string>;
}

type EspruinoStates = `ready` | `connecting` | `connected` | `closed` | `closing` | `connecting`;
/**
 * Options for device
 */
type Options = {
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
type EvalOpts = {
    /**
     * Milliseconds to wait before giving up on well-formed reply. 5 seconds is the default.
     */
    readonly timeoutMs?: number;
    /**
     * If true (default), it assumes that anything received from the board
     * is a response to the eval
     */
    readonly assumeExclusive?: boolean;
    /**
     * If true, executed code is traced
     */
    readonly debug?: boolean;
};
type EspruinoBleOpts = {
    /**
     * If the name is specified, this value is used
     * for filtering Bluetooth devices
     */
    readonly name?: string;
    /**
     * If true, additional logging messages are
     * displayed on the console
     */
    readonly debug?: boolean;
    /**
     * If specified, these filtering options are used instead
     */
    readonly filters?: readonly BluetoothLEScanFilter[];
};
/**
 * Instantiates a Puck.js. See {@link EspruinoBleDevice} for more info.
 * [Online demos](https://clinth.github.io/ixfx-demos/io/)
 *
 * If `opts.name` is specified, this will the the Bluetooth device sought.
 *
 * ```js
 * import { Espruino } from 'https://unpkg.com/ixfx/dist/io.js'
 * const e = await Espruino.puck({ name:`Puck.js a123` });
 * ```
 *
 * If no name is specified, a list of all devices starting with `Puck.js` are shown.
 *
 * To get more control over filtering, pass in `opts.filter`. `opts.name` is not used as a filter in this scenario.
 *
 * ```js
 * import { Espruino } from 'https://unpkg.com/ixfx/dist/io.js'
 * const filters = [
 *  { namePrefix: `Puck.js` },
 *  { namePrefix: `Pixl.js` },
 *  {services: [NordicDefaults.service] }
 * ]
 * const e = await Espruino.puck({ filters });
 * ```
 *
 * @returns Returns a connected instance, or throws exception if user cancelled or could not connect.
 */
declare const puck: (opts?: EspruinoBleOpts) => Promise<EspruinoBleDevice>;
/**
 * Create a serial-connected Espruino device.
 *
 * ```js
 * import { Espruino } from 'https://unpkg.com/ixfx/dist/io.js'
 * const e = await Espruio.serial();
 * e.connect();
 * ```
 *
 * Options:
 * ```js
 * import { Espruino } from 'https://unpkg.com/ixfx/dist/io.js'
 * const e = await Espruino.serial({ debug: true, evalTimeoutMs: 1000, name: `My Pico` });
 * e.connect();
 * ```
 *
 * Listen for events:
 * ```js
 * e.addEventListener(`change`, evt => {
 *  console.log(`State change ${evt.priorState} -> ${evt.newState}`);
 *  if (evt.newState === `connected`) {
 *    // Do something when connected...
 *  }
 * });
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
 *
 * If `opts.name` is specified, only this BLE device will be shown.
 * ```js
 * const e = await connectBle({ name: `Puck.js a123` });
 * ```
 *
 * `opts.filters` overrides and sets arbitary filters.
 *
 * ```js
 * import { Espruino } from 'https://unpkg.com/ixfx/dist/io.js'
 * const filters = [
 *  { namePrefix: `Puck.js` },
 *  { namePrefix: `Pixl.js` },
 *  {services: [NordicDefaults.service] }
 * ]
 * const e = await Espruino.connectBle({ filters });
 * ```
 *
 * @returns Returns a connected instance, or throws exception if user cancelled or could not connect.
 */
declare const connectBle: (opts?: EspruinoBleOpts) => Promise<EspruinoBleDevice>;
/**
 * EspruinoDevice
 *
 * This base interface is implemented by {@link EspruinoBleDevice} and {@link EspruinoSerialDevice}.
 */
interface EspruinoDevice extends ISimpleEventEmitter<IoEvents<GenericStateTransitions>> {
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
     *  debug: If true, execution is traced via `warn` callback
     * @param code Code to run on the Espruino.
     * @param opts Options
     * @param warn Function to pass warning/trace messages to. If undefined, this.warn is used, printing to console.
     */
    eval(code: string, opts?: EvalOpts, warn?: (msg: string) => void): Promise<string>;
    /**
     * Write some code for immediate execution. This is a lower-level
     * alternative to {@link writeScript}. Be sure to include a new line character '\n' at the end.
     * @param m Code
     */
    write(m: string): void;
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
     * espruino.writeScript(`
     *  setInterval(() => Bluetooth.println(E.getTemperature()), 1000);
     *  NRF.on('disconnect',()=>reset());
     * `);
     * ```
     *
     * @param code Code to send. A new line is added automatically.
     */
    writeScript(code: string): void;
    /**
     * Disconnect
     */
    disconnect(): void;
    /**
     * Gets the current evaluation (millis)
     */
    get evalTimeoutMs(): number;
    get isConnected(): boolean;
}
/**
 * Evaluates some code on an Espruino device.
 *
 * Options:
 * * timeoutMs: how many millis to wait before assuming code failed. If not specified, `device.evalTimeoutMs` is used as a default.
 * * assumeExlusive: assume device is not producing any other output than for our evaluation
 *
 * A random string is created to pair eval requests and responses. `code` will be run on the device, with the result
 * wrapped in JSON, and in turn wrapped in a object that is sent back.
 *
 * The actual code that gets sent to the device is then:
 * `\x10${evalReplyPrefix}(JSON.stringify({reply:"${id}", result:JSON.stringify(${code})}))\n`
 *
 * For example, it might end up being:
 * `\x10Bluetooth.println(JSON.stringify({reply: "a35gP", result: "{ 'x': '10' }" }))\n`
 *
 * @param code Code to evaluation
 * @param opts Options for evaluation
 * @param device Device to execute on
 * @param evalReplyPrefix How to send code back (eg `Bluetooth.println`, `console.log`)
 * @param debug If true, the full evaled code is printed locally to the console
 * @param warn Callback to display warnings
 * @returns
 */
declare const deviceEval: (code: string, opts: EvalOpts | undefined, device: EspruinoDevice, evalReplyPrefix: string, debug: boolean, warn: (m: string) => void) => Promise<string>;

type Espruino_EspruinoBleDevice = EspruinoBleDevice;
declare const Espruino_EspruinoBleDevice: typeof EspruinoBleDevice;
type Espruino_EspruinoBleOpts = EspruinoBleOpts;
type Espruino_EspruinoDevice = EspruinoDevice;
type Espruino_EspruinoSerialDevice = EspruinoSerialDevice;
declare const Espruino_EspruinoSerialDevice: typeof EspruinoSerialDevice;
type Espruino_EspruinoSerialDeviceOpts = EspruinoSerialDeviceOpts;
type Espruino_EspruinoStates = EspruinoStates;
type Espruino_EvalOpts = EvalOpts;
type Espruino_Options = Options;
declare const Espruino_connectBle: typeof connectBle;
declare const Espruino_deviceEval: typeof deviceEval;
declare const Espruino_puck: typeof puck;
declare const Espruino_serial: typeof serial;
declare namespace Espruino {
  export {
    Espruino_EspruinoBleDevice as EspruinoBleDevice,
    Espruino_EspruinoBleOpts as EspruinoBleOpts,
    Espruino_EspruinoDevice as EspruinoDevice,
    Espruino_EspruinoSerialDevice as EspruinoSerialDevice,
    Espruino_EspruinoSerialDeviceOpts as EspruinoSerialDeviceOpts,
    Espruino_EspruinoStates as EspruinoStates,
    Espruino_EvalOpts as EvalOpts,
    Espruino_Options as Options,
    Espruino_connectBle as connectBle,
    Espruino_deviceEval as deviceEval,
    Espruino_puck as puck,
    Espruino_serial as serial,
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
type Constraints = {
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
type StartResult$1 = {
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
declare const start$1: (constraints?: Constraints) => Promise<StartResult$1>;

type Camera_Constraints = Constraints;
declare const Camera_dumpDevices: typeof dumpDevices;
declare namespace Camera {
  export {
    Camera_Constraints as Constraints,
    StartResult$1 as StartResult,
    Camera_dumpDevices as dumpDevices,
    start$1 as start,
  };
}

/**
 * Result from starting a camera
 */
type StartResult = {
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
 * Starts video file playback, creating a VIDEO element automatically.
 * @param file File
 * @returns StartResult
 */
declare const start: (file: File) => Promise<StartResult>;

type VideoFile_StartResult = StartResult;
declare const VideoFile_start: typeof start;
declare namespace VideoFile {
  export {
    VideoFile_StartResult as StartResult,
    VideoFile_start as start,
  };
}

/**
 * Frame procesor options
 */
type FrameProcessorOpts = {
    /**
     * If true, capture canvas will be shown
     */
    readonly showCanvas?: boolean;
    /**
     * If true, raw source will be shown
     */
    readonly showPreview?: boolean;
    /**
     * If specified, this function will be called after ImageData is captured
     * from the intermediate canvs. This allows for drawing on top of the
     * captured image.
     */
    readonly postCaptureDraw?: (ctx: CanvasRenderingContext2D, width: number, height: number) => void;
    /**
     * Default constraints to use for the camera source
     */
    readonly cameraConstraints?: Constraints;
    /**
     * If specified, this canvas will be used for capturing frames to
     */
    readonly captureCanvasEl?: HTMLCanvasElement;
};
/**
 * Frame Processor
 * Simplifies grabbing frames from a source
 */
declare class FrameProcessor {
    private _source;
    private _state;
    private _teardownNeeded;
    private _cameraConstraints;
    private _cameraStartResult;
    private _videoSourceCapture;
    private _videoFile;
    private _videoStartResult;
    private _showCanvas;
    private _showPreview;
    private _postCaptureDraw;
    private _timer;
    private _captureCanvasEl?;
    /**
     * Create a new frame processor
     * @param opts
     */
    constructor(opts?: FrameProcessorOpts);
    /**
     * Hides or shows the raw source in the DOM
     * @param enabled Preview enabled
     */
    showPreview(enabled: boolean): void;
    /**
     * Shows or hides the Canvas we're capturing to
     * @param enabled
     */
    showCanvas(enabled: boolean): void;
    /**
     * Returns the current capturer instance
     * @returns
     */
    getCapturer(): ManualCapturer | undefined;
    /**
     * Grab frames from a video camera source and initialises
     * frame processor.
     *
     * If `constraints` are not specified, it will use the ones
     * provided when creating the class, or defaults.
     *
     * @param constraints Override of constraints when requesting camera access
     */
    useCamera(constraints?: Constraints): Promise<void>;
    useVideo(file: File): Promise<void>;
    /**
     * Initialises camera
     */
    private initCamera;
    private initVideo;
    private postInit;
    /**
     * Closes down connections and removes created elements.
     * Once disposed, the frame processor cannot be used
     * @returns
     */
    dispose(): void;
    private init;
    private teardown;
    /**
     * Get the last frame
     * @returns
     */
    getFrame(): ImageData | undefined;
    /**
     * Get the timestamp of the processor (elapsed time since starting)
     * @returns
     */
    getTimestamp(): number;
    private getFrameCamera;
}

type IoDataEvent = {
    readonly data: string;
};
type IoEvents<StateMachineTransitions extends Transitions> = {
    readonly data: IoDataEvent;
    readonly change: StateChangeEvent<StateMachineTransitions>;
};
declare const genericStateTransitionsInstance: Readonly<{
    ready: "connecting";
    connecting: string[];
    connected: string[];
    closed: "connecting";
}>;
type GenericStateTransitions = Readonly<typeof genericStateTransitionsInstance>;

declare const index_Camera: typeof Camera;
type index_Codec = Codec;
declare const index_Codec: typeof Codec;
declare const index_Espruino: typeof Espruino;
type index_FrameProcessor = FrameProcessor;
declare const index_FrameProcessor: typeof FrameProcessor;
type index_FrameProcessorOpts = FrameProcessorOpts;
type index_GenericStateTransitions = GenericStateTransitions;
type index_IoDataEvent = IoDataEvent;
type index_IoEvents<StateMachineTransitions extends Transitions> = IoEvents<StateMachineTransitions>;
declare const index_Serial: typeof Serial;
declare const index_StateChangeEvent: typeof StateChangeEvent;
type index_StringReceiveBuffer = StringReceiveBuffer;
declare const index_StringReceiveBuffer: typeof StringReceiveBuffer;
type index_StringWriteBuffer = StringWriteBuffer;
declare const index_StringWriteBuffer: typeof StringWriteBuffer;
declare const index_VideoFile: typeof VideoFile;
declare const index_genericStateTransitionsInstance: typeof genericStateTransitionsInstance;
declare namespace index {
  export {
    AudioAnalyser$1 as AudioAnalysers,
    AudioVisualiser$1 as AudioVisualisers,
    NordicBleDevice$1 as Bluetooth,
    index_Camera as Camera,
    index_Codec as Codec,
    index_Espruino as Espruino,
    index_FrameProcessor as FrameProcessor,
    index_FrameProcessorOpts as FrameProcessorOpts,
    index_GenericStateTransitions as GenericStateTransitions,
    index_IoDataEvent as IoDataEvent,
    index_IoEvents as IoEvents,
    index_Serial as Serial,
    index_StateChangeEvent as StateChangeEvent,
    index_StringReceiveBuffer as StringReceiveBuffer,
    index_StringWriteBuffer as StringWriteBuffer,
    Opts$3 as StringWriteBufferOpts,
    index_VideoFile as VideoFile,
    index_genericStateTransitionsInstance as genericStateTransitionsInstance,
  };
}

export { AudioAnalyser$1 as A, Codec as C, Espruino as E, FrameProcessor as F, GenericStateTransitions as G, IoDataEvent as I, NordicBleDevice$1 as N, Opts$3 as O, StringReceiveBuffer as S, VideoFile as V, IoEvents as a, AudioVisualiser$1 as b, StringWriteBuffer as c, Camera as d, FrameProcessorOpts as e, Serial as f, genericStateTransitionsInstance as g, index as i };
