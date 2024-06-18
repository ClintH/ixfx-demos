/**
 * A point, consisting of x, y and maybe z fields.
 */
type Point = {
    readonly x: number;
    readonly y: number;
    readonly z?: number;
};
type Point3d = Point & {
    readonly z: number;
};
/**
 * Placeholder point, where x and y is `NaN`.
 * Use `isPlaceholder` to check if a point is a placeholder.
 */
declare const Placeholder: Readonly<{
    x: number;
    y: number;
}>;

export { type Point as P, type Point3d as a, Placeholder as b };
