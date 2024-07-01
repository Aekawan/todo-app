import dayjs from 'dayjs';

export const formatDate = (date: string) => {
  return dayjs(date).format('DD MMM');
};

export function dateToInputDate(date?: any) {
  if (!date) {
    return '';
  }
  return new Date(date).toISOString().split('T')[0];
}