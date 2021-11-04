import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import styled from 'styled-components';
import Loading from '../../pages/Loading';
import { monsterSelector } from '../../recoil/states';

const Character = () => {
  const monsterData = useRecoilValueLoadable(monsterSelector);

  switch (monsterData.state) {
    case 'hasValue':
      const { monster } = monsterData.contents;

      return (
        <CharacterContainer className="characterContainer">
          <MainCharacter
            className="mainChracter"
            image={monster.monsterImage}
          />
          <CharacterInfo className="chracterInfo">
            <CharacterName className="chracterName">
              {monster.monsterName}
            </CharacterName>
            <CharacterLevel className="chracterLevel">
              lv.{monster.level}
            </CharacterLevel>
          </CharacterInfo>
        </CharacterContainer>
      );
    case 'loading':
      return <Loading />;
    case 'hasError':
      return monsterData.contents;
  }
};

const CharacterContainer = styled.div`
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
  background-image: ${(props) => `url(${props.image})`};
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

export default Character;
