import AbstractView from '../framework/view/abstract-view.js';

/**
 * Создает шаблон HTML-кода для сообщения о загрузке событий
 * @returns {string} - Шаблон HTML-кода
 */
function createNoEventsTemplate() {
  return (
    `<p class="trip-events__msg">
      Loading...
    </p>`
  );
}

/**
 * Представление загрузки событий
 * @extends {AbstractView}
 */
export default class LoadingView extends AbstractView {

  /**
   * Возвращает шаблон HTML-кода представления
   * @returns {string} - Шаблон HTML-кода
   */
  get template() {
    return createNoEventsTemplate();
  }
}
