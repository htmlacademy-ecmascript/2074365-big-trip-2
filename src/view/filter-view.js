import AbstractView from '../framework/view/abstract-view.js';

/**
 * Создает HTML-шаблон для одного элемента фильтра
 *
 * @param filter - Объект фильтра, содержащий информацию о фильтре
 * @param currentFilterType - Текущий выбранный тип фильтра
 *
 * @property type - Тип фильтра
 * @property count - Количество элементов, соответствующих фильтру
 *
 * @returns {string} - HTML-шаблон элемента фильтра
 */
function createFilterItemTemplate(filter, currentFilterType) {
  const {type, count} = filter;

  return (
    `<div class="trip-filters__filter">
      <input id="filter-${type}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        value="${type}"
        ${type === currentFilterType ? 'checked' : ''}
        ${count === 0 ? 'disabled' : ''}
        >
      <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
    </div>`
  );
}

/**
 * Создает HTML-шаблон для блока фильтров
 *
 * @param filterItems - Список элементов фильтров
 * @param currentFilterType - Текущий выбранный тип фильтра
 *
 * @returns {string} - HTML-шаблон блока фильтров
 */
function createFilterTemplate(filterItems, currentFilterType) {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

/**
 * Представление для блока фильтров
 * @extends {AbstractView}
 */
export default class FilterView extends AbstractView {

  /**
   * Список элементов фильтров
   * @private
   */
  #filters = null;

  /**
   * Текущий выбранный тип фильтра
   * @private
   */
  #currentFilter = null;

  /**
   * Обработчик изменения типа фильтра
   * @private
   */
  #handleFilterTypeChange = null;

  /**
   * Инициализирует представление
   *
   * @param filters - Список элементов фильтров
   * @param currentFilterType - Текущий выбранный тип фильтра
   * @param onFilterTypeChange - Обработчик изменения типа фильтра
   */
  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  /**
   * Возвращает HTML-шаблон представления
   * @returns {string} - HTML-шаблон представления
   */
  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  /**
   * Обработчик изменения типа фильтра
   *
   * @param {Event} evt - Событие изменения типа фильтра
   * @private
   */
  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
