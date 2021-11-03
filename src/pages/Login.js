import React from 'react';
import styled from 'styled-components';
import { SocialLogin, Title } from '../components/login';
import '../assets/fonts/font.css';
import { loginPageBg } from '../assets/images/background';

const Login = () => {
  return (
    <React.Fragment>
      <Wrapper className="Wrapper">
        <Title />
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
