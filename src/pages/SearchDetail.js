import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { BackButtonHeader, NonePlaceHolder } from '../components/common';
import { CategoryMenu, UserSection } from '../components/search';
import {
  searchUserInfoState,
  refreshSearchUserState,
  refreshRecommendedUserState,
} from '../recoil/states/search';

import { userApis } from '../api';
import { OK } from '../constants/statusCode';
import { disappearScrollbar } from '../styles/Mixin';
import { HabitCardItem, HabitCard } from '../components/habit';

const SearchDetail = () => {
  const { monsterCode } = useParams();
  const history = useHistory();

  const searchResult = useRecoilValue(searchUserInfoState(monsterCode));
  const refreshSearchUserInfo = useSetRecoilState(refreshSearchUserState);
  const refreshRecommendedUser = useSetRecoilState(refreshRecommendedUserState);

  const { habits, monster, userInfo } = searchResult;
  const [isFollowed, setIsFollowed] = useState(userInfo.isFollowed);
  const [followers, setFollowers] = useState(userInfo.followersCount);
  const [categorization, setCategorization] = useState({
    id: 'all',
    name: '전체',
  });
  const [filteredHabits, setFilteredHabits] = useState([]);

  const toggleClass = (id, name) => {
    setCategorization({ id, name });
  };

  useEffect(() => {
    const categoryId = categorization.id;
    if (categoryId === 'all') {
      setFilteredHabits(habits);
      return;
    }

    const filteredHabits = habits.filter((habit) => {
      return habit.categoryId === categoryId;
    });

    setFilteredHabits(filteredHabits);
  }, [categorization, habits]);

  const handleRelationship = async () => {
    try {
      const { data } = await userApis.follow(monsterCode, isFollowed);

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

  return (
    <Container>
      <Header>
        <BackButtonHeader
          onButtonClick={() => {
            refreshSearchUserInfo((id) => id + 1);
            refreshRecommendedUser((id) => id + 1);
            history.push('/search');
          }}
          pageTitleText={userInfo.username}
        />
      </Header>
      <UpperSection>
        <UserSection
          monster={monster}
          habits={habits}
          userInfo={userInfo}
          followers={followers}
        />
        <FollowBtn isFollowed={isFollowed} onClick={handleRelationship}>
          {isFollowed ? '팔로잉' : '팔로우'}
        </FollowBtn>
      </UpperSection>
      <CategoryMenu
        categorization={categorization}
        classHandler={toggleClass}
      />
      <HabitSection>
        <HabitList>
          {filteredHabits.length ? (
            filteredHabits.map((habit) => {
              return (
                <HabitCard
                  key={habit.habitId}
                  onClick={() => {
                    refreshSearchUserInfo((id) => id + 1);
                    history.push(
                      `/search/${userInfo.monsterCode}/${habit.habitId}`,
                    );
                  }}
                >
                  <HabitCardItem
                    monsterCode={userInfo.monsterCode}
                    category={habit.category}
                    title={habit.title}
                    durationStart={habit.durationStart}
                    durationEnd={habit.durationEnd}
                    achievePercentage={habit.achievePercentage}
                  />
                </HabitCard>
              );
            })
          ) : (
            <NonePlaceHolder>
              <span>습관이 아직 등록되지 않았어요</span>
            </NonePlaceHolder>
          )}
        </HabitList>
      </HabitSection>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  background: linear-gradient(0deg, var(--bg-wrapper), var(--bg-wrapper));
  position: relative;
  font-family: var(--font-name-apple);
  overflow-y: hidden;
`;

const Header = styled.section`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 68px;
  background: #1e135c;
`;

const UpperSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  background: #1e135c;
`;

const FollowBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 312px;
  height: 38px;
  margin: 20px auto;
  color: var(--color-white);
  background-color: ${({ isFollowed }) =>
    isFollowed ? '#181819' : 'var(--bg-active)'};
  border: none;
  border-radius: var(--border-radius-semi);
  cursor: pointer;
  font-family: var(--font-name-apple);
  font-size: var(--font-s);
`;

const HabitSection = styled.section`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: var(--border-radius-semi);
  overflow-y: scroll;
  ${disappearScrollbar()};
`;

const HabitList = styled.div`
  width: 100%;
  padding: 24px;
`;

export default SearchDetail;
