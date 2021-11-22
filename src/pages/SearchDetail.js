import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { userApis } from '../api/user';
import { OK } from '../constants/statusCode';
import { searchUserInfoState, refreshInfoState } from '../recoil/states/follow';

import { Toast } from '../components/common';
import { userState } from '../recoil/states/user';

const SearchDetail = () => {
  const { monsterCode } = useParams();
  const history = useHistory();
  const [checkFollow, setCheckFollow] = useState(null);
  const [activeUnableFollowToast, setActiveUnableFollowToast] = useState(false);
  const [activeUnableFollowCheckToast, setActiveUnableFollowCheckToast] =
    useState(false);

  const userInfoState = useRecoilValue(userState);
  const searchResult = useRecoilValue(searchUserInfoState(monsterCode));
  const setRefreshInfo = useSetRecoilState(refreshInfoState);

  const { habits, monster, userInfo } = searchResult;
  const [isFollwed, setIsFollowed] = useState(userInfo.followed);
  const [followers, setFollowers] = useState(userInfo.followersCount);

  const handleRelationship = async () => {
    if (monsterCode === userInfoState.monsterCode) {
      setActiveUnableFollowToast(true);
      return;
    }

    try {
      const { data } = await userApis.follow(monsterCode, isFollwed);

      if (data.statusCode === OK) {
        setIsFollowed(data.isFollowed);
        data.isFollowed
          ? setFollowers(followers + 1)
          : setFollowers(followers - 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkFollowTest = async () => {
    if (monsterCode === userInfoState.monsterCode) {
      setActiveUnableFollowCheckToast(true);
      return;
    }

    try {
      const { data } = await userApis.checkFollow(userInfo.monsterCode);
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
        <Box>
          <Card>
            <Text>몬스터 이름: {monster.monsterName}</Text>
            <Text>이메일 주소 : {userInfo.email}</Text>
            <img
              src={monster.monsterImage}
              alt="user monster"
              style={{ width: '50px', height: '50px' }}
            />
            <Text>몬스터 코드 : {userInfo.monsterCode}</Text>
            <Text>
              팔로우 여부 : {isFollwed ? '팔로우' : '언팔로우'}
              <button onClick={handleRelationship}>
                {isFollwed ? '언팔로우' : '팔로우'}
              </button>
            </Text>
            <Text>팔로워 수 : {followers ? followers : 0}</Text>
            <Text>
              팔로잉 수 :{' '}
              {userInfo.followingsCount ? userInfo.followingsCount : 0}
            </Text>
            <Text>Follow Check API 테스트 : {checkFollow}</Text>
            <button style={{ width: '100%' }} onClick={checkFollowTest}>
              팔로우 체크 테스트
            </button>
          </Card>
        </Box>

        <Box>
          <Text className="title">팔로워 리스트</Text>
        </Box>

        <Box>
          <Text className="title">팔로잉 리스트</Text>
        </Box>

        <Box>
          <Text className="title">습관 리스트</Text>
          {habits.map((habit, idx) => {
            return (
              <Card key={idx}>
                <Text>
                  제목 : {habit.title}{' '}
                  <button
                    onClick={() => {
                      setRefreshInfo((id) => id + 1);
                      history.push(`${monsterCode}/${habit.habitId}`);
                    }}
                  >
                    상세페이지
                  </button>
                </Text>
                <Text>
                  기간 : {habit.durationStart} - {habit.durationEnd}
                </Text>
                <Text>퍼센티지 : {habit.achievePercentage}</Text>
                <Text>카테고리 : {habit.category}</Text>
              </Card>
            );
          })}
        </Box>
        {/* <Toast
          isActive={activeUnableFollowToast}
          setIsActive={setActiveUnableFollowToast}
          text="자기 자신은 팔로우할 수 없어요!"
        />
        <Toast
          isActive={activeUnableFollowCheckToast}
          setIsActive={setActiveUnableFollowCheckToast}
          text="자기 자신은 체크할 수 없어요!"
        /> */}
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
    background-color: var(--bg-selected-light);
  }
`;

const Card = styled.div`
  border: 1px solid var(--color-white);
  background-color: var(--bg-primary);
`;

export default SearchDetail;
