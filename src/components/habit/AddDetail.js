import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useHistory } from 'react-router-dom';

import { BackButtonHeader } from '../common';
import TextInput from './TextInput';
import CategorySummary from './CategorySummary';
import Calender from './Calender';
import FrequencySetting from './FrequencySetting';

import { CalenderIcon, ModeIcon, SettingIcon } from '../../assets/icons/habits';
import { useInput } from '../../hooks';

const AddDetail = () => {
  const location = useLocation();
  const history = useHistory();

  const [title, onTitleChanged] = useInput('');
  const [description, onDescriptionChanged] = useInput('');
  const category = location.state?.category ?? '';

  const [durationStart, setDurationStart] = useState('');
  const [durationEnd, setDurationEnd] = useState(durationStart);

  console.log(durationStart);
  console.log(durationEnd);

  const [tensFrequency, setTensFrequency] = useState(0);
  const [unitsFrequency, setUnitsFrequency] = useState(0);

  const count = String(tensFrequency) + String(unitsFrequency);
  console.log(count);

  return (
    <Wrapper>
      <Header>
        <BackButtonHeader
          onButtonClick={() => {
            history.replace({
              pathname: '/new',
              state: {
                category: location.state.category,
              },
            });
          }}
          pageTitleText="습관 작성하기"
        />
        <CategorySummary category={category} />
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
              <Calender isStart={true} onDateChosen={setDurationStart} />
            </DetailRightColumn>
          </DetailInner>
        </DetailOuter>
        <DetailOuter>
          <DetailInner>
            <CalenderIcon />
            <DetailRightColumn>
              <Calender isStart={false} onDateChosen={setDurationEnd} />
            </DetailRightColumn>
          </DetailInner>
        </DetailOuter>
        <DetailOuter>
          <DetailInner>
            <ModeIcon />
            <DetailRightColumn>
              <Mode>
                <input type="radio" />
                <span>매일</span>
              </Mode>
              <Mode>
                <input type="radio" />
                <span>매주</span>
              </Mode>
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
        <SaveButton>저장하기</SaveButton>
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

  //TODO: REMOVE DUPLICATED STYLE
  & span {
    font-weight: var(--weight-semi-bold);
    font-size: var(--font-small);
    line-height: 19px;
    display: inline-block;
  }
`;

const Mode = styled.div`
  width: 60px;
  height: 24px;
  display: flex;
  font-weight: var(--weight-semi-bold);
  font-size: var(--font-small);
  line-height: 19px;

  & input {
    margin-right: 12px;
    background-color: #7a80ef;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    margin-right: 12px;
  }

  & span {
    display: inline-block;
    min-width: 32px;
  }
`;

const FrequenciesWrapper = styled.div`
  padding-left: 48px;
  display: flex;
`;

const SaveButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 140px;
  border: none;

  max-width: 343px;
  height: 54px;

  background: var(--color-purple);
  border-radius: 10px;
  margin-top: 42px;
  margin-bottom: 70px;

  font-weight: var(--weight-semi-bold);
  font-size: var(--font-regular);
  line-height: 22px;

  color: var(--color-white);
`;

export default AddDetail;
