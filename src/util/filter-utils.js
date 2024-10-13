import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import {FilterTypes} from '../constant/constant';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

/**
 * Enum, содержащий константы для типов фильтрации событий
 * @enum {string}
 */
export const filter = {
  /** Фильтрация "Все события" */
  [FilterTypes.EVERYTHING]: (events) => events,
  /** Фильтрация "Будущие события" */
  [FilterTypes.FUTURE]: (events) => events.filter((event) => dayjs().isBefore(dayjs(event.dateFrom))),
  /** Фильтрация "Текущие события" */
  [FilterTypes.PRESENT]: (events) => events.filter((event) => dayjs().isSameOrAfter(dayjs(event.dateFrom)) && dayjs().isSameOrBefore(dayjs(event.dateTo))),
  /** Фильтрация "Прошедшие события" */
  [FilterTypes.PAST]: (events) => events.filter((event) => dayjs().isAfter(dayjs(event.dateTo))),
};
