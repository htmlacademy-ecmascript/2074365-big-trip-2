import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

/** Массив элементов сортировки */
const sortingElements = [
  {day: 'Day'},
  {event: 'Event'},
  {time: 'Time'},
  {price: 'Price'},
  {offer: 'Offers'}
];

/**
 * Создает элемент сортировки
 * @function createSort
 * @param obj объект элемента сортировки
 * @param index индекс элемента
 * @return {String}
 */
const createSort = (obj, index) =>
  `<div class="trip-sort__item  trip-sort__item--${Object.keys(obj)}" data-sort="${Object.keys(obj)}">
    <input id="sort-${Object.keys(obj)}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${Object.keys(obj)}" ${index === 0 ? 'checked' : ''}>
    <label class="trip-sort__btn" for="sort-${Object.keys(obj)}">${Object.values(obj)}</label>
  </div>`;

/**
 * Создать шаблон для сортировки
 * @return {String}
 */
const createSortTemplate = () =>
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortingElements.map((item, index) => createSort(item, index)).join('')}
   </form>`;

/**
 * Представление для компонента сортировки
 * @class SortView
 * @extends AbstractView
 * @export
 * @default
 */
export default class SortView extends AbstractStatefulView {

  /**
   * Получить шаблон сортировки
   * @public
   * @method template
   * @return {String}
   */
  get template() {
    return createSortTemplate();
  }

  _restoreHandlers() {
    return undefined;
  }
}
