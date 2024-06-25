import {getPoints, getRandomPoints} from '../mock/points.js';
import {getMockDestinations} from '../mock/destinations.js';
import {getMockOffers} from '../mock/offers.js';

/** Модель точек маршрута */
export default class PointModel {
  points = getPoints();
  /** Рандомные точки маршрута */
  randomPoints = getRandomPoints();
  /** Точки назначения */
  destinations = getMockDestinations();
  /** Предложения */
  offers = getMockOffers();

  /** Получить точки */
  getPoints = () => this.points;

  /** Получить точку */
  getPoint = (value) => {
    if (typeof value !== 'number') {
      throw new Error('getPoint() принимает только число');
    }
    return this.randomPoints.length > 0 ? this.randomPoints[value] : undefined;
  };

  /** Получить наименование точек назначения */
  getNameDestinations = () => this.destinations.map((destination) => destination.name);

  /** Получить точку назначения по id */
  getDestinationById = (id) => {
    if (!id) {
      throw new Error('getDestinationById() id не может быть пустым');
    }
    return this.destinations.find((destination) => id === destination.id);
  };

  /** Получить предлжения точки маршрута */
  getOffersByPoint = (point) => {
    const offersForType = this.offers.filter((item) => point.type === item.type);
    return offersForType
      .flatMap((item) => item.offers)
      .map((offer) => offer);
  };
}
