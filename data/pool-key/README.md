# pool-key

Demonstrates the ixfx Pool class. [Try demo online](https://clinth.github.io/ixfx-demos/data/pool-key/).

Pool resources in this case are HTML elements. These are generated on-demand up to the capacity of the Pool and automatically removed after an interval.

Each key press 'uses' a Pool resource. When the Pool runs out of capacity, the oldest 'users' are evicted. As you type different letters note how the earlier keys start getting replaced with the newer.

It shows how the Pool can take care of a lot of housekeeping automatically.

Each key (eg when the letter 'a' is pressed) allocates a resource when there is a _keydown_ event. We could also purposefully release a resource when there is a _keyup_ event, but instead we use the Pool's automatic expiry options to do the clean up.