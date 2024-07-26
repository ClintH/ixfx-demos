import { S as StringOptions } from './Types-CR0Pe5zY.js';

/**
 * Returns a string of random letters and numbers of a given `length`.
 *
 * ```js
 * string();  // Random string of length 5
 * string(4); // eg. `4afd`
 * ```
 * @param lengthOrOptions Length of random string, or options.
 * @returns Random string
 */
declare const string: (lengthOrOptions?: number | StringOptions) => string;

export { string as s };
