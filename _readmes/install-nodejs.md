# Install Node.js

You can test if you have Node.js installed by opening a terminal and running `node -v`. If you get an error like command not found, you do not have Node.js installed.

Although [Node.js offers installers for Windows and Mac](https://nodejs.org/en/download/current), these aren't recommended.

Instead, install Node via [Fast Node Manager (fnm)](https://github.com/Schniz/fnm).

## macOS

On macOS, open a Terminal and copy and paste this line:

```
curl -fsSL https://fnm.vercel.app/install | bash
```

Assuming it works OK, close the Terminal window, open a new one and run:
```
fnm install --latest
```

To test that Node.js is working, run: `node -v`

## Windows

On Windows, open a termainal and copy and paste this line:

```
winget install Schniz.fnm
```

If you get a 'command not found' error, you may need to install [Winget from the Microsoft store](https://www.microsoft.com/

Close the terminal window and open a new one, and run:
```
fnm install --latest
```

To test that Node.js is working, run: `node -v`

