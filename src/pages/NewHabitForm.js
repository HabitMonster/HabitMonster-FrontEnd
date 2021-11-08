import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useHistory, Redirect } from 'react-router-dom';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { habitsState } from '../recoil/states/habit';

import { BackButtonHeader, Modal } from '../components/common';

import {
  NewHabitCategorySummary,
  NewHabitFrequencySettingButton,
  NewHabitTextInput,
  NewHabitDateRangePicker,
} from '../components/newHabit';

import {
  CalenderIcon,
  SettingIcon,
  CheckIcon,
  DocumentIcon,
} from '../assets/icons/habits';

import { useInput, useDateRange } from '../hooks';

import { convertYMD, getCurrentKST } from '../utils/date';

import { WEEK } from '../constants/date';
import { OK } from '../constants/statusCode';

import { addHabitApis } from '../api';

const NewHabitForm = () => {
  const addHabit = useSetRecoilState(habitsState);
  const [habits, setHabits] = useRecoilState(habitsState);
  const history = useHistory();
  const { state: categoryState } = useLocation();
  const [title, onTitleChanged] = useInput('');
  const [description, onDescriptionChanged] = useInput('');

  const [modalOpen, setModalOpen] = useState(false);
  const [
    durationStart,
    durationEnd,
    dateHelperText,
    onDateRangeChosen,
    shouldAddRightNow,
  ] = useDateRange();

  const [chosenDate, setChosenDate] = useState([1, 2, 3, 4, 5, null, null]);

  const choiceDate = (id) => {
    const newChosenDate = chosenDate.slice();
    newChosenDate[id - 1] = newChosenDate[id - 1] ? null : id;
    setChosenDate(newChosenDate);
  };

  const choiceAll = () => {
    setChosenDate(
      chosenDate.join('').length === 7
        ? [1, 2, 3, 4, 5, null, null]
        : [1, 2, 3, 4, 5, 6, 7],
    );
  };

  const [tensFrequency, setTensFrequency] = useState(0);
  const [unitsFrequency, setUnitsFrequency] = useState(1);
  const count = tensFrequency
    ? Number(`${tensFrequency}${unitsFrequency}`)
    : unitsFrequency;

  const saveButtonStatus =
    title && description && durationStart && durationEnd && unitsFrequency;

  const handleDateRangePickerClick = (type, range) => {
    onDateRangeChosen(type, range);
    setModalOpen(false);
  };

  const handleSaveButtonClick = async () => {
    const body = {
      title,
      description,
      durationStart,
      durationEnd,
      count,
      categoryId: categoryState.id,
      practiceDays: chosenDate.join(''),
    };

    try {
      const { data } = await addHabitApis.saveHabitWithHands(body);

      if (data.statusCode === OK) {
        if (shouldAddRightNow) {
          setHabits([...habits, data.habitDetail]);
        }
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
      <Header>
        <BackButtonHeader
          onButtonClick={() => history.goBack()}
          pageTitleText="습관 작성하기"
        />
        <NewHabitCategorySummary category={categoryState.name} />
        <NewHabitTextInput
          isTitle={true}
          labelName="타이틀"
          id="title"
          value={title}
          placeholder="택시 안타기! 그럴거면 차를 사세요"
          onValueChanged={onTitleChanged}
        />
        <NewHabitTextInput
          isTitle={false}
          id="description"
          value={description}
          labelName="설명"
          placeholder="5분만 더 자다가 텅장된다."
          onValueChanged={onDescriptionChanged}
        />
      </Header>
      <DetailBody>
        <DetailOuter>
          <DetailInner>
            <CalenderIcon />
            <DetailRightColumn>
              <span
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                {dateHelperText}
              </span>
            </DetailRightColumn>
            {modalOpen && (
              <Modal
                open={modalOpen}
                onClose={() => {
                  setModalOpen(false);
                }}
              >
                <NewHabitDateRangePicker onClick={handleDateRangePickerClick} />
              </Modal>
            )}
          </DetailInner>
        </DetailOuter>
        <DetailOuter>
          <DetailInner>
            <DocumentIcon />
            <DetailRightColumn>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>요일</span>
                <CheckBox
                  onChange={choiceAll}
                  checked={
                    chosenDate.join('').length !== 0 &&
                    chosenDate.join('').length !== 7
                  }
                  id="checkForWeek"
                  type="checkbox"
                />
                <label htmlFor="checkForWeek">
                  <CheckIcon />
                </label>
              </div>
            </DetailRightColumn>
          </DetailInner>
          <DetailInner mt="24">
            {WEEK.map(({ id, day }) => (
              <WeeklyItem
                onClick={() => choiceDate(id)}
                checked={chosenDate.includes(id)}
                key={id}
              >
                {day}
              </WeeklyItem>
            ))}
          </DetailInner>
          <div
            style={{
              width: '282px',
              height: '1px',
              margin: '0 auto',
              marginTop: '22px',
              marginBottom: '30px',
              backgroundColor: '#dedede',
            }}
          ></div>
          <DetailInner>
            <DocumentIcon />
            <DetailRightColumn>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>매일</span>
                <CheckBox
                  onChange={choiceAll}
                  checked={chosenDate.join('').length === 7}
                  id="checkForAllday"
                  type="checkbox"
                />
                <label htmlFor="checkForAllday">
                  <CheckIcon />
                </label>
              </div>
            </DetailRightColumn>
          </DetailInner>
        </DetailOuter>
        <DetailOuter>
          <DetailInner>
            <SettingIcon />
            <DetailRightColumn>
              <span>빈도를 정해주세요.</span>
            </DetailRightColumn>
          </DetailInner>
          <FrequenciesWrapper>
            <NewHabitFrequencySettingButton
              currentValue={tensFrequency}
              setValue={setTensFrequency}
            />
            <NewHabitFrequencySettingButton
              currentValue={unitsFrequency}
              setValue={setUnitsFrequency}
            />
          </FrequenciesWrapper>
        </DetailOuter>
        <SaveButton
          onClick={handleSaveButtonClick}
          disabled={!saveButtonStatus}
        >
          저장하기
        </SaveButton>
      </DetailBody>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: var(--color-detail);
`;

const Header = styled.section`
  width: 100%;
  min-height: 404px;
  padding-top: 44px;
  position: relative;
  top: 0;
  background: linear-gradient(180deg, #7056ff 0%, #7f9ae6 99.99%, #7f9be6 100%);
`;

const Bar = styled.div`
  width: 100%;
  height: 4px;
  position: absolute;
  bottom: ${({ factor }) => 8 - 4 * factor}px;
  display: flex;
  justify-content: space-between;

  & div {
    background: var(--color-detail);
    width: ${({ factor }) => 5 * (factor + 1)}px;
    height: 4px;
  }
`;

const DetailBody = styled.div`
  width: 100%;
  background: var(--color-detail);
  padding: 0 16px;
  margin-top: 24px;
  overflow: scroll;
`;

const DetailOuter = styled.section`
  width: 100%;
  max-width: 343px;
  min-height: 56px;
  background: var(--color-white);
  border-radius: var(--border-radius-progress);
  padding: 16px;
  margin-bottom: 24px;
`;

const DetailInner = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: ${({ mt }) => (mt ? mt : 0)}px;
`;

const DetailRightColumn = styled.div`
  margin-left: 28px;
  width: 100%;
  display: flex;
  align-items: center;

  & span {
    font-weight: var(--weight-semi-bold);
    font-size: var(--font-small);
    line-height: 19px;
    display: inline-block;
    cursor: pointer;
  }
`;

const CheckBox = styled.input`
  display: none;

  & + label {
    width: 16px;
    height: 16px;
    background-color: var(--color-white);
    border: 1px solid #808080;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    & svg {
      display: none;
    }
  }

  &:checked + label {
    border: none;
    background-color: var(--color-main);

    & svg {
      display: block;
    }
  }
`;

const WeeklyItem = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 14px 12px;
  border: none;
  margin-right: 8px;
  border-radius: ${({ checked }) => (checked ? '15px' : '')};
  background: ${({ checked }) => (checked ? '#7A80EF' : 'none')};
  color: ${({ checked }) => (checked ? 'var(--color-white)' : 'none')};

  &:first-child {
    color: ${({ checked }) => (checked ? 'var(--color-white)' : '#e57ad9')};
  }

  &:last-child {
    color: ${({ checked }) => (checked ? 'var(--color-white)' : '#65B2EE')};
  }
`;

const FrequenciesWrapper = styled.div`
  padding-left: 48px;
  display: flex;
`;

const SaveButton = styled.button`
  width: 100%;
  max-width: 343px;
  height: 54px;

  display: flex;
  justify-content: center;
  align-items: center;

  background: var(--color-main);
  border: none;
  border-radius: var(--border-radius-progress);
  margin-top: 42px;
  margin-bottom: 70px;

  font-weight: var(--weight-semi-bold);
  font-size: var(--font-regular);
  line-height: 22px;

  color: var(--color-white);

  &:disabled {
    color: var(--color-main);
    background: transparent;
    opacity: 0.3;
    border: 1px solid var(--color-main);
  }
`;

export default NewHabitForm;
