import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useLocation, useHistory, Redirect, useParams } from 'react-router-dom';
import { useRecoilCallback, useRecoilState } from 'recoil';
import {
  habitStateWithId,
  habitIdListState,
  defaultHabitsState,
  myHabitCountState,
} from '../recoil/states/habit';

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
import { Trash } from '../assets/icons/common';

import { OK } from '../constants/statusCode';
import { habitApis } from '../api';
import { disappearScrollbar } from '../styles/Mixin';

import { setVh } from '../components/DeviceDetector';

const HabitEdit = () => {
  const history = useHistory();
  const { habitId } = useParams();
  const { state: habitDetail } = useLocation();

  const [backModalOpen, setBackModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [title, setTitle] = useState(habitDetail.habitDetail.title);
  const [description, setDescription] = useState(
    habitDetail.habitDetail.description,
  );
  const [frequency, setFrequency] = useState(habitDetail.habitDetail.count);

  const [habitIdList, setHabitIdList] = useRecoilState(habitIdListState);
  const [habitsState, setHabitsState] = useRecoilState(defaultHabitsState);
  const [totalHabitCount, setTotalHabitCount] =
    useRecoilState(myHabitCountState);

  const webViewWrapper = useRef(null);

  const deleteHabit = async (id) => {
    try {
      const { data } = await habitApis.deleteHabit(id);
      if (data.statusCode === OK) {
        history.replace('/');
        setHabitsState(habitsState.filter(({ habitId }) => habitId !== id));
        setHabitIdList(habitIdList.filter((habitId) => habitId !== id));
        setTotalHabitCount(totalHabitCount - 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditButtonClick = useRecoilCallback(({ set }) => async () => {
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
        set(habitStateWithId(data.habit.habitId), data.habit);
        history.replace('/');
      }
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    window.removeEventListener('resize', setVh);

    return () => {
      window.addEventListener('resize', setVh);
    };
  }, []);

  if (!Object.keys(habitDetail).length) {
    return <Redirect to="/" />;
  }

  return (
    <Wrapper ref={webViewWrapper}>
      <BackButtonHeader
        onButtonClick={() => {
          setBackModalOpen(true);
        }}
      >
        <MenuBar>
          <span>작성한 습관</span>{' '}
          <Trash
            onClick={() => setDeleteModalOpen(true)}
            className="deleteBtn"
          />
        </MenuBar>
      </BackButtonHeader>
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
        <Modal
          webViewWrapper={webViewWrapper}
          open={backModalOpen}
          onClose={() => setBackModalOpen(false)}
        >
          <BottomDialog
            title="작성 중인 화면에서 나갈까요?"
            description="현재 작성한 내용은 저장되지 않아요. 저희가 더 노력해서 저장하기 만들어볼게요!"
            activeButtonText="나갈래요"
            onClose={() => setBackModalOpen(false)}
            onActive={() => history.goBack()}
          />
        </Modal>
      )}
      {deleteModalOpen && (
        <Modal
          webViewWrapper={webViewWrapper}
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
        >
          <BottomDialog
            title="습관을 정말 삭제할까요?"
            description="한 번 삭제 후에는 복구되지 않아요! 모든건 삼세번인데, 한 번 다시 생각해보는게 어떨까요!"
            activeButtonText="삭제할래요"
            onClose={() => setDeleteModalOpen(false)}
            onActive={() => deleteHabit(Number(habitId))}
          />
        </Modal>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  font-family: var(--font-name-apple);
  background: var(--bg-wrapper);
  position: relative;
  overflow-y: scroll;
  ${disappearScrollbar()};
`;

const Inner = styled.div`
  padding: 0 24px;
  padding-bottom: 100px;
`;

const MenuBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > span {
    font-weight: var(--weight-regular);
    font-size: var(--font-l);
    line-height: 21.6px;
    color: var(--color-primary);
  }
`;

const MarginInterval = styled.div`
  margin-bottom: ${({ mb }) => (mb ? mb : '0')}px;
`;

export default HabitEdit;
