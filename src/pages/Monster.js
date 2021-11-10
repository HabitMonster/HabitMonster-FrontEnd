import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

import { MonsterThumbnail } from '../components/monster';
import { monsterApis } from '../api/index';
import { OK } from '../constants/statusCode';

import {
  babyMonOrange,
  babyMonBlue,
  babyMonGreen,
  babyMonPurple,
  babyMonYellow,
} from '../assets/images/monsters';

const MONSTER_MOCK_LIST = [
  {
    imageUrl: babyMonOrange,
    imageAlt: '주황이',
    monsterId: 1,
  },
  {
    imageUrl: babyMonBlue,
    imageAlt: '파랑이',
    monsterId: 'Lv1-blue',
  },
  {
    imageUrl: babyMonGreen,
    imageAlt: '녹색이',
    monsterId: 'Lv1-green',
  },
  {
    imageUrl: babyMonPurple,
    imageAlt: '보랑이',
    monsterId: 'Lv1-purple',
  },
  {
    imageUrl: babyMonYellow,
    imageAlt: '노랑이',
    monsterId: 'Lv1-yellow',
  },
];

const Monster = () => {
  const [monsterName, setMonsterName] = useState('');
  const [selectedMonster, setSelectedMonster] = useState(MONSTER_MOCK_LIST[0]);
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('isFirstLogin') === 'false') {
      return history.replace('/');
    }
  }, []);

  const selectMonster = (monster) => {
    console.log('selectedMonster.monsterId', selectedMonster.monsterId);
    setSelectedMonster(monster);
  };

  const changeMonsterName = (event) => {
    setMonsterName(event.target.value);
  };

  const setMonsterInfo = async () => {
    const monsterInfo = {
      monsterId: selectedMonster.monsterId,
      monsterName: monsterName,
    };

    // 몬스터 등록 기능에서 400 에러가 반환되고 있습니다.
    // 몬스터를 등록하게 되면 더이상 "신규 유저"가 아니게 되므로 isFirstLogin을 false로 주고자 합니다.
    // 플로우 테스트를 위해 catch (error) 구문에도 localStorage 함수를 작성했습니다.
    // API가 완성되면 지워주시면 감사하겠습니다.

    try {
      console.log('monsterInfo', monsterInfo);
      const { data } = await monsterApis.setMonster(monsterInfo);
      if (data.statusCode === OK) {
        localStorage.setItem('isFirstLogin', false);
        history.replace('/');
      }
    } catch (error) {
      console.error(error);
      localStorage.setItem('isFirstLogin', false);
      history.replace('/');
    }
  };

  return (
    <MonsterContainer>
      <MonsterWrap>
        <TitleWrap>
          <Title>
            반가워요 🙌 <br />
            <ColorText>나만의 몬스터</ColorText>를 골라주세요!
          </Title>
          <Description>
            한 번 고른 몬스터는 변경이 어려우니 신중히 골라주세요
          </Description>
        </TitleWrap>
        <ThumbnailWrap>
          <MonsterThumbnail
            imageUrl={selectedMonster.imageUrl}
            imageAlt={selectedMonster.imageAlt}
            imageSize={'large'}
          />
        </ThumbnailWrap>
        <SelectList>
          {MONSTER_MOCK_LIST.map((monster) => {
            return (
              <SelectListItem
                key={monster.imageUrl}
                selected={selectedMonster.imageUrl === monster.imageUrl}
                onClick={() => selectMonster(monster)}
              >
                <MonsterThumbnail
                  imageUrl={monster.imageUrl}
                  imageAlt={monster.imageAlt}
                  imageSize={'small'}
                />
              </SelectListItem>
            );
          })}
        </SelectList>
        <InputWrap>
          <NameInput
            type="text"
            value={monsterName}
            onChange={changeMonsterName}
            placeholder="너의 몬스터 이름은?"
          />
        </InputWrap>
      </MonsterWrap>
      <FixedButton onClick={setMonsterInfo}>Start</FixedButton>
    </MonsterContainer>
  );
};

export default Monster;

// Monster.propTypes = {
//   history: PropTypes.func,
// };

const MonsterContainer = styled.div`
  font-family: var(--font-name-apple);
  width: 100%;
  height: 100%;
`;

const MonsterWrap = styled.div`
  background-color: var(--color-login-bg);
  padding: 6% 24px 10%;
  width: 100%;
  height: 100vh;
  padding: 70px 24px 100px;
`;

const TitleWrap = styled.div``;

const Title = styled.h2`
  color: var(--color-white);
  font-size: var(--font-semi-medium);
  font-weight: var(--weight-extra-bold);
  line-height: 29px;
`;

const ColorText = styled.span`
  color: var(--color-yellow);
`;

const Description = styled.p`
  color: var(--color-white);
  font-size: var(--font-micro);
  font-weight: var(--weight-regular);
  margin-top: 12px;
`;

const ThumbnailWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 0 30px;
`;

const SelectList = styled.ul`
  display: grid;
  gap: 6px;
  margin: 0 auto;
  grid-template-columns: repeat(3, 1fr);
  max-width: 204px;
`;

const SelectListItem = styled.li`
  border: 3px solid
    ${(props) => (props.selected ? 'var(--color-white)' : 'rgba(0, 0, 0, 0.4)')};
  border-radius: var(--border-radius-monsterItem);
  cursor: pointer;
  transition: border 500ms;
`;

const InputWrap = styled.div`
  border: 2px solid var(--color-white);
  border-radius: var(--border-radius-mideum);
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 277px;
  height: 46px;
  margin: 50px auto;
`;

const NameInput = styled.input`
  border: 0;
  background: none;
  color: var(--color-white);
  font-size: var(--font-regular);
  font-weight: bold;
  line-height: 22px;
  outline: 0;
  text-align: center;

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const FixedButton = styled.button`
  background-color: var(--color-main);
  border: 0;
  outline: 0;
  color: var(--color-white);
  font-size: var(--font-regular);
  font-weight: var(--weight-bold);
  line-height: 22px;
  text-align: center;
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  height: 68px;
  width: 100%;
  max-width: 360px;
`;
