import {render} from '../framework/render.js';
import FilterView from '../view/filter-view.js';

/** Презентер для фильтрации */
export default class FilterPresenter {
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
    render(new FilterView(), this.#container);
  }
}
