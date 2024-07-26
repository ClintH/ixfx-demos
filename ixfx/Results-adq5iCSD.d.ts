type Result<T> = {
    success: boolean;
    value?: T;
    error?: Error | string;
};
type ResultOk<T> = {
    success: true;
    value: T;
};
type ResultError = {
    success: false;
    error: Error | string;
};
/**
 * If `result` is an error, throws it, otherwise ignored.
 * @param result
 * @returns
 */
declare function throwResult<T>(result: Result<T>): result is ResultOk<T>;

export { type Result as R, type ResultError as a, type ResultOk as b, throwResult as t };
