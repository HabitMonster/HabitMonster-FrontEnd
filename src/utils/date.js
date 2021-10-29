export const getDay = (date) =>
  date
    .toLocaleDateString('ko-KR', {
      weekday: 'long',
    })
    .substr(0, 1);

export const createDate = (date) => {
  return new Date(
    new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0),
  );
};
