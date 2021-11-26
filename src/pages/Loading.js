import React from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import background from '../assets/images/background';
import { MonsterThumbnail } from '../components/common';

const Loading = () => {
  return (
    <Wrapper>
      <section>
        <MonsterBox>
          <MonsterThumbnail id={1} />
        </MonsterBox>
        <MonsterBox>
          <MonsterThumbnail id={6} />
        </MonsterBox>
        <MonsterBox>
          <MonsterThumbnail id={16} />
        </MonsterBox>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: red;
  width: 100%;
  height: 100%;
  background-color: black;

  background: url(${background[3]}) no-repeat center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  & > section {
    padding: 0 24px;
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
`;

const bounce = keyframes`
  from {
    transform: translate3d(0, 0px, 0);
  }
  to {
    transform: translate3d(0, 100px, 0);
  }
`;

const MonsterBox = styled.div`
  width: 56px;
  height: 56px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${bounce} 500ms ease-in;
  animation-direction: alternate;
  animation-iteration-count: infinite;

  &:nth-of-type(1) {
    animation-delay: 0ms;
  }
  &:nth-of-type(2) {
    animation-delay: 125ms;
  }
  &:nth-of-type(3) {
    animation-delay: 250ms;
  }
`;

export default Loading;
