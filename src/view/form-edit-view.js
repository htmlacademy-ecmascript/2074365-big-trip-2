import {capitalize} from '../util/string-util.js';
import {formatDateOfTaskByConstant, FormatsDate} from '../util/date-util.js';
import {DatePicker, TypeEvent} from '../util/constants-util.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/airbnb.css';


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
  `<div class="event__type-item" data-type="${type}">
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
 * @param destination точка назначения
 * @return {String}
 */
const createDestinationsTemplate = (destination) => {
  const {id, name} = destination;
  return `<option data-id="${id}" value="${name}">${name}</option>`;
};

/**
 * Создать шаблон для описания точки назначения
 * @param description Описание точки назначения
 * @return {String}
 */
const createEventDescriptionTemplate = (description) =>
  description ? `<p class="event__destination-description">${description}</p>` : '';

/**
 * Создать шаблон для отрисовки маршрутам картинок
 * @param src URL картинки
 * @param description Описание точки назначения
 * @return {String}
 */
const createEventPhotoTemplate = (src, description) =>
  `<img class="event__photo" src="${src}" alt="${description}">`;

/**
 * Создать шаблон для редактирования события
 * @param id идентификатор
 * @param state точка маршрута
 * @param pointsModel Модель точек
 * @return {String}
 */
const createEditFormTemplate = (id, state, pointsModel) => {
  const destinationId = state.destination;
  const destination = pointsModel.getDestinationById(destinationId);
  const destinations = pointsModel.destinations;
  const offers = pointsModel.getOffersByPoint(state);
  const {type, dateFrom, dateTo, basePrice} = state;
  const {name, description} = destination;
  return (`
            <li class="trip-events__item" data-id="${id}" data-type-event="${TypeEvent.EDIT}">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-2">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="${type}">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-2" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${pointsModel.points.map((item) => createTypeEventTemplate(item.type)).join('')}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-2">${type}</label>
                    <input class="event__input  event__input--destination" id="event-destination-2" type="text" value="${name}" list="destination-list-2">
                    <datalist id="destination-list-2">
                      ${destinations.map((item) => createDestinationsTemplate(item)).join('')}
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
                      ${offers.map((offer, index) => createOffersTemplate(offer, type, index, state)).join('')}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    ${createEventDescriptionTemplate(description)}
                    ${destination?.pictures && destination?.pictures.length > 0 ? (`<div class="event__photos-container">
                        <div class="event__photos-tape">
                            ${destination.pictures.map((item) => createEventPhotoTemplate(item.src, item.description)).join('')}
                        </div>
                    </div>`) : ''}
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
export default class EditFormView extends AbstractStatefulView {
  /** Идентификатор точки маршрута */
  #id;
  /** Модель точек назначения */
  #pointsModel;
  /** Обработчик отправки формы */
  #onFormSubmitClick;
  /** Обработчик смены транспорта */
  #onFormChangOfDestinationClick;
  /** Обработчик смены пункта назначения */
  #onFormInputOfDestinationClick;
  /** Средство выбора даты "от" */
  #datePickerFrom;
  /** Средство выбора даты "до" */
  #datePickerTo;


  /**
   * Конструктор
   *
   * @param id Идентификатор точки маршрута
   * @param pointsModel Модель точек назначения
   * @param onFormSubmitClick Обработчик отправки формы
   * @param onFormChangOfDestinationClick Обработчик смены транспорта
   * @param onFormInputOfDestinationClick Обработчик смены пункта назначения
   * @constructor
   */
  constructor({id, pointsModel, onFormSubmitClick, onFormChangOfDestinationClick, onFormInputOfDestinationClick}) {
    super();
    this.#id = id;
    this.#pointsModel = pointsModel;
    this.#onFormSubmitClick = onFormSubmitClick;
    this.#onFormChangOfDestinationClick = onFormChangOfDestinationClick;
    this.#onFormInputOfDestinationClick = onFormInputOfDestinationClick;
    this._setState(EditFormView.parsePointToState({point: pointsModel.getPointById(id)}));
    this.#initHandlers();
  }

  /**
   * Получить шаблон редактирования формы
   * @public
   * @method template
   * @return {String}
   */
  get template() {
    const state = EditFormView.parseStateToPoint(this._state);
    return createEditFormTemplate(this.#id, state, this.#pointsModel);
  }

  /** Получить id */
  get id() {
    return this.#id;
  }

  /** Сбросить значения в состоянии до дефолтных */
  reset(point) {
    this.updateElement(EditFormView.parsePointToState(point));
  }

  /** Парсит точку маршрута в объект для состояния */
  static parsePointToState = ({point}) => ({point});

  /** Парсит объект состояния в точку маршрута */
  static parseStateToPoint = (state) => state.point;

  _restoreHandlers() {
    this.#initHandlers();
  }

  /**
   * Инициализация обработчиков
   * @private
   * @method initHandlers
   */
  #initHandlers() {
    this.#handleFormSubmit(this.#onFormSubmitClick);
    this.#handleFormChangOfDestination(this.#onFormChangOfDestinationClick);
    this.#handlerFormInputOfDestination(this.#onFormInputOfDestinationClick);
    this.#setDatePickers();
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
   * Обработчик слушетеля событий смены транспорта
   * @private
   * @method handleFormChangOfDestination
   * @param onFormChangOfDestinationClick Обработчик слушетеля событий
   */
  #handleFormChangOfDestination(onFormChangOfDestinationClick) {
    const typeBtn = this.element.querySelector('.event__type-list');
    typeBtn.addEventListener('click', onFormChangOfDestinationClick.bind(this, EditFormView.parseStateToPoint(this._state), this));
  }

  /**
   * Обработчик слушетеля событий смены пункта назначения
   * @private
   * @method handlerFormInputOfDestination
   * @param onFormInputOfDestinationClick Обработчик слушетеля событий
   */
  #handlerFormInputOfDestination(onFormInputOfDestinationClick) {
    const eventInputDestination = this.element.querySelector('.event__input--destination');
    eventInputDestination.addEventListener('change', onFormInputOfDestinationClick.bind(this, EditFormView.parseStateToPoint(this._state), this));
  }

  /** Удаляет средство выбора даты при смене View */
  removeElement = () => {
    super.removeElement();
    if (this.#datePickerFrom) {
      this.#datePickerFrom.destroy();
      this.#datePickerFrom = null;
    }
    if (this.#datePickerTo) {
      this.#datePickerTo.destroy();
      this.#datePickerTo = null;
    }
  };

  /** Обработчик события смены даты в календаре "от" */
  #onDateFromCloseClick = ([userDate]) => {
    this._setState({point: {...this._state.point, dateFrom: userDate}});
    this.#datePickerTo.set(DatePicker.MIN_DATE, this._state.point.dateFrom);
  };

  /** Обработчик события смены даты в календаре "до" */
  #onDateToCloseClick = ([userDate]) => {
    this._setState({point: {...this._state.point, dateTo: userDate}});
    this.#datePickerFrom.set(DatePicker.MAX_DATE, this._state.point.dateTo);
  };

  /** Установить параметры для Api выбора дат "Календарь" */
  #setDatePickers = () => {
    const [dateFromElement, dateToElement] = this.element.querySelectorAll('.event__input--time');
    const commonConfigs = {
      dateFormat: DatePicker.DATE_FORMAT,
      enableTime: true,
      locale: {firstDayOfWeek: 1},
      'time_24hr': true
    };

    this.#datePickerFrom = flatpickr(
      dateFromElement,
      {
        ...commonConfigs,
        defaultDate: this._state.point.dateFrom,
        onClose: this.#onDateFromCloseClick,
        maxDate: this._state.point.dateTo
      }
    );

    this.#datePickerTo = flatpickr(
      dateToElement,
      {
        ...commonConfigs,
        defaultDate: this._state.point.dateTo,
        onClose: this.#onDateToCloseClick,
        minDate: this._state.point.dateFrom
      }
    );
  };
}
