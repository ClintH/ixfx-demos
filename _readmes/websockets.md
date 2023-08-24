# Web Sockets

For sketches that use connectivity, a _web sockets_ server is needed, unfortunately not provided by Five Server.

To host your code remotely, it's recommended to try one of these options:

* Gitpod
* CodeSandbox
* Glitch

## Run on Gitpod

* [Open via Gitpod](https://gitpod.io/#https://github.com/ClintH/ixfx-demos-light)
* After signing in and as the project loads, you'll get prompted to open the workspace file. Opt for this.
* If you get prompted to make your server public, choose yes.
* The server will automatically start. Click on 'Ports: 8080' that appears in the bottom-right of the status bar and view ports.
* If the row corresponding with port '8080' does not have state 'open (public)', right-click and choose 'Make public'
* Click the 'copy' icon in that URL to grab the URL to your server. This is what you need to send to your mobile device and open up.

You can test it works by opening the [pointer-remote sketch](./pointer/remote/)

With a few extra steps, it's possible to use your _local_ copy of VS Code to edit projects hosted and running on Gitpod.

## Run on CodeSandbox

1. Sign in to [Codesandbox](https://codesandbox.io/)
2. [Open via Codesandbox](https://githubbox.com/clinth/ixfx-demos-light)
3. Click 'Fork' in the left-hand panel

The server URL shown in the preview panel is what you need to open on a mobile device. You can test it works by opening the [pointer-remote sketch](./pointer/remote/)

## Run on Glitch

* Create an account on [Glitch](https://glitch.com), for example using an existing Github account.
* 'Remix' [ixfx-demos on Glitch](https://glitch.com/edit/#!/ixfx-demos), to make your own copy.
* Click the 'Preview' button at the bottom toolbar, choosing 'Preview in a new window' from the pop-up options. This preview URL should work from any device.

When you're viewing the preview, Glitch will automatically start the provided web socket server.

You can test it works by opening the [pointer-remote sketch](./pointer/remote/)

It's possible to have a sketch served by a local server (eg Five Server) use a Glitch-hosted web socket server, such as a [fork of this one](https://glitch.com/edit/#!/ch-remote-test). To do so, you want to initialise the Remote instance as so:

```js
remote: new Remote({
  allowNetwork: true,
  websocket: `wss://YOUR-GLITCH-PROJECT.glitch.me/ws`,
})
```

While this provides a web socket server, it doesn't solve the problem of accessing your sketches from another device. To do this, you'll need to look at the guide to [accessing remotely](./ngrok.md).

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