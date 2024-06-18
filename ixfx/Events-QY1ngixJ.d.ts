import { I as Interval } from './IntervalType-CQa4mlKV.js';

type Listener<Events> = (event: unknown, sender: ISimpleEventEmitter<Events>) => void;
type ISimpleEventEmitter<Events> = {
    addEventListener<K extends keyof Events>(type: K, listener: (event: Events[K], sender: ISimpleEventEmitter<Events>) => void): void;
    removeEventListener<K extends keyof Events>(type: K, listener: (event: Events[K], sender: ISimpleEventEmitter<Events>) => void): void;
};

/**
 * Subscribes to events on `target`, returning the event data
 * from the first event that fires.
 *
 * By default waits a maximum of 1 minute.
 *
 * Automatically unsubscribes on success or failure (ie. timeout)
 *
 * ```js
 * // Event will be data from either event, whichever fires first
 * // Exception is thrown if neither fires within 1 second
 * const event = await eventRace(document.body, [`pointermove`, `pointerdown`], { timeout: 1000 });
 * ```
 * @param target
 * @param eventNames
 * @param opts
 * @returns
 */
declare const eventRace: (target: EventTarget, eventNames: Array<string>, opts?: Partial<{
    timeout: Interval;
    signal: AbortSignal;
}>) => Promise<Event>;
declare class SimpleEventEmitter<Events> implements ISimpleEventEmitter<Events> {
    #private;
    /**
     * Fire event
     * @param type Type of event
     * @param args Arguments for event
     * @returns
     */
    protected fireEvent<K extends keyof Events>(type: K, args: Events[K]): void;
    /**
     * Adds event listener
     *
     * @template K
     * @param {K} type
     * @param {Listener<Events>} listener
     * @memberof SimpleEventEmitter
     */
    addEventListener<K extends keyof Events>(type: K, listener: (event: Events[K], sender: SimpleEventEmitter<Events>) => void): void;
    /**
     * Remove event listener
     *
     * @param {Listener<Events>} listener
     * @memberof SimpleEventEmitter
     */
    removeEventListener<K extends keyof Events>(type: K, listener: (event: Events[K], sender: SimpleEventEmitter<Events>) => void): void;
    /**
     * Clear all event listeners
     * @private
     * @memberof SimpleEventEmitter
     */
    clearEventListeners(): void;
}

type Events_ISimpleEventEmitter<Events> = ISimpleEventEmitter<Events>;
type Events_Listener<Events> = Listener<Events>;
type Events_SimpleEventEmitter<Events> = SimpleEventEmitter<Events>;
declare const Events_SimpleEventEmitter: typeof SimpleEventEmitter;
declare const Events_eventRace: typeof eventRace;
declare namespace Events {
  export { type Events_ISimpleEventEmitter as ISimpleEventEmitter, type Events_Listener as Listener, Events_SimpleEventEmitter as SimpleEventEmitter, Events_eventRace as eventRace };
}

export { Events as E, type ISimpleEventEmitter as I, type Listener as L, SimpleEventEmitter as S, eventRace as e };
