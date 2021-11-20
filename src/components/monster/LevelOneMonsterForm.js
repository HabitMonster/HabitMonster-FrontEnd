import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil';

import { MonsterThumbnail } from '.';
import { BottomFixedButton } from '../common';
import { TextInput } from '../common';
import { monsterApis } from '../../api';

import { selectedMonsterState } from '../../recoil/states/monster';

import { authState } from '../../recoil/states/auth';

import { OK } from '../../constants/statusCode';
import noop from '../../utils/noop';
import { validateMonsterName } from '../../utils/validation';

const LevelOneMonsterForm = ({ showGuide }) => {
  console.log('LevelOneMonsterForm Render');
  const history = useHistory();

  // IF THE USER IS FIRST VISITOR,
  // isFirstLogin MUST BE TRUE,
  // IF that value is falsy(including null, this is because user doesn't have token at this moment)
  // The Private Route should GUARD THIS SITUATION.

  const [{ isFirstLogin }, setAuth] = useRecoilState(authState);
  const selectedMonster = useRecoilValue(selectedMonsterState);

  // IF THE USER IS NOT FIRST VISITOR,
  // THIS HOOK SHOULD BE TRIGGERED AT THIS COMPONENT.
  // This mean if isFirstLogin === false, this hook should be called and just history replace ('/') or whatever.
  const resetSelectedMonster = useResetRecoilState(selectedMonsterState);
  const [monsterName, setMonsterName] = useState('');

  const setMonsterInfo = async () => {
    const monsterInfo = {
      monsterId: selectedMonster.monsterId,
      monsterName: monsterName,
    };

    try {
      const { data } = await monsterApis.setMonster(monsterInfo);
      if (data.statusCode === OK) {
        // IMPORTANT NOTE
        // I THINK THE UPDATING MONSTER BY REFETCHING IS NOT QUITE GOOD. BECAUSE I THINK THAT API CALL IS REDUNDANT.
        // (EXPERIMENT) To prevent flickering, use await keyword

        //* I REALLY HATE NESTED IF STATEMENT, But for speed, i will grab this strategy.
        if (isFirstLogin) {
          setAuth({ isLogin: true, isFirstLogin: false });
          showGuide();
          resetSelectedMonster();
          return;
        }

        resetSelectedMonster();
        history.replace('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AvatarContainer>
      <AvatarWrap>
        <TitleWrap>
          <Title>몬스터를 뭐라고 부를까요?</Title>
        </TitleWrap>
        <ThumbnailWrap>
          <MonsterThumbnail
            imageUrl={selectedMonster.monsterImage}
            imageAlt={selectedMonster.monsterImage}
            imageSize={'large'}
          />
        </ThumbnailWrap>
        <TextInput
          text={monsterName}
          placeholder="이름을 입력해 주세요"
          onTextChanged={setMonsterName}
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
`;

const AvatarWrap = styled.div`
  background-color: var(--bg-wrapper);
  width: 100%;
  padding: 75px 24px 100px;
`;

const TitleWrap = styled.div``;

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
  padding: 30px 0 30px;
`;

export default LevelOneMonsterForm;
