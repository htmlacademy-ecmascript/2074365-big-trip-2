import {FilterTypes} from '../constant/constant';
import {isEventInTheFuture, isEventInThePast, isEventInThePresent} from './event-utils';

/**
 * Enum, содержащий константы для типов фильтрации событий
 * @enum {string}
 */
export const filter = {
  /** Фильтрация "Все события" */
  [FilterTypes.EVERYTHING]: (events) => events.filter((event) => event),
  /** Фильтрация "Будущие события" */
  [FilterTypes.FUTURE]: (events) => events.filter((event) => isEventInTheFuture(event.dateFrom)),
  /** Фильтрация "Текущие события" */
  [FilterTypes.PRESENT]: (events) => events.filter((event) => isEventInThePresent(event.dateFrom)),
  /** Фильтрация "Прошедшие события" */
  [FilterTypes.PAST]: (events) => events.filter((event) => isEventInThePast(event.dateFrom)),
};
