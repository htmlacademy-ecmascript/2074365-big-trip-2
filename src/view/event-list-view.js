import AbstractView from '../framework/view/abstract-view.js';

/**
 * Создать шаблон для списка событий
 * @return {String}
 */
const createEventListTemplate = () => `
    <ul class="trip-events__list"></ul>`;

/** Представление для списка событий */
export default class EventList extends AbstractView {
  /**
   * Получить шаблон списка событий
   * @return {String}
   */
  get template() {
    return createEventListTemplate();
  }
}
