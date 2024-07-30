import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

/** Массив сообщений для элемента фильтра */
const messagingElementsFilter = [
  {Everything: 'Click New Event to create your first point'},
  {Past: 'There are no past events now'},
  {Present: 'There are no present events now'},
  {Future: 'There are no future events now'}
];

/**
 * Создать шаблон без точек маршрута
 * @function createNoPointTemplate
 * @return {String}
 */
const createNoPointTemplate = () => `
    <p class="trip-events__msg">${Object.values(messagingElementsFilter[0])}</p>
`;

/**
 * Представление для точек маршрута
 * @class NoPointView
 * @extends AbstractView
 * @export
 * @default
 */
export default class NoPointView extends AbstractStatefulView {

  /**
   * Получить шаблон без точек маршрута
   * @public
   * @method template
   * @return {String}
   */
  get template() {
    return createNoPointTemplate();
  }

  _restoreHandlers() {
    return undefined;
  }
}
