import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { monsterState } from '../../recoil/states/monster';
import { userState } from '../../recoil/states/user';

import { myPageApis } from '../../api';

import { BackButtonHeader, TextInput, BottomFixedButton } from '../common';
import { setVh } from '../DeviceDetector';

import { OK } from '../../constants/statusCode';
import {
  USER_NAME_UPDATE_SUCCESS,
  MONSTER_NAME_UPDATE_SUCCESS,
} from '../../constants/statusMessage';

import { setFontStyles } from '../../styles';

import { validateMonsterName } from '../../utils/validation';

const EditBox = ({ type, closeModal }) => {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [monsterInfo, setMonsterInfo] = useRecoilState(monsterState);
  const [editValue, setEditValue] = useState('');
  const isEnabled = useCallback(() => {
    return editValue && validateMonsterName(editValue);
  }, [editValue]);

  const handleClickEdit = async () => {
    if (!isEnabled) return;
    try {
      let editRequest = myPageApis.editUserName;
      if (type === 'monsterName') {
        editRequest = myPageApis.editMonsterName;
      }

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
          setUserInfo(newUserInfo);
        }

        if (data.responseMessage === MONSTER_NAME_UPDATE_SUCCESS) {
          const newMonsterInfo = {
            ...monsterInfo,
            monsterName: data.monster.monsterName,
          };
          setMonsterInfo(newMonsterInfo);
        }

        closeModal();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const editValueHandler = useCallback((value) => {
    // ?????? ?????? ???, setEditValue ?????? ????????? ??????
    if (/\s/gi.test(value)) {
      return;
    }

    setEditValue(value);
  }, []);

  useEffect(() => {
    setEditValue(
      type === 'userName' ? userInfo.userName : monsterInfo.monsterName,
    );
  }, [type, userInfo.userName, monsterInfo.monsterName]);

  useEffect(() => {
    window.removeEventListener('resize', setVh);

    return () => {
      window.addEventListener('resize', setVh);
    };
  }, []);

  return (
    <Container>
      <BackButtonHeader onButtonClick={closeModal} />
      <PositionWrap>
        {type === 'userName' && (
          <EditTitle>
            ?????? ?????????
            <br /> ????????? ?????????????
          </EditTitle>
        )}
        {type === 'monsterName' && (
          <EditTitle>
            ????????? ????????? ?????????
            <br /> ???????????????!
          </EditTitle>
        )}
        <TextInput
          text={editValue || ''}
          placeholder={editValue}
          onTextChanged={editValueHandler}
          maxLength={12}
          idleHelperText="??????, ??????, ?????? ???????????? ?????? 12??? ?????? ????????????"
          errorMessage="?????? ?????? ?????? ???????????????"
          lengthValidationMode={true}
        />
      </PositionWrap>
      <BottomFixedButton
        text="????????????"
        condition={isEnabled}
        onClick={handleClickEdit}
      />
    </Container>
  );
};

EditBox.propTypes = {
  type: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
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
  ${setFontStyles({
    color: 'primary',
    fontSize: 'xxl',
    fontWeight: 'bold',
    lineHeight: '32px',
  })}
  margin-bottom: 32px;
`;

export default EditBox;
