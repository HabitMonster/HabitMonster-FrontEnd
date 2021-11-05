import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useHistory, Redirect } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { habitsState } from '../../recoil/states/habit';

import { BackButtonHeader } from '../common';
import { TextInput, FrequencySetting, CategorySummary, Calendar } from '.';
import { Modal } from '../common';

import { CalenderIcon, SettingIcon } from '../../assets/icons/habits';

import { useInput, useDateRange } from '../../hooks';

import { convertYMD, getCurrentKST } from '../../utils/date';

import { WEEK } from '../../constants/date';
import { OK } from '../../constants/statusCode';

import H from '../../api/habits';

// TODOS
// 1. 습관이 추가되었을 때, 메인 페이지 뷰의 위쪽에다가 놓을 것인지, 아래쪽에다가 놓을 것인지 파악하기.

const AddDetail = () => {
  const addHabit = useSetRecoilState(habitsState);
  const history = useHistory();
  const { state: categoryState } = useLocation();
  const [title, onTitleChanged] = useInput('');
  const [description, onDescriptionChanged] = useInput('');

  const [modalOpen, setModalOpen] = useState(false);
  const [durationStart, durationEnd, dateHelperText, onDateRangeChosen] =
    useDateRange();
  const isStartFromToday = durationStart === convertYMD(getCurrentKST());

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
      practiceDays: '1234567',
    };

    try {
      const { data } = await H.saveHabitWithHands(body);

      if (data.statusCode === OK) {
        if (isStartFromToday) {
          addHabit((prev) => [data.habitDetail, ...prev]);
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
        <CategorySummary category={categoryState.name} />
        <TextInput
          isTitle={true}
          labelName="타이틀"
          id="title"
          value={title}
          placeholder="택시 안타기! 그럴거면 차를 사세요"
          onValueChanged={onTitleChanged}
        />
        <TextInput
          isTitle={false}
          id="description"
          value={description}
          labelName="설명"
          placeholder="5분만 더 자다가 텅장된다."
          onValueChanged={onDescriptionChanged}
        />
        <Bar factor={0}>
          <div></div>
          <div></div>
        </Bar>
        <Bar factor={1}>
          <div></div>
          <div></div>
        </Bar>
        <Bar factor={2}>
          <div></div>
          <div></div>
        </Bar>
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
                <Calendar onClick={handleDateRangePickerClick} />
              </Modal>
            )}
          </DetailInner>
        </DetailOuter>
        <DetailOuter>
          <div style={{ display: 'flex' }}>
            {WEEK.map(({ id, day }) => (
              <div key={id}>{day}</div>
            ))}
          </div>
        </DetailOuter>
        <DetailOuter>
          <DetailInner>
            <SettingIcon />
            <DetailRightColumn>
              <span>빈도를 정해주세요.</span>
            </DetailRightColumn>
          </DetailInner>
          <FrequenciesWrapper>
            <FrequencySetting
              currentValue={tensFrequency}
              setValue={setTensFrequency}
            />
            <FrequencySetting
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
  background: #f7f5ff;
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
    background: #f7f5ff;
    width: ${({ factor }) => 5 * (factor + 1)}px;
    height: 4px;
  }
`;

const DetailBody = styled.div`
  width: 100%;
  background: #f7f5ff;
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
`;

const DetailRightColumn = styled.div`
  margin-left: 28px;
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

  background: var(--color-purple);
  border: none;
  border-radius: var(--border-radius-progress);
  margin-top: 42px;
  margin-bottom: 70px;

  font-weight: var(--weight-semi-bold);
  font-size: var(--font-regular);
  line-height: 22px;

  color: var(--color-white);

  &:disabled {
    color: var(--color-purple);
    background: transparent;
    opacity: 0.3;
    border: 1px solid #7057fc;
  }
`;

export default AddDetail;
