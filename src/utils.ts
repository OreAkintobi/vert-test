export const showPercentages = (value: number) => {
  return value.toFixed(2);
};

export const formatNumber = (longNumber: number) =>
  new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
  }).format(longNumber);

export const sumArrayOfNumbers = (array: number[]) =>
  array.reduce((a, b) => {
    return a + b;
  }, 0);
