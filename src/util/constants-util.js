/**
 * Статусы событий
 * @public
 * @export
 * @enum StatusEvent
 * @return {Enumerator}
 */
export const StatusEvent = Object.freeze({
  DEFAULT: 'default',
  EDIT: 'edit'
});

/**
 * Типы событий
 * @public
 * @export
 * @enum TypeEvent
 * @return {Enumerator}
 */
export const TypeEvent = Object.freeze({
  POINT: 'point',
  EDIT: 'edit'
});

/**
 * Типы сортировки
 * @public
 * @export
 * @enum TypeSorted
 * @return {Enumerator}
 */
export const TypeSorted = Object.freeze({
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
  DATE_FORM: 'dateFrom',
  TYPE: 'type',
  BASE_PRICE: 'basePrice',
  OFFERS: 'offers'
});

/**
 * Порядок сортировки
 * @public
 * @export
 * @enum SortOrder
 * @return {Enumerator}
 */
export const SortOrder = Object.freeze({
  DESC: 'desc',
  ASC: 'asc'
});

/**
 * Параметры средства выбора дат
 * @public
 * @export
 * @enum DatePicker
 * @return {Enumerator}
 */
export const DatePicker = Object.freeze({
  MIN_DATE: 'minDate',
  MAX_DATE: 'maxDate',
  DATE_FORMAT: 'd/m/Y H:i'
});
