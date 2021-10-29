import React from 'react';
import styled from 'styled-components';
import { Character } from '../../assets/images/main';

const Chracter = () => {
  return (
    <ChracterContainer className="characterContainer">
      <MainCharacter className="mainChracter" />
      <CharacterInfo className="chracterInfo">
        <CharacterName className="chracterName">해빗몬</CharacterName>
        <CharacterLevel className="chracterLevel">Lv.1</CharacterLevel>
      </CharacterInfo>
    </ChracterContainer>
  );
};

const ChracterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  margin-bottom: 57px;
`;

const MainCharacter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 148px;
  height: 122.94px;
  margin-top: 108px;
  background-image: url(${Character});
`;

const CharacterInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 79px;
  color: var(--color-white);
`;

const CharacterName = styled.span`
  margin-right: 6px;
  font-family: Apple SD Gothic Neo B;
  font-size: var(--font-regular);
`;

const CharacterLevel = styled.span`
  font-family: Apple SD Gothic Neo L;
  font-size: var(--font-micro);
`;

export default Chracter;
