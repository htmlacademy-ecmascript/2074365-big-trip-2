import {render} from '../framework/render.js';
import SortView from '../view/sort-view.js';

/**
 * Презентер для сортировки
 * @class SortPresenter
 * @default
 * @export
 */
export default class SortPresenter {
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
   * Рендерит сортировку
   * @public
   * @method render
   * @return void
   */
  render() {
    render(new SortView(), this.#container);
  }
}
