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
  const { state: broughtHabitState } = useLocation();

  const [title, setTitle] = useState(broughtHabitState?.title ?? '');
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
      categoryId: broughtHabitState.id,
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

  if (!broughtHabitState) {
    return <Redirect to="/new" />;
  }

  return (
    <Wrapper>
      <Header>
        <BackButtonHeader
          onButtonClick={() => history.goBack()}
          pageTitleText="직접 작성하기"
        />
      </Header>
      <Inner>
        <MarginInterval mb="24">
          <NewHabitDetailTitle
            isEditMode={false}
            title={title}
            update={setTitle}
            disabled={Boolean(broughtHabitState.title)}
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

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  background: var(--bg-wrapper);
  overflow-y: scroll;
  padding-bottom: 120px;
  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Inner = styled.div`
  padding: 0 24px;
`;

const Header = styled.section`
  margin-bottom: 40px;
`;

const MarginInterval = styled.div`
  margin-bottom: ${({ mb }) => (mb ? mb : '0')}px;
`;

export default NewHabitForm;
