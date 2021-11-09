import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useHistory, Redirect } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { habitsState } from '../recoil/states/habit';

import {
  NewHabitDetailTitle,
  NewHabitDetailDescription,
  NewHabitDetailDueDatePicker,
  NewHabitDayPicker,
  NewHabitFrequencySection,
} from '../components/newHabit';
import { BackButtonHeader } from '../components/common';

import { OK } from '../constants/statusCode';
import { addHabitApis } from '../api';

const NewHabitForm = () => {
  const history = useHistory();
  const { state: categoryState } = useLocation();
  const [habits, setHabits] = useRecoilState(habitsState);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState({
    start: null,
    end: null,
  });
  const [practiceDays, setPracticeDays] = useState('');
  const [frequency, setFrequency] = useState(0);

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

    try {
      const { data } = await addHabitApis.saveHabitWithHands(body);

      if (data.statusCode === OK) {
        setHabits([...habits, data.habitDetail]);
        history.replace('/');
      }
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
          <NewHabitDetailTitle title={title} update={setTitle} />
        </MarginInterval>
        <MarginInterval mb="24">
          <NewHabitDetailDescription
            description={description}
            update={setDescription}
          />
        </MarginInterval>
        <MarginInterval mb="24">
          <NewHabitDetailDueDatePicker onDurationChecked={setDuration} />
        </MarginInterval>
        <MarginInterval mb="24">
          <NewHabitDayPicker
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
      <SaveButton onClick={handleSaveButtonClick}>저장하기</SaveButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background: #070707;
  padding-top: 24px;
  padding-bottom: 80px;
  overflow-y: scroll;
`;

const Inner = styled.div`
  padding: 0 24px;
`;

const Header = styled.section`
  height: 44px;
  margin-bottom: 40px;
`;

const MarginInterval = styled.div`
  margin-bottom: ${({ mb }) => (mb ? mb : '0')}px;
`;

const SaveButton = styled.button`
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
  height: 64px;

  position: fixed;
  bottom: 0;
  background-color: #3b0a9d;
  z-index: 3;
  border: none;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  font-weight: var(--font-weight-bold);
  font-size: 18px;
  line-height: 22px;
  color: #f8f8f8;
`;

export default NewHabitForm;
