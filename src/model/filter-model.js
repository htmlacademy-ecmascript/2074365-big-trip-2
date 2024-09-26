import Observable from '../framework/observable.js';
import {FilterTypes} from '../constant/constant.js';

/**
 *  Модель фильтра, реализующая паттерн наблюдателя
 *  @extends {Observable}
 */
export default class FilterModel extends Observable {
  /**
   * Текущий фильтр
   * @private
   */
  #filter = FilterTypes.EVERYTHING;

  /** Получить текущий фильтр */
  get filter() {
    return this.#filter;
  }

  /**
   * Установить новый фильтр
   *
   * @param {string} updateType Тип обновления
   * @param {FilterTypes} filter Новый фильтр
   */
  setFilter(updateType, filter) {
    this.#filter = filter;
    this._notify(updateType, filter);
  }
}
