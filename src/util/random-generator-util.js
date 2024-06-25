/** нуль */
const ZERO = 0;
/** один */
const ONE = 1;

/** Получить случайное число */
export const getRandomNumber = (min = ZERO, max = ONE) => {
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new Error('getRandomNumber() принимает только числа в качестве аргументов');
  }
  if (max < min) {
    throw new Error('getRandomNumber() max должен быть больше min');
  }
  return Math.floor(Math.random() * (max - min + ONE)) + min;
};

/** Получить массив с рандомными элементами */
export const getRandomArrayElements = (array, count = ONE) => {
  if (!Array.isArray(array)) {
    throw new Error('getRandomArrayElements() первым значением принимает только массив');
  }
  if (typeof count !== 'number') {
    throw new Error('getRandomArrayElements() вторым значением принимает только число');
  }
  if (array.length === 0 || count > array.length) {
    return [];
  }
  return Array.from({length: count}, () => array[getRandomNumber(ZERO, array.length - ONE)]);
};

/** Получить рандомный элемент из массива */
export const getRandomArrayElement = (array) => {
  if (!Array.isArray(array)) {
    throw new Error('getRandomArrayElements() аргумент может быть только массивом');
  }
  return array[getRandomNumber(ZERO, array.length - ONE)];
};

/** Признак избранного */
export const isFavorite = () => !!getRandomNumber(ZERO, ONE);
