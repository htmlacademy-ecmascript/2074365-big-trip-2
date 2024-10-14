import Observable from '../framework/observable.js';
import {UpdateTypes} from '../constant/constant.js';


/** Модель точек событий */
export default class EventsModel extends Observable {

  #eventsApiService = null;

  /**
   * Массив точек событий
   * @private
   * @type {Array}
   */
  #events = [];

  /**
   * Массив предложений
   * @private
   * @type {Array}
   */
  #offers = [];

  /**
   * Массив назначений
   * @private
   * @type {Array}
   */
  #destinations = [];

  /** Конструктор класса EventListView */
  constructor({eventsApiService}) {
    super();
    this.#eventsApiService = eventsApiService;
  }

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

  /** Инициализирует компонент */
  async init() {
    try {
      this.#offers = await this.#eventsApiService.offers;
      this.#destinations = await this.#eventsApiService.destinations;
      const events = await this.#eventsApiService.events;
      this.#events = events.map(this.#adaptToClient);

      this._notify(UpdateTypes.INIT);
    } catch (err) {
      this._notify(UpdateTypes.POINTS_LOAD_ERROR);
    }
  }

  /**
   * Обновляет событие в массиве событий
   *
   * @throws {Error} Если событие с указанным id не найдено
   */
  async updateEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Не удается обновить несуществующее событие');
    }

    try {
      const response = await this.#eventsApiService.updateEvent(update);
      const updatedEvent = this.#adaptToClient(response);

      this.#events = [
        ...this.#events.slice(0, index),
        updatedEvent,
        ...this.#events.slice(index + 1),
      ];
      this._notify(updateType, updatedEvent);
    } catch (err) {
      throw new Error('Не удалось обновить событие');
    }
  }

  /**
   * Добавляет новое событие в массив событий
   *
   * @param {string} updateType Тип обновления
   * @param {Object} update Новое событие, которое нужно добавить
   */
  async addEvent(updateType, update) {
    try {
      const response = await this.#eventsApiService.addEvent(update);
      const newEvent = this.#adaptToClient(response);
      this.#events = [newEvent, ...this.#events];
      this._notify(updateType, newEvent);
    } catch (err) {
      throw new Error('Не удалось добавить событие');
    }
  }

  /**
   * Удаляет событие из массива событий
   *
   * @throws {Error} Если событие с указанным id не найдено
   */
  async deleteEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Не удается удалить несуществующее событие');
    }

    try {
      await this.#eventsApiService.deleteEvent(update);

      this.#events = [
        ...this.#events.slice(0, index),
        ...this.#events.slice(index + 1),
      ];

      this._notify(updateType);
    } catch (err) {
      throw new Error('Не удалось удалить событие');
    }
  }

  /**
   * Адаптирует объект события для клиента
   * @param {Event} event Исходный объект события
   * @returns {Event} Адаптированный объект события
   */
  #adaptToClient(event) {
    const adaptedEvent = {
      ...event,
      basePrice: event['base_price'],
      dateFrom: event['date_from'] !== null ? new Date(event['date_from']) : event['date_from'],
      dateTo: event['date_to'] !== null ? new Date(event['date_to']) : event['date_to'],
      isFavorite: event['is_favorite'],
    };

    delete adaptedEvent['base_price'];
    delete adaptedEvent['date_from'];
    delete adaptedEvent['date_to'];
    delete adaptedEvent['is_favorite'];

    return adaptedEvent;
  }
}
