# completion

Demonstrates
[completionMs](https://clinth.github.io/ixfx/functions/Flow.completionMs.html).

In this case, we start tracking elapsed time when there is a `pointerdown`
event. The tracker is deleted on `pointerup`.

`completionMs()` takes a total time as a parameter. It returns a function, which
itself returns the percentage of time elapsed.

```
// Track elapsed time over one second
const t = completionMs(1000);

// t is a function that returns % elapsed, on a 0..1 scale
t(); // 0...1
```

When `t()` returns 1, the elapsed time has past.
