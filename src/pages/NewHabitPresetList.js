import React from 'react';
import { useHistory, useParams, useLocation, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { BackButtonHeader, BottomFixedButton } from '../components/common';
import { NewHabitPresetItem } from '../components/newHabit';

import { useFetchCategoryPresets } from '../hooks';
import { PencilIcon } from '../assets/icons/habits';

const NewHabitPresetList = () => {
  const { state: selectedHabitCategory } = useLocation();
  const history = useHistory();

  const { presetList, onPresetClicked, selectedPresetId, onSaveButtonClicked } =
    useFetchCategoryPresets();

  if (!selectedHabitCategory) {
    return <Redirect to="/new" />;
  }

  return (
    <>
      <Wrapper>
        <Inner>
          <div style={{ marginTop: '24px', marginBottom: '12px' }}>
            <BackButtonHeader
              pageTitleText={selectedHabitCategory.name}
              onButtonClick={() => history.replace('/new')}
            />
          </div>
          <HelperText>이런 습관은 어때요?</HelperText>
          {presetList.map(
            ({ count, description, period, practiceDays, title, presetId }) => (
              <NewHabitPresetItem
                key={presetId}
                frequency={count}
                description={description}
                period={period}
                days={practiceDays}
                title={title}
                id={presetId}
                onClick={() => onPresetClicked(presetId)}
                isSelected={selectedPresetId === presetId}
              />
            ),
          )}
          <Hands
            onClick={() =>
              history.push({
                pathname: 'detail',
                state: selectedHabitCategory,
              })
            }
          >
            <PencilIcon />
            <span>직접 작성하기</span>
          </Hands>
        </Inner>
      </Wrapper>
      <BottomFixedButton
        text="저장하기"
        condition={selectedPresetId}
        onClick={onSaveButtonClicked}
      />
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: #070707;
`;

const Inner = styled.div`
  padding: 0 24px;
`;

const HelperText = styled.h2`
  color: #f8f8f8;
  font-size: 24px;
  line-height: 32px;
  margin-bottom: 20px;
`;

const Hands = styled.div`
  width: 312px;
  height: 64px;
  background: #1e2025;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: var(--font-weight-medium);
  font-size: 18px;
  line-height: 22px;
  color: #f8f8f8;
  cursor: pointer;

  & span {
    margin-left: 10px;
  }
`;

export default NewHabitPresetList;
