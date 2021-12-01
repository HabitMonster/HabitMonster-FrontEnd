import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';

import { BottomFixedButton, MonsterThumbnail, TextInput } from '../common';
import { monsterApis } from '../../api';

import {
  selectedLevelOneMonsterState,
  monsterState,
} from '../../recoil/states/monster';

import { defaultAuthSelector } from '../../recoil/states/auth';

import { OK } from '../../constants/statusCode';
import noop from '../../utils/noop';
import { validateMonsterName } from '../../utils/validation';

const LevelOneMonsterForm = ({ showGuide }) => {
  const history = useHistory();
  const { isFirstLogin } = useRecoilValue(defaultAuthSelector);
  const [selectedMonster, setSelectedMonster] = useRecoilState(
    selectedLevelOneMonsterState,
  );

  const setMonster = useSetRecoilState(monsterState);
  const [monsterName, setMonsterName] = useState('');

  const setMonsterInfo = async () => {
    const monsterInfo = {
      monsterId: selectedMonster.monsterId,
      monsterName: monsterName,
    };

    try {
      const { data } = await monsterApis.setMonster(monsterInfo);
      if (data.statusCode === OK) {
        setMonster(data.monster);

        isFirstLogin ? showGuide() : history.replace('/');
        setSelectedMonster(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 공백 입력 시, setEditValue 하지 않도록 막기
  const editMonsterNameHandler = (value) => {
    if (/\s/gi.test(value)) {
      return;
    }

    setMonsterName(value);
  };

  return (
    <AvatarContainer>
      <AvatarWrap>
        <TitleWrap>
          <Title>몬스터를 뭐라고 부를까요?</Title>
        </TitleWrap>
        <ThumbnailWrap>
          <MonsterThumbnail
            id={selectedMonster.monsterId}
            width="124px"
            height="124px"
          />
        </ThumbnailWrap>
        <TextInput
          text={monsterName}
          placeholder="이름을 입력해 주세요"
          onTextChanged={editMonsterNameHandler}
          maxLength={12}
          idleHelperText="한글, 영문, 숫자 공백없이 최대 12자 입력 가능해요"
          errorMessage="최대 글자 수를 초과했어요"
          lengthValidationMode={true}
        />
      </AvatarWrap>
      <BottomFixedButton
        text="시작하기"
        onClick={setMonsterInfo}
        condition={() => monsterName && validateMonsterName(monsterName)}
      />
    </AvatarContainer>
  );
};

LevelOneMonsterForm.propTypes = {
  showGuide: PropTypes.func,
};

LevelOneMonsterForm.defaultProps = {
  showGuide: noop,
};

const AvatarContainer = styled.div`
  background-color: var(--bg-wrapper);
  font-family: var(--font-name-apple);
  width: 100%;
  height: calc(100% - 64px);
  position: ${isMobile ? 'fixed' : 'relative'};
  ${isMobile && `top: 0; left: 0; right: 0; bottom: 0;`};
`;

const AvatarWrap = styled.div`
  background-color: var(--bg-wrapper);
  width: 100%;
  padding: 0 24px;
`;

const TitleWrap = styled.div`
  margin-top: 80px;
`;

const Title = styled.h2`
  color: var(--color-white);
  font-size: var(--font-xxl);
  font-weight: var(--weight-bold);
  line-height: 32px;
`;

const ThumbnailWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 200px;
  height: 200px;
`;

export default LevelOneMonsterForm;
