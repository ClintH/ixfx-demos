import { S as SimpleEventEmitter } from './Events-MevXuVvQ.js';
import { L as LogOption } from './Logger-3Dx4p_J4.js';

type Result<V extends Transitions> = {
    /**
     * Score of this result. This is used when a state
     * has multiple handlers returning results separately.
     * If not defined, 0 is used.
     */
    readonly score?: number;
    /**
     * If specified,the state to transition to. Use
     * _true_ to attempt to automatically advance machine.
     * This field is 2nd priority.
     */
    readonly next?: StateNames<V> | boolean;
    /**
     * If true, resets the machine.
     * This flag is 1st priority, taking precedence over the `next` field.
     */
    readonly reset?: boolean;
};
type Runner<V extends Transitions> = {
    readonly run: () => Promise<MachineState<V> | undefined>;
    readonly getValue: () => StateNames<V>;
    readonly reset: () => void;
    readonly to: (state: StateNames<V>) => MachineState<V>;
};
type StatesHandler<V extends Transitions> = {
    readonly if: ReadonlyArray<StateNames<V>> | Array<StateNames<V>> | StateNames<V>;
    readonly then: ReadonlyArray<ExpressionOrResult<V>> | ExpressionOrResult<V>;
    /**
     * Logic for choosing which result, if there are multiple expressions.
     * By default 'highest' (for highest ranked result)
     */
    readonly resultChoice?: `first` | `highest` | `lowest` | `random`;
};
type DriverOpts<V extends Transitions> = {
    readonly handlers: ReadonlyArray<StatesHandler<V>>;
    readonly debug?: LogOption;
    /**
     * If _true_ execution of handlers is shuffled each time
     */
    readonly shuffleHandlers?: boolean;
};
type ExpressionOrResult<Transitions extends Transitions> = Result<Transitions> | ((machine?: MachineState<Transitions>) => Result<Transitions> | undefined | void);
/**
 * Drives a state machine.
 *
 * Defaults to selecting the highest-ranked result to determine
 * what to do next.
 * @param machine
 * @param handlersOrOpts
 * @returns
 */
declare function init$1<V extends Transitions>(machine: Machine<V> | Transitions, handlersOrOpts: ReadonlyArray<StatesHandler<V>> | DriverOpts<V>): Promise<Runner<V>>;

type StateChangeEvent<V extends Transitions> = {
    readonly newState: StateNames<V>;
    readonly priorState: StateNames<V>;
};
type StopEvent<V extends Transitions> = {
    readonly state: StateNames<V>;
};
type StateMachineEventMap<V extends Transitions> = {
    readonly change: StateChangeEvent<V>;
    readonly stop: StopEvent<V>;
};
type Opts<V extends Transitions> = {
    readonly debug?: boolean;
    readonly initial?: StateNames<V>;
};
/**
 * A state machine that fires events when state changes.
 *
 * ```js
 * const transitions = StateMachine.fromList(`a`, `b`, `c`);
 * const m = new StateMachineWithEvents(transitions);
 * m.addEventListener(`change`, event => {
 *  console.log(`${event.priorState} -> ${event.newState}`);
 * });
 * m.addEventListener(`stop`, event => {
 *  console.log(`State machine has reached final state`);
 * });
 * ```
 */
declare class StateMachineWithEvents<V extends Transitions> extends SimpleEventEmitter<StateMachineEventMap<V>> {
    #private;
    /**
     * Create a state machine with initial state, description and options
     * @param m Machine description
     * @param opts Options for machine (defaults to `{debug:false}`)
     */
    constructor(m: V, opts?: Opts<V>);
    /**
     * Return a list of possible states from current state.
     *
     * If list is empty, no states are possible. Otherwise lists
     * possible states, including 'null' for terminal
     */
    get statesPossible(): ReadonlyArray<StateNames<V> | null>;
    /**
     * Return a list of all defined states
     */
    get statesDefined(): ReadonlyArray<StateNames<V>>;
    /**
     * Moves to the next state if possible. If multiple states are possible, it will use the first.
     * If machine is finalised, no error is thrown and null is returned.
     *
     * @returns {(string|null)} Returns new state, or null if machine is finalised
     * @memberof StateMachine
     */
    next(): string | null;
    /**
     * Returns _true_ if state machine is in its final state
     *
     * @returns
     */
    get isDone(): boolean;
    /**
     * Resets machine to initial state
     */
    reset(): void;
    /**
     * Throws if it's not valid to transition to `newState`
     * @param newState
     * @returns
     */
    validateTransition(newState: StateNames<V>): void;
    /**
     * Returns _true_ if `newState` is valid transition from current state.
     * Use {@link validateTransition} if you want an explanation for the _false_ results.
     * @param newState
     * @returns
     */
    isValid(newState: StateNames<V>): boolean;
    /**
     * Gets or sets state. Throws an error if an invalid transition is attempted.
     * Use `isValid()` to check validity without changing.
     *
     * If `newState` is the same as current state, the request is ignored silently.
     *
     * @memberof StateMachine
     */
    set state(newState: StateNames<V>);
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
 * State machine driver
 */

/**
 * Transition result
 * * 'Ok': transition valid
 * * 'FromNotFound': the from state is missing from machine definition
 * * 'ToNotFound': the 'to' state is missing from machine definition
 * * 'Invalid': not allowed to transition to target state from the current state
 * * 'Terminal':  not allowed to transition because from state is the final state
 */
type TransitionResult = `Ok` | `FromNotFound` | `ToNotFound` | `Invalid` | `Terminal`;
type TransitionCondition<V extends Transitions> = {
    readonly hasPriorState: ReadonlyArray<StateNames<V>>;
    readonly isInState: StateNames<V>;
};
type StateTargetStrict<V extends Transitions> = {
    readonly state: StateNames<V> | null;
    readonly preconditions?: ReadonlyArray<TransitionCondition<V>>;
};
/**
 * Possible state transitions, or _null_ if final state.
 */
type StateTarget<V extends Transitions> = string | Array<string> | ReadonlyArray<string> | null | StateTargetStrict<V>;
/**
 * Maps state to allowable next states
 */
type Transitions = {
    readonly [key: string]: StateTarget<Transitions>;
};
type TransitionsStrict = Readonly<Record<string, ReadonlyArray<StateTargetStrict<Transitions>>>>;
/**
 * List of possible states
 */
type StateNames<V extends Transitions> = keyof V & string;
type Machine<V extends Transitions> = {
    /**
     * Allowable state transitions
     */
    readonly states: V;
};
/**
 * Encapsulation of a 'running' machine description and state.
 *
 * See:
 * - {@link cloneState}
 */
type MachineState<V extends Transitions> = {
    /**
     * Current state
     */
    readonly value: StateNames<V>;
    /**
     * List of unique states visited. Won't contain the current
     * state unless it has already been visited.
     */
    readonly visited: ReadonlyArray<StateNames<V>>;
    readonly machine: {
        readonly [key in StateNames<V>]: ReadonlyArray<StateTargetStrict<V>>;
    };
};
/**
 * Clones machine state
 * @param toClone
 * @returns Cloned of `toClone`
 */
declare const cloneState: <V extends Transitions>(toClone: MachineState<V>) => MachineState<V>;
/**
 * Initialises a state machine
 * ```js
 * const desc = {
 *  pants: ['shoes','socks'],
 *  socks: ['shoes', 'pants'],
 *  shoes: 'shirt',
 *  shirt: null
 * }
 * // Defaults to first key, 'pants'
 * let sm = StateMachine.init(descr);
 * // Move to 'shoes' state
 * sm = StateMachine.to(sm, 'shoes');
 * sm.state; // 'shoes'
 * sm.visited; // [ 'pants' ]
 * StateMachineLight.done(sm); // false
 * StateMachineLight.possible(sm); // [ 'shirt' ]
 * ```
 * @param sm
 * @param initialState
 * @returns
 */
declare const init: <V extends Transitions>(stateMachine: Machine<V> | Transitions | TransitionsStrict, initialState?: StateNames<V>) => MachineState<V>;
declare const reset: <V extends Transitions>(sm: MachineState<V>) => MachineState<V>;
declare const validateMachine: <V extends Transitions>(smOrTransitions: Machine<V> | Transitions | TransitionsStrict) => [machine: Machine<V> | undefined, msg: string];
/**
 * Returns _true_ if `sm` is in its final state.
 * @param sm
 * @returns
 */
declare const done: <V extends Transitions>(sm: MachineState<V>) => boolean;
/**
 * Returns a list of possible state targets for `sm`, or
 * an empty list if no transitions are possible.
 * @param sm
 * @returns
 */
declare const possibleTargets: <V extends Transitions>(sm: MachineState<V>) => ReadonlyArray<StateTargetStrict<V>>;
/**
 * Returns a list of possible state names for `sm`, or
 * an empty list if no transitions are possible.
 *
 * @param sm
 * @returns
 */
declare const possible: <V extends Transitions>(sm: MachineState<V>) => Array<StateNames<V> | null>;
declare const normaliseTargets: <V extends Transitions>(targets: StateTarget<V> | ReadonlyArray<StateTargetStrict<V>> | StateTargetStrict<V>) => Array<StateTargetStrict<V>> | null | undefined;
/**
 * Attempts to transition to a new state. Either a new
 * `MachineState` is returned reflecting the change, or
 * an exception is thrown.
 * @param sm
 * @param toState
 * @returns
 */
declare const to: <V extends Transitions>(sm: MachineState<V>, toState: StateNames<V>) => MachineState<V>;
declare const next: <V extends Transitions>(sm: MachineState<V>) => MachineState<V>;
/**
 * Returns _true_ if `toState` is a valid transition from current state of `sm`
 * @param sm
 * @param toState
 * @returns
 */
declare const isValidTransition: <V extends Transitions>(sm: MachineState<V>, toState: StateNames<V>) => boolean;
declare const validateTransition: <V extends Transitions>(sm: MachineState<V>, toState: StateNames<V>) => void;
/**
 * Returns state transitions based on a list of strings.
 * The last string is the terminal state.
 *  A -> B -> C -> D
 *
 * See also: {@link fromListBidirectional}
 *
 * ```js
 * const transitions = fromList([`a`, `b`, `c`, `d`]);
 * // Object state machine with events
 * const sm = new StateMachine.WithEvents(transitions);
 * // OR, immutable state machine
 * const sm = StateMachine.init(transitions);
 * ```
 * @param states List of states
 * @return MachineDescription
 */
declare const fromList: (...states: ReadonlyArray<string>) => Transitions;
/**
 * Returns a machine description based on a list of strings. Machine
 * can go back and forth between states:
 *  A <-> B <-> C <-> D
 *
 * See also {@link fromList}.
 *
 * ```js
 * const transitions = fromListBidirectional([`a`, `b`, `c`, `d`]);
 * // Object state machine with events
 * const sm = new StateMachine.WithEvents(transitions);
 * // OR, immutable state machine
 * const sm = StateMachine.init(transitions);
 * ```
 * @param states
 * @returns
 */
declare const fromListBidirectional: (...states: ReadonlyArray<string>) => Transitions;

type StateMachine_DriverOpts<V extends Transitions> = DriverOpts<V>;
type StateMachine_Machine<V extends Transitions> = Machine<V>;
type StateMachine_MachineState<V extends Transitions> = MachineState<V>;
type StateMachine_Runner<V extends Transitions> = Runner<V>;
type StateMachine_StateMachineEventMap<V extends Transitions> = StateMachineEventMap<V>;
type StateMachine_StateNames<V extends Transitions> = StateNames<V>;
type StateMachine_StateTarget<V extends Transitions> = StateTarget<V>;
type StateMachine_StateTargetStrict<V extends Transitions> = StateTargetStrict<V>;
type StateMachine_StopEvent<V extends Transitions> = StopEvent<V>;
type StateMachine_TransitionCondition<V extends Transitions> = TransitionCondition<V>;
type StateMachine_TransitionResult = TransitionResult;
type StateMachine_Transitions = Transitions;
type StateMachine_TransitionsStrict = TransitionsStrict;
declare const StateMachine_cloneState: typeof cloneState;
declare const StateMachine_done: typeof done;
declare const StateMachine_fromList: typeof fromList;
declare const StateMachine_fromListBidirectional: typeof fromListBidirectional;
declare const StateMachine_init: typeof init;
declare const StateMachine_isValidTransition: typeof isValidTransition;
declare const StateMachine_next: typeof next;
declare const StateMachine_normaliseTargets: typeof normaliseTargets;
declare const StateMachine_possible: typeof possible;
declare const StateMachine_possibleTargets: typeof possibleTargets;
declare const StateMachine_reset: typeof reset;
declare const StateMachine_to: typeof to;
declare const StateMachine_validateMachine: typeof validateMachine;
declare const StateMachine_validateTransition: typeof validateTransition;
declare namespace StateMachine {
  export { type ExpressionOrResult as DriverExpression, type StatesHandler as DriverHandler, type StateMachine_DriverOpts as DriverOpts, type Result as DriverResult, type StateMachine_Machine as Machine, type StateMachine_MachineState as MachineState, type StateMachine_Runner as Runner, type StateMachine_StateMachineEventMap as StateMachineEventMap, type Opts as StateMachineWithEventsOpts, type StateMachine_StateNames as StateNames, type StateMachine_StateTarget as StateTarget, type StateMachine_StateTargetStrict as StateTargetStrict, type StateMachine_StopEvent as StopEvent, type StateMachine_TransitionCondition as TransitionCondition, type StateMachine_TransitionResult as TransitionResult, type StateMachine_Transitions as Transitions, type StateMachine_TransitionsStrict as TransitionsStrict, StateMachineWithEvents as WithEvents, StateMachine_cloneState as cloneState, StateMachine_done as done, init$1 as driver, StateMachine_fromList as fromList, StateMachine_fromListBidirectional as fromListBidirectional, StateMachine_init as init, StateMachine_isValidTransition as isValidTransition, StateMachine_next as next, StateMachine_normaliseTargets as normaliseTargets, StateMachine_possible as possible, StateMachine_possibleTargets as possibleTargets, StateMachine_reset as reset, StateMachine_to as to, StateMachine_validateMachine as validateMachine, StateMachine_validateTransition as validateTransition };
}

export { type StateMachineEventMap as A, type StopEvent as B, type DriverOpts as D, type ExpressionOrResult as E, type Machine as M, type Opts as O, type Runner as R, type StateChangeEvent as S, type Transitions as T, StateMachineWithEvents as a, StateMachine as b, type TransitionResult as c, type TransitionCondition as d, type StateTargetStrict as e, type StateTarget as f, type TransitionsStrict as g, type StateNames as h, type MachineState as i, cloneState as j, init as k, done as l, possible as m, normaliseTargets as n, next as o, possibleTargets as p, isValidTransition as q, reset as r, validateTransition as s, to as t, fromList as u, validateMachine as v, fromListBidirectional as w, init$1 as x, type StatesHandler as y, type Result as z };
