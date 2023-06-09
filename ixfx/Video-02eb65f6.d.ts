type Capturer = {
    start(): void;
    cancel(): void;
    readonly canvasEl: HTMLCanvasElement;
};
type ManualCapturer = {
    capture(): ImageData;
    readonly canvasEl: HTMLCanvasElement;
    dispose(): void;
};
type CaptureOpts = {
    readonly maxIntervalMs?: number;
    readonly showCanvas?: boolean;
    readonly workerScript?: string;
    readonly onFrame?: (pixels: ImageData) => void;
};
type ManualCaptureOpts = {
    /**
     * If true, the intermediate canvas is shown
     * The intermediate canvas is where captures from the source are put in order
     * to get the ImageData
     */
    readonly showCanvas?: boolean;
    /**
     * If specified, this function will be called after ImageData is captured
     * from the intermediate canvs. This allows for drawing on top of the
     * captured image.
     */
    readonly postCaptureDraw?: (ctx: CanvasRenderingContext2D, width: number, height: number) => void;
    /**
     * If specified, this is the canvas captured to
     */
    readonly canvasEl?: HTMLCanvasElement;
};
/**
 * Options for frames generator
 */
type FramesOpts = {
    /**
     * Max frame rate (millis per frame), or 0 for animation speed
     */
    readonly maxIntervalMs?: number;
    /**
     * False by default, created canvas will be hidden
     */
    readonly showCanvas?: boolean;
    /**
     * If provided, this canvas will be used as the buffer rather than creating one.
     */
    readonly canvasEl?: HTMLCanvasElement;
};
/**
 * Generator that yields frames from a video element as [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData).
 *
 * ```js
 * import {Video} from 'https://unpkg.com/ixfx/dist/visual.js'
 *
 * const ctx = canvasEl.getContext(`2d`);
 * for await (const frame of Video.frames(videoEl)) {
 *   // TODO: Some processing of pixels
 *
 *   // Draw image on to the visible canvas
 *   ctx.putImageData(frame, 0, 0);
 * }
 * ```
 *
 * Under the hood it creates a hidden canvas where frames are drawn to. This is necessary
 * to read back pixel data. An existing canvas can be used if it is passed in as an option.
 *
 * Options:
 * * `canvasEl`: CANVAS element to use as a buffer (optional)
 * * `maxIntervalMs`: Max frame rate (0 by default, ie runs as fast as possible)
 * * `showCanvas`: Whether buffer canvas will be shown (false by default)
 * @param sourceVideoEl
 * @param opts
 */
declare function frames(sourceVideoEl: HTMLVideoElement, opts?: FramesOpts): AsyncIterable<ImageData>;
/**
 * Captures frames from a video element. It can send pixel data to a function or post to a worker script.
 *
 * @example Using a function
 * ```js
 * import {Video} from 'https://unpkg.com/ixfx/dist/visual.js'
 *
 * // Capture from a VIDEO element, handling frame data
 * // imageData is ImageData type: https://developer.mozilla.org/en-US/docs/Web/API/ImageData
 * Video.capture(sourceVideoEl, {
 *  onFrame(imageData => {
 *    // Do something with pixels...
 *  });
 * });
 * ```
 *
 * @example Using a worker
 * ```js
 * import {Video} from 'https://unpkg.com/ixfx/dist/visual.js'
 *
 * Video.capture(sourceVideoEl, {
 *  workerScript: `./frameProcessor.js`
 * });
 * ```
 *
 * In frameProcessor.js:
 * ```
 * const process = (frame) => {
 *  // ...process frame
 *
 *  // Send image back?
 *  self.postMessage({frame});
 * };
 *
 * self.addEventListener(`message`, evt => {
 *   const {pixels, width, height} = evt.data;
 *   const frame = new ImageData(new Uint8ClampedArray(pixels),
 *     width, height);
 *
 *   // Process it
 *   process(frame);
 * });
 * ```
 *
 * Options:
 * * `canvasEl`: CANVAS element to use as a buffer (optional)
 * * `maxIntervalMs`: Max frame rate (0 by default, ie runs as fast as possible)
 * * `showCanvas`: Whether buffer canvas will be shown (false by default)
 * * `workerScript`: If this specified, this URL will be loaded as a Worker, and frame data will be automatically posted to it
 *
 * Implementation: frames are captured using a animation-speed loop to a hidden canvas. From there
 * the pixel data is extracted and sent to either destination. In future the intermediate drawing to a
 * canvas could be skipped if it becomes possible to get pixel data from an ImageBitmap.
 * @param sourceVideoEl Source VIDEO element
 * @param opts
 * @returns
 */
declare const capture: (sourceVideoEl: HTMLVideoElement, opts?: CaptureOpts) => Capturer;
declare const manualCapture: (sourceVideoEl: HTMLVideoElement, opts?: ManualCaptureOpts) => ManualCapturer;

type Video_CaptureOpts = CaptureOpts;
type Video_Capturer = Capturer;
type Video_FramesOpts = FramesOpts;
type Video_ManualCaptureOpts = ManualCaptureOpts;
type Video_ManualCapturer = ManualCapturer;
declare const Video_capture: typeof capture;
declare const Video_frames: typeof frames;
declare const Video_manualCapture: typeof manualCapture;
declare namespace Video {
  export {
    Video_CaptureOpts as CaptureOpts,
    Video_Capturer as Capturer,
    Video_FramesOpts as FramesOpts,
    Video_ManualCaptureOpts as ManualCaptureOpts,
    Video_ManualCapturer as ManualCapturer,
    Video_capture as capture,
    Video_frames as frames,
    Video_manualCapture as manualCapture,
  };
}

export { ManualCapturer as M, Video as V };
