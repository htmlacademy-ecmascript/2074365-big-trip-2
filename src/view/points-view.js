import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

/**
 * Создать шаблон для списка точек маршрута
 * @function createPointsTemplate
 * @return {String}
 */
const createPointsTemplate = () => `
    <ul class="trip-events__list"></ul>`;

/**
 * Представление для списка точек маршрута
 * @class PointsView
 * @extends AbstractView
 * @export
 * @default
 */
export default class PointsView extends AbstractStatefulView {
  /**
   * Конструктор
   * @param onSelectFavoriteClick Обработчик события выбора в избранные
   * @param onEditFormClick Обработчик формы редактирования
   * @constructor
   */
  constructor({onSelectFavoriteClick, onEditFormClick}) {
    super();
    this.#handlerSelectFavorite(onSelectFavoriteClick);
    this.#handleEditForm(onEditFormClick);
  }

  /**
   * Обработчик выбора в избранные
   * @private
   * @method handlerSelectFavorite
   * @param onSelectFavoriteClick Обработчик события выбора в избранные
   * @return void
   */
  #handlerSelectFavorite(onSelectFavoriteClick) {
    const onHandlerFavoriteClick = (event) => onSelectFavoriteClick(event, this.element, onHandlerFavoriteClick);
    this.element.addEventListener('click', onHandlerFavoriteClick);
  }

  /**
   * Обработчик формы редактирования
   * @private
   * @method handleEditForm
   */
  #handleEditForm(onEditFormClick) {
    this.element.addEventListener('click', onEditFormClick);
  }

  /**
   * Получить шаблон списка событий
   * @public
   * @method template
   * @return {String}
   */
  get template() {
    return createPointsTemplate();
  }

  _restoreHandlers() {
    return undefined;
  }
}
