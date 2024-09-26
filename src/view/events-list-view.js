import AbstractView from '../framework/view/abstract-view.js';

/**
 * Создает HTML-шаблон для списка событий
 * @returns {string} - HTML-шаблон списка событий
 */
function createEventsListTemplate() {
  return '<ul class="trip-events__list"></ul>';
}

/**
 * Представление для списка событий
 * @extends {AbstractView}
 */
export default class EventsListView extends AbstractView {

  /**
   * Возвращает HTML-шаблон представления
   * @returns {string} - HTML-шаблон представления
   */
  get template() {
    return createEventsListTemplate();
  }
}
