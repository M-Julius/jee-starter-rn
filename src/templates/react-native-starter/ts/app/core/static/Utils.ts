const hex2rgba = (hex: string, alpha: number): string => {
  const newHex = hex.replace('#', '');

  const r: number = parseInt(newHex.length === 3
    ? newHex.slice(0, 1).repeat(2) : newHex.slice(0, 2), 16);
  const g: number = parseInt(newHex.length === 3
    ? newHex.slice(1, 2).repeat(2) : newHex.slice(2, 4), 16);
  const b: number = parseInt(newHex.length === 3
    ? newHex.slice(2, 3).repeat(2) : newHex.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default {
  hex2rgba,
};
