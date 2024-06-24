import dayjs from 'dayjs';

/** Форматы дат */
export const formatsDate = {
  FORMAT_DATE_TIME: 'DD/MM/YY HH:mm',
  FORMAT_DATE_MOUNT_DAY: 'MMM DD',
  FORMAT_TIME: 'HH:mm'
};

/** Отформатировать дату по формату константы */
export const formatDateOfTaskByConstant = (date, format) => date ? dayjs(date).format(format) : '';

/** Получить текущую дату */
export const getCurrentDate = () => new Date();

/** Получить дату и время с корректировкой на день */
export const getCurrentDatePlusDays = (countDay) => {
  const currentDate = getCurrentDate();
  currentDate.setDate(currentDate.getDate() + countDay);
  return currentDate;
};
