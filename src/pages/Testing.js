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

import { CalenderIcon } from '../assets/icons/habits';

import { useInput, useDateRange } from '../hooks';

import { WEEK } from '../constants/date';
import { OK } from '../constants/statusCode';

import { addHabitApis } from '../api';

import SubTitleOuter from '../components/common/SubTitleOuter';
import TextInput from '../components/common/TextInput';

const NewHabitForm = () => {
  const addHabit = useSetRecoilState(habitsState);
  const [habits, setHabits] = useRecoilState(habitsState);
  const history = useHistory();
  const { state: categoryState } = useLocation();
  const [title, setTitle] = useState('');
  const [description, setDesciprion] = useState('');

  if (!categoryState) {
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
      <MarginInterval>
        <SubTitleOuter subTitle="제목">
          <TextInput
            text={title}
            onTextChanged={setTitle}
            placeholder="예) 하루에 1000원씩 저금하기"
            maxLength={20}
            lengthValidationMode
            errorMessage="최대 글자 수를 초과했어요"
          />
        </SubTitleOuter>
      </MarginInterval>
      <MarginInterval>
        <SubTitleOuter subTitle="내용">
          <TextInput
            text={description}
            onTextChanged={setDesciprion}
            placeholder="예) 100일이면 10만원이다 이말이야"
            lengthValidationMode={false}
          />
        </SubTitleOuter>
      </MarginInterval>
      <MarginInterval>
        <SubTitleOuter subTitle="기간">
          <DatePickerSection>
            <CalenderIcon />
            <span>직접 날짜를 입력해주세요</span>
          </DatePickerSection>
          <DatePickerPreset>
            <button
              style={{ width: '78px', padding: '7.5px', marginRight: '10px' }}
            >
              일주일
            </button>
            <button
              style={{ width: '64px', padding: '7.5px', marginRight: '8px' }}
            >
              한달
            </button>
            <button
              style={{ width: '64px', padding: '7.5px', marginRight: '10px' }}
            >
              세달
            </button>
            <button style={{ width: '78px', padding: '7.5px' }}>여섯달</button>
          </DatePickerPreset>
        </SubTitleOuter>
      </MarginInterval>
      <MarginInterval>
        <SubTitleOuter subTitle="요일 설정">
          <div style={{ display: 'flex', width: '310px', height: '40px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '30px',
                border: '1px solid #333333',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '12px',
                lineHeight: '17px',
                marginRight: '5px',
                color: '#f8f8f8',
                opacity: '0.5',
              }}
            >
              월
            </div>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '30px',
                border: '1px solid #333333',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '12px',
                lineHeight: '17px',
                marginRight: '5px',
                color: '#f8f8f8',
                opacity: '0.5',
              }}
            >
              화
            </div>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '30px',
                border: '1px solid #333333',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '12px',
                lineHeight: '17px',
                marginRight: '5px',
                color: '#f8f8f8',
                opacity: '0.5',
              }}
            >
              수
            </div>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '30px',
                border: '1px solid #333333',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '12px',
                lineHeight: '17px',
                marginRight: '5px',
                color: '#f8f8f8',
                opacity: '0.5',
              }}
            >
              목
            </div>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '30px',
                border: '1px solid #333333',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '12px',
                lineHeight: '17px',
                marginRight: '5px',
                color: '#f8f8f8',
                opacity: '0.5',
              }}
            >
              금
            </div>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '30px',
                border: '1px solid #333333',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '12px',
                lineHeight: '17px',
                marginRight: '5px',
                color: '#f8f8f8',
                opacity: '0.5',
              }}
            >
              토
            </div>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '30px',
                border: '1px solid #333333',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '12px',
                lineHeight: '17px',
                marginRight: '5px',
                color: '#f8f8f8',
                opacity: '0.5',
              }}
            >
              일
            </div>
          </div>
        </SubTitleOuter>
      </MarginInterval>
      <MarginInterval>
        <SubTitleOuter subTitle="빈도">
          <p
            style={{
              fontSize: '12px',
              lineHeight: '14px',
              color: 'rgba(248, 248, 248, 0.4)',
              marginBottom: '6px',
            }}
          >
            숫자 영역을 클릭하여 직접 입력할 수 있어요.
          </p>
          <div style={{ display: 'flex', width: '100%', height: '40px' }}>
            <div
              style={{
                width: '40px',
                height: '100%',
                borderRadius: '50%',
                background: '#1e2025',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#f8f8f8',
                marginRight: '11px',
              }}
            >
              -
            </div>
            <NumberInput type="number" />
            <div
              style={{
                width: '40px',
                height: '100%',
                borderRadius: '50%',
                background: '#1e2025',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#f8f8f8',
                marginRight: '11px',
              }}
            >
              +
            </div>
          </div>
        </SubTitleOuter>
      </MarginInterval>
      <SaveButton>저장하기</SaveButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 24px;
  position: relative;
  background: #070707;
`;

const Header = styled.section`
  width: 360px;
  height: 44px;
  margin-top: 24px;
  margin-bottom: 40px;
`;

const MarginInterval = styled.div`
  margin-bottom: 24px;
`;

const DatePickerSection = styled.div`
  width: 100%;
  height: 40px;
  background: #1e2025;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  margin-bottom: 12px;
  border-radius: 4px;

  & span {
    height: 20px;
    margin-left: 8px;
    color: rgba(248, 248, 248, 0.5);
    font-size: 15px;
    line-height: 18px;
  }
`;

const DatePickerPreset = styled.div`
  display: flex;
  width: 100%;
  height: 32px;

  & button {
    border: none;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #333333;
    border-radius: 30px;
    /* margin-right: 10px; */
    background: inherit;
    color: rgba(248, 248, 248, 0.5);
    font-weight: var(--font-weight-medium);
    font-size: 14px;
    line-height: 17px;
  }
`;

const NumberInput = styled.input`
  width: 208px;
  height: 100%;

  text-align: center;
  padding: 4px 8px;
  background: #1e2025;
  border-radius: 4px;
  border: none;
  color: #f8f8f8;
  font-size: 15px;
  line-height: 18px;
  font-weight: var(--font-weight-bold);
  margin-right: 13px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus {
    outline: none;
  }
`;
const SaveButton = styled.button`
  width: 100%;
  max-width: 360px;
  height: 64px;

  position: fixed;
  bottom: 0;
  left: 0;
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
