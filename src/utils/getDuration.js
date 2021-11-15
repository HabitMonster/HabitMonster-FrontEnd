export const getPresetDurationStart = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);

  return year + '-' + month + '-' + day;
};

export const getPresetDurationEnd = () => {
  const today = new Date();
  today.setDate(today.getDate() + 30);
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);

  return year + '-' + month + '-' + day;
};
