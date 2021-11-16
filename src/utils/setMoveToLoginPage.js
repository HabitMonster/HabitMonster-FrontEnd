export const setMoveToLoginPage = () => {
  window.localStorage.removeItem('habitAccessToken');
  window.localStorage.removeItem('habitRefreshToken');
  window.location.href = '/login';
};
