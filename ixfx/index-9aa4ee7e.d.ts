import { S as SimpleEventEmitter } from './Events-d728150d.js';
import { S as StateMachine, a as StateChangeEvent } from './StateMachine-631114de.js';
import { Q as QueueMutable } from './Interfaces-f2faa339.js';
import { C as Continuously } from './Timer-7b853923.js';
import { e as Rect } from './Rect-afd5c0f2.js';

declare class Codec {
    enc: TextEncoder;
    dec: TextDecoder;
    toBuffer(str: string): Uint8Array;
    fromBuffer(buffer: ArrayBuffer): string;
}

declare class StringReceiveBuffer {
    private onData;
    private separator;
    buffer: string;
    constructor(onData: (data: string) => void, separator?: string);
    clear(): void;
    add(str: string): void;
}

declare class StringWriteBuffer {
    private onData;
    private chunkSize;
    paused: boolean;
    queue: QueueMutable<string>;
    writer: Continuously;
    intervalMs: number;
    constructor(onData: (data: string) => Promise<void>, chunkSize?: number);
    clear(): void;
    onWrite(): Promise<boolean>;
    add(str: string): void;
}

declare type Opts$1 = {
    readonly service: string;
    readonly rxGattCharacteristic: string;
    readonly txGattCharacteristic: string;
    readonly chunkSize: number;
    readonly name: string;
    readonly connectAttempts: number;
    readonly debug: boolean;
};
declare type DataEvent = {
    readonly data: string;
};
declare type Events = {
    readonly data: DataEvent;
    readonly change: StateChangeEvent;
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
    constructor(device: BluetoothDevice, config: Opts$1);
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
declare type Opts = {
    readonly chunkSize?: number;
    readonly name?: string;
    readonly connectAttempts?: number;
    readonly debug?: boolean;
};
declare class NordicBleDevice extends BleDevice {
    constructor(device: BluetoothDevice, opts?: Opts);
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
declare class EspruinoDevice extends NordicBleDevice {
    evalTimeoutMs: number;
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
     * @param code Code to send. A new line is added automatically.
     *
     * ```js
     * // Eg from https://www.espruino.com/Web+Bluetooth
     * writeScript(`
     * setInterval(() => Bluetooth.println(E.getTemperature()), 1000);
     * NRF.on('disconnect',()=>reset());
     * `);
     * ```
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
 * @inheritdoc EspruinoDevice
 * @returns Returns a connected instance, or throws exception if user cancelled or could not connect.
 */
declare const puck: (opts?: {
    readonly name?: string;
    readonly debug?: boolean;
}) => Promise<EspruinoDevice>;
/**
 * @inheritdoc EspruinoDevice
 * @returns Returns a connected instance, or throws exception if user cancelled or could not connect.
 */
declare const connect: () => Promise<EspruinoDevice>;

type EspruinoDevice$1_Options = Options;
type EspruinoDevice$1_EvalOpts = EvalOpts;
type EspruinoDevice$1_EspruinoDevice = EspruinoDevice;
declare const EspruinoDevice$1_EspruinoDevice: typeof EspruinoDevice;
declare const EspruinoDevice$1_puck: typeof puck;
declare const EspruinoDevice$1_connect: typeof connect;
declare namespace EspruinoDevice$1 {
  export {
    EspruinoDevice$1_Options as Options,
    EspruinoDevice$1_EvalOpts as EvalOpts,
    EspruinoDevice$1_EspruinoDevice as EspruinoDevice,
    EspruinoDevice$1_puck as puck,
    EspruinoDevice$1_connect as connect,
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

declare const index_Camera: typeof Camera;
declare namespace index {
  export {
    NordicBleDevice$1 as Bluetooth,
    EspruinoDevice$1 as Espruino,
    index_Camera as Camera,
  };
}

export { Camera as C, EspruinoDevice$1 as E, NordicBleDevice$1 as N, index as i };
