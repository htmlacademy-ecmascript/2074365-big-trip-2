import AbstractView from '../framework/view/abstract-view.js';
import {calculateDuration, formatDate} from '../util/event-utils.js';
import he from 'he';
import {DateFormats} from '../constant/constant.js';


/**
 * Создает HTML-шаблон для отображения события
 *
 * @param event - Объект события, содержащий информацию о событии
 *
 * @property name - Название события
 * @property type - Тип события
 * @property destination - ID пункта назначения события
 * @property basePrice - Базовая цена события
 * @property dateFrom - Дата начала события
 * @property dateTo - Дата окончания события
 * @property offers - Список ID предложений для события
 *
 * @param allOffers - Список всех доступных предложений
 * @param destinations - Список всех доступных пунктов назначения
 *
 * @returns {string} - HTML-шаблон для отображения события
 */
function createEventTemplate(event, allOffers, destinations) {
  const {basePrice, dateFrom, dateTo, destination, isFavorite, offers, type} = event;
  const dateTime = formatDate(dateFrom, DateFormats.YEAR_MONTH_DAY);
  const date = formatDate(dateFrom, DateFormats.DAY_MONTH);
  const fullDateStart = formatDate(dateFrom, DateFormats.FULL_DATE);
  const fullDateEnd = formatDate(dateTo, DateFormats.FULL_DATE);
  const eventStartTime = formatDate(dateFrom, DateFormats.HOURS_MINUTES);
  const eventEndTime = formatDate(dateTo, DateFormats.HOURS_MINUTES);
  const eventDestination = destinations.find((destinationElement) => destinationElement.id === destination);
  const favoriteClass = isFavorite
    ? 'event__favorite-btn--active'
    : '';
  const duration = calculateDuration(dateFrom, dateTo);
  const eventTypeOffers = allOffers.find((offer) => offer.type === type);

  return (
    `<li class="trip-events__item">

    <div class="event">

      <time class="event__date" datetime="${dateTime}">${date}</time>

      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>

      <h3 class="event__title">${type} ${eventDestination ? he.encode(eventDestination.name) : ''}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${fullDateStart}">${eventStartTime}</time>
          &mdash;
          <time class="event__end-time" datetime="${fullDateEnd}">${eventEndTime}</time>
        </p>
        <p class="event__duration">${duration}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>

      <ul class="event__selected-offers">
      ${eventTypeOffers.offers.map((offer) => {
      if (offers.includes(offer.id)) {
        return (
          `<li class="event__offer">
            <span class="event__offer-title">${offer.title}</span>
              &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </li>`
        );
      }
    }).join('')}
      </ul>

      <button class="event__favorite-btn ${favoriteClass}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>

    </div>
  </li>`
  );
}

/**
 * Представление для отображения информации о событии
 * @extends {AbstractView}
 */
export default class EventView extends AbstractView {

  /**
   * Объект события
   * @private
   */
  #event = null;

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
   * Обработчик нажатия кнопки сворачивания
   * @private
   */
  #handleRollupClick = null;

  /**
   * Обработчик нажатия кнопки добавления в избранное
   * @private
   */
  #handleFavoriteClick = null;

  /**
   * Инициализирует представление
   *
   * @param event - Объект события
   * @param offers - Список доступных предложений
   * @param destinations - Список доступных пунктов назначения
   * @param onRollupClick - Обработчик нажатия кнопки сворачивания
   * @param onFavoriteClick - Обработчик нажатия кнопки добавления в избранное
   */
  constructor({event, offers, destinations, onRollupClick, onFavoriteClick}) {
    super();
    this.#event = event;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleRollupClick = onRollupClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#rollupClickHandler);

    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  /**
   * Возвращает HTML-шаблон представления
   * @returns {string} - HTML-шаблон представления
   */
  get template() {
    return createEventTemplate(this.#event, this.#offers, this.#destinations);
  }

  /**
   * Обработчик нажатия кнопки сворачивания
   *
   * @param evt - Событие нажатия кнопки сворачивания
   * @private
   */
  #rollupClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupClick();
  };

  /**
   * Обработчик нажатия кнопки добавления в избранное
   *
   * @param evt - Событие нажатия кнопки добавления в избранное
   * @private
   */
  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
