export const setFormattedDuration = (duration, type, sep) => {
  const date = new Date(duration);
  const stack = [];

  type.split('').forEach((x) => {
    if (x === 'Y') {
      stack.push(date.getFullYear());
    }

    if (x === 'M') {
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      stack.push(month);
    }

    if (x === 'D') {
      stack.push(date.getDate());
    }
  });

  return stack.join(`${sep}`);
};
