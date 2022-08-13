# moving-average-audio

Uses a moving average to smooth out audio levels from the microphone.

It uses:
* `movingAverage` from the Temporal module
* `Analysers.peakLevel` from the Audio module

## Sensitivity vs. smoothness

There is a trade off between sensitivity and smoothness. Increasing the number of samples for the average (sketch defaults to 100) makes the response smoother, but ball will be slower to respond to changes. Note also that the averaged peak value will tend to be lower than the raw value with increasing sample count.

## Things to try

* Change sample counts
* Use the average value to drive something else, like an element's size or font
* Calculate and use a 'delta' value: the difference between a slow and smooth average and the current raw value. This could essentially be a self-calibrating sound sensor. The average will represent the background sound, and the delta will be how much the sound is quieter or louder than that.