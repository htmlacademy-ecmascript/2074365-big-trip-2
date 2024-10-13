import {TEMPLATE_UUID} from '../constant/constant.js';

/**
 * Возвращает случайное целое число в заданном диапазоне
 * @param {number} min Минимальное значение
 * @param {number} max Максимальное значение
 * @return {number} Случайное целое число в диапазоне от min до max
 */
export function getRandomNumber(min = 20, max = 999) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

/**
 * Генерирует UUID без дефисов
 * @returns {string} UUID в формате без дефисов
 */
export function generateUUID() {
  return TEMPLATE_UUID.replace(/[xy]/g, (callback) => {
    const randomNum = (Math.random() * 16) | 0,
      value = callback === 'x' ? randomNum : (randomNum & 0x3) | 0x8;
    return value.toString(16);
  }).replace(/-/g, '');
}
