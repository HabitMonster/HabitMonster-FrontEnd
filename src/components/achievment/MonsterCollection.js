import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';

import { MonsterThumbnail } from '../monster';

import { whiteOpacity } from '../../styles/Mixin';
import { monsterApis } from '../../api';
import { OK } from '../../constants/statusCode';

const MonsterCollection = () => {
  const [collectionList, setCollectionList] = useState([]);

  const getCategorizedMonsterHash = (list) => {
    if (!list.length) {
      return {};
    }

    return list.reduce((hash, cur) => {
      if (!hash[cur.monsterName]) {
        hash[cur.monsterName] = [];
      }
      hash[cur.monsterName].push(cur);
      return hash;
    }, {});
  };

  useEffect(() => {
    async function fetchList() {
      const { data } = await monsterApis.loadMonsterCollection();

      if (data.statusCode === OK) {
        setCollectionList(data.monsters);
      }
    }

    fetchList();
  }, []);

  const categorizedMonsterHash = getCategorizedMonsterHash(collectionList);

  return (
    <Wrapper>
      {!collectionList.length ? (
        <NoneTextWrapper>
          <NoneTextTitle>아직 수집한 몬스터가 없어요!😭</NoneTextTitle>
          <NoneTextDescription>
            습관을 실천해 몬스터를 레벨업하고
            <br />
            새로운 몬스터를 수집해 보세요!
          </NoneTextDescription>
        </NoneTextWrapper>
      ) : (
        Object.keys(categorizedMonsterHash).map((monsterName) => (
          <EachCollectionWrapper key={monsterName}>
            <p>{monsterName}</p>
            <MonsterInformationWrapper>
              <span>
                최고 레벨 LV.{categorizedMonsterHash[monsterName].length}
              </span>
              <span>XXXX-XX-XX 생성</span>
            </MonsterInformationWrapper>
            <ImageScroller>
              {categorizedMonsterHash[monsterName].map((monster, i) => (
                <MonsterImageWrapper key={`${monster.monsterName} ${i}`}>
                  <MonsterThumbnail
                    imageUrl={monster.monsterImage}
                    imageAlt={`The monster of ${monster.monsterName}`}
                    imageSize="small"
                  />
                  <span>LV.{monster.monsterLevel + i}</span>
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

  &:last-child {
    margin-bottom: 64px;
  }
`;

const EachCollectionWrapper = styled.div`
  margin-top: 32px;

  & p {
    color: var(--color-primary);
    font-size: var(--font-m);
    line-height: 20px;
    font-weight: var(--font-weight-medium);
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
  font-size: var(--font-xs);
  line-height: 20px;
  font-weight: var(--font-weight-semiBold);
`;

const ImageScroller = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  width: auto;
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
  border-radius: 4px;

  & img {
    margin-bottom: 14px;
  }

  & span {
    font-size: var(--font-xs);
    line-height: 20px;
    color: var(--color-primary);
  }
`;

const NoneTextWrapper = styled.section`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0 24px;
`;

const NoneTextTitle = styled.h2`
  ${whiteOpacity('0.8')};
  font-size: var(--font-xxl);
  line-height: 32px;
  font-weight: var(--font-weight-bold);
  margin-bottom: 16px;
`;

const NoneTextDescription = styled.p`
  ${whiteOpacity('0.6')};
  font-size: var(--font-l);
  line-height: 27px;
`;

export default MonsterCollection;
