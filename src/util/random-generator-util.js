/**
 * Нуль
 * @type {Number}
 */
const ZERO = 0;

/**
 * Один
 * @type {Number}
 */
const ONE = 1;

/**
 * Получить случайное число
 * @param min Минимальное число
 * @param max Максимальное число
 * @return {Number}
 */
export const getRandomNumber = (min = ZERO, max = ONE) => {
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new Error('getRandomNumber() принимает только числа в качестве аргументов');
  }
  if (max < min) {
    throw new Error('getRandomNumber() max должен быть больше min');
  }
  return Math.floor(Math.random() * (max - min + ONE)) + min;
};

/**
 * Получить рандомный элемент из массива
 * @param array Массив
 * @return {Array}
 */
export const getRandomArrayElement = (array) => {
  if (!Array.isArray(array)) {
    throw new Error('getRandomArrayElements() аргумент может быть только массивом');
  }
  return array[getRandomNumber(ZERO, array.length - ONE)];
};

/**
 * Признак избранного
 * @return {Boolean}
 */
export const isFavorite = () => !!getRandomNumber(ZERO, ONE);
