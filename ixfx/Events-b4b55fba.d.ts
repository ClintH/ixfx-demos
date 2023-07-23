type Listener<Events> = (ev: unknown, sender: ISimpleEventEmitter<Events>) => void;
interface ISimpleEventEmitter<Events> {
    addEventListener<K extends keyof Events>(type: K, listener: (ev: Events[K], sender: ISimpleEventEmitter<Events>) => void): void;
    removeEventListener<K extends keyof Events>(type: K, listener: (ev: Events[K], sender: ISimpleEventEmitter<Events>) => void): void;
}

declare class SimpleEventEmitter<Events> implements ISimpleEventEmitter<Events> {
    #private;
    /**
     * Fire event
     * @private
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
    addEventListener<K extends keyof Events>(type: K, listener: (ev: Events[K], sender: SimpleEventEmitter<Events>) => void): void;
    /**
     * Remove event listener
     *
     * @param {Listener<Events>} listener
     * @memberof SimpleEventEmitter
     */
    removeEventListener<K extends keyof Events>(type: K, listener: (ev: Events[K], sender: SimpleEventEmitter<Events>) => void): void;
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
declare namespace Events {
  export {
    Events_ISimpleEventEmitter as ISimpleEventEmitter,
    Events_Listener as Listener,
    Events_SimpleEventEmitter as SimpleEventEmitter,
  };
}

export { Events as E, ISimpleEventEmitter as I, Listener as L, SimpleEventEmitter as S };
