import {render} from '../framework/render.js';
import SortView from '../view/sort-view.js';

/** Презентер для сортировки */
export default class SortPresenter {
  /** Контейнер элемента */
  #container;

  /**
   * Конструктор
   * @param container Контейнер элемента
   */
  constructor({container}) {
    this.#container = container;
  }

  /** Инициализирует приложение */
  init() {
    this.#renderApp();
  }

  /** Рендерит приложение */
  #renderApp() {
    render(new SortView(), this.#container);
  }
}
