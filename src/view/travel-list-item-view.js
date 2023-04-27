import {createElement} from '../render.js';
import {render} from '../render.js';

function createTravelListItemContainerTemplate() {
  return (
    `<li class="trip-events__item">
    </li>`
  );
}

export default class TravelListItemContainerView {
  getTemplate() {
    return createTravelListItemContainerTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  insertChild(element) {
    render(element, createTravelListItemContainerTemplate());
  }

  removeElement() {
    this.element = null;
  }
}
