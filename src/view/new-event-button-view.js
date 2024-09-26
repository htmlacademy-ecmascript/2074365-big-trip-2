import AbstractView from '../framework/view/abstract-view.js';

/**
 * Создает HTML-шаблон для кнопки создания нового события
 * @returns {string} - HTML-шаблон кнопки создания нового события
 */
function createNewEventButtonTemplate() {
  return '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';
}

/**
 * Представление для кнопки создания нового события
 * @extends {AbstractView}
 */
export default class NewEventButtonView extends AbstractView {

  /**
   * Обработчик нажатия на кнопку
   * @private
   */
  #handleClick = null;

  /**
   * Инициализирует представление
   * @param onClick - Обработчик нажатия на кнопку
   */
  constructor({onClick}) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  /**
   * Возвращает HTML-шаблон представления
   * @returns {string} - HTML-шаблон представления
   */
  get template() {
    return createNewEventButtonTemplate();
  }

  /**
   * Обработчик нажатия на кнопку
   * @param evt - Событие нажатия на кнопку
   * @private
   */
  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
