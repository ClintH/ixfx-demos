# Using Ngrok with websockets

If you have Node.js installed and serving your sketches via `npm run serve`, the default ngrok config won't tunnel websockets.

To fix this:
1. Stop ngrok (CMD or CTRL + C in the terminal it is running), stop the Five Server VS Code extension
2. Open `ngrok.yml`
3. Add in the `ws` block you see below, keeping everything else the same

```yaml
authtoken: 12SYCNNGx6KpoAtafEHE_1xKUN52C6ZrmJP5RZoMZK
tunnels:
    ixfx:
        proto: http
        addr: 5555
    ws:
        proto: http
        addr: 8080
version: "2"
```

Now that it's configured, you can start the servers locally. We do this instead of the VS Code extension.

```
npm run serve
```

With the servers running, you can start ngrok:

```
npm run ngrok
```

Now there are two 'Forwarding' URLs, for example:

```
Forwarding       https://246d-80-208-67-54.ngrok-free.app -> http://localhost:5555                                             
Forwarding       https://f612-80-208-67-54.ngrok-free.app -> http://localhost:8080        
```

The one that points to the :5555 address is for your 'Five Server'. This is the URL to open in your browser.

The one that points to the :8080 one is the websocket URL. We use this when initialising Remote:

```js
const settings = Object.freeze({
  remote: new Remote({
    allowNetwork: true,
    websocket: `wss://f612-80-208-67-54.ngrok-free.app`
  })
});
```

Note also how `wss://` is used, not `https://`.

With the free ngrok account unfortunately these URLs change each time you start ngrok.