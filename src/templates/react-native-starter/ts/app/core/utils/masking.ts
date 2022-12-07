const maskingStringLast = (str : string) => {
  let cencoredName = '';
  const splitName = str.split(' ');
  splitName.forEach((name: string, index: number) => {
    if (index > 0) {
      cencoredName += ' ';
    }
    [...name].forEach((char: string, i: number) => {
      if (i === 0) {
        cencoredName += char;
      } else {
        cencoredName += '*';
      }
    });
  });
  return cencoredName;
};

// eslint-disable-next-line import/prefer-default-export
export {maskingStringLast};
