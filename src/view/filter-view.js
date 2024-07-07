import AbstractView from '../framework/view/abstract-view.js';

/** Массив элементов фильтра */
const filteringElements = [
  {everything: 'Everything'},
  {future: 'Future'},
  {present: 'Present'},
  {past: 'Past'}
];

/**
 * Создает элемент фильтра
 * @param obj объект элемента фильтра
 * @param index индекс элемента
 * @return {String}
 */
const createFilter = (obj, index) =>
  `<div class="trip-filters__filter">
    <input id="filter-${Object.keys(obj)}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${Object.keys(obj)}" ${index === 0 ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-${Object.keys(obj)}">${Object.values(obj)}</label>
   </div>`;

/**
 * Создать шаблон для фильтра
 * @return {String}
 */
const createFilterTemplate = () =>
  `<form class="trip-filters" action="#" method="get">
    ${filteringElements.map((item, index) => createFilter(item, index)).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;

/** Представление для компонента фильтра */
export default class FilterView extends AbstractView {
  /**
   * Получить шаблон фильтра
   * @return {String}
   */
  get template() {
    return createFilterTemplate();
  }
}
