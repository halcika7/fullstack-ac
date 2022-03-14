export const toTwoDigits = (num: number) =>
  Number(`${Math.round(`${num}e+2` as unknown as number)}e-2`);
