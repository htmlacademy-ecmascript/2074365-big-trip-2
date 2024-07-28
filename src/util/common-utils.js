/**
 * Склонировать Мапу
 * @export
 * @function cloneMap
 * @param map клонируемая мапа
 * @return Map
 */
export function cloneMap(map) {
  const clonedMap = new Map();
  for (const [key, value] of map) {
    if (key && value) {
      clonedMap.set(key, value);
    }
  }
  return clonedMap;
}
