import {createElement} from '../render.js';

/** Создать шаблон для списка событий */
function createEventListTemplate() {
  return (`
            <ul class="trip-events__list"></ul>
  `);
}

/** Представление для списка событий */
export default class EventList {
  getTemplate() {
    return createEventListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
