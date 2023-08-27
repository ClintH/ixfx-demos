# gamepad / button

[Try online](https://clinth.github.io/ixfx-demos/io/gamepad/button/)

If you're not sure if your hardware is working or set up, try a [third party gamepad tester](https://hardwaretester.com/gamepad).

The script listens for `gamepadconnected` and `gamepaddisconnected` events to keep track of the id of the connected gamepad.

The web gamepad API works by polling for the state of controls. Thus we have a loop that runs, continually checking the 'pressed' event of a single button. Each button on the game pad has a number, by default we use whatever button has id 0.

In the `use()` function we use the state to toggle a CSS class.

## Things to try

* How can you make the box a toggle? So it turns on with a press, and then turns off when you press again?
* How can the box activate over time, for example as you press and hold it rises in intensity until at last it activates?