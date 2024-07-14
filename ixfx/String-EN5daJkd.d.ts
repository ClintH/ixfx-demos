import { S as StringOptions } from './Types-Tj0rQbez.js';

/**
 * Returns a string of random letters and numbers of a given `length`.
 *
 * ```js
 * string();  // Random string of length 5
 * string(4); // eg. `4afd`
 * ```
 * @param length Length of random string
 * @returns Random string
 */
declare const string: (lengthOrOptions?: number | StringOptions) => string;

export { string as s };
