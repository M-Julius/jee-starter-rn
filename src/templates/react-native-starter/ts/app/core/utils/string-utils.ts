// eslint-disable-next-line import/prefer-default-export
export function appendLine(old: string, appended: string) {
  if (old) return `${old}\n${appended}`;
  return appended;
}
