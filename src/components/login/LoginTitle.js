import React from 'react';
import styled from 'styled-components';

import { loginMonster } from '../../assets/images/login';

const LoginTitle = () => {
  return (
    <Wrapper>
      <TitleContainer>
        <Title>Habit</Title>
        <Title>Monster</Title>
      </TitleContainer>
      <SubTitle>몬스터와 함께하는 새로운 습관의 시작!</SubTitle>
      <Image />
    </Wrapper>
  );
};

const TitleContainer = styled.div`
  width: 187px;
  height: 90px;
  margin: 100px auto 18px auto;
  line-height: 43px;
`;

const Title = styled.p`
  color: var(--color-white);
  font-size: var(--font-maximum);
  font-weight: var(--weight-extra-bold);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  font-family: var(--font-name-apple);
`;

const Image = styled.div`
  width: 220px;
  height: 129px;
  margin: 0 auto;
  margin-bottom: 24px;
  background-image: url(${loginMonster});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const SubTitle = styled.p`
  width: 213px;
  height: 17px;
  font-weight: var(--weight-semi-regular);
  font-size: var(--font-xs);
  line-height: 16.8px;
  color: var(--color-white);
  margin: 0 auto;
  margin-bottom: 75px;
  opacity: 0.7;
`;

export default LoginTitle;
