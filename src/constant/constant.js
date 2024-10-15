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
