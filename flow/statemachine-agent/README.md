# statemachine-agent

This sketch demonstrates driving a state machine for agent-like behaviour.

* [Online demo](https://clinth.github.io/ixfx-demos/flow/statemachine-regions/)
* [Glitch version](https://glitch.com/edit/#!/ixix-state-machines-driver?path=script.js%3A134%3A0)
  
At the top of the sketch, we have the settings. This consists of `updateSpeed` (how often to run the state machine driver), `stateMachine` which defines the transitions and `stateHandlers` which sets up what to do at each state.

The regular state for the sketch is the current state machine state (ie. 'waking', 'resting', etc.) and the 'energy level', a number that ranges from 0..1.

The transitions are a rough activity cycle of sleeping and exercising. Most state have two possibilities, but some have only one.

The state handlers is an array. Each one has an 'if' field which associates that handler with a state. Thus, when the machine is in the 'sleeping' state, the block with `if: 'sleeping'` is the one that gets used.

Each handler then has a set of things it does. In some states, the energy level goes up or down. Some states have code which uses that energy level to determine what state to go to next.

Essentially, it's a small system that can autonomously change state according to some external factors.

A main loop runs that continually 'drives' the state machine and updates the UI. Otherwise, all changes to state happen via the state handlers.

The benefit of using state machines and the state machine 'driver' is that the sketch is guaranteed to be in a valid state, and it can only transition according to the rules of the machine definition. This helps to ensure its logical operation. Another benefit is the simple and lightweight coding style of writing handlers for different states and controlling the machine.

This could all be done with some big switch statements and if-then-else blocks, but here we get simplicity and safety.

Read more:
* [flow/StateMachine.drive](https://clinth.github.io/ixfx/functions/Flow.StateMachine.driver.html)