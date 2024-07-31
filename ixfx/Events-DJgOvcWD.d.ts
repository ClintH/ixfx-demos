import { I as Interval } from './IntervalType-B4PbUkjV.js';

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
 * @param target Event source
 * @param eventNames Event name(s)
 * @param options Options
 * @returns
 */
declare const eventRace: (target: EventTarget, eventNames: Array<string>, options?: Partial<{
    timeout: Interval;
    signal: AbortSignal;
}>) => Promise<Event>;
declare class SimpleEventEmitter<Events> implements ISimpleEventEmitter<Events> {
    #private;
    dispose(): void;
    get isDisposed(): boolean;
    /**
     * Fire event
     * @param type Type of event
     * @param args Arguments for event
     * @returns
     */
    protected fireEvent<K extends keyof Events>(type: K, args: Events[K]): void;
    /**
     * Adds event listener.
     *
     * @throws Error if emitter is disposed
     * @typeParam K - Events
     * @param name Event name
     * @param listener Event handler
     */
    addEventListener<K extends keyof Events>(name: K, listener: (event: Events[K], sender: SimpleEventEmitter<Events>) => void): void;
    /**
     * Remove event listener
     *
     * @param listener
     */
    removeEventListener<K extends keyof Events>(type: K, listener: (event: Events[K], sender: SimpleEventEmitter<Events>) => void): void;
    /**
     * Clear all event listeners
     * @private
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
