import dayjs from 'dayjs';
import Duration from 'dayjs/plugin/duration';
import {AMOUNT_IN_DAY, AMOUNT_IN_HOUR} from '../constant/constant.js';

dayjs.extend(Duration);


/**
 * Enum содержащий константы для разных форматов даты
 * @enum {string}
 */
export const DateFormats = {
  DAY_MONTH: 'MMM D',
  YEAR_MONTH_DAY: 'YYYY-MM-D',
  FULL_DATE: 'YYYY-MM-DTHH:mm',
  HOURS_MINUTES: 'HH:mm',
  EDIT_FORM_FORMAT: 'd/m/y H:i',
  FORMAT_MINUTE_DIFF: 'mm[M]',
  FORMAT_MINUTE_HOURS_DAY_DIFF: 'DD[D] HH[H] mm[M]',
  FORMAT_MINUTE_HOURS_DIFF: 'HH[H] mm[M]'
};

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
  return dayjs.duration(eventDuration).format(durationFormat);
}

/**
 * Проверяет, находится ли заданная дата в прошлом
 *
 * @param date - Дата для проверки
 * @returns {boolean} True, если дата в прошлом, иначе false
 */
export function isEventInThePast(date) {
  return date && dayjs(date).isBefore(dayjs(), 'D');
}

/**
 * Проверяет, находится ли заданная дата в настоящем
 *
 * @param date - Дата для проверки
 * @returns {boolean} True, если дата в настоящем, иначе false
 */
export function isEventInThePresent(date) {
  return date && dayjs(date).isSame(dayjs(), 'D');
}

/**
 * Проверяет, находится ли заданная дата в будущем
 *
 * @param date - Дата для проверки
 * @returns {boolean} True, если дата в будущем, иначе false
 */
export function isEventInTheFuture(date) {
  return date && dayjs(date).isAfter(dayjs(), 'D');
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
