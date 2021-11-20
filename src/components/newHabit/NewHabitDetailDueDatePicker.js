import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Modal, SubTitleOuter } from '../common';
import { CalenderIcon } from '../../assets/icons/habits';

import { NewHabitCalendar } from '.';
import {
  convertYMD,
  getCurrentKST,
  getFutureDate,
  addMonths2,
} from '../../utils/date';

const NewHabitDetailDueDatePicker = ({
  duration,
  onDurationChecked,
  isEditMode,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPresetId, setSelectedPresetId] = useState(null);

  const handleCalendarBottomButtonsClick = ({ type, value }) => {
    if (type === 'save') {
      onDurationChecked({ start: convertYMD(getCurrentKST()), end: value });
    }
    setModalOpen(false);
    setSelectedPresetId(null);
  };

  // isEditMode === true  :  해당 컴포넌트를 "습관 수정" 페이지에서 사용합니다. 따라서 기간 선택이 "불가능"합니다.
  // isEditMode === false : 해당 컴포넌트를 "습관 작성" 페이지에서 사용합니다. 따라서 기간 선택이 "가능"합니다.
  return (
    <SubTitleOuter subTitle="기간">
      {isEditMode ? (
        <HelperText>수정 불가능해요</HelperText>
      ) : (
        <HelperText>최소 7일부터 설정 가능해요</HelperText>
      )}
      <ModalToggler onClick={isEditMode ? null : () => setModalOpen(true)}>
        <CalenderIcon />
        <span>
          {!duration.start && !duration.end
            ? '직접 날짜를 입력해주세요'
            : `${duration.start} ~ ${duration.end}`}
        </span>
      </ModalToggler>
      {modalOpen && (
        <Modal
          open={modalOpen}
          onClose={isEditMode ? null : () => setModalOpen(false)}
        >
          <NewHabitCalendar onClick={handleCalendarBottomButtonsClick} />
        </Modal>
      )}
      {!isEditMode && (
        <DueDatePresetWrapper>
          <DueDatePreset
            onClick={() => {
              onDurationChecked({
                start: convertYMD(getCurrentKST()),
                end: getFutureDate(convertYMD(getCurrentKST()), 6),
              });
              setSelectedPresetId(0);
            }}
            long
            mr="10px"
            isSelected={selectedPresetId === 0}
          >
            일주일
          </DueDatePreset>
          <DueDatePreset
            onClick={() => {
              onDurationChecked({
                start: convertYMD(getCurrentKST()),
                end: convertYMD(addMonths2(getCurrentKST(), 1)),
              });
              setSelectedPresetId(1);
            }}
            mr="8px"
            isSelected={selectedPresetId === 1}
          >
            한달
          </DueDatePreset>
          <DueDatePreset
            onClick={() => {
              onDurationChecked({
                start: convertYMD(getCurrentKST()),
                end: convertYMD(addMonths2(getCurrentKST(), 3)),
              });
              setSelectedPresetId(2);
            }}
            mr="10px"
            isSelected={selectedPresetId === 2}
          >
            세달
          </DueDatePreset>
          <DueDatePreset
            onClick={() => {
              onDurationChecked({
                start: convertYMD(getCurrentKST()),
                end: convertYMD(addMonths2(getCurrentKST(), 6)),
              });
              setSelectedPresetId(3);
            }}
            long
            isSelected={selectedPresetId === 3}
          >
            여섯달
          </DueDatePreset>
        </DueDatePresetWrapper>
      )}
    </SubTitleOuter>
  );
};

NewHabitDetailDueDatePicker.propTypes = {
  isEditMode: PropTypes.bool.isRequired,
  duration: PropTypes.object.isRequired,
  onDurationChecked: PropTypes.func,
};

const HelperText = styled.span`
  display: block;
  color: var(--color-primary-deemed);
  font-size: var(--font-xxs);
  line-height: 14px;
  margin-bottom: 6px;
`;

const ModalToggler = styled.div`
  width: 100%;
  height: 40px;
  background: var(--bg-primary);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  margin-bottom: 12px;
  border-radius: var(--border-radius-semi);
  cursor: pointer;

  & span {
    height: 20px;
    margin-left: 8px;
    color: var(--color-primary-deemed);
    font-size: var(--font-s);
    line-height: 18px;
    cursor: pointer;
  }
`;

const DueDatePresetWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 32px;
  margin-bottom: 42px;
`;

const DueDatePreset = styled.div`
  width: ${({ long }) => (long ? '78px' : '64px')};
  padding: 7.5px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid
    ${({ isSelected }) => (isSelected ? 'none' : 'var(--color-title)')};
  border-radius: 30px;
  background: ${({ isSelected }) =>
    isSelected ? 'var(--bg-selected)' : 'inherit'};
  color: ${({ isSelected }) =>
    isSelected ? 'var(--color-primary)' : 'var(--color-primary-deemed)'};
  font-weight: var(--weight-regular);
  font-size: var(--font-xs);
  line-height: 17px;
  cursor: pointer;
  margin-right: ${({ mr }) => (mr ? mr : '0px')};

  transition: all 150ms ease-out;
`;

export default memo(NewHabitDetailDueDatePicker);
