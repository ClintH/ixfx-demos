# Accessing remotely via ngrok

You may want to develop your sketches on a laptop, and have your Five Server running there, but _run_ the sketches in a browser on a different device, most obviously your phone.

In this guide, we'll use [ngrok](https://ngrok.com) to help us 1. access sketches over the internet and 2. load sketches over HTTPS.

As an alternative, you can host and edit your code online. [Read more](./websockets.md).

Contents
- [Accessing remotely via ngrok](#accessing-remotely-via-ngrok)
- [URLs and addressing](#urls-and-addressing)
- [HTTPS](#https)
- [Tunneling service: Ngrok](#tunneling-service-ngrok)
- [Setting up ngrok](#setting-up-ngrok)
- [Using ngrok](#using-ngrok)

# URLs and addressing

When Five Server starts, it opens a Terminal at the bottom of Visual Studio Code, spitting out something like:

```
Five Server running at:
> Local:    http://localhost:5555
> Network:  http://192.168.0.140:5555
```

There are three key components of these URLs. The _scheme_, or _protocol_ (`http`), the _hostname_ or _IP_ (`localhost`, `192.168.0.140`) and the _port_ `5555`.

The scheme/protcol defines what 'language' to use when talking to a machine. In our cases, we use HTTP (web), HTTPS (secure web) and WSS (secure websockets).

The next part of the URL identifies _which_ machine of all the machines on the network/internet. When names are used, its called a _hostname_, or when a numeric identifier is used, its the _IP address_.

A hostname of 'localhost' or IP of '127.0.0.1' always refers to the same device, a so-called 'loopback' address. It's basically a reference like the words 'me' or 'self'. These URLs work fine when we have the server and browser running on the same machine but do not work when accessing from a different device, because _their_ 'localhost' or '127.0.0.1' refers to themselves, not your server.

So far we can determine _how_ to talk to a machine, and _which_ machine to talk to. The next _port_ determines which of the many services a machine may host we want to connect to. A given machine may have multiple web servers for example, and we need to be able to indicate which to use. 

Only one service at a time can use a given port. Five Server defaults to port 5555, but you may note it use a different port if you mistakenly have it already running in another window or some other service is sitting on port 5555.

# HTTPS

To make for a more secure world, browsers don't allow a lot of features if the code is loaded over the unsecure, HTTP protocol.

To simplify life for tinkers, browsers skip those policies if you are loading code from 'localhost' or '127.0.0.1' - the thinking is that if the code is already on your own machine it can be trusted more than random things from the internet.

However, if we want to access our sketches remotely, we can't access them from loopback addresses, and thus need to use HTTPS.

One way of solving it is to generate a self-signed SSL certificate, set Five Server to use it and install it on all your devices. Another option might be to put your code on a service like Glitch.com, and open it from there, since everything is hosted over HTTPS.

But for the best editing experience, we want to edit and store our code locally. A way of doing this is to add a _tunneling service_, in this case one called 'ngrok'.

# Tunneling service: Ngrok

Ngrok is a server that runs on your computer and connects to whatever service you want to make available over HTTPS and on the internet. In our case, that's the existing Five Server.

Once booted up, ngrok allows your server to be accessed on the internet. So a browser connects to ngrok which in turn forwards the request to your local Five Server.

# Setting up ngrok

1. Go to [ngrok.com](https://ngrok.com) and create an account or sign in with an existing account (eg using GitHub)
2. Install [ngrok following the instructions](https://dashboard.ngrok.com/get-started/setup)
3. Make a note of the 'authtoken' that is listed in step 2 of the instructions (eg: '12PMWdaefa3234...')
4. Install [ngrok for VSCode](https://marketplace.visualstudio.com/items?itemName=philnash.ngrok-for-vscode) extension
5. Edit `ngrok.yml` which is in the same directory as this file, and paste in your token. When done, it should look something like this:

```yaml
authtoken: 12SYCNNGx6KpoAtafEHE_1xKUN52C6ZrmJP5RZoMZK
tunnels:
  ixfx:
    proto: http
    addr: 5555
```

(...but obviously with your authtoken)

Now ngrok should be ready to use.

# Using ngrok

To start ngrok, open a terminal (via VS Code you can go _View > Terminal_) and run:
```
ngrok start --all --config ./ngrok.yml
```

Tip: if you have Node.js installed, you can also use `npm run ngrok` 

When it starts, should see _Account_ with your account name. You'll also see a _Forwarding_ URL.

Remember, to access your sketches remotely, you have to access them via the generated ngrok URL, eg 'https://abfe-4-186-119-23.ngrok-free.app'.

It's a good idea to stop ngrok when you are not using it, because it does expose your Five Server to the world (although someone would have to guess the URL to find it). To stop it, click in the terminal, and press CMD (or CTRL) and C.

