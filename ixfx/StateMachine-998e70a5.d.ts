import { S as SimpleEventEmitter } from './Events-f58b1bc8.js';

interface Options {
    readonly debug?: boolean;
}
interface StateChangeEvent {
    readonly newState: string;
    readonly priorState: string;
}
interface StopEvent {
    readonly state: string;
}
type StateMachineEventMap = {
    readonly change: StateChangeEvent;
    readonly stop: StopEvent;
};
type StateEvent = (args: unknown, sender: StateMachine) => void;
type StateHandler = string | StateEvent | null;
interface State {
    readonly [event: string]: StateHandler;
}
interface MachineDescription {
    readonly [key: string]: string | readonly string[] | null;
}
type DriverResult = {
    readonly score?: number;
    readonly state?: string;
    readonly next?: boolean;
    readonly reset?: boolean;
};
type DriverExpression<V> = (args?: V) => DriverResult | undefined;
type DriverDescription<V> = {
    readonly select?: `first` | `highest` | `lowest`;
    readonly tryAll?: boolean;
    readonly expressions: DriverExpression<V> | readonly DriverExpression<V>[];
};
interface StateDriverDescription<V> {
    readonly [key: string]: DriverDescription<V> | readonly DriverExpression<V>[] | DriverExpression<V>;
}
/**
 * Returns a machine description based on a list of strings. The final string is the final
 * state.
 *
 * ```js
 * const states = [`one`, `two`, `three`];
 * const sm = StateMachine.create(states[0], descriptionFromList(states));
 * ```
 * @param states List of states
 * @return MachineDescription
 */
declare const descriptionFromList: (...states: readonly string[]) => MachineDescription;
/**
 * Returns a state machine based on a list of strings. The first string is used as the initial state,
 * the last string is considered the final. To just generate a description, use {@link descriptionFromList}.
 *
 * Changes are unidirectional, in array order. ie, for the list [`a`, `b`, `c`], the changes can be:
 * a -> b -> c -> null (final)
 *
 * Use {@link fromListBidirectional} to have bidirectional state changes.
 *
 * ```js
 * const states = [`one`, `two`, `three`];
 * const sm = StateMachine.fromList(states);
 * ```
 */
declare const fromList: (...states: readonly string[]) => StateMachine;
/**
 * Returns a state machine based on a list of strings, where states can change forward and backwards.
 * ie, for the list [`a`, `b`, `c`], the changes can be:
 * a <-> b <-> c
 *
 * Use {@link fromList} for unidirectional state changes.
 * @param states
 * @returns
 */
declare const fromListBidirectional: (...states: readonly string[]) => StateMachine;
/**
 * Creates a new state machine
 * @param initial Initial state
 * @param m Machine description
 * @param opts Options
 * @returns State machine instance
 */
declare const create: (initial: string, m: MachineDescription, opts?: Options) => StateMachine;
/**
 * State machine
 *
 * Machine description is a simple object of possible state names to allowed state(s). Eg. the following
 * has four possible states (`wakeup, sleep, coffee, breakfast, bike`). `Sleep` can only transition to the `wakeup`
 * state, while `wakeup` can transition to either `coffee` or `breakfast`.
 *
 * Use `null` to signify the final state. Multiple states can terminate the machine if desired.
 * ```
 * const description = {
 *  sleep: 'wakeup',
 *  wakeup: ['coffee', 'breakfast'],
 *  coffee: `bike`,
 *  breakfast: `bike`,
 *  bike: null
 * }
 * ```
 * Create the machine with the starting state (`sleep`)
 * ```
 * const machine = StateMachine.create(`sleep`, description);
 * ```
 *
 * Change the state by name:
 * ```
 * machine.state = `wakeup`
 * ```
 *
 * Or request an automatic transition (will use first state if there are several options)
 * ```
 * machine.next();
 * ```
 *
 * Check status
 * ```
 * if (machine.state === `coffee`) ...;
 * if (machine.isDone()) ...
 * ```
 *
 * Listen for state changes
 * ```
 * machine.addEventListener(`change`, (evt) => {
 *  const {priorState, newState} = evt;
 *  console.log(`State change from ${priorState} -> ${newState}`);
 * });
 * ```
 * @export
 * @class StateMachine
 * @extends {SimpleEventEmitter<StateMachineEventMap>}
 */
declare class StateMachine extends SimpleEventEmitter<StateMachineEventMap> {
    #private;
    /**
     * Create a state machine with initial state, description and options
     * @param string initial Initial state
     * @param MachineDescription m Machine description
     * @param Options Options for machine (defaults to `{debug:false}`)
     * @memberof StateMachine
     */
    constructor(initial: string, m: MachineDescription, opts?: Options);
    get states(): readonly string[];
    static validate(initial: string, m: MachineDescription): readonly [boolean, string];
    /**
     * Moves to the next state if possible. If multiple states are possible, it will use the first.
     * If machine is finalised, no error is thrown and null is returned.
     *
     * @returns {(string|null)} Returns new state, or null if machine is finalised
     * @memberof StateMachine
     */
    next(): string | null;
    /**
     * Returns true if state machine is in its final state
     *
     * @returns
     * @memberof StateMachine
     */
    get isDone(): boolean;
    /**
     * Resets machine to initial state
     *
     * @memberof StateMachine
     */
    reset(): void;
    /**
     * Checks whether a state change is valid.
     *
     * @static
     * @param priorState From state
     * @param newState To state
     * @param description Machine description
     * @returns If valid: [true,''], if invalid: [false, 'Error msg here']
     * @memberof StateMachine
     */
    static isValid(priorState: string, newState: string, description: MachineDescription): readonly [boolean, string];
    isValid(newState: string): readonly [boolean, string];
    /**
     * Gets or sets state. Throws an error if an invalid transition is attempted.
     * Use `StateMachine.isValid` to check validity without changing.
     *
     * If `newState` is the same as current state, the request is ignored silently.
     *
     * @memberof StateMachine
     */
    set state(newState: string);
    get state(): string;
    /**
     * Returns timestamp when state was last changed.
     * See also `elapsed`
     */
    get changedAt(): number;
    /**
     * Returns milliseconds elapsed since last state change.
     * See also `changedAt`
     */
    get elapsed(): number;
}
/**
 * Drive a state machine. [Demo sketch](https://github.com/ClintH/ixfx-demos/tree/main/flow/statemachine-regions)
 *
 * A description can be provided with functions to invoke for each named state.
 * The driver will invoke the function(s) corresponding to the current state of the machine.
 *
 * In the below example, it assumes a state machine with states 'init', 'one' and 'two'.
 *
 * ```js
 * StateMachine.drive(stateMachine, {
 *   init: () => {
 *     if (state.distances[0] > 0.1) return;
 *     return { state: `one` };
 *  },
 *   one: () => {
 *     if (state.distances[1] > 0.1) return;
 *     return { next: true };
 *   },
 *   two: () => {
 *     if (state.distances[2] > 0.1) return;
 *     return { reset: true };
 *   },
 *   __fallback:() => {
 *     // Handle case when the other handlers return undefined
 *   }
 * }
 * ```
 *
 * Three additional handlers can be defined: '__done', '__default'  and '__fallback'.
 * * '__done': used when there is no explicit handler for state and machine is done
 * * '__default': used if the state has no named handler
 * * '__fallback': used if there is no handler for state, or handler did not return a usable result.
 *
 * Each state can have a single function or array of functions to act as handlers.
 * The handler needs to return {@link DriverResult}. In the above example, you see
 * how to change to a named state (`{state: 'one'}`), how to trigger `sm.next()` and
 * how to reset the state machine.
 *
 * If the function cannot do anything, it can just return.
 *
 * Multiple functions can be provided to handle a particular state, eg:
 * ```js
 * StateMachine.drive(stateMachine, {
 *  init: [
 *    () => { ... },
 *    () => { ... }
 *  ]
 * })
 * ```
 *
 * When multiple functions are provided, by default the first that returns a result
 * and the result can be executed is used.
 *
 * It's also possible to use the highest or lowest scoring result. To do so, results
 * must have a `score` property, as shown below. Extra syntax also has to be provided
 * instead of a bare array of functions. This is how the logic for selecting results can be
 * set.
 *
 * ```js
 * StateMachine.drive(stateMachine, {
 *   init: {
 *    select: `highest`,
 *    expressions: [
 *     () => {
 *      // some logic...
 *      return { score: 0.1, state: `hello` }
 *     },
 *     () => {
 *      // some logic...
 *       return { score: 0.2, state: `goodbye` }
 *     }
 *    ]
 *   }
 * });
 * ```
 *
 * The score results likely should not be hardcoded as in the above example,
 * but rather based on some other dynamic values influencing what action to take.
 *
 * @param sm
 * @param driver
 * @returns
 */
declare const drive: <V>(sm: StateMachine, driver: StateDriverDescription<V>) => (args?: V | undefined) => void;

type StateMachine$1_DriverDescription<V> = DriverDescription<V>;
type StateMachine$1_DriverExpression<V> = DriverExpression<V>;
type StateMachine$1_DriverResult = DriverResult;
type StateMachine$1_MachineDescription = MachineDescription;
type StateMachine$1_Options = Options;
type StateMachine$1_State = State;
type StateMachine$1_StateChangeEvent = StateChangeEvent;
type StateMachine$1_StateDriverDescription<V> = StateDriverDescription<V>;
type StateMachine$1_StateEvent = StateEvent;
type StateMachine$1_StateHandler = StateHandler;
type StateMachine$1_StateMachine = StateMachine;
declare const StateMachine$1_StateMachine: typeof StateMachine;
type StateMachine$1_StateMachineEventMap = StateMachineEventMap;
type StateMachine$1_StopEvent = StopEvent;
declare const StateMachine$1_create: typeof create;
declare const StateMachine$1_descriptionFromList: typeof descriptionFromList;
declare const StateMachine$1_drive: typeof drive;
declare const StateMachine$1_fromList: typeof fromList;
declare const StateMachine$1_fromListBidirectional: typeof fromListBidirectional;
declare namespace StateMachine$1 {
  export {
    StateMachine$1_DriverDescription as DriverDescription,
    StateMachine$1_DriverExpression as DriverExpression,
    StateMachine$1_DriverResult as DriverResult,
    StateMachine$1_MachineDescription as MachineDescription,
    StateMachine$1_Options as Options,
    StateMachine$1_State as State,
    StateMachine$1_StateChangeEvent as StateChangeEvent,
    StateMachine$1_StateDriverDescription as StateDriverDescription,
    StateMachine$1_StateEvent as StateEvent,
    StateMachine$1_StateHandler as StateHandler,
    StateMachine$1_StateMachine as StateMachine,
    StateMachine$1_StateMachineEventMap as StateMachineEventMap,
    StateMachine$1_StopEvent as StopEvent,
    StateMachine$1_create as create,
    StateMachine$1_descriptionFromList as descriptionFromList,
    StateMachine$1_drive as drive,
    StateMachine$1_fromList as fromList,
    StateMachine$1_fromListBidirectional as fromListBidirectional,
  };
}

export { DriverResult as D, MachineDescription as M, Options as O, StateChangeEvent as S, StateMachine as a, StateMachine$1 as b, StopEvent as c, StateMachineEventMap as d, StateEvent as e, StateHandler as f, State as g, DriverExpression as h, DriverDescription as i, StateDriverDescription as j, descriptionFromList as k, fromList as l, fromListBidirectional as m, create as n, drive as o };
