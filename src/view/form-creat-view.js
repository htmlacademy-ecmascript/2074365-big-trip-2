import {capitalize} from '../util/string-util.js';
import {formatDateOfTaskByConstant, FormatsDate, getCurrentDate, getCurrentDatePlusDays} from '../util/date-util.js';
import AbstractView from '../framework/view/abstract-view.js';

/**
 * Создает шаблон для типа события
 * @param type тип для шаблона
 * @return {String}
 */
const createTypeEventTemplate = (type) =>
  (`<div class="event__type-item">
        <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value='${type}'>
        <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalize(type)}</label>
     </div>`);

/**
 * Создает шаблон для места назначения
 * @param nameDestinations наименование назначения
 * @return {String}
 */
const createDestinationTemplate = (nameDestinations) => (`<option value="${nameDestinations}">${nameDestinations}</option>`);

/**
 * Создать шаблон, для создания события
 * @param points точки маршрута
 * @param nameDestinations наименование назначения
 * @return {String}
 */
function createFormTemplate(points, nameDestinations) {
  const types = points.map((item) => item.type);
  return (`
            <li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                            ${types.map((item) => createTypeEventTemplate(item)).join('')}
                        </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      Flight
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Geneva" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${nameDestinations.map((item) => createDestinationTemplate(item)).join('')}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDateOfTaskByConstant(getCurrentDate(), FormatsDate.FORMAT_DATE_TIME)}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDateOfTaskByConstant(getCurrentDatePlusDays(1), FormatsDate.FORMAT_DATE_TIME)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="0">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Cancel</button>
                </header>
              </form>
            </li>
  `);
}

/** Представление для формы создания события */
export default class CreatForm extends AbstractView {

  /** Модель точки */
  #pointModel;

  /**
   * Конструктор
   * @param pointModel Модель точки
   */
  constructor(pointModel) {
    super();
    this.#pointModel = pointModel;
  }

  /**
   * Получить шаблон формы
   * @return {String}
   */
  get template() {
    const points = this.#pointModel.points;
    const nameDestinations = this.#pointModel.nameDestinations;
    return createFormTemplate(points, nameDestinations);
  }
}
