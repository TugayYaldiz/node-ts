import flatted from 'flatted';

export const stringify = (
  value: any,
  replacer: (number | string)[] | null = null,
  space: string | number = 2,
): string => {
  try {
    return JSON.stringify(value, replacer, space);
  } catch (error) {
    return flatted.stringify(value, replacer, space);
  }
};
