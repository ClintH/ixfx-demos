import { Points } from '../../ixfx/geometry.js';


/**
 * @typedef {{
 * id:number
 * pointerStart: Points.Point
 * pointerLast: Points.Point
 * element: HTMLElement
 * elementStart: Points.Point
 * pointerId: number
 * isActive:boolean
 * }} DragPoint
 */

/**
 * @typedef {{
 * (drag:DragPoint, source:MultipointDrag):void
 * }} DragHandler
 */
export class MultipointDrag {
  /**
   * @type DragPoint[]
   */
  points = [];

  /**
   * As drag is in progress
   * @type DragHandler|undefined
   */
  onDragging;

  /** 
   * Drag has started
   * @type DragHandler|undefined */
  onDragStart;

  /** 
   * Drag has is complete
   * @type DragHandler|undefined */
  onDragEnd;
  
  #idCount = 0;

  constructor() {
    this.onDragging = defaultOnDrag;
  }

  usePointerEvents() {
    document.addEventListener(`pointerdown`, (event) => this.onPointerDown(event));
    document.addEventListener(`pointerup`, (event) => this.onPointerUp(event));
    document.addEventListener(`pointermove`, (event) => this.onPointerMove(event));
    document.addEventListener(`pointerleave`, (event) => this.onPointerLeave(event));
  }

  get length() {
    return this.points.length;
  }

  get isDragging() {
    return this.points.length > 0;
  }

  /**
 * Handle pointer down in document
 * @param {PointerEvent} event 
 */
  onPointerDown(event)  {
    const element = /** @type HTMLElement */(event.target);

    // We only care about elements with 'draggable' class
    if (!element.classList.contains(`draggable`)) return; 

    // Element is already being dragged
    if (element.classList.contains(`dragging`)) return;

    const pointerStart = this.pointFromEvent(event);
    const elementRect = element.getBoundingClientRect();
    const elementStart = { x: elementRect.x, y: elementRect.y };

    this.#dragStart({ 
      id: this.#idCount++,
      isActive: true,
      pointerStart,
      pointerLast: this.pointFromEvent(event),
      pointerId: event.pointerId, 
      element,
      elementStart
    });
  };

  /**
   * 
   * @param {PointerEvent} event 
   * @returns 
   */
  pointFromEvent(event) {
    return { 
      x: event.x, 
      y: event.y
    };
  }
  /**
   * New item being dragged
   * @param {DragPoint} d 
   */
  #dragStart(d) {
    d.element.classList.add(`dragging`);
    this.points.push(d);
    if (this.onDragStart) {
      this.onDragStart(d, this);
    }
  }

  /**
   * 
   * @param {DragPoint} d 
   */
  #dragEnd(d) {
    d.isActive = false;
    d.element.classList.remove(`dragging`);
    this.points = this.points.filter(p => p !== d);
    if (this.onDragEnd) {
      this.onDragEnd(d, this);
    }
  }

  /**
   * Gets the drag state for a given pointer id
   * @param {PointerEvent} event 
   */
  getDrag(event) {
    if (this.points.length === 0) return;
    return this.points.find(p => p.pointerId === event.pointerId);
  }

  /**
   * Handle pointer up in document
   * @param {PointerEvent} event
   */
  onPointerUp(event) {
    const d = this.getDrag(event);
    if (d === undefined) return; // No drag state for this pointer

    this.#dragEnd(d);
  };

  /**
   * Handle pointer move in document
   * @param {PointerEvent} event 
   */
  onPointerMove(event) {
    const d = this.getDrag(event);
    if (d === undefined) return; // No drag state for this pointer

    d.pointerLast = this.pointFromEvent(event);
    if (this.onDragging) {
      this.onDragging(d, this);
    }
  };
  
  /**
   * Handle pointer leaving document
   * @param {PointerEvent} event 
   */
  onPointerLeave(event) {
    // Not dragging anything
    if (!this.isDragging) return;
  };
}

/**
 * Moves HTML element with direct coupling with pointer
 * @param {DragPoint} drag 
 * @param {MultipointDrag} source 
 */
export const defaultOnDrag = (drag, source) => {
  const { element } = drag;

  // How much this pointer has moved
  const offset = Points.subtract(drag.pointerLast, drag.pointerStart);
 
  // Apply to position
  let position = Points.sum(drag.elementStart, offset);
  element.style.left = position.x +`px`;
  element.style.top = position.y + `px`;
};
