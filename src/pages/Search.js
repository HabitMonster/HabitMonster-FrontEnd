import React, { useEffect, useState, useCallback } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

import { userApis } from '../api/user';
import { OK, BAD_REQUEST } from '../constants/statusCode';
import { NOT_FOUND_USER_VIA_MONSTER_CODE } from '../constants/statusMessage';

import { BackButtonHeader, NonePlaceHolder } from '../components/common';
import { MonsterListItem } from '../components/monster';

import { miniDebounce } from '../utils/event';

const Search = () => {
  const history = useHistory();
  const { path } = useRouteMatch();

  const [monsterCode, setMonsterCode] = useState('');
  const [debouncedMonsterCode, setDebouncedMonsterCode] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isFail, setIsFail] = useState(null);
  const [recommendedUserList, setRecommendedUserList] = useState([]);

  const debounceChange = useCallback(
    miniDebounce(function (nextValue) {
      setDebouncedMonsterCode(nextValue);
    }, 600),
    [setDebouncedMonsterCode],
  );

  useEffect(() => {
    const queryUser = async () => {
      if (!debouncedMonsterCode || debouncedMonsterCode.length < 6) {
        setDebouncedMonsterCode('');
        return;
      }
      try {
        const { data } = await userApis.searchUser(debouncedMonsterCode);
        setSearchResult(null);

        if (
          data.statusCode === BAD_REQUEST &&
          data.responseMessage === NOT_FOUND_USER_VIA_MONSTER_CODE
        ) {
          setIsFail(true);
          return;
        }
        setSearchResult(data.userInfo);
        setIsFail(false);
      } catch (error) {
        console.log(error);
      }
    };
    queryUser();
  }, [debouncedMonsterCode]);

  useEffect(() => {
    const queryRecommendation = async () => {
      try {
        const { data } = await userApis.getRecommendedUsers();
        if (data.statusCode === OK) {
          const mappedUserList = data.userList.map(({ title, userInfo }) => ({
            title,
            ...userInfo,
          }));
          setRecommendedUserList(mappedUserList);
        }
      } catch (error) {
        console.error(error);
      }
    };
    queryRecommendation();
  }, []);

  return (
    <Wrapper>
      <BackButtonWrapper>
        <BackButtonHeader onButtonClick={() => history.replace('/')}>
          <SearchInput
            type="text"
            value={monsterCode}
            onChange={(e) => {
              setIsFail(false);
              setSearchResult(null);
              setMonsterCode(e.target.value);
              debounceChange(e.target.value);
            }}
            placeholder="몬스터 코드를 입력하세요"
          />
          {monsterCode && (
            <CancelButton
              onClick={() => {
                setMonsterCode('');
                setDebouncedMonsterCode('');
                setIsFail(null);
              }}
            >
              <div>
                <div></div>
                <div></div>
              </div>
            </CancelButton>
          )}
        </BackButtonHeader>
      </BackButtonWrapper>
      {isFail && (
        <SearchFailSection>
          <NonePlaceHolder>
            <span>검색한 유저를 찾지 못했어요</span>
          </NonePlaceHolder>
        </SearchFailSection>
      )}
      {searchResult && (
        <ul>
          <MonsterListItem
            nickName={searchResult.nickName}
            monsterCode={searchResult.monsterCode}
            isFollowed={searchResult.isFollowed}
            monsterId={searchResult.monsterId}
            path={`${path}/${searchResult.monsterCode}`}
          />
        </ul>
      )}
      {recommendedUserList.length && (
        <RecommendationSection>
          <h2>추천 유저</h2>
          {recommendedUserList.map(
            ({ isFollowed, monsterCode, monsterId, nickName, title }) => {
              return (
                <MonsterListItem
                  key={title + nickName + monsterId}
                  nickName={nickName}
                  monsterId={monsterId}
                  monsterCode={monsterCode}
                  recommendationTitle={title}
                  isFollowed={isFollowed}
                  path={`${path}/${monsterCode}`}
                />
              );
            },
          )}
        </RecommendationSection>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: scroll;
`;
const BackButtonWrapper = styled.div`
  margin: 24px 0;
  position: relative;
`;

const CancelButton = styled.div`
  width: 24px;
  height: 24px;
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;

  & > div {
    width: 18px;
    height: 18px;
    background: #999999;
    border-radius: 99em;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;

    & > div {
      width: 7.66px;
      height: 2.12px;
      background: var(--bg-primary);
      border-radius: 99em;
      position: absolute;

      &:first-child {
        transform: rotate(45deg);
      }
      &:last-child {
        transform: rotate(135deg);
      }
    }
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 32px;
  padding: 14px 12px;
  background: var(--bg-primary);
  border: none;
  border-radius: 4px;
  color: var(--color-deemed);

  &::placeholder {
    font-size: 13px;
    line-height: 16px;
    font-weight: var(--weight-regular);
    color: var(--color-deemed);
  }

  &:focus {
    outline: none;
  }
`;

const SearchFailSection = styled.div`
  height: 145px;
  margin-top: 48px;
  position: relative;
`;

const RecommendationSection = styled.ul`
  overflow-y: scroll;
  & > h2 {
    color: white;
    padding: 0 24px;
    font-weight: var(--weight-bold);
    line-height: 19.2px;
    margin-top: 32px;
    margin-bottom: 10px;
  }
`;

export default Search;
