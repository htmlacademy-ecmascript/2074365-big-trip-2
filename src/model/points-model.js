import {getPoints} from '../mock/points.js';
import {getMockDestinations} from '../mock/destinations.js';
import {getMockOffers} from '../mock/offers.js';

/** Модель точек маршрута */
export default class PointModel {

  /**
   * Точки маршрута
   * @type {Array}
   */
  #points = getPoints();

  /**
   * Точки назначения
   * @type {Array}
   */
  #destinations = getMockDestinations();

  /**
   * Предложения
   * @type {Array}
   */
  #offers = getMockOffers();

  /**
   * Получить точки
   * @return {Array}
   */
  get points() {
    return this.#points;
  }

  /**
   * Получить наименование точек назначения
   * @return {Array}
   */
  get nameDestinations() {
    return this.#destinations.map((destination) => destination.name);
  }

  /**
   * Получить точку по id
   * @param id Id точки маршрута
   * @return {Object}
   */
  getPointById = (id) => {
    if (id) {
      return this.#points.length > 0 ? this.#points.find((point) => id === point.id) : undefined;
    }
    throw new Error('getPointById() Аргумент не может быть пуст');
  };

  /**
   * Получить точку назначения по id
   * @param id Id точки маршрута
   * @return {Object}
   */
  getDestinationById = (id) => {
    if (!id) {
      throw new Error('getDestinationById() id не может быть пустым');
    }
    return this.#destinations.find((destination) => id === destination.id);
  };

  /**
   * Получить предлжения точки маршрута
   * @type {Object}
   * @return {Object}
   */
  getOffersByPoint = (point) => {
    const offersForType = this.#offers.filter((item) => point.type === item.type);
    return offersForType
      .flatMap((item) => item.offers)
      .map((offer) => offer);
  };
}
