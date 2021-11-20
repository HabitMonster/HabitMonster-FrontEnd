import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useHistory, Redirect } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { habitIdListState, defaultHabitsState } from '../recoil/states/habit';

import {
  NewHabitDetailTitle,
  NewHabitDetailDescription,
  NewHabitDetailDueDatePicker,
  NewHabitDayPicker,
  NewHabitFrequencySection,
} from '../components/newHabit';
import { BackButtonHeader, BottomFixedButton } from '../components/common';

import { OK } from '../constants/statusCode';
import { addHabitApis } from '../api';

const NewHabitForm = () => {
  const history = useHistory();
  const { state: categoryState } = useLocation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState({
    start: null,
    end: null,
  });

  const [practiceDays, setPracticeDays] = useState('');
  const [frequency, setFrequency] = useState(0);
  const [habits, setHabits] = useRecoilState(defaultHabitsState);
  const [habitIdList, setHabitIdList] = useRecoilState(habitIdListState);

  const condition =
    title &&
    title.length <= 10 &&
    description &&
    duration.start &&
    duration.end &&
    practiceDays &&
    frequency;

  const handleSaveButtonClick = async () => {
    const body = {
      title,
      description,
      durationStart: duration.start,
      durationEnd: duration.end,
      count: frequency,
      categoryId: categoryState.id,
      practiceDays: practiceDays,
    };

    const currentDay = new Date().getDay() === 0 ? 7 : new Date().getDay();

    try {
      const { data } = await addHabitApis.saveHabitWithHands(body);

      if (
        data.statusCode === OK &&
        data.habit.practiceDays.includes(String(currentDay))
      ) {
        setHabitIdList([data.habit.habitId, ...habitIdList]);
        setHabits([data.habit, ...habits]);
      }
      history.replace('/');
    } catch (error) {
      console.error(error);
    }
  };

  if (!categoryState) {
    return <Redirect to="/new" />;
  }

  return (
    <Wrapper>
      <Inner>
        <Header>
          <BackButtonHeader
            onButtonClick={() => history.goBack()}
            pageTitleText="직접 작성하기"
          />
        </Header>
        <MarginInterval mb="24">
          <NewHabitDetailTitle
            isEditMode={false}
            title={title}
            update={setTitle}
          />
        </MarginInterval>
        <MarginInterval mb="24">
          <NewHabitDetailDescription
            isEditMode={false}
            description={description}
            update={setDescription}
          />
        </MarginInterval>
        <MarginInterval mb="24">
          <NewHabitDetailDueDatePicker
            isEditMode={false}
            duration={duration}
            onDurationChecked={setDuration}
          />
        </MarginInterval>
        <MarginInterval mb="24">
          <NewHabitDayPicker
            isEditMode={false}
            days={practiceDays}
            onDayPicked={setPracticeDays}
          />
        </MarginInterval>
        <MarginInterval>
          <NewHabitFrequencySection
            frequency={frequency}
            onChange={setFrequency}
          />
        </MarginInterval>
      </Inner>
      <BottomFixedButton
        condition={() => condition}
        text="저장하기"
        onClick={handleSaveButtonClick}
      />
    </Wrapper>
  );
};

// Wrapper에 패딩 바텀 줌.
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background: var(--bg-wrapper);
  overflow-y: scroll;
  padding-bottom: 108px;
`;

const Inner = styled.div`
  padding: 0 24px;
`;

const Header = styled.section`
  margin-top: 24px;
  margin-bottom: 40px;
`;

const MarginInterval = styled.div`
  margin-bottom: ${({ mb }) => (mb ? mb : '0')}px;
`;

export default NewHabitForm;
