import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { monsterState } from '../../recoil/states/monster';

import { monsterApis } from '../../api';

import { QuestionIcon } from '../../assets/icons/achievement';

import { MonsterThumbnail } from '../common';

import { OK } from '../../constants/statusCode';
import { MAX_LEVEL } from '../../constants/monster';

import { useHorizontalScroll } from '../../hooks';

import { whiteOpacity, disappearScrollbar, setFontStyles } from '../../styles';

const MonsterCollection = () => {
  const levelOneMonster = useRecoilValue(monsterState);
  console.log(levelOneMonster);
  const [collectionList, setCollectionList] = useState([]);
  const wheelScrollRef = useHorizontalScroll();

  useEffect(() => {
    async function fetchList() {
      const { data } = await monsterApis.loadMonsterCollection();

      if (data.statusCode === OK) {
        setCollectionList(data.monsters);
      }
    }

    fetchList();
  }, []);

  return (
    <Wrapper>
      {!collectionList?.length ? (
        <EachCollectionWrapper>
          <p>{levelOneMonster.monsterName}</p>
          <MonsterInformationWrapper>
            <span>현재 레벨 LV.1</span>
            <span>{levelOneMonster.createAt} 생성</span>
          </MonsterInformationWrapper>
          <MonsterImageWrapper>
            <MonsterThumbnail
              id={levelOneMonster.levelOneId}
              width={'40px'}
              height={'45px'}
            />
            <span> LV. 1</span>
          </MonsterImageWrapper>
        </EachCollectionWrapper>
      ) : (
        collectionList.map((monster) => (
          <EachCollectionWrapper key={monster.monsterName}>
            <p>{monster.monsterName}</p>
            <MonsterInformationWrapper>
              <span>최고 레벨 LV.{monster.maxLevel}</span>
              <span>{monster.createdAt} 생성</span>
            </MonsterInformationWrapper>
            <ImageScroller ref={wheelScrollRef}>
              {Array(MAX_LEVEL)
                .fill(null)
                .map((_, i) => (
                  <MonsterImageWrapper key={`${monster.monsterName} ${i}`}>
                    {monster.maxLevel >=
                      monster.monsterDatabases[i]?.monsterLevel ?? i + 1 ? (
                      <MonsterThumbnail
                        id={monster.monsterDatabases[i].monsterId}
                        width={'40px'}
                        height={'45px'}
                      />
                    ) : (
                      <QuestionIcon />
                    )}
                    <span> LV. {i + 1}</span>
                  </MonsterImageWrapper>
                ))}
            </ImageScroller>
          </EachCollectionWrapper>
        ))
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-left: 24px;
  padding-bottom: 64px;
  position: relative;
`;

const EachCollectionWrapper = styled.div`
  margin-top: 32px;

  & p {
    ${setFontStyles({
      color: 'primary',
      fontSize: 'm',
      fontWeight: 'regular',
      lineHeight: '20px',
    })}
    margin-bottom: 6px;
  }
`;

const MonsterInformationWrapper = styled.div`
  padding-right: 24px;
  margin-bottom: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${whiteOpacity('0.6')}
  ${setFontStyles({
    fontSize: 'xs',
    fontWeight: 'semi-bold',
    lineHeight: '20px',
  })}
`;

const ImageScroller = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: auto;
  overflow-x: auto;
  ${disappearScrollbar()}
`;

const MonsterImageWrapper = styled.div`
  flex: 0 0 auto;
  width: 112px;
  height: 124px;
  margin-right: 10px;
  padding-top: 14px;
  padding-bottom: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--bg-primary);
  border-radius: var(--border-radius-semi);

  & svg {
    margin-bottom: 25px;
  }

  & span {
    ${setFontStyles({
      color: 'primary',
      fontSize: 'xs',
      lineHeight: '20px',
    })}
  }
`;

export default MonsterCollection;
