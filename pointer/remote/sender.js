import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";

const settings = Object.freeze({
  remote: new Remote({
    allowNetwork: true
  })
});

// Called when there is a pointermove event
const onPointerMove = (evt) => {
  const { remote } = settings;
  // Data to broadcast
  const d = {
    x: evt.x / window.innerWidth,
    y: evt.y / window.innerHeight,
    pointerId: evt.pointerId,
    movementX: evt.movementX / window.innerWidth,
    movementY: evt.movementY /  window.innerHeight,
    pressure: evt.pressure
  };
  remote.broadcast(d);
};

const setup = () => {  
  // Listen for pointermove events
  document.addEventListener(`pointermove`, onPointerMove);
  
  // Prevent zoom gestures
  document.addEventListener(`wheel`, evt => {
    evt.preventDefault();
  }, { passive:false });
};
setup();
