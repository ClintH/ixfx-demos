# Running local

You can get up and running from a ZIP file, or cloning the repository. It's recommended to use [Visual Studio Code](https://code.visualstudio.com) to edit code. All the sketches are set for editing and running code offline - it includes a recent build of the ixfx library.

## Getting the source

Using Git (recommended):

1. Install the [Github deskop app](https://desktop.github.com) if you don't already have it
2. Clone [this repository](https://github.com/ClintH/ixfx-demos.git) to a folder. This gives you a local copy of the source, and can be easily updated if the repository changes.

As a ZIP:

1. [Download a ZIP of this repository](https://github.com/ClintH/ixfx-demos/archive/refs/heads/main.zip)
2. Unpack it to a place where you can work on the files

## Running

Each sketch is contained in its own folder. Once you're ready to modify, duplicate the sketch folder so you always have the original to go back to if you need. Along your way, make new copies of the sketch folder to keep snapshots of your work.

_Note:_ 'Five-Server (Live-Server)' is a fork of 'Live-Server', don't install 'Live-Server'.

1. Install the [Five-Server](https://marketplace.visualstudio.com/items?itemName=yandeu.five-server) extension
2. Start it via the `Go Live` button in the VS Code toolbar
3. Test that the demos work from your local copy

## Paths

If you move the folder within the directory structure, you may need to modify the HTML and JS files to correct the pathing.

You'll quickly see this as a problem because you'll get file not found errors in the console.

Consider `easing-tick`, which is contained in `modulation`. From the base, the relative path for its `script.js` is `modulation/easing-tick/script.js`.

```
+ dom
+ flow
- modulation
 - easing-tick
  . index.html
  . script.js
 + easing-timer
 + env-decay
 . index.html
+ ixfx
+ easing-tick
. index.html
. base.css
```

When importing in a script file, references are relative to the location of the script. 

If we want to import from ixfx's `modulation.js` module in `easing-tick`, we can't just write:

```js
import { Easings } from 'modulation.js'
```

Because 'modulation.js' is not in the same folder as `easing-tick`'s `script.js`. Rather, it can be found two folders 'up', and contained in a folder called `ixfx`.

Thus, `modulation\easing-tick\script.js` declares the import as:

```js
import { Easings } from '../../ixfx/modulation.js';
```

`../` means 'one folder up'. We need two because we have to go up twice: out of `easing-tick` and out of `modulation` in order to get to be able to 'reach' the `ixfx` folder.

If `easing-tick` was instead located in the root folder:

```
+ dom
+ flow
+ modulation
+ ixfx
+ easing-tick
  . index.html
  . script.js
. index.html
. base.css
```

We'd have to change the import to:

```
import { Easings } from '../ixfx/modulation.js';
```

Because now we only have to go 'up' once from `easing-tick` in order to reach `ixfx/modulation.js`. 
