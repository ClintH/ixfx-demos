/**
 * This script mirrors the repo into ../ixfx-demos-light,
 * re-writing the imports so they use URL imports. This makes
 * it more readily runnable on web-based IDEs.
 * 
 * Usage:
 * node make-light.js
 */
import cpy from 'cpy';
import replace from 'replace-in-file';
import { deleteSync } from 'del';

const destination = `../ixfx-demos-light/`;

// Delete previous
deleteSync([ `../ixfx-demos-light/*`, `!.git` ], { force: true });

// Copy files
await cpy([
  `./**/*`,
  `!node_modules/**`,
  `!.git/**`,
  `!ixfx/**`,
  `!make-light.js`
], destination);

// Re-write imports
const replaceOptions = {
  files: `../ixfx-demos-light/**/*.js`,
  from: /(\.\.\/)*ixfx/g,
  to: `https://unpkg.com/ixfx/dist`,
};

try {
  replace.sync(replaceOptions);
  console.log(`Done!`);
}
catch (error) {
  console.error(`Error occurred:`, error);
}