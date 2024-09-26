import Observable from '../framework/observable.js';
import {getEvents} from '../mock/events.js';
import {mockOffers} from '../mock/offers.js';
import {mockDestinations} from '../mock/destinations.js';


/** Модель точек событий */
export default class EventsModel extends Observable {

  /**
   * Массив точек событий
   * @private
   * @type {Array}
   */
  #events = getEvents();

  /**
   * Массив предложений
   * @private
   * @type {Array}
   */
  #offers = mockOffers;

  /**
   * Массив назначений
   * @private
   * @type {Array}
   */
  #destinations = mockDestinations;


  /**
   * Возвращает массив событий
   *
   * @returns {Array} Массив событий
   */
  get events() {
    return this.#events;
  }

  /**
   * Возвращает массив предложений
   *
   * @returns {Array} Массив предложений
   */
  get offers() {
    return this.#offers;
  }

  /**
   * Возвращает массив направлений
   *
   * @returns {Array} Массив направлений
   */
  get destinations() {
    return this.#destinations;
  }

  /**
   * Обновляет событие в массиве событий
   *
   * @throws {Error} Если событие с указанным id не найдено
   */
  updateEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Не удается обновить несуществующее событие');
    }

    this.#events = [
      ...this.#events.slice(0, index),
      update,
      ...this.#events.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  /**
   * Добавляет новое событие в массив событий
   *
   * @param {string} updateType Тип обновления
   * @param {Object} update Новое событие, которое нужно добавить
   */
  addEvent(updateType, update) {
    this.#events = [
      update,
      ...this.#events,
    ];

    this._notify(updateType, update);
  }

  /**
   * Удаляет событие из массива событий
   *
   * @throws {Error} Если событие с указанным id не найдено
   */
  deleteEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Не удается удалить несуществующее событие');
    }

    this.#events = [
      ...this.#events.slice(0, index),
      ...this.#events.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
