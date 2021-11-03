import React from 'react';
import styled from 'styled-components';
import { babyMonsters } from '../../assets/images/monsters';

const Title = () => {
  return (
    <Wrapper className="TitleContainer">
      <Container className="TitleContainer">
        <p>Habit</p>
        <p>Monster</p>
      </Container>
      <Monsters />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: 30px;
`;

const Container = styled.div`
  width: 247px;
  height: 122px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  & p {
    font-family: Retro Gaming;
    font-size: var(--font-large);
    color: var(--color-white);
    text-align: center;
  }
`;

const Monsters = styled.div`
  width: 249px;
  height: 35px;
  background-image: url(${babyMonsters});
`;

export default Title;
