import React, { useState } from 'react';
import { useLocation, useHistory, Redirect, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import { useRecoilCallback, useRecoilState } from 'recoil';
import {
  habitStateWithId,
  habitIdListState,
  habitListState,
  myHabitCountState,
} from '../recoil/states/habit';

import { habitApis } from '../api';

import { Trash } from '../assets/icons/common';

import {
  BackButtonHeader,
  BottomFixedButton,
  Modal,
} from '../components/common';
import { BottomDialog } from '../components/dialog';
import {
  NewHabitDetailTitle,
  NewHabitDetailDescription,
  NewHabitDetailDueDatePicker,
  NewHabitDayPicker,
  NewHabitFrequencySection,
} from '../components/newHabit';

import { OK } from '../constants/statusCode';

import { disappearScrollbar, setFlexStyles, setFontStyles } from '../styles';

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
  const [habitList, setHabitList] = useRecoilState(habitListState);
  const [totalHabitCount, setTotalHabitCount] =
    useRecoilState(myHabitCountState);

  const deleteHabit = async (id) => {
    try {
      const { data } = await habitApis.deleteHabit(id);
      if (data.statusCode === OK) {
        history.replace('/');
        setHabitList(habitList.filter(({ habitId }) => habitId !== id));
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

  if (!Object.keys(habitDetail).length) {
    return <Redirect to="/" />;
  }

  return (
    <Wrapper>
      <BackButtonHeader
        onButtonClick={() => {
          setBackModalOpen(true);
        }}
      >
        <MenuBar>
          <span>????????? ??????</span>{' '}
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
        text="????????????"
        onClick={handleEditButtonClick}
      />
      {backModalOpen && (
        <Modal open={backModalOpen} onClose={() => setBackModalOpen(false)}>
          <BottomDialog
            title="?????? ?????? ???????????? ?????????????"
            description="?????? ????????? ????????? ???????????? ?????????. ????????? ??? ???????????? ???????????? ??????????????????!"
            activeButtonText="????????????"
            onClose={() => setBackModalOpen(false)}
            onActive={() => history.goBack()}
          />
        </Modal>
      )}
      {deleteModalOpen && (
        <Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
          <BottomDialog
            title="????????? ?????? ????????????????"
            description="??? ??? ?????? ????????? ???????????? ?????????! ????????? ???????????????, ??? ??? ?????? ?????????????????? ????????????!"
            activeButtonText="???????????????"
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
  position: ${isMobile ? 'fixed' : 'relative'};
  ${isMobile && `top: 0; left: 0; right: 0; bottom: 0;`};
  overflow-y: scroll;
  ${disappearScrollbar()};
`;

const Inner = styled.div`
  padding: 0 24px;
  padding-bottom: 100px;
`;

const MenuBar = styled.div`
  width: 100%;
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  })}

  & > span {
    ${setFontStyles({
      color: 'primary',
      fontSize: 'l',
      fontWeight: 'regular',
      lineHeight: '21.6px',
    })}
  }
`;

const MarginInterval = styled.div`
  margin-bottom: ${({ mb }) => (mb ? mb : '0')}px;
`;

export default HabitEdit;
