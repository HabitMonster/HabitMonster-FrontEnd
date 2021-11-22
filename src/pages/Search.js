import React, { useEffect, useState, useCallback } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { userApis } from '../api/user';
import { OK, BAD_REQUEST } from '../constants/statusCode';
import { NOT_FOUND_USER_VIA_MONSTER_CODE } from '../constants/statusMessage';
import { refreshInfoState } from '../recoil/states/follow';

import { BackButtonHeader } from '../components/common';
import { MonsterListItem } from '../components/monster';
import { NonePlaceHolder } from '../components/common';

import { miniDebounce } from '../utils/event';

const Search = () => {
  const history = useHistory();
  const { path } = useRouteMatch();
  const [monsterId, setMonsterId] = useState('');
  const [debouncedId, setDebouncedId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isFail, setIsFail] = useState(null);
  const [recommendedUserList, setRecommendedUserList] = useState([]);
  const setRefreshInfo = useSetRecoilState(refreshInfoState);

  // @semyung
  // useCallback의 디펜던시는 setDebouncedId 이외에 아무것도 없습니다.
  // 다만, Hook Rules에 의하면 inline function을 전달하라고 합니다.
  // 함수를 Wrapping하는 함수를 만들면 되지만 좋은 생각은 아닌 것 같아
  // 해당 구간 린트를 삭제합니다.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceChange = useCallback(
    miniDebounce(function (nextValue) {
      setDebouncedId(nextValue);
    }, 600),
    [setDebouncedId],
  );
  console.log(searchResult);

  const handleRelationship = async () => {
    try {
      const { data } = await userApis.follow(
        searchResult.monsterCode,
        searchResult.isFollowed,
      );

      if (data.statusCode === OK) {
        setSearchResult((prev) => ({
          ...prev,
          isFollowed: data.isFollowed,
        }));
        setRefreshInfo((id) => id + 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const queryUser = async () => {
      if (!debouncedId || debouncedId.length < 6) {
        return;
      }
      try {
        const { data } = await userApis.searchUser(debouncedId);
        if (
          data.statusCode === BAD_REQUEST &&
          data.responseMessage === NOT_FOUND_USER_VIA_MONSTER_CODE
        ) {
          setIsFail(true);
          return;
        }

        setSearchResult(data.userInfo);
        setIsFail(false);
        setRefreshInfo((id) => id + 1);
      } catch (error) {
        console.log(error);
      }
    };
    queryUser();
  }, [setRefreshInfo, debouncedId]);

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

  console.log(recommendedUserList);

  return (
    <Wrapper>
      <BackButtonWrapper>
        <BackButtonHeader onButtonClick={() => history.replace('/')}>
          <SearchInput
            type="text"
            value={monsterId}
            onChange={(e) => {
              setIsFail(null);
              setMonsterId(e.target.value);
              debounceChange(e.target.value);
            }}
            placeholder="몬스터 ID를 입력하세요"
          />
        </BackButtonHeader>
      </BackButtonWrapper>
      {isFail && (
        <NonePlaceHolder>
          <span>검색한 유저를 찾지 못했어요</span>
        </NonePlaceHolder>
      )}
      {searchResult && (
        <ul>
          <MonsterListItem
            monsterName={searchResult.nickName}
            monsterCode={searchResult.monsterCode}
            isFollowed={searchResult.isFollowed}
            path={`${path}/${searchResult.monsterCode}`}
          />
        </ul>
      )}
      {recommendedUserList.length && isFail === null && (
        <RecommendationSection>
          {/* monsterId로 몬스터 반환시켜야 함. */}
          {/* {recommendedUserList.map(({ isFollowed, monsterCode, monsterImg, nickName, title }) => {}} */}
          {recommendedUserList.map(
            ({ isFollowed, monsterCode, monsterImg, nickName, title }) => {
              return (
                <MonsterListItem
                  key={title + nickName + monsterImg}
                  monsterName={nickName}
                  monsterImg={monsterImg}
                  monsterCode={monsterCode}
                  recommendationTitle={title}
                  isFollowd={isFollowed}
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
`;
const BackButtonWrapper = styled.div`
  margin: 24px 0;
  padding: 0 24px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 32px;
  padding: 14px 12px;
  background: var(--bg-primary);
  border: none;
  border-radius: 4px;
  color: #999999;

  &::placeholder {
    font-size: 13px;
    line-height: 16px;
    font-weight: var(--weight-regular);
    color: #999999;
  }

  &:focus {
    outline: none;
  }
`;

const RecommendationSection = styled.ul`
  & > h2 {
    font-weight: var(--weight-bold);
    line-height: 19.2px;
    margin-bottom: 10px;
  }
`;

export default Search;
