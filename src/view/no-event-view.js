import AbstractView from '../framework/view/abstract-view.js';

/** Массив сообщений для элемента фильтра */
const messagingElementsFilter = [
  {Everything: 'Click New Event to create your first point'},
  {Past: 'There are no past events now'},
  {Present: 'There are no present events now'},
  {Future: 'There are no future events now'}
];

/** Создать шаблон без событий */
const createNoEventTemplate = () => `
    <p class="trip-events__msg">${Object.values(messagingElementsFilter[0])}</p>
`;

/** Представление для события */
export default class NoEventView extends AbstractView {
  /**
   * Получить шаблон без событий
   * @return {String}
   */
  get template() {
    return createNoEventTemplate();
  }
}
