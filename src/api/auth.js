import instance from '../lib/axios';

export const auth = {
  getSocialLogin: (socialName, code) =>
    instance.get(`/user/login/${socialName}?code=${code}`),
};
