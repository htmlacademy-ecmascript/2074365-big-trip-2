import AbstractView from '../framework/view/abstract-view.js';
import {DateFormats, formatDate} from '../util/event-utils.js';

/**
 * Максимальное количество видимых направлений
 *
 * @type {number}
 * @constant
 */
const MAX_VISIBLE_DESTINATIONS = 3;

/**
 * Создает HTML-шаблон для блока информации о поездке
 *
 * @param tripInfo - Объект с информацией о поездке
 *
 * @property destinationNames - Список названий пунктов назначения
 * @property totalPrice - Общая стоимость поездки
 * @property eventDates - даты события
 *
 * @returns {string} - HTML-шаблон блока информации о поездке
 */
function createTripInfoTemplate({destinationNames, totalPrice, eventDates}) {
  const destinations = [...destinationNames];
  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${destinations.length > MAX_VISIBLE_DESTINATIONS ? `${destinations[0]} &mdash;...&mdash; ${destinations[destinations.length - 1]}` : destinations.join(' &mdash; ')}</h1>

        <p class="trip-info__dates">${eventDates}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
      </p>
    </section>`
  );
}

/**
 * Представление для блока информации о поездке
 * @extends {AbstractView}
 */
export default class TripInfoView extends AbstractView {

  /**
   * Список событий поездки
   * @private
   */
  #events = null;

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
   * Инициализирует представление
   *
   * @param events - Список событий поездки
   * @param offers - Список доступных предложений
   * @param destinations - Список доступных пунктов назначения
   */
  constructor({events, offers, destinations}) {
    super();
    this.#events = events;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  /**
   * Возвращает HTML-шаблон представления
   * @returns {string} - HTML-шаблон представления
   */
  get template() {
    return createTripInfoTemplate({
      destinationNames: this.#getDestinationNames(),
      totalPrice: this.#calculatePrice(),
      eventDates: this.#getDates(),
      events: this.#events,
    });
  }

  /**
   * Возвращает список названий пунктов назначения
   * @private
   */
  #getDestinationNames() {
    return this.#events.map((event) => this.#destinations.find((dest) => dest.id === event.destination).name);
  }

  /**
   * Возвращает строку с датами начала и окончания события (или только дату начала, если событие одно)
   * @returns {string} - Строка с датами в формате "день месяц"
   */
  #getDates() {
    return this.#events.length > 1 ?
      `${formatDate(this.#events[0].dateFrom, DateFormats.DAY_MONTH)}&nbsp;&mdash;&nbsp;${formatDate(this.#events[this.#events.length - 1].dateTo, DateFormats.DAY_MONTH)}`
      :
      `${formatDate(this.#events[0].dateFrom, DateFormats.DAY_MONTH)}&nbsp;&mdash;&nbsp;${formatDate(this.#events[0].dateTo, DateFormats.DAY_MONTH)}`;
  }

  /**
   * Рассчитывает общую стоимость поездки
   *
   * @returns {number} - Общая стоимость поездки
   * @private
   */
  #calculatePrice() {
    const eventsBasePrice = this.#events.reduce((total, event) => total + parseInt(event.basePrice, 10), 0);
    let checkedOffersSum = 0;

    for (let i = 0; i < this.#events.length; i++) {
      const neededOfferType = this.#offers.find((offer) => offer.type === this.#events[i].type);
      const filteredOffers = neededOfferType.offers.filter((offer) => this.#events[i].offers.includes(offer.id));
      if (filteredOffers.length !== 0) {
        const filteredOffersPricesArray = filteredOffers.map((offer) => offer.price);
        const sum = filteredOffersPricesArray.reduce((total, offerPrice) => total + offerPrice);
        checkedOffersSum += sum;
      }
    }

    return eventsBasePrice + checkedOffersSum;
  }
}
