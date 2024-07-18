/**
 * Преобразует первую букву в заглавную а остальные в нижний регистр
 * @public
 * @export
 * @function capitalize
 * @param str Строка
 * @return {String}
 */
export const capitalize = (str) => {
  if (typeof str !== 'string') {
    throw new Error('capitalize() в аргументах должна быть строка');
  }
  return str.length === 0 ? '' : str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
