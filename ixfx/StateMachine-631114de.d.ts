import { S as SimpleEventEmitter } from './Events-d728150d.js';

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
declare type StateMachineEventMap = {
    readonly change: StateChangeEvent;
    readonly stop: StopEvent;
};
declare type StateEvent = (args: unknown, sender: StateMachine) => void;
declare type StateHandler = string | StateEvent | null;
interface State {
    readonly [event: string]: StateHandler;
}
interface MachineDescription {
    readonly [key: string]: string | readonly string[] | null;
}
/**
 * Returns a machine description based on a list of strings. The final string is the final
 * state.
 *
 * ```js
 * const states = [`one`, `two`, `three`];
 * const sm = StateMachine.create(states[0], descriptionFromList(states));
 * ```
 * @param {...readonly} states
 * @param {*} string
 * @param {*} []
 * @return {*}  {MachineDescription}
 */
declare const descriptionFromList: (...states: readonly string[]) => MachineDescription;
/**
 * Returns a state machine based on a list of strings. The first string is used as the initial state,
 * the last string is considered the final. To just generate a description, use {@link descriptionFromList}.
 *
 * ```js
 * const states = [`one`, `two`, `three`];
 * const sm = StateMachine.fromList(states);
 * ```
 */
declare const fromList: (...states: readonly string[]) => StateMachine;
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
     * @param {string} initial Initial state
     * @param {MachineDescription} m Machine description
     * @param {Options} [opts={debug: false}] Options for machine
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
     * @param {string} priorState From state
     * @param {string} newState To state
     * @param {MachineDescription} description Machine description
     * @returns {[boolean, string]} If valid: [true,''], if invalid: [false, 'Error msg here']
     * @memberof StateMachine
     */
    static isValid(priorState: string, newState: string, description: MachineDescription): readonly [boolean, string];
    isValid(newState: string): readonly [boolean, string];
    /**
     * Sets state. Throws an error if an invalid transition is attempted.
     * Use `StateMachine.isValid` to check validity without changing.
     *
     * @memberof StateMachine
     */
    set state(newState: string);
    /**
   * Return current state
   *
   * @type {string}
   * @memberof StateMachine
   */
    get state(): string;
}

type StateMachine$1_Options = Options;
type StateMachine$1_StateChangeEvent = StateChangeEvent;
type StateMachine$1_StopEvent = StopEvent;
type StateMachine$1_State = State;
type StateMachine$1_MachineDescription = MachineDescription;
declare const StateMachine$1_descriptionFromList: typeof descriptionFromList;
declare const StateMachine$1_fromList: typeof fromList;
declare const StateMachine$1_create: typeof create;
type StateMachine$1_StateMachine = StateMachine;
declare const StateMachine$1_StateMachine: typeof StateMachine;
declare namespace StateMachine$1 {
  export {
    StateMachine$1_Options as Options,
    StateMachine$1_StateChangeEvent as StateChangeEvent,
    StateMachine$1_StopEvent as StopEvent,
    StateMachine$1_State as State,
    StateMachine$1_MachineDescription as MachineDescription,
    StateMachine$1_descriptionFromList as descriptionFromList,
    StateMachine$1_fromList as fromList,
    StateMachine$1_create as create,
    StateMachine$1_StateMachine as StateMachine,
  };
}

export { MachineDescription as M, Options as O, StateMachine as S, StateChangeEvent as a, StateMachine$1 as b, StopEvent as c, State as d, descriptionFromList as e, fromList as f, create as g };
