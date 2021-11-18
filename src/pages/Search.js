import React, { useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { userApis } from '../api/user';
import { OK } from '../constants/statusCode';
import { NOT_FOUND_MONSTER_CODE } from '../constants/statusMessage';

import { isFollowState, monsterCodeState } from '../recoil/states/follow';

const Search = () => {
  const history = useHistory();
  const { path } = useRouteMatch();
  const [monsterId, setMonsterId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [failMessage, setFailMessage] = useState('');

  const [isFollow, setIsFollow] = useRecoilState(isFollowState);

  const handleButtonClick = async () => {
    try {
      setFailMessage('');
      const { data } = await userApis.searchUser(monsterId);
      console.log(data);
      if (data.statusCode === OK) {
        setSearchResult(data.searchResult);
        setIsFollow(data.searchResult.isFollowed);
        setMonsterCodeState(monsterId);
        setMonsterId('');
      }
    } catch (error) {
      if (error.message === NOT_FOUND_MONSTER_CODE) {
        setFailMessage('등록되지 않은 사용자의 정보입니다.');
        setMonsterId('');
      }
    }
  };

  const handleRelationship = async () => {
    try {
      const { data } = await userApis.follow(
        searchResult.monsterCode,
        isFollow,
      );
      console.log(data);

      if (data.statusCode === OK) {
        setIsFollow(data.isFollowed);
        setSearchResult((prev) => ({ ...prev, isFollowed: data.isFollowed }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // console.log(
  //   '검색결과, 이 페이지에서 팔로우 버튼을 누르면 리코일 로직으로 가야합니다.',
  //   searchResult,
  // );

  // console.log(
  //   `검색 결과의 팔로우 상태 isFollowed가 ${searchResult?.isFollowed} 일 때 ${
  //     searchResult?.isFollowed === undefined
  //       ? '검색을 해야합니다'
  //       : searchResult.isFollowed
  //       ? '언팔로우 버튼이 보입니다.'
  //       : '팔로우 버튼이 보입니다.'
  //   }`,
  // );
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
              alt="user monster image"
              style={{ width: '128px', height: '128px' }}
            />
            <div>
              팔로우를 했나요?{' '}
              <span style={{ color: 'yellow' }}>
                {isFollow ? '네' : '아니요'}
              </span>
            </div>
            <div>
              <button
                onClick={handleRelationship}
                style={{ marginTop: '16px' }}
              >
                {isFollow ? '언팔로우' : '팔로우'}
              </button>
            </div>
            <div>
              <button
                onClick={() =>
                  history.push({
                    pathname: `${path}/${searchResult.monsterCode}`,
                    state: searchResult,
                  })
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
