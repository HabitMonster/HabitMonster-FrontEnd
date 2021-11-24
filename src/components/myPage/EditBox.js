import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { BackButtonHeader, TextInput, BottomFixedButton } from '../common';
import { userState } from '../../recoil/states/user';
import { monsterState } from '../../recoil/states/monster';

import { myPageApis } from '../../api';
import { validateMonsterName } from '../../utils/validation';
import { OK } from '../../constants/statusCode';
import {
  USER_NAME_UPDATE_SUCCESS,
  MONSTER_NAME_UPDATE_SUCCESS,
} from '../../constants/statusMessage';

// 기존에 UserInformation에서 props로 넘겨받는 값 editValue, handleChangeValue를 editBox 내부로 옮겨옴
const EditBox = ({ type, closeModal }) => {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [monsterInfo, setMonsterInfo] = useRecoilState(monsterState);
  const [editValue, setEditValue] = useState('');
  const isEnabled =
    type === 'monsterName'
      ? editValue && validateMonsterName(editValue)
      : editValue && editValue.length <= 12;

  const handleClickEdit = async () => {
    if (!isEnabled) return;
    try {
      let editRequest = myPageApis.editUserName;
      if (type === 'monsterName') {
        editRequest = myPageApis.editMonsterName;
      }

      // fieldKey: username / monsterName
      const fieldKey = type === 'userName' ? 'username' : 'monsterName';
      const { data } = await editRequest({
        [fieldKey]: editValue,
      });

      if (data.statusCode === OK) {
        if (data.responseMessage === USER_NAME_UPDATE_SUCCESS) {
          const newUserInfo = {
            ...userInfo,
            userName: data.userInfo.username,
          };
          // user atom 수정
          setUserInfo(newUserInfo);
        }

        if (data.responseMessage === MONSTER_NAME_UPDATE_SUCCESS) {
          const newMonsterInfo = {
            ...monsterInfo,
            monsterName: data.monster.monsterName,
          };
          //몬스터 아톰 수정
          setMonsterInfo(newMonsterInfo);
        }

        closeModal();
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setEditValue(
      type === 'userName' ? userInfo.userName : monsterInfo.monsterName,
    );
  }, [type, userInfo.userName, monsterInfo.monsterName]);

  return (
    <Container>
      <BackButtonHeader onButtonClick={closeModal} />
      <PositionWrap>
        {type === 'userName' && (
          <EditTitle>
            제가 뭐라고
            <br /> 부르면 좋을까요?
          </EditTitle>
        )}
        {type === 'monsterName' && (
          <EditTitle>
            변경할 몬스터 이름을
            <br /> 적어주세요!
          </EditTitle>
        )}
        <TextInput
          text={editValue || ''}
          placeholder={editValue}
          onTextChanged={setEditValue}
          maxLength={12}
          idleHelperText="한글, 영문, 숫자 공백없이 최대 12자 입력 가능해요"
          errorMessage="최대 글자 수를 초과했어요"
          lengthValidationMode={true}
        />
      </PositionWrap>
      <BottomFixedButton
        text="변경하기"
        condition={() => isEnabled}
        onClick={handleClickEdit}
      />
    </Container>
  );
};

const Container = styled.div`
  max-width: 414px;
  width: 100%;
  height: 100%;
  background: var(--bg-wrapper);
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const PositionWrap = styled.div`
  margin-top: 24px;
  padding: 0 24px;
`;

const EditTitle = styled.p`
  color: var(--color-primary);
  font-size: var(--font-xxl);
  font-weight: var(--weight-bold);
  line-height: 32px;
  margin-bottom: 32px;
`;

EditBox.propTypes = {
  type: PropTypes.string.isRequired,
  editValue: PropTypes.string.isRequired,
  handleChangeValue: PropTypes.func.isRequired,
  pageTitleText: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default EditBox;
