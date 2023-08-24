/**
 * This script mirrors source files into ../ixfx-demos-glitch,
 * re-writing the imports so they use URL imports.
 */
import cpy from 'cpy';
import replace from 'replace-in-file';
import { deleteSync } from 'del';

const destination = `../ixfx-demos-glitch`;
const categories  =`audio camera data dom flow geometry io ml modulation pointer starters visuals`.split(` `);
const deletePatterns = categories.map(c => `${destination}/${c}/`);

// Delete previous sketch categories
deleteSync(deletePatterns, { force: true });

// Copy files
for (const c of categories) {
  await cpy([`${c}/**/*`], `${destination}/${c}`);
}

// // Re-write imports
const replaceOptions = {
  files: `${destination}/**/*.js`,
  from: /(\.\.\/)*ixfx/g,
  to: `https://unpkg.com/ixfx/dist`,
};

try {
  replace.sync(replaceOptions);
  console.log(`copy-for-glitch done`);
}
catch (error) {
  console.error(`copy-for-glitch error occurred:`, error);
}