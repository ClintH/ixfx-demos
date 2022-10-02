/**
 * Demonstrates the pointer visualiser.
 * 
 * Note that some special CSS usually needs to be added to the
 * parent element that you want to listen to events on. See the HTML file.
 */
import { pointerVisualise } from '../../ixfx/dom.js';
pointerVisualise(document.body);

const setup = () => {
  document.addEventListener(`pointermove`, ev => {
    const pt = { x: ev.x, y: ev.y };
    // Do something with point...
    ev.preventDefault();
  });
};
setup();