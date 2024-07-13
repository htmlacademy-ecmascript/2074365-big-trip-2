import {capitalize} from '../util/string-util.js';
import {formatDateOfTaskByConstant, FormatsDate} from '../util/date-util.js';
import AbstractView from '../framework/view/abstract-view.js';
import {TypeEvent} from '../util/common.js';

/**
 * Получить признак выбранного
 * @param point точка маршрута
 * @param offer предложение
 * @return {String}
 */
const getChecked = (point, offer) => point.offers.includes(offer.id) ? 'checked' : '';

/**
 * Создает шаблон для типа события
 * @param type тип шаблона
 * @return {String}
 */
const createTypeEventTemplate = (type) =>
  `<div class="event__type-item">
    <input id="event-type-${type}-2" class="event__type-input  visually-hidden" type="radio" name="event-type" value='${type}'>
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-2">${capitalize(type)}</label>
   </div>`;

/**
 * Создает шаблон для предложений
 * @param offer предложение
 * @param type тип шаблона
 * @param index индекс
 * @param point точка маршрута
 * @return {String}
 */
const createOffersTemplate = (offer, type, index, point) => {
  const checked = getChecked(point, offer);
  const {title, price} = offer;
  return `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-${index}" type="checkbox" name="event-offer-${type}" ${checked}>
            <label class="event__offer-label" for="event-offer-${type}-${index}">
                <span class="event__offer-title">${title}</span>
                    &plus;&euro;&nbsp;
                <span class="event__offer-price">${price}</span>
            </label>
          </div>`;
};

/**
 * Создает шаблон для места назначения
 * @param nameDestinations наименование назначения
 * @return {String}
 */
const createDestinationTemplate = (nameDestinations) => `<option value="${nameDestinations}">${nameDestinations}</option>`;

/**
 * Создать шаблон для редактирования события
 * @param id идентификатор
 * @param point точка маршрута
 * @param points точки маршрутов
 * @param destination назначение
 * @param nameDestinations наименование назначения
 * @param offers предложения
 * @return {String}
 */
const createEditFormTemplate = (id, point, points, destination, nameDestinations, offers) => {
  const {type, dateFrom, dateTo, basePrice} = point;
  const {name, description} = destination;
  const types = points.map((item) => item.type);
  return (`
            <li class="trip-events__item" data-id="${id}" data-type-event="${TypeEvent.EDIT}">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-2">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-2" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${types.map((item) => createTypeEventTemplate(item)).join('')}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-2">${type}</label>
                    <input class="event__input  event__input--destination" id="event-destination-2" type="text" value="${name}" list="destination-list-2">
                    <datalist id="destination-list-2">
                      ${nameDestinations.map((item) => createDestinationTemplate(item)).join('')}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-2">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-2" type="text" name="event-start-time" value='${formatDateOfTaskByConstant(dateFrom, FormatsDate.FORMAT_DATE_TIME)}'>
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-2">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-2" type="text" name="event-end-time" value='${formatDateOfTaskByConstant(dateTo, FormatsDate.FORMAT_DATE_TIME)}'>
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-2">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-2" type="text" name="event-price" value='${basePrice}'>
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    <div class="event__available-offers">
                      ${offers.map((offer, index) => createOffersTemplate(offer, type, index, point)).join('')}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${description}</p>
                  </section>
                </section>
              </form>
            </li>
         `);
};

/**
 * Представление для редактирования события
 * @class EditFormView
 * @extends AbstractView
 * @export
 * @default
 */
export default class EditFormView extends AbstractView {
  /** Идентификатор точки маршрута */
  #id;
  /** точка */
  #point;
  /** Модель точек назначения */
  #pointsModel;

  /**
   * Конструктор
   *
   * @param id Идентификатор точки маршрута
   * @param point точка
   * @param pointsModel Модель точек назначения
   * @param onFormSubmitClick Обработчик отправки формы
   * @constructor
   */
  constructor({id, point, pointsModel, onFormSubmitClick}) {
    super();
    this.#id = id;
    this.#point = point;
    this.#pointsModel = pointsModel;
    this.#handleFormSubmit(onFormSubmitClick);
  }

  /**
   * Обработчик слушетеля событий отправки формы
   * @private
   * @method handleFormSubmit
   * @param onFormSubmitClick Обработчик отправки формы
   */
  #handleFormSubmit(onFormSubmitClick) {
    const form = this.element.querySelector('.event--edit');
    form.addEventListener('submit', onFormSubmitClick);
  }

  /**
   * Получить шаблон редактирования формы
   * @public
   * @method template
   * @return {String}
   */
  get template() {
    const point = this.#point;
    const points = this.#pointsModel.points;
    const destination = this.#pointsModel.getDestinationById(point.destination);
    const nameDestinations = this.#pointsModel.nameDestinations;
    const offers = this.#pointsModel.getOffersByPoint(point);
    return createEditFormTemplate(this.#id, point, points, destination, nameDestinations, offers);
  }

  /** Получить id */
  get id() {
    return this.#id;
  }
}
