import { S as SimpleEventEmitter } from './Events-53171926';

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
 * const sm = new StateMachine(states[0], fromList(states));
 * ```
 * @param {...readonly} states
 * @param {*} string
 * @param {*} []
 * @return {*}  {MachineDescription}
 */
declare const fromList: (...states: readonly string[]) => MachineDescription;
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
 * const machine = new StateMachine(`sleep`, description);
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
declare const StateMachine$1_fromList: typeof fromList;
type StateMachine$1_StateMachine = StateMachine;
declare const StateMachine$1_StateMachine: typeof StateMachine;
declare namespace StateMachine$1 {
  export {
    StateMachine$1_Options as Options,
    StateMachine$1_StateChangeEvent as StateChangeEvent,
    StateMachine$1_StopEvent as StopEvent,
    StateMachine$1_State as State,
    StateMachine$1_MachineDescription as MachineDescription,
    StateMachine$1_fromList as fromList,
    StateMachine$1_StateMachine as StateMachine,
  };
}

export { MachineDescription as M, Options as O, StateMachine$1 as S, StateChangeEvent as a, StopEvent as b, State as c, StateMachine as d, fromList as f };