import React from 'react';
<<<<<<< HEAD
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
  justify-content: space-between;
  align-items: center;
  height: 100%;
  background-image: url(${loginPageBg});
  background-color: var(--color-login-bg);
  background-repeat: no-repeat;
  background-position: center 92px;
`;

=======

const Login = () => {
  return <h1>로그인 할롱</h1>;
};

>>>>>>> dev
export default Login;
