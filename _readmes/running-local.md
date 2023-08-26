# Running local

You can get up by cloning from a Git repository. Use [Visual Studio Code](https://code.visualstudio.com) (VSC) to edit code. All the sketches are set for editing and running code offline - it includes a recent build of the ixfx library.

## Getting the source

Using Git (recommended):

1. Install the [Github desktop app](https://desktop.github.com) if you don't already have it
2. Clone [this repository](https://github.com/ClintH/ixfx-demos.git) to a folder. This gives you a local copy of the source, and can be easily updated if the repository changes.
3. You can right-click on the name of the repository and choose 'Open in Visual Studio Code'

OR, download a ZIP file (not recommended):

1. [Download a ZIP of this repository](https://github.com/ClintH/ixfx-demos/archive/refs/heads/main.zip)
2. Unpack it to a place where you can work on the files
3. Open VS Code and choose 'File -> Open Folder' and then select the folder `ixfx-demos-main`.

## Running & editing

When you open the folder for the first time, VSC might prompt you to install recommended extensions. Choose 'Install' for these.

A key extension to install (if it doesn't happen automatically) is [Five-Server](https://marketplace.visualstudio.com/items?itemName=yandeu.five-server).

Each sketch is contained in its own folder. Once you're ready to modify, duplicate the sketch folder so you always have the original to go back to if you need. Along your way, make new copies of the sketch folder to keep snapshots of your work.

View the output via the `Go Live` button in the VSC toolbar. By default it will start a web server so that your sketches are available at: `http://127.0.0.1:5555`.

Whenever you save a file the browser should automatically refresh.
 
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
