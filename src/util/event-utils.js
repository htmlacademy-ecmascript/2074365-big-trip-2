import dayjs from 'dayjs';
import Duration from 'dayjs/plugin/duration';
import {
  AMOUNT_IN_DAY,
  AMOUNT_IN_HOUR,
  DateFormats,
  MAX_DAYS_BEFORE_CONVERTING_INTO_MONTH
} from '../constant/constant.js';

dayjs.extend(Duration);


/**
 * Форматирует дату в соответствии с заданным форматом
 *
 * @param date - Дата для форматирования
 * @param format - Формат даты
 * @returns {string} Форматированная дата
 */
export function formatDate(date, format) {
  return date ? dayjs(date).format(format) : '';
}

/**
 * Вычисляет продолжительность между двумя датами и возвращает ее в удобном формате
 *
 * @param startDate - Начальная дата в формате строки
 * @param endDate - Конечная дата в формате строки
 */
export function calculateDuration(startDate, endDate) {
  const eventDuration = dayjs(endDate).diff(startDate);
  let durationFormat = DateFormats.FORMAT_MINUTE_HOURS_DAY_DIFF;
  if (eventDuration < AMOUNT_IN_DAY) {
    durationFormat = DateFormats.FORMAT_MINUTE_HOURS_DIFF;
  }
  if (eventDuration < AMOUNT_IN_HOUR) {
    durationFormat = DateFormats.FORMAT_MINUTE_DIFF;
  }
  return Math.floor(dayjs.duration(eventDuration).asDays()) > MAX_DAYS_BEFORE_CONVERTING_INTO_MONTH ?
    `${Math.floor(dayjs.duration(eventDuration).asDays())}D
    ${dayjs.duration(eventDuration).format(DateFormats.FORMAT_MINUTE_HOURS_DIFF)}`
    : dayjs.duration(eventDuration).format(durationFormat);
}

/**
 * Вспомогательная функция для сравнения дат с учетом null
 *
 * @param dateA - Первая дата
 * @param dateB - Вторая дата
 * @returns {number|null} Возвращает 0, если обе даты null, -1, если dateA null, 1, если dateB null, иначе null
 */
function getWeightForNullDate(dateA, dateB) {
  if (dateA === null && dateB === null) {
    return 0;
  }
  if (dateA === null) {
    return 1;
  }
  if (dateB === null) {
    return -1;
  }
  return null;
}

/**
 * Сортирует события по дате
 *
 * @param eventA - Первое событие
 * @param eventB - Второе событие
 * @returns {number} Значение для сортировки
 */
export function sortEventsByDay(eventA, eventB) {
  const weight = getWeightForNullDate(eventA.dateFrom, eventB.dateFrom);
  return weight ?? dayjs(eventA.dateFrom).diff(dayjs(eventB.dateFrom));
}

/**
 * Сортирует события по цене
 *
 * @param eventA - Первое событие
 * @param eventB - Второе событие
 * @returns {number} Значение для сортировки
 */
export function sortEventsByPrice(eventA, eventB) {
  return eventB.basePrice - eventA.basePrice;
}

/**
 * Сортирует события по продолжительности
 *
 * @param eventA - Первое событие
 * @param eventB - Второе событие
 * @returns {number} Значение для сортировки
 */
export function sortEventsByDuration(eventA, eventB) {
  const eventDurationA = dayjs(eventA.dateTo).diff(eventA.dateFrom);
  const eventDurationB = dayjs(eventB.dateTo).diff(eventB.dateFrom);
  return eventDurationB - eventDurationA;
}
