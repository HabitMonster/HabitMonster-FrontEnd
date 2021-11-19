import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import {
  SubTitleOuter,
  BottomFixedButton,
  BackButtonHeader,
} from '../components/common';
import leveloneMonsters from '../assets/images/monsters/svg';

import { userLevelOneMonsterSelector } from '../recoil/states/monster';
import { setFormattedDuration } from '../utils/setFormatDuration';
import { renderDays } from '../utils/date';
import { searchUserHabitSelector } from '../recoil/states/follow';

const SearchDetailHabit = () => {
  const { habitId } = useParams();
  const history = useHistory();

  const habitDetail = useRecoilValue(searchUserHabitSelector(habitId));
  const levelOneMonsterId = useRecoilValue(userLevelOneMonsterSelector);

  const durationStart = setFormattedDuration(
    habitDetail.durationStart,
    'YMD',
    '.',
  );
  const durationEnd = setFormattedDuration(habitDetail.durationEnd, 'YMD', '.');

  const progressbarRotationDegree = habitDetail.achievePercentage * 1.8 + 45;
  const MonsterIcon = leveloneMonsters[levelOneMonsterId].component;

  return (
    <Container>
      <Inner>
        <MenuBar>
          <BackButtonHeader
            onButtonClick={() => history.goBack()}
            pageTitleText={habitDetail.title}
          />
        </MenuBar>
        <Wrapper>
          <ProgressBarWrapper>
            <ProgressBar achievePercentage={habitDetail.achievePercentage}>
              <div className="left" />
              <div className="right" />
              <div className="text">
                <span>{habitDetail.achievePercentage}%</span>
                <span>
                  {habitDetail.totalCount}번 중 {habitDetail.achieveCount}번
                  완료!
                </span>
              </div>
              <ProgressBarOverflowSection>
                <CircleProgressbar degree={progressbarRotationDegree} />
              </ProgressBarOverflowSection>
              <IconProgressbar degree={progressbarRotationDegree}>
                <MonsterIcon />
              </IconProgressbar>
            </ProgressBar>
          </ProgressBarWrapper>
        </Wrapper>

        <Wrapper>
          <SubTitleOuter subTitle="내용" className="subTitle">
            <p className="content">{habitDetail.description}</p>
          </SubTitleOuter>
        </Wrapper>
        <Wrapper>
          <SubTitleOuter subTitle="기간" className="subTitle">
            <p className="content">
              {durationStart} ~ {durationEnd}
            </p>
          </SubTitleOuter>
        </Wrapper>
        <Wrapper>
          <SubTitleOuter subTitle="요일" className="subTitle">
            {habitDetail.practiceDays.length === 7 ? (
              <p className="content">매일</p>
            ) : (
              <p className="content">
                매주 {renderDays(habitDetail.practiceDays)}
              </p>
            )}
          </SubTitleOuter>
        </Wrapper>
        <Wrapper>
          <SubTitleOuter subTitle="빈도" clasName="subTitle">
            <p className="content">하루에 {habitDetail.count}번</p>
          </SubTitleOuter>
        </Wrapper>
      </Inner>
      <BottomFixedButton
        condition={null}
        text="가져오기"
        onClick={() => console.log('가져오기')}
      />
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: var(--bg-wrapper);
  font-family: var(--font-name-apple);
  color: var(--color-primary);

  & .deleteBtn {
    cursor: pointer;
  }
`;

const Inner = styled.div`
  padding: 0 24px;
`;

const MenuBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 44px;
  margin-top: 24px;
  margin-bottom: 16px;
`;
const Wrapper = styled.div`
  margin-bottom: 22px;

  & .subTitle {
    font-weight: var(--weight-semi-bold);
    font-size: var(--font-xs);
    line-height: 16.8px;
    color: var(--bg-selected-light);
    margin-bottom: 6px;
  }

  & .content {
    font-weight: var(--weight-semi-regular);
  }
`;

const ProgressBarWrapper = styled.section`
  width: 100%;
  height: 154px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: var(--bg-primary);
  position: relative;
  padding: 24px;
`;

const ProgressBar = styled.div`
  position: relative;

  & > .left,
  & > .right {
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    bottom: -7px;
    overflow: hidden;
  }
  & > .left {
    left: 0;
    background: ${({ achievePercentage }) =>
      achievePercentage ? 'var(--bg-selected-light)' : '#5a5a5a'};
  }

  & > .right {
    right: 0;
    background: ${({ achievePercentage }) =>
      achievePercentage === 100 ? 'var(--bg-selected-light)' : '#5a5a5a'};
  }

  & > .text {
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);

    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: var(--font-xs);
    line-height: 17px;
    color: var(--color-primary-deemed);
    text-align: center;

    & > span:first-child {
      font-size: 36px;
      line-height: 43.2px;
      font-weight: var(--weight-bold);
      color: var(--color-white);
      margin-bottom: 6px;
    }
  }
`;

const ProgressBarOverflowSection = styled.div`
  width: 206px;
  height: 103px;
  position: relative;
  overflow: hidden;
`;

const CircleProgressbar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 206px;
  height: 206px;
  border: 15px solid #5a5a5a;
  margin-top: 3px;
  border-radius: 50%;
  border-bottom-color: var(--bg-selected-light);
  border-right-color: var(--bg-selected-light);
  transform: ${({ degree }) => `rotate(${degree}deg)`};
`;

const IconProgressbar = styled(CircleProgressbar)`
  border: 15px solid transparent;

  & > svg {
    position: absolute;
    bottom: 8px;
    left: 10px;
    width: 24px;
    height: 24px;
    transform: rotate(270deg);
    z-index: 10;
  }
`;

export default SearchDetailHabit;
