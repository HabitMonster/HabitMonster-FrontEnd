import React, { useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { userApis } from '../api/user';
import { OK, NOT_FOUND } from '../constants/statusCode';
import { NOT_FOUND_MONSTER_CODE } from '../constants/statusMessage';
import { refreshInfoState } from '../recoil/states/follow';

const Search = () => {
  const history = useHistory();
  const { path } = useRouteMatch();
  const [monsterId, setMonsterId] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [failMessage, setFailMessage] = useState(null);

  const setRefreshInfo = useSetRecoilState(refreshInfoState);

  const handleButtonClick = async () => {
    if (!monsterId) {
      window.alert('몬스터코드를 입력해주세요!');
      return;
    }

    try {
      setFailMessage('');
      const { data } = await userApis.searchUser(monsterId);
      if (data.statusCode === OK) {
        setSearchResult(data.userInfo);
        setRefreshInfo((id) => id + 1);
      }
    } catch (error) {
      if (
        error.response.data.statusCode === NOT_FOUND &&
        error.response.data.responseMessage === NOT_FOUND_MONSTER_CODE
      ) {
        setFailMessage('등록되지 않은 사용자의 정보입니다.');
      }
    }
  };

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

  return (
    <Wrapper>
      <Title>search Page</Title>
      <div>
        <input
          type="text"
          value={monsterId}
          onChange={(e) => setMonsterId(e.target.value)}
        />
        <button onClick={handleButtonClick}>검색하기</button>
        {failMessage && <FailMessage>{failMessage}</FailMessage>}
      </div>
      <div>
        <Title>검색결과</Title>
        {searchResult && (
          <Result>
            <div>유저 이메일: {searchResult.email}</div>
            <div>유저 몬스터이름: {searchResult.monsterName}</div>
            <img
              src={searchResult.monsterImg}
              alt="user monster"
              style={{ width: '128px', height: '128px' }}
            />
            <div>
              팔로우를 했나요?{' '}
              <span style={{ color: 'yellow' }}>
                {searchResult.isFollowed ? '네' : '아니요'}
              </span>
            </div>
            <div>
              <button
                onClick={handleRelationship}
                style={{ marginTop: '16px' }}
              >
                {searchResult.isFollowed ? '언팔로우' : '팔로우'}
              </button>
            </div>
            <div>
              <button
                onClick={() =>
                  history.push(`${path}/${searchResult.monsterCode}`)
                }
              >
                상세페이지 이동
              </button>
            </div>
          </Result>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  padding: 0 24px;

  & h1 {
  }
`;

const Title = styled.div`
  margin-top: 43px; //현재 640기준아님. 640 + 37 = 677기준.
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 32px;
  color: var(--color-primary);
  font-weight: var(--weight-regular);
  font-size: var(--font-xl);
  line-height: 32px;
`;

const Result = styled.div`
  width: 100%;
  padding: 24px;
  background: var(--bg-primary);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  color: var(--color-primary);
`;

const FailMessage = styled.span`
  display: block;
  color: var(--color-danger);
  font-weight: var(--weight-bold);
`;

export default Search;
