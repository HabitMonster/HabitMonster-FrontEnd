export const getPresetDurationEnd = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = ('0' + date.getMonth() + 1).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);

  return year + '-' + month + '-' + day;
};

export const getPresetDurationStart = () => {
  const date = new Date();
  date.setDate(date.getDate() - 30);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);

  return year + '-' + month + '-' + day;
};
