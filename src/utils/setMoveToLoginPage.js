export const setMoveToLoginPage = () => {
  window.localStorage.removeItem('habit-A-Token');
  window.localStorage.removeItem('habit-R-Token');
  window.location.href = '/login';
};
