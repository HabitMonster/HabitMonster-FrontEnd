import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { useRecoilState, useRecoilValue } from 'recoil';

import { userApis } from '../api/user';
import { OK } from '../constants/statusCode';
import styled from 'styled-components';

import {
  followerListSelector,
  followingListSelector,
  isFollowState,
  userInfoSelector,
} from '../recoil/states/follow';

const SearchDetail = () => {
  const { state: searchResultState } = useLocation();
  const [searchResult, setSearchResult] = useState(searchResultState);
  const [checkFollow, setCheckFollow] = useState('');

  const [isFollow, setIsFollow] = useRecoilState(isFollowState);

  const handleRelationship = async () => {
    try {
      console.log('before :', isFollow);
      const { data } = await userApis.follow(
        searchResult.monsterCode,
        isFollow,
      );

      if (data.statusCode === OK) {
        console.log('after :', data.isFollowed);
        setIsFollow(data.isFollowed);
        setSearchResult((prev) => ({ ...prev, isFollowed: data.isFollowed }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkFollowTest = async () => {
    try {
      const { data } = await userApis.checkFollow(searchResult.monsterCode);

      if (data.statusCode === OK) {
        if (data.responseMessage === 'isFollowedTrue') {
          setCheckFollow('팔로우 중');
        }

        if (data.responseMessage === 'isFollowedFalse') {
          setCheckFollow('언팔로우 중');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container>
        <Text className="title">검색 유저 상세 정보</Text>
        <Card style={{ marginBottom: '50px' }}>
          <Text>몬스터 이름: {searchResult.monsterName}</Text>
          <Text>이메일 주소 : {searchResult.email}</Text>
          <img
            src={searchResult.monsterImg}
            style={{ width: '50px', height: '50px' }}
          />
          <Text>몬스터 코드 : {searchResult.monsterCode}</Text>
          <Text>
            팔로우 여부 : {isFollow ? '팔로우' : '언팔로우'}
            <button onClick={handleRelationship}>
              {isFollow ? '언팔로우' : '팔로우'}
            </button>
          </Text>
          <Text>팔로워 수 : </Text>
          <Text>팔로잉 수 : </Text>
          <Text>Follow Check API 테스트 : </Text>
        </Card>

        <Box>
          <Text className="title">Follow Check API 테스트</Text>
          <Text style={{ textAlign: 'center' }}>{checkFollow}</Text>
          <button style={{ width: '100%' }} onClick={checkFollowTest}>
            테스트
          </button>
        </Box>
        <Box>
          <Text className="title">팔로워 리스트</Text>
        </Box>

        <Box>
          <Text className="title">팔로잉 리스트</Text>
        </Box>

        <Box>
          <Text className="title">습관 리스트</Text>
        </Box>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  color: var(--color-white);
`;

const Box = styled.div`
  width: 100%;
  margin-bottom: 50px;
`;

const Text = styled.p`
  font-size: var(--font-xs);
  &.title {
    text-align: center;
    border: 1px solid var(--color-white);
    font-size: var(--font-l);
  }
`;

const Card = styled.div`
  border: 1px solid var(--color-white);
  background-color: var(--bg-primary);
`;

export default SearchDetail;
