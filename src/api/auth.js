import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

export const auth = {
  getSocialLogin: (socialName, code) =>
    instance.get(`/user/login/${socialName}?code=${code}`),
};
