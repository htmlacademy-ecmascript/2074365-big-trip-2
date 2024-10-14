/**
 * Генерирует UUID без дефисов
 * @returns {string} UUID в формате без дефисов
 */
export function generateUUID() {
  const uuid = crypto.randomUUID();
  return uuid.replace(/-/g, '');
}

/**
 * Проверяет, является ли нажатая клавиша клавишей Escape
 *
 * @param {KeyboardEvent} evt Событие нажатия клавиши
 * @returns {boolean} True, если нажата клавиша Escape, иначе false
 */
export function isEscapeKey(evt) {
  return evt.key === 'Escape';
}
