export const AMOUNT_IN_DAY = 86400000;
export const AMOUNT_IN_HOUR = 3600000;
export const MAX_DAYS_BEFORE_CONVERTING_INTO_MONTH = 29;

/** Константы типа транстпорта */
export const EVENT_TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];

/** Константы типов фильтров */
export const FilterTypes = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

/** Константы типов сортировок */
export const SortTypes = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

/** Констатны событий пользователя */
export const UserActions = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

/** Константы уровней обновлений */
export const UpdateTypes = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  POINTS_LOAD_ERROR: 'POINTS_LOAD_ERROR',
};

/**
 * Константы, определяющие временные ограничения
 * @enum {number}
 */
export const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

/**
 * Константы для HTTP-методов
 * @enum {string}
 */
export const Method = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

/**
 * Enum содержащий константы для разных форматов даты
 * @enum {string}
 */
export const DateFormats = {
  DAY_MONTH: 'MMM D',
  MONTH_DAY: 'D MMM',
  YEAR_MONTH_DAY: 'YYYY-MM-D',
  FULL_DATE: 'YYYY-MM-DTHH:mm',
  HOURS_MINUTES: 'HH:mm',
  EDIT_FORM_FORMAT: 'd/m/y H:i',
  FORMAT_MINUTE_DIFF: 'mm[M]',
  FORMAT_MINUTE_HOURS_DAY_DIFF: 'DD[D] HH[H] mm[M]',
  FORMAT_MINUTE_HOURS_DIFF: 'HH[H] mm[M]'
};

/**
 * Enum, содержащий тексты для отсутствия событий по типу фильтра
 * @enum {string}
 */
export const NoEventsTextType = {
  /** Текст для отсутствия событий при фильтрации "Все события" */
  [FilterTypes.EVERYTHING]: 'Click New Event to create your first point',
  /** Текст для отсутствия событий при фильтрации "Будущие события" */
  [FilterTypes.FUTURE]: 'There are no future events now',
  /** Текст для отсутствия событий при фильтрации "Прошедшие события" */
  [FilterTypes.PAST]: 'There are no past events now',
  /** Текст для отсутствия событий при фильтрации "Текущие события" */
  [FilterTypes.PRESENT]: 'There are no present events now'
};

/**
 * Длинное тире
 * @type {string}
 */
export const MD_DASH = '&mdash;';

/**
 * Длинное тире c пробелами
 * @type {string}
 */
export const MD_DASH_SPACE = ' &mdash; ';

/**
 * Многоточие
 * @type {string}
 */
export const ELLIPSIS = '...';

/**
 * Неразрывный пробел
 * @type {string}
 */
export const NBSP = '&nbsp;';
