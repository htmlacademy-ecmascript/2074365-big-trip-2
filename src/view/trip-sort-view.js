import AbstractView from '../framework/view/abstract-view.js';
import {SortTypes} from '../constant/constant.js';

/**
 * Создает шаблон элемента сортировки для страницы поездки
 *
 * @param sortType - Тип сортировки (например, 'day', 'price')
 * @param currentSortType - Текущий тип сортировки
 * @returns {string} HTML-шаблон элемента сортировки
 */
function createTripSortItemTemplate(sortType, currentSortType) {
  return (
    `<div class="trip-sort__item  trip-sort__item--${sortType}">
      <input
        id="sort-${sortType}"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${sortType}"
        data-sort-type="${sortType}"
        ${sortType === currentSortType ? 'checked' : ''}
        ${sortType === SortTypes.EVENT || sortType === SortTypes.OFFERS ? 'disabled' : ''}>
      <label class="trip-sort__btn" for="sort-${sortType}" data-sort-type="${sortType}">${sortType}</label>
    </div>`
  );
}

/**
 * Создает шаблон формы сортировки для страницы поездки
 *
 * @param currentSortType - Текущий тип сортировки
 * @returns {string} HTML-шаблон формы сортировки
 */
function createTripSortTemplate(currentSortType) {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${Object.values(SortTypes).map((sortType) => createTripSortItemTemplate(sortType, currentSortType)).join('')}
    </form>`
  );
}

/**
 * Компонент для отображения и управления формой сортировки на странице поездки
 * @extends {AbstractView}
 */
export default class TripSortView extends AbstractView {

  /**
   * Текущий тип сортировки
   * @type {string}
   * @private
   */
  #currentSortType = null;

  /**
   * Обработчик изменения типа сортировки
   * @private
   */
  #handleSortTypeChange = null;

  /**
   * Конструктор компонента
   *
   * @param currentSortType - Текущий тип сортировки
   * @param onSortTypeChange - Обработчик изменения типа сортировки
   */
  constructor({currentSortType, onSortTypeChange}) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  /**
   * Шаблон компонента
   * @type {string}
   */
  get template() {
    return createTripSortTemplate(this.#currentSortType);
  }

  /**
   * Обработчик изменения типа сортировки
   * @private
   */
  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
