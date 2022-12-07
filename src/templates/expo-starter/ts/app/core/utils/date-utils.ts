import {translate, TxKeyPath} from '../i18n';

const dayTx: TxKeyPath[] = [
  'day.sun',
  'day.mon',
  'day.tue',
  'day.wed',
  'day.thu',
  'day.fri',
  'day.sat',
];

const dayAbbr = [
  'sun',
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
];

export function getDayTranslation(day: number) {
  return translate(dayTx[day]);
}

export function getDayTranslationAbbr(day: string | null | undefined) {
  return translate(dayTx[dayAbbr.indexOf(day ?? 'sun')]);
}

export function getDayAbbreviate(day: number) {
  return dayAbbr[day];
}

export function getDateMonthTime(dateTime: string) {
  const dd = new Date(dateTime);
  const date = dd.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hourCycle: 'h24',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });
  return date;
}

export function convertTimeStringToMillis(time?: string | undefined | null) {
  const date = new Date();
  const [hour = 0, minute = 0] = time?.split(':').map((data) => (Number(data) ?? 0)) ?? [];
  date.setHours(hour);
  date.setMinutes(minute);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date.getTime();
}

export function convertUtcHourToCurrentTz(time?: string | undefined | null) {
  const date = new Date();
  const [hour = 0, minute = 0] = time?.split(':').map((data) => (Number(data) ?? 0)) ?? [];
  date.setHours(hour);
  date.setMinutes(minute);
  date.setSeconds(0);
  date.setMilliseconds(0);
  date.setTime(date.getTime() - (date.getTimezoneOffset() * 60000));
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

export function convertUtcHourFromOffsetTz(time?: string | undefined | null, offset?: number) {
  const d = new Date();

  const [hour = 0, minute = 0] = time?.split(':').map((data) => (Number(data) ?? 0)) ?? [];
  d.setHours(hour);
  d.setMinutes(minute);
  d.setSeconds(0);
  d.setMilliseconds(0);

  const utc = d.getTime() + d.getTimezoneOffset() * 60000;

  const nd = new Date(utc + 3600000 * (offset ?? 7));
  nd.setTime(nd.getTime() - (nd.getTimezoneOffset() * 60000));

  return `${String(nd.getHours()).padStart(2, '0')}:${String(nd.getMinutes()).padStart(2, '0')}`;
}
