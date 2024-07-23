type MinMaxAvgTotal = {
    /**
     * Smallest value in array
     */
    readonly min: number;
    /**
     * Total of all items
     */
    readonly total: number;
    /**
     * Largest value in array
     */
    readonly max: number;
    /**
     * Average value in array
     */
    readonly avg: number;
};
type MinMaxAvgOpts = {
    /**
     * Start index, inclusive
     */
    readonly startIndex?: number;
    /**
     * End index, exclusive
     */
    readonly endIndex?: number;
};

export type { MinMaxAvgOpts as M, MinMaxAvgTotal as a };
