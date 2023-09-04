# Web Sockets

For sketches that use connectivity, a _web sockets_ server is needed, unfortunately not provided by Five Server.

To host your code remotely, it's recommended to try one of these options:

* Gitpod
* CodeSandbox
* Glitch

[Read more on how to set these up](https://github.com/ClintH/ixfx-demos-npm/blob/main/remote-machine.md)

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

# Host on Glitch

In this scenario, we'll continue to use Five Server and edit code locally, but host the websocket server on Glitch.


1. Start up a remix of this [Glitch project](https://glitch.com/edit/#!/ch-remote-test). 
2. When you set up Remote, use the URL to your Glitch project.

Eg:

```js
const settings = Object.freeze({
  remote: new Remote({
    allowNetwork: true,
    websocket: `wss://MY-ZANY-PROJECT-NAME.glitch.me/ws`
  })
});
```

If you are using a home wifi network, or have your devices hot-spotted together, you can open your webserver by its IP address. When Five Server starts up, you'll see something like:

```
Five Server running at:
> Local:    http://localhost:5555
> Network:  http://192.168.0.141:5555
```

On your mobile device (again, if it's on the same wifi network) you should be able to open the URL given for 'Network'. In the above example, http://192.168.0.141:5555.

To access your sketches outside of your network, you'll need to add ngrok to the mix. Please see [ngrok](./ngrok.md) for more on this.
