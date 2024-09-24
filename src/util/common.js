/**
 * Возвращает случайное целое число в заданном диапазоне
 * @param {number} min Минимальное значение
 * @param {number} max Максимальное значение
 * @return {number} Случайное целое число в диапазоне от min до max
 */
export function getRandomNumber(min = 20, max = 999) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}
