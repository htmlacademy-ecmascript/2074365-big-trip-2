import InfoTrip from '../view/info-trip-view.js';
import {render, RenderPosition} from '../framework/render.js';

/** Презентер для информации о поездке */
export default class InfoTripPresenter {
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
    render(new InfoTrip(), this.#container, RenderPosition.AFTERBEGIN);
  }
}
