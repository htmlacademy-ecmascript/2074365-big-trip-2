import ApiService from '../framework/api-service.js';
import {Method} from '../constant/constant.js';


/**
 * Сервис для работы с событиями
 * @extends {ApiService}
 */
export default class EventsApiService extends ApiService {

  /** Получить список событий */
  get events() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  /** Получить список предложений */
  get offers() {
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
  }

  /** Получить список направлений */
  get destinations() {
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  /** Обновить событие */
  async updateEvent(event) {
    const response = await this._load({
      url: `points/${event.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(event)),
      headers: new Headers({'Content-type': 'application/json'}),
    });

    return await ApiService.parseResponse(response);
  }

  /** Добавить новое событие */
  async addEvent(event) {
    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(event)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    return await ApiService.parseResponse(response);
  }

  /** Удалить событие */
  async deleteEvent(event) {
    return await this._load({
      url: `points/${event.id}`,
      method: Method.DELETE,
    });
  }

  /**
   * Адаптер объекта события для отправки на сервер
   * @returns {Object} - Адаптированный объект
   */
  #adaptToServer(event) {
    const adaptedEvent = {
      ...event,
      'base_price': parseInt(event.basePrice, 10),
      'date_from': event.dateFrom instanceof Date ? event.dateFrom.toISOString() : null,
      'date_to': event.dateTo instanceof Date ? event.dateTo.toISOString() : null,
      'is_favorite': event.isFavorite,
    };

    delete adaptedEvent.basePrice;
    delete adaptedEvent.dateFrom;
    delete adaptedEvent.dateTo;
    delete adaptedEvent.isFavorite;

    return adaptedEvent;
  }
}
