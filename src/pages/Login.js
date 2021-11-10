import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

import { SocialLogin, LoginTitle } from '../components/login';
import { loginPageBg } from '../assets/images/background';

import '../assets/fonts/font.css';

const Login = () => {
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('isFirstLogin') === 'true') {
      return history.replace('/monster');
    }
  }, []);

  return (
    <React.Fragment>
      <Wrapper>
        <LoginTitle />
        <SocialLogin />
      </Wrapper>
    </React.Fragment>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: url(${loginPageBg});
  background-color: var(--color-login-bg);
  background-repeat: no-repeat;
  background-position: center;
`;

export default Login;
