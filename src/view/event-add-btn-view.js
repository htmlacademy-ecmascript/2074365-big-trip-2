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
export default class EventAddBtnView extends AbstractView {

  /**
   * Обработчик нажатия на кнопку
   * @private
   */
  #handleNewEventBtnClick = null;

  /**
   * Инициализирует представление
   * @param onNewEventBtnClick - Обработчик нажатия на кнопку
   */
  constructor({onNewEventBtnClick}) {
    super();
    this.#handleNewEventBtnClick = onNewEventBtnClick;
    this.element.addEventListener('click', this.#newEventBtnClickHandler);
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
  #newEventBtnClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleNewEventBtnClick();
  };
}
