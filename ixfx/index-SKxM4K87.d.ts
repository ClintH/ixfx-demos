import { I as Interval, i as intervalToMs, a as isInterval } from './IntervalType-CQa4mlKV.js';
import { H as HasCompletion, A as AsyncPromiseOrGenerator, a as HasCompletionRunStates } from './Types-WqS2k5P9.js';
import { S as StateMachine } from './StateMachine-l747nwxG.js';
import { M as ModulationTimer, R as RelativeTimerOpts, T as Timer, a as TimerOpts, b as TimerSource, f as frequencyTimer, c as frequencyTimerSource, h as hasElapsed, m as msElapsedTimer, r as relativeTimer, t as ticksElapsedTimer } from './Timer-wJkOCIXz.js';
import { D as DelayOpts, I as IntervalOpts, a as delay, d as delayLoop, i as interval$1 } from './Delay-PO9jy0yJ.js';
import { C as Continuously, a as ContinuouslyAsyncCallback, b as ContinuouslyOpts, c as ContinuouslySyncCallback, O as OnStartCalled, d as continuously } from './Continuously-0k92J-5Q.js';
import { S as SimpleEventEmitter } from './Events-nue2G3Li.js';

type Result<T> = {
    success: boolean;
    value?: T;
    error?: Error | string;
};
type ResultOk<T> = {
    success: true;
    value: T;
};
type ResultError = {
    success: false;
    error: Error | string;
};

type Since = () => number;
/**
 * Returns elapsed time since the initial call.
 * ```js
 * // Record start
 * const elapsed = Elapsed.since();
 *
 * // Get elapsed time in millis
 * elapsed(); // Yields number
 * ```
 *
 * If you want to initialise a elapsed timer, but not yet start it, consider:
 * ```js
 * // Init
 * let state = {
 *  clicked: Elapsed.infinity()
 * };
 *
 * state.click(); // Returns a giant value
 *
 * // Later, when click happens:
 * state = { click: Elapsed.since() }
 * ```
 *
 * Use {@link once} if you want to measure a single period, and stop it.
 * @returns
 */
declare const since: () => Since;
/**
 * Returns the interval between the start and each subsequent call.
 *
 * ```js
 * const interval = Elapsed.interval();
 * interval(); // Time from Elapsed.interval()
 * interval(); // Time since last interval() call
 * ```
 * @returns
 */
declare const interval: () => Since;
/**
 * Returns elapsed time since initial call, however
 * timer stops when first invoked.
 *
 * ```js
 * const elapsed = Elapsed.once();
 * // ...do stuff
 * elapsed(); // Yields time since Elapsed.once() was called
 * // ...do more stuff
 * elapsed(); // Is still the same number as above
 * ```
 *
 * Use {@link since} to not have this stopping behaviour.
 * @returns
 */
declare const once: () => Since;
/**
 * Returns a function that reports an 'infinite' elapsed time.
 * this can be useful as an initialiser for `elapsedSince`.
 *
 * ```js
 * // Init clicked to be an infinite time
 * let clicked = Elapsed.infinity();
 *
 * document.addEventListener('click', () => {
 *  // Now that click has happened, we can assign it properly
 *  clicked = Elapsed.since();
 * });
 * ```
 * @returns
 */
declare const infinity: () => Since;
/**
 * Returns a function that returns the percentage of timer completion.
 * Starts timing immediately.
 *
 * ```js
 * const timer = Elapsed.progress(1000);
 * timer(); // Returns 0..1
 * ```
 *
 * Note that timer can exceed 1 (100%). To cap it:
 * ```js
 * Elapsed.progress(1000, { clampValue: true });
 * ```
 *
 * Takes an {@link Interval} for more expressive time:
 * ```js
 * const timer = Elapsed.progress({ mins: 4 });
 * ```
 * See also {@link hasElapsed}.
 * @param duration
 * @returns
 */
declare function progress(duration: Interval, opts?: {
    readonly clampValue?: boolean;
    readonly wrapValue?: boolean;
}): () => number;
declare const toString: (millisOrFunction: number | Since | Interval, rounding?: number) => string;

type Elapsed_Since = Since;
declare const Elapsed_infinity: typeof infinity;
declare const Elapsed_interval: typeof interval;
declare const Elapsed_once: typeof once;
declare const Elapsed_progress: typeof progress;
declare const Elapsed_since: typeof since;
declare const Elapsed_toString: typeof toString;
declare namespace Elapsed {
  export { type Elapsed_Since as Since, Elapsed_infinity as infinity, Elapsed_interval as interval, Elapsed_once as once, Elapsed_progress as progress, Elapsed_since as since, Elapsed_toString as toString };
}

type Dispatch<V> = (value: V) => void;
declare class DispatchList<V> {
    #private;
    constructor();
    /**
     * Returns _true_ if list is empty
     * @returns
     */
    isEmpty(): boolean;
    /**
     * Adds a handler
     * @param handler
     * @param options
     * @returns
     */
    add(handler: Dispatch<V>, options?: {
        once?: boolean;
    }): string;
    remove(id: string): boolean;
    notify(value: V): void;
    clear(): void;
}

type TimeoutSyncCallback = (elapsedMs?: number, ...args: ReadonlyArray<unknown>) => void;
type TimeoutAsyncCallback = (elapsedMs?: number, ...args: ReadonlyArray<unknown>) => Promise<void>;
/**
 * A resettable timeout, returned by {@link timeout}
 */
type Timeout = HasCompletion & {
    /**
     * Starts the timer.
     * If the timer has already been started and has a scheduled execution, this is cancelled
     * and re-scheduled.
     * @param altTimeoutMs Optional override for the interval. Use _undefined_ to use the original interval
     * @param args
     */
    start(altTimeoutMs?: number, args?: ReadonlyArray<unknown>): void;
    /**
     * Cancels the timer, aborting any scheduled execution.
     */
    cancel(): void;
};
/**
 * Returns a {@link Timeout} that can be triggered, cancelled and reset. Use {@link continuously} for interval-
 * based loops.
 *
 * Once `start()` is called, `callback` will be scheduled to execute after `timeoutMs`.
 * If `start()` is called again, the waiting period will be reset to `timeoutMs`.
 *
 * @example Essential functionality
 * ```js
 * const fn = () => {
 *  console.log(`Executed`);
 * };
 * const t = timeout(fn, 60*1000);
 * t.start();   // After 1 minute `fn` will run, printing to the console
 * ```
 *
 * @example Control execution functionality
 * ```
 * t.cancel();  // Cancel it from running
 * t.start();   // Schedule again after 1 minute
 * t.start(30*1000); // Cancel that, and now scheduled after 30s
 * t.isDone;    // True if a scheduled event is pending
 * ```
 *
 * Callback function receives any additional parameters passed in from start.
 * This can be useful for passing through event data:
 *
 * @example
 * ```js
 * const t = timeout( (elapsedMs, ...args) => {
 *  // args contains event data
 * }, 1000);
 * el.addEventListener(`click`, t.start);
 * ```
 *
 * Asynchronous callbacks can be used as well:
 * ```js
 * timeout(async () => {...}, 100);
 * ```
 *
 * If you don't expect to need to control the timeout, consider using {@link delay},
 * which can run a given function after a specified delay.
 * @param callback
 * @param timeoutMs
 * @returns {@link Timeout}
 */
declare const timeout: (callback: TimeoutSyncCallback | TimeoutAsyncCallback, interval: Interval) => Timeout;

type UpdateFailPolicy = `fast` | `slow` | `backoff`;
/**
 * Calls the async `fn` to generate a value if there is no prior value or
 * `intervalMs` has elapsed since value was last generated.
 * @example
 * ```js
 * const f = updateOutdated(async () => {
 *  const r = await fetch(`blah`);
 *  return await r.json();
 * }, 60*1000);
 *
 * // Result will be JSON from fetch. If fetch happened already in the
 * // last 60s, return cached result. Otherwise it will fetch data
 * const result = await f();
 * ```
 *
 * Callback `fn` is passed how many milliseconds have elapsed since last update. It's
 * minimum value will be `intervalMs`.
 *
 * ```js
 * const f = updateOutdated(async elapsedMs => {
 *  // Do something with elapsedMs?
 * }, 60*1000;
 * ```
 *
 * There are different policies for what to happen if `fn` fails. `slow` is the default.
 * * `fast`: Invocation will happen immediately on next attempt
 * * `slow`: Next invocation will wait `intervalMs` as if it was successful
 * * `backoff`: Attempts will get slower and slower until next success. Interval is multipled by 1.2 each time.
 *
 * @param fn Async function to call. Must return a value.
 * @param intervalMs Maximum age of cached result
 * @param updateFail `slow` by default
 * @returns Value
 */
declare const updateOutdated: <V>(fn: (elapsedMs?: number) => Promise<V>, intervalMs: number, updateFail?: UpdateFailPolicy) => () => Promise<V>;

/**
 * Returns a debounce function which acts to filter calls to a given function `fn`.
 *
 * Eg, Let's create a debounced wrapped for a function:
 * ```js
 * const fn = () => console.log('Hello');
 * const debouncedFn = debounce(fn, 1000);
 * ```
 *
 * Now we can call `debouncedFn()` as often as we like, but it will only execute
 * `fn()` after 1 second has elapsed since the last invocation. It essentially filters
 * many calls to fewer calls. Each time `debounceFn()` is called, the timeout is
 * reset, so potentially `fn` could never be called if the rate of `debounceFn` being called
 * is faster than the provided timeout.
 *
 * Remember that to benefit from `debounce`, you must call the debounced wrapper, not the original function.
 *
 * ```js
 * // Create
 * const d = debounce(fn, 1000);
 *
 * // Don't do this if we want to benefit from the debounce
 * fn();
 *
 * // Use the debounced wrapper
 * d(); // Only calls fn after 1000s
 * ```
 *
 * A practical use for this is handling high-frequency streams of data, where we don't really
 * care about processing every event, only last event after a period. Debouncing is commonly
 * used on microcontrollers to prevent button presses being counted twice.
 *
 * @example Handle most recent pointermove event after 1000ms
 * ```js
 * // Set up debounced handler
 * const moveDebounced = debounce((elapsedMs, evt) => {
 *    // Handle event
 * }, 500);
 *
 * // Wire up event
 * el.addEventListener(`pointermove`, moveDebounced);
 * ```
 *
 * Arguments can be passed to the debounced function:
 *
 * ```js
 * const fn = (x) => console.log(x);
 * const d = debounce(fn, 1000);
 * d(10);
 * ```
 *
 * If the provided function is asynchronous, it's possible to await the debounced
 * version as well. If the invocation was filtered, it returns instantly.
 *
 * ```js
 * const d = debounce(fn, 1000);
 * await d();
 * ```
 * @param callback Function to filter access to
 * @param timeoutMs Minimum time between invocations
 * @returns Debounce function
 */
declare const debounce: (callback: TimeoutSyncCallback | TimeoutAsyncCallback, timeoutMs: number) => DebouncedFunction;
/**
 * Debounced function
 */
type DebouncedFunction = (...args: readonly unknown[]) => void;

/***
 * Throttles a function. Callback only allowed to run after minimum of `intervalMinMs`.
 *
 * @example Only handle move event every 500ms
 * ```js
 * const moveThrottled = throttle( (elapsedMs, args) => {
 *  // Handle ar
 * }, 500);
 * el.addEventListener(`pointermove`, moveThrottled)
 * ```
 *
 * Note that `throttle` does not schedule invocations, but rather acts as a filter that
 * sometimes allows follow-through to `callback`, sometimes not. There is an expectation then
 * that the return function from `throttle` is repeatedly called, such as the case for handling
 * a stream of data/events.
 *
 * @example Manual trigger
 * ```js
 * // Set up once
 * const t = throttle( (elapsedMs, args) => { ... }, 5000);
 *
 * // Later, trigger throttle. Sometimes the callback will run,
 * // with data passed in to args[0]
 * t(data);
 * ```
 */
declare const throttle: (callback: (elapsedMs: number, ...args: readonly unknown[]) => void | Promise<unknown>, intervalMinMs: number) => (...args: unknown[]) => Promise<void>;

type SleepOpts<V> = Interval & Partial<{
    readonly signal: AbortSignal;
    readonly value: V;
}>;
/**
 * Returns after timeout period.
 *
 * @example In an async function
 * ```js
 * console.log(`Hello`);
 * await sleep(1000);
 * console.log(`There`); // Prints one second after
 * ```
 *
 * @example As a promise
 * ```js
 * console.log(`Hello`);
 * sleep({ millis: 1000 })
 *  .then(() => console.log(`There`)); // Prints one second after
 * ```
 *
 * If a timeout of 0 is given, `requestAnimationFrame` is used instead of `setTimeout`.
 *
 * {@link delay} and {@link sleep} are similar. `delay()` takes a parameter of what code to execute after the timeout, while `sleep()` just resolves after the timeout.
 *
 * A value can be provided, which is returned on awaking:
 * ```js
 * const v = await sleep({ seconds: 1, value: `hello`);
 * // v = `hello`
 * ```
 *
 * Provide an AbortSignal to cancel the sleep and throwing an exception
 * so code after the sleep doesn't happen.
 *
 * ```js
 * const ac = new AbortController();
 * setTimeout(() => { ac.abort(); }, 1000); // Abort after 1s
 *
 * // Sleep for 1min
 * await sleep({ minutes: 1, signal: ac.signal });
 * console.log(`Awake`); // This line doesn't get called because an exception is thrown when aborting
 * ```
 * @param optsOrMillis Milliseconds to sleep, or options
 * @param signal
 * @return
 */
declare const sleep: <V>(optsOrMillis: SleepOpts<V>) => Promise<V | undefined>;

/**
 * Helper function for calling code that should fail after a timeout.
 * In short, it allows you to signal when the function succeeded, to cancel it, or
 * to be notified if it was canceled or completes.
 *
 * It does not execute or track the outcome of execution itself. Rather it's a bit
 * of machinery that needs to be steered by your own logic.
 *
 * `waitFor` takes a timeout, and two lifecycle functions, `onAborted` and `onComplete`.
 * `onAborted` is called if the timeout has elapsed. `onComplete` will run on either success or failure.
 *
 * ```js
 * waitFor(1000,
 * (error) => {
 *  // Failed
 * },
 * (success) => {
 *  if (success) {
 *    // Succeeded
 *  }
 * });
 * ```
 *
 * When calling `waitFor` you get back a function to signal success or failure:
 * ```js
 * const done = waitFor(1000, onAborted, onComplete);
 * done();          // No parameters signals success
 * done('failed');  // A string parameter indicates failure
 * ```
 *
 * @example Compact
 * ```js
 * const done = waitFor(1000,
 *  (reason) => {
 *    console.log(`Aborted: ${reason}`);
 *  },
 *  (success) => {
 *    console.log(`Completed. Success: ${success ?? `Yes!` : `No`}`)
 *  });
 *
 * try {
 *  runSomethingThatMightScrewUp();
 *  done(); // Signal it succeeded
 * } catch (e) {
 *  done(e); // Signal there was an error
 * }
 * ```
 *
 * @example Verbose
 * ```js
 * // This function is called by `waitFor` if it was cancelled
 * const onAborted = (reason:string) => {
 *  // 'reason' is a string describing why it has aborted.
 *  // ie: due to timeout or because done() was called with an error
 * };
 *
 * // This function is called by `waitFor` if it completed
 * const onComplete = (success:boolean) => {
 *  // Called if we were aborted or finished succesfully.
 *  // onComplete will be called after onAborted, if it was an error case
 * }
 *
 * // If done() is not called after 1000, onAborted will be called
 * // if done() is called or there was a timeout, onComplete is called
 * const done = waitFor(1000, onAborted, onComplete);
 *
 * // Signal completed successfully (thus calling onComplete(true))
 * done();
 *
 * // Signal there was an error (thus calling onAborted and onComplete(false))
 * done(`Some error`);
 * ```
 *
 * The completion handler is useful for removing event handlers.
 *

 * @param timeoutMs
 * @param onAborted
 * @param onComplete
 * @returns
 */
declare const waitFor: (timeoutMs: number, onAborted: (reason: string) => void, onComplete?: ((success: boolean) => void) | undefined) => (error?: string) => void;

/**
 * Returns true for every _n_th call, eg 2 for every second call.
 *
 * If `nth` is 1, returns true for everything. 0 will be false for everything.
 *
 * Usage:
 * ```js
 * const tenth = everyNth(10);
 * window.addEventListener(`pointermove`, evt => {
 *  if (!tenth(evt)) return; // Filter out
 *  // Continue processing, it is the 10th thing.
 *
 * });
 * ```
 *
 * Alternative:
 * ```js
 * window.addEventListener(`pointermove`, everyNth(10, evt => {
 *  // Do something with tenth item...
 * });
 * ```
 * @param nth Every nth item
 * @param callback
 * @returns Function which in turn returns true if nth call has been hit, false otherwise
 */
declare const everyNth: (nth: number, callback?: ((...args: readonly unknown[]) => void) | undefined) => (...args: unknown[]) => boolean;

/**
 * Runs a function once
 *
 * ```js
 * const init = runOnce(() => {
 *  // do some initialisation
 * });
 *
 * init(); // Runs once
 * init(); // no-op
 * ```
 * @param onRun
 * @returns
 */
declare const runOnce: (onRun: () => boolean) => (() => boolean);

/**
 * Result of backoff
 */
type RetryResult<V> = {
    /**
     * Message describing outcome.
     *
     * If retry was aborted, message will be abort reason.
     */
    readonly message?: string;
    /**
     * True if callback function was invoked once where it returned _true_
     */
    readonly success: boolean;
    /**
     * Number of times callback was attempted
     */
    readonly attempts: number;
    /**
     * Total elapsed time since beginning of call to `retry`
     */
    readonly elapsed: number;
    /**
     * Value returned by succeeding function,
     * or _undefined_ if it failed
     */
    readonly value: V | undefined;
};
type BackoffOptions = {
    /**
     * Initial value.
     * Default: 1
     */
    startAt: number;
    /**
     * Maximum times to run.
     * Default: continues forever
     */
    limitAttempts: number;
    /**
     * Stop retrying if this maximum is reached
     * Default: no limit
     */
    limitValue: number;
    /**
     * Math power.
     * Default: 1.1
     */
    power: number;
};
/**
 * Generates an expoential backoff series of values
 * ```js
 * // Default: start at 1, power 1.1
 * for (const v of backoffGenerator()) {
 *  // v: numeric value
 * }
 * ```
 *
 * By default the generator runs forever. Use either
 * `limitAttempts` or `limitValue` to stop it when it produces a
 * given quantity of values, or when the value itself reaches a threshold.
 *
 * For example:
 * ```js
 * // `values` will have five values in it
 * const values = [...backoffGenerator({ limitAttempts: 5 })];
 * // Keep generating values until max is reached
 * const values = [...backoffGenerator({ limitValue: 1000 })];
 * ```
 *
 * Options:
 * * startAt: start value
 * * limitAttempts: cap the number of values to generate
 * * limitValue: cap the maximum calculated value
 * * power: power value (default 1.1)
 *
 * @param options
 * @returns
 */
declare function backoffGenerator(options?: Partial<BackoffOptions>): Generator<number, void, unknown>;
/**
 * Backoff options
 */
type RetryOpts<T> = BackoffOptions & {
    /**
     * Initial waiting period before first attempt (optional)
     */
    readonly predelayMs: number;
    /**
     * Optional abort signal
     */
    readonly abort: AbortSignal;
    /**
     * Log: _true_ monitors the task execution by logging to console
     */
    readonly log: boolean;
    /***
     * Default task value to return if it fails
     */
    readonly taskValueFallback: T;
};
type RetryTask<T> = {
    /**
     * If `probe` returns {success:true} task is considered
     * complete and retrying stops
     * @returns
     */
    probe: (attempts: number) => Promise<Result<T>>;
};
/**
 * Keeps calling `callback` until it returns something other than _undefined_.
 * There is an exponentially-increasing delay between each retry attempt.
 *
 * If `callback` throws an exception, the retry is cancelled, bubbling the exception.
 *
 * ```js
 * // A function that only works some of the time
 * const flakyFn = async () => {
 *  // do the thing
 *  if (Math.random() > 0.9) return true; // success
 *  return; // fake failure
 * };
 *
 * // Retry it up to five times,
 * // starting with 1000ms interval
 * const result = await retryFunction(flakyFn, {
 *  limitAttempts: 5
 * });
 *
 * if (result.success) {
 *  // Yay
 * } else {
 *  console.log(`Failed after ${result.attempts} attempts. Elapsed: ${result.elapsed}`);
 *  console.log(result.message);
 * }
 * ```
 *
 * An `AbortSignal` can be used to cancel process.
 * ```js
 * const abort = new AbortController();
 * const result = await retryFunction(cb, { signal: abort.signal });
 *
 * // Somewhere else...
 * abort('Cancel!'); // Trigger abort
 * ```
 * @param callback Function to run
 * @param opts Options
 * @returns
 */
declare const retryFunction: <T>(callback: () => Promise<T | undefined>, opts?: Partial<RetryOpts<T>>) => Promise<RetryResult<T>>;
declare const retryTask: <V>(task: RetryTask<V>, opts?: Partial<RetryOpts<V>>) => Promise<RetryResult<V>>;

type RequestResponseOptions<TRequest, TResp> = {
    timeoutMs: number;
    key: (requestOrResp: TRequest | TResp) => string;
    keyRequest: (request: TRequest) => string;
    keyResponse: (resp: TResp) => string;
    whenUnmatchedResponse: `ignore` | `throw`;
};
type RequestResponseMatchEvents<TRequest, TResp> = {
    match: {
        request: TRequest;
        response: TResp;
    };
    completed: {
        request: TRequest;
        response: TResp | string;
        success: boolean;
    };
};
/**
 * Matches responses with requests, expiring requests if they do not get a response in a timely manner.
 *
 * Basic usage:
 * ```js
 * const m = new RequestResponseMatch(options);
 * // Listen for when a response matches a request
 * m.addEventListener(`match`, event => {
 *  // event: { request:Req, response:Resp}
 * });
 * // Or alternatively, listen for success and failures
 * m.addEventListener(`completed`, event => {
 *  // { request:Resp, response:Req|undefined, success:boolean }
 *  // 'response' will be data or a string error message
 * });
 * m.request(req); // Note that some request was sent
 * ...
 * m.response(resp); // Call when a response is received
 * ```
 *
 * It's also possible to wait for specific replies:
 * ```js
 * // With a promise
 * const resp = await m.requestAwait(req);
 * // With a callback
 * m.requestCallback(req, (success, resp) => {
 *  // Runs on success or failure
 * })
 * ```
 * It relies on creating an id of a request/response for them to be matched up. Use the `key`
 * option if the function can generate a key from either request or response. Or alternatively set both `keyRequest` and `keyResponse` for two functions that can generate a key for request and response respectively.
 *
 *
 * The easy case is if req & resp both have the same field:
 * ```js
 * const m = new RequestResponseMatch({
 *  key: (reqOrResp) => {
 *    // Requests has an 'id' field
 *    // Response also has an 'id' field that corresponds to the request id
 *    return reqOrResp.id;
 *  }
 * });
 * ```
 *
 * A more complicated case:
 * ```js
 * const m = new RequestResponseMatch({
 *  keyRequest: (req) => {
 *    // Requests have an 'id' field
 *    return req.id;
 *  },
 *  keyResponse: (resp) => {
 *    // Responses have id under a different field
 *    return resp.reply_to
 *  }
 * })
 * ```
 *
 * By default, error will be thrown if a response is received that doesn't match up to any request.
 */
declare class RequestResponseMatch<TRequest, TResp> extends SimpleEventEmitter<RequestResponseMatchEvents<TRequest, TResp>> {
    #private;
    timeoutMs: number;
    whenUnmatchedResponse: "throw" | "ignore";
    keyRequest: (request: TRequest) => string;
    keyResponse: (resp: TResp) => string;
    constructor(options?: Partial<RequestResponseOptions<TRequest, TResp>>);
    debugDump(): void;
    /**
     * Make a request and get the outcome via a Promise
     * @param request
     */
    request(request: TRequest): Promise<TResp>;
    /**
     * Makes a request with a callback for the outcome
     * @param request
     * @param callback
     */
    request(request: TRequest, callback: (error: boolean, response: TResp | string) => void): void;
    /**
     * Make a request and don't wait for the outcome.
     * @param request
     */
    requestAndForget(request: TRequest): void;
    /**
     * Response has been received
     * @param response Response
     * @returns _True_ if response matched a request
     */
    response(response: TResp, keepAlive: boolean): boolean;
}

/**
 * Simple task queue. Each task is awaited and run
 * in turn.
 *
 * @example Usage
 * ```js
 * const q = new TaskQueue();
 * q.add(async () => {
 *  // Takes one second to run
 *  await sleep(1000);
 * });
 * ```
 */
declare class TaskQueue {
    static instance: TaskQueue;
    private _timer;
    private _queue;
    private readonly _startDelayMs;
    private readonly _intervalMs;
    private constructor();
    /**
     * Adds a task. This triggers processing loop if not already started.
     *
     * ```js
     * queue.add(async () => {
     *  await sleep(1000);
     * });
     * ```
     * @param task Task to run
     */
    add(task: () => Promise<void>): void;
    private schedule;
    private processQueue;
}

/**
 * Iterates over `iterator` (iterable/array), calling `fn` for each value.
 * If `fn` returns _false_, iterator cancels.
 *
 * Over the default JS `forEach` function, this one allows you to exit the
 * iteration early.
 *
 * @example
 * ```js
 * forEach(count(5), () => console.log(`Hi`));  // Prints `Hi` 5x
 * forEach(count(5), i => console.log(i));      // Prints 0 1 2 3 4
 * forEach([0,1,2,3,4], i => console.log(i));   // Prints 0 1 2 3 4
 * ```
 *
 * Use {@link forEachAsync} if you want to use an async `iterator` and async `fn`.
 * @param iterator Iterable or array
 * @typeParam V Type of iterable
 * @param fn Function to call for each item. If function returns _false_, iteration cancels
 */
declare const forEach: <V>(iterator: IterableIterator<V> | readonly V[], fn: (v?: V | undefined) => boolean) => void;
/**
 * Iterates over an async iterable or array, calling `fn` for each value, with optional
 * interval between each loop. If the async `fn` returns _false_, iterator cancels.
 *
 * Use {@link forEach} for a synchronous version.
 *
 * ```
 * // Prints items from array every second
 * await forEachAsync([0,1,2,3], i => console.log(i), 1000);
 * ```
 *
 * ```
 * // Retry up to five times, with 5 seconds between each attempt
 * await forEachAsync(count(5), i=> {
 *  try {
 *    await doSomething();
 *    return false; // Succeeded, exit early
 *  } catch (ex) {
 *    console.log(ex);
 *    return true; // Keep trying
 *  }
 * }, 5000);
 * ```
 * @param iterator Iterable thing to loop over
 * @param fn Function to invoke on each item. If it returns _false_ loop ends.
 * @typeParam V Type of iterable
 */
declare const forEachAsync: <V>(iterator: AsyncIterableIterator<V> | readonly V[], fn: (v?: V | undefined) => Promise<boolean> | Promise<void>, intervalMs?: number) => Promise<void>;
type RepeatPredicate = (repeats: number, valuesProduced: number) => boolean;
/**
 * Runs `fn` a certain number of times, yielding results.
 * If `fn` returns undefined, the result is ignored, but loop continues.
 *
 * ```js
 * // Results will be an array with five random numbers
 * const results = [...repeat(5, () => Math.random())];
 *
 * // Or as an generator (note also the simpler expression form)
 * for (const result of repeat(5, Math.random)) {
 * }
 * ```
 *
 * Repeats can be specified as an integer (eg. 5 for five repeats), or a function
 * that gives _false_ when repeating should stop.
 *
 * ```js
 * // Keep running `fn` until we've accumulated 10 values
 * // Useful if `fn` sometimes returns _undefined_
 * const results = repeat((repeats, valuesProduced) => valuesProduced < 10, fn);
 * ```
 *
 * If you don't need to accumulate return values, consider {@link Generators.count | Generators.count} with {@link Flow.forEach | Flow.forEach}.
 * If you want to have a waiting period between each repetition, consider {@link Flow.interval}.
 * @param countOrPredicate Number of repeats or function returning false when to stop
 * @param fn Function to run, must return a value to accumulate into array or _undefined_
 * @returns Yields results, one at a time
 */
declare function repeat<V>(countOrPredicate: number | RepeatPredicate, fn: (repeats: number, valuesProduced: number) => V | undefined): Generator<V & ({} | null), void, unknown>;
/**
 * Repeatedly calls `fn`, reducing via `reduce`.
 *
 * ```js
 * repeatReduce(10, () => 1, (acc, v) => acc + v);
 * // Yields: 10
 *
 * // Multiplies random values against each other 10 times
 * repeatReduce(10, Math.random, (acc, v) => acc * v);
 * // Yields a single number
 * ```
 * @param countOrPredicate
 * @param fn
 * @param initial
 * @param reduce
 * @returns
 */
declare const repeatReduce: <V>(countOrPredicate: number | RepeatPredicate, fn: () => V | undefined, initial: V, reduce: (accumulator: V, value: V) => V) => V;

declare const index_AsyncPromiseOrGenerator: typeof AsyncPromiseOrGenerator;
type index_BackoffOptions = BackoffOptions;
declare const index_Continuously: typeof Continuously;
declare const index_ContinuouslyAsyncCallback: typeof ContinuouslyAsyncCallback;
declare const index_ContinuouslyOpts: typeof ContinuouslyOpts;
declare const index_ContinuouslySyncCallback: typeof ContinuouslySyncCallback;
type index_DebouncedFunction = DebouncedFunction;
declare const index_DelayOpts: typeof DelayOpts;
type index_Dispatch<V> = Dispatch<V>;
type index_DispatchList<V> = DispatchList<V>;
declare const index_DispatchList: typeof DispatchList;
declare const index_Elapsed: typeof Elapsed;
declare const index_HasCompletion: typeof HasCompletion;
declare const index_HasCompletionRunStates: typeof HasCompletionRunStates;
declare const index_Interval: typeof Interval;
declare const index_IntervalOpts: typeof IntervalOpts;
declare const index_ModulationTimer: typeof ModulationTimer;
declare const index_OnStartCalled: typeof OnStartCalled;
declare const index_RelativeTimerOpts: typeof RelativeTimerOpts;
type index_RepeatPredicate = RepeatPredicate;
type index_RequestResponseMatch<TRequest, TResp> = RequestResponseMatch<TRequest, TResp>;
declare const index_RequestResponseMatch: typeof RequestResponseMatch;
type index_RequestResponseMatchEvents<TRequest, TResp> = RequestResponseMatchEvents<TRequest, TResp>;
type index_RequestResponseOptions<TRequest, TResp> = RequestResponseOptions<TRequest, TResp>;
type index_RetryOpts<T> = RetryOpts<T>;
type index_RetryResult<V> = RetryResult<V>;
type index_RetryTask<T> = RetryTask<T>;
type index_SleepOpts<V> = SleepOpts<V>;
declare const index_StateMachine: typeof StateMachine;
type index_TaskQueue = TaskQueue;
declare const index_TaskQueue: typeof TaskQueue;
type index_Timeout = Timeout;
type index_TimeoutAsyncCallback = TimeoutAsyncCallback;
type index_TimeoutSyncCallback = TimeoutSyncCallback;
declare const index_Timer: typeof Timer;
declare const index_TimerOpts: typeof TimerOpts;
declare const index_TimerSource: typeof TimerSource;
type index_UpdateFailPolicy = UpdateFailPolicy;
declare const index_backoffGenerator: typeof backoffGenerator;
declare const index_continuously: typeof continuously;
declare const index_debounce: typeof debounce;
declare const index_delay: typeof delay;
declare const index_delayLoop: typeof delayLoop;
declare const index_everyNth: typeof everyNth;
declare const index_forEach: typeof forEach;
declare const index_forEachAsync: typeof forEachAsync;
declare const index_frequencyTimer: typeof frequencyTimer;
declare const index_frequencyTimerSource: typeof frequencyTimerSource;
declare const index_hasElapsed: typeof hasElapsed;
declare const index_intervalToMs: typeof intervalToMs;
declare const index_isInterval: typeof isInterval;
declare const index_msElapsedTimer: typeof msElapsedTimer;
declare const index_relativeTimer: typeof relativeTimer;
declare const index_repeat: typeof repeat;
declare const index_repeatReduce: typeof repeatReduce;
declare const index_retryFunction: typeof retryFunction;
declare const index_retryTask: typeof retryTask;
declare const index_runOnce: typeof runOnce;
declare const index_sleep: typeof sleep;
declare const index_throttle: typeof throttle;
declare const index_ticksElapsedTimer: typeof ticksElapsedTimer;
declare const index_timeout: typeof timeout;
declare const index_updateOutdated: typeof updateOutdated;
declare const index_waitFor: typeof waitFor;
declare namespace index {
  export { index_AsyncPromiseOrGenerator as AsyncPromiseOrGenerator, type index_BackoffOptions as BackoffOptions, index_Continuously as Continuously, index_ContinuouslyAsyncCallback as ContinuouslyAsyncCallback, index_ContinuouslyOpts as ContinuouslyOpts, index_ContinuouslySyncCallback as ContinuouslySyncCallback, type index_DebouncedFunction as DebouncedFunction, index_DelayOpts as DelayOpts, type index_Dispatch as Dispatch, index_DispatchList as DispatchList, index_Elapsed as Elapsed, index_HasCompletion as HasCompletion, index_HasCompletionRunStates as HasCompletionRunStates, index_Interval as Interval, index_IntervalOpts as IntervalOpts, index_ModulationTimer as ModulationTimer, index_OnStartCalled as OnStartCalled, index_RelativeTimerOpts as RelativeTimerOpts, type index_RepeatPredicate as RepeatPredicate, index_RequestResponseMatch as RequestResponseMatch, type index_RequestResponseMatchEvents as RequestResponseMatchEvents, type index_RequestResponseOptions as RequestResponseOptions, type index_RetryOpts as RetryOpts, type index_RetryResult as RetryResult, type index_RetryTask as RetryTask, type index_SleepOpts as SleepOpts, index_StateMachine as StateMachine, index_TaskQueue as TaskQueue, type index_Timeout as Timeout, type index_TimeoutAsyncCallback as TimeoutAsyncCallback, type index_TimeoutSyncCallback as TimeoutSyncCallback, index_Timer as Timer, index_TimerOpts as TimerOpts, index_TimerSource as TimerSource, type index_UpdateFailPolicy as UpdateFailPolicy, index_backoffGenerator as backoffGenerator, index_continuously as continuously, index_debounce as debounce, index_delay as delay, index_delayLoop as delayLoop, index_everyNth as everyNth, index_forEach as forEach, index_forEachAsync as forEachAsync, index_frequencyTimer as frequencyTimer, index_frequencyTimerSource as frequencyTimerSource, index_hasElapsed as hasElapsed, interval$1 as interval, index_intervalToMs as intervalToMs, index_isInterval as isInterval, index_msElapsedTimer as msElapsedTimer, index_relativeTimer as relativeTimer, index_repeat as repeat, index_repeatReduce as repeatReduce, index_retryFunction as retryFunction, index_retryTask as retryTask, index_runOnce as runOnce, index_sleep as sleep, index_throttle as throttle, index_ticksElapsedTimer as ticksElapsedTimer, index_timeout as timeout, index_updateOutdated as updateOutdated, index_waitFor as waitFor };
}

export { retryTask as A, type BackoffOptions as B, type RequestResponseOptions as C, type Dispatch as D, Elapsed as E, type RequestResponseMatchEvents as F, RequestResponseMatch as G, type Result as R, type SleepOpts as S, TaskQueue as T, type UpdateFailPolicy as U, type ResultOk as a, type ResultError as b, forEachAsync as c, type RepeatPredicate as d, repeatReduce as e, forEach as f, DispatchList as g, type TimeoutSyncCallback as h, index as i, type TimeoutAsyncCallback as j, type Timeout as k, debounce as l, type DebouncedFunction as m, throttle as n, everyNth as o, runOnce as p, type RetryResult as q, repeat as r, sleep as s, timeout as t, updateOutdated as u, backoffGenerator as v, waitFor as w, type RetryOpts as x, type RetryTask as y, retryFunction as z };
