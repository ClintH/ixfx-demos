declare type Listener<Events> = (ev: unknown, sender: SimpleEventEmitter<Events>) => void;
declare class SimpleEventEmitter<Events> {
    #private;
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
    removeEventListener<K extends keyof Events>(type: K, listener: Listener<Events>): void;
    /**
     * Clear all event listeners
     *
     * @memberof SimpleEventEmitter
     */
    clearEventListeners(): void;
}

export { SimpleEventEmitter as S };
