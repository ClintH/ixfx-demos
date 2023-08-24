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

* [Follow the instructions on the Glitch-hosted demos](https://glitch.com/edit/#!/ixfx-demos?path=package.json%3A1%3A0)

## Run on your own machine

### Step 1. Install Node.js

[Instructions](./install-nodejs.md)

### Step 2. Install packages

At the root of the demos folder, run `npm install`.

### Step 3. Run

Now that the two preliminary steps are complete, you will just have to run the server when you like:

```
npm start
```

Use CMD/CTRL+C to stop the server.