import {createElement} from '../render.js';
import {formatDateOfTaskByConstant, formatsDate} from '../util/date-util.js';
import {capitalize} from '../util/string-util.js';

/** Создать шаблон события */
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

/** Создать шаблон для события */
function createEventTemplate(point, destination, offers) {
  const {type, dateFrom, dateTo, basePrice} = point;
  const {name} = destination;
  return (`
            <li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="2019-03-18">${formatDateOfTaskByConstant(dateFrom, formatsDate.FORMAT_DATE_MOUNT_DAY)}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${capitalize(type)} ${capitalize(name)}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="2019-03-18T10:30">${formatDateOfTaskByConstant(dateFrom, formatsDate.FORMAT_TIME)}</time>
                    &mdash;
                    <time class="event__end-time" datetime="2019-03-18T11:00">${formatDateOfTaskByConstant(dateTo, formatsDate.FORMAT_TIME)}</time>
                  </p>
                  <p class="event__duration">30M</p>
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
export default class EventView {

  constructor(count, pointModel) {
    this.count = count;
    this.pointModel = pointModel;
  }

  getTemplate() {
    const point = this.pointModel.getPoint(this.count);
    const destination = this.pointModel.getDestinationById(point.destination);
    const offers = this.pointModel.getOffersByPoint(point);
    return createEventTemplate(point, destination, offers);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
