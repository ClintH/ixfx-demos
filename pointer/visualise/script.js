/**
 * Demonstrates the pointer visualiser.
 * 
 * Note that some special CSS usually needs to be added to the
 * parent element that you want to listen to events on. See the HTML file.
 */
import { pointerVisualise } from '../../ixfx/dom.js';
pointerVisualise(document.body);

const setup = () => {
  document.addEventListener(`pointermove`, event => {
    const pt = { x: event.x, y: event.y };
    // Do something with point...
    event.preventDefault();
  });
};
setup();