import AbstractView from '../framework/view/abstract-view.js';
import {NoEventsTextType} from '../constant/constant.js';


/**
 * Создает шаблон для пустого списка событий с текстом в зависимости от типа фильтра
 * @param filterType - Тип фильтрации
 */
function createEmptyEventsTemplate(filterType) {
  const noEventsTextValue = NoEventsTextType[filterType];
  return `<p class="trip-events__msg">${noEventsTextValue}</p>`;
}

/**
 * Класс для представления пустого списка событий
 * @extends {AbstractView}
 */
export default class EmptyView extends AbstractView {

  /**
   * Тип фильтрации
   *
   * @type {string}
   * @private
   */
  #filterType = null;

  /**
   * Конструктор класса EmptyView
   * @param filterType - Тип фильтрации
   */
  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  /** Возвращает шаблон представления */
  get template() {
    return createEmptyEventsTemplate(this.#filterType);
  }
}
