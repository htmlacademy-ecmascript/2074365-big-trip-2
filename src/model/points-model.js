import {getPoints} from '../mock/points.js';
import {getMockDestinations} from '../mock/destinations.js';
import {getMockOffers} from '../mock/offers.js';

/** Модель точек маршрута */
export default class PointsModel {

  /** Точки маршрута */
  #points = getPoints();
  /** Точки назначения */
  #destinations = getMockDestinations();
  /** Предложения */
  #offers = getMockOffers();

  /**
   * Получить точки
   * @public
   * @method points
   * @return {Array}
   */
  get points() {
    return this.#points;
  }

  /**
   * Получить типы точек маршрутов
   * @public
   * @method typePoints
   * @return {Array}
   */
  get typePoints() {
    return this.#points.filter((data) => data !== null).map((item) => item.type);
  }

  /**
   * Получить точки назначения
   * @public
   * @method destinations
   * @return {Array}
   */
  get destinations() {
    return this.#destinations;
  }

  /**
   * Получить наименование точек назначения
   * @public
   * @method nameDestinations
   * @return {Array}
   */
  get nameDestinations() {
    return this.#destinations.map((destination) => destination.name);
  }

  /**
   * Получить точку по id
   * @public
   * @method getPointById
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
   * @public
   * @method getDestinationById
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
   * @public
   * @method getOffersByPoint
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
