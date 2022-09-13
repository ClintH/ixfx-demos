# easing-set

This demo uses an envelope to ease to a value. It's not the best use of an envelope, because we're only using attack stage.

A 'target value' is set by the horizontal position of clicking within the rectangle. This also triggers the envelope and starts sampling it.

The value from the envelope is multiplied by the target, so that the value we're using to visualise slowly reaches the target. 