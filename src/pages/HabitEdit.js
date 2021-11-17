import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import {
  NewHabitDetailTitle,
  NewHabitDetailDescription,
  NewHabitDetailDueDatePicker,
  NewHabitDayPicker,
  NewHabitFrequencySection,
} from '../components/newHabit';
import {
  BackButtonHeader,
  BottomFixedButton,
  Modal,
} from '../components/common';
import { BottomDialog } from '../components/dialog';

import { OK } from '../constants/statusCode';
import { habitApis } from '../api';
import { habitsState } from '../recoil/states/habit';

const HabitEdit = () => {
  const history = useHistory();
  const { state: habitDetail } = useLocation();
  const [habitList, setHabitList] = useRecoilState(habitsState);

  const [backModalOpen, setBackModalOpen] = useState(false);
  const [title, setTitle] = useState(habitDetail.habitDetail.title);
  const [description, setDescription] = useState(
    habitDetail.habitDetail.description,
  );
  const [frequency, setFrequency] = useState(habitDetail.habitDetail.count);

  const handleEditButtonClick = async () => {
    const body = {
      title,
      description,
      count: frequency,
    };

    try {
      const { data } = await habitApis.editHabitDetail(
        habitDetail.habitDetail.habitId,
        body,
      );

      if (data.statusCode === OK) {
        const originHabitList = habitList.slice();
        const editedHabitIndex = habitList.findIndex((habit) => {
          return habit.habitId === habitDetail.habitDetail.habitId;
        });
        const editedHabit = {
          ...originHabitList[editedHabitIndex],
          ...body,
        };
        originHabitList[editedHabitIndex] = { ...editedHabit };
        setHabitList(originHabitList);
        history.replace('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Wrapper>
      <Header>
        <BackButtonHeader
          onButtonClick={() => {
            setBackModalOpen(true);
          }}
          pageTitleText="작성한 습관"
        />
      </Header>
      <Inner>
        <MarginInterval mb="24">
          <NewHabitDetailTitle
            isEditMode={true}
            title={title}
            update={setTitle}
            originTitle={title}
          />
        </MarginInterval>
        <MarginInterval mb="24">
          <NewHabitDetailDescription
            isEditMode={true}
            description={description}
            update={setDescription}
            originDescription={description}
          />
        </MarginInterval>
        <MarginInterval mb="24">
          <NewHabitDetailDueDatePicker
            isEditMode={true}
            duration={{
              start: habitDetail.habitDetail.durationStart,
              end: habitDetail.habitDetail.durationEnd,
            }}
            onDurationChecked={null}
          />
        </MarginInterval>
        <MarginInterval mb="24">
          <NewHabitDayPicker
            isEditMode={true}
            days={habitDetail.habitDetail.practiceDays}
            onDayPicked={null}
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
        condition={null}
        text="저장하기"
        onClick={handleEditButtonClick}
      />
      {backModalOpen && (
        <Modal open={backModalOpen} onClose={() => setBackModalOpen(false)}>
          <BottomDialog
            title="작성 중인 화면에서 나갈까요?"
            description="현재 작성한 내용은 저장되지 않아요. 저희가 더 노력해서 저장하기 만들어볼게요!"
            activeButtonText="나갈래요"
            onClose={() => setBackModalOpen(false)}
            onActive={() => history.goBack()}
          />
        </Modal>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  font-family: var(--font-name-apple);
  background: var(--bg-wrapper);
  padding-top: 24px;
  padding-bottom: 80px;
  overflow-y: scroll;
`;

const Inner = styled.div`
  padding: 0 24px;
`;

const Header = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 44px;
  margin-bottom: 40px;
  box-sizing: border-box;
  padding-left: 16px;
  padding-right: 12.43px;
`;

const MarginInterval = styled.div`
  margin-bottom: ${({ mb }) => (mb ? mb : '0')}px;
`;

export default HabitEdit;
