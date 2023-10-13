# pose-sender

Transmits pose data via Remote.

To specify an id of the peer, use the `peerId` URL parameter. That is, we access the sketch via:

```
http://127.0.0.1:5555/ml/pose/sender/index.html?peerId=leftCamera
```

...this will give the sender the peer id of 'leftCamera'. In sketches where you receive data, this id will be associated with poses, allowing you to distinguish different poses depending on the source.

Read more
* [remote](https://github.com/clinth/remote) - a library for simplifying cross-device interaction