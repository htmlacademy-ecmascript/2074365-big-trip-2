import {calculateTimeDifference, formatDateOfTaskByConstant, FormatsDate} from '../util/date-util.js';
import {capitalize} from '../util/string-util.js';
import AbstractView from '../framework/view/abstract-view.js';

/**
 * Создать шаблон события
 * @param offers предложения
 * @return {String}
 */
const createEventOffer = (offers) => {
  const {title, price} = offers;
  return (`
    <li class="event__offer">
        <span class="event__offer-title">${title}</span>
            &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
    </li>
  `);
};

/**
 * Создать шаблон для события
 * @param point точка маршруто
 * @param destination назначение
 * @param offers предложения
 * @param timeDifference разница во времени
 * @return {String}
 */
function createEventTemplate({point, destination, offers, timeDifference}) {
  const {type, dateFrom, dateTo, basePrice} = point;
  const {name} = destination;
  return (`
            <li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="2019-03-18">${formatDateOfTaskByConstant(dateFrom, FormatsDate.FORMAT_DATE_MOUNT_DAY)}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${capitalize(type)} ${capitalize(name)}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="2019-03-18T10:30">${formatDateOfTaskByConstant(dateFrom, FormatsDate.FORMAT_TIME)}</time>
                    &mdash;
                    <time class="event__end-time" datetime="2019-03-18T11:00">${formatDateOfTaskByConstant(dateTo, FormatsDate.FORMAT_TIME)}</time>
                  </p>
                  <p class="event__duration">${timeDifference}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                    ${offers.map((item) => createEventOffer(item)).join('')}
                </ul>
                <button class="event__favorite-btn event__favorite-btn--active" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>
  `);
}

/** Представление для события */
export default class EventView extends AbstractView {

  /** Идентификатор точки маршрута */
  #id;

  /** Модель точки */
  #pointModel;

  /**
   * Конструктор
   * @param id Идентификатор точки маршрута
   * @param pointModel Модель точки
   * @param editForm экземпляр редактирования формы
   * @param onEditFormClick обработчик смены точки маршрута на форму редактирования
   */
  constructor({id, pointModel, editForm, onEditFormClick}) {
    super();
    this.#id = id;
    this.#pointModel = pointModel;
    this.#handleEditForm(editForm, onEditFormClick);
  }

  /**
   * Обработчик слушетеля событий
   * @param editForm экземпляр редактирования формы
   * @param onEditFormClick обработчик смены точки маршрута на форму редактирования
   */
  #handleEditForm(editForm, onEditFormClick) {
    const button = this.element.querySelector('.event__rollup-btn');
    button.addEventListener('click', onEditFormClick.bind(null, editForm, this));
  }

  /**
   * Получить шаблон события
   * @return {String}
   */
  get template() {
    const point = this.#pointModel.getPointById(this.#id);
    const destination = this.#pointModel.getDestinationById(point.destination);
    const offers = this.#pointModel.getOffersByPoint(point);

    const {dateFrom, dateTo} = point;
    const timeDifference = calculateTimeDifference(dateFrom, dateTo);
    return createEventTemplate(
      {
        point: point,
        destination: destination,
        offers: offers,
        timeDifference: timeDifference
      }
    );
  }
}
