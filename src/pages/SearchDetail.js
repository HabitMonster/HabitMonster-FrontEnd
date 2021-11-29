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
import { setFormattedDuration } from '../utils/setFormatDuration';
import CategoryImage from '../assets/images/category';
import { userApis } from '../api';
import { OK } from '../constants/statusCode';
import { disappearScrollbar } from '../styles/Mixin';

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
  }, [categorization]);

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
      <UppserSection>
        <UserSection
          monster={monster}
          habits={habits}
          userInfo={userInfo}
          followers={followers}
        />
        <FollowBtn isFollowed={isFollowed} onClick={handleRelationship}>
          {isFollowed ? '팔로잉' : '팔로우'}
        </FollowBtn>
      </UppserSection>
      <CategoryMenu
        categorization={categorization}
        classHandler={toggleClass}
      />
      <HabitSection>
        <HabitList>
          {filteredHabits.length ? (
            filteredHabits.map((habit, idx) => {
              return (
                <Card
                  key={idx}
                  onClick={() => {
                    refreshSearchUserInfo((id) => id + 1);
                    history.push(
                      `/search/${userInfo.monsterCode}/${habit.habitId}`,
                    );
                  }}
                >
                  <DetailContainer>
                    <div>
                      <CategoryIcon category={habit.category} />
                      <Info>
                        <div>
                          <HabitTitle>{habit.title}</HabitTitle>
                          <Count>
                            <b>{habit.achievePercentage}%</b>
                          </Count>
                        </div>
                        <Period>
                          {setFormattedDuration(
                            habit.durationStart,
                            'YMD',
                            '.',
                          )}{' '}
                          ~{' '}
                          {setFormattedDuration(habit.durationEnd, 'YMD', '.')}
                        </Period>
                      </Info>
                    </div>
                  </DetailContainer>
                </Card>
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

const UppserSection = styled.section`
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
  padding-bottom: 108px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  margin-bottom: 16px;
  color: var(--color-primary);
  background-color: var(--bg-primary);
  border-radius: var(--border-radius-semi);
  font-family: var(--font-name-apple);
  cursor: pointer;
`;

const DetailContainer = styled.div`
  display: flex;
  width: 100%;

  & > div {
    display: flex;
    align-items: center;
    width: 100%;
  }
`;

const CategoryIcon = styled.div`
  width: 45px;
  height: 45px;
  margin-right: 5px;
  background-image: url(${(props) => CategoryImage[props.category].src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 43px);

  & div:first-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }
`;

const HabitTitle = styled.span`
  font-size: var(--font-m);
  font-weight: var(--weight-bold);
  line-height: 19.2px;
`;

const Period = styled.p`
  font-size: var(--font-xxs);
  font-weight: var(--weight-regular);
  opacity: 0.6;
`;

const Count = styled.span`
  font-family: var(--font-name-apple);
  font-size: var(--font-xs);
  font-weight: var(--weight-regular);
  line-height: 16.8px;
  color: var(--color-primary-deemed);

  & b {
    font-weight: var(--weight-semi-bold);
    color: var(--color-primary);
  }
`;

export default SearchDetail;
