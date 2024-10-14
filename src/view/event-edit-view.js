import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {EVENT_TYPES} from '../constant/constant.js';
import {DateFormats, formatDate} from '../util/event-utils.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import he from 'he';

/**
 * Создает шаблон HTML-кода для секции предложений
 * @returns {string} - Шаблон HTML-кода секции предложений
 */
function createOffersSectionTemplate(offers, eventChosenTypeOffers) {
  return eventChosenTypeOffers.offers.length !== 0 ?
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
      ${eventChosenTypeOffers ? eventChosenTypeOffers.offers.map((offer) => (`<div class="event__offer-selector">
      <input
        class="event__offer-checkbox visually-hidden"
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
    </div>`)).join('') : ''}
    </div>
    </section>` : '';
}

/**
 * Создает шаблон HTML-кода для секции направления
 * @returns {string} - Шаблон HTML-кода секции направления
 */
function createDestinationSectionTemplate(eventDestination) {
  if (eventDestination.description === '' && eventDestination.pictures.length === 0) {
    return '';
  }
  return eventDestination ?
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${eventDestination ? eventDestination.description : ''}</p>
      ${eventDestination?.pictures.length !== 0 ? `<div class="event__photos-container">
      <div class="event__photos-tape">
      ${eventDestination ? eventDestination.pictures.map((picture) => (`<img class="event__photo" src="${picture.src}"
      alt="${picture.description}">`)).join('') : ''}
      </div>
      </div>` : ''}
    </section>` : '';
}

/**
 * Создает HTML-шаблон для редактирования события
 *
 * @param event - Объект события, содержащий информацию о событии
 *
 * @property basePrice - Базовая цена события
 * @property dateFrom - Дата начала события
 * @property dateTo - Дата окончания события
 * @property destination - ID пункта назначения события
 * @property offers - Список доступных предложений для события
 * @property type - Тип события
 *
 * @param availableOffers - Список всех доступных предложений
 * @param destinations - Список всех доступных пунктов назначения
 *
 * @returns {string} - HTML-шаблон для редактирования события
 */
function createEventEditTemplate(event, availableOffers, destinations) {
  const {basePrice, dateFrom, dateTo, destination, offers, type, isSaving, isDeleting} = event;
  const eventDestination = destinations.find((destinationElement) => destinationElement.id === destination);
  const eventChosenTypeOffers = availableOffers.find((offer) => offer.type === type);
  const eventStartTime = formatDate(dateFrom, DateFormats.EDIT_FORM_FORMAT);
  const eventEndTime = formatDate(dateTo, DateFormats.EDIT_FORM_FORMAT);

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

    ${EVENT_TYPES.map((eventType) => (
      `<div class="event__type-item">
        <input id="event-type-${eventType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType}" ${eventType === type ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-1">${eventType}</label>
      </div>`
    )).join('')}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" required value="${eventDestination ? he.encode(eventDestination.name) : ''}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${destinations.map((element) => (`<option value="${element.name}"></option>`)).join('')}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${eventStartTime}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${eventEndTime}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">${isSaving ? 'Saving...' : 'Save'}</button>
        <button class="event__reset-btn" type="reset">${isDeleting ? 'Deleting...' : 'Delete'}</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${createOffersSectionTemplate(offers, eventChosenTypeOffers)}
        ${createDestinationSectionTemplate(eventDestination)}
      </section>
    </form>
  </li>`
  );
}

/**
 * Представление для редактирования события
 * @extends {AbstractStatefulView}
 */
export default class EventEditView extends AbstractStatefulView {

  /**
   * Список доступных предложений
   * @private
   */
  #offers = null;

  /**
   * Список доступных пунктов назначения
   * @private
   */
  #destinations = null;

  /**
   * Обработчик сохранения формы
   * @private
   */
  #handleFormSubmit = null;

  /**
   * Обработчик нажатия кнопки удаления
   * @private
   */
  #handleDeleteBtnClick = null;

  /**
   * Обработчик нажатия кнопки сворачивания формы
   * @private
   */
  #handleFormRollupBtnClick = null;

  /**
   * Datepicker для даты начала события
   * @private
   */
  #datepickerDateFrom = null;

  /**
   * Виджет Datepicker для даты окончания события
   * @private
   */
  #datepickerDateTo = null;

  /**
   * Инициализирует представление
   *
   * @param event - Объект события, содержащий информацию о событии
   * @param offers - Список доступных предложений
   * @param destinations - Список доступных пунктов назначения
   * @param onFormSubmit - Обработчик сохранения формы
   * @param onFormRollupClick - Обработчик нажатия кнопки сворачивания формы
   * @param onDeleteBtnClick - Обработчик нажатия кнопки удаления
   */
  constructor({event, offers, destinations, onFormSubmit, onFormRollupClick, onDeleteBtnClick}) {
    super();
    this._setState({
      ...event,
      isSaving: false,
      isDeleting: false
    });
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteBtnClick = onDeleteBtnClick;
    this.#handleFormRollupBtnClick = onFormRollupClick;
    this._restoreHandlers();
  }

  /**
   * Возвращает HTML-шаблон представления
   * @returns {string} - HTML-шаблон представления
   */
  get template() {
    return createEventEditTemplate(this._state, this.#offers, this.#destinations);
  }

  /** Удаляет элемент представления и очищает ресурсы */
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
   *
   * @param evt - Событие отправки формы
   * @private
   */
  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    delete this._state.isSaving;
    delete this._state.isDeleting;
    this.#handleFormSubmit(this._state);
  };

  /**
   * Обработчик нажатия кнопки удаления
   *
   * @param evt - Событие нажатия кнопки удаления
   * @private
   */
  #formDeleteBtnClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteBtnClick(this._state);
  };

  /**
   * Обработчик нажатия кнопки сворачивания формы
   *
   * @param evt - Событие нажатия кнопки сворачивания формы
   * @private
   */
  #formRollupBtnClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormRollupBtnClick(this._state);
  };

  /**
   * Обработчик изменения типа события
   *
   * @param evt - Событие изменения типа события
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
   * Обработчик изменения списка предложений
   *
   * @param evt - Событие изменения списка предложений
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
   * Обработчик изменения пункта назначения
   *
   * @param evt - Событие изменения пункта назначения
   * @private
   */
  #destinationChangeHandler = (evt) => {
    const newDestination = this.#destinations.find((destination) => destination.name === evt.target.value);

    this.updateElement({
      destination: newDestination ? newDestination.id : '',
    });
  };

  /**
   * Обработчик изменения даты начала события
   *
   * @param userDate - Новая дата начала события
   * @private
   */
  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  /**
   * Обработчик изменения даты окончания события
   *
   * @param userDate - Новая дата окончания события
   * @private
   */
  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  /**
   * Инициализирует виджеты Datepicker
   * @private
   */
  #setDatePickers() {
    this.#datepickerDateFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: DateFormats.EDIT_FORM_FORMAT,
        enableTime: true,
        'time_24hr': true,
        defaultDate: this._state.dateFrom ? this._state.dateFrom : new Date(),
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
        defaultDate: this._state.dateTo ? this._state.dateTo : new Date(),
        minDate: this._state.dateFrom,
        onChange: this.#dateToChangeHandler,
      },
    );
  }

  /**
   * Обработчик изменения цены события
   *
   * @param evt - Событие изменения цены события
   * @private
   */
  #eventPriceChangeHandler = (evt) => {
    this._setState({
      basePrice: evt.target.value,
    });
  };

  /**
   * Сбрасывает состояние представления
   * @param event - Объект события для сброса состояния
   */
  reset(event) {
    this.updateElement(event);
  }

  /**
   * Устанавливает обработчики событий для элементов представления
   * @private
   */
  _restoreHandlers() {
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#formRollupBtnClickHandler);

    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#eventTypeChangeHandler);

    if (this.element.querySelector('.event__available-offers')) {
      this.element.querySelector('.event__available-offers')
        .addEventListener('change', this.#offerChangeHandler);
    }

    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);

    this.element.querySelector('.event__input--price')
      .addEventListener('input', this.#eventPriceChangeHandler);

    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#formDeleteBtnClickHandler);

    this.#setDatePickers();
  }
}
