import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {DateFormats, EVENT_TYPES} from '../constant/constant.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import he from 'he';

/**
 *  Шаблон для пустого события, используемый при создании нового события
 *
 * @type {Object}
 */
const EMPTY_EVENT_TEMPLATE = {
  basePrice: 0,
  dateFrom: '',
  dateTo: '',
  destination: '',
  isFavorite: false,
  offers: [],
  type: 'flight'
};

/**
 * Создает шаблон для списка типов событий
 *
 * @param type - Текущий тип события
 * @returns {string} - HTML-строка с шаблоном
 */
function createEventTypesTemplate(type) {
  return (
    EVENT_TYPES.map((eventType) => (
      `<div class="event__type-item">
      <input
        id="event-type-${eventType}-1"
        class="event__type-input  visually-hidden"
        type="radio"
        name="event-type"
        value="${eventType}"
        ${eventType === type ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-1">${eventType}</label>
      </div>`
    )).join('')
  );
}

/**
 * Создает шаблон для доступных предложений (офферов) для данного типа события
 *
 * @param eventTypeOffers - Информация о предложениях для данного типа события
 * @param offers - Массив id выбранных предложений
 * @returns {string} - HTML-строка с шаблоном
 */
function createAvailableOffersTemplate(eventTypeOffers, offers) {
  return (
    eventTypeOffers.offers.map((offer) => (
      `<div class="event__offer-selector">
        <input
          class="event__offer-checkbox  visually-hidden"
          id="event-offer-${offer.title.toLowerCase().replaceAll(' ', '-')}-${offer.id}"
          type="checkbox"
          name="event-offer-${offer.title.toLowerCase().replaceAll(' ', '-')}"
          data-id="${offer.id}"
          ${offers.includes(offer.id) ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-${offer.title.toLowerCase().replaceAll(' ', '-')}-${offer.id}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`
    )).join('')
  );
}

/**
 * Создает шаблон для секции с предложениями (офферами)
 *
 * @param allOffers - Массив со всеми предложениями
 * @param checkedOffers - Массив id выбранных предложений
 * @param type - Тип события
 * @returns {string} - HTML-строка с шаблоном
 */
function createOffersSectionTemplate(allOffers, checkedOffers, type) {
  const eventTypeOffers = allOffers.find((offer) => offer.type === type);

  if (eventTypeOffers.offers.length === 0) {
    return '';
  }
  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${createAvailableOffersTemplate(eventTypeOffers, checkedOffers)}
        </div>
    </section>`
  );
}

/**
 * Создает шаблон HTML-кода для секции направления
 * @returns {string} - Шаблон HTML-кода секции направления или пустая строка, если данные о направлении отсутствуют
 */
function createDestinationSectionTemplate(eventDestination) {
  if (!eventDestination || eventDestination.description === '' && eventDestination.pictures.length === 0) {
    return '';
  }
  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${eventDestination.description}</p>
      ${eventDestination?.pictures.length !== 0 ?
      `<div class="event__photos-container">
        <div class="event__photos-tape">
        ${eventDestination.pictures.map((image) => `<img class="event__photo" src="${image.src}" alt="${image.description}">`).join('')}
        </div>
      </div>` : ''}

    </section>`
  );
}

/**
 * Создает шаблон для добавления нового события
 *
 * @param event - Данные события
 * @param allOffers - Массив со всеми предложениями
 * @param destinations - Массив с информацией о пунктах назначения
 * @returns {string} - HTML-строка с шаблоном
 */
function createEventAddTemplate(event, allOffers, destinations) {
  const {basePrice, dateFrom, dateTo, destination, offers, type, isSaving} = event;
  const eventDestination = destinations.find((item) => item.id === destination);
  const renderDestinationsList = destinations.map((dest) => `<option value="${dest.name}"></option>`).join('');

  return (
    `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${createEventTypesTemplate(type)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${eventDestination ? he.encode(eventDestination.name) : ''}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${renderDestinationsList}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">${isSaving ? 'Saving...' : 'Save'}</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">
        ${createOffersSectionTemplate(allOffers, offers, type)}
        ${createDestinationSectionTemplate(eventDestination)}
      </section>
    </form>
  </li>`
  );
}

/**
 * Класс для представления формы добавления события
 * @extends {AbstractStatefulView}
 */
export default class EventAddView extends AbstractStatefulView {

  /**
   * Массив доступных предложений
   * @private
   */
  #offers = null;

  /**
   * Массив доступных направлений
   * @private
   */
  #destinations = null;

  /**
   * Обработчик сохранения формы
   * @private
   */
  #handleFormSubmit = null;

  /**
   * Обработчик нажатия на кнопку удаления
   * @private
   */
  #handleDeleteBtnClick = null;

  /**
   * Для выбора начальной даты
   * @private
   */
  #datepickerDateFrom = null;

  /**
   * Для выбора конечной даты
   * @private
   */
  #datepickerDateTo = null;

  /**
   * Конструктор класса EventAddView
   * @param offers - Массив доступных предложений
   * @param destinations - Массив доступных направлений
   * @param onFormSubmit - Обработчик сохранения формы
   * @param onDeleteBtnClick - Обработчик нажатия на кнопку удаления
   */
  constructor({offers, destinations, onFormSubmit, onDeleteBtnClick}) {
    super();
    this._setState({...EMPTY_EVENT_TEMPLATE, isSaving: false});
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteBtnClick = onDeleteBtnClick;
    this._restoreHandlers();
  }

  /** Возвращает шаблон представления */
  get template() {
    return createEventAddTemplate(this._state, this.#offers, this.#destinations);
  }

  /** Удаляет элемент представления */
  removeElement() {
    super.removeElement();

    if (this.#datepickerDateFrom) {
      this.#datepickerDateFrom.destroy();
      this.#datepickerDateFrom = null;
    }

    if (this.#datepickerDateTo) {
      this.#datepickerDateTo.destroy();
      this.#datepickerDateTo = null;
    }
  }

  /**
   * Обработчик сохранения формы
   * @private
   */
  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    delete this._state.isSaving;
    this.#handleFormSubmit(this._state);
  };

  /**
   * Обработчик нажатия на кнопку удаления
   * @private
   */
  #formDeleteBtnClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteBtnClick(this._state);
  };

  /**
   * Обработчик изменения типа события
   * @private
   */
  #eventTypeChangeHandler = (evt) => {
    evt.preventDefault();

    this.updateElement({
      type: evt.target.value,
      offers: [],
    });
  };

  /**
   * Обработчик изменения выбора предложения
   * @private
   */
  #offerChangeHandler = (evt) => {
    if (evt.target.checked) {
      this._setState({
        offers: [...this._state.offers, evt.target.dataset.id],
      });
    } else {
      this._state.offers
        .splice(this._state.offers.findIndex((offer) => offer === evt.target.dataset.id));
    }
  };

  /**
   * Обработчик изменения направления
   * @private
   */
  #destinationChangeHandler = (evt) => {
    const newDestination = this.#destinations.find((destination) => destination.name === evt.target.value);

    this.updateElement({
      destination: newDestination ? newDestination.id : '',
    });
  };

  /**
   * Обработчик изменения цены события
   * @private
   */
  #eventPriceChangeHandler = (evt) => {
    this._setState({
      basePrice: evt.target.value,
    });
  };

  /**
   * Обработчик изменения начальной даты
   * @private
   */
  #dateFromChangeHandler = ([userDate]) => {
    this._setState({
      dateFrom: userDate,
    });
  };

  /**
   * Обработчик изменения конечной даты
   * @private
   */
  #dateToChangeHandler = ([userDate]) => {
    this._setState({
      dateTo: userDate,
    });
  };

  /**
   *  Инициализирует элементы flatpickr для выбора даты
   * @private
   */
  #setDatePickers() {
    this.#datepickerDateFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: DateFormats.EDIT_FORM_FORMAT,
        enableTime: true,
        'time_24hr': true,
        defaultDate: this._state.dateFrom ? this._state.dateFrom : '',
        maxDate: this._state.dateTo,
        onChange: this.#dateFromChangeHandler,
      },
    );

    this.#datepickerDateTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: DateFormats.EDIT_FORM_FORMAT,
        enableTime: true,
        'time_24hr': true,
        defaultDate: this._state.dateTo ? this._state.dateTo : '',
        minDate: this._state.dateFrom,
        onChange: this.#dateToChangeHandler,
      },
    );
  }

  /**
   * Сбрасывает состояние представления
   * @param event - Событие
   */
  reset(event) {
    this.updateElement(event);
  }

  /**
   * Устанавливает обработчики событий
   * @private
   */
  _restoreHandlers() {
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);

    if (this.element.querySelector('.event__available-offers')) {
      this.element.querySelector('.event__available-offers')
        .addEventListener('change', this.#offerChangeHandler);
    }

    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);

    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#eventTypeChangeHandler);

    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#eventPriceChangeHandler);

    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#formDeleteBtnClickHandler);

    this.#setDatePickers();
  }
}
