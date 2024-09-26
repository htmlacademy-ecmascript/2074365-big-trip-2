import {filter} from '../util/filter-utils.js';

/**
 * Генерирует список фильтров
 * @param {Array} events - Массив событий для фильтрации.
 */
export function generateFilter(events) {
  return Object.entries(filter).map(
    ([filterType, filterEvents]) => ({
      type: filterType,
      count: filterEvents(events).length,
    }),
  );
}
