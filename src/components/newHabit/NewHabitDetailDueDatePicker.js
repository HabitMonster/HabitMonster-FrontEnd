import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Modal, SubTitleOuter } from '../common';
import { CalenderIcon } from '../../assets/icons/habits';

import { NewHabitCalendar } from '.';
import { convertYMD, getCurrentKST, getFutureDate } from '../../utils/date';

const NewHabitDetailDueDatePicker = ({ onDurationChecked }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const durationStart = convertYMD(getCurrentKST());

  const handleCalendarBottomButtonsClick = ({ type, value }) => {
    if (type === 'save') {
      onDurationChecked({ start: durationStart, end: value });
    }
    setModalOpen(false);
  };

  return (
    <SubTitleOuter subTitle="기간">
      <ModalToggler onClick={() => setModalOpen(true)}>
        <CalenderIcon />
        <span>직접 날짜를 입력해주세요</span>
      </ModalToggler>
      {modalOpen && (
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <NewHabitCalendar onClick={handleCalendarBottomButtonsClick} />
        </Modal>
      )}
      <DueDatePresetWrapper>
        <DueDatePreset
          onClick={() =>
            onDurationChecked({
              start: durationStart,
              end: getFutureDate(durationStart, 6),
            })
          }
          long
          mr="10px"
        >
          일주일
        </DueDatePreset>
        <DueDatePreset
          onClick={() =>
            onDurationChecked({
              start: durationStart,
              end: getFutureDate(durationStart, 29),
            })
          }
          mr="8px"
        >
          한달
        </DueDatePreset>
        <DueDatePreset
          onClick={() =>
            onDurationChecked({
              start: durationStart,
              end: getFutureDate(durationStart, 89),
            })
          }
          mr="10px"
        >
          세달
        </DueDatePreset>
        <DueDatePreset
          onClick={() =>
            onDurationChecked({
              start: durationStart,
              end: getFutureDate(durationStart, 159),
            })
          }
          long
        >
          여섯달
        </DueDatePreset>
      </DueDatePresetWrapper>
    </SubTitleOuter>
  );
};

NewHabitDetailDueDatePicker.propTypes = {
  onDurationChecked: PropTypes.func.isRequired,
};

const ModalToggler = styled.div`
  width: 100%;
  height: 40px;
  background: #1e2025;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  margin-bottom: 12px;
  border-radius: 4px;
  cursor: pointer;

  & span {
    height: 20px;
    margin-left: 8px;
    color: rgba(248, 248, 248, 0.5);
    font-size: 15px;
    line-height: 18px;
    cursor: pointer;
  }
`;

const DueDatePresetWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 32px;
`;

const DueDatePreset = styled.button`
  width: ${({ long }) => (long ? '78px' : '64px')};
  padding: 7.5px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #333333;
  border-radius: 30px;
  background: inherit;
  color: rgba(248, 248, 248, 0.5);
  font-weight: var(--font-weight-medium);
  font-size: 14px;
  line-height: 17px;
  cursor: pointer;
  margin-right: ${({ mr }) => (mr ? mr : '0px')};
`;

export default memo(NewHabitDetailDueDatePicker);
