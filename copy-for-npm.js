/**
 * This script mirrors source files into ../ixfx-demos-npm.
 */
import cpy from 'cpy';
import { deleteSync } from 'del';

const destinationRoot = `../ixfx-demos-npm`;
const destination = `${destinationRoot}/src`;

// Delete previous src
deleteSync([ destination ], { force: true });

const categories = `audio camera data dom flow geometry io ml modulation pointer starters visuals`.split(` `);

// Copy sketches
for (const c of categories) {
  await cpy([`${c}/**/*`], `${destination}/${c}`);
}

// Copy loose files
await cpy([`index.html`, `favicon.ico`, `demos.css`], `${destination}/`);
await cpy([`.eslintrc.json`], `${destinationRoot}/`);


console.log(`copy-for-npm done`);