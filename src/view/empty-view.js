import AbstractView from '../framework/view/abstract-view.js';
import {FilterTypes} from '../constant/constant.js';

/**
 * Enum, содержащий тексты для отсутствия событий по типу фильтра
 * @enum {string}
 */
const NoEventsTextType = {
  /** Текст для отсутствия событий при фильтрации "Все события" */
  [FilterTypes.EVERYTHING]: 'Click New Event to create your first point',
  /** Текст для отсутствия событий при фильтрации "Будущие события" */
  [FilterTypes.FUTURE]: 'There are no future events now',
  /** Текст для отсутствия событий при фильтрации "Прошедшие события" */
  [FilterTypes.PAST]: 'There are no past events now',
  /** Текст для отсутствия событий при фильтрации "Текущие события" */
  [FilterTypes.PRESENT]: 'There are no present events now'
};

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
