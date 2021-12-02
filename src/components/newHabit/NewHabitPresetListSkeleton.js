import React from 'react';
import styled from 'styled-components';

import { LoadingSpinner } from '../../assets/icons/common';

import { BackButtonHeader, BottomFixedButton } from '../common';

import { Wrapper, Inner, HelperText } from '../../pages/NewHabitPresetList';

import { setFlexStyles } from '../../styles';

const skeletons = [...Array(2).keys()].map((key) => ({
  id: key,
}));

const NewHabitPresetListSkeleton = () => {
  return (
    <Wrapper>
      <BackButtonHeader pageTitleText="습관 프리셋" />
      <Inner>
        <HelperText>프리셋을 로딩하고 있습니다</HelperText>
        {skeletons.map((skeleton) => (
          <SkeletonPresetItem key={skeleton.id}>
            <LoadingSpinner style={{ width: '50px', height: '50px' }} />
          </SkeletonPresetItem>
        ))}
      </Inner>
      <BottomFixedButton onClick={() => {}} text="저장하기" />
    </Wrapper>
  );
};

const SkeletonPresetItem = styled.div`
  width: 100%;
  height: 109px;
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })}

  background: var(--bg-primary);
  cursor: pointer;
  margin-bottom: 12px;
`;

export default NewHabitPresetListSkeleton;
