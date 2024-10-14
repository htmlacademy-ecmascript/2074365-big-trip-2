import AbstractView from '../framework/view/abstract-view.js';

/**
 * Создает шаблон HTML-кода для сообщения об ошибке загрузки точек маршрута
 * @returns {string} - Шаблон HTML-кода
 */
function createPointsLoadErrorTemplate() {
  return (
    '<p class="trip-events__msg">Failed to load latest route information</p>'
  );
}

/**
 * Представление ошибки загрузки точек маршрута
 * @extends {AbstractView}
 */
export default class PointsLoadErrorView extends AbstractView {

  /**
   * Возвращает шаблон HTML-кода представления
   * @returns {string} - Шаблон HTML-кода
   */
  get template() {
    return createPointsLoadErrorTemplate();
  }
}
