import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useHistory, Redirect } from 'react-router-dom';

import {
  NewHabitDetailTitle,
  NewHabitDetailDescription,
  NewHabitFrequencySection,
} from '../components/newHabit';
import { BackButtonHeader, BottomFixedButton } from '../components/common';

import { OK } from '../constants/statusCode';
import { habitApis } from '../api';
import { Trash } from '../assets/icons/common';

import { Modal } from '../components/common';
import { BottomDialog } from '../components/dialog';

const HabitEdit = () => {
  const history = useHistory();
  const { state: habitDetail } = useLocation();

  console.log(habitDetail);

  const [backModalOpen, setBackModalOpen] = useState(false);
  const [title, setTitle] = useState(habitDetail.habitDetail.title);
  const [description, setDescription] = useState(
    habitDetail.habitDetail.description,
  );
  const [frequency, setFrequency] = useState(habitDetail.habitDetail.count);

  // if (localStorage.getItem('isFirstLogin') === 'true') {
  //   return <Redirect to="/monster" />;
  // }

  const handleSaveButtonClick = async () => {
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
        // setHabits([...habits, data.habitDetail]);
        history.replace('/');
        console.log(data);
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
            title={title}
            update={setTitle}
            isEdit={true}
            originTitle={title}
          />
        </MarginInterval>
        <MarginInterval mb="24">
          <NewHabitDetailDescription
            description={description}
            update={setDescription}
            isEdit={true}
            originDescription={description}
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
        onClick={handleSaveButtonClick}
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
  background: #070707;
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
