# Web Sockets

For sketches that use connectivity, a _web sockets_ server is needed, unfortunately not provided by Five Server.

## Run on Glitch

* Create an account on [Glitch](https://glitch.com), for example using an existing Github account.
* 'Remix' [ixfx-demos on Glitch](https://glitch.com/edit/#!/ixfx-demos), to make your own copy.
* Click the 'Preview' button at the bottom toolbar, choosing 'Preview in a new window' from the pop-up options. This preview URL should work from any device.

When you're viewing the preview, Glitch will automatically start the provided web socket server.

You can test it works by opening the [pointer-remote sketch](./pointer/remote/)

## Run on your own machine

### Step 1. Install Node.js

You can test if you have Node.js installed by opening a terminal and running `node -v`. If you get an error like command not found, you do not have Node.js installed.

Although Node.js offers installers for Windows and Mac, these aren't recommended.

For Windows:
1. Install [NVM for Windows](https://github.com/coreybutler/nvm-windows)
2. At a command line, run `nvm install latest` and then `nvm use latest`

For Mac, [follow the instructions here](https://twm.me/best-practice-for-installing-node-js-for-developers-on-mac-os/) for installing via NVM and Homebrew

### Step 2. Install packages

At the root of the demos folder, run `npm install`.

### Step 3. Run

Now that the two preliminary steps are complete, you will just have to run the server when you like:

```
npm start
```

Use CMD/CTRL+C to stop the server.