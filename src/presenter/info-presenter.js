import InfoTripView from '../view/info-trip-view.js';
import {render, RenderPosition} from '../framework/render.js';

/**
 * Презентер для информации о поездке
 * @class InfoPresenter
 * @default
 * @export
 */
export default class InfoPresenter {
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
   * Рендерит информацию о поездке
   * @public
   * @method render
   * @return void
   */
  render() {
    render(new InfoTripView(), this.#container, RenderPosition.AFTERBEGIN);
  }
}
