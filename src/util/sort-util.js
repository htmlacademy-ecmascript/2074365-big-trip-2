import {render} from '../framework/render.js';
import {SortOrder, TypeSorted} from './constants-util.js';

/**
 * Сортировка по времени
 * @export
 * @function sortedTime
 * @param pointsMap Мапа точек маршрута
 * @return void
 */
export function sortedTime(pointsMap) {
  const sortedEntries = Array.from(pointsMap.entries())
    .sort((first, second) => {
      const firstDateFrom = new Date(first[1].point.dateFrom);
      const firstDateTo = new Date(first[1].point.dateTo);
      const firstDuration = firstDateTo.getTime() - firstDateFrom.getTime();

      const secondDateFrom = new Date(second[1].point.dateFrom);
      const secondDateTo = new Date(second[1].point.dateTo);
      const secondDuration = secondDateTo.getTime() - secondDateFrom.getTime();

      return secondDuration - firstDuration;
    });
  pointsMap.clear();
  sortedEntries.forEach(([key, value]) => pointsMap.set(key, value));
}

/**
 * Сортировка точек маршрутов по параметрам
 * @export
 * @function sortPointsMap
 * @param pointsMap Мапа точек маршрута
 * @param sortKey ключ сортировки
 * @param sortOrder тип сортировки
 */
export function sortPointsMap(pointsMap, sortKey, sortOrder = SortOrder.DESC) {
  const sortedEntries = Array.from(pointsMap.entries())
    .sort((first, second) => {
      const valueFirst = first[1].point[sortKey];
      const valueSecond = second[1].point[sortKey];

      let comparison;
      if (sortKey === TypeSorted.DATE_FORM) {
        comparison = new Date(valueFirst).getTime() - new Date(valueSecond).getTime();
      } else if (sortKey === TypeSorted.BASE_PRICE) {
        comparison = valueSecond - valueFirst;
      } else if (sortKey === TypeSorted.OFFERS) {
        comparison = valueSecond.length - valueFirst.length;
      } else {
        comparison = valueSecond.localeCompare(valueFirst);
      }
      return sortOrder === SortOrder.DESC ? comparison : -comparison;
    });
  pointsMap.clear();
  sortedEntries.forEach(([key, value]) => pointsMap.set(key, value));
}

/**
 * Рендерит точки
 * @export
 * @function renderPoints
 * @param pointsMap Мапа точек маршрута
 * @param elements элемент в котором рендерятся точки
 */
export function renderPoints(pointsMap, elements) {
  elements.innerHTML = '';
  pointsMap.forEach((item) => render(item, elements));
}
