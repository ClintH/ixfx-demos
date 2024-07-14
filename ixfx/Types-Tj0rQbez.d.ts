/**
 * A random source.
 *
 * Predefined sources: {@link defaultRandom}, {@link gaussianSource}, {@link weightedSource}
 */
type RandomSource = () => number;
type StringOptions = Readonly<{
    length: number;
    source?: RandomSource;
}>;
/**
 * Default random number generator: `Math.random`.
 */
declare const defaultRandom: () => number;
type RandomOptions = Readonly<{
    max: number;
    min?: number;
    source?: RandomSource;
}>;
type GenerateRandomOptions = RandomOptions & Readonly<{
    /**
     * If true, number range is looped
     */
    loop?: boolean;
}>;

export { type GenerateRandomOptions as G, type RandomSource as R, type StringOptions as S, type RandomOptions as a, defaultRandom as d };
