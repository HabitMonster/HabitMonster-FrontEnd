import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import styled from 'styled-components';

import { GoogleLogin, KakaoLogin, NaverLogin } from './';

import { getCookie } from '../../utils/cookie';

const SocialLogin = () => {
  const [isLogin, setIsLogin] = useState('');
  const [isFirstLogin, setIsFirstLogin] = useState('');

  useEffect(() => {
    const loginCheck = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: `${process.env.REACT_APP_BASE_URL}user/check`,
          headers: {
            'A-AUTH-TOKEN': `${getCookie('accessToken')}`,
          },
        });

        setIsLogin(response.data.isLogin);
        setIsFirstLogin(response.data.isFirstLogin);
      } catch (error) {
        setIsLogin(false);
        setIsFirstLogin(false);
      }
    };

    loginCheck();
  }, []);

  if (isLogin && isFirstLogin) {
    return <Redirect to="/monster" />;
  }

  if (isLogin) {
    return <Redirect to="/" />;
  }

  return (
    <BtnContainer className="BtnContainer">
      <KakaoLogin />
      <GoogleLogin />
      <NaverLogin />
    </BtnContainer>
  );
};

const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 84px;
`;

export default SocialLogin;
