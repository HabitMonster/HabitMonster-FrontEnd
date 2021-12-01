import React from 'react';
import styled from 'styled-components';

import { onboard01 } from '../../assets/images/onboard';

import { setFontStyles } from '../../styles';

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
  ${setFontStyles({
    color: 'white',
    fontSize: 'maximum',
    fontWeight: 'extra-bold',
  })}
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Image = styled.div`
  width: 220px;
  height: 129px;
  margin: 0 auto;
  margin-bottom: 24px;
  background-image: url(${onboard01});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.5;
`;

const SubTitle = styled.p`
  width: 213px;
  height: 17px;
  ${setFontStyles({
    color: 'white',
    fontSize: 'xs',
    fontWeight: 'semi-regular',
    lineHeight: '16.8px',
  })}
  margin: 0 auto;
  margin-bottom: 75px;
  opacity: 0.7;
`;

export default LoginTitle;
