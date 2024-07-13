import {render} from '../framework/render.js';
import FilterView from '../view/filter-view.js';

/**
 * Презентер для фильтрации
 * @class FilterPresenter
 * @default
 * @export
 */
export default class FilterPresenter {
  /** Контейнер элемента */
  #container;

  /**
   * Конструктор
   *
   * @param container Контейнер элемента
   * @constructor
   */
  constructor({container}) {
    this.#container = container;
  }

  /**
   * Рендерит фильтр
   * @public
   * @method render
   * @return void
   */
  render() {
    render(new FilterView(), this.#container);
  }
}
