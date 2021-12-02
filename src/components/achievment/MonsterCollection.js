import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { monsterApis } from '../../api';

import { QuestionIcon } from '../../assets/icons/achievement';

import { NonePlaceHolder, MonsterThumbnail } from '../common';

import { OK } from '../../constants/statusCode';
import { MAX_LEVEL } from '../../constants/monster';

import { useHorizontalScroll } from '../../hooks';

import {
  whiteOpacity,
  disappearScrollbar,
  setFontStyles,
  setFlexStyles,
} from '../../styles';

const MonsterCollection = () => {
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
    <Wrapper isPlaceholder={!collectionList?.length}>
      {!collectionList?.length ? (
        <NonePlaceHolder>
          <span>
            아직 수집한 몬스터가 없어요.
            <br />
            습관을 실천해 몬스터를 모아보세요!
          </span>
        </NonePlaceHolder>
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
  padding-left: ${({ isPlaceholder }) => !isPlaceholder && '24px'};
  padding-bottom: ${({ isPlaceholder }) => !isPlaceholder && '64px'};
  position: relative;
  height: ${({ isPlaceholder }) => isPlaceholder && '100%'};
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
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  })}
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
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  })}
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
