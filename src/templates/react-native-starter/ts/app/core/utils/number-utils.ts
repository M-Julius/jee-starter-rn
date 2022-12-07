// eslint-disable-next-line import/prefer-default-export
export function formatCurrency(num: number, prefix: string = 'Rp') {
  return `${num < 0 ? '-' : ''}${prefix}${Math.abs(num).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`;
}

export function formatPhoneNumber(value: string) {
  if (!value) return value;

  const phoneNumber = value.replace(/[^\d]/g, '');

  const phoneNumberLength = phoneNumber.length;

  return `+${phoneNumber.slice(0, 2)} ${phoneNumber.slice(
    2,
    5,
  )} ${phoneNumber.slice(5, 9)} ${phoneNumber.slice(9, phoneNumberLength)}`;
}
