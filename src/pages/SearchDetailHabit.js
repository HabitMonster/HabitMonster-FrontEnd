import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import {
  SubTitleOuter,
  BottomFixedButton,
  BackButtonHeader,
} from '../components/common';

import { setFormattedDuration } from '../utils/setFormatDuration';
import { renderDays } from '../utils/date';

import {
  searchUserHabitSelector,
  refreshSearchUserState,
} from '../recoil/states/search';
import { currentUserMonsterCodeSelector } from '../recoil/states/user';

const MOCKUP_CATEGORY_ID = {
  Health: 1,
  Study: 2,
  Life: 3,
  Emotion: 4,
  Relation: 5,
  Hobby: 6,
  Etc: 7,
};

const SearchDetailHabit = () => {
  const { monsterCode, habitId } = useParams();
  const history = useHistory();

  const currentUserMonsterCode = useRecoilValue(currentUserMonsterCodeSelector);
  const habitDetail = useRecoilValue(
    searchUserHabitSelector({ habitId, monsterCode }),
  );
  const refreshSearchUserInfo = useSetRecoilState(refreshSearchUserState);

  const categoryId = MOCKUP_CATEGORY_ID[habitDetail.category];

  const durationStart = setFormattedDuration(
    habitDetail.durationStart,
    'YMD',
    '.',
  );
  const durationEnd = setFormattedDuration(habitDetail.durationEnd, 'YMD', '.');

  return (
    <Container>
      <MenuBar>
        <BackButtonHeader
          onButtonClick={() => {
            refreshSearchUserInfo((id) => id + 1);
            history.push(`/search/${monsterCode}`);
          }}
          pageTitleText={habitDetail.title}
        />
      </MenuBar>
      <Inner>
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
        condition={currentUserMonsterCode !== monsterCode ? null : () => {}}
        text="가져오기"
        onClick={() =>
          history.push({
            pathname: `/new/${categoryId}/detail`,
            state: {
              categoryId,
              title: habitDetail.title,
            },
          })
        }
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
  margin-bottom: 60px;
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

export default SearchDetailHabit;
