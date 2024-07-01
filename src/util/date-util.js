import dayjs from 'dayjs';

/**
 * Форматы дат
 * @return {Enumerator}
 */
export const FormatsDate = Object.freeze({
  FORMAT_DATE_TIME: 'DD/MM/YY HH:mm',
  FORMAT_DATE_MOUNT_DAY: 'MMM DD',
  FORMAT_TIME: 'HH:mm',
  FORMAT_MINUTE_DIFF: 'mm[M]',
  FORMAT_MINUTE_HOURS_DIFF: 'hh[H] mm[M]',
  FORMAT_MINUTE_HOURS_DAY_DIFF: 'D[D] hh[H] mm[M]',
});

/**
 * Отформатировать дату по формату константы
 * @param date дата
 * @param format формат даты
 * @return {String}
 */
export const formatDateOfTaskByConstant = (date, format) => date ? dayjs(date).format(format) : '';

/**
 * Получить текущую дату
 * @return {Date}
 */
export const getCurrentDate = () => new Date();

/**
 * Получить дату и время с корректировкой на день
 * @param countDay количество дней
 * @return {Date}
 */
export const getCurrentDatePlusDays = (countDay) => {
  const currentDate = getCurrentDate();
  currentDate.setDate(currentDate.getDate() + countDay);
  return currentDate;
};

/**
 * Расчет разницы времени
 * @param startDateString начало времени
 * @param endDateString конец времени
 * @return {String}
 */
export const calculateTimeDifference = (startDateString, endDateString) => {
  const diff = new Date(new Date(endDateString) - new Date(startDateString));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days < 1 && hours < 1) {
    return dayjs(diff).format(FormatsDate.FORMAT_MINUTE_DIFF);
  } else if (days < 1) {
    return dayjs(diff).format(FormatsDate.FORMAT_MINUTE_HOURS_DIFF);
  } else {
    return dayjs(diff).format(FormatsDate.FORMAT_MINUTE_HOURS_DAY_DIFF);
  }
};
