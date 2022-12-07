export default {
  trimNonNumeric: (text: string) => text.replace(/[^0-9]/g, ''),
  trimPhoneNumber: (text: string) => {
    if (text[0] === '0') {
      return text.slice(1);
    }
    return text;
  },
  isNumeric: (text: string) => /[^0-9]/g.test(text),
  isEmail: (text: string) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(text),
  dmyToDate: (text: string) => {
    const [d, m, y] = text.split('/');
    return new Date(`${y}-${Number(m) - 1}-${d}`);
  },
  dmyToYmd: (text: string) => {
    const [d, m, y] = text.split('/');
    return `${y}-${String(m).padStart(2, '0')}-${d}`;
  },
  ymdToDmy: (text: string) => {
    if (text.length < 6) return '-';
    const [y, m, d] = text.split('-');
    return `${d}/${String(m).padStart(2, '0')}/${y}`;
  },
  DateToDmy: (date: Date) => `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`,
  DateToYmd: (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
};
